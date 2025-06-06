from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from backend.routes.faq import router as faq_router
from backend.routes.testimonial import router as testimonial_router
from backend.routes.trust_badge import router as trust_badge_router
from backend.routes.chat import router as chat_router
import os

app = FastAPI(title="EZCare AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",# Pour le développement local
        "https://bolt.new",# Domaine principal Bolt.new
        "https://sb1-j3bfcsq5.stackblitz.io" ], # URL de prévisualisation Bolt.new
    allow_credentials=True,
    allow_methods=["*"], # Autorise toutes les méthodes HTTP (GET,
    allow_headers=["*"], # Autorise tous les en-têtes
)

# Initialisation du client Supabase
SUPABASE_URL = os.getenv("SUPABASE_URL", "https://hmclcnswppwaqigiwrwc.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtY2xjbnN3cHB3YXFpZ2l3cndjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTk3MzAyNiwiZXhwIjoyMDYxNTQ5MDI2fQ.tG-R0PcFS1A7BAmjOfANR3wwwdeWAHyF2MeuH4hQ11M")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


# Inclure les routes
app.include_router(faq_router, prefix="/api")
app.include_router(testimonial_router, prefix="/api")
app.include_router(trust_badge_router, prefix="/api")
app.include_router(chat_router, prefix="/api")


@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}