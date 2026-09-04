import os
import re
import json
import urllib.parse
import requests
from typing import Optional, Dict
from dotenv import load_dotenv

from data_store import AGENCY_NAME, AGENCY_PHONE, AGENCY_WHATSAPP, PACKAGES
from itinerary_templates import POPULAR_DESTINATIONS
from langchain_service import generate_langchain_itinerary, generate_langchain_itinerary_stream

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()

def resolve_location_from_pincode_or_text(text: str) -> str:
    """If text contains a 6-digit Indian PIN code, resolves Area, District and State."""
    if not text:
        return ""
    pincode_match = re.search(r"\b([1-9][0-9]{5})\b", text)
    if pincode_match:
        pincode = pincode_match.group(1)
        try:
            resp = requests.get(f"https://api.postalpincode.in/pincode/{pincode}", headers={"User-Agent": "Mozilla/5.0"}, timeout=3)
            if resp.status_code == 200:
                data = resp.json()
                if data and data[0].get("Status") == "Success" and data[0].get("PostOffice"):
                    po = data[0]["PostOffice"][0]
                    resolved_label = f"{po.get('Name', '')}, {po.get('District', '')} ({pincode}), {po.get('State', '')}"
                    cleaned_text = re.sub(r"\b" + pincode + r"\b", "", text).strip(" ,-")
                    if cleaned_text and cleaned_text.lower() not in resolved_label.lower():
                        return f"{cleaned_text} ({resolved_label})"
                    return resolved_label
        except Exception:
            pass
    return text


