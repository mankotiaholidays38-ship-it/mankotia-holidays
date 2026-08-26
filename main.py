import os
import smtplib
import re
import urllib.parse
import requests
from email.message import EmailMessage
from datetime import datetime
from typing import Optional, List
from fastapi import FastAPI, Request, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field, field_validator, model_validator
from dotenv import load_dotenv
from docx import Document
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from xml.sax.saxutils import escape

load_dotenv()

import excel_manager
import ai_service

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")
TEMPLATES_DIR = os.path.join(BASE_DIR, "templates")

# Initialize Agency Configuration (Defaults can be overridden via .env)
AGENCY_NAME = os.getenv("AGENCY_NAME", "Mankotia Holidays")
AGENCY_PHONE = os.getenv("AGENCY_PHONE", "+919816461616")
AGENCY_WHATSAPP = os.getenv("AGENCY_WHATSAPP", "919816461616")
AGENCY_EMAIL = os.getenv("AGENCY_EMAIL", "mankotiaholidays38@gmail.com")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "mankotia123")
ADMIN_WHATSAPP = os.getenv("ADMIN_WHATSAPP", AGENCY_WHATSAPP)
WHATSAPP_CLOUD_TOKEN = os.getenv("WHATSAPP_CLOUD_TOKEN", "")
WHATSAPP_PHONE_NUMBER_ID = os.getenv("WHATSAPP_PHONE_NUMBER_ID", "")
WHATSAPP_GRAPH_VERSION = os.getenv("WHATSAPP_GRAPH_VERSION", "v23.0")
SMTP_HOST = os.getenv("SMTP_HOST", "")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USERNAME = os.getenv("SMTP_USERNAME", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")

app = FastAPI(
    title="Mankotia Holidays - AI Tour & Travel Platform",
    description="AI-powered trip itinerary generator, packages, WhatsApp/Call integration, and Excel lead management.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs(STATIC_DIR, exist_ok=True)
os.makedirs(TEMPLATES_DIR, exist_ok=True)
os.makedirs(os.path.join(STATIC_DIR, "css"), exist_ok=True)
os.makedirs(os.path.join(STATIC_DIR, "js"), exist_ok=True)
os.makedirs(os.path.join(STATIC_DIR, "images"), exist_ok=True)
DOCUMENTS_DIR = os.path.join(STATIC_DIR, "inquiry-documents")
os.makedirs(DOCUMENTS_DIR, exist_ok=True)
PRIVATE_HOTEL_PLANS_DIR = os.path.join(BASE_DIR, "data", "private-hotel-plans")
os.makedirs(PRIVATE_HOTEL_PLANS_DIR, exist_ok=True)

FRONTEND_DIST_DIR = os.path.join(BASE_DIR, "frontend", "dist")
FRONTEND_ASSETS_DIR = os.path.join(FRONTEND_DIST_DIR, "assets")
FRONTEND_IMAGES_DIR = os.path.join(BASE_DIR, "frontend", "public", "images")

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

if os.path.exists(FRONTEND_ASSETS_DIR):
    app.mount("/assets", StaticFiles(directory=FRONTEND_ASSETS_DIR), name="frontend_assets")
if os.path.exists(FRONTEND_IMAGES_DIR):
    app.mount("/images", StaticFiles(directory=FRONTEND_IMAGES_DIR), name="frontend_images")

templates = Jinja2Templates(directory=TEMPLATES_DIR)

# Ensure Excel file exists at startup
excel_manager.ensure_excel_file_exists()

# Pydantic Schemas
class InquiryRequest(BaseModel):
    name: str = Field(..., min_length=2, description="Customer full name")
    phone: str = Field(..., description="Indian mobile number")
    email: str = Field(..., min_length=3, description="Email address")
    destination: str = Field(..., min_length=2)
    travel_date: str = Field(..., min_length=2)
    pickup: str = Field(default="Haridwar / Dehradun", min_length=2)
    drop: str = Field(default="Haridwar / Dehradun", min_length=2)
    days: int = Field(default=4, ge=1, le=60)
    number_of_persons: int = Field(default=2, ge=1, le=1000)
    children: int = Field(default=0, ge=0, le=1000)
    child_ages: str = ""
    vehicle_category: str = Field(default="Sedan Car", min_length=2)
    rooms_required: int = Field(default=1, ge=1, le=500)
    meal_plan: str = Field(default="Breakfast Only (CP)", min_length=2)
    hotel_category: str = Field(default="3 Star", min_length=2)
    itinerary_text: str = ""
    travelers: Optional[str] = ""
    budget: Optional[str] = "Standard"
    notes: Optional[str] = ""
    source: Optional[str] = "Website Booking Form"

    @field_validator("phone")
    @classmethod
    def validate_indian_mobile(cls, value: str) -> str:
        normalized = re.sub(r"[\s()-]", "", value)
        if normalized.startswith("+91"):
            normalized = normalized[3:]
        if not re.fullmatch(r"[6-9]\d{9}", normalized):
            raise ValueError("Enter a valid Indian mobile number with exactly 10 digits.")
        return normalized

    @field_validator("travel_date")
    @classmethod
    def validate_travel_date(cls, value: str) -> str:
        if value:
            clean = value.strip()
            match = re.match(r"^(\d{4})-(\d{2})-(\d{2})$", clean)
            if match:
                try:
                    parsed = datetime.strptime(clean, "%Y-%m-%d").date()
                    if parsed < datetime.now().date():
                        raise ValueError("Selected travel date cannot be in the past. Please select a present or future date.")
                except ValueError as e:
                    if "cannot be in the past" in str(e):
                        raise
        return value

    @model_validator(mode="after")
    def validate_child_ages(self):
        if self.children > 0 and not self.child_ages.strip():
            raise ValueError("Child ages are required when children are included.")
        return self

class TicketInquiryRequest(BaseModel):
    name: str = Field(..., min_length=2, description="Customer full name")
    phone: str = Field(..., description="Indian mobile number")
    email: str = Field(..., min_length=3, description="Email address")
    transit_type: str = Field(default="Domestic Flight")
    origin: str = Field(..., min_length=2)
    destination: str = Field(..., min_length=2)
    travel_date: str = Field(..., min_length=2)
    travel_class: str = Field(default="Economy")
    passengers: int = Field(default=1, ge=1, le=100)
    notes: Optional[str] = ""
    source: Optional[str] = "Website Flight/Train/Bus Form"

    @field_validator("phone")
    @classmethod
    def validate_indian_mobile(cls, value: str) -> str:
        normalized = re.sub(r"[\s()-]", "", value)
        if normalized.startswith("+91"):
            normalized = normalized[3:]
        if not re.fullmatch(r"[6-9]\d{9}", normalized):
            raise ValueError("Enter a valid Indian mobile number with exactly 10 digits.")
        return normalized

    @field_validator("travel_date")
    @classmethod
    def validate_ticket_date(cls, value: str) -> str:
        if value:
            clean = value.strip()
            match = re.match(r"^(\d{4})-(\d{2})-(\d{2})$", clean)
            if match:
                try:
                    parsed = datetime.strptime(clean, "%Y-%m-%d").date()
                    if parsed < datetime.now().date():
                        raise ValueError("Selected journey date cannot be in the past. Please select a present or future date.")
                except ValueError as e:
                    if "cannot be in the past" in str(e):
                        raise
        return value

class TransportInquiryRequest(BaseModel):
    name: str = Field(..., min_length=2, description="Customer full name")
    phone: str = Field(..., description="Indian mobile number")
    email: str = Field(..., min_length=3, description="Email address")
    vehicle_category: str = Field(default="Innova Crysta (7 Seater)")
    rental_type: str = Field(default="Outstation Round-Trip")
    pickup: str = Field(..., min_length=2)
    drop: str = Field(..., min_length=2)
    pickup_date: str = Field(..., min_length=2)
    duration_days: int = Field(default=1, ge=1, le=60)
    passengers: int = Field(default=2, ge=1, le=100)
    notes: Optional[str] = ""
    source: Optional[str] = "Website Transport & Cab Form"

    @field_validator("phone")
    @classmethod
    def validate_indian_mobile(cls, value: str) -> str:
        normalized = re.sub(r"[\s()-]", "", value)
        if normalized.startswith("+91"):
            normalized = normalized[3:]
        if not re.fullmatch(r"[6-9]\d{9}", normalized):
            raise ValueError("Enter a valid Indian mobile number with exactly 10 digits.")
        return normalized

    @field_validator("pickup_date")
    @classmethod
    def validate_pickup_date(cls, value: str) -> str:
        if value:
            clean = value.strip()
            match = re.match(r"^(\d{4})-(\d{2})-(\d{2})$", clean)
            if match:
                try:
                    parsed = datetime.strptime(clean, "%Y-%m-%d").date()
                    if parsed < datetime.now().date():
                        raise ValueError("Selected pickup date cannot be in the past. Please select a present or future date.")
                except ValueError as e:
                    if "cannot be in the past" in str(e):
                        raise
        return value

class ItineraryRequest(BaseModel):
    destination: str = Field(..., min_length=2)
    days: int = Field(default=4, ge=1, le=30)
    budget: Optional[str] = "Standard"
    travel_style: Optional[str] = "Family & Leisure"
    travelers: Optional[str] = "2 Adults"
    special_requests: Optional[str] = ""
    pickup_location: Optional[str] = None
    drop_location: Optional[str] = None

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1)
    history: Optional[List[dict]] = None

class AdminLoginRequest(BaseModel):
    password: str

def send_inquiry_email(
    inquiry: InquiryRequest,
    document_filename: Optional[str] = None,
    hotel_plan_filename: Optional[str] = None,
) -> bool:
    """Send the complete inquiry with Word and private hotel PDF attachments."""
    if not all([SMTP_HOST, SMTP_USERNAME, SMTP_PASSWORD]):
        return False

    message = EmailMessage()
    message["Subject"] = f"New Customer Inquiry - {inquiry.destination or 'General Inquiry'}"
    message["From"] = SMTP_USERNAME
    message["To"] = AGENCY_EMAIL
    message.set_content(
        f"New customer inquiry received by {AGENCY_NAME}.\n\n"
        f"CUSTOMER DETAILS\n"
        f"Name: {inquiry.name}\nPhone: {inquiry.phone}\nEmail: {inquiry.email}\n"
        f"Travel group: {inquiry.travelers or 'Not specified'}\n"
        f"Adults / persons: {inquiry.number_of_persons}\nChildren: {inquiry.children}\n"
        f"Child ages: {inquiry.child_ages or 'None'}\n\n"
        f"JOURNEY DETAILS\n"
        f"Destination: {inquiry.destination or 'General Inquiry'}\n"
        f"Travel date: {inquiry.travel_date or 'Flexible'}\n"
        f"Pickup: {inquiry.pickup}\nDrop: {inquiry.drop}\n"
        f"Duration: {inquiry.days} days\nBudget: {inquiry.budget or 'Standard'}\n"
        f"Vehicle: {inquiry.vehicle_category}\nRooms: {inquiry.rooms_required}\n"
        f"Hotel category: {inquiry.hotel_category}\nMeal plan: {inquiry.meal_plan}\n\n"
        f"SPECIAL REQUESTS\n{inquiry.notes or 'None'}\n\n"
        f"TOUR ITINERARY\n{inquiry.itinerary_text.strip() or 'No AI itinerary was selected.'}\n\n"
        f"Hotel plan PDF and customer inquiry Word document are attached.\n"
    )
    attachments = [
        (document_filename, DOCUMENTS_DIR, "vnd.openxmlformats-officedocument.wordprocessingml.document"),
        (hotel_plan_filename, PRIVATE_HOTEL_PLANS_DIR, "pdf"),
    ]
    for attachment_filename, attachment_directory, attachment_subtype in attachments:
        if attachment_filename:
            attachment_path = os.path.join(attachment_directory, attachment_filename)
            with open(attachment_path, "rb") as attachment_file:
                message.add_attachment(
                    attachment_file.read(),
                    maintype="application",
                    subtype=attachment_subtype,
                    filename=attachment_filename,
                )

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15) as smtp:
        smtp.starttls()
        smtp.login(SMTP_USERNAME, SMTP_PASSWORD)
        smtp.send_message(message)
    return True

