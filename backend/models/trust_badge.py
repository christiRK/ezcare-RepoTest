from pydantic import BaseModel
from typing import Optional
from uuid import UUID

class TrustBadge(BaseModel):
    id: Optional[UUID] = None
    name: str
    image_url: Optional[str]
    rating: Optional[float]
    description: Optional[str]