DEFAULT_TRANSIT_HUBS: Dict[str, Dict] = {
    "chardham": {
        "pickup": "Haridwar Railway Station / Dehradun Airport",
        "drop": "Haridwar Railway Station / Dehradun Airport",
        "waypoints": ["Barkot", "Uttarkashi", "Guptkashi", "Kedarnath", "Badrinath", "Rudraprayag", "Rishikesh"],
        "default_title": "Sacred Char Dham Yatra: Yamunotri, Gangotri, Kedarnath & Badrinath"
    },
    "dodham": {
        "pickup": "Haridwar Railway Station / Dehradun Airport",
        "drop": "Haridwar Railway Station / Dehradun Airport",
        "waypoints": ["Guptkashi", "Kedarnath", "Pipalkoti", "Badrinath", "Rudraprayag", "Rishikesh"],
        "default_title": "Divine Do Dham Yatra: Kedarnath & Badrinath Ji"
    },
    "kedarnath": {
        "pickup": "Haridwar Railway Station / Dehradun Jolly Grant Airport",
        "drop": "Haridwar Railway Station / Dehradun Jolly Grant Airport",
        "waypoints": ["Guptkashi", "Phata Helipad", "Kedarnath Dham", "Rishikesh"],
        "default_title": "Kedarnath Dham Helicopter & VIP Express"
    },
    "uttarakhand": {
        "pickup": "Delhi IGI Airport / Kathgodam Railway Station / Dehradun Airport",
        "drop": "Dehradun Airport / Haridwar / Delhi",
        "waypoints": ["Nainital", "Jim Corbett National Park", "Mussoorie", "Rishikesh"],
        "default_title": "Jewels of Uttarakhand: Nainital, Corbett, Mussoorie & Rishikesh"
    },
    "auli": {
        "pickup": "Haridwar / Rishikesh / Dehradun Jolly Grant Airport",
        "drop": "Rishikesh / Haridwar / Dehradun Airport",
        "waypoints": ["Chopta", "Tungnath", "Joshimath", "Auli"],
        "default_title": "Auli Ski Paradise & Chopta-Tungnath Himalayan Trek"
    },
    "manali": {
        "pickup": "Chandigarh Airport / Railway Station (or Delhi IGI Airport)",
        "drop": "Chandigarh / Delhi IGI Airport",
        "waypoints": ["Mandi", "Kullu", "Manali", "Solang Valley", "Atal Tunnel", "Sissu"],
        "default_title": "Enchanting Manali, Solang Valley & Atal Tunnel Adventure"
    },
    "kashmir": {
        "pickup": "Srinagar International Airport (Sheikh ul-Alam)",
        "drop": "Srinagar International Airport",
        "waypoints": ["Dal Lake Srinagar", "Gulmarg Gondola", "Pahalgam", "Betaab Valley"],
        "default_title": "Paradise on Earth: Srinagar, Gulmarg & Pahalgam"
    },
    "rajasthan": {
        "pickup": "Jaipur International Airport / Railway Station",
        "drop": "Udaipur Maharana Pratap Airport / Jaipur",
        "waypoints": ["Jaipur Pink City", "Ajmer Pushkar", "Jodhpur Blue City", "Udaipur Lake City"],
        "default_title": "Royal Heritage of Rajasthan: Jaipur, Jodhpur & Udaipur"
    },
    "delhi": {
        "pickup": "Delhi IGI Airport (DEL) / New Delhi Railway Station (NDLS)",
        "drop": "Delhi IGI Airport / New Delhi Railway Station",
        "waypoints": ["Red Fort Old Delhi", "Qutub Minar", "Humayun's Tomb", "India Gate", "Akshardham Temple"],
        "default_title": "Delhi Capital City Heritage & Sightseeing Tour"
    },
    "agra": {
        "pickup": "Delhi NCR / Agra Cantt Railway Station (AGC)",
        "drop": "Delhi NCR / Agra Cantt Railway Station",
        "waypoints": ["Taj Mahal Agra", "UNESCO Agra Fort", "Mehtab Bagh", "Fatehpur Sikri"],
        "default_title": "Agra Mughal Marvels & Taj Mahal Heritage Tour"
    },
    "jaipur": {
        "pickup": "Jaipur International Airport (JAI) / Jaipur Junction / Delhi NCR",
        "drop": "Jaipur International Airport / Jaipur Junction / Delhi NCR",
        "waypoints": ["Amber Fort Jaipur", "Jal Mahal", "City Palace", "Hawa Mahal", "Nahargarh Fort", "Chokhi Dhani"],
        "default_title": "Jaipur Royal Pink City & Forts Experience"
    },
    "mathura": {
        "pickup": "Delhi NCR / Mathura Junction Railway Station (MTJ)",
        "drop": "Delhi NCR / Mathura Junction Railway Station",
        "waypoints": ["Shri Krishna Janmabhoomi Mathura", "Banke Bihari Ji Vrindavan", "Prem Mandir", "Gokul Raman Reti", "Barsana"],
        "default_title": "Sacred Mathura & Vrindavan Dham Yatra (Braj Bhoomi Darshan)"
    },
    "goldentriangle": {
        "pickup": "New Delhi IGI Airport / New Delhi Railway Station",
        "drop": "New Delhi IGI Airport / Jaipur Airport",
        "waypoints": ["Qutub Minar Delhi", "Taj Mahal Agra", "Agra Fort", "Fatehpur Sikri", "Amber Fort Jaipur", "City Palace Jaipur"],
        "default_title": "Golden Triangle Classic: Delhi, Agra & Jaipur Grand Tour"
    },
    "goa": {
        "pickup": "Goa Dabolim Airport (GOI) / Manohar International Airport Mopa (GOX)",
        "drop": "Goa Dabolim Airport / Mopa Airport / Madgaon Station",
        "waypoints": ["Calangute North Goa", "Aguada Fort", "Panaji Mandovi River", "Colva South Goa"],
        "default_title": "Tropical Goa Beach, Water Sports & Cruise Holiday"
    },
    "kerala": {
        "pickup": "Cochin International Airport (COK) / Ernakulam Junction",
        "drop": "Cochin International Airport (COK) / Trivandrum Airport",
        "waypoints": ["Cochin", "Munnar Tea Gardens", "Thekkady Periyar", "Alleppey Backwaters"],
        "default_title": "God's Own Country: Munnar, Thekkady & Alleppey Houseboat"
    }
}


