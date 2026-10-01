import os
import re
import json
import urllib.parse
import requests
from typing import Optional, Dict
from dotenv import load_dotenv

from data_store import (
    AGENCY_NAME,
    AGENCY_PHONE,
    AGENCY_WHATSAPP,
    AGENCY_EMAIL,
    AGENCY_OFFICES,
    AGENCY_PHONES,
    PACKAGES
)
from itinerary_templates import POPULAR_DESTINATIONS
from gemini_service import generate_gemini_itinerary, generate_gemini_itinerary_stream
from maps_service import maps_service

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()

def autocorrect_location_name(location: str) -> str:
    """Uses Gemini to identify and correct spelling mistakes in a location name."""
    if not location or not location.strip():
        return location
        
    api_key = os.getenv("GEMINI_API_KEY", "").strip()
    if not api_key:
        return location
        
    try:
        from google import genai
        client = genai.Client(api_key=api_key, http_options={'base_url': 'https://generativelanguage.googleapis.com'})
        
        prompt = (
            f"You are a location validator. A user entered the following location: '{location}'.\n"
            "If there are any spelling mistakes (e.g. 'Himalchal Predash'), correct them to the standard valid spelling (e.g. 'Himachal Pradesh').\n"
            "Return ONLY the corrected location name, and absolutely nothing else. Do not add any punctuation or explanation. "
            "If it is already correct, return it exactly as is."
        )
        
        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=prompt,
        )
        corrected = response.text.strip().strip("'\"`")
        # Clean up any potential markdown formatting the model might mistakenly add
        if corrected.startswith('**') and corrected.endswith('**'):
            corrected = corrected[2:-2].strip().strip("'\"`")
            
        return corrected if corrected else location.strip().strip("'\"`")
    except Exception:
        return location.strip().strip("'\"`")

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
            
    raw_pickup = resolve_location_from_pincode_or_text(pickup_location or "") or (matched_hub["pickup"] if matched_hub else f"{destination.title()} Airport / Station")
    raw_drop = resolve_location_from_pincode_or_text(drop_location or "") or (matched_hub["drop"] if matched_hub else raw_pickup)
    resolved_pickup = raw_pickup.strip().strip("'\"`")
    resolved_drop = raw_drop.strip().strip("'\"`")
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


def _generate_dynamic_route(data: dict, transit_info: dict) -> tuple:
    import urllib.parse
    actual_waypoints = []
    for d in data.get("days", []):
        bl = d.get("base_location") or d.get("stay_suggestion")
        if bl and bl not in actual_waypoints:
            actual_waypoints.append(bl)
            
    dyn_origin = transit_info.get("pickup_location", "")
    dyn_dest = transit_info.get("drop_location", "")
    
    filtered_wps = [wp for wp in actual_waypoints if wp.lower() not in dyn_origin.lower() and wp.lower() not in dyn_dest.lower()]
    
    encoded_origin = urllib.parse.quote_plus(dyn_origin)
    encoded_dest = urllib.parse.quote_plus(dyn_dest)
    encoded_wps = urllib.parse.quote_plus("|".join(filtered_wps[:8]))
    
    dyn_url = f"https://www.google.com/maps/dir/?api=1&origin={encoded_origin}&destination={encoded_dest}"
    if encoded_wps:
        dyn_url += f"&waypoints={encoded_wps}"
        
    summary_list = [dyn_origin] + filtered_wps[:4] + [dyn_dest]
    route_summary = " -> ".join([s for s in summary_list if s])
    return dyn_url, route_summary


def extend_destination_for_extra_days(destination: str, days: int) -> tuple[str, str]:
    """Returns (extended_destination_name, extension_notes)."""
    if not destination or not destination.strip():
        return destination, ""
        
    dest_lower = destination.lower()
    primary_dest = destination.split('(')[0].strip().lower()
    
    # If the destination is already a multi-destination package/circuit, do not extend or duplicate
    is_multi_circuit = (
        '•' in destination or 
        ',' in destination or 
        ' & ' in destination or
        'complete' in primary_dest or
        'circuit' in primary_dest or
        'tour' in primary_dest or
        'yatra' in primary_dest or
        'package' in primary_dest or
        'rajasthan' in primary_dest or
        'char dham' in primary_dest or
        'chardham' in primary_dest or
        'golden triangle' in primary_dest or
        'uttarakhand' in primary_dest or
        'himachal' in primary_dest or
        'kashmir' in primary_dest or
        'kerala' in primary_dest
    )
    if is_multi_circuit:
        return destination, ""

    thresholds = [
        {"keys": ['agra', 'taj mahal', 'fatehpur'], "maxDays": 2, "suggest": 'the Golden Triangle (Delhi, Jaipur)'},
        {"keys": ['jaipur', 'pink city'], "maxDays": 3, "suggest": 'a Complete Rajasthan Tour (Jodhpur, Udaipur, Jaisalmer)'},
        {"keys": ['delhi', 'new delhi'], "maxDays": 3, "suggest": 'the Golden Triangle (Agra, Jaipur)'},
        {"keys": ['kedarnath', 'badrinath', 'do dham', 'dodham'], "maxDays": 6, "suggest": 'the complete Char Dham Yatra'},
        {"keys": ['mathura', 'vrindavan'], "maxDays": 3, "suggest": 'Agra and the Taj Mahal'},
        {"keys": ['goa'], "maxDays": 5, "suggest": 'both North and South Goa thoroughly'},
        {"keys": ['shimla', 'manali', 'kullu'], "maxDays": 6, "suggest": 'Dharamshala or Spiti Valley'},
        {"keys": ['golden triangle'], "maxDays": 6, "suggest": 'more of Rajasthan or Varanasi'},
    ]
    
    for rule in thresholds:
        if any(k in primary_dest for k in rule["keys"]):
            if any(s in dest_lower for s in ['rajasthan', 'golden triangle', 'char dham', 'chardham']):
                return destination, ""
            if days > rule["maxDays"]:
                return (f"{destination} & {rule['suggest']}", 
                        f"CRITICAL INSTRUCTION: The user originally requested {destination}, but selected {days} days, which is too long for just that location. You MUST extend the itinerary to include {rule['suggest']} to logically fill the {days} days.")
            return destination, ""
            
    if days > 8:
        return (f"{destination} & Surrounding Regions", 
                f"CRITICAL INSTRUCTION: The user selected a long trip of {days} days. You MUST design a comprehensive multi-city circuit covering the best regions around {destination} to logically fill the time.")
                
    return destination, ""


