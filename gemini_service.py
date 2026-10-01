import os
import json
import re
from typing import List, Optional
from pydantic import BaseModel, Field
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

# --- Pydantic Schemas for Strict JSON Validation ---

class ItineraryDay(BaseModel):
    day_number: int = Field(description="The day number in the sequence, e.g. 1")
    base_location: str = Field(description="The primary base location for this day")
    destinations: List[str] = Field(description="List of specific destinations visited on this day")
    activities: str = Field(description="Detailed activities for the day")
    overnight_stay: str = Field(description="The location or town for the overnight stay")

class ItineraryResponse(BaseModel):
    total_days: int = Field(description="The total number of days in the itinerary")
    pickup_point: str = Field(description="The starting pickup point of the tour")
    drop_point: str = Field(description="The final drop-off point of the tour")
    days: List[ItineraryDay] = Field(description="An array exactly matching the number of days of the trip")

# --- Base System Prompt ---
SYSTEM_PROMPT = (
    "You are an expert, highly experienced travel planner. Your job is to create "
    "extremely detailed, realistic, and highly customized travel itineraries.\n"
    "CRITICAL ROUTING RULES:\n"
    "1. The itinerary MUST have exactly {days} days. This is a strict requirement.\n"
    "2. Day 1's base_location MUST exactly equal the user's pickup point: '{pickup_location}'.\n"
    "3. The last day MUST end at the user's drop point: '{drop_location}'. Its base_location or activities must reflect this.\n"
    "4. DAILY DESTINATION PROGRESSION: You must define the itinerary according to their daily destination point logically progressing through the requested route/waypoints: {waypoints}. Do not stay in one place if multiple locations are provided.\n"
    "5. USE REAL MAPS PLACES: You have been provided with real candidate places from Google Maps below (CANDIDATE PLACES). You MUST build the sightseeing around these specific real places and NEVER invent fake attractions.\n"
    "6. USE DATABASE/AGENCY DATA: If AGENCY CONTEXT is provided below, you MUST use the exact routing, highlights, and included places from those packages to form the itinerary. Adapt it to fit the requested days and pickup/drop constraints to exactly match the customer's requirement, but prioritize using the real data from the database.\n"
    "Special customer constraints to obey: {special_requests}\n\n"
    "CANDIDATE PLACES FROM GOOGLE MAPS:\n{candidate_places}\n\n"
    "AGENCY CONTEXT:\n{agency_context}\n"
    "{validation_error}"
)

# --- Native Gemini Invocation ---

def _call_gemini_itinerary(
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
    agency_context: str = "",
    validation_error: str = ""
) -> dict:
    client = genai.Client(api_key=api_key)
    
    system_instruction = SYSTEM_PROMPT.format(
        days=days, 
        pickup_location=pickup_location,
        drop_location=drop_location,
        waypoints=", ".join(waypoints),
        special_requests=special_requests if special_requests else "None",
        candidate_places=candidate_places,
        agency_context=agency_context,
        validation_error=validation_error
    )
    
    human_prompt = (
        f"Create a {days}-day itinerary for {destination}.\n"
        f"Budget: {budget}, Style: {travel_style}, Travelers: {travelers}."
    )
    
    # Invoke the model with structured output
    result = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=human_prompt, 
        config=types.GenerateContentConfig(
            system_instruction=system_instruction,
            temperature=0.7,
            max_output_tokens=8192,
            response_mime_type="application/json",
            response_schema=ItineraryResponse
        )
    )
    
    return json.loads(result.text)

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
    """Generates a highly structured itinerary with validation and retry logic."""
    max_retries = 2
    validation_error = ""
    
    for attempt in range(max_retries + 1):
        try:
            data = _call_gemini_itinerary(
                api_key, destination, days, budget, travel_style, travelers, 
                special_requests, pickup_location, drop_location, waypoints, 
                candidate_places, agency_context, validation_error
            )
            
            # Validation logic
            errors = []
            if data.get("total_days") != days or len(data.get("days", [])) != days:
                errors.append(f"You generated {len(data.get('days', []))} days, but exactly {days} days were requested.")
            
            days_arr = data.get("days", [])
            if days_arr:
                # Check day 1
                if pickup_location.lower() not in days_arr[0].get("base_location", "").lower():
                    errors.append(f"Day 1 base_location '{days_arr[0].get('base_location')}' does not match requested pickup point '{pickup_location}'.")
                
                # Check last day
                last_day = days_arr[-1]
                last_loc = last_day.get("base_location", "") + " " + last_day.get("activities", "")
                if drop_location.lower() not in last_loc.lower():
                    errors.append(f"The last day does not end at the requested drop point '{drop_location}'.")
            
            if errors:
                validation_error = "\n\nVALIDATION FAILED ON PREVIOUS ATTEMPT:\n" + "\n".join(errors) + "\nYou MUST fix these issues in your next response."
                if attempt < max_retries:
                    continue  # Retry
                else:
                    return data # Return as is if max retries exceeded
            
            return data
            
        except Exception as e:
            if attempt < max_retries:
                validation_error = f"\n\nVALIDATION FAILED ON PREVIOUS ATTEMPT:\nJSON Parse Error: {str(e)}\nPlease return valid JSON."
                continue
            raise e

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
    """Generates an itinerary using native Gemini API structured outputs and yields text chunks asynchronously."""
    # Note: Validation/retry is difficult to do mid-stream, so we enforce it via the prompt and rely on structured outputs.
    client = genai.Client(api_key=api_key)
    
    system_instruction = SYSTEM_PROMPT.format(
        days=days, 
        pickup_location=pickup_location,
        drop_location=drop_location,
        waypoints=", ".join(waypoints),
        special_requests=special_requests if special_requests else "None",
        candidate_places=candidate_places,
        agency_context=agency_context,
        validation_error=""
    )
    
    human_prompt = (
        f"Create a {days}-day itinerary for {destination}.\n"
        f"Budget: {budget}, Style: {travel_style}, Travelers: {travelers}."
    )
    
    response_stream = await client.aio.models.generate_content_stream(
        model="gemini-3.6-flash",
        contents=human_prompt, 
        config=types.GenerateContentConfig(
            system_instruction=system_instruction,
            temperature=0.7,
            max_output_tokens=8192,
            response_mime_type="application/json",
            response_schema=ItineraryResponse
        )
    )
    
    # In the new SDK, generate_content_stream returns an AsyncGenerator of GenerateContentResponse chunks.
    # Since we need the full text for JSON parsing (it's strict structured JSON), 
    # we collect chunks and parse the final JSON (or we can just yield the final assembled JSON string)
    # The frontend expects a single JSON blob emitted via stream.
    
    full_text = ""
    async for chunk in response_stream:
        if chunk.text:
            full_text += chunk.text
            
    if full_text:
        try:
            # Validate that it's a complete, parseable JSON and has correct days
            data = json.loads(full_text)
            if "days" not in data or not isinstance(data["days"], list):
                raise Exception("Invalid itinerary format: 'days' array is missing.")
            if len(data["days"]) != days:
                raise Exception(f"Expected {days} days, got {len(data['days'])}.")
            yield full_text
        except json.JSONDecodeError as e:
            raise Exception(f"Gemini returned truncated or invalid JSON: {e}")