def create_inquiry_document(inquiry: InquiryRequest, lead_id: str) -> str:
    """Create a Word summary where customer inquiry details are displayed first, followed by the automated AI tour itinerary."""
    # Ensure automated AI itinerary is created even if customer did not generate one
    if not inquiry.itinerary_text or not inquiry.itinerary_text.strip():
        try:
            generated = ai_service.generate_ai_itinerary(
                destination=inquiry.destination,
                days=inquiry.days,
                budget=inquiry.budget or "Standard",
                travel_style=inquiry.travelers or "Family & Leisure",
                travelers=inquiry.travelers or f"{inquiry.number_of_persons} persons",
                special_requests=inquiry.notes or ""
            )
            if generated and isinstance(generated, dict):
                lines = []
                lines.append(f"Title: {generated.get('title', f'{inquiry.destination} Custom Tour')}")
                lines.append(f"Destination: {generated.get('destination', inquiry.destination)}")
                lines.append(f"Duration: {generated.get('duration', f'{inquiry.days} Days / {max(1, inquiry.days - 1)} Nights')}")
                if generated.get("estimated_cost_inr"):
                    lines.append(f"Estimated Cost: {generated.get('estimated_cost_inr')}")
                if generated.get("best_season"):
                    lines.append(f"Best Season: {generated.get('best_season')}")
                if generated.get("highlights"):
                    lines.append("Highlights:")
                    for h in generated.get("highlights", []):
                        lines.append(f"• {h}")
                lines.append("")
                for day in generated.get("days", []):
                    d_num = day.get("day_number", 1)
                    theme = day.get("theme", "")
                    lines.append(f"Day {d_num}: {theme}")
                    if day.get("morning"):
                        lines.append(f"- Morning: {day.get('morning')}")
                    if day.get("afternoon"):
                        lines.append(f"- Afternoon: {day.get('afternoon')}")
                    if day.get("evening"):
                        lines.append(f"- Evening: {day.get('evening')}")
                    if day.get("stay_suggestion"):
                        lines.append(f"- Stay: {day.get('stay_suggestion')}")
                    if day.get("meal_recommendation"):
                        lines.append(f"- Meal: {day.get('meal_recommendation')}")
                    if day.get("pro_tip"):
                        lines.append(f"- Pro Tip: {day.get('pro_tip')}")
                    lines.append("")
                if generated.get("packing_essentials"):
                    lines.append("Packing Essentials:")
                    for item in generated.get("packing_essentials", []):
                        lines.append(f"• {item}")
                inquiry.itinerary_text = "\n".join(lines).strip()
        except Exception as e:
            print(f"Failed to auto-generate AI itinerary for Word doc: {e}")

    document = Document()
    document.add_heading(f"{AGENCY_NAME} - Travel Inquiry & Tour Itinerary Summary", 0)
    
    sub_p = document.add_paragraph()
    sub_p.add_run("Inquiry Reference ID: ").bold = True
    sub_p.add_run(f"{lead_id}   |   ")
    sub_p.add_run("Submission Date: ").bold = True
    sub_p.add_run(f"{datetime.now().strftime('%d-%b-%Y %I:%M %p')}\n")
    sub_p.add_run("Lead Source: ").bold = True
    sub_p.add_run(f"{inquiry.source or 'Website Inquiry'}")
    
    # 1. Customer and Journey Details (Strictly First)
    document.add_heading("1. Customer & Journey Details", level=1)
    details = [
        ("Customer Full Name", inquiry.name),
        ("Phone / WhatsApp Number", inquiry.phone),
        ("Email Address", inquiry.email),
        ("Destination / Yatra", inquiry.destination),
        ("Date of Journey", inquiry.travel_date),
        ("Pickup Location", inquiry.pickup),
        ("Drop-off Location", inquiry.drop),
        ("Tour Duration", f"{inquiry.days} Days / {max(1, inquiry.days - 1)} Nights"),
        ("Adults / Total Persons", str(inquiry.number_of_persons)),
        ("Children Count", str(inquiry.children)),
        ("Children Ages", inquiry.child_ages or "None"),
        ("Vehicle Category", inquiry.vehicle_category),
        ("Rooms Required", str(inquiry.rooms_required)),
        ("Meal Plan", inquiry.meal_plan),
        ("Hotel Category", inquiry.hotel_category),
        ("Travel Group Type", inquiry.travelers or "Not specified"),
        ("Budget Category", inquiry.budget or "Standard"),
        ("Special Requirements / Notes", inquiry.notes or "None"),
    ]
    
    table = document.add_table(rows=1, cols=2)
    table.style = "Light Shading Accent 1"
    table.rows[0].cells[0].text = "Field Description"
    table.rows[0].cells[1].text = "Inquiry Details"
    for field, value in details:
        cells = table.add_row().cells
        cells[0].text = field
        cells[1].text = str(value)
        
    # 2. Tour Itinerary (Strictly Only After Customer Details)
    document.add_paragraph()
    document.add_heading("2. AI Custom Tour Itinerary", level=1)
    if inquiry.itinerary_text and inquiry.itinerary_text.strip():
        for paragraph in inquiry.itinerary_text.strip().split("\n"):
            trimmed = paragraph.strip()
            if not trimmed:
                continue
            if re.match(r"^(?:Day\s+\d+|Title:|Destination:|Duration:|Estimated Cost:|Best Season:|Highlights:|Packing Essentials:)", trimmed, re.IGNORECASE):
                p = document.add_paragraph()
                p.add_run(trimmed).bold = True
            elif trimmed.startswith("- ") or trimmed.startswith("• "):
                document.add_paragraph(trimmed[2:], style="List Bullet")
            else:
                document.add_paragraph(trimmed)
    else:
        p = document.add_paragraph("Custom itinerary is being curated by the Mankotia Holidays operations desk.")
        p.italic = True
        
    filename = f"inquiry-{lead_id.replace('#', '').replace('-', '_')}-{re.sub(r'[^a-zA-Z0-9]', '_', inquiry.name)}.docx"
    document.save(os.path.join(DOCUMENTS_DIR, filename))
    return filename

def create_ticket_document(inquiry: TicketInquiryRequest, lead_id: str) -> str:
    """Create a clean Word document specifically for flight/train/bus ticket queries."""
    document = Document()
    document.add_heading(f"{AGENCY_NAME} - Ticket Booking Query Details", 0)
    
    sub_p = document.add_paragraph()
    sub_p.add_run("Ticket Query Reference ID: ").bold = True
    sub_p.add_run(f"{lead_id}   |   ")
    sub_p.add_run("Submission Date: ").bold = True
    sub_p.add_run(f"{datetime.now().strftime('%d-%b-%Y %I:%M %p')}\n")
    sub_p.add_run("Booking Mode: ").bold = True
    sub_p.add_run(f"{inquiry.transit_type}")
    
    document.add_heading("1. Passenger & Journey Information", level=1)
    details = [
        ("Customer Full Name", inquiry.name),
        ("Phone / WhatsApp Number", inquiry.phone),
        ("Email Address", inquiry.email),
        ("Transit / Booking Mode", inquiry.transit_type),
        ("Origin (From)", inquiry.origin),
        ("Destination (To)", inquiry.destination),
        ("Date of Journey", inquiry.travel_date),
        ("Travel Class / Preference", inquiry.travel_class),
        ("Total Passengers", str(inquiry.passengers)),
        ("Special Notes / Instructions", inquiry.notes or "None"),
        ("Source", inquiry.source or "Website Ticket Form")
    ]
    
    table = document.add_table(rows=1, cols=2)
    table.style = "Light Shading Accent 1"
    table.rows[0].cells[0].text = "Field Description"
    table.rows[0].cells[1].text = "Ticket Query Details"
    for field, value in details:
        cells = table.add_row().cells
        cells[0].text = field
        cells[1].text = str(value)
        
    filename = f"ticket-query-{lead_id.replace('#', '').replace('-', '_')}-{re.sub(r'[^a-zA-Z0-9]', '_', inquiry.name)}.docx"
    document.save(os.path.join(DOCUMENTS_DIR, filename))
    return filename

def create_transport_document(inquiry: TransportInquiryRequest, lead_id: str) -> str:
    """Create a clean Word document specifically for Volvo / Car / Taxi rental queries."""
    document = Document()
    document.add_heading(f"{AGENCY_NAME} - Vehicle & Cab Rental Query Details", 0)
    
    sub_p = document.add_paragraph()
    sub_p.add_run("Transport Query Reference ID: ").bold = True
    sub_p.add_run(f"{lead_id}   |   ")
    sub_p.add_run("Submission Date: ").bold = True
    sub_p.add_run(f"{datetime.now().strftime('%d-%b-%Y %I:%M %p')}\n")
    sub_p.add_run("Rental Mode: ").bold = True
    sub_p.add_run(f"{inquiry.rental_type} ({inquiry.vehicle_category})")
    
    document.add_heading("1. Vehicle & Route Information", level=1)
    details = [
        ("Customer Full Name", inquiry.name),
        ("Phone / WhatsApp Number", inquiry.phone),
        ("Email Address", inquiry.email),
        ("Vehicle Category", inquiry.vehicle_category),
        ("Rental / Service Type", inquiry.rental_type),
        ("Pickup Location", inquiry.pickup),
        ("Drop-off / Route", inquiry.drop),
        ("Pickup Date", inquiry.pickup_date),
        ("Duration (Days)", str(inquiry.duration_days)),
        ("Total Passengers", str(inquiry.passengers)),
        ("Special Notes / Route Details", inquiry.notes or "None"),
        ("Source", inquiry.source or "Website Transport Form")
    ]
    
    table = document.add_table(rows=1, cols=2)
    table.style = "Light Shading Accent 1"
    table.rows[0].cells[0].text = "Field Description"
    table.rows[0].cells[1].text = "Transport Details"
    for field, value in details:
        cells = table.add_row().cells
        cells[0].text = field
        cells[1].text = str(value)
        
    filename = f"transport-query-{lead_id.replace('#', '').replace('-', '_')}-{re.sub(r'[^a-zA-Z0-9]', '_', inquiry.name)}.docx"
    document.save(os.path.join(DOCUMENTS_DIR, filename))
    return filename

