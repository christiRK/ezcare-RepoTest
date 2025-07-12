from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from supabase import create_client, Client
from pydantic import BaseModel
from routes.chat import ChatRequest, ChatResponse, router as chat_router
from routes.faq import router as faq_router
from routes.testimonial import router as testimonial_router
from routes.trust_badge import router as trust_badge_router
from routes.pricing import router as pricing_router
import os
import logging

# Configurer le logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Charger les variables d'environnement
load_dotenv()

# Vérifier les variables d'environnement
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY")
if not SUPABASE_URL or not SUPABASE_KEY:
    logger.error("SUPABASE_URL or SUPABASE_ANON_KEY is missing")
    raise RuntimeError("Supabase environment variables are missing")

# Initialisation de l'application FastAPI
app = FastAPI(title="EZCare AI Backend")

# Configurer CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://bolt.new",
        "https://sb1-j3bfcsq5.stackblitz.io"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialisation du client Supabase
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Inclure les routes
app.include_router(faq_router, prefix="/api")
app.include_router(testimonial_router, prefix="/api")
app.include_router(trust_badge_router, prefix="/api")
app.include_router(chat_router, prefix="/api")
app.include_router(pricing_router, prefix="/api")

@app.get("/")
async def root():
    logger.debug("Root endpoint accessed")
    return {"message": "Bienvenue sur l’API EZCare AI 🎉"}

@app.get("/api/health")
async def health_check():
    logger.debug("Health check endpoint accessed")
    return {"status": "healthy"}

class AuthData(BaseModel):
    email: str
    password: str

@app.post("/signup")
async def signup(data: AuthData):
    logger.debug(f"Signup attempt for email: {data.email}")
    try:
        response = supabase.auth.sign_up({"email": data.email, "password": data.password})
        if response.user is None:
            logger.error(f"Signup failed: {response.error.message}")
            raise HTTPException(status_code=400, detail=response.error.message)
        return {"message": "Compte créé avec succès", "user": response.user.id}
    except Exception as e:
        logger.error(f"Signup error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/login")
async def login(data: AuthData):
    logger.debug(f"Login attempt for email: {data.email}")
    try:
        response = supabase.auth.sign_in_with_password({"email": data.email, "password": data.password})
        if response.session is None:
            logger.error(f"Login failed: {response.error.message}")
            raise HTTPException(status_code=400, detail=response.error.message)
        return {"message": "Connexion réussie", "session": response.session.access_token}
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting FastAPI server on port 8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)