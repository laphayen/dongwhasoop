#db/models.py
from sqlalchemy import Table, Column, Integer, BigInteger, String, DateTime,Boolean, MetaData, ForeignKey, ForeignKeyConstraint

metadata = MetaData()

story_pages = Table(
    "story_pages",
    metadata,
    Column("page_number", Integer, primary_key=True),
    Column("book_id", BigInteger, primary_key=True),
    Column("created_at", DateTime),
    Column("updated_at", DateTime),
    Column("image_url", String(255)),
    Column("text_content", String(255)),
    schema="fairytale"
)

user_voices = Table(
    "user_voices",
    metadata,
    Column("voice_id", BigInteger, primary_key=True),
    Column("gender", Integer),  # BIT(1) → Integer로 처리
    Column("created_at", DateTime),
    Column("updated_at", DateTime),
    Column("user_id", BigInteger, ForeignKey("fairytale.users.user_id")),
    Column("voice_url", String(255)),
    schema="fairytale"
)

page_audios = Table(
    "page_audios",
    metadata,
    Column("audio_id", BigInteger, primary_key=True, autoincrement=True),
    Column("page_number", Integer),
    Column("book_id", BigInteger),
    Column("voice_id", BigInteger, ForeignKey("fairytale.user_voices.voice_id")),
    Column("created_at", DateTime),
    Column("updated_at", DateTime),
    Column("audio_url", String(255)),
    Column("voice_url", String(255)),
    schema="fairytale"
)

letters = Table(
    "letters",
    metadata,
    Column("letter_id", BigInteger, primary_key=True),
    Column("book_id", BigInteger),
    Column("child_id", BigInteger),
    Column("letter_content", String(10000)),
    Column("is_read", Boolean),
    Column("message_type", Boolean),
    Column("character_id", BigInteger, ForeignKey("fairytale.characters.character_id")),
    Column("created_at", DateTime),
    Column("updated_at", DateTime),
    Column("audio_url",String(255)),
    ForeignKeyConstraint(
        ["book_id", "child_id"],
        ["fairytale.letter_boxes.book_id", "fairytale.letter_boxes.child_id"]
    ),
    schema="fairytale"
)

characters = Table(
    "characters",
    metadata,
    Column("character_id", BigInteger, primary_key=True),
    Column("book_id", BigInteger, ForeignKey("fairytale.books.book_id")),
    Column("created_at", DateTime),
    Column("updated_at", DateTime),
    Column("ai_prompt", String(255)),
    Column("image_url", String(255)),
    Column("name", String(255)),
    Column("voice_type_id",Integer),
    schema="fairytale"
)

children = Table(
    "children",
    metadata,
    Column("child_id", BigInteger, primary_key=True),
    Column("user_id", BigInteger, ForeignKey("fairytale.users.user_id")),
    Column("mascot_id", Integer),
    Column("created_at", DateTime),
    Column("updated_at", DateTime),
    Column("name", String(255)),
    schema="fairytale"
)