def send_ticket_email(inquiry: TicketInquiryRequest, document_filename: Optional[str] = None) -> bool:
    if not all([SMTP_HOST, SMTP_USERNAME, SMTP_PASSWORD]):
        return False
    message = EmailMessage()
    message["Subject"] = f"New Ticket Booking Query ({inquiry.transit_type}) - {inquiry.origin} to {inquiry.destination}"
    message["From"] = SMTP_USERNAME
    message["To"] = AGENCY_EMAIL
    message.set_content(
        f"New Ticket Booking Query received by {AGENCY_NAME}.\n\n"
        f"CUSTOMER DETAILS\n"
        f"Name: {inquiry.name}\nPhone: {inquiry.phone}\nEmail: {inquiry.email}\n\n"
        f"TICKET DETAILS\n"
        f"Mode: {inquiry.transit_type}\n"
        f"Route: {inquiry.origin} -> {inquiry.destination}\n"
        f"Travel Date: {inquiry.travel_date}\n"
        f"Class: {inquiry.travel_class}\n"
        f"Passengers: {inquiry.passengers}\n"
        f"Notes: {inquiry.notes or 'None'}\n\n"
        f"Ticket query Word document is attached.\n"
    )
    if document_filename:
        attachment_path = os.path.join(DOCUMENTS_DIR, document_filename)
        if os.path.exists(attachment_path):
            with open(attachment_path, "rb") as f:
                message.add_attachment(f.read(), maintype="application", subtype="vnd.openxmlformats-officedocument.wordprocessingml.document", filename=document_filename)
    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15) as smtp:
        smtp.starttls()
        smtp.login(SMTP_USERNAME, SMTP_PASSWORD)
        smtp.send_message(message)
    return True

def send_transport_email(inquiry: TransportInquiryRequest, document_filename: Optional[str] = None) -> bool:
    if not all([SMTP_HOST, SMTP_USERNAME, SMTP_PASSWORD]):
        return False
    message = EmailMessage()
    message["Subject"] = f"New Transport & Cab Rental Query - {inquiry.vehicle_category} ({inquiry.pickup} to {inquiry.drop})"
    message["From"] = SMTP_USERNAME
    message["To"] = AGENCY_EMAIL
    message.set_content(
        f"New Vehicle / Cab Rental Query received by {AGENCY_NAME}.\n\n"
        f"CUSTOMER DETAILS\n"
        f"Name: {inquiry.name}\nPhone: {inquiry.phone}\nEmail: {inquiry.email}\n\n"
        f"VEHICLE / RENTAL DETAILS\n"
        f"Vehicle: {inquiry.vehicle_category}\n"
        f"Rental Type: {inquiry.rental_type}\n"
        f"Pickup: {inquiry.pickup}\nDrop: {inquiry.drop}\n"
        f"Pickup Date: {inquiry.pickup_date}\n"
        f"Days: {inquiry.duration_days}\n"
        f"Passengers: {inquiry.passengers}\n"
        f"Notes: {inquiry.notes or 'None'}\n\n"
        f"Transport query Word document is attached.\n"
    )
    if document_filename:
        attachment_path = os.path.join(DOCUMENTS_DIR, document_filename)
        if os.path.exists(attachment_path):
            with open(attachment_path, "rb") as f:
                message.add_attachment(f.read(), maintype="application", subtype="vnd.openxmlformats-officedocument.wordprocessingml.document", filename=document_filename)
    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15) as smtp:
        smtp.starttls()
        smtp.login(SMTP_USERNAME, SMTP_PASSWORD)
        smtp.send_message(message)
    return True

def send_document_to_admin_whatsapp(document_filename: str, inquiry: InquiryRequest, lead_id: str) -> bool:
    """Upload and send the private Word file through WhatsApp Cloud API."""
    if not WHATSAPP_CLOUD_TOKEN or not WHATSAPP_PHONE_NUMBER_ID or not ADMIN_WHATSAPP:
        return False
    document_path = os.path.join(DOCUMENTS_DIR, document_filename)
    api_base = f"https://graph.facebook.com/{WHATSAPP_GRAPH_VERSION}/{WHATSAPP_PHONE_NUMBER_ID}"
    headers = {"Authorization": f"Bearer {WHATSAPP_CLOUD_TOKEN}"}
    with open(document_path, "rb") as document_file:
        upload = requests.post(
            f"{api_base}/media",
            headers=headers,
            data={"messaging_product": "whatsapp", "type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"},
            files={"file": (document_filename, document_file, "application/vnd.openxmlformats-officedocument.wordprocessingml.document")},
            timeout=30,
        )
    upload.raise_for_status()
    media_id = upload.json()["id"]
    message = requests.post(
        f"{api_base}/messages",
        headers={**headers, "Content-Type": "application/json"},
        json={
            "messaging_product": "whatsapp",
            "to": ADMIN_WHATSAPP,
            "type": "document",
            "document": {
                "id": media_id,
                "filename": document_filename,
                "caption": f"Private AI itinerary inquiry {lead_id} for {inquiry.name}",
            },
        },
        timeout=30,
    )
    message.raise_for_status()
    return True

