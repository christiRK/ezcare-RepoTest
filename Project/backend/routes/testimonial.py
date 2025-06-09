from fastapi import APIRouter
from models.testimonial import Testimonial
from supabase import Client
from main import supabase
from typing import List

router = APIRouter()

@router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    testimonials = supabase.table("testimonials").select("*").execute()
    return testimonials.data