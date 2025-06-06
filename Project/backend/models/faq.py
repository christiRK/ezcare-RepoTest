from pydantic import BaseModel
from typing import Optional
from uuid import UUID

class Faq(BaseModel):
    id: Optional[UUID] = None
    question: str
    answer: str