import requests
from typing import Dict, Optional
from app.config import GOOGLE_MAPS_API_KEY

BASE_URL = "https://maps.googleapis.com/maps/api"

def is_configured() -> bool:
    return bool(GOOGLE_MAPS_API_KEY and GOOGLE_MAPS_API_KEY.strip())

def geocode_location(text: str) -> Optional[Dict]:
    """Finds the exact location (lat/lng and formatted address) using Google Places Find Place API.
    This is much more accurate for airports, hotels, and stations than the standard Geocoding API.
    """
    if not is_configured() or not text:
        return None
        
    url = f"{BASE_URL}/place/findplacefromtext/json"
    params = {
        "input": text,
        "inputtype": "textquery",
        "fields": "formatted_address,name,geometry,place_id",
        "key": GOOGLE_MAPS_API_KEY
    }
    
    try:
        resp = requests.get(url, params=params, timeout=5)
        if resp.status_code == 200:
            data = resp.json()
            if data.get("status") == "OK" and data.get("candidates"):
                result = data["candidates"][0]
                
                # Combine name and address for a highly accurate string for the LLM
                exact_name = result.get("name", "")
                exact_address = result.get("formatted_address", "")
                final_label = f"{exact_name}, {exact_address}" if exact_name and exact_name not in exact_address else exact_address
                
                return {
                    "formatted_address": final_label,
                    "lat": result["geometry"]["location"]["lat"],
                    "lng": result["geometry"]["location"]["lng"],
                    "place_id": result.get("place_id")
                }
    except Exception as e:
        print(f"Places Find Place API error for '{text}': {e}")
        
    # Fallback to standard geocoding if Find Place fails
    fallback_url = f"{BASE_URL}/geocode/json"
    fallback_params = {"address": text, "key": GOOGLE_MAPS_API_KEY}
    try:
        resp = requests.get(fallback_url, params=fallback_params, timeout=5)
        if resp.status_code == 200:
            data = resp.json()
            if data.get("status") == "OK" and data.get("results"):
                result = data["results"][0]
                return {
                    "formatted_address": result.get("formatted_address", text),
                    "lat": result["geometry"]["location"]["lat"],
                    "lng": result["geometry"]["location"]["lng"],
                    "place_id": result.get("place_id")
                }
    except Exception as e:
        print(f"Fallback Geocoding error for '{text}': {e}")
        
    return None
