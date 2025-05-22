from openai import AsyncOpenAI
from config import OPENAI_API_KEY

client = AsyncOpenAI(api_key=OPENAI_API_KEY)

async def ask_chatgpt(prompt: str) -> str:
    response = await client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "system", "content": "넌 캐릭터를 연기해서 답장을 주는 역할이야"},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content

