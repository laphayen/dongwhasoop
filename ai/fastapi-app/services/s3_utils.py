# services/s3_utils.py
import boto3
from botocore.exceptions import BotoCoreError, ClientError
from config import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET_NAME
from urllib.parse import urlparse


s3 = boto3.client(
    "s3",
    region_name=AWS_REGION,
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
)

def upload_file_to_s3(file_obj, filename: str, content_type: str) -> str:
    try:
        s3.upload_fileobj(
            file_obj,
            S3_BUCKET_NAME,
            filename,
            ExtraArgs={"ContentType": content_type}
        )
        return f"https://{S3_BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{filename}"
    except (BotoCoreError, ClientError) as e:
        raise RuntimeError(f"S3 업로드 실패: {e}")


def load_file_from_s3(filename: str) -> bytes:
  """
  S3에서 파일을 바이너리로 불러옴
  """
  try:
    key = extract_s3_key_from_url(filename)
    response = s3.get_object(Bucket=S3_BUCKET_NAME, Key=key)
    return response['Body'].read()
  except (BotoCoreError, ClientError) as e:
    raise RuntimeError(f"S3 파일 읽기 실패: {e}")

def extract_s3_key_from_url(url: str) -> str:
    """
    S3 URL에서 key만 추출
    """
    return urlparse(url).path.lstrip("/")