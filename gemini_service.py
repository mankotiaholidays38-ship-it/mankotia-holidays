import os
import json
import re
from typing import List, Optional
from pydantic import BaseModel, Field
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# --- Pydantic Schemas for Strict JSON Validation ---

class ItineraryDay(BaseModel):
    day_number: int = Field(description="The day number in the sequence, e.g. 1")
    theme: str = Field(description="The theme or summary of the day, e.g. Arrival in Shimla & Local Walk")
    morning: str = Field(description="Morning activities. MUST explicitly name specific sightseeing points, landmarks, and temples.")
    afternoon: str = Field(description="Afternoon activities. MUST explicitly name specific points of interest being covered.")
    evening: str = Field(description="Evening activities, markets, and sightseeing spots.")
    waypoints_for_routing: List[str] = Field(description="An exact list of specific place names visited this day in logical order (e.g. ['Taj Mahal', 'Agra Fort']). Used for mapping.")
    stay_suggestion: str = Field(description="Suggested area or type of accommodation for the night")
    meal_recommendation: str = Field(description="Local dishes or specific types of meals to try this day")
    pro_tip: str = Field(description="A helpful tip related to the day's travel or locations")
    travel_time_info: str = Field(default="", description="Leave empty. System will fill this with Google Maps driving info.")

class ItineraryResponse(BaseModel):
    title: str = Field(description="A catchy title for the entire travel package")
    destination: str = Field(description="The primary destination of the tour")
    duration: str = Field(description="Duration string, e.g. 5 Days / 4 Nights")
    estimated_cost_inr: str = Field(description="Estimated cost range or 'Price On Request'")
    best_season: str = Field(description="Best months or season to travel to this destination")
    covered_places: List[str] = Field(description="A comprehensive list of EVERY specific temple, landmark, and tourist spot visited across all days of the tour.")
    packing_essentials: List[str] = Field(description="A list of 3 to 5 packing essentials")
    highlights: List[str] = Field(description="A list of 3 to 5 key highlights or experiences of the trip")
    days: List[ItineraryDay] = Field(description="An array exactly matching the number of days of the trip")

# --- Base System Prompt ---
SYSTEM_PROMPT = (
    "You are an expert, highly experienced travel planner. Your job is to create "
    "extremely detailed, realistic, and highly customized travel itineraries.\n"
    "You MUST ensure that the output strictly contains exactly {days} day objects in the 'days' array.\n"
    "You MUST ensure that every single day has unique and geographically realistic activities.\n"
    "CRITICAL ROUTING RULES:\n"
    "1. DAY 1 SIGHTSEEING LOGIC (Start at Pickup):\n"
    "   - The tour MUST start from the pickup point. The morning of Day 1 MUST explicitly state 'Pickup from {pickup_location}'.\n"
    "   - Mentally calculate the driving time from {pickup_location} to the first destination.\n"
    "   - If the drive time is greater than 6 hours, Day 1 MUST be dedicated entirely to travel and hotel check-in, with NO sightseeing.\n"
    "   - If the drive time is less than 6 hours, you may include local sightseeing on Day 1 afternoon/evening.\n"
    "2. FINAL DAY SIGHTSEEING LOGIC (End at Drop-off):\n"
    "   - The tour MUST end at the drop-off point. The afternoon or evening of the final day MUST explicitly state 'Drop-off at {drop_location}'.\n"
    "   - Mentally calculate the driving time from the final destination to {drop_location}.\n"
    "   - If the drive time is greater than 6 hours, the final day MUST be dedicated entirely to travel, with NO sightseeing.\n"
    "   - If the drive time is less than 6 hours, you may include local sightseeing on the final day morning.\n"
    "3. DAILY DESTINATION PROGRESSION: You must define the itinerary according to their daily destination point logically progressing through the requested route/waypoints: {waypoints}. Do not stay in one place if multiple locations are provided.\n"
    "4. EXPLICIT SIGHTSEEING EXPLANATION: For every day that involves sightseeing, you MUST explicitly name and EXPLAIN every single point of interest, temple, monument, valley, and landmark that will be visited. Explain what the customer will see and experience at each specific point. Do not use generic terms like 'explore local sights'.\n"
    "5. COVERED PLACES ARRAY: You MUST populate the top-level `covered_places` array with a comprehensive, comma-separated list of ALL the specific temples, landmarks, and tourist spots you included in the daily itineraries.\n"
    "5. COVERED PLACES ARRAY: You MUST populate the top-level `covered_places` array with a comprehensive, comma-separated list of ALL the specific temples, landmarks, and tourist spots you included in the daily itineraries.\n"
    "6. USE REAL MAPS PLACES: You have been provided with real candidate places from Google Maps below (CANDIDATE PLACES). You MUST build the sightseeing around these specific real places and NEVER invent fake attractions.\n"
    "7. USE DATABASE/AGENCY DATA: If AGENCY CONTEXT is provided below, you MUST use the exact routing, highlights, and included places from those packages to form the itinerary. Adapt it to fit the requested days and pickup/drop constraints to exactly match the customer's requirement, but prioritize using the real data from the database.\n"
    "Special customer constraints to obey: {special_requests}\n\n"
    "CANDIDATE PLACES FROM GOOGLE MAPS:\n{candidate_places}\n\n"
    "AGENCY CONTEXT:\n{agency_context}\n\n"
    "OUTPUT FORMAT: You MUST return ONLY valid JSON matching this exact structure (no markdown, no extra text):\n"
    "{{\n"
    '  "title": "A catchy title",\n'
    '  "destination": "The primary destination",\n'
    '  "duration": "e.g. 5 Days / 4 Nights",\n'
    '  "estimated_cost_inr": "Estimated cost range or Price On Request",\n'
    '  "best_season": "Best months to travel",\n'
    '  "covered_places": ["Place 1", "Place 2", "Place 3"],\n'
    '  "packing_essentials": ["Item 1", "Item 2"],\n'
    '  "highlights": ["Highlight 1", "Highlight 2"],\n'
    '  "days": [\n'
    '    {{\n'
    '      "day_number": 1,\n'
    '      "theme": "Theme of the day",\n'
    '      "morning": "Morning activities (explicit places)",\n'
    '      "afternoon": "Afternoon activities (explicit places)",\n'
    '      "evening": "Evening activities",\n'
    '      "waypoints_for_routing": ["Place 1", "Place 2"],\n'
    '      "stay_suggestion": "Accommodation suggestion",\n'
    '      "meal_recommendation": "Local dishes to try",\n'
    '      "pro_tip": "Helpful tip",\n'
    '      "travel_time_info": ""\n'
    '    }}\n'
    '  ]\n'
    "}}"
)

