from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    message_count: int

class ChatResponse(BaseModel):
    content: str
    options: List[str]
    show_subscribe: bool

class PainCategory(BaseModel):
    name: str
    icon: str
    color: str