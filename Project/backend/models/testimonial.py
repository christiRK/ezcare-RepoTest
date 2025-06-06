from pydantic import BaseModel
from typing import Optional
from uuid import UUID

class Testimonial(BaseModel):
    id: Optional[UUID] = None
    name: str
    title: str
    quote: str
    image_url: str
    feature: str
    feature_icon: str
    color: str
    rating: int = 5