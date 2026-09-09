import os
from dotenv import load_dotenv

load_dotenv()

# Base directories (config.py is in app/ so we go one level up for project root)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATIC_DIR = os.path.join(BASE_DIR, "static")
DOCUMENTS_DIR = os.path.join(STATIC_DIR, "inquiry-documents")
PRIVATE_HOTEL_PLANS_DIR = os.path.join(BASE_DIR, "data", "private-hotel-plans")

FRONTEND_DIST_DIR = os.path.join(BASE_DIR, "frontend", "dist")
FRONTEND_ASSETS_DIR = os.path.join(FRONTEND_DIST_DIR, "assets")
FRONTEND_IMAGES_DIR = os.path.join(BASE_DIR, "frontend", "public", "images")

# Credentials & API Keys
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "mankotia123")
ADMIN_WHATSAPP = os.getenv("ADMIN_WHATSAPP", "919012345678")  # Fallback to agency whatsapp if needed
WHATSAPP_CLOUD_TOKEN = os.getenv("WHATSAPP_CLOUD_TOKEN", "")
WHATSAPP_PHONE_NUMBER_ID = os.getenv("WHATSAPP_PHONE_NUMBER_ID", "")
WHATSAPP_GRAPH_VERSION = os.getenv("WHATSAPP_GRAPH_VERSION", "v23.0")

SMTP_HOST = os.getenv("SMTP_HOST", "")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USERNAME = os.getenv("SMTP_USERNAME", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
SMTP_FROM_EMAIL = os.getenv("SMTP_FROM_EMAIL", SMTP_USERNAME)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()
GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY", "").strip()
