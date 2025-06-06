from fastapi import APIRouter
from backend.models.faq import Faq
from supabase import Client
from main import supabase
from typing import List

router = APIRouter()

@router.get("/faqs", response_model=List[Faq])
async def get_faqs():
    faqs = supabase.table("faqs").select("*").execute()
    return faqs.data