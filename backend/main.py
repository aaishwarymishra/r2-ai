from fastapi import FastAPI,HTTPException
from fastapi.responses import JSONResponse 
from fastapi.middleware.cors import CORSMiddleware
from imagekitio import ImageKit
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

imagekit = ImageKit(
    private_key=os.getenv("IMAGEKIT_PRIVATE_KEY"),
    public_key = os.getenv("IMAGEKIT_PUBLIC_KEY"),
    url_endpoint=os.getenv("IMAGEKIT_URL_ENDPOINT")
)


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

