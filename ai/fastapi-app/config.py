#config.py

from dotenv import load_dotenv
import os

load_dotenv()  # .env 파일 읽어오기

# Kafka
KAFKA_BOOTSTRAP_SERVERS = os.getenv("KAFKA_BOOTSTRAP_SERVERS")
KAFKA_TOPIC = os.getenv("KAFKA_TOPIC")
KAFKA_GROUP_ID = os.getenv("KAFKA_GROUP_ID", "default-group")
KAFKA_RESULT_TOPIC = os.getenv("KAFKA_RESULT_TOPIC")

# OpenAI
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# DB
DATABASE_URL = os.getenv("DATABASE_URL")

# S3
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_REGION = os.getenv("AWS_REGION", "ap-northeast-2")
S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME")

VOICE_TYPE_URLS = {
    1: "https://donghwasoop-bucket.s3.amazonaws.com/user-voices/44cc8171-b2d4-4142-8ae2-ba52d0ef0ed7_공주.wav",
    2: "https://donghwasoop-bucket.s3.amazonaws.com/user-voices/1864337b-bb5c-42b3-adcc-895490e7a45b_왕자.wav",
    3: "https://donghwasoop-bucket.s3.amazonaws.com/user-voices/61f4ce17-7a23-4978-b27f-a82356d951ad_할아버지.wav",
    4: "https://donghwasoop-bucket.s3.amazonaws.com/user-voices/4dcbd4e8-8780-4fb9-a761-05fdb22e44b5_악역남자.wav",
    5: "https://donghwasoop-bucket.s3.amazonaws.com/user-voices/eddb662e-3034-47e9-b53c-24762ece063a_여자아이.wav",
    6: "https://donghwasoop-bucket.s3.amazonaws.com/user-voices/699deb07-dd90-4bf4-9972-266611eb853f_남자아이.wav",
    7: "https://donghwasoop-bucket.s3.amazonaws.com/user-voices/6504a473-e011-447e-a035-353888b2089b_중년남성.wav",
    8: "https://donghwasoop-bucket.s3.amazonaws.com/user-voices/b80b1ac4-d088-4fca-9a91-e9eba819c869_여자악역.wav",
    9: "https://donghwasoop-bucket.s3.amazonaws.com/user-voices/55448f6f-cdc1-4001-8a4a-b84b0c572f64_남자청년.wav",
}