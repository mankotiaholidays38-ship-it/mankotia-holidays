import os
import json
from typing import List, Optional
from pydantic import BaseModel, Field
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv()

# --- Pydantic Schemas for Strict JSON Validation ---

class ItineraryDay(BaseModel):
    day_number: int = Field(description="The day number in the sequence, e.g. 1")
    theme: str = Field(description="The theme or summary of the day, e.g. Arrival in Shimla & Local Walk")
    morning: str = Field(description="Morning activities. MUST explicitly name specific sightseeing points, landmarks, and temples.")
    afternoon: str = Field(description="Afternoon activities. MUST explicitly name specific points of interest being covered.")
    evening: str = Field(description="Evening activities, markets, and sightseeing spots.")
    stay_suggestion: str = Field(description="Suggested area or type of accommodation for the night")
    meal_recommendation: str = Field(description="Local dishes or specific types of meals to try this day")
    pro_tip: str = Field(description="A helpful tip related to the day's travel or locations")

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

# --- LangChain Invocation ---

def generate_langchain_itinerary(
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
    agency_context: str = ""
) -> dict:
    """Generates a highly structured itinerary using LangChain."""
    
    # Initialize the LLM
    llm = ChatGoogleGenerativeAI(
        model="gemini-3.5-flash-lite",
        google_api_key=api_key,
        temperature=0.7
    )
    
    # Define the Chat Prompt
    system_prompt = (
        "You are an expert, highly experienced travel planner. Your job is to create "
        "extremely detailed, realistic, and highly customized travel itineraries.\n"
        "You MUST ensure that the output strictly contains exactly {days} day objects in the 'days' array.\n"
        "You MUST ensure that every single day has unique and geographically realistic sightseeing activities.\n"
        "CRITICAL ROUTING RULES:\n"
        "1. DAY 1 SIGHTSEEING LOGIC: You must mentally calculate the driving time from the pickup point ({pickup_location}) to the first destination. \n"
        "   - If the drive time is greater than 6 hours, Day 1 MUST be dedicated entirely to travel and hotel check-in, with NO sightseeing.\n"
        "   - If the drive time is less than 6 hours, you MUST include local sightseeing on Day 1 afternoon/evening.\n"
        "   - The morning of Day 1 MUST explicitly state 'Pickup from {pickup_location}'.\n"
        "2. You must change the daily destinations logically to progress through the requested route/waypoints: {waypoints}. Do not stay in one place if multiple locations are provided.\n"
        "3. EXPLICIT SIGHTSEEING POINTS: For every day that involves sightseeing, you MUST explicitly name the exact points of interest, temples, monuments, valleys, and landmarks that will be covered. Do not use generic terms like 'explore local sights'. Name the actual places.\n"
        "4. The final day must end at the drop-off point ({drop_location}). The afternoon or evening of the final day MUST explicitly state 'Drop-off at {drop_location}'.\n"
        "5. COVERED PLACES ARRAY: You MUST populate the top-level `covered_places` array with a comprehensive, comma-separated list of ALL the specific temples, landmarks, and tourist spots you included in the daily itineraries.\n"
        "Special customer constraints to obey: {special_requests}\n\n"
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
        '      "stay_suggestion": "Accommodation suggestion",\n'
        '      "meal_recommendation": "Local dishes to try",\n'
        '      "pro_tip": "Helpful tip"\n'
        '    }}\n'
        '  ]\n'
        "}}"
    )
    
    human_prompt = (
        "Create a {days}-day itinerary for {destination}.\n"
        "Budget: {budget}, Style: {travel_style}, Travelers: {travelers}."
    )
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        ("human", human_prompt),
    ])
    
    # Create the chain
    chain = prompt | llm
    
    # Invoke the chain
    result = chain.invoke({
        "destination": destination,
        "days": days,
        "budget": budget,
        "travel_style": travel_style,
        "travelers": travelers,
        "special_requests": special_requests if special_requests else "None",
        "pickup_location": pickup_location,
        "drop_location": drop_location,
        "waypoints": ", ".join(waypoints),
        "agency_context": agency_context
    })
    
    # Parse JSON from LLM string output
    text_content = result.content
    if isinstance(text_content, list):
        # Extract string if content is a list of blocks
        text_content = text_content[0].get("text", "") if text_content else ""
    elif not isinstance(text_content, str):
        text_content = str(text_content)
        
    text_content = text_content.strip()
    
    if text_content.startswith("```json"):
        text_content = text_content[7:]
    elif text_content.startswith("```"):
        text_content = text_content[3:]
        
    if text_content.endswith("```"):
        text_content = text_content[:-3]
        
    return json.loads(text_content.strip())

