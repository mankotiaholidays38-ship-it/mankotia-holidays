import requests
from typing import Dict, List
from app.config import GOOGLE_MAPS_API_KEY

BASE_URL = "https://maps.googleapis.com/maps/api"

def is_configured() -> bool:
    return bool(GOOGLE_MAPS_API_KEY and GOOGLE_MAPS_API_KEY.strip())

def get_candidate_places(destination: str, query_type: str = "tourist attractions") -> List[Dict]:
    """Fetches top places of interest near a destination."""
    if not is_configured():
        return []
        
    url = f"{BASE_URL}/place/textsearch/json"
    params = {
        "query": f"{query_type} in {destination}",
        "key": GOOGLE_MAPS_API_KEY
    }
    
    candidates = []
    try:
        resp = requests.get(url, params=params, timeout=8)
        if resp.status_code == 200:
            data = resp.json()
            if data.get("status") == "OK":
                for place in data.get("results", [])[:15]: # Get top 15
                    candidates.append({
                        "name": place.get("name"),
                        "formatted_address": place.get("formatted_address"),
                        "rating": place.get("rating"),
                        "user_ratings_total": place.get("user_ratings_total"),
                        "types": place.get("types", [])
                    })
    except Exception as e:
        print(f"Places API error for '{destination}': {e}")
        
    return candidates
