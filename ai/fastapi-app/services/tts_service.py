# # services/tts_service.py
import torch
import torchaudio
from zonos.model import Zonos
from zonos.conditioning import make_cond_dict
from zonos.utils import DEFAULT_DEVICE as device
import time
import tempfile
import uuid
from services.s3_utils import upload_file_to_s3, load_file_from_s3
from datetime import datetime,timezone
import asyncio # 병렬 실행
import os
from sqlalchemy.ext.asyncio import AsyncSession

from db.models import story_pages, user_voices, page_audios
from sqlalchemy import select, and_, outerjoin, null, insert
from kafka.producer import send_result_message

device = "cuda" if torch.cuda.is_available() else "cpu"
print(device + "로 실행 중")

# 모델은 모듈 로딩 시 한 번만 초기화
model = Zonos.from_pretrained("Zyphra/Zonos-v0.1-transformer", device=device)
torch.manual_seed(421)

# Index: [행복, 슬픔, 역겨움, 공포, 놀람, 분노, 기타1, 기타2]
emotion = {
    1: [0.6, 0.05, 0.05, 0.05, 0.1, 0.05, 0.05, 0.05],  # 행복
    2: [0.05, 0.6, 0.1, 0.1, 0.05, 0.05, 0.025, 0.025],  # 슬픔
    3: [0.05, 0.1, 0.6, 0.05, 0.05, 0.05, 0.05, 0.05],  # 역겨움
    4: [0.05, 0.1, 0.05, 0.6, 0.1, 0.05, 0.025, 0.025],  # 공포
    5: [0.1, 0.05, 0.05, 0.1, 0.6, 0.05, 0.025, 0.025],  # 놀람
    6: [0.05, 0.05, 0.05, 0.05, 0.05, 0.7, 0.025, 0.025],  # 분노
    7: [0.05, 0.05, 0.05, 0.05, 0.1, 0.05, 0.6, 0.05],    # 기타1 (몽환, 평온 등)
    8: [0.1, 0.1, 0.05, 0.1, 0.1, 0.1, 0.15, 0.3],        # 기본(중립)
}


async def generate_tts_batch_and_upload(session: AsyncSession, book_id: int, voice_id: int, user_id: int):
    # tmp 디렉토리 1회만 생성
    os.makedirs("/tmp", exist_ok=True)

    # 유저 보이스 URL 불러오기
    query = select(user_voices).where(user_voices.c.voice_id == voice_id)
    result = await session.execute(query)
    voice = result.mappings().one_or_none()

    if not voice:
      raise ValueError(f"❌ No voice found for voice_id={voice_id}")

    print(f"voice 객체 타입은 : {type(voice)}")
    speaker_wav_key = voice["voice_url"]

    # S3에서 사용자 음성 1회 다운로드
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav", dir="/tmp") as temp_speaker:
      temp_speaker.write(load_file_from_s3(speaker_wav_key))
      speaker_path = temp_speaker.name

    try:
      # 조인 쿼리: 아직 음성이 없는 페이지만 가져오기
      pages_query = (
        select(story_pages)
        .select_from(
            outerjoin(
                story_pages,
                page_audios,
                and_(
                    story_pages.c.book_id == page_audios.c.book_id,
                    story_pages.c.page_number == page_audios.c.page_number,
                    page_audios.c.voice_id == voice_id
                )
            )
        )
        .where(
            and_(
                story_pages.c.book_id == book_id,
                page_audios.c.audio_id.is_(None)
            )
        )
      )

      result = await session.execute(pages_query)
      pages = result.mappings().all()  # 딕셔너리 형태로 반환 (text_content 접근 가능)
    
      tasks = [
        _generate_and_save_audio(session, book_id, voice_id, speaker_path,
                                 page["text_content"], page["page_number"],page["emotion_type"] )
        for page in pages
      ]
      results = await asyncio.gather(*tasks)
      print(f"✅ Generated and uploaded {len(results)} TTS files")

      await send_result_message({
        "type": "TTS_COMPLETE",
        "payload": {
          "book_id": book_id,
          "voice_id": voice_id,
          "user_id": user_id,
        }
      })
    except Exception as e:
      print(f"❌ TTS 작업 중 오류 발생: {e}")
      await send_result_message({
        "type": "TTS_FAILED",
        "payload": {
          "book_id": book_id,
          "voice_id": voice_id,
          "user_id": user_id,
          "error": str(e)
        }
      })
    finally:
      if os.path.exists(speaker_path):
        os.remove(speaker_path)


