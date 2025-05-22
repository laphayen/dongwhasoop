FROM python:3.11-slim

# 시스템 패키지 설치
RUN apt-get update && apt-get install -y git ffmpeg wget

# 작업 디렉토리
WORKDIR /app

#PyTorch 설치
RUN pip install --upgrade pip
RUN pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu


# 나머지 패키지 설치
COPY requirements.txt .
RUN pip install -r requirements.txt

# 앱 복사
COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
