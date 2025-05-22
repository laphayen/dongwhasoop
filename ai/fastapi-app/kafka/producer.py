#kafka/producer.py
from aiokafka import AIOKafkaProducer
import json
from config import KAFKA_BOOTSTRAP_SERVERS,KAFKA_RESULT_TOPIC

producer: AIOKafkaProducer = AIOKafkaProducer(bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS)

async def start_producer():
    await producer.start()
    print("✅ Kafka producer started")

async def stop_producer():
    if producer and not producer._closed:
        await producer.stop()
        print("🛑 Kafka producer stopped")

async def send_message(topic: str, message: str):
    await producer.send_and_wait(topic, message.encode("utf-8"))

# 음성 생성 답변
async def send_result_message(message: dict):
    await producer.send_and_wait(KAFKA_RESULT_TOPIC, json.dumps(message).encode("utf-8"))