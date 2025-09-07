from fastapi import FastAPI, HTTPException, Body
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from imagekitio import ImageKit
import os
from dotenv import load_dotenv
from gemini import generate_text
import requests
from db import (
    connect_to_mongo,
    check_db,
    insert_user_chat,
    insert_chat,
    find_user,
    find_chat,
    update_user_chat,
    update_chat,
)
from bson.objectid import ObjectId
import json


# Load .env from this backend folder explicitly
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000")],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

imagekit = ImageKit(
    private_key=os.getenv("IMAGEKIT_PRIVATE_KEY"),
    public_key = os.getenv("IMAGEKIT_PUBLIC_KEY"),
    url_endpoint=os.getenv("IMAGEKIT_URL_ENDPOINT")
)

# Initialize DB connection
mongo_client = None
try:
    mongo_client = connect_to_mongo()
    check_db(mongo_client)
except Exception as e:
    print(f"[Startup] Mongo initialization failed: {e}")


@app.get("/api/ping")
async def ping():
    return JSONResponse({"message": "pong"})


@app.get("/api/upload")
async def read_root():
    if not imagekit:
        raise HTTPException(
            status_code=500,
            detail="ImageKit is not configured."
        )
    
    try:
        auth_params = imagekit.get_authentication_parameters()
        return JSONResponse(auth_params)
    
    except Exception as e:
        raise HTTPException(
            status_code = 500,
            detail = "Failed to authenticate"
        )

@app.post("/api/generate-text")
async def generate_text_endpoint(prompt: str, imageUrl: str | None = None, chatId: str | None = None):
    if not prompt:
        raise HTTPException(
            status_code=400,
            detail="Prompt cannot be empty."
        )
    try:
        doc = find_chat(mongo_client, chatId) if chatId and mongo_client else None
        history = doc.get("history", []) if doc else []
        def stream_and_persist():
            accumulated = ""
            try:
                for chunk in generate_text(history, prompt, imageUrl):
                    text_piece = chunk
                    accumulated += text_piece
                    yield text_piece
            finally:
                try:
                    if chatId and mongo_client and accumulated:
                        # Build user and model messages
                        user_parts = [{"text": prompt}]
                        if imageUrl:
                            user_parts[0]["img"] = imageUrl
                        messages = [
                            {"role": "user", "parts": user_parts},
                            {"role": "model", "parts": [{"text": accumulated}]},
                        ]
                        update_chat(mongo_client, chatId, messages)
                except Exception as persist_err:
                    # Log persist errors but don't break the stream
                    print(f"[Persist] Failed to update chat {chatId}: {persist_err}")

        return StreamingResponse(stream_and_persist(), media_type="text/plain")
    
    
    except RuntimeError as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
    except Exception as e:
        return JSONResponse(
            {"text": "An error occurred while generating text."}, 
            status_code=500
        )


@app.post("/api/new-chat")
async def create_new_chat(payload: dict = Body(...)):
    """Create a new chat for a user and insert the first user message.
    Body: { userId: str, text: str }
    Returns: { chatId: str }
    """
    user_id = payload.get("userId")
    text = payload.get("text", "").strip()
    if not user_id or not text:
        raise HTTPException(status_code=400, detail="userId and text are required")

    if not mongo_client:
        raise HTTPException(status_code=500, detail="Database not initialized")

    # Create the chat document with initial history
    chat_doc = {
        "userId": user_id,
        "history": [
            {"role": "user", "parts": [{"text": text}]},
        ]
    }
    chat_id = insert_chat(mongo_client, chat_doc)
    if not chat_id:
        raise HTTPException(status_code=500, detail="Failed to create chat")

    # Ensure userChat exists and append the new chat reference
    user_doc = find_user(mongo_client, user_id)
    if not user_doc:
        insert_user_chat(mongo_client, {"userId": user_id, "chats": []})

    # Simple title from first few words
    title = (text[:50] + ("..." if len(text) > 50 else "")).strip()
    update_user_chat(mongo_client, user_id, chat_id, title)

    return JSONResponse({"chatId": str(chat_id)})


@app.get("/api/chats/{userId}")
async def list_user_chats(userId: str):
    """Return the user's chat sidebar list. Returns a JSON string to match client expectations."""
    if not mongo_client:
        raise HTTPException(status_code=500, detail="Database not initialized")
    doc = find_user(mongo_client, userId)
    if not doc:
        # Return an empty structure consistent with schema
        content = json.dumps({"userId": userId, "chats": []}, default=str)
        return JSONResponse(content, media_type="application/json")
    # bson ObjectId is not JSON serializable, convert via default=str then the client JSON.parse
    content = json.dumps({"userId": doc.get("userId"), "chats": doc.get("chats", [])}, default=str)
    return JSONResponse(content, media_type="application/json")


@app.get("/api/chat/{chatId}")
async def get_chat(chatId: str):
    """Return a chat document by id. Returns a JSON string to match client expectations."""
    if not mongo_client:
        raise HTTPException(status_code=500, detail="Database not initialized")
    try:
        doc = find_chat(mongo_client, chatId)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid chat id: {e}")

    if not doc:
        raise HTTPException(status_code=404, detail="Chat not found")

    # Convert _id to string and dump whole doc
    serializable = {
        "_id": str(doc.get("_id")),
        "history": doc.get("history", []),
    }
    content = json.dumps(serializable, default=str)
    return JSONResponse(content, media_type="application/json")