async def generate_langchain_itinerary_stream(
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
    agency_context: str = ""
):
    """Generates an itinerary using LangChain and yields text chunks asynchronously."""
    
    # Initialize the LLM
    llm = ChatGoogleGenerativeAI(
        model="gemini-3.5-flash-lite",
        google_api_key=api_key,
        temperature=0.7
    )
    
    # Use the same prompt from generate_langchain_itinerary
    # Define the Chat Prompt
    system_prompt = (
        "You are an expert, highly experienced travel planner. Your job is to create "
        "extremely detailed, realistic, and highly customized travel itineraries.\n"
        "You MUST ensure that the output strictly contains exactly {days} day objects in the 'days' array.\n"
        "You MUST ensure that every single day has unique and geographically realistic sightseeing activities.\n"
        "CRITICAL ROUTING RULES:\n"
        "1. DAY 1 SIGHTSEEING LOGIC: You must mentally calculate the driving time from the pickup point ({pickup_location}) to the first destination. \n"
        "   - If the drive time is greater than 6 hours, Day 1 MUST be dedicated entirely to travel and hotel check-in, with NO sightseeing.\n"
        "   - If the drive time is less than 6 hours, you MUST include local sightseeing on Day 1 afternoon/evening.\n"
        "   - The morning of Day 1 MUST explicitly state 'Pickup from {pickup_location}'.\n"
        "2. You must change the daily destinations logically to progress through the requested route/waypoints: {waypoints}. Do not stay in one place if multiple locations are provided.\n"
        "3. EXPLICIT SIGHTSEEING POINTS: For every day that involves sightseeing, you MUST explicitly name the exact points of interest, temples, monuments, valleys, and landmarks that will be covered. Do not use generic terms like 'explore local sights'. Name the actual places.\n"
        "4. The final day must end at the drop-off point ({drop_location}). The afternoon or evening of the final day MUST explicitly state 'Drop-off at {drop_location}'.\n"
        "5. COVERED PLACES ARRAY: You MUST populate the top-level `covered_places` array with a comprehensive, comma-separated list of ALL the specific temples, landmarks, and tourist spots you included in the daily itineraries.\n"
        "Special customer constraints to obey: {special_requests}\n\n"
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
        '      "stay_suggestion": "Accommodation suggestion",\n'
        '      "meal_recommendation": "Local dishes to try",\n'
        '      "pro_tip": "Helpful tip"\n'
        '    }}\n'
        '  ]\n'
        "}}"
    )
    
    human_prompt = (
        "Create a {days}-day itinerary for {destination}.\n"
        "Budget: {budget}, Style: {travel_style}, Travelers: {travelers}."
    )
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        ("human", human_prompt),
    ])
    
    chain = prompt | llm
    
    # We use astream to get chunks as they are generated
    async for chunk in chain.astream({
        "destination": destination,
        "days": days,
        "budget": budget,
        "travel_style": travel_style,
        "travelers": travelers,
        "special_requests": special_requests if special_requests else "None",
        "pickup_location": pickup_location,
        "drop_location": drop_location,
        "waypoints": ", ".join(waypoints),
        "agency_context": agency_context
    }):
        if isinstance(chunk.content, list):
            text_chunk = chunk.content[0].get("text", "") if chunk.content else ""
        else:
            text_chunk = str(chunk.content)
            
        if text_chunk:
            yield text_chunk