def generate_ai_itinerary(destination: str, days: int = 4, budget: str = "Standard", travel_style: str = "Family", travelers: str = "2 Adults", special_requests: str = "", pickup_location: Optional[str] = None, drop_location: Optional[str] = None) -> dict:
    original_destination = destination
    extended_dest, extension_notes = extend_destination_for_extra_days(destination, days)
    if extension_notes:
        special_requests = f"{special_requests}\n\n{extension_notes}".strip()
        destination = extended_dest

    transit_info = resolve_transit_and_maps(destination, pickup_location, drop_location, days)
    dest_key = (destination or "").lower().strip()
    
    api_key = os.getenv("GEMINI_API_KEY", "").strip()
    if api_key:
        try:
            # 1. Geocode pickup & drop
            pickup_geo = maps_service.geocode_location(transit_info['pickup_location'])
            drop_geo = maps_service.geocode_location(transit_info['drop_location'])
            if pickup_geo:
                transit_info['pickup_location'] = pickup_geo['formatted_address'].strip().strip("'\"`")
            if drop_geo:
                transit_info['drop_location'] = drop_geo['formatted_address'].strip().strip("'\"`")
                
            # 2. Get candidate places/attractions near route
            candidate_places_list = maps_service.get_candidate_places(destination)
            candidate_places_str = ""
            if candidate_places_list:
                candidate_places_str = "\n".join([f"- {p['name']} ({p.get('rating', 'N/A')}⭐) - {p.get('formatted_address', '')}" for p in candidate_places_list])

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
            
            # 3. Feed structured data + user prefs -> Gemini
            raw_data = generate_gemini_itinerary(
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
                candidate_places=candidate_places_str,
                agency_context=agency_context
            )
            
            # Map strict schema back to rich format for frontend
            clean_display_dest = original_destination.strip()
            data = {
                "title": f"{days}-Day Trip to {clean_display_dest}",
                "destination": clean_display_dest,
                "duration": f"{days} Days",
                "estimated_cost_inr": "Price On Request",
                "days": []
            }
            
            total_days_in_raw = len(raw_data.get("days", []))
            clean_pickup = transit_info["pickup_location"].strip().strip("'\"`")
            clean_drop = transit_info["drop_location"].strip().strip("'\"`")
            for i, d in enumerate(raw_data.get("days", [])):
                is_first_day = (i == 0)
                is_last_day = (i == total_days_in_raw - 1)
                if is_first_day:
                    day_theme = f"Pickup from {clean_pickup}"
                elif is_last_day:
                    day_theme = "Departure"
                else:
                    raw_theme = d.get("theme") or f"Explore {d.get('base_location')}"
                    day_theme = raw_theme.strip().strip("'\"`")

                data["days"].append({
                    "day_number": d.get("day_number"),
                    "theme": day_theme,
                    "morning": d.get("activities"),
                    "afternoon": "" if is_last_day else "Continue exploring the destinations.",
                    "evening": "" if is_last_day else "Relax and explore local markets.",
                    "stay_suggestion": "" if is_last_day else d.get("overnight_stay"),
                    "waypoints_for_routing": d.get("destinations", [])
                })
            
            # Day-count enforcement
            if len(data.get("days", [])) > days:
                data["days"] = data["days"][:days]
                
            # 4. Validate/enrich with real distances -> Google Directions API
            if maps_service.is_configured():
                for idx, day in enumerate(data.get("days", [])):
                    wp = day.get("waypoints_for_routing", [])
                    if len(wp) >= 2:
                        origin = wp[0]
                        dest = wp[-1]
                        intermediate = wp[1:-1]
                        
                        # Use actual pickup on day 1 and drop on last day if missing from waypoints
                        if idx == 0 and transit_info['pickup_location'].lower() not in origin.lower():
                            origin = transit_info['pickup_location']
                            intermediate = wp[:-1]
                        if idx == len(data.get("days", [])) - 1 and transit_info['drop_location'].lower() not in dest.lower():
                            dest = transit_info['drop_location']
                            intermediate = wp[1:] if len(wp) > 1 else []

                        dist_info = maps_service.calculate_route_distances(origin, dest, intermediate)
                        if dist_info:
                            day["travel_time_info"] = f"Total driving: {dist_info['total_distance_km']} km (~{dist_info['total_duration_mins']} mins)"

            data["pickup_location"] = clean_pickup
            data["drop_location"] = clean_drop
            dyn_url, dyn_summary = _generate_dynamic_route(data, transit_info)
            data["google_maps_route_url"] = dyn_url
            data["route_summary"] = dyn_summary
            return data
        except Exception as error:
            print(f"Gemini API itinerary call failed: {error}")

    # Fallback preset template matching
    match_key = None
    if any(k in dest_key for k in ["char dham", "chardham", "yamunotri", "gangotri"]):
        match_key = "chardham"
    elif any(k in dest_key for k in ["do dham", "dodham", "kedar badri"]):
        match_key = "dodham"
    elif any(k in dest_key for k in ["kedarnath heli", "kedarnath"]):
        match_key = "kedarnath_heli"
    elif any(k in dest_key for k in ["uttarakhand", "nainital", "corbett", "mussoorie", "rishikesh"]):
        match_key = "uttarakhand"
    elif any(k in dest_key for k in ["auli", "chopta", "tungnath"]):
        match_key = "auli_chopta"
    elif any(k in dest_key for k in ["kashmir", "srinagar", "gulmarg", "pahalgam"]):
        match_key = "kashmir"
    elif any(k in dest_key for k in ["royal rajasthan", "rajasthan"]):
        match_key = "rajasthan"
    elif any(k in dest_key for k in ["golden triangle", "delhi agra jaipur"]):
        match_key = "golden_triangle"
    elif any(k in dest_key for k in ["delhi capital", "delhi"]):
        match_key = "delhi"
    elif any(k in dest_key for k in ["agra taj mahal", "agra"]):
        match_key = "agra"
    elif any(k in dest_key for k in ["jaipur pink city", "jaipur"]):
        match_key = "jaipur"
    elif any(k in dest_key for k in ["mathura vrindavan", "mathura", "vrindavan"]):
        match_key = "mathura"
    elif any(k in dest_key for k in ["jodhpur", "udaipur", "jaisalmer"]):
        match_key = "rajasthan"
    elif any(k in dest_key for k in ["goa"]):
        match_key = "goa"
    elif any(k in dest_key for k in ["kerala", "munnar", "thekkady", "alleppey"]):
        match_key = "kerala"
    elif any(k in dest_key for k in ["shimla", "manali", "kullu", "chandigarh", "himachal"]):
        match_key = "shimla_manali"

    clean_pickup = transit_info['pickup_location'].strip().strip("'\"`")
    clean_drop = transit_info['drop_location'].strip().strip("'\"`")

    if match_key and match_key in POPULAR_DESTINATIONS:
        data_copy = json.loads(json.dumps(POPULAR_DESTINATIONS[match_key]))
        current_len = len(data_copy["days"])
        if current_len > days:
            data_copy["days"] = data_copy["days"][:days]
        elif current_len < days:
            dest_name = data_copy["destination"]
            old_last = data_copy["days"][-1]
            if "depart" in old_last["theme"].lower() or "drop" in old_last["theme"].lower():
                old_last["theme"] = f"Day {current_len}: Extended Sightseeing in {dest_name}"
                old_last["morning"] = f"Enjoy a relaxed morning and explore remaining attractions in {dest_name}."
                old_last["afternoon"] = "Local cafe hopping or shopping for souvenirs."
                old_last["evening"] = "Relax at the resort or take an evening stroll."
                old_last["stay_suggestion"] = f"Resort in {dest_name}"
            
            for i in range(current_len + 1, days + 1):
                if i == days:
                    theme = "Departure"
                    morning = f"After checkout, start journey for {clean_drop} and end of the tour."
                    afternoon = ""
                    evening = ""
                    stay = f"Drop at {clean_drop} / Onward Journey"
                else:
                    activities = ["Cultural Heritage Tour", "Nature Walk", "Local Markets", "Temple Visit", "Leisure Day"]
                    activity = activities[(i - 2) % len(activities)]
                    theme = f"Day {i}: {activity} in {dest_name}"
                    morning = f"Start Day {i} with a delightful breakfast. Explore popular spots for {activity.lower()}."
                    afternoon = f"Enjoy lunch at a renowned local restaurant. Continue sightseeing."
                    evening = "Witness a breathtaking sunset at a premier viewpoint or relax at the hotel."
                    stay = f"Resort in {dest_name}"
                
                data_copy["days"].append({
                    "day_number": i, "theme": theme, "morning": morning, "afternoon": afternoon,
                    "evening": evening, "meal_recommendation": f"Signature authentic delicacies of {dest_name}.",
                    "stay_suggestion": stay, "pro_tip": "Check live traffic before excursion."
                })
                
        # Forcefully enforce pickup and drop on the template
        data_copy["days"][0]["theme"] = f"Pickup from {clean_pickup}"
        data_copy["days"][0]["morning"] = f"Chauffeur meets you at {clean_pickup}. Commence journey."
        
        last_day = data_copy["days"][-1]
        last_day["theme"] = "Departure"
        last_day["morning"] = f"After checkout, start journey for {clean_drop} and end of the tour."
        last_day["afternoon"] = ""
        last_day["evening"] = ""
        last_day["stay_suggestion"] = ""
        
        data_copy["duration"] = f"{days} Days / {max(1, days-1)} Nights"
        data_copy["pickup_location"] = clean_pickup
        data_copy["drop_location"] = clean_drop
        dyn_url, dyn_summary = _generate_dynamic_route(data_copy, transit_info)
        data_copy["google_maps_route_url"] = dyn_url
        data_copy["route_summary"] = dyn_summary
        return data_copy

    # Dynamic fallback generator
    dest_name = destination.title() if destination else "Incredible Destination"
    generated_days = []
    for i in range(1, days + 1):
        if i == 1:
            theme = f"Pickup from {clean_pickup}"
            morning = f"Chauffeur meets you at {clean_pickup}. Commence scenic journey to {dest_name}."
            afternoon = f"En-route lunch stop. Arrive and check-in at hotel in {dest_name}."
            evening = f"Freshen up and enjoy an evening stroll around local markets."
            stay = f"Deluxe 4-Star Resort in {dest_name}"
        elif i == days:
            theme = "Departure"
            morning = f"After checkout, start journey for {clean_drop} and end of the tour."
            afternoon = ""
            evening = ""
            stay = ""
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
        "pickup_location": clean_pickup,
        "drop_location": clean_drop,
        "google_maps_route_url": _generate_dynamic_route({"days": generated_days}, transit_info)[0],
        "route_summary": _generate_dynamic_route({"days": generated_days}, transit_info)[1],
        "estimated_cost_inr": "Price On Request",
        "best_season": "Year-round (Best: Spring, Summer & Autumn)",
        "packing_essentials": ["Comfortable walking shoes", "Mobile charger & power bank", "Gov ID cards & travel vouchers"],
        "highlights": [f"Seamless pickup from {clean_pickup} and drop at {clean_drop}", f"Curated private tour of {dest_name}", "Handpicked accommodation"],
        "days": generated_days
    }


