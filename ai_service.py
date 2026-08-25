import os
import re
import json
import urllib.parse
import requests
from typing import Optional, List, Dict
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
AGENCY_NAME = os.getenv("AGENCY_NAME", "Mankotia Holidays")
AGENCY_PHONE = os.getenv("AGENCY_PHONE", "+919816461616")
AGENCY_WHATSAPP = os.getenv("AGENCY_WHATSAPP", "919816461616")
AGENCY_EMAIL = os.getenv("AGENCY_EMAIL", "mankotiaholidays38@gmail.com")

def resolve_location_from_pincode_or_text(text: str) -> str:
    """If text contains a 6-digit Indian PIN code (e.g. 249401, 110037), resolves Area, District and State."""
    if not text:
        return ""
    pincode_match = re.search(r"\b([1-9][0-9]{5})\b", text)
    if pincode_match:
        pincode = pincode_match.group(1)
        try:
            headers = {"User-Agent": "Mozilla/5.0"}
            resp = requests.get(f"https://api.postalpincode.in/pincode/{pincode}", headers=headers, timeout=3)
            if resp.status_code == 200:
                data = resp.json()
                if data and data[0].get("Status") == "Success" and data[0].get("PostOffice"):
                    po = data[0]["PostOffice"][0]
                    area_name = po.get("Name", "")
                    district = po.get("District", "")
                    state = po.get("State", "")
                    resolved_label = f"{area_name}, {district} ({pincode}), {state}"
                    cleaned_text = re.sub(r"\b" + pincode + r"\b", "", text).strip(" ,-")
                    if cleaned_text and cleaned_text.lower() not in resolved_label.lower():
                        return f"{cleaned_text} ({resolved_label})"
                    return resolved_label
        except Exception:
            pass
    return text

# Standard transit hubs & waypoints for Google Maps identification
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

def resolve_transit_and_maps(
    destination: str,
    pickup_location: Optional[str] = None,
    drop_location: Optional[str] = None,
    days: int = 4
) -> dict:
    """Identifies pickup, drop, and full routing waypoints using Google Maps URL structures."""
    dest_lower = (destination or "").lower().strip()
    dest_normalized = dest_lower.replace(" ", "").replace("-", "")
    for key, data in DEFAULT_TRANSIT_HUBS.items():
        if key in dest_lower or key.replace(" ", "") in dest_normalized or any(wp.lower() in dest_lower for wp in data.get("waypoints", [])):
            matched_hub = data
            break
            
    raw_pickup = (pickup_location or "").strip()
    resolved_pickup = resolve_location_from_pincode_or_text(raw_pickup)
    if not resolved_pickup:
        resolved_pickup = matched_hub["pickup"] if matched_hub else f"{destination.title()} Airport / Main Railway Station"
        
    raw_drop = (drop_location or "").strip()
    resolved_drop = resolve_location_from_pincode_or_text(raw_drop)
    if not resolved_drop:
        resolved_drop = matched_hub["drop"] if matched_hub else resolved_pickup
        
    waypoints_list = matched_hub["waypoints"] if matched_hub else [destination.title()]
    
    # Construct Google Maps Directions URL
    encoded_origin = urllib.parse.quote_plus(resolved_pickup)
    encoded_dest = urllib.parse.quote_plus(resolved_drop)
    encoded_waypoints = urllib.parse.quote_plus("|".join(waypoints_list[:6]))
    
    google_maps_route_url = f"https://www.google.com/maps/dir/?api=1&origin={encoded_origin}&destination={encoded_dest}&waypoints={encoded_waypoints}"
    pickup_map_url = f"https://www.google.com/maps/search/?api=1&query={encoded_origin}"
    drop_map_url = f"https://www.google.com/maps/search/?api=1&query={encoded_dest}"
    
    route_summary = f"{resolved_pickup} -> {' -> '.join(waypoints_list[:3])} -> {resolved_drop}"
    
    return {
        "pickup_location": resolved_pickup,
        "drop_location": resolved_drop,
        "pickup_map_url": pickup_map_url,
        "drop_map_url": drop_map_url,
        "google_maps_route_url": google_maps_route_url,
        "route_summary": route_summary,
        "waypoints": waypoints_list
    }


