import os
from dotenv import load_dotenv

load_dotenv()

MOCK_IMAGE_URL = "https://placehold.co/800x500/6366f1/ffffff?text=AI+Generated+Image"


def generate_image_url(prompt: str, style: str | None = None, api_key: str | None = None) -> str:
    key = api_key or os.getenv("OPENAI_API_KEY")
    if not key:
        return MOCK_IMAGE_URL

    try:
        from openai import OpenAI
        client = OpenAI(api_key=key)
        style_prompt = f"{style}. " if style else ""
        resp = client.images.generate(
            model="dall-e-3",
            prompt=f"{style_prompt}{prompt}",
            size="1024x1024",
            quality="standard",
            n=1,
        )
        return resp.data[0].url or MOCK_IMAGE_URL
    except Exception:
        return MOCK_IMAGE_URL