def resolve_transit_and_maps(destination: str, pickup_location: Optional[str] = None, drop_location: Optional[str] = None, days: int = 4) -> dict:
    dest_lower = (destination or "").lower().strip()
    dest_normalized = dest_lower.replace(" ", "").replace("-", "")
    matched_hub = None
    for key, data in DEFAULT_TRANSIT_HUBS.items():
        if key in dest_lower or key.replace(" ", "") in dest_normalized or any(wp.lower() in dest_lower for wp in data.get("waypoints", [])):
            matched_hub = data
            break
            
    resolved_pickup = resolve_location_from_pincode_or_text(pickup_location or "") or (matched_hub["pickup"] if matched_hub else f"{destination.title()} Airport / Station")
    resolved_drop = resolve_location_from_pincode_or_text(drop_location or "") or (matched_hub["drop"] if matched_hub else resolved_pickup)
    waypoints_list = matched_hub["waypoints"] if matched_hub else [destination.title()]
    
    encoded_origin = urllib.parse.quote_plus(resolved_pickup)
    encoded_dest = urllib.parse.quote_plus(resolved_drop)
    encoded_waypoints = urllib.parse.quote_plus("|".join(waypoints_list[:6]))
    
    return {
        "pickup_location": resolved_pickup,
        "drop_location": resolved_drop,
        "pickup_map_url": f"https://www.google.com/maps/search/?api=1&query={encoded_origin}",
        "drop_map_url": f"https://www.google.com/maps/search/?api=1&query={encoded_dest}",
        "google_maps_route_url": f"https://www.google.com/maps/dir/?api=1&origin={encoded_origin}&destination={encoded_dest}&waypoints={encoded_waypoints}",
        "route_summary": f"{resolved_pickup} -> {' -> '.join(waypoints_list[:3])} -> {resolved_drop}",
        "waypoints": waypoints_list
    }


