from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from rag_engine import RAGService
import os

app = FastAPI(
    title="Marrakech AI API",
    description="Backend for the Moroccan Tourism App",
    version="1.0.0"
)

# Initialize RAG Engine on startup
# This ensures we load the DB only once, not for every request
rag_service = RAGService()

class ChatRequest(BaseModel):
    query: str

class ChatResponse(BaseModel):
    response: str
    
@app.get("/")
def home():
    return {"message": "Welcome to the Digital Marrakech API"}

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        # Pass the user query to our RAG engine
        result = rag_service.get_answer(request.query)
        return {"response": result['result']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Placeholder for Phase 3 (Translation)
@app.get("/api/translate-health")
def translate_health():
    return {"status": "Terjman module ready for integration"}
