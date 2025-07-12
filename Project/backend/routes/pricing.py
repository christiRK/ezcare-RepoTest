from fastapi import APIRouter, HTTPException
from typing import List
from supabase_client import supabase
from models.pricing import Plan
import logging

router = APIRouter()

# Configurer le logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

@router.get("/pricing/plans", response_model=List[Plan])
async def get_plans(is_annual: bool = True):
    try:
        logger.debug("Fetching plans from Supabase")
        response = supabase.table("plans").select("*").execute()
        logger.debug(f"Supabase response: {response.data}")
        plans_data = response.data

        if not plans_data:
            logger.warning("No plans found in Supabase, using fallback data")
            plans = [
                {
                    "name": "Basic",
                    "description": "Essential health insights for individuals",
                    "price": {"monthly": 14.99, "annual": 9.99},
                    "period": "/month, billed annually" if is_annual else "/month",
                    "features": [
                        "Symptom checker",
                        "Basic health insights",
                        "Medical term explanations",
                        "Health journal",
                        "Limited consults",
                        "Email support"
                    ],
                    "notIncluded": [
                        "Lab result analysis",
                        "Personalized health plans",
                        "Doctor consultations",
                        "Family accounts",
                        "Priority support"
                    ],
                    "cta": "Get Started",
                    "popular": False
                },
                {
                    "name": "Plus",
                    "description": "Comprehensive health management for families",
                    "price": {"monthly": 29.99, "annual": 19.99},
                    "period": "/month, billed annually" if is_annual else "/month",
                    "features": [
                        "Everything in Basic",
                        "Unlimited symptom checks",
                        "Lab result analysis",
                        "Personalized health plans",
                        "Up to 3 family members",
                        "Priority support",
                        "Chat consultations"
                    ],
                    "notIncluded": [
                        "Video consultations with specialists",
                        "Medication analysis",
                        "Health trends & analytics"
                    ],
                    "cta": "Get Plus",
                    "popular": True
                },
                {
                    "name": "Premium",
                    "description": "Complete healthcare solution with specialist access",
                    "price": {"monthly": 69.99, "annual": 49.99},
                    "period": "/month, billed annually" if is_annual else "/month",
                    "features": [
                        "Everything in Plus",
                        "Up to 6 family members",
                        "Video consultations",
                        "Specialist referrals",
                        "Comprehensive health analytics",
                        "Medication analysis & reminders",
                        "24/7 priority support",
                        "Concierge health service"
                    ],
                    "notIncluded": [],
                    "cta": "Get Premium",
                    "popular": False
                }
            ]
        else:
            logger.debug("Mapping Supabase data to Plan model")
            plans = [
                {
                    "name": plan["name"],
                    "description": plan["description"],
                    "price": {"monthly": plan["price_monthly"], "annual": plan["price_annual"]},
                    "period": "/month, billed annually" if is_annual else "/month",
                    "features": plan["features"],
                    "notIncluded": plan["not_included"],
                    "cta": plan["cta"],
                    "popular": plan["popular"]
                } for plan in plans_data
            ]

        return [
            Plan(
                name=plan["name"],
                description=plan["description"],
                price=plan["price"],
                period=plan["period"],
                features=plan["features"],
                notIncluded=plan["notIncluded"],
                cta=plan["cta"],
                popular=plan["popular"]
            ) for plan in plans
        ]
    except Exception as e:
        logger.error(f"Error fetching plans: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération des plans : {str(e)}")