chats = {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["_id", "userId", "history"],

        "properties": {
            "_id": {
                "bsonType": "objectId",
                "description": "must be an objectId and is required"
            },
            "userId": {
                "bsonType": "string",
                "description": "must be a string and is required"
            },
            "history": {
                "bsonType": "array",
                "description": "must be an array and is required",
                "items": {
                    "bsonType": "object",
                    "required": ["role", "parts"],
                    "properties": {
                        "role": {
                            "bsonType": "string",
                            "description": "must be a string and is required",
                            "enum": ["user", "model", "system"]
                        },
                        "parts": {
                            "bsonType": "array",
                            "description": "must be an array and is required",
                            "items": {
                                "bsonType": "object",
                                "required": ["text"],
                                "properties": {
                                    "text": {
                                        "bsonType": "string",
                                        "description": "must be a string and is required"
                                    },
                                    "img":{
                                        "bsonType": "string",
                                    }
                                }    
                            }
                        }
                    }
                }
            }    
        }
    }
}

userChat = {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["userId"],

        "properties": {
            "userId": {
                "bsonType": "string",
                "description": "must be a string and is required"
            },
            "chats":{
                "bsonType": "array",
                "description": "must be an array and is required",
                "items": {
                    "bsonType": "object",
                    "required": ["chat_id","title"],
                    "description": "must be an objectId",
                    "properties": {
                        "chat_id": {
                            "bsonType": "objectId",
                            "description": "must be an objectId and is required"
                        },
                        "title": {
                            "bsonType": "string",
                            "description": "must be a string and is required"
                        },
                        "CreatedAt": {
                            "bsonType": "date",
                            "description": "must be a date" ,
                        },
                    }
                }
            }
        }
    }
}