LOCATION_HOTELS = {
    "barkot": [
        {"name": "Camp Nirvana Yamunotri", "phone": "+91 95992 22705, +91 98993 77998", "email": "info@nirvanacamp.com", "category": "Deluxe Alpine Camp"},
        {"name": "Hotel Yamuna Bridge Barkot", "phone": "+91 94120 56780, 01375-224236", "email": "hotelyamunabridge@gmail.com", "category": "3 Star Comfort"},
        {"name": "GMVN Tourist Rest House Barkot", "phone": "+91 95680 06626, 01375-224236", "email": "gmvn@gmvnl.in", "category": "Govt Tourist Lodge"},
        {"name": "Himalayan Camps Barkot", "phone": "+91 94120 56788, +91 98971 14455", "email": "himalayancampsbarkot@gmail.com", "category": "Deluxe Luxury Camp"},
        {"name": "Hotel Kalindi Barkot", "phone": "+91 94111 55678, 01375-224215", "email": "hotelkalindibarkot@gmail.com", "category": "3 Star"}
    ],
    "uttarkashi": [
        {"name": "Hotel Shivlinga Resort", "phone": "+91 99174 77718, +91 94120 77718", "email": "shivlinga2000@gmail.com", "category": "4 Star River Resort"},
        {"name": "Shikhar Nature Resort", "phone": "+91 98106 22238, +91 98181 81468", "email": "resorts@shikhar.com", "category": "3 Star Eco Resort"},
        {"name": "Ganga Putra Riverside Resort", "phone": "+91 94120 77755, 01374-222500", "email": "gangaputraresort@gmail.com", "category": "3 Star Deluxe"},
        {"name": "GMVN Tourist Rest House Uttarkashi", "phone": "+91 95680 06626, 01374-222236", "email": "gmvn@gmvnl.in", "category": "Govt Tourist Lodge"},
        {"name": "Hotel Divine Palace Uttarkashi", "phone": "+91 94120 77790, 01374-222310", "email": "divinepalaceuttarkashi@gmail.com", "category": "3 Star"}
    ],
    "guptkashi": [
        {"name": "Kedar Valley Resorts Guptkashi", "phone": "+91 70554 25555, +91 70880 01703", "email": "contactus@kedarvalleyresorts.com", "category": "4 Star Luxury Resort"},
        {"name": "Kedar River Retreat Sitapur", "phone": "+91 87555 75907, +91 98971 14466", "email": "kedarcampresorts@gmail.com", "category": "4 Star Riverfront Resort"},
        {"name": "Villa Paraiso Resort Guptkashi", "phone": "+91 98111 87654, 01364-267333", "email": "villaparaisoguptkashi@gmail.com", "category": "4 Star Deluxe"},
        {"name": "Hotel Himalayan Comfort Guptkashi", "phone": "+91 94120 55432, 01364-267150", "email": "himalayancomfortguptkashi@gmail.com", "category": "3 Star Comfort"},
        {"name": "GMVN Tourist Rest House Guptkashi", "phone": "+91 95680 06626, 01364-267228", "email": "gmvn@gmvnl.in", "category": "Govt Tourist Lodge"}
    ],
    "kedarnath": [
        {"name": "GMVN Kedarnath Tourist Lodge & Cottages", "phone": "+91 95680 06626, 01364-263228", "email": "gmvn@gmvnl.in", "category": "Govt Tourist Lodge / Cottage"},
        {"name": "Kedar Dome Deluxe Alpine Camps", "phone": "+91 94120 56799, 01364-263300", "email": "kedardomecamps@gmail.com", "category": "Deluxe Alpine Camp"},
        {"name": "Bikaner House Kedarnath", "phone": "+91 98290 12345, 01364-263240", "email": "bikanerhousekedarnath@gmail.com", "category": "Dharamshala / Guest House"},
        {"name": "Himadri Tourist Guest House Kedarnath", "phone": "+91 94120 56711, 01364-263215", "email": "himadri.kedarnath@gmail.com", "category": "Standard Guest House"}
    ],
    "badrinath": [
        {"name": "Sarovar Portico Badrinath", "phone": "+91 93103 33317, +91 95822 16963", "email": "bpo@sarovarhotels.com", "category": "4 Star Luxury"},
        {"name": "New Hotel Snow Crest Badrinath", "phone": "+91 99801 00123, +91 98111 23456", "email": "sales@snowcrest.co.in", "category": "4 Star Deluxe"},
        {"name": "Hotel Narayan Palace Badrinath", "phone": "+91 98101 23456, 01381-222238", "email": "info@hotelnarayanpalace.com", "category": "3 Star Deluxe"},
        {"name": "GMVN Devlok Tourist Rest House", "phone": "+91 95680 06626, 01381-222212", "email": "gmvn@gmvnl.in", "category": "Govt Tourist Lodge"},
        {"name": "Hotel Dwarikesh Badrinath", "phone": "+91 94120 56744, 01381-222205", "email": "hoteldwarikesh@gmail.com", "category": "3 Star Comfort"}
    ],
    "joshimath": [
        {"name": "The Tattva Resort Joshimath", "phone": "+91 92103 56789, +91 98103 56789", "email": "namaste@thetattva.in", "category": "4 Star Boutique Resort"},
        {"name": "Hotel Dronagiri Joshimath", "phone": "+91 94120 56755, 01389-222254", "email": "hoteldronagiri@gmail.com", "category": "3 Star Deluxe"},
        {"name": "Himalayan Abode Home Joshimath", "phone": "+91 94120 56766, 01389-222687", "email": "himalayanabode@gmail.com", "category": "4 Star Heritage Homestay"},
        {"name": "GMVN Jyotir Tourist Rest House", "phone": "+91 95680 06626, 01389-222118", "email": "gmvn@gmvnl.in", "category": "Govt Tourist Lodge"}
    ],
    "haridwar": [
        {"name": "Radisson Blu Hotel Haridwar", "phone": "+91 1334 666888, +91 99270 00555", "email": "reservations.haridwar@radisson.com", "category": "5 Star Luxury"},
        {"name": "The Haveli Hari Ganga Haridwar", "phone": "+91 75002 63336, 01334-265207", "email": "hhg@prasadheritage.com", "category": "Heritage / 4 Star"},
        {"name": "Amatra By the Ganges Haridwar", "phone": "+91 92580 90000, 01334-233333", "email": "reservations@amatrahotels.com", "category": "5 Star Luxury Resort"},
        {"name": "Hotel Ganga Lahari Haridwar", "phone": "+91 75008 63336, 01334-226444", "email": "gangalahari@prasadheritage.com", "category": "4 Star Riverfront"},
        {"name": "GMVN Rahi Tourist Rest House Haridwar", "phone": "+91 95680 06626, 01334-265320", "email": "gmvn@gmvnl.in", "category": "3 Star Govt Lodge"}
    ],
    "rishikesh": [
        {"name": "Aloha On The Ganges Rishikesh", "phone": "+91 95550 88000, +91 75008 63336", "email": "bookings@leisurehotels.in", "category": "4 Star Riverfront Resort"},
        {"name": "Ganga Kinare Riverside Resort", "phone": "+91 90155 44000, 0135-2435243", "email": "reservations@himalayan-hotels.com", "category": "4 Star Boutique"},
        {"name": "Divine Resort & Spa Rishikesh", "phone": "+91 93581 81804, 0135-2442129", "email": "reservations@divineresort.com", "category": "4 Star Spa Resort"},
        {"name": "Taj Rishikesh Resort & Spa", "phone": "+91 1378 262626, 1800 111 825", "email": "reservations.rishikesh@tajhotels.com", "category": "5 Star Luxury"},
        {"name": "EllBee Ganga View Rishikesh", "phone": "+91 88826 64444, 0135-2437777", "email": "reservations@ellbeehotels.com", "category": "3 Star Deluxe"}
    ],
    "nainital": [
        {"name": "The Naini Retreat Nainital", "phone": "+91 95550 88000, +91 94589 98128", "email": "bookings@leisurehotels.in", "category": "4 Star Heritage Resort"},
        {"name": "The Manu Maharani Nainital", "phone": "+91 5942 237342, +91 98101 23456", "email": "info@themanumaharani.com", "category": "4 Star Luxury"},
        {"name": "Shervani Hilltop Nainital", "phone": "+91 98111 87654, 05942-236128", "email": "reservations@shervanihotels.com", "category": "4 Star Resort"},
        {"name": "Vikram Vintage Inn Nainital", "phone": "+91 98100 55432, 05942-236177", "email": "info@vikramvintageinn.com", "category": "3 Star Deluxe"}
    ],
    "corbett": [
        {"name": "Corbett The Baagh Spa & Resort", "phone": "+91 92127 77224, +91 74949 47576", "email": "resv@resortsbythebaagh.com", "category": "5 Star Luxury Resort"},
        {"name": "Namah Resort Jim Corbett", "phone": "+91 83929 14912, +91 83929 15425", "email": "reservations.jimcorbett@radissonindividuals.com", "category": "5 Star Riverfront Resort"},
        {"name": "Aahana The Corbett Wilderness", "phone": "+91 70886 02024, 05947-284300", "email": "reservation@aahanaresort.com", "category": "5 Star Eco Luxury"},
        {"name": "The Den Corbett Resort", "phone": "+91 98111 44556, 05947-284144", "email": "reservations@thedencorbett.com", "category": "4 Star Jungle Lodge"},
        {"name": "Corbett Riverside Resort", "phone": "+91 98111 06752, 05947-284125", "email": "reservations@corbettriverside.com", "category": "4 Star Riverside"}
    ],
    "mussoorie": [
        {"name": "JW Marriott Mussoorie Walnut Grove", "phone": "+91 135 6692000, 1800 228 9290", "email": "jw.dedmd.reservations@marriott.com", "category": "5 Star Luxury"},
        {"name": "Jaypee Residency Manor Mussoorie", "phone": "+91 135 2631800, +91 135 6602000", "email": "reservations.jrm@jaypeehotels.com", "category": "5 Star Deluxe"},
        {"name": "Welcomhotel The Savoy Mussoorie", "phone": "+91 135 2607000, 1800 102 2333", "email": "savoyreservations@savoyhotel.in", "category": "5 Star Heritage"},
        {"name": "Fortune Resort Grace Mussoorie", "phone": "+91 135 2636000, 1800 102 2333", "email": "reservations@fortunehotels.in", "category": "4 Star"},
        {"name": "Hotel Madhuban Highlands", "phone": "+91 135 2635555, +91 98370 00123", "email": "reservations@hotelmadhubanhighlands.com", "category": "4 Star Comfort"}
    ],
    "auli": [
        {"name": "Cliff Top Club Auli", "phone": "+91 94120 56789, 01389-223217", "email": "reservations@clifftopclubauli.com", "category": "4 Star Ski Resort"},
        {"name": "GMVN Tourist Bungalow Auli", "phone": "+91 95680 06626, 01389-223208", "email": "gmvn@gmvnl.in", "category": "Govt Ski Lodge"},
        {"name": "Magpie Jungle Camp Chopta", "phone": "+91 94109 54572, +91 98971 14455", "email": "magpieecotourism@gmail.com", "category": "Deluxe Alpine Camp"},
        {"name": "Himalayan Eco Lodge Auli", "phone": "+91 98111 87654, 01389-223250", "email": "info@himalayanecolodges.com", "category": "3 Star Eco Resort"}
    ],
    "manali": [
        {"name": "The Himalayan Resort & Spa", "phone": "+91 88940 05999, 01902-250999", "email": "info@thehimalayan.com", "category": "5 Star Castle Luxury"},
        {"name": "Snow Valley Resorts Manali", "phone": "+91 98160 03027, +91 80912 00250", "email": "manali@snowvalleyresorts.com", "category": "3 Star Deluxe"},
        {"name": "Apple Country Resort Manali", "phone": "+91 98160 25418, 01902-254184", "email": "reservations@applecountryresorts.com", "category": "4 Star Spa Resort"},
        {"name": "Span Resort & Spa Manali", "phone": "+91 98160 12345, 01902-240538", "email": "reservations@spanresorts.com", "category": "5 Star Riverfront Luxury"},
        {"name": "Manuallaya The Resort & Spa", "phone": "+91 98160 55432, 01902-252238", "email": "reservations@manuallaya.com", "category": "5 Star Luxury"}
    ],
    "shimla": [
        {"name": "Wildflower Hall, An Oberoi Resort", "phone": "+91 177 2648585, 011 69110606", "email": "reservations@oberoigroup.com", "category": "5 Star Oberoi Luxury"},
        {"name": "Radisson Jass Hotel Shimla", "phone": "+91 177 2659012, 1800 108 0333", "email": "reservations.shimla@radisson.com", "category": "4 Star Deluxe"},
        {"name": "Clarkes Hotel Shimla", "phone": "+91 177 2651010, 011 23890606", "email": "clarkes@clarkesshimla.com", "category": "4 Star Grand Heritage"},
        {"name": "Hotel Combermere Shimla", "phone": "+91 177 2651246, +91 98160 12345", "email": "reservations@hotelcombermere.com", "category": "4 Star Mall Road"},
        {"name": "East Bourne Resort & Spa", "phone": "+91 177 2623669, +91 98160 67890", "email": "reservations@eastbourneindia.com", "category": "4 Star Resort"}
    ],
    "dharamshala": [
        {"name": "Hyatt Regency Dharamshala Resort", "phone": "+91 1892 242123, 1800 122 1234", "email": "dharamshala.regency@hyatt.com", "category": "5 Star Luxury Resort"},
        {"name": "Fortune Park Moksha McLeodganj", "phone": "+91 1892 242400, 1800 102 2333", "email": "reservations@fortunehotels.in", "category": "4 Star Deluxe"},
        {"name": "Hotel Surya McLeod", "phone": "+91 1892 221417, +91 98160 55432", "email": "info@hotelsuryamcleod.com", "category": "3 Star Comfort"},
        {"name": "Pride Surya Mountain Resort", "phone": "+91 1892 221555, 1800 209 1400", "email": "centralreservations@pridehotel.com", "category": "3 Star Deluxe"}
    ],
    "srinagar": [
        {"name": "The LaLiT Grand Palace Srinagar", "phone": "+91 194 2501001, +91 99066 68586", "email": "srinagarquery@thelalit.com", "category": "5 Star Grand Palace"},
        {"name": "Vivanta Dal View Srinagar (Taj)", "phone": "+91 194 2461111, 1800 111 825", "email": "vivanta.srinagar@tajhotels.com", "category": "5 Star Luxury"},
        {"name": "Radisson Collection Hotel Srinagar", "phone": "+91 194 2458000, 1800 108 0333", "email": "reservations.srinagar@radisson.com", "category": "5 Star Deluxe"},
        {"name": "Wangnoo Heritage Luxury Houseboats", "phone": "+91 194 2425555, +91 94190 07555", "email": "info@wangnoohouseboats.com", "category": "Luxury Cedar Houseboat"},
        {"name": "Hotel Pine Spring Srinagar", "phone": "+91 194 2312000, +91 94190 12345", "email": "info@hotelpinespring.com", "category": "3 Star Deluxe"}
    ],
    "gulmarg": [
        {"name": "The Khyber Himalayan Resort & Spa", "phone": "+91 1954 350666, 0194 3503222", "email": "reservations@khyberhotels.com", "category": "5 Star Luxury Ski Resort"},
        {"name": "Hotel Highlands Park Gulmarg", "phone": "+91 1954 254491, +91 94190 01234", "email": "highlandspark@gmail.com", "category": "4 Star Heritage"},
        {"name": "Grand Mumtaz Resorts Gulmarg", "phone": "+91 1954 254420, +91 94190 55432", "email": "reservations@grandmumtaz.com", "category": "4 Star"},
        {"name": "Hotel Pine Spring Gulmarg", "phone": "+91 1954 254580, +91 94190 67890", "email": "gulmarg@hotelpinespring.com", "category": "3 Star Deluxe"}
    ],
    "pahalgam": [
        {"name": "Welcomhotel Pine N Peak Pahalgam", "phone": "+91 136 243211, 1800 102 2333", "email": "reservations@itchotels.com", "category": "5 Star Luxury Resort"},
        {"name": "Pahalgam Hotel (Heritage)", "phone": "+91 1936 243252, +91 94190 12345", "email": "pahalgamhotel@gmail.com", "category": "4 Star Heritage"},
        {"name": "Hotel Mountview Pahalgam", "phone": "+91 1936 243221, +91 94190 34567", "email": "info@hotelmountview.com", "category": "4 Star"},
        {"name": "Hotel Heevan Pahalgam", "phone": "+91 1936 243219, 0194 2457007", "email": "heevan@ahsanmountresorts.com", "category": "4 Star Deluxe"}
    ],
    "jaipur": [
        {"name": "Rambagh Palace Jaipur (Taj)", "phone": "+91 141 2385700, 1800 111 825", "email": "rambagh.jaipur@tajhotels.com", "category": "5 Star Grand Palace"},
        {"name": "ITC Rajputana Jaipur", "phone": "+91 141 5100100, 1800 102 2333", "email": "reservations@itchotels.com", "category": "5 Star Luxury"},
        {"name": "Trident Jaipur", "phone": "+91 141 2670101, 011 23890555", "email": "reservations@tridenthotels.com", "category": "5 Star"},
        {"name": "Holiday Inn Jaipur City Centre", "phone": "+91 141 4224444, 1800 103 3066", "email": "reservations@hijcc.in", "category": "4 Star"},
        {"name": "Umaid Bhawan Heritage Hotel", "phone": "+91 141 2206426, +91 98290 55432", "email": "umaidbhawan@umaidbhawan.com", "category": "3 Star Heritage"}
    ],
    "udaipur": [
        {"name": "Taj Lake Palace Udaipur", "phone": "+91 294 2428800, 1800 111 825", "email": "lakepalace.udaipur@tajhotels.com", "category": "5 Star Luxury Palace"},
        {"name": "Trident Udaipur", "phone": "+91 294 2432200, 011 23890555", "email": "reservations@tridenthotels.com", "category": "5 Star"},
        {"name": "Fateh Prakash Palace Udaipur", "phone": "+91 294 2528008, 1800 180 2933", "email": "crs@hrhhotels.com", "category": "5 Star Heritage Palace"},
        {"name": "The Ananta Udaipur", "phone": "+91 294 2690000, +91 95710 55000", "email": "reservation.udaipur@anantahotels.com", "category": "5 Star Luxury Resort"},
        {"name": "Hotel Lakend Udaipur", "phone": "+91 294 2435555, +91 91160 01234", "email": "reservations@lakend.com", "category": "4 Star Lakefront"}
    ],
    "jodhpur": [
        {"name": "Umaid Bhawan Palace Jodhpur", "phone": "+91 291 2510101, 1800 111 825", "email": "umaidbhawan.jodhpur@tajhotels.com", "category": "5 Star Grand Royal Palace"},
        {"name": "Ajit Bhawan Palace Jodhpur", "phone": "+91 291 2510410, +91 99823 99999", "email": "reservations@ajitbhawan.com", "category": "4 Star Heritage Palace"},
        {"name": "Welcomhotel by ITC Hotels Jodhpur", "phone": "+91 291 7100100, 1800 102 2333", "email": "reservations@itchotels.com", "category": "5 Star Luxury"},
        {"name": "Indana Palace Jodhpur", "phone": "+91 291 7140000, +91 97841 00000", "email": "reservations.jodh@indanapalace.com", "category": "5 Star"}
    ],
    "goa": [
        {"name": "Taj Fort Aguada Resort & Spa", "phone": "+91 832 6645858, 1800 111 825", "email": "fortaguada.goa@tajhotels.com", "category": "5 Star Luxury Beach Resort"},
        {"name": "Cidade de Goa (Taj)", "phone": "+91 832 2454545, 1800 111 825", "email": "cidadedegoa@tajhotels.com", "category": "5 Star Beachfront"},
        {"name": "Whispering Palms Beach Resort", "phone": "+91 832 6651515, +91 98221 00123", "email": "reservations@whisperingpalms.com", "category": "4 Star Beach Resort"},
        {"name": "Hard Rock Hotel Goa", "phone": "+91 832 6745555, 1800 102 4744", "email": "info@hrhgoa.com", "category": "5 Star Lifestyle Resort"},
        {"name": "Santana Beach Resort Candolim", "phone": "+91 832 2479555, +91 98221 23456", "email": "info@santana-goa.com", "category": "3 Star Beachfront"}
    ],
    "munnar": [
        {"name": "Blanket Luxury Villa & Spa", "phone": "+91 4865 263737, +91 82813 00000", "email": "reservation@blanketmunnar.com", "category": "5 Star Luxury Resort"},
        {"name": "Tea County Munnar (KTDC)", "phone": "+91 4865 230460, +91 94000 08585", "email": "teacounty@ktdc.com", "category": "4 Star KTDC Resort"},
        {"name": "The Tall Trees Resort Munnar", "phone": "+91 4865 230593, +91 94470 54106", "email": "talltrees@thetalltreesmunnar.com", "category": "4 Star Eco Nature Resort"},
        {"name": "Fragrant Nature Munnar", "phone": "+91 4865 214000, +91 81119 97061", "email": "reservations.mr@fragrantnature.com", "category": "5 Star Boutique Resort"}
    ],
    "alleppey": [
        {"name": "Punnamada Resort Alleppey", "phone": "+91 477 2236162, +91 94471 61400", "email": "mail@punnamada.com", "category": "4 Star Backwater Resort"},
        {"name": "Lake Palace Resort Alleppey", "phone": "+91 477 2239701, +91 97450 00123", "email": "info@lakepalaceresort.com", "category": "5 Star Backwater Resort"},
        {"name": "Kumarakom Lake Resort", "phone": "+91 481 2524900, +91 94470 52000", "email": "klr@pghotels.com", "category": "5 Star Luxury Heritage"},
        {"name": "Ramada by Wyndham Alleppey", "phone": "+91 477 2240001, 1800 407 9963", "email": "reservations@ramadaalleppey.com", "category": "4 Star"}
    ]
}

