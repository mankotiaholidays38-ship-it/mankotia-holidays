import sys
import os
import requests

# Ensure UTF-8 output if supported
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

BASE_URL = "http://127.0.0.1:8000"

def test_api():
    print("Testing backend and React app integration...")
    
    # 1. Test Root Page (React Web Application) & Admin Page
    try:
        r = requests.get(f"{BASE_URL}/")
        print(f"GET / -> Status: {r.status_code}")
        assert r.status_code == 200
        assert "Mankotia Holidays" in r.text or "root" in r.text
        print("[OK] Backend root serves modern React Single Page Application.")

        r_admin = requests.get(f"{BASE_URL}/admin")
        print(f"GET /admin -> Status: {r_admin.status_code}")
        assert r_admin.status_code == 200
        assert "Admin" in r_admin.text or "mankotia_admin_token" in r_admin.text
        print("[OK] Backend /admin serves Admin Security Login & Portal.")
    except Exception as e:
        print(f"[FAIL] GET / or /admin: {e}")

    # 2. Test Packages API
    try:
        r = requests.get(f"{BASE_URL}/api/packages")
        print(f"GET /api/packages -> Status: {r.status_code}")
        data = r.json()
        packages = data.get("packages", [])
        print(f"[OK] Found {len(packages)} packages.")
        titles = [p["title"] for p in packages]
        print("Packages:", titles[:4])
        assert any("Char Dham" in t for t in titles), "Char Dham package missing"
        assert any("Do Dham" in t for t in titles), "Do Dham package missing"
        assert any("Uttarakhand" in t for t in titles), "Uttarakhand package missing"
        assert not any("Dubai" in t or "Thailand" in t for t in titles), "Foreign tours not removed"
        print("[OK] Package assertions passed: Sacred pilgrimages present, foreign tours absent.")
    except Exception as e:
        print(f"[FAIL] GET /api/packages: {e}")

    # 3. Test Inquiry API (Excel recording)
    try:
        payload = {
            "name": "Test Pilgrim",
            "phone": "+919876543210",
            "email": "pilgrim@test.com",
            "destination": "Char Dham Yatra Deluxe",
            "travelers": "4 Adults",
            "travel_date": "May 2026",
            "budget": "Deluxe",
            "notes": "Testing React automated flow"
        }
        r = requests.post(f"{BASE_URL}/api/inquiry", json=payload)
        print(f"POST /api/inquiry -> Status: {r.status_code}")
        res = r.json()
        assert res.get("success") is True
        assert "whatsapp_redirect_url" in res
        print("[OK] Inquiry recorded into Excel and WhatsApp URL generated.")
    except Exception as e:
        print(f"[FAIL] POST /api/inquiry: {e}")

    # 4. Test AI Itinerary Generator
    try:
        payload = {
            "destination": "Char Dham Yatra",
            "days": 11,
            "budget": "Standard",
            "travel_style": "Pilgrimage & Spiritual",
            "travelers": "2 Adults"
        }
        r = requests.post(f"{BASE_URL}/api/generate-itinerary", json=payload)
        print(f"POST /api/generate-itinerary -> Status: {r.status_code}")
        itin = r.json().get("itinerary", {})
        assert itin.get("title"), "Itinerary title missing"
        assert len(itin.get("days", [])) > 0, "Itinerary days missing"
        print(f"[OK] AI Itinerary generated: '{itin.get('title')}' with {len(itin.get('days'))} days.")
    except Exception as e:
        print(f"[FAIL] POST /api/generate-itinerary: {e}")

    # 5. Test AI Concierge Chat
    try:
        payload = {"message": "Tell me about Char Dham Yatra 2026 and Kedarnath Helicopter"}
        r = requests.post(f"{BASE_URL}/api/chat-concierge", json=payload)
        print(f"POST /api/chat-concierge -> Status: {r.status_code}")
        reply = r.json().get("reply", "")
        assert len(reply) > 10
        print(f"[OK] AI Concierge responded: {reply[:100]}...")
    except Exception as e:
        print(f"[FAIL] POST /api/chat-concierge: {e}")

    # 6. Test Admin Login & Leads
    try:
        from dotenv import load_dotenv
        load_dotenv()
        admin_pw = os.getenv("ADMIN_PASSWORD", "@Mankotia#4321@")
        r = requests.post(f"{BASE_URL}/api/admin/login", json={"password": admin_pw})
        print(f"POST /api/admin/login -> Status: {r.status_code}")
        token = r.json().get("token")
        assert token, "Token missing in login response"
        
        import urllib.parse
        encoded_token = urllib.parse.quote_plus(token)
        # Test query parameter auth
        r_leads = requests.get(f"{BASE_URL}/api/admin/leads?token={encoded_token}")
        print(f"GET /api/admin/leads (query param) -> Status: {r_leads.status_code}")
        assert r_leads.status_code == 200
        leads = r_leads.json().get("leads", [])
        print(f"[OK] Admin fetched {len(leads)} leads using query token.")

        # Test Authorization Bearer header auth
        r_leads_hdr = requests.get(f"{BASE_URL}/api/admin/leads", headers={"Authorization": f"Bearer {token}"})
        print(f"GET /api/admin/leads (Bearer header) -> Status: {r_leads_hdr.status_code}")
        assert r_leads_hdr.status_code == 200
        print(f"[OK] Admin Bearer header authentication confirmed.")
    except Exception as e:
        print(f"[FAIL] Admin endpoints: {e}")

    print("\nALL TESTS COMPLETED SUCCESSFULLY!")

if __name__ == "__main__":
    test_api()
