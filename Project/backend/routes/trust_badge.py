from fastapi import APIRouter
from models.trust_badge import TrustBadge

from supabase_client import supabase
from typing import List

router = APIRouter()

@router.get("/trust-badges", response_model=List[TrustBadge])
async def get_trust_badges():
    badges = supabase.table("trust_badges").select("*").execute()
    return badges.data