# Predefined high-quality curated templates for instant fast response or offline fallback
POPULAR_DESTINATIONS = {
    "chardham": {
        "title": "Sacred Char Dham Yatra: Yamunotri, Gangotri, Kedarnath & Badrinath",
        "destination": "Char Dham (Uttarakhand)",
        "duration": "11 Days / 10 Nights",
        "estimated_cost_inr": "₹34,999 - ₹52,000 per person",
        "best_season": "May to June & September to November (Yatra Season)",
        "packing_essentials": [
            "Thermal innerwear & heavy fleece jackets",
            "Sturdy waterproof trekking shoes with ankle support",
            "Personal medical kit (Diamox, pain relievers, band-aids)",
            "Yatra Registration Slip & Aadhar Card originals + copies",
            "Rain poncho, umbrella & warm woollen socks",
            "Power banks and cash (limited ATMs in high altitudes)"
        ],
        "highlights": [
            "Divine blessings at all 4 sacred Himalayan Dhams",
            "Yamunotri Holy Bath at Surya Kund & Divya Shila",
            "Gangotri Temple Darshan on the banks of Bhagirathi",
            "Kedarnath Jyotirlinga Darshan with Helicopter / Trek Support",
            "Badrinath Ji Darshan, Tapt Kund Bath & Mana First Indian Village",
            "Scenic confluence darshan at Devprayag, Rudraprayag & Karnaprayag"
        ],
        "days": [
            {
                "day_number": 1,
                "theme": "Arrival, Pickup & Scenic Mountain Drive to Barkot",
                "morning": "Morning pickup by private chauffeur from pickup point. Scenic drive through foothills towards Barkot.",
                "afternoon": "En-route lunch overlooking Yamuna river valley. Drive via Yamuna Bridge towards Barkot.",
                "evening": "Check-in at Barkot luxury Himalayan camp/hotel. Briefing session for Yamunotri trek with hot herbal tea.",
                "meal_recommendation": "Wholesome hot Satvik vegetarian dinner (Dal, Roti, Seasonal Pahadi Sabzi).",
                "stay_suggestion": "Deluxe Alpine Resort / Riverview Swiss Camp in Barkot",
                "pro_tip": "Rest early to acclimatize and prepare for the next morning's Yamunotri trek."
            },
            {
                "day_number": 2,
                "theme": "Yamunotri Dham Darshan & Holy Thermal Springs",
                "morning": "Early 5:00 AM drive to Janki Chatti. Begin 6 km scenic trek to Yamunotri Temple (Pony/Palki available).",
                "afternoon": "Take holy dip in Surya Kund, cook rice pot as Mahaprasad, and seek blessings at Yamunotri Ji & Divya Shila.",
                "evening": "Trek back to Janki Chatti and drive to Barkot hotel. Relaxing leg massage and warm dinner.",
                "meal_recommendation": "Prasad cooked from sacred thermal spring & warm dinner at hotel.",
                "stay_suggestion": "Same Resort in Barkot",
                "pro_tip": "Start the trek early to avoid peak afternoon mountain heat and pony rush."
            },
            {
                "day_number": 3,
                "theme": "Barkot to Uttarkashi & Kashi Vishwanath Temple",
                "morning": "Post breakfast drive to Uttarkashi along the winding Bhagirathi River (approx. 4-5 hours).",
                "afternoon": "Check-in at riverside hotel in Uttarkashi. Freshen up and visit the ancient Lord Shiva Kashi Vishwanath Temple.",
                "evening": "Witness the divine Ganga Aarti on the banks of Bhagirathi and explore the local pilgrim market.",
                "meal_recommendation": "Local Garhwali Mandua ki Roti and Jhangora Kheer.",
                "stay_suggestion": "Riverside Hotel / Ashram Stay in Uttarkashi",
                "pro_tip": "Uttarkashi has decent mobile connectivity, complete any pending urgent calls here."
            },
            {
                "day_number": 4,
                "theme": "Gangotri Dham Holy Dip & Himalayan Vistas",
                "morning": "Early 6:00 AM drive through the scenic Harsil Valley, Apple Orchards, and towering deodar forests to Gangotri.",
                "afternoon": "Take a holy dip in icy Bhagirathi River and attend darshan & Puja at Gangotri Temple constructed by Amar Singh Thapa.",
                "evening": "Scenic return drive via Harsil Apple Valley. Stop for hot tea and photo stops in picturesque Harsil.",
                "meal_recommendation": "Warm ginger tea and hot satvik lunch near Gangotri ghats.",
                "stay_suggestion": "Same Hotel in Uttarkashi",
                "pro_tip": "Buy authentic local organic Harsil rajma and organic dried apples from local farmers."
            },
            {
                "day_number": 5,
                "theme": "Uttarkashi to Guptkashi / Sitapur (Kedarnath Base)",
                "morning": "Scenic drive via Ghansali & Tilwara through Mandakini Valley towards Guptkashi/Sitapur.",
                "afternoon": "En-route lunch stop. Arrive at Guptkashi, check-in, and register for next day's Kedarnath helicopter or trek slip.",
                "evening": "Visit the historic Ardhanarishwar Temple in Guptkashi. Yatra briefing and medical fitness check.",
                "meal_recommendation": "Warm energetic vegetarian meal and dry fruit snacks.",
                "stay_suggestion": "Premium Resort in Guptkashi / Sitapur",
                "pro_tip": "Pack a small 10L backpack for Kedarnath overnight stay; keep main luggage in the base hotel/cab."
            },
            {
                "day_number": 6,
                "theme": "Ascent to Sacred Kedarnath Dham & Evening Aarti",
                "morning": "Transfer to Helipad (Phata/Sirsi) for 10-min scenic helicopter flight, or drive to Sonprayag/Gaurikund for the holy 16 km trek.",
                "afternoon": "Reach Kedarnath Base (11,750 ft). Check-in at GMVN guest house / cottage near temple. Soak in views of Kedardome peaks.",
                "evening": "Witness the spellbinding Evening Maha Aarti at Kedarnath Temple amidst echoing conch shells and chants of Har Har Mahadev.",
                "meal_recommendation": "Hot Khichdi, Dal Tadka, and hot milk at temple bhojanalaya.",
                "stay_suggestion": "Deluxe Camp / GMVN Cottage near Kedarnath Temple",
                "pro_tip": "Temperatures drop below freezing at night in Kedarnath; wear thermals and windproof fleece."
            },
            {
                "day_number": 7,
                "theme": "Kedarnath Morning Abhishek & Descent to Guptkashi",
                "morning": "Early 5:00 AM visit for Lord Shiva Abhishek & Darshan. Visit Bhairavnath Temple for panoramic valley view.",
                "afternoon": "Board return helicopter flight or trek down to Gaurikund. Vehicle pickup from Sonprayag back to Guptkashi hotel.",
                "evening": "Relax and rejuvenate after the sacred darshan. Celebrate the successful Jyotirlinga darshan with a festive satvik dinner.",
                "meal_recommendation": "Special Kumaoni & Garhwali celebration thali.",
                "stay_suggestion": "Resort in Guptkashi / Pipalkoti",
                "pro_tip": "Stay well-hydrated with warm water or lemon water after downhill trek."
            },
            {
                "day_number": 8,
                "theme": "Guptkashi to Badrinath via Chopta & Joshimath",
                "morning": "Drive through the breathtaking Chopta forest ridge (Mini Switzerland) with vistas of Nanda Devi and Trishul peaks.",
                "afternoon": "Pass through Joshimath and arrive at Badrinath Dham (10,200 ft). Check-in at deluxe hotel near Alaknanda River.",
                "evening": "Take holy bath in natural thermal Tapt Kund and attend the evening Swarna Aarti at Badrinath Temple.",
                "meal_recommendation": "Traditional Vaishnav Bhojan (No onion, no garlic).",
                "stay_suggestion": "Deluxe Hotel / Ashram overlooking Neelkanth Peak in Badrinath",
                "pro_tip": "Tapt Kund water has natural sulfur which relieves fatigue from mountain travel."
            },
            {
                "day_number": 9,
                "theme": "Badrinath Darshan, Mana Village & Drive to Rudraprayag",
                "morning": "Early morning Mahabhishek darshan at Badrinath Ji. Visit Mana Village (Last/First village of India), Vyas Gufa, and Saraswati River Origin.",
                "afternoon": "Drive downwards via Vishnuprayag and Karnaprayag confluences towards Rudraprayag.",
                "evening": "Check-in at scenic riverside hotel in Rudraprayag overlooking Mandakini-Alaknanda Sangam.",
                "meal_recommendation": "Riverside dining with fresh hot Indian delicacies.",
                "stay_suggestion": "Riverside Resort in Rudraprayag / Srinagar (Garhwal)",
                "pro_tip": "Mana Village is famous for hand-knitted pure sheep wool sweaters and caps."
            },
            {
                "day_number": 10,
                "theme": "Rudraprayag to Rishikesh & Ganga Maha Aarti",
                "morning": "Drive towards Rishikesh. En-route stop at Devprayag to witness the sacred Sangam where Alaknanda and Bhagirathi merge to form Holy Ganga.",
                "afternoon": "Arrive in holy city Rishikesh. Check-in at hotel and visit Ram Jhula, Laxman Jhula & Beatles Ashram.",
                "evening": "Attend the divine Ganga Maha Aarti at Triveni Ghat with floating diyas and spiritual hymns.",
                "meal_recommendation": "Ayurvedic Satvik dinner at Chotiwala or riverside organic cafe.",
                "stay_suggestion": "4-Star Wellness & Spa Resort in Rishikesh",
                "pro_tip": "Triveni Ghat Aarti starts at sunset, arrive 30 minutes early for front-row seating."
            },
            {
                "day_number": 11,
                "theme": "Sacred Holy Bath, Return Journey & Drop at Departure Hub",
                "morning": "Post breakfast visit Mansa Devi & Chandi Devi temples via ropeway in Haridwar.",
                "afternoon": "Take a sacred bath at Har Ki Pauri and collect pure Gangajal for home.",
                "evening": "Transfer and drop at designated drop location with blessed hearts and lifetime memories.",
                "meal_recommendation": "Famous Haridwar Puri-Kachori & Rabri at Har Ki Pauri.",
                "stay_suggestion": "Drop at Destination / Onward Journey",
                "pro_tip": "Keep Gangajal in leak-proof copper containers available at Har Ki Pauri."
            }
        ]
    },
    "dodham": {
        "title": "Divine Do Dham Yatra: Kedarnath & Badrinath Express",
        "destination": "Kedarnath & Badrinath (Uttarakhand)",
        "duration": "6 Days / 5 Nights",
        "estimated_cost_inr": "₹22,500 - ₹36,000 per person",
        "best_season": "May to June & September to November",
        "packing_essentials": [
            "Heavy warm jacket & thermal sets",
            "Trekking shoes with high traction",
            "Yatra biometric slip & ID proof",
            "Emergency medical kit & portable oxygen can",
            "Raincoat & waterproof backpack cover"
        ],
        "highlights": [
            "Kedarnath Jyotirlinga darshan with Helicopter / Trek options",
            "Badrinath Ji Dham & Mana Village (First Indian Village)",
            "Natural hot sulfur bath at Tapt Kund",
            "Devprayag & Rudraprayag Sacred River Confluences",
            "Full private transfers from Haridwar / Rishikesh"
        ],
        "days": [
            {
                "day_number": 1,
                "theme": "Pickup & Scenic Drive to Guptkashi (Kedarnath Base)",
                "morning": "Early pickup from pickup location. Drive along scenic Alaknanda & Mandakini rivers via Devprayag Sangam.",
                "afternoon": "Stop for lunch in Srinagar (Garhwal). Drive through Rudraprayag towards Guptkashi.",
                "evening": "Check-in at Guptkashi resort. Visit ancient Vishwanath Temple and receive yatra briefing.",
                "meal_recommendation": "Wholesome hot Indian vegetarian buffet.",
                "stay_suggestion": "Deluxe Valley View Resort in Guptkashi / Sitapur",
                "pro_tip": "Recharge all electronics as power cuts can occur in higher mountain hamlets."
            },
            {
                "day_number": 2,
                "theme": "Ascent to Kedarnath Dham & Evening Swarna Aarti",
                "morning": "Early transfer to Helipad (Phata/Sirsi) or Gaurikund for trek up to Kedarnath Temple (11,750 ft).",
                "afternoon": "Reach Kedarnath, check in at GMVN / camp close to the shrine. Marvel at the grand Himalayan peaks.",
                "evening": "Participate in the divine Kedarnath Evening Maha Aarti and feel the immense spiritual energy.",
                "meal_recommendation": "Hot Dal Khichdi and herbal ginger tea.",
                "stay_suggestion": "Camp / Cottage in Kedarnath Dham",
                "pro_tip": "Wear two layers of warm socks and keep ear muffs handy for the cold evening winds."
            },
            {
                "day_number": 3,
                "theme": "Kedarnath Morning Puja & Drive to Pipalkoti / Joshimath",
                "morning": "Attend morning Abhishek Darshan at Kedarnath Temple and visit Bhairav Temple.",
                "afternoon": "Fly down via Helicopter or trek down to base. Board vehicle and proceed towards Pipalkoti.",
                "evening": "Check-in at hotel in Pipalkoti. Relax after the high-altitude trek.",
                "meal_recommendation": "Hot North Indian dinner.",
                "stay_suggestion": "Deluxe Hotel in Pipalkoti / Joshimath",
                "pro_tip": "Soak in hot water bath to relieve muscle soreness."
            },
            {
                "day_number": 4,
                "theme": "Pipalkoti to Badrinath Ji & Mana Exploration",
                "morning": "Scenic drive to Badrinath Dham (10,200 ft). Check in at hotel near temple.",
                "afternoon": "Take dip in therapeutic Tapt Kund and perform darshan at Badrinath Temple.",
                "evening": "Explore Mana Village (First Village of India), Saraswati River, Vyas Cave, and Bheem Pul.",
                "meal_recommendation": "Traditional Satvik Bhojan near Badrinath Temple.",
                "stay_suggestion": "Deluxe Hotel in Badrinath / Joshimath",
                "pro_tip": "Taste authentic herbal tea at the 'Last Tea Stall of India' in Mana."
            },
            {
                "day_number": 5,
                "theme": "Badrinath to Rudraprayag / Srinagar",
                "morning": "Attend morning Vishnu Sahasranama puja at Badrinath Ji.",
                "afternoon": "Drive downwards via Vishnuprayag and Karnaprayag. Scenic lunch stop.",
                "evening": "Check-in at riverside resort in Rudraprayag. Evening relaxation by the river.",
                "meal_recommendation": "Pahadi Thali with Bhatt ki Churkani and rice.",
                "stay_suggestion": "Riverside Resort in Rudraprayag",
                "pro_tip": "Enjoy the sound of Alaknanda River from your balcony."
            },
            {
                "day_number": 6,
                "theme": "Rudraprayag to Rishikesh & Drop-off at Drop Hub",
                "morning": "Drive towards Rishikesh with a stop at Devprayag for sacred photos.",
                "afternoon": "Arrive in Rishikesh, visit Ram Jhula & Parmarth Niketan.",
                "evening": "Drop-off at drop location with divine blessings of Kedarnath & Badrinath.",
                "meal_recommendation": "Fresh hot Jalebi and Puri at Haridwar.",
                "stay_suggestion": "Drop at Destination / Onward Journey",
                "pro_tip": "Carry blessed Prasad and Rudraksha beads from Kedarnath back for family."
            }
        ]
    },
    "uttarakhand": {
        "title": "Jewels of Uttarakhand: Nainital, Jim Corbett, Mussoorie & Rishikesh",
        "destination": "Uttarakhand",
        "duration": "6 Days / 5 Nights",
        "estimated_cost_inr": "₹17,999 - ₹28,000 per person",
        "best_season": "Round the year (Winter snow in Mussoorie/Nainital, Wildlife in Corbett Oct-June)",
        "packing_essentials": [
            "Comfortable layered casuals & light warm fleece",
            "Jungle safari hats & earth-tone clothes (green/khaki)",
            "Binoculars & DSLR / High-zoom camera",
            "Walking sneakers for mall road and nature trails"
        ],
        "highlights": [
            "Boating on Emerald Naini Lake & Naina Devi Temple",
            "Open Jeep Tiger Safari in Jim Corbett National Park",
            "Queen of Hills Mussoorie & Kempty Waterfalls",
            "Rishikesh Triveni Ghat Maha Aarti & River Rafting",
            "Luxury jungle resorts and hill-view stays"
        ],
        "days": [
            {
                "day_number": 1,
                "theme": "Pickup & Scenic Drive to Nainital (Lake District)",
                "morning": "Pickup from pickup location and morning scenic drive towards Nainital.",
                "afternoon": "Check-in at lake-facing hotel. Enjoy boating on emerald Naini Lake and visit sacred Naina Devi Temple.",
                "evening": "Stroll down vibrant Mall Road, shop for designer handmade candles and pine crafts.",
                "meal_recommendation": "Momos and Thukpa at Tibetan Market & Bal Mithai from local sweet shop.",
                "stay_suggestion": "Heritage Lake-view Hotel in Nainital",
                "pro_tip": "Take the ropeway to Snow View Point for a panoramic vista of the Himalayan peaks."
            },
            {
                "day_number": 2,
                "theme": "Nainital Lake Tour (Bhimtal, Sattal, Naukuchiatal)",
                "morning": "Excursion to Bhimtal with its island aquarium, Sattal (cluster of seven lakes), and Naukuchiatal (nine-cornered lake).",
                "afternoon": "Enjoy kayaking or paragliding at Naukuchiatal with lakeside lunch.",
                "evening": "Sunset at Tiffin Top (Dorothy's Seat) followed by cozy dinner.",
                "meal_recommendation": "Pahadi Kumaoni platter with Gahat soup.",
                "stay_suggestion": "Same Hotel in Nainital",
                "pro_tip": "Sattal is a paradise for birdwatching; keep your camera ready."
            },
            {
                "day_number": 3,
                "theme": "Nainital to Jim Corbett Tiger Reserve & Jungle Vibe",
                "morning": "Drive down to Jim Corbett National Park via Corbett Waterfalls.",
                "afternoon": "Check-in at luxury riverside jungle resort along the Kosi River. Afternoon at leisure by the pool.",
                "evening": "Enjoy wildlife documentary screening, jungle bonfire, and live acoustic folk music.",
                "meal_recommendation": "Barbecue dinner by the riverside lawns.",
                "stay_suggestion": "4-Star Wilderness Resort / Jungle Lodge in Corbett",
                "pro_tip": "Relax early for the 5:30 AM morning jungle safari."
            },
            {
                "day_number": 4,
                "theme": "Jeep Tiger Safari & Drive to Mussoorie (Queen of Hills)",
                "morning": "Thrilling 4x4 open jeep safari into Jim Corbett Reserve (Bijrani/Jhirna/Dhela zone) to spot Bengal tigers and wild elephants.",
                "afternoon": "Return for heavy breakfast, check out and drive towards Mussoorie (Queen of Hills).",
                "evening": "Arrive in Mussoorie. Check-in and enjoy sunset stroll along the historic Mall Road & Camel's Back Road.",
                "meal_recommendation": "Wood-fired pizza and hot chocolate at Cafe By The Way or Urban Turban.",
                "stay_suggestion": "Colonial Hill Resort in Mussoorie",
                "pro_tip": "Carry binoculars for high-visibility wildlife spotting on safari."
            },
            {
                "day_number": 5,
                "theme": "Mussoorie Highlights: Kempty Falls, Gun Hill & George Everest",
                "morning": "Visit roaring Kempty Waterfalls and take the Gun Hill cable car ride.",
                "afternoon": "Visit historic Sir George Everest House with dramatic 360-degree views of Doon Valley and snow peaks.",
                "evening": "Drive down to Rishikesh. Attend the famous sunset Ganga Maha Aarti with echoing Vedic mantras.",
                "meal_recommendation": "Fresh bakery treats at Landour Bakehouse in Mussoorie.",
                "stay_suggestion": "Riverside Wellness Resort in Rishikesh",
                "pro_tip": "Visit Landour (upper Mussoorie) for vintage British charm and peanut butter made locally."
            },
            {
                "day_number": 6,
                "theme": "Rishikesh Adventure, Return Drive & Drop-off",
                "morning": "White-water river rafting on River Ganga (Shivpuri to Rishikesh) and cliff jumping.",
                "afternoon": "Visit Ram Jhula, Laxman Jhula, and the world-famous Beatles Ashram.",
                "evening": "Transfer and drop-off at designated drop location for your onward journey.",
                "meal_recommendation": "Organic Ayurvedic thali at Chotiwala Rishikesh.",
                "stay_suggestion": "Drop at Destination / Onward Journey",
                "pro_tip": "Wear quick-drying clothes and waterproof footwear for river rafting."
            }
        ]
    },
    "auli": {
        "title": "Auli Ski Paradise & Chopta-Tungnath Himalayan Odyssey",
        "destination": "Auli & Chopta (Uttarakhand)",
        "duration": "5 Days / 4 Nights",
        "estimated_cost_inr": "₹15,999 - ₹24,000 per person",
        "best_season": "Dec to March for Skiing & Snow; April to Nov for lush green meadows & trekking",
        "packing_essentials": [
            "Heavy waterproof snow jacket & pants",
            "UV sunglasses (essential for snow glare)",
            "Trekking shoes with high grip",
            "Thermals, gloves, woolen beanie, and sunscreen SPF 50+"
        ],
        "highlights": [
            "Auli Ropeway (one of Asia's highest and longest cable cars)",
            "Chopta 'Mini Switzerland' Bugyals & pine meadows",
            "Tungnath Temple (World's highest Shiva Temple at 12,073 ft)",
            "Chandrashila Peak 360-degree Himalayan summit trek",
            "Pristine Deoriatal high-altitude lake camping"
        ],
        "days": [
            {
                "day_number": 1,
                "theme": "Pickup & Scenic Drive to Chopta via Devprayag",
                "morning": "Pickup from pickup location and scenic drive through the Garhwal Himalayas. Stop at Devprayag Sangam.",
                "afternoon": "Drive through dense oak and rhododendron forests towards Chopta.",
                "evening": "Check-in at scenic alpine camps/cottages in Chopta. Sunset view of Chaukhamba peaks.",
                "meal_recommendation": "Steaming hot Garhwali dal, rice, and fresh rotis.",
                "stay_suggestion": "Eco Swiss Tent / Wooden Cottage in Chopta",
                "pro_tip": "Chopta offers unmatched dark-sky stargazing; step out at night to see the Milky Way."
            },
            {
                "day_number": 2,
                "theme": "Tungnath Temple & Chandrashila Peak Summit Trek",
                "morning": "Early 5:30 AM trek from Chopta to ancient Tungnath Temple (3.5 km).",
                "afternoon": "Push 1.5 km further to Chandrashila Summit (13,000 ft) for a jaw-dropping 360° panorama of Nanda Devi, Trishul, and Kedardome.",
                "evening": "Descend back to Chopta camp. Enjoy hot ginger tea by the campfire.",
                "meal_recommendation": "Warm Maggi and tea at Tungnath top followed by wholesome dinner.",
                "stay_suggestion": "Same Camp in Chopta",
                "pro_tip": "Carry a trekking pole to reduce strain on knees during descent."
            },
            {
                "day_number": 3,
                "theme": "Chopta to Auli (Skiing Capital of India)",
                "morning": "Scenic drive from Chopta via Gopeshwar & Joshimath towards Auli.",
                "afternoon": "Board the famous Joshimath-Auli Cable Car (4 km long) soaring over oak forests.",
                "evening": "Arrive at Auli (9,200 ft). Check-in at ski resort with direct view of Nanda Devi.",
                "meal_recommendation": "Hot Indian and Continental dinner with mountain views.",
                "stay_suggestion": "Luxury Ski Resort / GMVN Auli Cottage",
                "pro_tip": "Keep your camera ready during the cable car ride for aerial valley shots."
            },
            {
                "day_number": 4,
                "theme": "Auli Skiing, Artificial Lake & Gorson Bugyal Trek",
                "morning": "Enjoy skiing lessons on international-standard slopes or take chairlift rides.",
                "afternoon": "Trek 3 km to the breathtaking Gorson Bugyal alpine meadows and artificial lake.",
                "evening": "Spectacular golden sunset over Nanda Devi peak from the resort deck.",
                "meal_recommendation": "Hot soups, grilled snacks, and buffet dinner.",
                "stay_suggestion": "Same Ski Resort in Auli",
                "pro_tip": "Hire ski gear and instructors directly from approved GMVN counters."
            },
            {
                "day_number": 5,
                "theme": "Auli Return Drive & Farewell Drop",
                "morning": "Descend via ropeway to Joshimath and commence return drive along the Alaknanda river.",
                "afternoon": "En-route lunch stop at Karnaprayag or Srinagar.",
                "evening": "Drop-off at designated drop location with unforgettable memories of Uttarakhand peaks.",
                "meal_recommendation": "Riverside cafe snacks in Rishikesh.",
                "stay_suggestion": "Drop at Destination / Onward Journey",
                "pro_tip": "Start early to reach airport/railway station comfortably before scheduled departure."
            }
        ]
    },
    "manali": {
        "title": "Enchanting Manali, Solang & Atal Tunnel Adventure",
        "destination": "Manali (Himachal Pradesh)",
        "duration": "4 Days / 3 Nights",
        "estimated_cost_inr": "₹12,999 - ₹18,500 per person",
        "best_season": "October to June (Snow in Dec-Feb)",
        "packing_essentials": ["Heavy woolens & windcheater", "Trekking shoes with good grip", "Sunglasses & Sunscreen SPF 50+", "Thermals & gloves"],
        "highlights": ["Solang Valley Adventure Sports", "Atal Tunnel & Sissu Lahaul Valley", "Hadimba Temple & Old Manali Cafes", "Jogini Waterfalls Trek", "Mall Road Shopping"],
        "days": [
            {
                "day_number": 1,
                "theme": "Pickup & Scenic Himalayan Drive to Manali",
                "morning": "Pickup from pickup location. Scenic drive through Beas valley, Pandoh Dam, and Kullu.",
                "afternoon": "Check-in at scenic mountain resort. Freshen up and enjoy welcome Himalayan spiced tea.",
                "evening": "Visit the 500-year-old wooden Hadimba Temple and explore bohemian Old Manali cafes.",
                "meal_recommendation": "Authentic Siddu with ghee at Cafe 1947.",
                "stay_suggestion": "Luxury Riverview Cottage / 4-Star Mountain Resort",
                "pro_tip": "Rent electric scooters for easy maneuvering around Old Manali's narrow streets."
            },
            {
                "day_number": 2,
                "theme": "Solang Valley & Atal Tunnel to Sissu (Lahaul)",
                "morning": "Drive towards Solang Valley for paragliding, zorbing, and quad biking.",
                "afternoon": "Drive through the engineering marvel 'Atal Tunnel' into breathtaking Sissu Valley.",
                "evening": "Return to Manali. Relax by a riverside bonfire with live acoustic music.",
                "meal_recommendation": "Steaming hot Thukpa and momos near Sissu waterfall.",
                "stay_suggestion": "Same Resort in Manali",
                "pro_tip": "Carry cash as network payments can be intermittent in Lahaul Valley."
            },
            {
                "day_number": 3,
                "theme": "Jogini Waterfall Trek & Vashisht Hot Sulphur Springs",
                "morning": "Leisurely morning trek from Vashisht Village through apple orchards to Jogini Waterfalls.",
                "afternoon": "Dip your feet in the natural therapeutic hot sulphur springs at Vashisht Temple.",
                "evening": "Spend sunset at Tibetan Monastery, spin prayer wheels, and pick authentic handicrafts.",
                "meal_recommendation": "Traditional Himachali Dham platter for dinner.",
                "stay_suggestion": "Same Resort in Manali",
                "pro_tip": "Wear comfortable waterproof shoes for the Jogini trek."
            },
            {
                "day_number": 4,
                "theme": "Naggar Castle Heritage, Return Drive & Drop",
                "morning": "Visit historical Naggar Castle (former royal seat) and Nicholas Roerich Art Gallery.",
                "afternoon": "Enjoy river rafting in Kullu (Beas River) and visit Vaishno Devi Temple cave.",
                "evening": "Return drive and drop-off at designated drop location with snow-clad memories.",
                "meal_recommendation": "Fresh Himalayan trout fish lunch at Naggar German Bakery.",
                "stay_suggestion": "Drop at Destination / Onward Journey",
                "pro_tip": "Buy pure organic apple jams and wildflower honey in Naggar."
            }
        ]
    },
    "kashmir": {
        "title": "Paradise on Earth: Srinagar, Gulmarg & Pahalgam",
        "destination": "Kashmir Valley",
        "duration": "5 Days / 4 Nights",
        "estimated_cost_inr": "₹21,500 - ₹32,000 per person",
        "best_season": "Year-round (Tulips in Spring, Snow in Winter, Lush Green in Summer)",
        "packing_essentials": ["Warm layers & Pashmina shawl", "Lip balm & moisturizer", "Comfortable walking boots", "Kashmiri Kahwa mix"],
        "highlights": ["Dal Lake Luxury Houseboat Stay", "Shikara Ride at Floating Market", "Gulmarg Gondola Ride Phase 1 & 2", "Betaab Valley in Pahalgam", "Mughal Gardens"],
        "days": [
            {
                "day_number": 1,
                "theme": "Arrival, Pickup & Romantic Dal Lake Shikara",
                "morning": "Pickup from pickup location. Transfer to a handcrafted cedarwood luxury Houseboat on Dal Lake.",
                "afternoon": "Sunset Shikara ride through floating gardens, lotus swamps, and Char Chinar.",
                "evening": "Relish a warm cup of Saffron Kashmiri Kahwa on the houseboat deck.",
                "meal_recommendation": "Authentic 7-course Kashmiri Wazwan (Rogan Josh, Gustaba, Rista).",
                "stay_suggestion": "Heritage Deluxe Houseboat on Dal Lake",
                "pro_tip": "Bargain politely when buying saffron and pashminas from floating vendors."
            },
            {
                "day_number": 2,
                "theme": "Gulmarg Meadow of Flowers & World's Highest Gondola",
                "morning": "Drive to Gulmarg via pine-clad passes. Board Gulmarg Gondola to Phase 1 & Phase 2.",
                "afternoon": "Try snow skiing, sledging, or enjoy hot Kahwa amidst 14,000 ft snow peaks.",
                "evening": "Visit the historic St. Mary's Church and Gulmarg Golf Course before returning.",
                "meal_recommendation": "Dum Aloo and Nadru Yakhni (lotus stem curry).",
                "stay_suggestion": "Cozy Pine Resort in Gulmarg / Srinagar",
                "pro_tip": "Book Gondola tickets in advance online to avoid ticket queues."
            },
            {
                "day_number": 3,
                "theme": "Pahalgam Valley of Shepherds & Lidder River",
                "morning": "Scenic drive to Pahalgam. En route stop at the purple saffron fields of Pampore.",
                "afternoon": "Arrive in Pahalgam. Walk alongside the crystal clear Lidder River.",
                "evening": "Relax at your resort, roast marshmallows by the fire, or browse walnut wood carvings.",
                "meal_recommendation": "Trout fish tandoori and saffron rice.",
                "stay_suggestion": "Riverside Boutique Hotel in Pahalgam",
                "pro_tip": "Pahalgam is cooler in evenings, carry a windbreaker."
            },
            {
                "day_number": 4,
                "theme": "Betaab Valley, Chandanwari & Aru Valley",
                "morning": "Hire local union cab to visit Betaab Valley with its lush rolling lawns.",
                "afternoon": "Explore picturesque Aru Valley and Chandanwari.",
                "evening": "Return drive to Srinagar. Sunset visit to Hazratbal Shrine overlooking Dal Lake.",
                "meal_recommendation": "Mutton Kanti with Lavasa bread.",
                "stay_suggestion": "Luxury Hotel in Srinagar",
                "pro_tip": "Aru Valley is ideal for pony rides and panoramic photography."
            },
            {
                "day_number": 5,
                "theme": "Mughal Gardens, Souvenir Shopping & Drop at Airport",
                "morning": "Tour Shalimar Bagh, Nishat Bagh, and Chashme Shahi.",
                "afternoon": "Visit Lal Chowk for fresh walnuts, mamra badam, and pure saffron.",
                "evening": "Transfer and drop at designated drop location with heart full of heavenly memories.",
                "meal_recommendation": "Bakarkhani and Noon Chai at Ahdoos Restaurant.",
                "stay_suggestion": "Drop at Destination / Onward Journey",
                "pro_tip": "Reach airport 3 hours prior due to mountain flight security check-ins."
            }
        ]
    },
    "rajasthan": {
        "title": "Royal Rajasthan Heritage: Jaipur, Jodhpur & Udaipur",
        "destination": "Rajasthan",
        "duration": "6 Days / 5 Nights",
        "estimated_cost_inr": "₹24,000 - ₹38,000 per person",
        "best_season": "October to March (Pleasant Royal Winter)",
        "packing_essentials": ["Cotton layered clothing & sunglasses", "Comfortable walking slip-ons for fort tours", "Sun hat and SPF 40+ sunscreen", "Camera for majestic palace architecture"],
        "highlights": ["Amber Fort & City Palace Jaipur", "Hawa Mahal & Jantar Mantar", "Mehrangarh Fort & Jaswant Thada Jodhpur", "Lake Pichola Sunset Boat Cruise Udaipur", "Live Rajasthani Folk Dance & Puppet Show"],
        "days": [
            {
                "day_number": 1,
                "theme": "Pickup & Royal Welcome to the Pink City (Jaipur)",
                "morning": "Pickup from pickup location. Transfer to heritage haveli hotel in Jaipur.",
                "afternoon": "Visit City Palace, Chandra Mahal museum, and the celestial Jantar Mantar observatory.",
                "evening": "Photo stop at facade of Hawa Mahal (Palace of Winds) and shopping in Johari Bazaar.",
                "meal_recommendation": "Dal Baati Churma, Gatte ki Sabzi & Pyaaz Kachori at LMB.",
                "stay_suggestion": "Heritage Haveli Resort in Jaipur",
                "pro_tip": "Try block printing workshop in Jaipur old city."
            },
            {
                "day_number": 2,
                "theme": "Amber Fort Elephant Ridge, Nahargarh & Jaigarh",
                "morning": "Ascend to grand Amber Fort with ornate Sheesh Mahal (Mirror Palace).",
                "afternoon": "Visit Jaigarh Fort (housing the world's largest cannon Jaivana) & Jal Mahal water palace.",
                "evening": "Panoramic sunset over Jaipur city from Nahargarh Fort ramparts.",
                "meal_recommendation": "Royal Rajasthani Thali with Ker Sangri.",
                "stay_suggestion": "Same Heritage Haveli in Jaipur",
                "pro_tip": "Visit Nahargarh just before sunset for breathtaking golden-hour views."
            },
            {
                "day_number": 3,
                "theme": "Jaipur to Jodhpur via Sacred Pushkar Lake",
                "morning": "Drive towards the Blue City (Jodhpur) via holy town of Pushkar.",
                "afternoon": "Visit Lord Brahma Temple and the 52 sacred bathing ghats of Pushkar Lake.",
                "evening": "Arrive in Jodhpur. Check-in and witness sunset over the azure blue Brahmin houses.",
                "meal_recommendation": "Makhaniya Lassi at Mishrilal Hotel & Mirchi Vada.",
                "stay_suggestion": "Palace-view Boutique Hotel in Jodhpur",
                "pro_tip": "Pushkar rose water and gulkand make wonderful souvenirs."
            },
            {
                "day_number": 4,
                "theme": "Mehrangarh Fort & Drive to Udaipur (City of Lakes)",
                "morning": "Explore the impregnable Mehrangarh Fort towering 400 feet above Jodhpur city.",
                "afternoon": "Visit the white marble cenotaph Jaswant Thada, then drive towards Udaipur via Ranakpur Jain Temple.",
                "evening": "Arrive in romantic Udaipur (Venice of the East). Check-in at lakeside resort.",
                "meal_recommendation": "Laal Maas and hot bajre ki roti in Jodhpur.",
                "stay_suggestion": "Lakeside Heritage Resort in Udaipur",
                "pro_tip": "Ranakpur's 1,444 uniquely carved marble pillars are an architectural marvel."
            },
            {
                "day_number": 5,
                "theme": "Udaipur City Palace & Romantic Lake Pichola Cruise",
                "morning": "Tour the grand Udaipur City Palace complex overlooking Lake Pichola.",
                "afternoon": "Visit Saheliyon-ki-Bari (Courtyard of Maidens) and Jagdish Temple.",
                "evening": "Sunset motorboat cruise on Lake Pichola past Jag Mandir Island Palace with illuminated reflections.",
                "meal_recommendation": "Candlelight rooftop dinner overlooking illuminated City Palace.",
                "stay_suggestion": "Same Lakeside Resort in Udaipur",
                "pro_tip": "Book the 5:00 PM sunset boat cruise for magical reflections on water."
            },
            {
                "day_number": 6,
                "theme": "Sajjangarh Monsoon Palace, Return Drive & Drop",
                "morning": "Visit hilltop Sajjangarh (Monsoon Palace) with panoramic vistas of Udaipur lakes and Aravali hills.",
                "afternoon": "Browse Udaipur miniature paintings and silver jewelry at Shilpgram arts village.",
                "evening": "Transfer and drop-off at designated drop location with regal memories.",
                "meal_recommendation": "Fresh Mewari kachoris and Kulhad Chai.",
                "stay_suggestion": "Drop at Destination / Onward Journey",
                "pro_tip": "Keep palace entrance tickets handy for photography permits."
            }
        ]
    },
    "goa": {
        "title": "Tropical Goa Beach, Water Sports & Cruise Holiday",
        "destination": "Goa",
        "duration": "4 Days / 3 Nights",
        "estimated_cost_inr": "₹14,500 - ₹22,000 per person",
        "best_season": "October to May (Sunny Beach & Water Sports Season)",
        "packing_essentials": ["Beachwear & flip-flops", "Sunblock lotion SPF 50 & UV sunglasses", "Cotton linen shirts & shorts", "Waterproof mobile pouch"],
        "highlights": ["Baga & Calangute Beach Water Sports (Parasailing, Jet Ski)", "Historic Aguada Fort & Chapora Dil Chahta Hai Fort", "Sunset Mandovi River Cruise with Live DJ", "Old Goa Basilica of Bom Jesus & Fontainhas Latin Quarter", "Beachfront Candlelight Seafood Dinner"],
        "days": [
            {
                "day_number": 1,
                "theme": "Pickup, North Goa Arrival & Sunset Beach Shack",
                "morning": "Pickup from pickup location. Transfer to beach resort in North Goa (Candolim/Calangute).",
                "afternoon": "Check-in, relax by the pool, and head to Candolim beach for gentle ocean breeze.",
                "evening": "Sunset cocktails, live acoustic music, and fresh seafood at iconic beach shack.",
                "meal_recommendation": "Goan Fish Curry Rice and butter garlic prawns.",
                "stay_suggestion": "4-Star Beachfront Luxury Resort in Candolim / Baga",
                "pro_tip": "Rent an open-top Thar or scooter to explore scenic coastal roads."
            },
            {
                "day_number": 2,
                "theme": "Forts, Water Sports & Sunset Mandovi Cruise",
                "morning": "Visit 17th-century Portuguese Aguada Fort and lighthouse with Arabian Sea vistas.",
                "afternoon": "Thrill with parasailing, banana boat ride, and jet skiing at Calangute/Anjuna beach.",
                "evening": "1-hour sunset cruise on Mandovi River in Panaji with Goan folk dance and DJ.",
                "meal_recommendation": "Portuguese Peri-Peri Chicken & Bebinca dessert.",
                "stay_suggestion": "Same Beachfront Resort in North Goa",
                "pro_tip": "Carry extra change of dry clothes in a daypack for water sports."
            },
            {
                "day_number": 3,
                "theme": "South Goa Heritage, Old Goa Churches & Spice Plantation",
                "morning": "Tour UNESCO Heritage Basilica of Bom Jesus and Se Cathedral in Old Goa.",
                "afternoon": "Walk through colorful Portuguese heritage houses in Fontainhas Latin Quarter; visit Sahakari Spice Farm for traditional buffet.",
                "evening": "Sunset at serene Colva / Miramar Beach with golden sand shores.",
                "meal_recommendation": "Traditional Goan Hindu buffet served on banana leaves at spice farm.",
                "stay_suggestion": "Same Resort in North/South Goa",
                "pro_tip": "Fontainhas colorful streets are the most Instagrammable photography spot in Goa."
            },
            {
                "day_number": 4,
                "theme": "Chapora Fort, Flea Market, Souvenirs & Drop",
                "morning": "Visit Chapora Fort (famous from 'Dil Chahta Hai') overlooking Vagator beach.",
                "afternoon": "Pick up feni, cashews, Goan spices, and handicrafts at Panaji market.",
                "evening": "Transfer and drop-off at designated drop location for onward journey.",
                "meal_recommendation": "Wood-fired thin crust pizza at Thalassa or Olive Bar & Kitchen Vagator.",
                "stay_suggestion": "Drop at Destination / Onward Journey",
                "pro_tip": "Keep roasted cashews in airtight packaging for flight travel."
            }
        ]
    },
    "kerala": {
        "title": "God's Own Country: Munnar, Thekkady & Alleppey Houseboat",
        "destination": "Kerala",
        "duration": "5 Days / 4 Nights",
        "estimated_cost_inr": "₹18,500 - ₹29,000 per person",
        "best_season": "September to March (Lush Green & Cool Climate)",
        "packing_essentials": ["Light cottons & light jacket for Munnar hills", "Comfortable walking shoes & insect repellent", "Umbrella/rain poncho", "Camera for tea gardens & backwaters"],
        "highlights": ["Munnar Endless Emerald Tea Plantations & Eravikulam Nilgiri Tahr", "Cheeyappara & Valara Waterfalls", "Thekkady Periyar Wildlife Boat Safari & Spice Gardens", "Alleppey Luxury Private Houseboat Cruise on Vembanad Lake", "Kathakali Classical Dance & Kalaripayattu Martial Arts"],
        "days": [
            {
                "day_number": 1,
                "theme": "Pickup & Scenic Mountain Drive to Munnar Hills",
                "morning": "Pickup from pickup location. Scenic drive through lush Western Ghats towards Munnar.",
                "afternoon": "Stop at Cheeyappara and Valara waterfalls amidst misty hills and tea slopes.",
                "evening": "Check-in at valley-view mountain resort. Stroll through fragrant tea gardens with fresh cardamom tea.",
                "meal_recommendation": "Authentic Kerala Sadya with Appam, Stew, and Avial.",
                "stay_suggestion": "Luxury Tea Plantation Resort in Munnar",
                "pro_tip": "Munnar evenings are chilly, keep a light shawl or sweater handy."
            },
            {
                "day_number": 2,
                "theme": "Eravikulam National Park, Mattupetty Dam & Echo Point",
                "morning": "Visit Eravikulam National Park to spot the endangered Nilgiri Tahr against rolling green hills.",
                "afternoon": "Boating at Mattupetty Dam, photo stop at Echo Point and Kundala Arch Dam.",
                "evening": "Visit Tata Tea Museum to learn the art of tea processing and sample premium single-estate brews.",
                "meal_recommendation": "Malabar Parotta with Kerala style chicken/vegetable roast.",
                "stay_suggestion": "Same Tea Resort in Munnar",
                "pro_tip": "Book Eravikulam safari tickets online to skip morning entrance lines."
            },
            {
                "day_number": 3,
                "theme": "Munnar to Thekkady (Periyar Wildlife Sanctuary)",
                "morning": "Scenic drive to Thekkady passing spice-scented plantations of pepper, cardamom, and clove.",
                "afternoon": "Boat cruise on Periyar Lake inside the wildlife sanctuary to spot wild elephants, bison, and exotic birds.",
                "evening": "Watch traditional Kathakali dance and ancient Kalaripayattu martial arts performance.",
                "meal_recommendation": "Karimeen Pollichathu (Pearl spot fish wrapped in banana leaf) or spicy Kerala mushroom fry.",
                "stay_suggestion": "Spice Village / Eco Nature Resort in Thekkady",
                "pro_tip": "Buy GI-tagged green cardamom and organic black pepper directly from spice farms."
            },
            {
                "day_number": 4,
                "theme": "Thekkady to Alleppey Luxury Houseboat Experience",
                "morning": "Drive down towards the Venice of the East (Alleppey Backwaters).",
                "afternoon": "12:30 PM check-in to private traditional Kettuvallam luxury Houseboat with private chef and crew.",
                "evening": "Cruise through tranquil palm-fringed canals, Vembanad Lake, paddy fields, and enjoy sunset on deck.",
                "meal_recommendation": "Freshly caught Pearl Spot fish fry, Kerala red rice, sambar, and payasam prepared live on houseboat.",
                "stay_suggestion": "Deluxe Air-Conditioned Private Houseboat in Alleppey",
                "pro_tip": "Houseboats anchor in scenic lagoons by 5:30 PM as per Kerala backwater regulations."
            },
            {
                "day_number": 5,
                "theme": "Morning Backwater Cruise, Cochin Sightseeing & Drop",
                "morning": "Watch village life wake up by backwaters with morning tea; checkout at 9:00 AM.",
                "afternoon": "Drive to historic Fort Kochi, see iconic Chinese Fishing Nets, St. Francis Church, and Jewish Synagogue.",
                "evening": "Transfer and drop-off at designated drop location with God's Own Country blessings.",
                "meal_recommendation": "Fresh banana chips and ginger tea in Fort Kochi.",
                "stay_suggestion": "Drop at Destination / Onward Journey",
                "pro_tip": "Buy freshly fried hot coconut oil banana chips in Fort Kochi."
            }
        ]
    }
}