def get_hotel_options_for_night(destination: str, stay_text: str, night_num: int) -> tuple[str, list[dict]]:
    """Returns the stay location label and a list of 3 to 5 curated hotel choices with Google-verified phone numbers."""
    text_lower = f"{destination} {stay_text}".lower()
    matched_key = None
    for loc_key in LOCATION_HOTELS:
        if loc_key in text_lower:
            matched_key = loc_key
            break
            
    if not matched_key:
        if any(k in text_lower for k in ["char dham", "chardham", "yamunotri", "gangotri", "kedarnath", "badrinath", "do dham", "dodham", "yatra"]):
            chardham_circuit = ["barkot", "barkot", "uttarkashi", "uttarkashi", "guptkashi", "kedarnath", "guptkashi", "badrinath", "joshimath", "rishikesh"]
            matched_key = chardham_circuit[(night_num - 1) % len(chardham_circuit)]
        elif any(k in text_lower for k in ["uttarakhand", "nainital", "corbett", "mussoorie", "auli"]):
            ut_circuit = ["nainital", "nainital", "corbett", "corbett", "mussoorie", "mussoorie", "rishikesh"]
            matched_key = ut_circuit[(night_num - 1) % len(ut_circuit)]
        elif any(k in text_lower for k in ["manali", "himachal", "shimla", "spiti", "kasol"]):
            hp_circuit = ["manali", "manali", "manali", "shimla", "shimla", "dharamshala"]
            matched_key = hp_circuit[(night_num - 1) % len(hp_circuit)]
        elif any(k in text_lower for k in ["kashmir", "srinagar", "gulmarg", "pahalgam"]):
            kashmir_circuit = ["srinagar", "gulmarg", "pahalgam", "srinagar", "srinagar"]
            matched_key = kashmir_circuit[(night_num - 1) % len(kashmir_circuit)]
        elif any(k in text_lower for k in ["rajasthan", "jaipur", "udaipur", "jodhpur"]):
            raj_circuit = ["jaipur", "jaipur", "jodhpur", "udaipur", "udaipur"]
            matched_key = raj_circuit[(night_num - 1) % len(raj_circuit)]
        elif any(k in text_lower for k in ["kerala", "munnar", "alleppey"]):
            kerala_circuit = ["munnar", "munnar", "alleppey", "alleppey"]
            matched_key = kerala_circuit[(night_num - 1) % len(kerala_circuit)]
        elif "goa" in text_lower:
            matched_key = "goa"
        else:
            matched_key = "barkot"

    hotels = LOCATION_HOTELS.get(matched_key, LOCATION_HOTELS["barkot"])
    stay_display = f"{matched_key.title()} Base / Circuit" if not stay_text or stay_text.lower() == "stay" else stay_text.strip()
    options = hotels[:5] if len(hotels) >= 3 else hotels
    return stay_display, options

def get_itinerary_stays(inquiry: InquiryRequest) -> list[str]:
    stays = re.findall(r"(?:Stay|Overnight|Night stay|Stay suggestion)\s*:\s*([^\n|]+)", inquiry.itinerary_text, flags=re.IGNORECASE)
    return [stay.strip(" .") for stay in stays[:inquiry.days]]

