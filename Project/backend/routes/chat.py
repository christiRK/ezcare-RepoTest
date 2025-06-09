from fastapi import APIRouter
from models.chat import ChatRequest, ChatResponse, PainCategory
from supabase import Client
from main import supabase
from openai import OpenAI
import os
from typing import List

router = APIRouter()

openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", "your-openai-api-key"))

PAIN_CATEGORIES = [
    {"name": "Chest Pain", "icon": "Heart", "color": "bg-red-100 text-red-600"},
    {"name": "Headache", "icon": "Brain", "color": "bg-purple-100 text-purple-600"},
    {"name": "Joint Pain", "icon": "Bone", "color": "bg-amber-100 text-amber-600"},
    {"name": "Breathing", "icon": "Lungs", "color": "bg-blue-100 text-blue-600"}
]

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if request.message_count >= 3:
        return ChatResponse(
            content="I've provided some initial guidance. For more detailed health insights, please subscribe to our premium service.",
            options=[],
            show_subscribe=True
        )

    latest_message = request.messages[-1]
    content = latest_message.content.lower()
    response = ""
    options = []

    system_prompt = """
    You are Ez, an AI Health Assistant. Provide accurate and empathetic health guidance based on user input. 
    - For the first message, ask about the duration of symptoms (options: 'Less than a day', '1-3 days', 'More than a week').
    - For the second message, ask if it's the first time they've experienced the symptom (options: 'Yes, first time', 'No, had it before').
    - For the third message, provide a brief suggestion and recommend consulting a healthcare professional.
    - Always include a disclaimer: 'This is not medical advice. Consult a healthcare professional.'
    """
    messages = [
        {"role": "system", "content": system_prompt},
        *[{"role": msg.role, "content": msg.content} for msg in request.messages]
    ]

    try:
        gpt_response = openai_client.chat.completions.create(
            model="gpt-4",
            messages=messages,
            max_tokens=150
        )
        response = gpt_response.choices[0].message.content
    except Exception as e:
        response = f"Error generating response: {str(e)}"

    if request.message_count == 0:
        if content in [cat["name"].lower() for cat in PAIN_CATEGORIES]:
            options = ["Less than a day", "1-3 days", "More than a week"]
        else:
            response = "Please select a valid pain category."
            options = [cat["name"] for cat in PAIN_CATEGORIES]
    elif request.message_count == 1:
        options = ["Yes, first time", "No, had it before"]
    else:
        options = []

    supabase.table("consultations").insert({
        "user_id": "anonymous",  # Pas d'authentification pour l'instant
        "prompt": latest_message.content,
        "ai_response": response
    }).execute()

    return ChatResponse(
        content=response + "\nThis is not medical advice. Consult a healthcare professional.",
        options=options,
        show_subscribe=request.message_count == 2
    )

@router.get("/pain-categories", response_model=List[PainCategory])
async def get_pain_categories():
    return PAIN_CATEGORIES