# --- Native Gemini Invocation ---

def generate_gemini_itinerary(
    api_key: str,
    destination: str, 
    days: int, 
    budget: str, 
    travel_style: str, 
    travelers: str, 
    special_requests: str, 
    pickup_location: str, 
    drop_location: str, 
    waypoints: List[str],
    candidate_places: str = "",
    agency_context: str = ""
) -> dict:
    """Generates a highly structured itinerary using native Gemini API."""
    
    genai.configure(api_key=api_key, client_options={"api_endpoint": "generativelanguage.googleapis.com"})
    
    model = genai.GenerativeModel(
        model_name="gemini-3.6-flash",
        system_instruction=SYSTEM_PROMPT.format(
            days=days, 
            pickup_location=pickup_location,
            drop_location=drop_location,
            waypoints=", ".join(waypoints),
            special_requests=special_requests if special_requests else "None",
            candidate_places=candidate_places,
            agency_context=agency_context
        )
    )
    
    human_prompt = (
        f"Create a {days}-day itinerary for {destination}.\n"
        f"Budget: {budget}, Style: {travel_style}, Travelers: {travelers}."
    )
    
    # Invoke the model
    result = model.generate_content(human_prompt, generation_config=genai.GenerationConfig(temperature=0.7))
    
    # Parse JSON from LLM string output
    text_content = result.text.strip()
    match = re.search(r'\{[\s\S]*\}', text_content)
    if match:
        text_content = match.group(0)
        
    return json.loads(text_content)

async def generate_gemini_itinerary_stream(
    api_key: str,
    destination: str, 
    days: int, 
    budget: str, 
    travel_style: str, 
    travelers: str, 
    special_requests: str, 
    pickup_location: str, 
    drop_location: str, 
    waypoints: List[str],
    candidate_places: str = "",
    agency_context: str = ""
):
    """Generates an itinerary using native Gemini API and yields text chunks asynchronously."""
    
    genai.configure(api_key=api_key, client_options={"api_endpoint": "generativelanguage.googleapis.com"})
    
    model = genai.GenerativeModel(
        model_name="gemini-3.6-flash",
        system_instruction=SYSTEM_PROMPT.format(
            days=days, 
            pickup_location=pickup_location,
            drop_location=drop_location,
            waypoints=", ".join(waypoints),
            special_requests=special_requests if special_requests else "None",
            candidate_places=candidate_places,
            agency_context=agency_context
        )
    )
    
    human_prompt = (
        f"Create a {days}-day itinerary for {destination}.\n"
        f"Budget: {budget}, Style: {travel_style}, Travelers: {travelers}."
    )
    
    # We use generate_content_async to get chunks as they are generated
    response = await model.generate_content_async(
        human_prompt, 
        generation_config=genai.GenerationConfig(temperature=0.7),
        stream=True
    )
    
    async for chunk in response:
        if chunk.text:
            yield chunk.text
