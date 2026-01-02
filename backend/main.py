import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import uvicorn

# Chargement du fichier .env
load_dotenv()

# --- IMPORTS SÉCURISÉS ---
# Si un fichier manque, l'API ne crashera pas totalement
try:
    from rag_engine import RAGService
except ImportError:
    print("⚠️ RAGService non trouvé.")
    RAGService = None

try:
    from security_agent import SecurityAgent
except ImportError:
    print("⚠️ SecurityAgent non trouvé.")
    SecurityAgent = None

try:
    from translator import translate_hybrid
except ImportError:
    print("⚠️ Translator non trouvé.")
    translate_hybrid = None


# --- CONFIGURATION API ---
app = FastAPI(title="ZELIG API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- DÉMARRAGE MOTEURS ---
print("🚀 Démarrage ZELIG...")

rag_engine = None
if RAGService:
    try:
        rag_engine = RAGService()
        print("✅ Moteur RAG : Prêt")
    except Exception as e:
        print(f"⚠️ Moteur RAG : Erreur ({e})")

security_agent = None
if SecurityAgent:
    try:
        security_agent = SecurityAgent()
        print("✅ Agent Sécurité : Prêt")
    except Exception as e:
        print(f"⚠️ Agent Sécurité : Erreur ({e})")


# --- MODÈLES ---
class ChatRequest(BaseModel):
    query: str

class SecurityRequest(BaseModel):
    city: str

class TranslationRequest(BaseModel):
    text: str
    direction: str = "en_to_darija"

# --- ROUTES ---

@app.get("/")
def home():
    return {"status": "online", "system": "Zelig Backend"}

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    if not rag_engine:
        return {"result": "⚠️ Service RAG indisponible."}
    return rag_engine.get_answer(request.query)

@app.post("/api/security")
async def security_endpoint(request: SecurityRequest):
    if not security_agent:
        return {"error": "⚠️ Service Sécurité indisponible."}
    return security_agent.analyze(request.city)

@app.post("/api/translate")
async def translate_endpoint(request: TranslationRequest):
    if not translate_hybrid:
        return {"translation": "⚠️ Service Traduction indisponible."}
    
    # Appel de la fonction hybride
    return translate_hybrid(request.text, request.direction)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
