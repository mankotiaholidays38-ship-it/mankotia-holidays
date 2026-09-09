from typing import List, Optional
from datetime import datetime
import re
from pydantic import BaseModel, Field, field_validator, model_validator

# --- Main API Request Schemas ---

class InquiryRequest(BaseModel):
    name: str = Field(..., min_length=2, description="Customer full name")
    phone: str = Field(..., description="Indian mobile number")
    email: str = Field(..., min_length=3, description="Email address")
    destination: str = Field(..., min_length=2)
    travel_date: str = Field(..., min_length=2)
    pickup: str = Field(default="Haridwar / Dehradun", min_length=2)
    drop: str = Field(default="Haridwar / Dehradun", min_length=2)
    days: int = Field(default=4, ge=1, le=60)
    number_of_persons: int = Field(default=2, ge=1, le=1000)
    children: int = Field(default=0, ge=0, le=1000)
    child_ages: str = ""
    vehicle_category: str = Field(default="Sedan Car", min_length=2)
    rooms_required: int = Field(default=1, ge=1, le=500)
    meal_plan: str = Field(default="Breakfast Only (CP)", min_length=2)
    hotel_category: str = Field(default="3 Star", min_length=2)
    itinerary_text: str = ""
    travelers: Optional[str] = ""
    budget: Optional[str] = "Standard"
    notes: Optional[str] = ""
    source: Optional[str] = "Website Booking Form"

    @field_validator("phone")
    @classmethod
    def validate_indian_mobile(cls, value: str) -> str:
        normalized = re.sub(r"[\s()-]", "", value)
        if normalized.startswith("+91"):
            normalized = normalized[3:]
        if not re.fullmatch(r"[6-9]\d{9}", normalized):
            raise ValueError("Enter a valid Indian mobile number with exactly 10 digits.")
        return normalized

    @field_validator("travel_date")
    @classmethod
    def validate_travel_date(cls, value: str) -> str:
        if value:
            clean = value.strip()
            if re.match(r"^(\d{4})-(\d{2})-(\d{2})$", clean):
                try:
                    parsed = datetime.strptime(clean, "%Y-%m-%d").date()
                    if parsed < datetime.now().date():
                        raise ValueError("Selected travel date cannot be in the past.")
                except ValueError as e:
                    if "cannot be in the past" in str(e):
                        raise
        return value

    @model_validator(mode="after")
    def validate_child_ages(self):
        if self.children > 0 and not self.child_ages.strip():
            raise ValueError("Child ages are required when children are included.")
        return self


class TicketInquiryRequest(BaseModel):
    name: str = Field(..., min_length=2)
    phone: str = Field(..., description="Indian mobile number")
    email: str = Field(..., min_length=3)
    transit_type: str = Field(default="Domestic Flight")
    origin: str = Field(..., min_length=2)
    destination: str = Field(..., min_length=2)
    travel_date: str = Field(..., min_length=2)
    travel_class: str = Field(default="Economy")
    passengers: int = Field(default=1, ge=1, le=100)
    notes: Optional[str] = ""
    source: Optional[str] = "Website Ticket Form"

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str) -> str:
        return InquiryRequest.validate_indian_mobile(value)


class TransportInquiryRequest(BaseModel):
    name: str = Field(..., min_length=2)
    phone: str = Field(..., description="Indian mobile number")
    email: str = Field(..., min_length=3)
    vehicle_category: str = Field(default="Innova Crysta (7 Seater)")
    rental_type: str = Field(default="Outstation Round-Trip")
    pickup: str = Field(..., min_length=2)
    drop: str = Field(..., min_length=2)
    pickup_date: str = Field(..., min_length=2)
    duration_days: int = Field(default=1, ge=1, le=60)
    passengers: int = Field(default=2, ge=1, le=100)
    notes: Optional[str] = ""
    source: Optional[str] = "Website Transport & Cab Form"

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str) -> str:
        return InquiryRequest.validate_indian_mobile(value)


class ItineraryRequest(BaseModel):
    destination: str = Field(..., min_length=2)
    days: int = Field(default=4, ge=1, le=30)
    budget: Optional[str] = "Standard"
    travel_style: Optional[str] = "Family & Leisure"
    travelers: Optional[str] = "2 Adults"
    special_requests: Optional[str] = ""
    pickup_location: Optional[str] = None
    drop_location: Optional[str] = None


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1)
    history: Optional[List[dict]] = None


class AdminLoginRequest(BaseModel):
    password: str


class AdminQueryRequest(BaseModel):
    location: str
    query_type: str

class BulkDeleteRequest(BaseModel):
    lead_ids: List[str]


# --- Gemini Itinerary Schemas ---

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
