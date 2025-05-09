# db/queries/letters.py
from db.db import database
from db.models import letters
from sqlalchemy import func


async def insert_letter(character_id: int, child_id: int, book_id: int,
    content: str, message_type: bool,audio_url: str) -> None:
  query = letters.insert().values(
      character_id=character_id,
      child_id=child_id,
      book_id=book_id,
      letter_content=content,
      is_read=False,
      message_type=message_type,
      audio_url=audio_url,
      created_at=func.now(),
      updated_at=func.now(),
  )
  await database.execute(query)