def generate_ai_itinerary(destination: str, days: int = 4, budget: str = "Standard", travel_style: str = "Family", travelers: str = "2 Adults", special_requests: str = "", pickup_location: Optional[str] = None, drop_location: Optional[str] = None) -> dict:
    transit_info = resolve_transit_and_maps(destination, pickup_location, drop_location, days)
    dest_key = (destination or "").lower().strip()
    
    api_key = os.getenv("GEMINI_API_KEY", "").strip()
    if api_key:
        try:
            # Build agency context from predefined packages
            agency_context = ""
            matched_packages = []
            for p in PACKAGES:
                search_text = (p['title'] + " " + p['destination'] + " " + p['category']).lower()
                if dest_key in search_text or any(word in search_text for word in dest_key.split() if len(word) > 3):
                    matched_packages.append(p)
                    
            if matched_packages:
                agency_context = "AGENCY'S PREFERRED DATA FOR THIS DESTINATION:\n"
                for p in matched_packages[:2]:
                    agency_context += f"Package: {p['title']}\nRoute: {p['destination']}\nHighlights: {', '.join(p['highlights'])}\n\n"
                    
            data = generate_langchain_itinerary(
                api_key=api_key,
                destination=destination,
                days=days,
                budget=budget,
                travel_style=travel_style,
                travelers=travelers,
                special_requests=special_requests,
                pickup_location=transit_info['pickup_location'],
                drop_location=transit_info['drop_location'],
                waypoints=transit_info['waypoints'],
                agency_context=agency_context
            )
            data["pickup_location"] = transit_info["pickup_location"]
            data["drop_location"] = transit_info["drop_location"]
            data["google_maps_route_url"] = transit_info["google_maps_route_url"]
            data["route_summary"] = transit_info["route_summary"]
            return data
        except Exception as e:
            print(f"LangChain API itinerary call failed: {e}")

    # Fallback preset template matching
    match_key = None
    if any(k in dest_key for k in ["char dham", "chardham", "yamunotri", "gangotri"]):
        match_key = "chardham"
    elif any(k in dest_key for k in ["do dham", "dodham", "kedar badri"]):
        match_key = "dodham"
    elif any(k in dest_key for k in ["shimla", "manali", "kullu", "chandigarh", "himachal"]):
        match_key = "shimla_manali"

    if match_key and match_key in POPULAR_DESTINATIONS:
        data_copy = json.loads(json.dumps(POPULAR_DESTINATIONS[match_key]))
        if len(data_copy["days"]) > days:
            data_copy["days"] = data_copy["days"][:days]
            data_copy["duration"] = f"{days} Days / {max(1, days-1)} Nights"
        data_copy["pickup_location"] = transit_info["pickup_location"]
        data_copy["drop_location"] = transit_info["drop_location"]
        data_copy["google_maps_route_url"] = transit_info["google_maps_route_url"]
        data_copy["route_summary"] = transit_info["route_summary"]
        return data_copy

    # Dynamic fallback generator
    dest_name = destination.title() if destination else "Incredible Destination"
    generated_days = []
    for i in range(1, days + 1):
        if i == 1:
            theme = f"Pickup from {transit_info['pickup_location']} & Scenic Drive to {dest_name}"
            morning = f"Chauffeur meets you at {transit_info['pickup_location']}. Commence scenic journey to {dest_name}."
            afternoon = f"En-route lunch stop. Arrive and check-in at hotel in {dest_name}."
            evening = f"Freshen up and enjoy an evening stroll around local markets."
            stay = f"Deluxe 4-Star Resort in {dest_name}"
        elif i == days:
            theme = f"Farewell Departure & Drop-off at {transit_info['drop_location']}"
            morning = f"Hearty breakfast in {dest_name}. Complete checkout formalities."
            afternoon = f"Begin return road journey with scenic photo stops."
            evening = f"Chauffeur drops you off at {transit_info['drop_location']}."
            stay = f"Drop at {transit_info['drop_location']} / Onward Journey"
        else:
            activities = ["Cultural Heritage Tour", "Nature Walk & Viewpoints", "Local Markets & Shopping", "Temple & Monuments Visit", "Adventure & Leisure Day"]
            activity = activities[(i - 2) % len(activities)]
            theme = f"Day {i}: {activity} in {dest_name}"
            morning = f"Start Day {i} with a delightful breakfast. Explore popular local spots for {activity.lower()}."
            afternoon = f"Enjoy lunch at a renowned local restaurant. Continue sightseeing around {dest_name}."
            evening = f"Witness a breathtaking sunset at a premier viewpoint or relax at the hotel."
            stay = f"Deluxe 4-Star Resort in {dest_name}"

        generated_days.append({
            "day_number": i, "theme": theme, "morning": morning, "afternoon": afternoon,
            "evening": evening, "meal_recommendation": f"Signature authentic delicacies of {dest_name}.",
            "stay_suggestion": stay, "pro_tip": f"Check Google Maps live traffic before starting Day {i} excursion."
        })

    return {
        "title": f"Divine & Scenic {dest_name} Getaway",
        "destination": dest_name,
        "duration": f"{days} Days / {max(1, days-1)} Nights",
        "pickup_location": transit_info["pickup_location"],
        "drop_location": transit_info["drop_location"],
        "google_maps_route_url": transit_info["google_maps_route_url"],
        "route_summary": transit_info["route_summary"],
        "estimated_cost_inr": "Price On Request",
        "best_season": "Year-round (Best: Spring, Summer & Autumn)",
        "packing_essentials": ["Comfortable walking shoes", "Mobile charger & power bank", "Gov ID cards & travel vouchers"],
        "highlights": [f"Seamless pickup from {transit_info['pickup_location']} and drop at {transit_info['drop_location']}", f"Curated private tour of {dest_name}", "Handpicked accommodation"],
        "days": generated_days
    }


