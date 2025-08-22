from google import genai
from google.genai import types
from dotenv import load_dotenv
import requests
import os
from typing import Generator, Optional

load_dotenv()

# Prefer GOOGLE_API_KEY, fallback to GEMINI_API_KEY
API_KEY = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=API_KEY) if API_KEY else genai.Client()


def generate_text(prompt: str, ImageUrl: Optional[str] = None) -> Generator[str, None, None]:
    try:
        if ImageUrl:
            image_content = requests.get(ImageUrl).content
            contents = [
                types.Part.from_bytes(data=image_content, mime_type="image/jpeg"),
                prompt,
            ]
        else:
            contents = [prompt]

        response = client.models.generate_content_stream(
            model="gemini-2.5-flash",
            contents=contents,
        )
        for chunk in response:
            # Some chunks might be None or have empty text
            if hasattr(chunk, "text") and chunk.text:
                yield chunk.text
    except Exception as e:
        raise RuntimeError(f"Failed to generate text: {str(e)}")