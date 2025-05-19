from aiokafka import AIOKafkaConsumer
from config import KAFKA_BOOTSTRAP_SERVERS, KAFKA_TOPIC, KAFKA_GROUP_ID
import json
import asyncio  # 비동기 작업을 위한 asyncio 라이브러리 추가
from services.tts_service import generate_tts_batch_and_upload
from services.letters_service import generate_letter
from db.utils import with_session


# 메시지 처리 로직을 별도의 비동기 함수로 분리
# 이렇게 하면 각 메시지를 독립적인 태스크로 처리할 수 있음
async def process_message(data):
    try:
        match data.get("type"):
            case "CREATE_TTS":
                print("음성 생성 로직 실행")
                payload = data["payload"]
                book_id = payload["book_id"]
                voice_id = payload["voice_id"]
                user_id = payload["user_id"]

                # # 동화 페이지 조회 → 음성 생성 → S3 저장
                await with_session(
                    lambda session: generate_tts_batch_and_upload(
                        session, book_id, voice_id, user_id)
                )
            case "WRITE_LETTER":
                print("답장 생성 로직 실행")
                payload = data["payload"]
                letter_id = payload["letter_id"]
                await with_session(
                    lambda session: generate_letter(session, letter_id)
                )
            case _:
                print(f"⚠️ Unknown message type: {data.get('type')}")
    except Exception as e:
        print(f"❌ Error processing message: {e}")


async def consume_messages():
    consumer = AIOKafkaConsumer(
        KAFKA_TOPIC,
        bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
        group_id=KAFKA_GROUP_ID,
    )

    await consumer.start()
    print("✅ Kafka consumer started")

    # 세마포어 생성: 동시에 처리할 수 있는 메시지 수를 10개로 제한
    # 이것은 시스템 리소스(메모리, CPU, DB 연결 등)를 보호하기 위한 장치
    semaphore = asyncio.Semaphore(10)  # 최대 10개 동시 처리

    # 생성된 모든 태스크를 추적하기 위한 집합(set) 생성
    # 이를 통해 프로그램 종료 시 모든 태스크가 완료될 때까지 기다릴 수 있음
    tasks = set()

    try:
        # Kafka 메시지를 비동기적으로 하나씩 가져옴
        async for msg in consumer:
            print(f"Consumed: {msg.value.decode('utf-8')}")

            try:
                decoded = msg.value.decode('utf-8')
                data = json.loads(decoded)

                # 세마포어를 적용한 내부 함수 정의
                # 이 함수는 세마포어를 획득하고, 메시지를 처리한 후, 세마포어를 해제
                async def process_with_semaphore():
                    # 세마포어를 사용하여 동시에 실행되는 태스크 수 제한
                    # 이 블록에 들어갈 때 세마포어 카운트가 0이면 다른 태스크가 완료될 때까지 대기
                    async with semaphore:
                        await process_message(data)

                # 새로운 비동기 태스크 생성 (메시지 처리를 백그라운드에서 실행)
                # 이렇게 하면 메시지 처리가 완료되기를 기다리지 않고 즉시 다음 메시지를 받을 수 있음
                task = asyncio.create_task(process_with_semaphore())

                # 생성된 태스크를 tasks 집합에 추가
                tasks.add(task)

                # 태스크가 완료되면 tasks 집합에서 자동으로 제거하도록 콜백 설정
                # 이렇게 하면 메모리 누수 없이 태스크를 관리할 수 있음
                task.add_done_callback(tasks.discard)

            except Exception as e:
                print(f"❌ Error while consuming message: {e}")
    finally:
        # 프로그램이 종료될 때 모든 실행 중인 태스크가 완료될 때까지 대기
        # 이렇게 하면 메시지 처리가 중간에 중단되지 않고 모두 완료됨
        if tasks:
            await asyncio.gather(*tasks)

        # Kafka 컨슈머 종료
        await consumer.stop()
        print("🛑 Kafka consumer stopped")