def generate_ai_itinerary(
    destination: str,
    days: int = 4,
    budget: str = "Standard",
    travel_style: str = "Family / Leisure",
    travelers: str = "2 Adults",
    special_requests: str = "",
    pickup_location: Optional[str] = None,
    drop_location: Optional[str] = None
) -> dict:
    """Generates a comprehensive travel itinerary using Gemini AI or high-end template fallback with explicit Google Maps pickup/drop routing."""
    dest_key = destination.lower().strip()
    
    # 1. Resolve Transit & Google Maps Routing Details
    transit_info = resolve_transit_and_maps(
        destination=destination,
        pickup_location=pickup_location,
        drop_location=drop_location,
        days=days
    )
    
    # 2. Try Gemini API if key is available
    if GEMINI_API_KEY:
        try:
            from google import genai
            client = genai.Client(api_key=GEMINI_API_KEY)
            
            prompt = f"""
You are the Chief Travel Curator for '{AGENCY_NAME}', an elite Indian travel agency specializing in Domestic tours and Sacred Pilgrimages (Uttarakhand, Char Dham Yatra, Do Dham Yatra, Kedarnath Helicopter, Himachal Pradesh, Kashmir, Rajasthan, Goa, Kerala).
Create a highly engaging, authentic, and realistic day-by-day travel itinerary with precise Google Maps routing:
- Destination: {destination}
- Pickup Location (Tour START): {transit_info['pickup_location']}
- Drop Location (Tour END): {transit_info['drop_location']}
- Duration: {days} Days
- Budget Level: {budget}
- Travel Style: {travel_style}
- Travelers: {travelers}
- Special Requests: {special_requests}

CRITICAL ROUTING & TRANSIT INSTRUCTIONS:
1. Day 1 MUST start at '{transit_info['pickup_location']}'. The Day 1 morning activity must describe chauffeur pickup greeting at '{transit_info['pickup_location']}', luggage assistance, and starting the highway drive towards the destination according to Google Maps road navigation.
2. The final day (Day {days}) MUST conclude with a return journey and drop-off at '{transit_info['drop_location']}'. The final day evening activity must describe the return drive, farewell, and on-time drop at '{transit_info['drop_location']}' for onward travel.
3. For each day, include a realistic 'location_name', 'theme', 'morning', 'afternoon', 'evening', 'meal_recommendation', 'stay_suggestion', and 'pro_tip'.

Output MUST be strictly valid JSON with no markdown formatting or backticks around it. Format exactly matching this structure:
{{
  "title": "Inspiring Trip Title",
  "destination": "{destination}",
  "duration": "{days} Days / {max(1, days-1)} Nights",
  "pickup_location": "{transit_info['pickup_location']}",
  "drop_location": "{transit_info['drop_location']}",
  "route_summary": "{transit_info['route_summary']}",
  "google_maps_route_url": "{transit_info['google_maps_route_url']}",
  "estimated_cost_inr": "₹XX,XXX - ₹XX,XXX per person",
  "best_season": "Ideal months to visit",
  "packing_essentials": ["item 1", "item 2", "item 3", "item 4", "item 5"],
  "highlights": ["highlight 1", "highlight 2", "highlight 3", "highlight 4", "highlight 5"],
  "days": [
    {{
      "day_number": 1,
      "theme": "Day 1 Theme (Starting from {transit_info['pickup_location']})",
      "location_name": "Location Name",
      "morning": "Detailed morning activity starting with pickup from {transit_info['pickup_location']}...",
      "afternoon": "Detailed afternoon activity...",
      "evening": "Detailed evening activity...",
      "meal_recommendation": "Signature local dish and recommended cafe/restaurant",
      "stay_suggestion": "Hotel/Resort category recommendation",
      "pro_tip": "Local insider tip"
    }}
  ]
}}
"""
            response = client.models.generate_content(
                model='gemini-3.6-flash',
                contents=prompt,
            )
            raw_text = response.text.strip()
            if raw_text.startswith("```json"):
                raw_text = raw_text[7:]
            if raw_text.startswith("```"):
                raw_text = raw_text[3:]
            if raw_text.endswith("```"):
                raw_text = raw_text[:-3]
            
            data = json.loads(raw_text.strip())
            
            # Post-process days to strictly guarantee Tour starts at Customer Pickup and ends at Customer Drop
            if data.get("days") and isinstance(data["days"], list) and len(data["days"]) > 0:
                first_day = data["days"][0]
                pickup_loc = transit_info["pickup_location"]
                if pickup_loc.lower() not in (first_day.get("morning", "") + " " + first_day.get("theme", "")).lower():
                    first_day["theme"] = f"Pickup from {pickup_loc} & Journey Begins"
                    first_day["morning"] = f"Chauffeur pickup from {pickup_loc}. Luggage assistance and embark on the scenic route to {destination}. " + first_day.get("morning", "")
                
                last_day = data["days"][-1]
                drop_loc = transit_info["drop_location"]
                if drop_loc.lower() not in (last_day.get("evening", "") + " " + last_day.get("theme", "")).lower():
                    last_day["theme"] = f"Return Journey & Drop-off at {drop_loc}"
                    last_day["evening"] = f"Drive back along the highway and on-time drop-off at {drop_loc} for your onward travel with lifelong memories. " + last_day.get("evening", "")
                    last_day["stay_suggestion"] = f"Drop-off at {drop_loc} / Onward Journey"

            # Ensure transit fields are populated
            data["pickup_location"] = transit_info["pickup_location"]
            data["drop_location"] = transit_info["drop_location"]
            data["pickup_map_url"] = transit_info["pickup_map_url"]
            data["drop_map_url"] = transit_info["drop_map_url"]
            data["google_maps_route_url"] = transit_info["google_maps_route_url"]
            data["route_summary"] = transit_info["route_summary"]
            return data
        except Exception as e:
            print(f"Gemini API generation error: {e}, falling back to curated engine.")

    # 3. Match curated presets for Pilgrimages and Domestic destinations
    if any(k in dest_key for k in ["char dham", "chardham", "yamunotri", "gangotri", "4 dham"]):
        match_key = "chardham"
    elif any(k in dest_key for k in ["do dham", "dodham", "kedar badri", "kedarnath badrinath", "2 dham"]):
        match_key = "dodham"
    elif any(k in dest_key for k in ["auli", "chopta", "tungnath", "chandrashila"]):
        match_key = "auli"
    elif any(k in dest_key for k in ["uttarakhand", "nainital", "mussoorie", "corbett", "rishikesh", "haridwar"]):
        match_key = "uttarakhand"
    elif any(k in dest_key for k in ["manali", "himachal", "shimla", "spiti", "kasol"]):
        match_key = "manali"
    elif any(k in dest_key for k in ["kashmir", "srinagar", "gulmarg", "pahalgam"]):
        match_key = "kashmir"
    elif any(k in dest_key for k in ["rajasthan", "jaipur", "jodhpur", "udaipur"]):
        match_key = "rajasthan"
    elif any(k in dest_key for k in ["goa", "calangute", "candolim", "baga"]):
        match_key = "goa"
    elif any(k in dest_key for k in ["kerala", "munnar", "alleppey", "thekkady"]):
        match_key = "kerala"
    else:
        match_key = None

    if match_key and match_key in POPULAR_DESTINATIONS:
        data_copy = json.loads(json.dumps(POPULAR_DESTINATIONS[match_key]))
        if len(data_copy["days"]) > days:
            data_copy["days"] = data_copy["days"][:days]
            data_copy["duration"] = f"{days} Days / {max(1, days-1)} Nights"
            
        # Customize Day 1 to start from resolved pickup location
        if data_copy["days"]:
            dest_first = data_copy["days"][0].get("theme", "").split("&")[-1].strip() or destination.title()
            data_copy["days"][0]["theme"] = f"Pickup from {transit_info['pickup_location']} & {dest_first}"
            data_copy["days"][0]["morning"] = f"Chauffeur pickup from {transit_info['pickup_location']}. Luggage loading and commence scenic journey according to Google Maps road route."
            
            # Customize final Day to drop at resolved drop location
            last_day_idx = len(data_copy["days"]) - 1
            data_copy["days"][last_day_idx]["theme"] = f"Return Journey & Drop-off at {transit_info['drop_location']}"
            data_copy["days"][last_day_idx]["evening"] = f"Drive back along the highway and on-time drop-off at {transit_info['drop_location']} with cherished memories of the tour."
            data_copy["days"][last_day_idx]["stay_suggestion"] = f"Drop-off at {transit_info['drop_location']} / Onward Journey"

        data_copy["pickup_location"] = transit_info["pickup_location"]
        data_copy["drop_location"] = transit_info["drop_location"]
        data_copy["pickup_map_url"] = transit_info["pickup_map_url"]
        data_copy["drop_map_url"] = transit_info["drop_map_url"]
        data_copy["google_maps_route_url"] = transit_info["google_maps_route_url"]
        data_copy["route_summary"] = transit_info["route_summary"]
        return data_copy

    # 4. Dynamic fallback generator for any custom domestic destination
    dest_name = destination.title() if destination else "Incredible India Destination"
    generated_days = []
    themes = [
        f"Pickup from {transit_info['pickup_location']} & Scenic Drive to {dest_name}",
        f"Signature Landmark Exploration & Heritage of {dest_name}",
        f"Nature Wonders, Viewpoints & Hidden Valleys",
        f"Cultural Discovery, Local Cuisine & Artisan Markets",
        f"Excursions, Photography & Leisure Spa",
        f"Scenic Return Journey & Farewell Drop at {transit_info['drop_location']}"
    ]
    
    for i in range(1, days + 1):
        if i == 1:
            theme = f"Pickup from {transit_info['pickup_location']} & Scenic Drive to {dest_name}"
            morning = f"Chauffeur meets you at {transit_info['pickup_location']}. Begin scenic road journey along the Google Maps highway route to {dest_name}."
            afternoon = f"En-route lunch stop overlooking scenic landscapes. Arrive and check-in at hotel in {dest_name}."
            evening = f"Freshen up and enjoy an evening stroll around {dest_name} local markets."
            stay = f"Deluxe 4-Star Resort in {dest_name}"
        elif i == days:
            theme = f"Farewell Departure & Drop-off at {transit_info['drop_location']}"
            morning = f"Enjoy final hearty breakfast in {dest_name}. Pack bags and complete checkout formalities."
            afternoon = f"Begin return road journey with scenic photo stops and souvenir shopping."
            evening = f"Chauffeur drops you off at {transit_info['drop_location']} in time for onward trains/flights."
            stay = f"Drop at {transit_info['drop_location']} / Onward Journey"
        else:
            theme_idx = (i - 1) % len(themes)
            theme = f"{themes[theme_idx]} in {dest_name}"
            morning = f"Start Day {i} with a delightful breakfast. Head out early to explore top viewpoints of {dest_name}."
            afternoon = f"Enjoy lunch at a renowned local restaurant. Explore cultural heritage spots and artisan markets."
            evening = f"Witness a breathtaking sunset at {dest_name}'s premier viewpoint. Enjoy dinner and local delicacies."
            stay = f"Deluxe 4-Star Resort in {dest_name}"

        generated_days.append({
            "day_number": i,
            "theme": theme,
            "morning": morning,
            "afternoon": afternoon,
            "evening": evening,
            "meal_recommendation": f"Signature authentic delicacies of {dest_name}.",
            "stay_suggestion": stay,
            "pro_tip": f"Check Google Maps live traffic before starting Day {i} excursion."
        })

    return {
        "title": f"Divine & Scenic {dest_name} Getaway",
        "destination": dest_name,
        "duration": f"{days} Days / {max(1, days-1)} Nights",
        "pickup_location": transit_info["pickup_location"],
        "drop_location": transit_info["drop_location"],
        "pickup_map_url": transit_info["pickup_map_url"],
        "drop_map_url": transit_info["drop_map_url"],
        "google_maps_route_url": transit_info["google_maps_route_url"],
        "route_summary": transit_info["route_summary"],
        "estimated_cost_inr": f"₹{days * 3200:,} - ₹{days * 5800:,} per person ({budget} Tier)",
        "best_season": "Year-round (Best seasons: Spring, Summer & Autumn)",
        "packing_essentials": [
            "Comfortable walking shoes & weather-appropriate clothing",
            "Universal mobile charger & power bank",
            "UV sunglasses, sunblock & personal hydration bottle",
            "Aadhar Card / Gov ID cards & travel vouchers"
        ],
        "highlights": [
            f"Seamless pickup from {transit_info['pickup_location']} and drop at {transit_info['drop_location']}",
            f"Curated private tour of {dest_name}'s top attractions with dedicated chauffeur",
            "Handpicked luxury & deluxe accommodation",
            "Authentic regional gastronomic tasting sessions",
            f"24/7 on-trip assistance from {AGENCY_NAME} concierge"
        ],
        "days": generated_days
    }


