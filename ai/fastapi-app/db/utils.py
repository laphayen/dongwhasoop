# db/utils.py
from db.db import AsyncSessionLocal
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Callable, Awaitable

async def with_session(fn: Callable[[AsyncSession], Awaitable[None]]):
    async with AsyncSessionLocal() as session:
        try:
            await fn(session)
            await session.commit()
        except Exception:
            await session.rollback()
            raise