async def generate_ai_itinerary_stream(destination: str, days: int = 4, budget: str = "Standard", travel_style: str = "Family", travelers: str = "2 Adults", special_requests: str = "", pickup_location: Optional[str] = None, drop_location: Optional[str] = None):
    transit_info = resolve_transit_and_maps(destination, pickup_location, drop_location, days)
    dest_key = (destination or "").lower().strip()
    
    api_key = os.getenv("GEMINI_API_KEY", "").strip()
    if not api_key:
        # Fallback if no API key, yield a static JSON response for the frontend to parse
        fallback_data = generate_ai_itinerary(destination, days, budget, travel_style, travelers, special_requests, pickup_location, drop_location)
        yield json.dumps(fallback_data)
        return

    # Build agency context from predefined packages
    agency_context = ""
    matched_packages = []
    for p in PACKAGES:
        search_text = (p['title'] + " " + p['destination'] + " " + p['category']).lower()
        if dest_key in search_text or any(word in search_text for word in dest_key.split() if len(word) > 3):
            matched_packages.append(p)
            
    if matched_packages:
        agency_context = "AGENCY'S PREFERRED DATA FOR THIS DESTINATION:\n"
        for p in matched_packages[:2]:
            agency_context += f"Package: {p['title']}\nRoute: {p['destination']}\nHighlights: {', '.join(p['highlights'])}\n\n"
            
    try:
        async for chunk in generate_langchain_itinerary_stream(
            api_key=api_key,
            destination=destination,
            days=days,
            budget=budget,
            travel_style=travel_style,
            travelers=travelers,
            special_requests=special_requests,
            pickup_location=transit_info['pickup_location'],
            drop_location=transit_info['drop_location'],
            waypoints=transit_info['waypoints'],
            agency_context=agency_context
        ):
            yield chunk
    except Exception as e:
        print(f"LangChain stream failed: {e}")
        # Fallback if API call fails
        fallback_data = generate_ai_itinerary(destination, days, budget, travel_style, travelers, special_requests, pickup_location, drop_location)
        yield json.dumps(fallback_data)


