from pydantic import BaseModel
from typing import List, Dict

class Plan(BaseModel):
    name: str
    description: str
    price: Dict[str, float]  # { "monthly": float, "annual": float }
    period: str
    features: List[str]
    notIncluded: List[str]
    cta: str
    popular: bool