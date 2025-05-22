from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession
from db.db import AsyncSessionLocal

async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session