# 🌴 Mankotia Holidays - AI Tour & Travel Platform

A full-stack, AI-powered Tour & Travel web application built with **Python (FastAPI)**, **Google Gemini AI**, and **Excel Database (`openpyxl`)** for automated customer lead management, WhatsApp booking deep-links, and one-tap calling.

---

## 🔒 Customer Privacy & Security Architecture

- **Backend Admin Portal (`http://127.0.0.1:8000/` & `http://127.0.0.1:8000/admin`)**:
  - **Direct Admin Security Login**: Accessible on the backend server root and `/admin`.
  - Protected with your **Admin Password** (default: `mankotia123` in `.env`).
  - Search customer leads, Click-to-Call, Click-to-WhatsApp customers, and download the full `.xlsx` spreadsheet & private hotel PDFs.
- **Frontend Customer Website (`http://localhost:5173/`)**:
  - For all customers & website visitors to explore packages, generate AI itineraries, and submit booking inquiries.
- **Private Excel Database (`data/mankotia_leads.xlsx`)**:
  - Customer inquiries (Name, Phone Number, Email, Destination, Budget, Notes) are saved **locally on your computer only**.

---

## ✨ Core Features

- 🗺️ **AI Smart Itinerary Studio**: Generates day-by-day custom travel plans tailored to duration, budget, and travel style.
- 💬 **24/7 AI Travel Concierge (Aria)**: Floating chat assistant answering travel queries, weather, packing essentials, and packages.
- 📱 **WhatsApp Deep-Link Integration**: Automatically formats custom pre-filled booking messages opening WhatsApp (`wa.me`).
- 📞 **Click-to-Call Integration**: Direct phone calling buttons (`tel:+919816461616`) embedded across the app.
- 📦 **Curated Holiday Package Catalog**: Featured tour packages for Himachal, Kashmir, Goa, Rajasthan, Kerala, and Dubai.

---

## 🚀 How to Run

### 1. Configure Settings in `.env`
```env
AGENCY_NAME=Mankotia Holidays
AGENCY_PHONE=+919816461616
AGENCY_WHATSAPP=919816461616
AGENCY_EMAIL=mankotiaholidays38@gmail.com
ADMIN_PASSWORD=mankotia123
GEMINI_API_KEY=
```

### 2. Start the Server
```bash
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

- **Backend Admin Security Portal**: **[http://127.0.0.1:8000](http://127.0.0.1:8000)** or **[http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin)** (Password: `mankotia123`)
- **Frontend Customer Website**: **[http://localhost:5173](http://localhost:5173)** (Run `npm run dev` in `frontend/`)