async def generate_ai_itinerary_stream(destination: str, days: int = 4, budget: str = "Standard", travel_style: str = "Family", travelers: str = "2 Adults", special_requests: str = "", pickup_location: Optional[str] = None, drop_location: Optional[str] = None):
    try:
        original_destination = destination
        extended_dest, extension_notes = extend_destination_for_extra_days(destination, days)
        if extension_notes:
            special_requests = f"{special_requests}\n\n{extension_notes}".strip()
            destination = extended_dest
    
        transit_info = resolve_transit_and_maps(destination, pickup_location, drop_location, days)
        dest_key = (destination or "").lower().strip()
        
        api_key = os.getenv("GEMINI_API_KEY", "").strip()
        if not api_key:
            # Fallback if no API key, yield a static JSON response for the frontend to parse
            fallback_data = generate_ai_itinerary(destination, days, budget, travel_style, travelers, special_requests, pickup_location, drop_location)
            yield json.dumps(fallback_data)
            return
    
        # 1. Geocode pickup & drop
        if maps_service.is_configured():
            pickup_geo = maps_service.geocode_location(transit_info['pickup_location'])
            drop_geo = maps_service.geocode_location(transit_info['drop_location'])
            if pickup_geo:
                transit_info['pickup_location'] = pickup_geo['formatted_address'].strip().strip("'\"`")
            if drop_geo:
                transit_info['drop_location'] = drop_geo['formatted_address'].strip().strip("'\"`")
                
            candidate_places_list = maps_service.get_candidate_places(destination)
            candidate_places_str = ""
            if candidate_places_list:
                candidate_places_str = "\n".join([f"- {p['name']} ({p.get('rating', 'N/A')}⭐) - {p.get('formatted_address', '')}" for p in candidate_places_list])
        else:
            candidate_places_str = ""
    
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
            async for chunk in generate_gemini_itinerary_stream(
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
                candidate_places=candidate_places_str,
                agency_context=agency_context
            ):
                # Parse the raw chunk
                try:
                    data = json.loads(chunk)
                    # Enrich with missing fields
                    clean_display_dest = original_destination.strip()
                    clean_pickup = transit_info["pickup_location"].strip().strip("'\"`")
                    clean_drop = transit_info["drop_location"].strip().strip("'\"`")
                    data["title"] = f"{days} Days {clean_display_dest} Trip"
                    data["destination"] = clean_display_dest
                    data["duration"] = f"{days} Days / {max(1, days-1)} Nights"
                    data["estimated_cost_inr"] = "As per actuals"
                    data["best_season"] = "Year Round"
                    data["pickup_location"] = clean_pickup
                    data["drop_location"] = clean_drop
                    dyn_url, dyn_summary = _generate_dynamic_route(data, transit_info)
                    data["google_maps_route_url"] = dyn_url
                    data["route_summary"] = dyn_summary
                    
                    # Ensure proper themes: 'Pickup from <pickup_location>' for day 1, and 'Departure' for last day
                    days_list = data.get("days", [])
                    total_days = len(days_list)
                    for idx, day in enumerate(days_list):
                        is_first = (idx == 0)
                        is_last = (idx == total_days - 1)
                        if is_first:
                            day["theme"] = f"Pickup from {clean_pickup}"
                        elif is_last:
                            day["theme"] = "Departure"
                            day["stay_suggestion"] = ""
                        else:
                            raw_theme = day.get("theme") or f"Explore {day.get('base_location') or destination}"
                            day["theme"] = raw_theme.strip().strip("'\"`")

                    # Validate/enrich with real distances
                    if maps_service.is_configured():
                        for idx, day in enumerate(data.get("days", [])):
                            wp = day.get("destinations", [])
                            if len(wp) >= 2:
                                origin = wp[0]
                                dest = wp[-1]
                                intermediate = wp[1:-1]
                                dist_info = maps_service.calculate_route_distances(origin, dest, intermediate)
                                if dist_info:
                                    day["travel_time_info"] = f"Total driving: {dist_info['total_distance_km']} km (~{dist_info['total_duration_mins']} mins)"

                    yield json.dumps(data)
                except Exception as parse_err:
                    print(f"Error enriching stream chunk: {parse_err}")
                    yield chunk

        except Exception as e:
            import traceback
            with open("gemini_error.txt", "w") as err_f:
                err_f.write(traceback.format_exc())
            print(f"Gemini stream failed: {e}")
            # Fallback if API call fails
            fallback_data = generate_ai_itinerary(destination, days, budget, travel_style, travelers, special_requests, transit_info['pickup_location'], transit_info['drop_location'])
            yield json.dumps(fallback_data)
    except Exception as fatal_error:
        print(f"Fatal error in itinerary stream: {fatal_error}")
        yield json.dumps({"error": str(fatal_error)})


