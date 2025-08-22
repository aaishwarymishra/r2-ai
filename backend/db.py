from datetime import datetime
from pymongo import MongoClient
from dotenv import load_dotenv
from bson.objectid import ObjectId
import schema
import os

load_dotenv()

def connect_to_mongo():
    if not os.getenv("MONGO_CONNECTION_STRING"):
        raise ValueError("MONGO_CONNECTION_STRING environment variable is not set.")
    client = MongoClient(os.getenv("MONGO_CONNECTION_STRING"))
    print("Connected to MongoDB")
    return client

def check_db(client):
    db = client["gemini_chat_bot"]

    try:

        if "userChat" not in db.list_collection_names():
            db.create_collection("userChat", validator=schema.userChat)
            print("Created userChat collection with schema validation.")
        
        if "chats" not in db.list_collection_names():
            db.create_collection("chats", validator=schema.chats)
            print("Created chats collection with schema validation.")
    except Exception as e:
        print(f"Error checking or creating collections: {e}")


def insert_user_chat(client, user_chat_data):
    db = client["gemini_chat_bot"]
    user_chat_collection = db["userChat"]
    
    try:
        result = user_chat_collection.insert_one(user_chat_data)
        print(f"Inserted user chat with ID: {result.inserted_id}")
        return result.inserted_id
    except Exception as e:
        print(f"Error inserting user chat: {e}")
        return None
    
def insert_chat(client, chat_data):
    db = client["gemini_chat_bot"]
    chats_collection = db["chats"]
    
    try:
        result = chats_collection.insert_one(chat_data)
        print(f"Inserted chat with ID: {result.inserted_id}")
        return result.inserted_id
    except Exception as e:
        print(f"Error inserting chat: {e}")
        return None

def find_user(client, user_id):
    db = client["gemini_chat_bot"]
    user_chat_collection = db["userChat"]
    
    try:
        user_chat = user_chat_collection.find_one({"userId": user_id})
        return user_chat
    except Exception as e:
        print(f"Error finding user: {e}")
        return None
    
def find_chat(client, chat_id):
    db = client["gemini_chat_bot"]
    chats_collection = db["chats"]
    
    try:
        chat = chats_collection.find_one({"_id": ObjectId(chat_id)})
        return chat
    except Exception as e:
        print(f"Error finding chat: {e}")
        return None

def update_user_chat(client, user_id, chat_id, title):
    db = client["gemini_chat_bot"]
    user_chat_collection = db["userChat"]
    
    try:
        result = user_chat_collection.update_one(
            {"userId": user_id},
            {"$push": {"chats": {"chat_id": chat_id, "title": title, "CreatedAt": datetime.utcnow()}}},
        )
        if result.modified_count > 0:
            print(f"Updated user chat for userId: {user_id}")
        else:
            print(f"No updates made for userId: {user_id}")
    except Exception as e:
        print(f"Error updating user chat: {e}")

def update_chat(client, chat_id, messages):
    db = client["gemini_chat_bot"]
    chats_collection = db["chats"]
    
    try:
        result = chats_collection.update_one(
            {"_id": ObjectId(chat_id)},
            {"$push": {"history": {"$each": messages}}}
        )
        if result.modified_count > 0:
            print(f"Updated chat with ID: {chat_id}")
        else:
            print(f"No updates made for chat ID: {chat_id}")
    except Exception as e:
        print(f"Error updating chat: {e}")

# schema validator
def update_schema(client):
    db = client["gemini_chat_bot"]
    try:
        db.command("collMod", "userChat", validator=schema.userChat)
        print("Updated userChat collection schema.")
        
        db.command("collMod", "chats", validator=schema.chats)
        print("Updated chats collection schema.")
    except Exception as e:
        print(f"Error updating collection schemas: {e}")
