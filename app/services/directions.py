import requests
from typing import Dict, List, Optional
from app.config import GOOGLE_MAPS_API_KEY

BASE_URL = "https://maps.googleapis.com/maps/api"

def is_configured() -> bool:
    return bool(GOOGLE_MAPS_API_KEY and GOOGLE_MAPS_API_KEY.strip())

def calculate_route_distances(origin: str, destination: str, waypoints: List[str]) -> Optional[Dict]:
    """
    Uses Directions API to calculate optimized route and distances.
    Passes waypoints with 'optimize:true' to get the TSP shortest path.
    """
    if not is_configured():
        return None
        
    url = f"{BASE_URL}/directions/json"
    
    # Format waypoints for optimization
    wp_param = ""
    if waypoints:
        wp_param = "optimize:true|" + "|".join(waypoints)
        
    params = {
        "origin": origin,
        "destination": destination,
        "key": GOOGLE_MAPS_API_KEY
    }
    if wp_param:
        params["waypoints"] = wp_param
        
    try:
        resp = requests.get(url, params=params, timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            if data.get("status") == "OK" and data.get("routes"):
                route = data["routes"][0]
                
                # Extract total distance and time
                total_distance_meters = 0
                total_duration_seconds = 0
                legs_info = []
                
                for leg in route.get("legs", []):
                    total_distance_meters += leg.get("distance", {}).get("value", 0)
                    total_duration_seconds += leg.get("duration", {}).get("value", 0)
                    legs_info.append({
                        "start": leg.get("start_address"),
                        "end": leg.get("end_address"),
                        "distance": leg.get("distance", {}).get("text"),
                        "duration": leg.get("duration", {}).get("text")
                    })
                
                return {
                    "total_distance_km": round(total_distance_meters / 1000, 1),
                    "total_duration_mins": round(total_duration_seconds / 60),
                    "waypoint_order": route.get("waypoint_order", []), # The optimized order
                    "legs": legs_info
                }
    except Exception as e:
        print(f"Directions API error: {e}")
        
    return None
