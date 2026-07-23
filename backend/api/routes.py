from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
from typing import Optional
from services.llm import generate_content, chat_with_assistant
from services.image_gen import generate_image_url
from services.sentiment import analyze_sentiment_text

router = APIRouter(prefix="/api")

# --- Models ---

class ContentRequest(BaseModel):
    prompt: str
    type: str
    tone: Optional[str] = None

class ContentResponse(BaseModel):
    content: str

class ImageRequest(BaseModel):
    prompt: str
    style: Optional[str] = None

class ImageResponse(BaseModel):
    url: str

class SentimentRequest(BaseModel):
    text: str

class SentimentResponse(BaseModel):
    sentiment: str
    score: float

class ChatRequest(BaseModel):
    message: str
    history: Optional[list[dict]] = None

class ChatResponse(BaseModel):
    reply: str

# --- Routes ---

@router.get("/health")
async def health():
    return {"status": "ok"}

@router.post("/generate-content", response_model=ContentResponse)
async def content_endpoint(req: ContentRequest, x_api_key: Optional[str] = Header(None)):
    try:
        content = generate_content(req.prompt, req.type, req.tone, api_key=x_api_key)
        return ContentResponse(content=content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/generate-image", response_model=ImageResponse)
async def image_endpoint(req: ImageRequest, x_api_key: Optional[str] = Header(None)):
    try:
        url = generate_image_url(req.prompt, req.style, api_key=x_api_key)
        return ImageResponse(url=url)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/analyze-sentiment", response_model=SentimentResponse)
async def sentiment_endpoint(req: SentimentRequest):
    try:
        result = analyze_sentiment_text(req.text)
        return SentimentResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(req: ChatRequest, x_api_key: Optional[str] = Header(None)):
    try:
        reply = chat_with_assistant(req.message, req.history, api_key=x_api_key)
        return ChatResponse(reply=reply)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
