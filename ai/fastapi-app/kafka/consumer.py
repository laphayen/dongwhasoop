#kafka/consumer.py
from aiokafka import AIOKafkaConsumer
from config import KAFKA_BOOTSTRAP_SERVERS, KAFKA_TOPIC, KAFKA_GROUP_ID
import json
from services.tts_service import generate_tts_batch_and_upload
from services.letters_service import generate_letter
from db.utils import with_session


async def consume_messages():
    consumer = AIOKafkaConsumer(
        KAFKA_TOPIC,
        bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
        group_id=KAFKA_GROUP_ID,
    )

    await consumer.start()
    print("✅ Kafka consumer started")

    try:
        async for msg in consumer:
            print(f"Consumed: {msg.value.decode('utf-8')}")

            try:
                decoded = msg.value.decode('utf-8')
                data = json.loads(decoded)

                match data.get("type"):
                    case "CREATE_TTS":
                        print("음성 생성 로직 실행")
                        payload = data["payload"]
                        book_id = payload["book_id"]
                        voice_id = payload["voice_id"]
                        user_id = payload["user_id"]

                        # 동화 페이지 조회 → 음성 생성 → S3 저장
                        await with_session(
                            lambda session: generate_tts_batch_and_upload(
                                session, book_id, voice_id, user_id)
                        )
                    case "WRITE_LETTER":
                        # 다른 로직 처리
                        print("답장 생성 로직 실행")
                        payload = data["payload"]
                        letter_id = payload["letter_id"]
                        await with_session(
                            lambda session: generate_letter(session, letter_id)
                        )
                    case _:
                        print(
                            f"⚠️ Unknown message type: {data.get('type')}")

            except Exception as e:
                print(f"❌ Error while consuming message: {e}")
    finally:
        await consumer.stop()
        print("🛑 Kafka consumer stopped")