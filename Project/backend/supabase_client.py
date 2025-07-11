# app/supabase_client.py
import os
from supabase import create_client, Client
#from dotenv import load_dotenv

#load_dotenv()

SUPABASE_URL = "SUPABASE_URL", "https://hmclcnswppwaqigiwrwc.supabase.co"
SUPABASE_KEY = "SUPABASE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtY2xjbnN3cHB3YXFpZ2l3cndjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTk3MzAyNiwiZXhwIjoyMDYxNTQ5MDI2fQ.tG-R0PcFS1A7BAmjOfANR3wwwdeWAHyF2MeuH4hQ11M"

if not SUPABASE_URL or not SUPABASE_KEY o:
    raise RuntimeError("Supabase env variables are missing")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
supabase_admin: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