CONCIERGE_TOPICS = [
    (["golden triangle", "delhi agra jaipur"], f"🏛️ **Golden Triangle Specials:** We offer Golden Triangle Classic (6D/5N) and Delhi-Mathura-Agra (4D/3N) covering Taj Mahal, Agra Fort, Qutub Minar, and Amber Fort. Connect on WhatsApp (+{AGENCY_WHATSAPP}) or call {AGENCY_PHONE} for custom price quotes!"),
    (["agra", "taj mahal", "fatehpur sikri"], f"🕌 **Agra Taj Express:** Same Day Agra Taj Express & Mughal Marvels 2D/1N with Taj Mahal sunrise, Agra Fort, Mehtab Bagh, and approved guide. WhatsApp (+{AGENCY_WHATSAPP}) or call {AGENCY_PHONE}!"),
    (["delhi", "akshardham", "qutub minar"], f"🏛️ **Delhi Capital Sightseeing:** Same Day Delhi Express and 2D/1N Capital Heritage covering Red Fort, Chandni Chowk rickshaw ride, Qutub Minar, and Akshardham. WhatsApp (+{AGENCY_WHATSAPP})!"),
    (["mathura", "vrindavan", "banke bihari", "prem mandir"], f"🦚 **Sacred Mathura & Vrindavan:** Same Day Braj Darshan and 3D/2N Complete Braj Dham covering Krishna Janmasthan, Banke Bihari Ji, Prem Mandir Light Show, and Gokul. Call {AGENCY_PHONE}!"),
    (["jaipur", "amber fort", "chokhi dhani"], f"👑 **Royal Jaipur Tours:** Same Day Jaipur, Weekend Heritage 2D/1N, and Grand Forts 3D/2N with Amber Fort Jeep ascent and Chokhi Dhani dinner. Call {AGENCY_PHONE}!"),
    (["char dham", "chardham", "yamunotri", "gangotri"], f"🕉️ **Char Dham Yatra 2026:** All-inclusive 10N/11D package covering Yamunotri, Gangotri, Kedarnath, and Badrinath with pickup/drop from Haridwar/Dehradun. WhatsApp (+{AGENCY_WHATSAPP}) or call {AGENCY_PHONE} for dates and best quote!"),
    (["do dham", "dodham", "kedar badri"], f"🙏 **Do Dham Yatra (Kedarnath & Badrinath Ji):** Popular 5N/6D spiritual circuit with optional Helicopter shuttle at Phata/Sirsi. Message on WhatsApp (+{AGENCY_WHATSAPP})!"),
    (["helicopter", "heli", "flight to kedarnath"], f"🚁 **Kedarnath Helicopter Express:** Same-day / next-day heli-shuttle from Phata/Sirsi directly to Kedarnath Helipad with VIP priority darshan. Contact us at {AGENCY_PHONE} or WhatsApp (+{AGENCY_WHATSAPP}) to secure tickets."),
    (["uttarakhand", "nainital", "mussoorie", "corbett", "auli"], f"🏔️ **Uttarakhand Specials:** Nainital Lakes, Corbett Safari, Mussoorie, Auli Skiing, and Chopta Trek. WhatsApp (+{AGENCY_WHATSAPP}) for family custom quotes!"),
    (["himachal", "manali", "shimla"], f"🏔️ **Himachal Escapes:** Packages covering Manali, Solang Valley, Atal Tunnel, Rohtang Pass, and Shimla. Connect on WhatsApp (+{AGENCY_WHATSAPP})!"),
    (["kashmir", "gulmarg", "pahalgam", "srinagar"], f"🌸 **Kashmir Heaven on Earth:** Airport transfers, Dal Lake houseboats, Gulmarg Gondola rides, and Pahalgam. Call {AGENCY_PHONE} or WhatsApp (+{AGENCY_WHATSAPP})."),
    (["pickup", "drop", "map", "route"], f"🗺️ **Pickup & Drop Navigation:** Dedicated chauffeur transfers from your chosen airport, railway station, or hotel with real-time Google Maps route guidance!"),
    (["phone", "call", "contact"], f"📞 Call our travel planners directly at **{AGENCY_PHONE}** for instant booking assistance!"),
    (["whatsapp", "chat"], f"💬 We are available 24/7 on WhatsApp! Message us directly at **+{AGENCY_WHATSAPP}** for instant quotes."),
    (["book", "price", "cost", "quote"], f"✨ Fill out our quick **Inquiry Form** on this page or message our team on WhatsApp at **+{AGENCY_WHATSAPP}** for an exact quote!")
]


def chat_travel_concierge(message: str, history: Optional[list] = None) -> str:
    api_key = os.getenv("GEMINI_API_KEY", "").strip()
    if api_key:
        try:
            from google import genai
            client = genai.Client(api_key=api_key)
            prompt = f"System: You are 'Aria', AI Travel Concierge for {AGENCY_NAME} (+{AGENCY_WHATSAPP}, {AGENCY_PHONE}). Be polite and helpful.\nUser Query: {message}"
            response = client.models.generate_content(model='gemini-3.6-flash', contents=prompt)
            return response.text.strip()
        except Exception:
            pass

    msg = message.lower()
    for keywords, reply_text in CONCIERGE_TOPICS:
        if any(kw in msg for kw in keywords):
            return reply_text

    return f"🙏 Namaste! I'm Aria, your AI Travel Concierge at **{AGENCY_NAME}**. We specialize in Sacred Char Dham Yatra, Mathura-Vrindavan Dham, Golden Triangle, Uttarakhand, Himachal, Kashmir, Rajasthan, Goa, and Kerala! How may I assist your travel plans today? Call **{AGENCY_PHONE}** or WhatsApp (+{AGENCY_WHATSAPP})."
