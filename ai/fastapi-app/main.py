# main.py
# 가상 환경 생성 python -m venv .venv
# 가상 환경 활성화 .venv\Scripts\activate.bat
# 서버 실행 uvicorn main:app --reload
import logging
from logstash_async.handler import AsynchronousLogstashHandler
from logstash_async.formatter import LogstashFormatter

from fastapi import FastAPI, UploadFile, File
from contextlib import asynccontextmanager
import asyncio

from kafka.producer import start_producer, stop_producer, send_message
from kafka.consumer import consume_messages
from config import KAFKA_TOPIC

from services.s3_utils import upload_file_to_s3

consumer_task: asyncio.Task # 백그라운드 태스크 (지속적으로 카프카로부터 메시지를 읽어옴)
# 기본 로거 설정
logger = logging.getLogger("fastapi-app")
logger.setLevel(logging.INFO)

# 콘솔 핸들러
console_handler = logging.StreamHandler()
logger.addHandler(console_handler)

# Logstash 핸들러
logstash_handler = AsynchronousLogstashHandler(
    host='logstash',  # Logstash 컨테이너 이름
    port=5044,       # Logstash TCP 포트 (5044가 일반적인 포트입니다. 5046이 맞는지 확인 필요)
    database_path=None
)
formatter = LogstashFormatter()
logstash_handler.setFormatter(formatter)
logger.addHandler(logstash_handler)

#FastAPI 앱의 생명 주기(Lifecycle)를 관리
@asynccontextmanager
async def lifespan(app: FastAPI):
    global consumer_task

    await start_producer()
    consumer_task = asyncio.create_task(consume_messages())
    try:
        yield
    finally:
        await stop_producer()
        if consumer_task:
            consumer_task.cancel()
            try:
                await consumer_task
            except asyncio.CancelledError:
                print("🛑 Kafka consumer task cancelled")

app = FastAPI(lifespan=lifespan)

@app.middleware("http")
async def logging_middleware(request, call_next):
    logger.info(f"Request started: {request.method} {request.url.path}")
    response = await call_next(request)
    logger.info(f"Request completed: {request.method} {request.url.path} - Status: {response.status_code}")
    return response

# 예외 처리
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logger.error(f"Exception occurred: {str(exc)}", exc_info=True)
    return {"message": "Internal Server Error", "detail": str(exc)}, 500

# 로그 테스트 엔드포인트
@app.get("/api/test-log")
def test_log():
    logger.debug("DEBUG 로그 메시지")
    logger.info("INFO 로그 메시지")
    logger.warning("WARNING 로그 메시지")
    logger.error("ERROR 로그 메시지")
    return {"message": "로그가 ELK 스택으로 전송되었습니다!"}

# 서버 테스트
@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

# 카프카 produce 테스트
@app.post("/send")
async def send(message: str):
    await send_message(KAFKA_TOPIC, message)
    return {"status": "sent", "message": message}

#S3 테스트
@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    file_url = upload_file_to_s3(
        file_obj=file.file,
        filename=file.filename,
        content_type=file.content_type
    )
    return {"file_url": file_url}