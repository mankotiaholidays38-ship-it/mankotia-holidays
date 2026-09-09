import os
import requests
from typing import Dict, List, Optional
from dotenv import load_dotenv

load_dotenv()

class MapsService:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://maps.googleapis.com/maps/api"

    def is_configured(self) -> bool:
        return bool(self.api_key and self.api_key.strip())

    def geocode_location(self, text: str) -> Optional[Dict]:
        """Geocodes a text location to lat/lng and formatted address."""
        if not self.is_configured() or not text:
            return None
            
        url = f"{self.base_url}/geocode/json"
        params = {
            "address": text,
            "key": self.api_key
        }
        
        try:
            resp = requests.get(url, params=params, timeout=5)
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
            print(f"Geocoding error for '{text}': {e}")
        return None

    def get_candidate_places(self, destination: str, query_type: str = "tourist attractions") -> List[Dict]:
        """Fetches top places of interest near a destination."""
        if not self.is_configured():
            return []
            
        url = f"{self.base_url}/place/textsearch/json"
        params = {
            "query": f"{query_type} in {destination}",
            "key": self.api_key
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

    def calculate_route_distances(self, origin: str, destination: str, waypoints: List[str]) -> Optional[Dict]:
        """
        Uses Directions API to calculate optimized route and distances.
        Passes waypoints with 'optimize:true' to get the TSP shortest path.
        """
        if not self.is_configured():
            return None
            
        url = f"{self.base_url}/directions/json"
        
        # Format waypoints for optimization
        wp_param = ""
        if waypoints:
            wp_param = "optimize:true|" + "|".join(waypoints)
            
        params = {
            "origin": origin,
            "destination": destination,
            "key": self.api_key
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

# Singleton instance
maps_service = MapsService(os.getenv("GOOGLE_MAPS_API_KEY", "").strip())