def chat_travel_concierge(message: str, history: Optional[list] = None) -> str:
    """Handles conversational questions about travel, packing, packages, or bookings."""
    if GEMINI_API_KEY:
        try:
            from google import genai
            client = genai.Client(api_key=GEMINI_API_KEY)
            
            system_instruction = (
                f"You are 'Aria', the intelligent AI Travel Concierge for {AGENCY_NAME} "
                "(a premier Indian travel agency specializing in Sacred Pilgrimages, Uttarakhand, Char Dham Yatra, Do Dham Yatra, Kedarnath Helicopter, Himachal Pradesh, Kashmir, Rajasthan, Goa, and Kerala). "
                "Be cheerful, respectful, knowledgeable, professional, and helpful. "
                "Provide accurate travel tips, pickup/drop transit advice from airports/railway stations, Char Dham biometric registration guidance, helicopter booking advice, best seasons, estimated budgets, and packing essentials. "
                f"Encourage travelers to connect directly with the {AGENCY_NAME} team on WhatsApp at +{AGENCY_WHATSAPP} "
                f"or call {AGENCY_PHONE} for custom quotes and instant discounts."
            )
            
            prompt = f"System: {system_instruction}\nUser Query: {message}"
            response = client.models.generate_content(
                model='gemini-3.6-flash',
                contents=prompt,
            )
            return response.text.strip()
        except Exception as e:
            print(f"Gemini Chat error: {e}")

    # Fallback smart responder
    msg = message.lower()
    if any(w in msg for w in ["char dham", "chardham", "yamunotri", "gangotri"]):
        return f"🕉️ **Char Dham Yatra 2026 bookings are now OPEN!** Our all-inclusive 10N/11D package covers Yamunotri, Gangotri, Kedarnath, and Badrinath with pickup and drop from Haridwar/Dehradun, deluxe stays, pure vegetarian meals, biometric registration assistance, and mountain cab transfers starting at ₹34,999/person. Connect directly on WhatsApp (+{AGENCY_WHATSAPP}) or call **{AGENCY_PHONE}** for instant itinerary and dates!"
    elif any(w in msg for w in ["do dham", "dodham", "kedar badri", "kedarnath and badrinath"]):
        return f"🙏 **Do Dham Yatra (Kedarnath & Badrinath Ji)** is our most popular 5N/6D spiritual circuit! Includes transfers from Haridwar/Rishikesh, deluxe stays, VIP Darshan guidance, and optional Helicopter shuttle at Phata/Sirsi starting at ₹22,500/person. Message us on WhatsApp (+{AGENCY_WHATSAPP}) for custom quotes!"
    elif any(w in msg for w in ["helicopter", "heli", "flight to kedarnath"]):
        return f"🚁 **Kedarnath Helicopter Express (3D/2N)** provides same-day / next-day heli-shuttle from Phata/Sirsi/Guptkashi directly to Kedarnath Helipad (just 500m from the temple), VIP priority darshan assistance, and luxury resort stays. Heli slots sell out fast! Contact us immediately at **{AGENCY_PHONE}** or on WhatsApp (+{AGENCY_WHATSAPP}) to secure your tickets."
    elif any(w in msg for w in ["uttarakhand", "nainital", "mussoorie", "corbett", "auli", "chopta"]):
        return f"🏔️ **Uttarakhand Specials:** We offer customizable packages for Nainital Lakes, Jim Corbett Tiger Safari, Mussoorie Queen of Hills, Auli Skiing, and Chopta-Tungnath Himalayan Trek with pickup & drop from Kathgodam/Dehradun/Delhi starting from ₹15,999/person. WhatsApp us at **+{AGENCY_WHATSAPP}** for group & family offers!"
    elif any(w in msg for w in ["himachal", "manali", "shimla", "dharamshala"]):
        return f"🏔️ **Himachal Pradesh Escapes:** All-inclusive luxury Volvo & private cab packages with pickup & drop from Chandigarh/Delhi covering Manali, Solang Valley, Atal Tunnel, Rohtang Pass, Kasol, and Shimla starting from ₹12,999/person. Connect on WhatsApp (+{AGENCY_WHATSAPP}) for quotes!"
    elif any(w in msg for w in ["kashmir", "gulmarg", "pahalgam", "srinagar"]):
        return f"🌸 **Kashmir Heaven on Earth:** Experience airport pickup/drop, luxury cedarwood houseboats on Dal Lake, Gulmarg Gondola rides, and picturesque valleys of Pahalgam starting from ₹21,999/person. Call **{AGENCY_PHONE}** or message on WhatsApp for instant booking."
    elif any(w in msg for w in ["pickup", "drop", "map", "route", "google map"]):
        return f"🗺️ **Pickup & Drop Navigation:** We provide dedicated chauffeur transfers from your chosen airport, railway station, or hotel (Haridwar, Dehradun, Delhi, Chandigarh, Srinagar, Cochin, etc.) with real-time Google Maps route guidance and luggage assistance throughout your journey!"
    elif any(w in msg for w in ["phone", "call", "contact", "number", "talk"]):
        return f"📞 You can directly call our senior travel planners at **{AGENCY_PHONE}** or tap the green **Call Now** button on your screen for instant assistance!"
    elif any(w in msg for w in ["whatsapp", "chat", "message"]):
        return f"💬 We are available 24/7 on WhatsApp! Click the floating **WhatsApp icon** or message us directly at **+{AGENCY_WHATSAPP}** to get instant personalized quotes and PDF vouchers."
    elif any(w in msg for w in ["book", "price", "cost", "quote"]):
        return f"✨ To get an exact customized price quote, fill out our quick **Inquiry Form** on this page or message our team on WhatsApp at **+{AGENCY_WHATSAPP}**. We record your inquiry directly into our system and get back within 15 minutes!"
    else:
        return f"🙏 Namaste! I'm Aria, your AI Travel Concierge at **{AGENCY_NAME}**. We specialize in Sacred Char Dham Yatra, Do Dham Yatra, Kedarnath Helicopter Packages, Uttarakhand, Himachal Pradesh, Kashmir, Rajasthan, Goa, and Kerala with complete pickup and drop services! How may I assist your travel plans today? You can also call us directly at **{AGENCY_PHONE}** or on WhatsApp (+{AGENCY_WHATSAPP})."
