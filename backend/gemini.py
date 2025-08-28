from google import genai
from google.genai import types
from dotenv import load_dotenv
import requests
import os
from typing import Generator, Optional
import base64

load_dotenv()

# Prefer GOOGLE_API_KEY, fallback to GEMINI_API_KEY
API_KEY = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=API_KEY) if API_KEY else genai.Client()


# for formatting incoming prompt with image
def format(prompt: str, ImageUrl: Optional[str] = None) -> list:
        if ImageUrl:
            image_content = requests.get(ImageUrl).content
            contents = [
                types.Part.from_bytes(data=image_content, mime_type="image/jpeg"),
                prompt,
            ]
        else:
            contents = [prompt]
        return contents

def handle_image_in_history(history: list[dict]) -> list:
    formatted_history = []
    for entry in history:
        formatted_entry = {"role": entry["role"], "parts": []}
        for part in entry.get("parts", []):
            text = part.get("text")
            img_url = part.get("img")
            if img_url:
                image_content = requests.get(img_url).content
                img = {"inline_data":{
                    "mime_type": "image/jpeg",
                    "data":  base64.b64encode(image_content).decode('utf-8')
                }}
                image_content = requests.get(img_url).content
                formatted_entry["parts"].append(img)
            if text:
                text = {"text": text}
                formatted_entry["parts"].append(text)
        formatted_history.append(formatted_entry)
    return formatted_history

def generate_text(history:list[dict],prompt: str, ImageUrl: str = None) -> Generator[str, None, None]:
    try:
        contents = format(prompt, ImageUrl)
        history = handle_image_in_history(history)
        chat = client.chats.create(
            model="gemini-2.5-flash",
            history=history,
        )
        response = chat.send_message_stream(message=contents)
        for chunk in response:
            # Some chunks might be None or have empty text
            if hasattr(chunk, "text") and chunk.text:
                yield chunk.text
    except Exception as e:
        raise RuntimeError(f"Failed to generate text: {str(e)}")