#services/letters_service.py
from db.db import database
from db.models import characters, letters, children
from services.openai_client import ask_chatgpt
from db.queries.letters import insert_letter
from config import VOICE_TYPE_URLS
from services.tts_service import generate_tts
import asyncio

async def generate_letter(letter_id: int) -> str:
  # 1. 기존 편지에서 character_id, child_id 조회
  original_letter = await wait_for_letter(letter_id)

  if not original_letter:
    raise ValueError("기존 편지를 찾을 수 없습니다.")

  character_id = original_letter["character_id"]
  child_id = original_letter["child_id"]
  book_id = original_letter["book_id"]
  previous_content = original_letter["letter_content"]

  # 2. 캐릭터 정보 조회
  char_query = characters.select().where(characters.c.character_id == character_id)
  character = await database.fetch_one(char_query)

  if not character:
    raise ValueError("캐릭터를 찾을 수 없습니다.")

  character_name = character["name"]

  # 3. 아이 이름 조회
  child_query = children.select().where(children.c.child_id == child_id)
  child = await database.fetch_one(child_query)

  if not child:
    raise ValueError("아이를 찾을 수 없습니다.")

  child_name = child["name"]

  # 4. 프롬프트 생성
  prompt = f"""
  너의 이름은 "{character_name}"
  너는 다음과 같은 성격을 가진 캐릭터야: "{character['ai_prompt']}"
  다음은 {child_name}가 너에게 보낸 편지야:
  "{previous_content}"

  해당 성격과 편지를 바탕으로 너의 답장을 작성해줘. 대상 아이의 이름은 '{child_name}'이야.
  분량은 4~5문장 정도로, 이름을 한두 번 자연스럽게 언급하면서 친근하고 따뜻하게 써줘.
      """.strip()

  print(prompt)

  # 5. GPT 호출
  ai_letter = await ask_chatgpt(prompt)

  # TTS 생성
  voice_type_id = character["voice_type_id"]
  voice_url = VOICE_TYPE_URLS.get(voice_type_id)

  if not voice_url:
    voice_url = VOICE_TYPE_URLS.get(1)

  tts_url = await generate_tts(ai_letter, speaker_url=voice_url)

  # 6. DB 저장
  await insert_letter(character_id, child_id, book_id, ai_letter, message_type=False, audio_url=tts_url)

  return ai_letter


# Mysql로 부터 편지 불러오는 함수
async def wait_for_letter(letter_id: int, max_attempts=5, delay=0.3):
  for attempt in range(max_attempts):
    letter_query = letters.select().where(letters.c.letter_id == letter_id)
    original_letter = await database.fetch_one(letter_query)
    if original_letter:
      return original_letter
    await asyncio.sleep(delay)

  raise ValueError("기존 편지를 찾을 수 없습니다.")