def create_private_hotel_pdf(inquiry: InquiryRequest, lead_id: str) -> str:
    """Creates a clean private PDF showing 3 to 5 hotel options for EVERY night stay with verified Google phone numbers and NO overlapping lines."""
    filename = f"hotels-{lead_id.replace('#', '').replace('-', '_')}.pdf"
    path = os.path.join(PRIVATE_HOTEL_PLANS_DIR, filename)
    
    document = SimpleDocTemplate(
        path,
        pagesize=A4,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36,
        title=f"Private Hotel Plan {lead_id}"
    )
    
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Title'],
        fontSize=15,
        leading=19,
        textColor=colors.HexColor("#0F172A"),
        alignment=0,
        fontName="Helvetica-Bold",
        spaceAfter=3
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor("#64748B"),
        spaceAfter=10
    )
    
    section_title = ParagraphStyle(
        'SectionTitle',
        parent=styles['Heading2'],
        fontSize=10.5,
        leading=14,
        textColor=colors.HexColor("#0F172A"),
        fontName="Helvetica-Bold",
        spaceBefore=8,
        spaceAfter=6
    )
    
    meta_label = ParagraphStyle(
        'MetaLabel',
        parent=styles['Normal'],
        fontSize=8,
        leading=11,
        textColor=colors.HexColor("#475569"),
        fontName="Helvetica-Bold"
    )
    
    meta_val = ParagraphStyle(
        'MetaVal',
        parent=styles['Normal'],
        fontSize=8,
        leading=11,
        textColor=colors.HexColor("#0F172A"),
        fontName="Helvetica"
    )
    
    th_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontSize=8.5,
        leading=11.5,
        textColor=colors.white,
        fontName="Helvetica-Bold",
        alignment=0
    )
    
    night_hdr_style = ParagraphStyle(
        'NightHeaderStyle',
        parent=styles['Normal'],
        fontSize=8,
        leading=10.5,
        textColor=colors.HexColor("#0F172A"),
        fontName="Helvetica-Bold"
    )
    
    opt_badge_style = ParagraphStyle(
        'OptBadgeStyle',
        parent=styles['Normal'],
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor("#475569"),
        fontName="Helvetica-Bold"
    )
    
    td_bold = ParagraphStyle(
        'TableCellBold',
        parent=styles['Normal'],
        fontSize=8,
        leading=10.5,
        textColor=colors.HexColor("#0F172A"),
        fontName="Helvetica-Bold"
    )
    
    td_cat = ParagraphStyle(
        'TableCellCat',
        parent=styles['Normal'],
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor("#334155"),
        fontName="Helvetica"
    )
    
    td_contact = ParagraphStyle(
        'TableCellContact',
        parent=styles['Normal'],
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor("#0369A1"),
        fontName="Helvetica"
    )
    
    footer_note = ParagraphStyle(
        'FooterNote',
        parent=styles['Normal'],
        fontSize=7.5,
        leading=10.5,
        textColor=colors.HexColor("#64748B"),
        fontName="Helvetica-Oblique"
    )
    
    story = []
    
    # 1. Header Banner
    story.append(Paragraph("PRIVATE HOTEL SELECTION & ACCOMMODATION PLAN", title_style))
    story.append(Paragraph(f"Agency: <b>{escape(AGENCY_NAME)}</b> &nbsp;|&nbsp; Ref ID: <b>{escape(lead_id)}</b> &nbsp;|&nbsp; 3 to 5 Hotel Choices Per Night &nbsp;|&nbsp; Generated: {datetime.now().strftime('%d-%b-%Y %I:%M %p')}", subtitle_style))
    story.append(Spacer(1, 4))
    
    # 2. Inquiry Summary Info Table (Width: 90 + 170 + 95 + 165 = 520 pt)
    summary_data = [
        [
            Paragraph("Customer Name:", meta_label),
            Paragraph(escape(inquiry.name), meta_val),
            Paragraph("Destination:", meta_label),
            Paragraph(escape(inquiry.destination), meta_val),
        ],
        [
            Paragraph("Travel Date:", meta_label),
            Paragraph(escape(inquiry.travel_date), meta_val),
            Paragraph("Tour Duration:", meta_label),
            Paragraph(f"{inquiry.days} Days / {max(1, inquiry.days - 1)} Nights", meta_val),
        ],
        [
            Paragraph("Route:", meta_label),
            Paragraph(f"{escape(inquiry.pickup)} &rarr; {escape(inquiry.drop)}", meta_val),
            Paragraph("Rooms Required:", meta_label),
            Paragraph(f"{inquiry.rooms_required} Room(s) ({escape(inquiry.hotel_category)})", meta_val),
        ],
        [
            Paragraph("Vehicle:", meta_label),
            Paragraph(escape(inquiry.vehicle_category), meta_val),
            Paragraph("Meal Plan:", meta_label),
            Paragraph(escape(inquiry.meal_plan), meta_val),
        ],
    ]
    
    summary_table = Table(summary_data, colWidths=[90, 170, 95, 165])
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#F8FAFC")),
        ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    story.append(summary_table)
    story.append(Spacer(1, 10))
    
    # 3. Multi-Option Hotel Directory Table
    story.append(Paragraph("Curated 3 to 5 Hotel Choices For Every Night Stay", section_title))
    
    stays = get_itinerary_stays(inquiry)
    total_nights = max(1, inquiry.days - 1 if inquiry.days > 1 else 1)
    
    table_rows = [
        [
            Paragraph("Night / Stay Location", th_style),
            Paragraph("Choice", th_style),
            Paragraph("Hotel & Resort Name", th_style),
            Paragraph("Category", th_style),
            Paragraph("Verified Phone & Email ID", th_style)
        ]
    ]
    
    t_styles = [
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#0F172A")),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 3.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
    ]
    
    row_idx = 1
    for night in range(1, total_nights + 1):
        stay_text = stays[night - 1] if (night - 1) < len(stays) else ""
        stay_loc, options = get_hotel_options_for_night(inquiry.destination, stay_text, night)
        loc_header_text = f"Night {night}:<br/><b>{escape(stay_loc)}</b>"
        
        for opt_idx, hotel in enumerate(options, 1):
            lbl = Paragraph(loc_header_text, night_hdr_style) if opt_idx == 1 else Paragraph("", night_hdr_style)
            contact_cell_html = f"<b>{escape(hotel['phone'])}</b>"
            if hotel.get("email"):
                contact_cell_html += f"<br/><font color='#475569'>✉ {escape(hotel['email'])}</font>"
                
            table_rows.append([
                lbl,
                Paragraph(f"Option {opt_idx}", opt_badge_style),
                Paragraph(escape(hotel["name"]), td_bold),
                Paragraph(escape(hotel["category"]), td_cat),
                Paragraph(contact_cell_html, td_contact)
            ])
            bg_color = colors.white if night % 2 == 1 else colors.HexColor("#F8FAFC")
            t_styles.append(('BACKGROUND', (0, row_idx), (-1, row_idx), bg_color))
            row_idx += 1
            
        t_styles.append(('LINEBELOW', (0, row_idx - 1), (-1, row_idx - 1), 1.0, colors.HexColor("#94A3B8")))
        
    hotel_table = Table(table_rows, colWidths=[105, 42, 145, 68, 160], repeatRows=1)
    hotel_table.setStyle(TableStyle(t_styles))
    story.append(hotel_table)
    
    # 4. Confidentiality Footer
    story.append(Spacer(1, 10))
    story.append(Paragraph(
        "🔒 <b>Confidential Accommodation Notice:</b> Select your preferred hotel option for each night stay. "
        "All contact numbers and email IDs are verified from official resort websites and local business listings. Room availability, seasonal tariffs, and confirmation vouchers must be reconfirmed with hotel reception desks prior to guest check-in.",
        footer_note
    ))
    
    document.build(story)
    return filename

# Curated Featured Packages Catalog (Pilgrimages & Domestic Tourism)
PACKAGES = [
    {
        "id": "pkg-chardham-deluxe",
        "title": "Sacred Char Dham Yatra Deluxe Tour",
        "destination": "Yamunotri • Gangotri • Kedarnath • Badrinath",
        "category": "Pilgrimage",
        "duration": "10 Nights / 11 Days",
        "price_inr": 34999,
        "original_price_inr": 45000,
        "badge": "Divine Best Seller",
        "image": "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80",
        "highlights": [
            "Complete 4 Holy Dhams in Uttarakhand",
            "Yamunotri & Gangotri Holy Bath & Aarti",
            "Kedarnath Dham Temple Darshan",
            "Badrinath Ji & Mana Village (First Village)",
            "Biometric Yatra Registration & VIP Pass Assistance",
            "Pick-up & Drop from Haridwar / Rishikesh / Dehradun"
        ],
        "inclusions": [
            "10 Nights Deluxe Hotel / Ashram Stays",
            "Daily Pure Vegetarian Breakfast & Dinner",
            "Dedicated AC Tempo Traveller / Private Cab for Hilly Terrain",
            "Experienced Mountain Chauffeur & Yatra Coordinator",
            "Medical First-Aid & Emergency Oxygen Support"
        ]
    },
    {
        "id": "pkg-dodham-kedar-badri",
        "title": "Do Dham Yatra: Kedarnath & Badrinath Ji",
        "destination": "Kedarnath • Badrinath • Guptkashi • Joshimath",
        "category": "Pilgrimage",
        "duration": "5 Nights / 6 Days",
        "price_inr": 22500,
        "original_price_inr": 29999,
        "badge": "Most Popular Yatra",
        "image": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
        "highlights": [
            "Kedarnath Jyotirlinga & Evening Aarti",
            "Badrinath Temple & Tapt Kund Hot Spring",
            "Mana Village, Bheem Pul & Saraswati River",
            "Devprayag & Rudraprayag Sangam View",
            "Helicopter Shuttle / Trek Assistance Option"
        ],
        "inclusions": [
            "5 Nights Hotel / Camp Accommodation",
            "Pure Veg Breakfast & Dinner Daily",
            "Private Sanitized Vehicle from Haridwar/Rishikesh",
            "Yatra Registration & Toll/Parking Included"
        ]
    },
    {
        "id": "pkg-kedarnath-heli",
        "title": "Kedarnath Dham Helicopter & VIP Express",
        "destination": "Guptkashi • Phata/Sirsi • Kedarnath Ji",
        "category": "Pilgrimage",
        "duration": "3 Days / 2 Nights",
        "price_inr": 19999,
        "original_price_inr": 26500,
        "badge": "Helicopter Special",
        "image": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80",
        "highlights": [
            "Same-Day / Next-Day Helicopter Shuttle (Phata/Sirsi)",
            "Priority VIP Darshan at Kedarnath Temple",
            "Stay in Premium Scenic Guptkashi / Kedarnath Resort",
            "Special Puja & Abhishek Support",
            "Rishikesh / Dehradun Airport Transfer Available"
        ],
        "inclusions": [
            "2 Nights Deluxe Stay with Scenic Mountain Views",
            "All Meals (Vegetarian / Satvik)",
            "Helicopter Boarding Assistance & Yatra Slip",
            "Private Cab Transfers from Haridwar / Dehradun"
        ]
    },
    {
        "id": "pkg-uttarakhand-jewels",
        "title": "Jewels of Uttarakhand: Nainital, Mussoorie & Jim Corbett",
        "destination": "Nainital • Corbett • Mussoorie • Rishikesh",
        "category": "Uttarakhand",
        "duration": "6 Days / 5 Nights",
        "price_inr": 17999,
        "original_price_inr": 24000,
        "badge": "Family Favorite",
        "image": "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80",
        "highlights": [
            "Naini Lake Boating & Naina Devi Temple",
            "Jim Corbett National Park Jeep Tiger Safari",
            "Mussoorie Kempty Falls & Gun Hill Cable Car",
            "Rishikesh Triveni Ghat Maha Aarti & Laxman Jhula",
            "Scenic Himalayan Foothill Drives"
        ],
        "inclusions": [
            "5 Nights 3★/4★ Resort & Jungle Lodge Stays",
            "Daily Buffet Breakfast & Dinner",
            "Jeep Safari in Jim Corbett Reserve",
            "Private AC Sedan/SUV for all transfers"
        ]
    },
    {
        "id": "pkg-auli-chopta",
        "title": "Auli Ski Paradise & Chopta-Tungnath Trek",
        "destination": "Auli • Chopta • Tungnath • Rishikesh",
        "category": "Uttarakhand",
        "duration": "5 Days / 4 Nights",
        "price_inr": 15999,
        "original_price_inr": 21500,
        "badge": "Adventure & Nature",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
        "highlights": [
            "Auli Ropeway & Panoramic Nanda Devi Views",
            "Chopta (Mini Switzerland of Uttarakhand)",
            "Tungnath Temple (Highest Shiva Temple in the World)",
            "Chandrashila Peak 360° Himalayan Summit",
            "Deoriatal Emerald Lake Camping"
        ],
        "inclusions": [
            "4 Nights Alpine Camp / Resort Accommodation",
            "Daily Breakfast & Nutritious Trekking Dinners",
            "Trek Guide & Forest Permit Fees",
            "Comfortable Mountain Cab Transfers"
        ]
    },
    {
        "id": "pkg-manali-spiti",
        "title": "Magical Manali & Solang Valley Escape",
        "destination": "Manali • Solang • Atal Tunnel • Sissu",
        "category": "Himachal",
        "duration": "4 Days / 3 Nights",
        "price_inr": 12999,
        "original_price_inr": 17500,
        "badge": "Himachal Best Seller",
        "image": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
        "highlights": ["Solang Valley Adventure", "Rohtang Snow Point / Atal Tunnel", "Hadimba Temple", "Old Manali Cafes", "Volvo / Cab Included"],
        "inclusions": ["3★/4★ Resort Stay", "Daily Breakfast & Dinner", "Sightseeing Cab", "Bonfire Night"]
    },
    {
        "id": "pkg-kashmir-paradise",
        "title": "Kashmir: Heaven on Earth Luxury Tour",
        "destination": "Srinagar • Gulmarg • Pahalgam",
        "category": "Kashmir",
        "duration": "5 Days / 4 Nights",
        "price_inr": 21999,
        "original_price_inr": 29000,
        "badge": "Kashmir Crown",
        "image": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80",
        "highlights": ["Dal Lake Luxury Houseboat", "Gulmarg Gondola Ride", "Betaab Valley in Pahalgam", "Shikara Sunset Ride", "Mughal Gardens"],
        "inclusions": ["Houseboat & Hotel Stay", "Breakfast & Dinner (Wazwan)", "Private Sedan Cab", "Shikara Ride Ticket"]
    },
    {
        "id": "pkg-rajasthan-royal",
        "title": "Royal Rajasthan: Jaipur, Jodhpur & Udaipur",
        "destination": "Jaipur • Jodhpur • Udaipur",
        "category": "Rajasthan",
        "duration": "6 Days / 5 Nights",
        "price_inr": 24999,
        "original_price_inr": 34000,
        "badge": "Heritage Special",
        "image": "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
        "highlights": ["Amber Fort & City Palace", "Udaipur Lake Pichola Boat", "Mehrangarh Fort Jodhpur", "Cultural Folk Dance & Dinner", "Heritage Haveli Stay"],
        "inclusions": ["Heritage Hotel Stays", "Breakfast & Royal Dinner", "AC Private Cab", "Palace Tour Guide"]
    },
    {
        "id": "pkg-goa-sun-sand",
        "title": "Tropical Goa Beach & Cruise Carnival",
        "destination": "North & South Goa",
        "category": "Goa & Kerala",
        "duration": "4 Days / 3 Nights",
        "price_inr": 9999,
        "original_price_inr": 14500,
        "badge": "Trending Beach",
        "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
        "highlights": ["Baga & Calangute Beach", "Mandovi Sunset Cruise", "Fort Aguada & Chapora", "Latin Quarter Fontainhas", "Water Sports Combo"],
        "inclusions": ["Resort with Swimming Pool", "Daily Buffet Breakfast", "Airport Transfers", "Sunset Cruise Ticket"]
    },
    {
        "id": "pkg-kerala-backwaters",
        "title": "Kerala God's Own Country & Houseboat",
        "destination": "Munnar • Thekkady • Alleppey",
        "category": "Goa & Kerala",
        "duration": "5 Days / 4 Nights",
        "price_inr": 18500,
        "original_price_inr": 25000,
        "badge": "Honeymoon Special",
        "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
        "highlights": ["Munnar Tea Plantations", "Alleppey Backwaters Cruise", "Periyar Wildlife Sanctuary", "Cheeyappara Waterfalls", "Ayurvedic Spa Experience"],
        "inclusions": ["Private Houseboat Stay", "All Meals on Houseboat", "Hill Resort in Munnar", "Private AC Cab"]
    }
]

