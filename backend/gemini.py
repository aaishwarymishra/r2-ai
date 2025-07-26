from google import genai
from google.genai import types
from dotenv import load_dotenv
import requests

load_dotenv()

client = genai.Client()

def generate_text(prompt: str,ImageUrl:str=None) -> str:
    try:
        if ImageUrl:
            image_content = requests.get(ImageUrl).content
            contents = [
                types.Part.from_bytes(
                    data=image_content,mime_type="image/jpeg"
                ),
                prompt
            ]
        else:
            contents = [prompt]
        response = client.models.generate_content_stream(
            model="gemini-2.5-flash",
            contents=contents,
        )
        for chunk in response:
            yield chunk.text
    except Exception as e:
        raise RuntimeError(f"Failed to generate text: {str(e)}")