async def _generate_and_save_audio(
    session: AsyncSession,
    book_id: int,
    voice_id: int,
    speaker_path: str,
    text: str,
    page_number: int,
    emotion_type : int = 8
):

  if not (1 <= emotion_type <= 8):
    emotion_type = 8
  
  # 반환 위치
  output_path = f"/tmp/{uuid.uuid4()}.wav"

  try:
    # TTS 기반 음성 생성
    wav, sampling_rate = torchaudio.load(speaker_path)
    speaker = model.make_speaker_embedding(wav, sampling_rate)

    print(f"{emotion_type} = {emotion[emotion_type]}으로 생성 :\n({text})")

    cond_dict = make_cond_dict(text=text, speaker=speaker, language="ko", emotion = emotion[emotion_type])
    conditioning = model.prepare_conditioning(cond_dict)

    codes = model.generate(conditioning)
    wavs = model.autoencoder.decode(codes).cpu()
    torchaudio.save(output_path, wavs[0], model.autoencoder.sampling_rate)

    # S3에 음성 저장
    with open(output_path, "rb") as f:
      s3_key = f"tts_outputs/{uuid.uuid4()}.wav"
      s3_url = upload_file_to_s3(f, s3_key, "audio/wav")

    query = insert(page_audios).values(
        book_id=book_id,
        page_number=page_number,
        voice_id=voice_id,
        audio_url=s3_url,
        voice_url=None,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )
    await session.execute(query)

    return s3_url

  except Exception as e:
    print(f"❌ Error on page {page_number}: {e}")
    raise

  finally:
    if os.path.exists(output_path):
      os.remove(output_path)

async def generate_tts(text: str, speaker_url: str) -> str:
  os.makedirs("/tmp", exist_ok=True)

  # 1. S3에서 speaker 파일 다운로드
  with tempfile.NamedTemporaryFile(delete=False, suffix=".wav",
                                     dir="/tmp") as temp_speaker:
    temp_speaker.write(load_file_from_s3(speaker_url))
    speaker_path = temp_speaker.name

  # 2. 출력 파일 임시경로 생성
  output_path = f"/tmp/{uuid.uuid4()}.wav"

  try:
    # 3. 음성 생성
     # TTS 기반 음성 생성
    wav, sampling_rate = torchaudio.load(speaker_path)
    speaker = model.make_speaker_embedding(wav, sampling_rate)

    print(f"8 = {emotion[8]}으로 생성 :\n({text})")

    cond_dict = make_cond_dict(text=text, speaker=speaker, language="ko", emotion = emotion[8])
    conditioning = model.prepare_conditioning(cond_dict)

    codes = model.generate(conditioning)
    wavs = model.autoencoder.decode(codes).cpu()

    torchaudio.save(output_path, wavs[0], model.autoencoder.sampling_rate)

    # 4. S3 업로드
    with open(output_path, "rb") as f:
      s3_key = f"tts_outputs/{uuid.uuid4()}.wav"
      s3_url = upload_file_to_s3(f, s3_key, "audio/wav")

    return s3_url

  except Exception as e:
    print(f"❌ generate_tts 실패: {e}")
    raise

  finally:
    # 5. 임시파일 정리
    if os.path.exists(speaker_path):
      os.remove(speaker_path)
    if os.path.exists(output_path):
      os.remove(output_path)