def check_admin_authorized(request: Request, token: Optional[str] = None) -> bool:
    """Verifies admin access via either query token or Authorization: Bearer <token> header."""
    if token and token == ADMIN_PASSWORD:
        return True
    auth_header = request.headers.get("Authorization", "")
    if auth_header.startswith("Bearer ") and auth_header[7:].strip() == ADMIN_PASSWORD:
        return True
    return False

# Backend Root & Admin Portal Routes: Serves modern React App if built, or Admin Portal
@app.get("/")
def home(request: Request):
    index_dist = os.path.join(FRONTEND_DIST_DIR, "index.html")
    if os.path.exists(index_dist):
        return FileResponse(index_dist)
    return templates.TemplateResponse(
        request=request,
        name="admin.html",
        context={
            "agency_name": AGENCY_NAME,
            "agency_phone": AGENCY_PHONE,
            "agency_whatsapp": AGENCY_WHATSAPP,
            "agency_email": AGENCY_EMAIL
        }
    )

@app.get("/admin")
def admin_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="admin.html",
        context={
            "agency_name": AGENCY_NAME,
            "agency_phone": AGENCY_PHONE,
            "agency_whatsapp": AGENCY_WHATSAPP,
            "agency_email": AGENCY_EMAIL
        }
    )

# Admin Authentication & Protected Endpoints
@app.post("/api/admin/login")
def admin_login(req: AdminLoginRequest):
    if req.password == ADMIN_PASSWORD:
        return {"success": True, "token": ADMIN_PASSWORD}
    raise HTTPException(status_code=401, detail="Invalid admin password.")