# --- Yatra Mitra: Mankotia Holidays Travel Assistant ---

CONCIERGE_SYSTEM_PROMPT = f"""You are 'Yatra Mitra', the Senior Travel Assistant for {AGENCY_NAME}.
You are multilingual and serve travelers in English, Hindi (Devanagari), and Hinglish (Hindi written in Roman script).

LANGUAGE DETECTION (CRITICAL):
- Detect the language of EVERY user message before responding.
- If the user explicitly types in Hindi Devanagari script (e.g., 'नमस्ते', 'मुझे बुकिंग करनी है'), reply ENTIRELY in Hindi Devanagari.
- If the user explicitly types in Hinglish/Roman Hindi (e.g., 'mujhe booking karni hai', 'kya rate hai'), reply ENTIRELY in Hinglish.
- For ALL other messages — including option chips, quick buttons, or English queries — reply ONLY in English.
- DEFAULT LANGUAGE IS ENGLISH. Only switch when the user clearly types in Hindi or Hinglish themselves.
- NEVER mix scripts in a single response.

NO FIXED RATES / SEASONAL PRICING POLICY (STRICT RULE):
- CRITICAL: DO NOT QUOTE ANY FIXED RATES, NUMERICAL PRICES, OR SPECIFIC TARIFFS (e.g., never say ₹34,999, ₹22,500, or any fixed amount).
- Reason: Package rates change significantly across seasons (peak pilgrimage months, summer holiday peak, festival dates, and off-season), hotel tier, vehicle type, and number of travelers.
- Whenever a user asks for rates, prices, costs, budget, discount, or package tariffs in ANY language:
  1. Politely explain that tour package rates are not fixed because they vary based on the travel season, exact travel dates, choice of hotels, and group size.
  2. Tell the traveler to click the **📋 Book Now** button or connect on WhatsApp/phone so the Mankotia Holidays team can provide the best customized seasonal quote tailored to their exact schedule.
  3. Always include '📋 Book Now' and 'Connect on WhatsApp' in your follow-up OPTIONS.

CRITICAL INSTRUCTIONS:
1. BREVITY & FORMAT: Keep answers concise, highly structured, and crisp (2-4 bullet points or 3-4 sentences). Avoid long essays.
2. TONE & DECORUM: Executive, distinguished, polite, and formal hospitality concierge tone (like a five-star luxury travel desk). Maintain professional etiquette and clear, authoritative guidance. Avoid casual internet slang, emojis overload, or informal colloquialisms.
3. NO PAYMENT OPTIONS: Never mention payment details, bank accounts, UPI, or advance deposits. Mankotia Holidays handles bookings directly via WhatsApp/phone after the query form is submitted.
4. BOOKING FORM: If a traveler wants to book or get a quotation, tell them to click the **Book Now** button in the chat to fill the booking form. Always include '📋 Book Now' in options.
5. POLICIES: If asked about cancellation, refund, or Terms & Conditions, provide accurate information from the policy data below, and ALWAYS include '🔙 Back to Menu' as the first option in OPTIONS.
6. INTERACTIVE OPTIONS: At the END of every response, output exactly 4-6 follow-up options:
OPTIONS: [Choice 1 | Choice 2 | Choice 3 | Choice 4 | Choice 5]

AGENCY CONTEXT:
- Agency: {AGENCY_NAME} (GST: 07AGQPM4637F1Z4)
- Helplines: +91 9816461616 / +91 9811485028 / +91 8627068616 | WhatsApp: +91 9816461616
- Offices: New Delhi (Pitampura), Manali (Hadimba Rd), Una (HP)
- Packages offered: Char Dham Yatra (10N/11D), Do Dham Yatra (5N/6D), Kedarnath Helicopter, Nainital & Jim Corbett, Mussoorie & Rishikesh, Shimla & Manali, Kashmir Paradise (Srinagar, Gulmarg, Pahalgam), Golden Triangle & Rajasthan.
- Pricing model: Dynamic seasonal pricing based on travel dates, hotel category, vehicle selection, and group size.
- Fleet: Dzire/Etios (2-4 pax), Ertiga/Innova Crysta (4-6 pax), 12/17/26-seater Tempo Travellers.
- Food: 100% Pure Vegetarian / Satvik meals (daily breakfast & dinner).

CANCELLATION & REFUND POLICY:
- 30+ days before departure: 10% cancellation charge.
- 15-29 days before departure: 25% cancellation charge.
- 7-14 days before departure: 50% cancellation charge.
- Less than 7 days / No-show: 100% cancellation charge (no refund).
- Helicopter bookings: Non-refundable as per IRCTC/operator norms.
- Refunds processed within 7-10 working days after deductions.
- Force Majeure (natural disaster, border closure, government orders): Full credit note or rescheduling offered; cash refund at company's discretion.

TERMS & CONDITIONS (KEY POINTS):
- Rates vary by season, hotel category, and number of passengers on twin/double sharing basis.
- Prices do NOT include airfare, train tickets, personal expenses, tips, camera fees, or adventure activity charges.
- Hotel check-in 12:00 PM / check-out 10:00 AM standard; early/late check-in subject to availability.
- Mankotia Holidays acts as a tour organizer; not liable for delays due to weather, road conditions, or government restrictions.
- Itinerary may be modified due to safety, weather, or force majeure without prior notice.
- Travel insurance is strongly recommended but not included in package price.
- Disputes subject to jurisdiction of New Delhi courts.
"""



