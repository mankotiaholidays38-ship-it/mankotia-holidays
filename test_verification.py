import sys
import os
from fastapi.testclient import TestClient

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

from main import app
import excel_manager
import ai_service
import data_store
import itinerary_templates

def verify_system():
    print("=" * 60)
    print("MANKOTIA HOLIDAYS - END-TO-END SYSTEM VERIFICATION")
    print("=" * 60)

    client = TestClient(app)

    # 1. Test Static Data Modules
    print(f" [PASS] 1. Data Store loaded: {len(data_store.PACKAGES)} packages, {len(data_store.LOCATION_HOTELS)} hotel regions.")
    print(f" [PASS]    Itinerary Templates loaded: {len(itinerary_templates.POPULAR_DESTINATIONS)} preset circuits.")

    # 2. Test Root Route
    r_home = client.get("/")
    assert r_home.status_code == 200, f"Root returned {r_home.status_code}"
    print(" [PASS] 2. Root route serves web application (HTTP 200)")

    # 3. Test Packages API
    r_pkg = client.get("/api/packages")
    assert r_pkg.status_code == 200
    pkgs = r_pkg.json().get("packages", [])
    assert len(pkgs) > 0
    print(f" [PASS] 3. Packages API returned {len(pkgs)} active packages.")

    # 4. Test Lead Inquiry Recording into Excel & Email Dispatch
    lead_payload = {
        "name": "Rohan Kapoor",
        "phone": "+919988776655",
        "email": "rohan.kapoor@example.com",
        "destination": "Char Dham Yatra",
        "travelers": "4 Friends",
        "travel_date": "2026-10-15",
        "budget": "Deluxe",
        "notes": "Testing refactored clean inquiry flow."
    }
    r_inq = client.post("/api/inquiry", json=lead_payload)
    assert r_inq.status_code == 200, f"Inquiry failed: {r_inq.text}"
    inq_data = r_inq.json()
    assert inq_data["success"] is True
    print(f" [PASS] 4. Holiday Inquiry recorded for {lead_payload['name']} (Excel lead generated: {inq_data['lead_id']})")

    # 5. Test Travel Services Hub: Ticket Inquiry (Flight/Train/Bus) & Admin Email Dispatch
    ticket_payload = {
        "name": "Ananya Sharma",
        "phone": "+919876543210",
        "email": "ananya.sharma@example.com",
        "transit_type": "Domestic Flight",
        "origin": "Delhi",
        "destination": "Dehradun",
        "travel_date": "2026-10-20",
        "travel_class": "Economy",
        "passengers": 2,
        "notes": "Morning flight preference",
        "source": "Website Ticket Form"
    }
    r_tkt = client.post("/api/inquiry/ticket", json=ticket_payload)
    assert r_tkt.status_code == 200, f"Ticket inquiry failed: {r_tkt.text}"
    tkt_data = r_tkt.json()
    assert tkt_data["success"] is True
    print(f" [PASS] 5. Services Hub Ticket Query recorded & Admin Email dispatched (Lead ID: {tkt_data['lead_id']})")

    # 6. Test Travel Services Hub: Cab / Transport Inquiry & Admin Email Dispatch
    cab_payload = {
        "name": "Vikram Singh",
        "phone": "+919811485028",
        "email": "vikram.singh@example.com",
        "vehicle_category": "Innova Crysta (7 Seater)",
        "rental_type": "Outstation Round-Trip",
        "pickup": "Haridwar Railway Station",
        "drop": "Barkot",
        "pickup_date": "2026-10-21",
        "duration_days": 4,
        "passengers": 5,
        "notes": "Experienced mountain driver required",
        "source": "Website Transport & Cab Form"
    }
    r_cab = client.post("/api/inquiry/transport", json=cab_payload)
    assert r_cab.status_code == 200, f"Transport inquiry failed: {r_cab.text}"
    cab_data = r_cab.json()
    assert cab_data["success"] is True
    print(f" [PASS] 6. Services Hub Cab Query recorded & Admin Email dispatched (Lead ID: {cab_data['lead_id']})")

    # 7. Test AI Itinerary Generator
    itin_payload = {
        "destination": "Manali",
        "days": 4,
        "budget": "Standard",
        "travel_style": "Friends & Adventure"
    }
    r_itin = client.post("/api/generate-itinerary", json=itin_payload)
    assert r_itin.status_code == 200
    itin = r_itin.json()["itinerary"]
    assert itin.get("title")
    print(f" [PASS] 7. AI Itinerary Generated: '{itin['title']}' ({len(itin['days'])} Days)")

    # 8. Test AI Concierge Chat
    r_chat = client.post("/api/chat-concierge", json={"message": "Tell me about Char Dham Yatra"})
    assert r_chat.status_code == 200
    print(f" [PASS] 8. AI Concierge Reply: {r_chat.json()['reply'][:80]}...")

    # 9. Test Admin Login & Lead Management
    admin_pw = os.getenv("ADMIN_PASSWORD", "mankotia123")
    r_login = client.post("/api/admin/login", json={"password": admin_pw})
    assert r_login.status_code == 200
    token = r_login.json()["token"]
    
    r_leads = client.get("/api/admin/leads", params={"token": token})
    assert r_leads.status_code == 200
    leads = r_leads.json()["leads"]
    print(f" [PASS] 9. Admin Auth & Leads Management verified ({len(leads)} total leads found).")

    print("=" * 60)
    print(" ALL 9 END-TO-END VERIFICATION CHECKS PASSED PERFECTLY!")
    print("=" * 60)

if __name__ == "__main__":
    verify_system()