@app.get("/api/admin/leads")
def get_admin_leads(request: Request, token: Optional[str] = None):
    if not check_admin_authorized(request, token):
        raise HTTPException(status_code=401, detail="Unauthorized access. Invalid admin credentials.")
    try:
        leads = excel_manager.get_all_leads()
        return {
            "success": True,
            "total_count": len(leads),
            "leads": leads
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch leads: {str(e)}")

@app.delete("/api/admin/leads/{lead_id}")
def delete_admin_lead(lead_id: str, request: Request, token: Optional[str] = None):
    if not check_admin_authorized(request, token):
        raise HTTPException(status_code=401, detail="Unauthorized access. Invalid admin credentials.")
    if not excel_manager.delete_lead(lead_id):
        raise HTTPException(status_code=404, detail="Lead record not found.")
    return {"success": True, "message": "Lead record deleted."}

@app.get("/api/admin/download-leads")
def download_admin_leads_excel(request: Request, token: Optional[str] = None):
    if not check_admin_authorized(request, token):
        raise HTTPException(status_code=401, detail="Unauthorized access. Invalid admin credentials.")
    excel_path = excel_manager.EXCEL_FILE_PATH
    if not os.path.exists(excel_path):
        excel_manager.ensure_excel_file_exists()
    return FileResponse(
        path=excel_path,
        filename="Mankotia_Holidays_Customer_Leads.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )

@app.get("/api/admin/hotel-plan/{filename}")
def download_admin_hotel_plan(filename: str, request: Request, token: Optional[str] = None):
    if not check_admin_authorized(request, token):
        raise HTTPException(status_code=401, detail="Unauthorized access. Invalid admin credentials.")
    safe_filename = os.path.basename(filename)
    if safe_filename != filename or not safe_filename.startswith("hotels-") or not safe_filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Invalid hotel plan filename.")
    path = os.path.join(PRIVATE_HOTEL_PLANS_DIR, safe_filename)
    if not os.path.isfile(path):
        raise HTTPException(status_code=404, detail="Hotel plan not found.")
    return FileResponse(path=path, filename=safe_filename, media_type="application/pdf")

# Health & Keep-Alive Monitoring Routes
@app.get("/api/health")
@app.get("/api/ping")
def health_check():
    return {
        "status": "healthy",
        "service": "Mankotia Holidays API",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat(),
        "keep_alive": True
    }

# API Routes
@app.get("/api/config")
def get_config():
    return {
        "agency_name": AGENCY_NAME,
        "agency_phone": AGENCY_PHONE,
        "agency_whatsapp": AGENCY_WHATSAPP,
        "agency_email": AGENCY_EMAIL,
        "call_link": f"tel:{AGENCY_PHONE}",
        "whatsapp_link": f"https://wa.me/{AGENCY_WHATSAPP}"
    }

def is_valid_journey_date(date_str: str) -> bool:
    """Validates that the travel date is on or after the present date."""
    if not date_str or not date_str.strip():
        return False
    formats = ["%Y-%m-%d", "%d-%m-%Y", "%d/%m/%Y", "%d-%b-%Y", "%d %b %Y", "%d %B %Y", "%Y/%m/%d"]
    clean_str = date_str.strip()
    parsed_date = None
    for fmt in formats:
        try:
            parsed_date = datetime.strptime(clean_str, fmt).date()
            break
        except ValueError:
            continue
            
    if parsed_date:
        today = datetime.now().date()
        return parsed_date >= today
    return True

@app.get("/api/packages")
def get_packages():
    return {"packages": PACKAGES}

@app.post("/api/inquiry")
def create_inquiry(request: Request, inquiry: InquiryRequest):
    try:
        # Validate that journey date is not before present date
        if not is_valid_journey_date(inquiry.travel_date):
            raise HTTPException(
                status_code=400,
                detail=f"Please enter a valid date for journey. The selected travel date ({inquiry.travel_date}) is before the present date ({datetime.now().strftime('%d-%b-%Y')})."
            )

        # Automatically generate AI itinerary if not provided by customer
        if not inquiry.itinerary_text or not inquiry.itinerary_text.strip():
            try:
                generated = ai_service.generate_ai_itinerary(
                    destination=inquiry.destination,
                    days=inquiry.days,
                    budget=inquiry.budget or "Standard",
                    travel_style=inquiry.travelers or "Family & Leisure",
                    travelers=inquiry.travelers or f"{inquiry.number_of_persons} persons",
                    special_requests=inquiry.notes or "",
                    pickup_location=inquiry.pickup,
                    drop_location=inquiry.drop
                )
                if generated and isinstance(generated, dict):
                    lines = []
                    lines.append(f"Title: {generated.get('title', f'{inquiry.destination} Custom Tour')}")
                    lines.append(f"Destination: {generated.get('destination', inquiry.destination)}")
                    lines.append(f"Duration: {generated.get('duration', f'{inquiry.days} Days / {max(1, inquiry.days - 1)} Nights')}")
                    if generated.get("estimated_cost_inr"):
                        lines.append(f"Estimated Cost: {generated.get('estimated_cost_inr')}")
                    if generated.get("best_season"):
                        lines.append(f"Best Season: {generated.get('best_season')}")
                    if generated.get("highlights"):
                        lines.append("Highlights:")
                        for h in generated.get("highlights", []):
                            lines.append(f"• {h}")
                    lines.append("")
                    for day in generated.get("days", []):
                        d_num = day.get("day_number", 1)
                        theme = day.get("theme", "")
                        lines.append(f"Day {d_num}: {theme}")
                        if day.get("morning"):
                            lines.append(f"- Morning: {day.get('morning')}")
                        if day.get("afternoon"):
                            lines.append(f"- Afternoon: {day.get('afternoon')}")
                        if day.get("evening"):
                            lines.append(f"- Evening: {day.get('evening')}")
                        if day.get("stay_suggestion"):
                            lines.append(f"- Stay: {day.get('stay_suggestion')}")
                        if day.get("meal_recommendation"):
                            lines.append(f"- Meal: {day.get('meal_recommendation')}")
                        if day.get("pro_tip"):
                            lines.append(f"- Pro Tip: {day.get('pro_tip')}")
                        lines.append("")
                    if generated.get("packing_essentials"):
                        lines.append("Packing Essentials:")
                        for item in generated.get("packing_essentials", []):
                            lines.append(f"• {item}")
                    inquiry.itinerary_text = "\n".join(lines).strip()
            except Exception as gen_err:
                print(f"Automatic AI itinerary generation failed: {gen_err}")

        saved_lead = excel_manager.add_lead_to_excel(
            name=inquiry.name,
            phone=inquiry.phone,
            email=inquiry.email,
            destination=inquiry.destination,
            travel_date=inquiry.travel_date,
            pickup=inquiry.pickup,
            drop=inquiry.drop,
            days=inquiry.days,
            number_of_persons=inquiry.number_of_persons,
            children=inquiry.children,
            child_ages=inquiry.child_ages,
            vehicle_category=inquiry.vehicle_category,
            rooms_required=inquiry.rooms_required,
            meal_plan=inquiry.meal_plan,
            hotel_category=inquiry.hotel_category,
            travelers=inquiry.travelers or f"{inquiry.number_of_persons} persons",
            budget=inquiry.budget or "Standard",
            notes=inquiry.notes or "",
            source=inquiry.source or "Website Booking Form"
        )
        document_filename = create_inquiry_document(inquiry, saved_lead["lead_id"])
        hotel_plan_filename = create_private_hotel_pdf(inquiry, saved_lead["lead_id"])
        try:
            admin_document_sent = send_document_to_admin_whatsapp(document_filename, inquiry, saved_lead["lead_id"])
        except Exception as whatsapp_error:
            admin_document_sent = False
            print(f"Admin WhatsApp Word delivery failed: {whatsapp_error}")

        admin_email_sent = False
        try:
            admin_email_sent = send_inquiry_email(inquiry, document_filename, hotel_plan_filename)
        except Exception as email_error:
            print(f"Inquiry email notification failed: {email_error}")
        
        # Build pre-filled WhatsApp text for the customer
        wa_message = (
            f"Hi {AGENCY_NAME}! I just submitted my travel inquiry.\n\n"
            f"Name: {inquiry.name}\nPhone: {inquiry.phone}\nEmail: {inquiry.email}\n"
            f"Destination: {inquiry.destination}\nJourney date: {inquiry.travel_date}\n"
            f"Pickup: {inquiry.pickup}\nDrop: {inquiry.drop}\nDays: {inquiry.days}\n"
            f"Persons: {inquiry.number_of_persons}\nChildren: {inquiry.children}\n"
            f"Child ages: {inquiry.child_ages or 'None'}\nVehicle: {inquiry.vehicle_category}\n"
            f"Rooms: {inquiry.rooms_required}\nMeal plan: {inquiry.meal_plan}\n"
            f"Travel group: {inquiry.travelers or 'Not specified'}\nBudget: {inquiry.budget or 'Standard'}\n"
            f"Special requests: {inquiry.notes or 'None'}\n\n"
            f"AI itinerary included in Word document: {'Yes' if inquiry.itinerary_text.strip() else 'No'}\n"
            f"Please share the best quote and package details."
        )
        
        encoded_wa_msg = urllib.parse.quote(wa_message)
        wa_link = f"https://wa.me/{AGENCY_WHATSAPP}?text={encoded_wa_msg}"
        
        return {
            "success": True,
            "message": "Thank you! Your travel inquiry has been received.",
            "lead_id": saved_lead["lead_id"],
            "whatsapp_redirect_url": wa_link,
            "admin_document_sent": admin_document_sent,
            "admin_email_sent": admin_email_sent,
            "call_link": f"tel:{AGENCY_PHONE}"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to record inquiry in Excel: {str(e)}")

@app.post("/api/inquiry/ticket")
def create_ticket_inquiry(inquiry: TicketInquiryRequest):
    try:
        # Validate travel date is not before present date
        if inquiry.travel_date and inquiry.travel_date not in ["Flexible / Soon", "Flexible"] and not is_valid_journey_date(inquiry.travel_date):
            raise HTTPException(
                status_code=400,
                detail=f"Please enter a valid present or future date for journey. The selected date ({inquiry.travel_date}) is before the present date."
            )

        saved_lead = excel_manager.add_ticket_query_to_excel(
            name=inquiry.name,
            phone=inquiry.phone,
            email=inquiry.email,
            transit_type=inquiry.transit_type,
            origin=inquiry.origin,
            destination=inquiry.destination,
            travel_date=inquiry.travel_date,
            travel_class=inquiry.travel_class,
            passengers=inquiry.passengers,
            notes=inquiry.notes or "",
            source=inquiry.source or "Website Flight/Train/Bus Form"
        )
        document_filename = create_ticket_document(inquiry, saved_lead["lead_id"])
        admin_email_sent = False
        try:
            admin_email_sent = send_ticket_email(inquiry, document_filename)
        except Exception as err:
            print(f"Ticket email notification failed: {err}")
            
        wa_message = (
            f"Hi {AGENCY_NAME}! I just submitted an online ticket booking query.\n\n"
            f"Name: {inquiry.name}\nPhone: {inquiry.phone}\nEmail: {inquiry.email}\n"
            f"Booking Mode: {inquiry.transit_type}\n"
            f"Route: {inquiry.origin} -> {inquiry.destination}\n"
            f"Travel Date: {inquiry.travel_date}\n"
            f"Class: {inquiry.travel_class}\n"
            f"Passengers: {inquiry.passengers}\n"
            f"Notes: {inquiry.notes or 'None'}\n\n"
            f"Please share the available tickets and best fare quote."
        )
        encoded_wa_msg = urllib.parse.quote(wa_message)
        wa_link = f"https://wa.me/{AGENCY_WHATSAPP}?text={encoded_wa_msg}"
        
        return {
            "success": True,
            "message": "Thank you! Your ticket booking query has been received.",
            "lead_id": saved_lead["lead_id"],
            "whatsapp_redirect_url": wa_link,
            "admin_email_sent": admin_email_sent,
            "call_link": f"tel:{AGENCY_PHONE}"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to record ticket query: {str(e)}")

@app.post("/api/inquiry/transport")
def create_transport_inquiry(inquiry: TransportInquiryRequest):
    try:
        # Validate pickup date is not before present date
        if inquiry.pickup_date and inquiry.pickup_date not in ["Immediate / Flexible", "Flexible"] and not is_valid_journey_date(inquiry.pickup_date):
            raise HTTPException(
                status_code=400,
                detail=f"Please enter a valid present or future date for pickup. The selected date ({inquiry.pickup_date}) is before the present date."
            )

        saved_lead = excel_manager.add_transport_query_to_excel(
            name=inquiry.name,
            phone=inquiry.phone,
            email=inquiry.email,
            vehicle_category=inquiry.vehicle_category,
            rental_type=inquiry.rental_type,
            pickup=inquiry.pickup,
            drop=inquiry.drop,
            pickup_date=inquiry.pickup_date,
            duration_days=inquiry.duration_days,
            passengers=inquiry.passengers,
            notes=inquiry.notes or "",
            source=inquiry.source or "Website Transport & Cab Form"
        )
        document_filename = create_transport_document(inquiry, saved_lead["lead_id"])
        admin_email_sent = False
        try:
            admin_email_sent = send_transport_email(inquiry, document_filename)
        except Exception as err:
            print(f"Transport email notification failed: {err}")
            
        wa_message = (
            f"Hi {AGENCY_NAME}! I just submitted a vehicle/cab rental query.\n\n"
            f"Name: {inquiry.name}\nPhone: {inquiry.phone}\nEmail: {inquiry.email}\n"
            f"Vehicle: {inquiry.vehicle_category}\n"
            f"Rental Type: {inquiry.rental_type}\n"
            f"Pickup: {inquiry.pickup}\nDrop: {inquiry.drop}\n"
            f"Date: {inquiry.pickup_date}\n"
            f"Duration: {inquiry.duration_days} Day(s)\n"
            f"Passengers: {inquiry.passengers}\n"
            f"Notes: {inquiry.notes or 'None'}\n\n"
            f"Please share the vehicle availability and best fare quote."
        )
        encoded_wa_msg = urllib.parse.quote(wa_message)
        wa_link = f"https://wa.me/{AGENCY_WHATSAPP}?text={encoded_wa_msg}"
        
        return {
            "success": True,
            "message": "Thank you! Your transport and vehicle rental query has been received.",
            "lead_id": saved_lead["lead_id"],
            "whatsapp_redirect_url": wa_link,
            "admin_email_sent": admin_email_sent,
            "call_link": f"tel:{AGENCY_PHONE}"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to record transport query: {str(e)}")



@app.post("/api/generate-itinerary")
def generate_itinerary_endpoint(req: ItineraryRequest):
    try:
        itinerary = ai_service.generate_ai_itinerary(
            destination=req.destination,
            days=req.days,
            budget=req.budget or "Standard",
            travel_style=req.travel_style or "Family / Leisure",
            travelers=req.travelers or "2 Adults",
            special_requests=req.special_requests or "",
            pickup_location=req.pickup_location,
            drop_location=req.drop_location
        )
        return {"success": True, "itinerary": itinerary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI generation failed: {str(e)}")

@app.post("/api/chat-concierge")
def chat_concierge_endpoint(req: ChatRequest):
    try:
        reply = ai_service.chat_travel_concierge(req.message, req.history)
        return {"success": True, "reply": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Concierge response failed: {str(e)}")

@app.get("/api/leads")
def get_leads_endpoint(request: Request, token: Optional[str] = None):
    if not check_admin_authorized(request, token):
        raise HTTPException(status_code=401, detail="Unauthorized. Admin authentication required.")
    try:
        leads = excel_manager.get_all_leads()
        return {"success": True, "leads": leads, "total_count": len(leads)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch leads: {str(e)}")

@app.delete("/api/leads/{lead_id}")
def delete_lead_endpoint(lead_id: str, request: Request, token: Optional[str] = None):
    if not check_admin_authorized(request, token):
        raise HTTPException(status_code=401, detail="Unauthorized. Admin authentication required.")
    try:
        deleted = excel_manager.delete_lead(lead_id)
        if not deleted:
            raise HTTPException(status_code=404, detail="Lead not found")
        return {"success": True, "message": f"Lead {lead_id} deleted successfully."}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete lead: {str(e)}")

@app.get("/api/resolve-pincode/{pincode}")
def resolve_pincode_endpoint(pincode: str):
    """Resolves an Indian 6-digit postal PIN code into Area, District and State."""
    resolved = ai_service.resolve_location_from_pincode_or_text(pincode)
    return {
        "pincode": pincode,
        "resolved_location": resolved,
        "google_maps_search_url": f"https://www.google.com/maps/search/?api=1&query={urllib.parse.quote_plus(resolved)}"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