def extract_reply_and_options(raw_text: str, default_options: Optional[list] = None) -> dict:
    """Extracts clean reply text and options list from raw LLM text, strictly excluding payment options."""
    options = []
    clean_text = raw_text.strip()

    # Check for OPTIONS: [Option 1 | Option 2]
    match = re.search(r"OPTIONS:\s*\[(.*?)\]", raw_text, re.IGNORECASE | re.DOTALL)
    if match:
        raw_opts = match.group(1).split("|")
        options = [o.strip() for o in raw_opts if o.strip()]
        clean_text = raw_text[:match.start()].strip()
    else:
        # Check for OPTIONS:\n- Option 1
        match_lines = re.search(r"OPTIONS:\s*\n((?:[•\-\*\d\.]+\s*.*(?:\n|$))+)", raw_text, re.IGNORECASE)
        if match_lines:
            raw_lines = match_lines.group(1).split("\n")
            options = [re.sub(r"^[•\-\*\d\.\)]+\s*", "", l).strip() for l in raw_lines if l.strip()]
            clean_text = raw_text[:match_lines.start()].strip()

    # Filter out any payment or deposit options
    PAYMENT_KEYWORDS = ["pay", "payment", "bank", "upi", "deposit", "advance", "gateway", "transfer money"]
    options = [
        o for o in options
        if not any(pk in o.lower() for pk in PAYMENT_KEYWORDS)
    ]

    if not options and default_options:
        options = [
            o for o in default_options
            if not any(pk in o.lower() for pk in PAYMENT_KEYWORDS)
        ]

    return {
        "reply": clean_text,
        "options": options[:6] if options else [
            "Char Dham Yatra 2026",
            "Kedarnath Helicopter Shuttle",
            "Do Dham (Kedar-Badri)",
            "Get Custom Price Quote"
        ],
        "allow_multiselect": True
    }


