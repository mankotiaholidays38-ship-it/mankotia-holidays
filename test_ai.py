import asyncio
import os
import sys

sys.path.append(r"c:\Users\Babita\Desktop\MankotiaHolidays")
from ai_service import generate_ai_itinerary_stream

async def test_fallback():
    # Call the stream endpoint directly to see what it yields
    try:
        async for chunk in generate_ai_itinerary_stream(
            destination="Goa", 
            days=4, 
            budget="Standard", 
            travel_style="Family", 
            travelers="2 Adults", 
            special_requests="", 
            pickup_location="Goa Airport", 
            drop_location="Goa Airport"
        ):
            print("CHUNK:", chunk)
    except Exception as e:
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    from dotenv import load_dotenv
    load_dotenv(r"c:\Users\Babita\Desktop\MankotiaHolidays\.env")
    asyncio.run(test_fallback())