def get_formal_concierge_response(message: str, history: Optional[list] = None) -> dict:
    """Provides short, genuine, formal, and interactive travel consultation responses."""
    msg = message.lower().strip()

    # 1. Greetings & Formal Introductions
    if any(k in msg for k in ["hello", "hi", "namaste", "good morning", "good evening", "good afternoon", "greetings", "hey", "who are you", "what can you do"]):
        return {
            "reply": (
                "**Namaste & Welcome to Mankotia Holidays.** 🙏\n\n"
                "I am **Yatra Mitra**, your Senior Travel Concierge. We specialize in sacred Himalayan pilgrimages, VIP helicopter reservations, and bespoke holiday journeys across India with handpicked deluxe accommodations, pure vegetarian Satvik cuisine, and dedicated mountain chauffeurs.\n\n"
                "Please select your destination or travel preference below, or enter your travel dates for a personalized itinerary quote:"
            ),
            "options": [
                "Char Dham Yatra 2026",
                "Kedarnath Helicopter Shuttle",
                "Do Dham (Kedar-Badri) 6D",
                "Uttarakhand Family Tours",
                "Himachal & Manali Packages",
                "Kashmir Paradise Packages",
                "Vehicle Fleet & Private Cabs",
                "Get Custom Seasonal Quote"
            ],
            "allow_multiselect": True
        }

    # 2. Char Dham Yatra 2026
    if any(k in msg for k in ["char dham", "chardham", "yamunotri", "gangotri", "4 dham", "four dham", "char dham yatra", "chardham yatra", "yatra 2026"]):
        return {
            "reply": (
                "**Sacred Char Dham Yatra 2026** (10N/11D):\n\n"
                "• **Circuit:** Yamunotri, Gangotri, Shri Kedarnath Ji, and Shri Badrinath Ji.\n"
                "• **Seasonal Pricing:** Rates fluctuate across seasons (peak May-June vs. crisp autumn Sept-Oct), hotel preference, and group size. Click **📋 Book Now** for your customized quote.\n"
                "• **Inclusions:** Verified deluxe stays, daily 100% pure veg breakfast & dinner, dedicated mountain vehicle, tolls, and biometric registration support.\n"
                "• **Portals Open:** Early May 2026 (Akshaya Tritiya) through Diwali."
            ),
            "options": [
                "📋 Book Now",
                "Kedarnath Helicopter Option",
                "Day-Wise Route & Itinerary",
                "Best Season & Weather",
                "Biometric e-Pass Rules",
                "Connect on WhatsApp"
            ],
            "allow_multiselect": True
        }

    # 3. Do Dham Yatra (Kedarnath & Badrinath)
    if any(k in msg for k in ["do dham", "dodham", "kedar badri", "kedarnath badrinath", "two dham", "2 dham"]):
        return {
            "reply": (
                "**Do Dham Yatra (Kedarnath & Badrinath Ji)** (5N/6D):\n\n"
                "• **Circuit:** Haridwar/Rishikesh → Guptkashi → Kedarnath Dham → Joshimath → Badrinath Ji → Return.\n"
                "• **Seasonal Pricing:** Customized dynamic rates based on travel month, vehicle choice, and hotel category.\n"
                "• **Inclusions:** Deluxe hotel accommodation, MAP meal plan (pure veg), dedicated private vehicle, and all mountain permits.\n"
                "• **Heli Shuttle:** Direct helicopter flights from Phata or Sirsi can be included."
            ),
            "options": [
                "📋 Book Now",
                "Add Kedarnath Helicopter",
                "Trek / Pony Options",
                "Mana First Village Visit",
                "Innova Crysta Upgrade",
                "Connect on WhatsApp"
            ],
            "allow_multiselect": True
        }

    # 4. Kedarnath Helicopter Service
    if any(k in msg for k in ["helicopter", "heli", "chopper", "flight to kedarnath", "phata", "sirsi", "heliyatra", "heli ticket"]):
        return {
            "reply": (
                "**Kedarnath Helicopter Shuttle Guidelines**:\n\n"
                "• **Helipads:** Flights operate from Phata, Sirsi, and Guptkashi (8-10 mins one-way flight).\n"
                "• **Booking Rule:** Centralized officially via IRCTC (`heliyatra.irctc.co.in`) with mandatory Uttarakhand biometric registration.\n"
                "• **Mankotia Support:** We coordinate your helipad arrival, lodging in Guptkashi, VIP darshan assistance, and ground transport."
            ),
            "options": [
                "Same-Day Return Flight",
                "Night Stay at Kedarnath",
                "IRCTC Slot Assistance",
                "Trek / Palki Alternative",
                "Get Heli Yatra Quote"
            ],
            "allow_multiselect": True
        }

    # 5. Kedarnath Trekking Route, Pony & Palki
    if any(k in msg for k in ["trek", "walking", "pony", "palki", "pitthu", "gaurikund", "distance to kedarnath", "how to climb"]):
        return {
            "reply": (
                "**Kedarnath Trekking & Traditional Transport**:\n\n"
                "• **Trail:** 16 km paved mountain trail from Gaurikund base (approx. 6-8 hours walking).\n"
                "• **Transport Available:** Government-authorized Ponies/Mules, Palki (palanquins for seniors), and Pitthu carriers at fixed base rates.\n"
                "• **Recommendation:** Start early morning (5:00 AM) and plan an overnight stay at Kedarnath base for evening & morning Aarti."
            ),
            "options": [
                "Helicopter Booking Instead",
                "Palki Booking for Seniors",
                "Kedarnath Night Stay Cottages",
                "High-Altitude Packing Tips",
                "Get Kedarnath Package Quote"
            ],
            "allow_multiselect": True
        }

    # 6. Biometric Yatra Registration & e-Pass
    if any(k in msg for k in ["registration", "biometric", "epass", "e-pass", "permit", "yatra pass", "qr slip"]):
        return {
            "reply": (
                "**Uttarakhand Biometric Yatra e-Pass**:\n\n"
                "• **Mandatory Rule:** Required for all pilgrims visiting Yamunotri, Gangotri, Kedarnath, and Badrinath.\n"
                "• **Portal:** Registration is conducted via `registrationandtouristcare.uk.gov.in` with Aadhaar / Government ID.\n"
                "• **Complimentary Service:** Mankotia Holidays provides complete free registration and QR pass issuance for all our confirmed guests."
            ),
            "options": [
                "Documents Required",
                "Char Dham Packages",
                "Helicopter Slot Linking",
                "Medical Fitness Guidelines",
                "Speak with Yatra Specialist"
            ],
            "allow_multiselect": True
        }

    # 7. Weather & Best Time to Visit
    if any(k in msg for k in ["weather", "best time", "season", "climate", "temperature", "when to visit", "when to go", "monsoon", "snow"]):
        return {
            "reply": (
                "**Best Seasons to Travel**:\n\n"
                "• **Char Dham / Himalayas:** May-June (pleasant daytime 12-18°C, freshly opened) & September-October (crisp skies, low rush, chilly nights). Avoid peak monsoon (July-August) for high passes.\n"
                "• **Himachal & Kashmir:** April-June (valley flowers, cool breeze) & December-February (snowfall & skiing).\n"
                "• **Golden Triangle / Rajasthan:** October through March."
            ),
            "options": [
                "Char Dham in May-June",
                "Char Dham in Sept-Oct",
                "Snow in Manali / Kashmir",
                "Monsoon Travel Safety",
                "Custom Itinerary for My Dates"
            ],
            "allow_multiselect": True
        }

    # 8. Packing Essentials & High-Altitude Health
    if any(k in msg for k in ["packing", "what to pack", "what to carry", "luggage", "clothes", "medical", "fitness", "altitude", "medicine", "oxygen", "diamox"]):
        return {
            "reply": (
                "**High-Altitude Packing & Health Essentials**:\n\n"
                "• **Layering:** 3 layers (thermal inners, fleece, wind/waterproof down jacket) and rain poncho.\n"
                "• **Footwear:** Sturdy broken-in trekking boots with deep rubber treads and woolen socks.\n"
                "• **Health Kit:** Consult physician for Diamox (altitude sickness), personal meds, camphor pouch, pain spray, and insulated thermos flask.\n"
                "• **Note:** Our tour cabs carry emergency first-aid and portable oxygen."
            ),
            "options": [
                "Elderly Pilgrim Precautions",
                "Pony / Palki Availability",
                "Weather for My Month",
                "View Yatra Packages"
            ],
            "allow_multiselect": True
        }

    # 9. Uttarakhand Leisure Tours
    if any(k in msg for k in ["uttarakhand", "nainital", "jim corbett", "corbett", "mussoorie", "auli", "chopta", "rishikesh"]):
        return {
            "reply": (
                "**Uttarakhand Holiday Specials**:\n\n"
                "• **Nainital & Jim Corbett (4N/5D):** Boating in Naini Lake + Jungle Jeep Tiger Safari.\n"
                "• **Mussoorie & Rishikesh (4N/5D):** Kempty Falls, Dhanaulti & Ganga Aarti river retreat.\n"
                "• **Auli Skiing & Chopta Trek (5N/6D):** Cable car & Himalayan panorama.\n"
                "• **Seasonal Pricing:** Rates vary by season and travel dates. Includes private dedicated cab, deluxe resort stays, breakfast & dinner."
            ),
            "options": [
                "📋 Book Now",
                "Nainital & Jim Corbett 4N/5D",
                "Mussoorie & Rishikesh 4N/5D",
                "Auli & Chopta Valley 5N/6D",
                "Jim Corbett Safari Booking",
                "Connect on WhatsApp"
            ],
            "allow_multiselect": True
        }

    # 10. Himachal Pradesh Packages
    if any(k in msg for k in ["himachal", "manali", "shimla", "spiti", "dharamshala", "dalhousie", "rohtang", "solang", "atal tunnel"]):
        return {
            "reply": (
                "**Himachal Pradesh Escapes**:\n\n"
                "• **Shimla & Manali (5N/6D or 6N/7D):** Kufri, Kullu river rafting, Solang Valley adventure, and Atal Tunnel to Sissu.\n"
                "• **Dharamshala & Dalhousie (4N/5D):** Dalai Lama Temple & Khajjiar (Mini Switzerland).\n"
                "• **Seasonal Pricing:** Rates depend on season (summer holidays, winter snow, or autumn). Includes private vehicle with chauffeur, deluxe hotels with valley views, and daily breakfast & dinner."
            ),
            "options": [
                "📋 Book Now",
                "5N/6D Shimla & Manali",
                "Solang Valley & Atal Tunnel",
                "Dharamshala & Dalhousie",
                "Private Innova / Dzire",
                "Connect on WhatsApp"
            ],
            "allow_multiselect": True
        }

    # 11. Kashmir Paradise Packages
    if any(k in msg for k in ["kashmir", "srinagar", "gulmarg", "pahalgam", "sonmarg", "dal lake", "shikara", "gondola"]):
        return {
            "reply": (
                "**Kashmir Paradise on Earth (5N/6D)**:\n\n"
                "• **Highlights:** Srinagar Dal Lake Shikara ride & Luxury Houseboat stay, Gulmarg Gondola Cable Car, and Pahalgam Betaab Valley.\n"
                "• **Seasonal Pricing:** Rates vary according to season (tulip bloom, summer rush, autumn, or winter snow) and hotel category.\n"
                "• **Inclusions:** Srinagar airport pickup/drop, houseboat & 4-star hotels, breakfast & dinner daily, and dedicated private chauffeur."
            ),
            "options": [
                "📋 Book Now",
                "Dal Lake Houseboat Details",
                "Gulmarg Gondola Ride",
                "Pahalgam Betaab Valley",
                "Connect on WhatsApp",
                "Get Custom Seasonal Quote"
            ],
            "allow_multiselect": True
        }

    # 12. Golden Triangle & Rajasthan Heritage
    if any(k in msg for k in ["golden triangle", "delhi agra jaipur", "taj mahal", "agra", "rajasthan", "udaipur", "jodhpur", "jaipur"]):
        return {
            "reply": (
                "**Golden Triangle & Royal Rajasthan**:\n\n"
                "• **Golden Triangle (5N/6D):** Delhi, Agra Taj Mahal sunrise, Amber Fort Jaipur.\n"
                "• **Royal Rajasthan (7N/8D):** Jaipur, Jodhpur Mehrangarh Fort & Udaipur Lake Palace.\n"
                "• **Seasonal Pricing:** Dynamic rates based on travel month. Includes private sanitized AC vehicle, heritage hotel stays, daily breakfast, and approved guides."
            ),
            "options": [
                "📋 Book Now",
                "Golden Triangle 5N/6D",
                "Udaipur & Jodhpur Circuit",
                "Agra Same-Day Express",
                "Chokhi Dhani Dinner Jaipur",
                "Connect on WhatsApp"
            ],
            "allow_multiselect": True
        }

    # 13. Vehicle Fleet & Mountain Transport
    if any(k in msg for k in ["cab", "taxi", "car", "tempo traveller", "innova", "ertiga", "driver", "transport", "vehicle", "rental"]):
        return {
            "reply": (
                "**Dedicated Commercial Vehicle Fleet**:\n\n"
                "• **Sedan (Dzire / Etios):** 2 to 4 guests, fuel-efficient & comfortable.\n"
                "• **SUV (Ertiga / Innova Crysta):** 4 to 6 guests, superior hill stability & large luggage space.\n"
                "• **Luxury Tempo Traveller:** 12, 17 & 26-seater with 2x1 pushback seats, AC, and audio.\n"
                "• All vehicles have hill tourist permits, commercial insurance, and experienced mountain chauffeurs."
            ),
            "options": [
                "Swift Dzire (2-4 pax)",
                "Toyota Innova Crysta (4-6 pax)",
                "12-Seater Luxury Tempo",
                "17-Seater Tempo Traveller",
                "Delhi / Haridwar Pickup",
                "Check Vehicle Availability"
            ],
            "allow_multiselect": True
        }

    # 14. Hotels & Meal Standards
    if any(k in msg for k in ["hotel", "stay", "resort", "food", "meals", "breakfast", "dinner", "vegetarian", "satvik", "jain"]):
        return {
            "reply": (
                "**Accommodation & Dining Standards**:\n\n"
                "• **Hotels:** Verified 3-Star Deluxe & 4-Star Luxury properties with power backup, clean bedding, and running hot water.\n"
                "• **Meals (MAP Plan):** Wholesome hot breakfast and dinner included daily.\n"
                "• **100% Pure Vegetarian:** Fresh hygienic food on all yatra routes; Jain/Satvik (no onion/garlic) readily arranged on request."
            ),
            "options": [
                "3-Star Deluxe Hotels",
                "4-Star Luxury Resorts",
                "Jain / Satvik Food Request",
                "Ground Floor Room Request",
                "View Hotel Options"
            ],
            "allow_multiselect": True
        }

    # 15. Booking & Query Form Process
    if any(k in msg for k in ["book", "booking", "query form", "inquiry form", "fill form", "form", "how to book", "procedure", "process", "steps", "confirm", "reserve", "book now", "booking karna", "book karna", "बुकिंग"]):
        return {
            "reply": (
                "**Ready to Book Your Tour! 🎉**\n\n"
                "• Click **📋 Book Now** below to fill the booking form with your name, phone, email, travel date, and group size.\n"
                "• Our senior reservations team will review your requirements within 2 hours and send your confirmed itinerary & quote on WhatsApp.\n"
                "• No payment required at this stage — just fill your details!"
            ),
            "options": [
                "📋 Book Now",
                "Char Dham Yatra 2026",
                "Kedarnath Helicopter Option",
                "Do Dham (Kedar-Badri) 6D",
                "Connect on WhatsApp"
            ],
            "allow_multiselect": True
        }

    # 16. Price Quotations & Tariffs
    if any(k in msg for k in ["price", "cost", "quote", "budget", "tariff", "charges", "how much", "rate", "rates", "kitna kharcha", "kya rate", "paise"]):
        return {
            "reply": (
                "**Package Rates & Seasonal Pricing**:\n\n"
                "• **Why No Fixed Rates:** Our tour package rates change across seasons (peak pilgrimage months, summer holiday peak, festival dates, and off-season), hotel categories, vehicle type, and number of travelers.\n"
                "• **Customized Best Quote:** We provide competitive real-time rates customized specifically for your travel dates and group size.\n"
                "• **All Packages Include:** Verified hotel stays, daily 100% pure veg breakfast & dinner, dedicated mountain vehicle, chauffeur allowances, and yatra registration support.\n\n"
                "Please click **📋 Book Now** below to submit your travel dates, or connect on WhatsApp for an instant seasonal quote!"
            ),
            "options": [
                "📋 Book Now",
                "Connect on WhatsApp",
                "Char Dham Yatra 2026",
                "Kedarnath Helicopter Option",
                "Do Dham (Kedar-Badri)",
                "Call +91 9811485028"
            ],
            "allow_multiselect": True
        }

    # 17. Senior Citizens & Family Care
    if any(k in msg for k in ["senior citizen", "elderly", "parents", "old age", "children", "kids", "family care", "wheelchair"]):
        return {
            "reply": (
                "**Senior Citizen & Family Care on Yatra**:\n\n"
                "• **Paced Travel:** Relaxed driving pace without exhausting continuous hill drives.\n"
                "• **Room Priority:** Guaranteed ground-floor or lift-accessible rooms pre-allocated.\n"
                "• **Trek Assistance:** Pre-booked government Palkis (palanquins) or Helicopter shuttles for Kedarnath.\n"
                "• **Safety:** Onboard emergency oxygen canisters, medical first-aid, and light Satvik food."
            ),
            "options": [
                "Kedarnath Helicopter Option",
                "Palki (Palanquin) Booking",
                "Char Dham Senior Care",
                "Do Dham 6D Relaxed Tour",
                "Speak with Tour Specialist"
            ],
            "allow_multiselect": True
        }

    # 18. Contact & Office Information
    if any(k in msg for k in ["contact", "phone", "whatsapp", "email", "office", "address", "call", "location", "speak"]):
        return {
            "reply": (
                "**Mankotia Holidays Contact Coordinates**:\n\n"
                "• **Central Helpline:** +91 9816461616 / +91 9811485028 / +91 8627068616\n"
                f"• **24/7 WhatsApp:** +{AGENCY_WHATSAPP}\n"
                f"• **Email:** {AGENCY_EMAIL}\n"
                "• **Offices:** Delhi (Pitampura), Manali (Hadimba Rd), and Una (HP).\n"
                "• **GSTIN:** 07AGQPM4637F1Z4 (Govt. Registered Operator)."
            ),
            "options": [
                "Connect on WhatsApp",
                "📞 Contact Us",
                "Call +91 9816461616",
                "Send Email Inquiry",
                "📋 Book Now"
            ],
            "allow_multiselect": True
        }

    # 19. Cancellation & Refund Policy
    if any(k in msg for k in ["cancellation", "cancel", "refund", "cancellation policy", "cancel policy", "cancellation charge", "cancel karna", "रिफंड", "कैंसिलेशन"]):
        return {
            "reply": (
                "**Cancellation & Refund Policy**:\n\n"
                "• **30+ days before travel:** 10% cancellation charge.\n"
                "• **15-29 days:** 25% charge deducted.\n"
                "• **7-14 days:** 50% charge deducted.\n"
                "• **Less than 7 days / No-show:** 100% charge — no refund.\n"
                "• **Helicopter bookings:** Non-refundable (IRCTC/operator policy).\n"
                "• **Refund timeline:** 7-10 working days after cancellation approval.\n"
                "• **Force Majeure:** Full credit note or free rescheduling offered."
            ),
            "options": [
                "🔙 Back to Menu",
                "📜 Terms & Conditions",
                "💬 Connect on WhatsApp",
                "📞 Contact Us",
                "📋 Book Now"
            ],
            "allow_multiselect": True
        }

    # 20. Terms & Conditions
    if any(k in msg for k in ["terms", "conditions", "t&c", "tnc", "terms and conditions", "niyam", "sharten", "नियम", "शर्तें"]):
        return {
            "reply": (
                "**Terms & Conditions (Key Points)**:\n\n"
                "• Prices are **per person** on twin/double sharing unless stated otherwise.\n"
                "• **NOT included:** Airfare, train tickets, personal expenses, tips, or adventure charges.\n"
                "• Hotel check-in: 12:00 PM | Check-out: 10:00 AM (early/late subject to availability).\n"
                "• Itinerary may be modified due to weather, safety, or government orders without prior notice.\n"
                "• Mankotia Holidays is a tour organizer — not liable for delays due to road/weather conditions.\n"
                "• Travel insurance is strongly recommended (not included).\n"
                "• Disputes subject to jurisdiction of New Delhi courts."
            ),
            "options": [
                "🔙 Back to Menu",
                "📋 Cancellation Policy",
                "💬 Connect on WhatsApp",
                "📞 Contact Us",
                "📋 Book Now"
            ],
            "allow_multiselect": True
        }

    # 21. Back to Menu / Main Menu
    if any(k in msg for k in ["back to menu", "main menu", "menu", "home", "start again", "shuru"]):
        return {
            "reply": (
                "**Main Menu** 🧭\n\n"
                "Welcome back! How would you like to plan your journey with Mankotia Holidays?\n\n"
                "Select an itinerary, connect directly with our experts, or submit a booking request:"
            ),
            "options": [
                "Char Dham Yatra 2026",
                "Kedarnath Helicopter Shuttle",
                "Do Dham (Kedarnath-Badrinath)",
                "Uttarakhand Family Tours",
                "Himachal & Manali Packages",
                "💬 Connect on WhatsApp",
                "📞 Contact Us",
                "📋 Cancellation Policy",
                "📜 Terms & Conditions"
            ],
            "allow_multiselect": True
        }

    # 22. General Formal Reception
    return {
        "reply": (
            "**Namaste & Welcome to Mankotia Holidays.** 🙏\n\n"
            "I am **Yatra Mitra**, your Senior Travel Concierge. I am at your service to assist with custom Himalayan pilgrimages, VIP Kedarnath helicopter arrangements, and bespoke holiday packages across India.\n\n"
            "Please select an itinerary below or enter your destination and preferred travel dates:"
        ),
        "options": [
            "Char Dham Yatra 2026",
            "Kedarnath Helicopter Shuttle",
            "Do Dham (Kedarnath-Badrinath)",
            "Uttarakhand Family Tours",
            "Himachal & Manali Packages",
            "💬 Connect on WhatsApp",
            "📞 Contact Us",
            "📋 Cancellation Policy",
            "📜 Terms & Conditions"
        ],
        "allow_multiselect": True
    }


def chat_travel_concierge(message: str, history: Optional[list] = None) -> dict:
    """Answers traveler inquiries using Gemini with fallback to Mankotia Holidays Knowledge Base via Yatra Mitra."""
    api_key = os.getenv("GEMINI_API_KEY", "").strip()

    if api_key:
        # Candidate model failover list
        CANDIDATE_MODELS = [
            "gemini-2.5-flash",
            "gemini-2.0-flash",
            "gemini-1.5-flash",
            "gemini-flash-lite-latest"
        ]

        # Prepare formatted conversation history
        messages_for_gemini = []
        if history and isinstance(history, list):
            for item in history[-8:]:  # Maintain context from recent turns
                role = "user" if item.get("role") in ["user", "human"] else "model"
                parts = item.get("parts", [])
                if isinstance(parts, list):
                    text_val = " ".join([str(p) for p in parts if p]).strip()
                else:
                    text_val = str(parts).strip()
                if text_val:
                    messages_for_gemini.append({"role": role, "parts": [{"text": text_val}]})

        # Append current user inquiry
        messages_for_gemini.append({"role": "user", "parts": [{"text": message.strip()}]})

        # Attempt generation via google.genai Client
        try:
            from google import genai
            from google.genai import types

            client = genai.Client(
                api_key=api_key,
                http_options={'base_url': 'https://generativelanguage.googleapis.com'}
            )

            for model_name in CANDIDATE_MODELS:
                try:
                    response = client.models.generate_content(
                        model=model_name,
                        contents=messages_for_gemini,
                        config=types.GenerateContentConfig(
                            system_instruction=CONCIERGE_SYSTEM_PROMPT,
                            temperature=0.7,
                            max_output_tokens=1024,
                        )
                    )
                    if response and response.text and response.text.strip():
                        return extract_reply_and_options(response.text.strip())
                except Exception as model_err:
                    print(f"Concierge Gemini model {model_name} attempt: {model_err}")
                    continue

        except Exception as client_err:
            print(f"Concierge Gemini client init failed: {client_err}")

        # Secondary fallback: try google.generativeai if available
        try:
            import google.generativeai as genai_legacy
            genai_legacy.configure(api_key=api_key)

            for model_name in ["gemini-1.5-flash", "gemini-pro"]:
                try:
                    model = genai_legacy.GenerativeModel(
                        model_name=model_name,
                        system_instruction=CONCIERGE_SYSTEM_PROMPT
                    )
                    prompt_combined = f"{message.strip()}"
                    resp = model.generate_content(prompt_combined)
                    if resp and resp.text and resp.text.strip():
                        return extract_reply_and_options(resp.text.strip())
                except Exception:
                    continue
        except Exception:
            pass

    # Seamless fallback to the comprehensive, genuine & formal Mankotia Holidays Knowledge Base
    return get_formal_concierge_response(message, history)

