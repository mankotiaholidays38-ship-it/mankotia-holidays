import os
from dotenv import load_dotenv

load_dotenv()

# Agency Configuration
AGENCY_NAME = os.getenv("AGENCY_NAME", "Mankotia Holidays")
AGENCY_PHONE = os.getenv("AGENCY_PHONE", "+918627068616")
AGENCY_PHONES = ["+919816461616", "+918627068616", "+919811485028", "+919971135092"]
AGENCY_WHATSAPP = os.getenv("AGENCY_WHATSAPP", "918627068616")
AGENCY_EMAIL = os.getenv("AGENCY_EMAIL", "mankotiaholidays38@gmail.com")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", os.getenv("NOTIFICATION_EMAIL", AGENCY_EMAIL))
AGENCY_GSTIN = os.getenv("AGENCY_GSTIN", "07AGQPM4637F1Z4")
AGENCY_OFFICES = [
    {"city": "Delhi", "address": "GROUND FLOOR, WP-135A, PITAM PURA, NEW DELHI, NORTH WEST DELHI - 110034"},
    {"city": "Manali", "address": "Kwality Cafe, Hadimba Road, Manali, Himachal Pradesh - 175131"},
    {"city": "Una", "address": "66 - Basant Vihar, Rakkar colony, Una, Himachal Pradesh - 174303"}
]

# Verified Hotel Choices by Location / Circuit Base
LOCATION_HOTELS = {
    "barkot": [
        {"name": "Camp Nirvana Yamunotri", "phone": "+91 95992 22705, +91 98993 77998", "email": "info@nirvanacamp.com", "category": "Deluxe Alpine Camp"},
        {"name": "Hotel Yamuna Bridge Barkot", "phone": "+91 94120 56780, 01375-224236", "email": "hotelyamunabridge@gmail.com", "category": "3 Star Comfort"},
        {"name": "GMVN Tourist Rest House Barkot", "phone": "+91 95680 06626, 01375-224236", "email": "gmvn@gmvnl.in", "category": "Govt Tourist Lodge"},
        {"name": "Himalayan Camps Barkot", "phone": "+91 94120 56788, +91 98971 14455", "email": "himalayancampsbarkot@gmail.com", "category": "Deluxe Luxury Camp"},
        {"name": "Hotel Kalindi Barkot", "phone": "+91 94111 55678, 01375-224215", "email": "hotelkalindibarkot@gmail.com", "category": "3 Star"}
    ],
    "uttarkashi": [
        {"name": "Hotel Shivlinga Resort", "phone": "+91 99174 77718, +91 94120 77718", "email": "shivlinga2000@gmail.com", "category": "4 Star River Resort"},
        {"name": "Shikhar Nature Resort", "phone": "+91 98106 22238, +91 98181 81468", "email": "resorts@shikhar.com", "category": "3 Star Eco Resort"},
        {"name": "Ganga Putra Riverside Resort", "phone": "+91 94120 77755, 01374-222500", "email": "gangaputraresort@gmail.com", "category": "3 Star Deluxe"},
        {"name": "GMVN Tourist Rest House Uttarkashi", "phone": "+91 95680 06626, 01374-222236", "email": "gmvn@gmvnl.in", "category": "Govt Tourist Lodge"},
        {"name": "Hotel Divine Palace Uttarkashi", "phone": "+91 94120 77790, 01374-222310", "email": "divinepalaceuttarkashi@gmail.com", "category": "3 Star"}
    ],
    "guptkashi": [
        {"name": "Kedar Valley Resorts Guptkashi", "phone": "+91 70554 25555, +91 70880 01703", "email": "contactus@kedarvalleyresorts.com", "category": "4 Star Luxury Resort"},
        {"name": "Kedar River Retreat Sitapur", "phone": "+91 87555 75907, +91 98971 14466", "email": "kedarcampresorts@gmail.com", "category": "4 Star Riverfront Resort"},
        {"name": "Villa Paraiso Resort Guptkashi", "phone": "+91 98111 87654, 01364-267333", "email": "villaparaisoguptkashi@gmail.com", "category": "4 Star Deluxe"},
        {"name": "Hotel Himalayan Comfort Guptkashi", "phone": "+91 94120 55432, 01364-267150", "email": "himalayancomfortguptkashi@gmail.com", "category": "3 Star Comfort"},
        {"name": "GMVN Tourist Rest House Guptkashi", "phone": "+91 95680 06626, 01364-267228", "email": "gmvn@gmvnl.in", "category": "Govt Tourist Lodge"}
    ],
    "kedarnath": [
        {"name": "GMVN Kedarnath Tourist Lodge & Cottages", "phone": "+91 95680 06626, 01364-263228", "email": "gmvn@gmvnl.in", "category": "Govt Tourist Lodge / Cottage"},
        {"name": "Kedar Dome Deluxe Alpine Camps", "phone": "+91 94120 56799, 01364-263300", "email": "kedardomecamps@gmail.com", "category": "Deluxe Alpine Camp"},
        {"name": "Bikaner House Kedarnath", "phone": "+91 98290 12345, 01364-263240", "email": "bikanerhousekedarnath@gmail.com", "category": "Dharamshala / Guest House"},
        {"name": "Himadri Tourist Guest House Kedarnath", "phone": "+91 94120 56711, 01364-263215", "email": "himadri.kedarnath@gmail.com", "category": "Standard Guest House"}
    ],
    "badrinath": [
        {"name": "Sarovar Portico Badrinath", "phone": "+91 93103 33317, +91 95822 16963", "email": "bpo@sarovarhotels.com", "category": "4 Star Luxury"},
        {"name": "New Hotel Snow Crest Badrinath", "phone": "+91 99801 00123, +91 98111 23456", "email": "sales@snowcrest.co.in", "category": "4 Star Deluxe"},
        {"name": "Hotel Narayan Palace Badrinath", "phone": "+91 98101 23456, 01381-222238", "email": "info@hotelnarayanpalace.com", "category": "3 Star Deluxe"},
        {"name": "GMVN Devlok Tourist Rest House", "phone": "+91 95680 06626, 01381-222212", "email": "gmvn@gmvnl.in", "category": "Govt Tourist Lodge"},
        {"name": "Hotel Dwarikesh Badrinath", "phone": "+91 94120 56744, 01381-222205", "email": "hoteldwarikesh@gmail.com", "category": "3 Star Comfort"}
    ],
    "joshimath": [
        {"name": "The Tattva Resort Joshimath", "phone": "+91 92103 56789, +91 98103 56789", "email": "namaste@thetattva.in", "category": "4 Star Boutique Resort"},
        {"name": "Hotel Dronagiri Joshimath", "phone": "+91 94120 56755, 01389-222254", "email": "hoteldronagiri@gmail.com", "category": "3 Star Deluxe"},
        {"name": "Himalayan Abode Home Joshimath", "phone": "+91 94120 56766, 01389-222687", "email": "himalayanabode@gmail.com", "category": "4 Star Heritage Homestay"},
        {"name": "GMVN Jyotir Tourist Rest House", "phone": "+91 95680 06626, 01389-222118", "email": "gmvn@gmvnl.in", "category": "Govt Tourist Lodge"}
    ],
    "haridwar": [
        {"name": "Radisson Blu Hotel Haridwar", "phone": "+91 1334 666888, +91 99270 00555", "email": "reservations.haridwar@radisson.com", "category": "5 Star Luxury"},
        {"name": "The Haveli Hari Ganga Haridwar", "phone": "+91 75002 63336, 01334-265207", "email": "hhg@prasadheritage.com", "category": "Heritage / 4 Star"},
        {"name": "Amatra By the Ganges Haridwar", "phone": "+91 92580 90000, 01334-233333", "email": "reservations@amatrahotels.com", "category": "5 Star Luxury Resort"},
        {"name": "Hotel Ganga Lahari Haridwar", "phone": "+91 75008 63336, 01334-226444", "email": "gangalahari@prasadheritage.com", "category": "4 Star Riverfront"},
        {"name": "GMVN Rahi Tourist Rest House Haridwar", "phone": "+91 95680 06626, 01334-265320", "email": "gmvn@gmvnl.in", "category": "3 Star Govt Lodge"}
    ],
    "rishikesh": [
        {"name": "Aloha On The Ganges Rishikesh", "phone": "+91 95550 88000, +91 75008 63336", "email": "bookings@leisurehotels.in", "category": "4 Star Riverfront Resort"},
        {"name": "Ganga Kinare Riverside Resort", "phone": "+91 90155 44000, 0135-2435243", "email": "reservations@himalayan-hotels.com", "category": "4 Star Boutique"},
        {"name": "Divine Resort & Spa Rishikesh", "phone": "+91 93581 81804, 0135-2442129", "email": "reservations@divineresort.com", "category": "4 Star Spa Resort"},
        {"name": "Taj Rishikesh Resort & Spa", "phone": "+91 1378 262626, 1800 111 825", "email": "reservations.rishikesh@tajhotels.com", "category": "5 Star Luxury"},
        {"name": "EllBee Ganga View Rishikesh", "phone": "+91 88826 64444, 0135-2437777", "email": "reservations@ellbeehotels.com", "category": "3 Star Deluxe"}
    ],
    "nainital": [
        {"name": "The Naini Retreat Nainital", "phone": "+91 95550 88000, +91 94589 98128", "email": "bookings@leisurehotels.in", "category": "4 Star Heritage Resort"},
        {"name": "The Manu Maharani Nainital", "phone": "+91 5942 237342, +91 98101 23456", "email": "info@themanumaharani.com", "category": "4 Star Luxury"},
        {"name": "Shervani Hilltop Nainital", "phone": "+91 98111 87654, 05942-236128", "email": "reservations@shervanihotels.com", "category": "4 Star Resort"},
        {"name": "Vikram Vintage Inn Nainital", "phone": "+91 98100 55432, 05942-236177", "email": "info@vikramvintageinn.com", "category": "3 Star Deluxe"}
    ],
    "corbett": [
        {"name": "Corbett The Baagh Spa & Resort", "phone": "+91 92127 77224, +91 74949 47576", "email": "resv@resortsbythebaagh.com", "category": "5 Star Luxury Resort"},
        {"name": "Namah Resort Jim Corbett", "phone": "+91 83929 14912, +91 83929 15425", "email": "reservations.jimcorbett@radissonindividuals.com", "category": "5 Star Riverfront Resort"},
        {"name": "Aahana The Corbett Wilderness", "phone": "+91 70886 02024, 05947-284300", "email": "reservation@aahanaresort.com", "category": "5 Star Eco Luxury"},
        {"name": "The Den Corbett Resort", "phone": "+91 98111 44556, 05947-284144", "email": "reservations@thedencorbett.com", "category": "4 Star Jungle Lodge"},
        {"name": "Corbett Riverside Resort", "phone": "+91 98111 06752, 05947-284125", "email": "reservations@corbettriverside.com", "category": "4 Star Riverside"}
    ],
    "mussoorie": [
        {"name": "JW Marriott Mussoorie Walnut Grove", "phone": "+91 135 6692000, 1800 228 9290", "email": "jw.dedmd.reservations@marriott.com", "category": "5 Star Luxury"},
        {"name": "Jaypee Residency Manor Mussoorie", "phone": "+91 135 2631800, +91 135 6602000", "email": "reservations.jrm@jaypeehotels.com", "category": "5 Star Deluxe"},
        {"name": "Welcomhotel The Savoy Mussoorie", "phone": "+91 135 2607000, 1800 102 2333", "email": "savoyreservations@savoyhotel.in", "category": "5 Star Heritage"},
        {"name": "Fortune Resort Grace Mussoorie", "phone": "+91 135 2636000, 1800 102 2333", "email": "reservations@fortunehotels.in", "category": "4 Star"},
        {"name": "Hotel Madhuban Highlands", "phone": "+91 135 2635555, +91 98370 00123", "email": "reservations@hotelmadhubanhighlands.com", "category": "4 Star Comfort"}
    ],
    "auli": [
        {"name": "Cliff Top Club Auli", "phone": "+91 94120 56789, 01389-223217", "email": "reservations@clifftopclubauli.com", "category": "4 Star Ski Resort"},
        {"name": "GMVN Tourist Bungalow Auli", "phone": "+91 95680 06626, 01389-223208", "email": "gmvn@gmvnl.in", "category": "Govt Ski Lodge"},
        {"name": "Magpie Jungle Camp Chopta", "phone": "+91 94109 54572, +91 98971 14455", "email": "magpieecotourism@gmail.com", "category": "Deluxe Alpine Camp"},
        {"name": "Himalayan Eco Lodge Auli", "phone": "+91 98111 87654, 01389-223250", "email": "info@himalayanecolodges.com", "category": "3 Star Eco Resort"}
    ],
    "manali": [
        {"name": "The Himalayan Resort & Spa", "phone": "+91 88940 05999, 01902-250999", "email": "info@thehimalayan.com", "category": "5 Star Castle Luxury"},
        {"name": "Snow Valley Resorts Manali", "phone": "+91 98160 03027, +91 80912 00250", "email": "manali@snowvalleyresorts.com", "category": "3 Star Deluxe"},
        {"name": "Apple Country Resort Manali", "phone": "+91 98160 25418, 01902-254184", "email": "reservations@applecountryresorts.com", "category": "4 Star Spa Resort"},
        {"name": "Span Resort & Spa Manali", "phone": "+91 98160 12345, 01902-240538", "email": "reservations@spanresorts.com", "category": "5 Star Riverfront Luxury"},
        {"name": "Manuallaya The Resort & Spa", "phone": "+91 98160 55432, 01902-252238", "email": "reservations@manuallaya.com", "category": "5 Star Luxury"}
    ],
    "shimla": [
        {"name": "Wildflower Hall, An Oberoi Resort", "phone": "+91 177 2648585, 011 69110606", "email": "reservations@oberoigroup.com", "category": "5 Star Oberoi Luxury"},
        {"name": "Radisson Jass Hotel Shimla", "phone": "+91 177 2659012, 1800 108 0333", "email": "reservations.shimla@radisson.com", "category": "4 Star Deluxe"},
        {"name": "Clarkes Hotel Shimla", "phone": "+91 177 2651010, 011 23890606", "email": "clarkes@clarkesshimla.com", "category": "4 Star Grand Heritage"},
        {"name": "Hotel Combermere Shimla", "phone": "+91 177 2651246, +91 98160 12345", "email": "reservations@hotelcombermere.com", "category": "4 Star Mall Road"},
        {"name": "East Bourne Resort & Spa", "phone": "+91 177 2623669, +91 98160 67890", "email": "reservations@eastbourneindia.com", "category": "4 Star Resort"}
    ],
    "dharamshala": [
        {"name": "Hyatt Regency Dharamshala Resort", "phone": "+91 1892 242123, 1800 122 1234", "email": "dharamshala.regency@hyatt.com", "category": "5 Star Luxury Resort"},
        {"name": "Fortune Park Moksha McLeodganj", "phone": "+91 1892 242400, 1800 102 2333", "email": "reservations@fortunehotels.in", "category": "4 Star Deluxe"},
        {"name": "Hotel Surya McLeod", "phone": "+91 1892 221417, +91 98160 55432", "email": "info@hotelsuryamcleod.com", "category": "3 Star Comfort"},
        {"name": "Pride Surya Mountain Resort", "phone": "+91 1892 221555, 1800 209 1400", "email": "centralreservations@pridehotel.com", "category": "3 Star Deluxe"}
    ],
    "srinagar": [
        {"name": "The LaLiT Grand Palace Srinagar", "phone": "+91 194 2501001, +91 99066 68586", "email": "srinagarquery@thelalit.com", "category": "5 Star Grand Palace"},
        {"name": "Vivanta Dal View Srinagar (Taj)", "phone": "+91 194 2461111, 1800 111 825", "email": "vivanta.srinagar@tajhotels.com", "category": "5 Star Luxury"},
        {"name": "Radisson Collection Hotel Srinagar", "phone": "+91 194 2458000, 1800 108 0333", "email": "reservations.srinagar@radisson.com", "category": "5 Star Deluxe"},
        {"name": "Wangnoo Heritage Luxury Houseboats", "phone": "+91 194 2425555, +91 94190 07555", "email": "info@wangnoohouseboats.com", "category": "Luxury Cedar Houseboat"},
        {"name": "Hotel Pine Spring Srinagar", "phone": "+91 194 2312000, +91 94190 12345", "email": "info@hotelpinespring.com", "category": "3 Star Deluxe"}
    ],
    "gulmarg": [
        {"name": "The Khyber Himalayan Resort & Spa", "phone": "+91 1954 350666, 0194 3503222", "email": "reservations@khyberhotels.com", "category": "5 Star Luxury Ski Resort"},
        {"name": "Hotel Highlands Park Gulmarg", "phone": "+91 1954 254491, +91 94190 01234", "email": "highlandspark@gmail.com", "category": "4 Star Heritage"},
        {"name": "Grand Mumtaz Resorts Gulmarg", "phone": "+91 1954 254420, +91 94190 55432", "email": "reservations@grandmumtaz.com", "category": "4 Star"},
        {"name": "Hotel Pine Spring Gulmarg", "phone": "+91 1954 254580, +91 94190 67890", "email": "gulmarg@hotelpinespring.com", "category": "3 Star Deluxe"}
    ],
    "pahalgam": [
        {"name": "Welcomhotel Pine N Peak Pahalgam", "phone": "+91 136 243211, 1800 102 2333", "email": "reservations@itchotels.com", "category": "5 Star Luxury Resort"},
        {"name": "Pahalgam Hotel (Heritage)", "phone": "+91 1936 243252, +91 94190 12345", "email": "pahalgamhotel@gmail.com", "category": "4 Star Heritage"},
        {"name": "Hotel Mountview Pahalgam", "phone": "+91 1936 243221, +91 94190 34567", "email": "info@hotelmountview.com", "category": "4 Star"},
        {"name": "Hotel Heevan Pahalgam", "phone": "+91 1936 243219, 0194 2457007", "email": "heevan@ahsanmountresorts.com", "category": "4 Star Deluxe"}
    ],
    "jaipur": [
        {"name": "Rambagh Palace Jaipur (Taj)", "phone": "+91 141 2385700, 1800 111 825", "email": "rambagh.jaipur@tajhotels.com", "category": "5 Star Grand Palace"},
        {"name": "ITC Rajputana Jaipur", "phone": "+91 141 5100100, 1800 102 2333", "email": "reservations@itchotels.com", "category": "5 Star Luxury"},
        {"name": "Trident Jaipur", "phone": "+91 141 2670101, 011 23890555", "email": "reservations@tridenthotels.com", "category": "5 Star"},
        {"name": "Holiday Inn Jaipur City Centre", "phone": "+91 141 4224444, 1800 103 3066", "email": "reservations@fortunehotels.in", "category": "4 Star"},
        {"name": "Umaid Bhawan Heritage Hotel", "phone": "+91 141 2206426, +91 98290 55432", "email": "umaidbhawan@umaidbhawan.com", "category": "3 Star Heritage"}
    ],
    "udaipur": [
        {"name": "Taj Lake Palace Udaipur", "phone": "+91 294 2428800, 1800 111 825", "email": "lakepalace.udaipur@tajhotels.com", "category": "5 Star Luxury Palace"},
        {"name": "Trident Udaipur", "phone": "+91 294 2432200, 011 23890555", "email": "reservations@tridenthotels.com", "category": "5 Star"},
        {"name": "Fateh Prakash Palace Udaipur", "phone": "+91 294 2528008, 1800 180 2933", "email": "crs@hrhhotels.com", "category": "5 Star Heritage Palace"},
        {"name": "The Ananta Udaipur", "phone": "+91 294 2690000, +91 95710 55000", "email": "reservation.udaipur@anantahotels.com", "category": "5 Star Luxury Resort"},
        {"name": "Hotel Lakend Udaipur", "phone": "+91 294 2435555, +91 91160 01234", "email": "reservations@lakend.com", "category": "4 Star Lakefront"}
    ],
    "jodhpur": [
        {"name": "Umaid Bhawan Palace Jodhpur", "phone": "+91 291 2510101, 1800 111 825", "email": "umaidbhawan.jodhpur@tajhotels.com", "category": "5 Star Grand Royal Palace"},
        {"name": "Ajit Bhawan Palace Jodhpur", "phone": "+91 291 2510410, +91 99823 99999", "email": "reservations@ajitbhawan.com", "category": "4 Star Heritage Palace"},
        {"name": "Welcomhotel by ITC Hotels Jodhpur", "phone": "+91 291 7100100, 1800 102 2333", "email": "reservations@itchotels.com", "category": "5 Star Luxury"},
        {"name": "Indana Palace Jodhpur", "phone": "+91 291 7140000, +91 97841 00000", "email": "reservations.jodh@indanapalace.com", "category": "5 Star"}
    ],
    "goa": [
        {"name": "Taj Fort Aguada Resort & Spa", "phone": "+91 832 6645858, 1800 111 825", "email": "fortaguada.goa@tajhotels.com", "category": "5 Star Luxury Beach Resort"},
        {"name": "Cidade de Goa (Taj)", "phone": "+91 832 2454545, 1800 111 825", "email": "cidadedegoa@tajhotels.com", "category": "5 Star Beachfront"},
        {"name": "Whispering Palms Beach Resort", "phone": "+91 832 6651515, +91 98221 00123", "email": "reservations@whisperingpalms.com", "category": "4 Star Beach Resort"},
        {"name": "Hard Rock Hotel Goa", "phone": "+91 832 6745555, 1800 102 4744", "email": "info@hrhgoa.com", "category": "5 Star Lifestyle Resort"},
        {"name": "Santana Beach Resort Candolim", "phone": "+91 832 2479555, +91 98221 23456", "email": "info@santana-goa.com", "category": "3 Star Beachfront"}
    ],
    "munnar": [
        {"name": "Blanket Luxury Villa & Spa", "phone": "+91 4865 263737, +91 82813 00000", "email": "reservation@blanketmunnar.com", "category": "5 Star Luxury Resort"},
        {"name": "Tea County Munnar (KTDC)", "phone": "+91 4865 230460, +91 94000 08585", "email": "teacounty@ktdc.com", "category": "4 Star KTDC Resort"},
        {"name": "The Tall Trees Resort Munnar", "phone": "+91 4865 230593, +91 94470 54106", "email": "talltrees@thetalltreesmunnar.com", "category": "4 Star Eco Nature Resort"},
        {"name": "Fragrant Nature Munnar", "phone": "+91 4865 214000, +91 81119 97061", "email": "reservations.mr@fragrantnature.com", "category": "5 Star Boutique Resort"}
    ],
    "alleppey": [
        {"name": "Punnamada Resort Alleppey", "phone": "+91 477 2236162, +91 94471 61400", "email": "mail@punnamada.com", "category": "4 Star Backwater Resort"},
        {"name": "Lake Palace Resort Alleppey", "phone": "+91 477 2239701, +91 97450 00123", "email": "info@lakepalaceresort.com", "category": "5 Star Backwater Resort"},
        {"name": "Kumarakom Lake Resort", "phone": "+91 481 2524900, +91 94470 52000", "email": "klr@pghotels.com", "category": "5 Star Luxury Heritage"},
        {"name": "Ramada by Wyndham Alleppey", "phone": "+91 477 2240001, 1800 407 9963", "email": "reservations@ramadaalleppey.com", "category": "4 Star"}
    ]
}

def get_hotel_options_for_night(destination: str, stay_text: str, night_num: int) -> tuple[str, list[dict]]:
    """Returns stay location label and 3-5 curated hotel choices for a given night in a tour circuit."""
    text_lower = f"{destination} {stay_text}".lower()
    matched_key = None
    for loc_key in LOCATION_HOTELS:
        if loc_key in text_lower:
            matched_key = loc_key
            break
            
    if not matched_key:
        if any(k in text_lower for k in ["char dham", "chardham", "yamunotri", "gangotri", "kedarnath", "badrinath", "do dham", "dodham", "yatra"]):
            chardham_circuit = ["barkot", "barkot", "uttarkashi", "uttarkashi", "guptkashi", "kedarnath", "guptkashi", "badrinath", "joshimath", "rishikesh"]
            matched_key = chardham_circuit[(night_num - 1) % len(chardham_circuit)]
        elif any(k in text_lower for k in ["uttarakhand", "nainital", "corbett", "mussoorie", "auli"]):
            ut_circuit = ["nainital", "nainital", "corbett", "corbett", "mussoorie", "mussoorie", "rishikesh"]
            matched_key = ut_circuit[(night_num - 1) % len(ut_circuit)]
        elif any(k in text_lower for k in ["manali", "himachal", "shimla", "spiti", "kasol"]):
            hp_circuit = ["manali", "manali", "manali", "shimla", "shimla", "dharamshala"]
            matched_key = hp_circuit[(night_num - 1) % len(hp_circuit)]
        elif any(k in text_lower for k in ["kashmir", "srinagar", "gulmarg", "pahalgam"]):
            kashmir_circuit = ["srinagar", "gulmarg", "pahalgam", "srinagar", "srinagar"]
            matched_key = kashmir_circuit[(night_num - 1) % len(kashmir_circuit)]
        elif any(k in text_lower for k in ["rajasthan", "jaipur", "udaipur", "jodhpur"]):
            raj_circuit = ["jaipur", "jaipur", "jodhpur", "udaipur", "udaipur"]
            matched_key = raj_circuit[(night_num - 1) % len(raj_circuit)]
        elif any(k in text_lower for k in ["kerala", "munnar", "alleppey"]):
            kerala_circuit = ["munnar", "munnar", "alleppey", "alleppey"]
            matched_key = kerala_circuit[(night_num - 1) % len(kerala_circuit)]
        elif "goa" in text_lower:
            matched_key = "goa"
        else:
            matched_key = "barkot"

    hotels = LOCATION_HOTELS.get(matched_key, LOCATION_HOTELS["barkot"])
    stay_display = f"{matched_key.title()} Base / Circuit" if not stay_text or stay_text.lower() == "stay" else stay_text.strip()
    options = hotels[:5] if len(hotels) >= 3 else hotels
    return stay_display, options

# Curated Featured Packages Catalog
PACKAGES = [
    {
        "id": "pkg-chardham-deluxe",
        "title": "Sacred Char Dham Yatra Deluxe Tour",
        "destination": "Yamunotri • Gangotri • Kedarnath • Badrinath",
        "category": "Pilgrimage",
        "duration": "10 Nights / 11 Days",
        "price_inr": 34999,
        "original_price_inr": 45000,
        "badge": "Divine Best Seller",
        "image": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
        "highlights": [
            "Complete 4 Holy Dhams in Uttarakhand",
            "Yamunotri & Gangotri Holy Bath & Aarti",
            "Kedarnath Dham Temple Darshan",
            "Badrinath Ji & Mana Village (First Village)",
            "Biometric Yatra Registration & VIP Pass Assistance",
            "Pick-up & Drop from Haridwar / Rishikesh / Dehradun"
        ],
        "inclusions": [
            "10 Nights Deluxe Hotel / Ashram Stays",
            "Daily Pure Vegetarian Breakfast & Dinner",
            "Dedicated AC Tempo Traveller / Private Cab for Hilly Terrain",
            "Experienced Mountain Chauffeur & Yatra Coordinator",
            "Medical First-Aid & Emergency Oxygen Support"
        ]
    },
    {
        "id": "pkg-dodham-kedar-badri",
        "title": "Do Dham Yatra: Kedarnath & Badrinath Ji",
        "destination": "Kedarnath • Badrinath • Guptkashi • Joshimath",
        "category": "Pilgrimage",
        "duration": "5 Nights / 6 Days",
        "price_inr": 22500,
        "original_price_inr": 29999,
        "badge": "Most Popular Yatra",
        "image": "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80",
        "highlights": [
            "Kedarnath Jyotirlinga & Evening Aarti",
            "Badrinath Temple & Tapt Kund Hot Spring",
            "Mana Village, Bheem Pul & Saraswati River",
            "Devprayag & Rudraprayag Sangam View",
            "Helicopter Shuttle / Trek Assistance Option"
        ],
        "inclusions": [
            "5 Nights Hotel / Camp Accommodation",
            "Pure Veg Breakfast & Dinner Daily",
            "Private Sanitized Vehicle from Haridwar/Rishikesh",
            "Yatra Registration & Toll/Parking Included"
        ]
    },
    {
        "id": "pkg-kedarnath-heli",
        "title": "Kedarnath Dham Helicopter & VIP Express",
        "destination": "Guptkashi • Phata/Sirsi • Kedarnath Ji",
        "category": "Pilgrimage",
        "duration": "3 Days / 2 Nights",
        "price_inr": 19999,
        "original_price_inr": 26500,
        "badge": "Helicopter Special",
        "image": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80",
        "highlights": [
            "Same-Day / Next-Day Helicopter Shuttle (Phata/Sirsi)",
            "Priority VIP Darshan at Kedarnath Temple",
            "Stay in Premium Scenic Guptkashi / Kedarnath Resort",
            "Special Puja & Abhishek Support",
            "Rishikesh / Dehradun Airport Transfer Available"
        ],
        "inclusions": [
            "2 Nights Deluxe Stay with Scenic Mountain Views",
            "All Meals (Vegetarian / Satvik)",
            "Helicopter Boarding Assistance & Yatra Slip",
            "Private Cab Transfers from Haridwar / Dehradun"
        ]
    },
    {
        "id": "pkg-uttarakhand-jewels",
        "title": "Jewels of Uttarakhand: Nainital, Mussoorie & Jim Corbett",
        "destination": "Nainital • Corbett • Mussoorie • Rishikesh",
        "category": "Uttarakhand",
        "duration": "6 Days / 5 Nights",
        "price_inr": 17999,
        "original_price_inr": 24000,
        "badge": "Family Favorite",
        "image": "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=800&q=80",
        "highlights": [
            "Naini Lake Boating & Naina Devi Temple",
            "Jim Corbett National Park Jeep Tiger Safari",
            "Mussoorie Kempty Falls & Gun Hill Cable Car",
            "Rishikesh Triveni Ghat Maha Aarti & Laxman Jhula",
            "Scenic Himalayan Foothill Drives"
        ],
        "inclusions": [
            "5 Nights 3★/4★ Resort & Jungle Lodge Stays",
            "Daily Buffet Breakfast & Dinner",
            "Jeep Safari in Jim Corbett Reserve",
            "Private AC Sedan/SUV for all transfers"
        ]
    },
    {
        "id": "pkg-auli-chopta",
        "title": "Auli Ski Paradise & Chopta-Tungnath Trek",
        "destination": "Auli • Chopta • Tungnath • Rishikesh",
        "category": "Uttarakhand",
        "duration": "5 Days / 4 Nights",
        "price_inr": 15999,
        "original_price_inr": 21500,
        "badge": "Adventure & Nature",
        "image": "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=800&q=80",
        "highlights": [
            "Auli Ropeway & Panoramic Nanda Devi Views",
            "Chopta (Mini Switzerland of Uttarakhand)",
            "Tungnath Temple (Highest Shiva Temple in the World)",
            "Chandrashila Peak 360° Himalayan Summit",
            "Deoriatal Emerald Lake Camping"
        ],
        "inclusions": [
            "4 Nights Alpine Camp / Resort Accommodation",
            "Daily Breakfast & Nutritious Trekking Dinners",
            "Trek Guide & Forest Permit Fees",
            "Comfortable Mountain Cab Transfers"
        ]
    },
    {
        "id": "pkg-manali-spiti",
        "title": "Magical Manali & Solang Valley Escape",
        "destination": "Manali • Solang • Atal Tunnel • Sissu",
        "category": "Himachal",
        "duration": "4 Days / 3 Nights",
        "price_inr": 12999,
        "original_price_inr": 17500,
        "badge": "Himachal Best Seller",
        "image": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
        "highlights": ["Solang Valley Adventure", "Rohtang Snow Point / Atal Tunnel", "Hadimba Temple", "Old Manali Cafes", "Volvo / Cab Included"],
        "inclusions": ["3★/4★ Resort Stay", "Daily Breakfast & Dinner", "Sightseeing Cab", "Bonfire Night"]
    },
    {
        "id": "pkg-kashmir-paradise",
        "title": "Kashmir: Heaven on Earth Luxury Tour",
        "destination": "Srinagar • Gulmarg • Pahalgam",
        "category": "Kashmir",
        "duration": "5 Days / 4 Nights",
        "price_inr": 21999,
        "original_price_inr": 29000,
        "badge": "Kashmir Crown",
        "image": "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=80",
        "highlights": ["Dal Lake Luxury Houseboat", "Gulmarg Gondola Ride", "Betaab Valley in Pahalgam", "Shikara Sunset Ride", "Mughal Gardens"],
        "inclusions": ["Houseboat & Hotel Stay", "Breakfast & Dinner (Wazwan)", "Private Sedan Cab", "Shikara Ride Ticket"]
    },
    {
        "id": "pkg-rajasthan-royal",
        "title": "Royal Rajasthan: Jaipur, Jodhpur & Udaipur",
        "destination": "Jaipur • Jodhpur • Udaipur",
        "category": "Rajasthan",
        "duration": "6 Days / 5 Nights",
        "price_inr": 24999,
        "original_price_inr": 34000,
        "badge": "Heritage Special",
        "image": "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
        "highlights": ["Amber Fort & City Palace", "Udaipur Lake Pichola Boat", "Mehrangarh Fort Jodhpur", "Cultural Folk Dance & Dinner", "Heritage Haveli Stay"],
        "inclusions": ["Heritage Hotel Stays", "Breakfast & Royal Dinner", "AC Private Cab", "Palace Tour Guide"]
    },
    {
        "id": "pkg-goa-sun-sand",
        "title": "Tropical Goa Beach & Cruise Carnival",
        "destination": "North & South Goa",
        "category": "Goa & Kerala",
        "duration": "4 Days / 3 Nights",
        "price_inr": 9999,
        "original_price_inr": 14500,
        "badge": "Trending Beach",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        "highlights": ["Baga & Calangute Beach", "Mandovi Sunset Cruise", "Fort Aguada & Chapora", "Latin Quarter Fontainhas", "Water Sports Combo"],
        "inclusions": ["Resort with Swimming Pool", "Daily Buffet Breakfast", "Airport Transfers", "Sunset Cruise Ticket"]
    },
    {
        "id": "pkg-kerala-backwaters",
        "title": "Kerala God's Own Country & Houseboat",
        "destination": "Munnar • Thekkady • Alleppey",
        "category": "Goa & Kerala",
        "duration": "5 Days / 4 Nights",
        "price_inr": 18500,
        "original_price_inr": 25000,
        "badge": "Honeymoon Special",
        "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
        "highlights": ["Munnar Tea Plantations", "Alleppey Backwaters Cruise", "Periyar Wildlife Sanctuary", "Cheeyappara Waterfalls", "Ayurvedic Spa Experience"],
        "inclusions": ["Private Houseboat Stay", "All Meals on Houseboat", "Hill Resort in Munnar", "Private AC Cab"]
    },
    {
        "id": "pkg-delhi-same-day-darshan",
        "title": "Same Day Delhi Capital Sightseeing & Heritage Express",
        "destination": "Old Delhi • New Delhi • Akshardham Temple",
        "category": "Delhi",
        "duration": "1 Day (Full Day)",
        "price_inr": 3499,
        "original_price_inr": 5500,
        "badge": "Same Day Delhi Express",
        "image": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
        "highlights": ["Red Fort & Jama Masjid", "Qutub Minar (UNESCO)", "Humayun's Tomb & India Gate", "Rashtrapati Bhavan & Parliament", "Akshardham Temple Water Show"],
        "inclusions": ["Full Day Dedicated AC Cab with Chauffeur", "Doorstep Pickup & Drop in Delhi NCR", "All Fuel, Toll Taxes & Parking", "Sightseeing Coordination"]
    },
    {
        "id": "pkg-delhi-capital-sightseeing",
        "title": "Delhi Capital City Heritage & Sightseeing Tour",
        "destination": "Old Delhi • New Delhi • Swaminarayan Akshardham",
        "category": "Delhi",
        "duration": "2 Days / 1 Night",
        "price_inr": 6499,
        "original_price_inr": 9500,
        "badge": "Delhi Weekend Special",
        "image": "https://images.unsplash.com/photo-1592635196078-9fdc757f27f4?auto=format&fit=crop&w=800&q=80",
        "highlights": ["Red Fort & Jama Masjid", "Chandni Chowk Cycle Rickshaw Ride", "Qutub Minar & Humayun's Tomb", "India Gate & Rashtrapati Bhavan Drive", "Akshardham Temple Water Show"],
        "inclusions": ["1 Night 4★ Hotel Stay in Delhi", "Daily Buffet Breakfast", "Private AC Sedan with Chauffeur", "Rickshaw Ride Experience", "Airport / Station Transfers"]
    },
    {
        "id": "pkg-delhi-ncr-monuments-weekend",
        "title": "Grand Delhi Heritage, Culture & Food Walk Extravaganza",
        "destination": "Old Delhi • New Delhi • Mehrauli • Akshardham • Dilli Haat",
        "category": "Delhi",
        "duration": "3 Days / 2 Nights",
        "price_inr": 9499,
        "original_price_inr": 13999,
        "badge": "Complete Capital Tour",
        "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        "highlights": ["Mehrauli Archaeological Park & Qutub Minar", "Humayun's Tomb & Lodhi Art District", "Safdarjung Tomb & National War Memorial", "Chandni Chowk Spice Walk", "Akshardham Musical Fountain & Dilli Haat"],
        "inclusions": ["2 Nights 4★ Deluxe Hotel Stay in Delhi NCR", "Daily Buffet Breakfast & 1 Mughal Lunch/Dinner", "Dedicated AC Chauffeur Driven Vehicle", "Airport / Railway Station Transfers", "Monument Parking & Tolls"]
    },
    {
        "id": "pkg-agra-taj-same-day-express",
        "title": "Same Day Agra Taj Mahal & UNESCO Fort Express Tour",
        "destination": "Delhi NCR • Yamuna Expressway • Agra Taj Mahal • Agra Fort",
        "category": "Agra",
        "duration": "1 Day (Same Day Express)",
        "price_inr": 4499,
        "original_price_inr": 6500,
        "badge": "Same Day Taj Express",
        "image": "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
        "highlights": ["Taj Mahal guided tour with approved guide", "UNESCO Agra Fort Exploration", "Mehtab Bagh sunset view across Yamuna", "Agra Petha & marble inlay art demonstration", "Yamuna Expressway express travel"],
        "inclusions": ["Dedicated Private AC Sedan/SUV from Delhi NCR", "Doorstep Pickup & Drop", "Govt Approved Tour Guide in Agra", "All Expressway Tolls, Parking & Fuel"]
    },
    {
        "id": "pkg-agra-fatehpur-sikri-heritage",
        "title": "Agra Mughal Marvels & Taj Mahal Heritage Tour",
        "destination": "Agra • Fatehpur Sikri • Mehtab Bagh • Sikandra",
        "category": "Agra",
        "duration": "2 Days / 1 Night",
        "price_inr": 6999,
        "original_price_inr": 10500,
        "badge": "Agra Overnight Special",
        "image": "https://images.unsplash.com/photo-1608958435020-e8a7109ba809?auto=format&fit=crop&w=800&q=80",
        "highlights": ["Taj Mahal Sunrise Tour", "UNESCO Agra Fort Exploration", "Fatehpur Sikri & Buland Darwaza", "Mehtab Bagh Sunset View", "Agra Petha & Marble Craft Walk"],
        "inclusions": ["1 Night 4★ Hotel Stay near Taj VIP Gate", "Buffet Breakfast", "Private AC Cab from Delhi or Agra", "Approved Tour Guide", "All Tolls & Parking"]
    },
    {
        "id": "pkg-agra-taj-sunrise-sunset",
        "title": "Agra Taj Mahal Sunrise, Fatehpur Sikri & Royal Heritage Retreat",
        "destination": "Agra • Fatehpur Sikri • Sikandra • Itmad-ud-Daulah (Baby Taj)",
        "category": "Agra",
        "duration": "3 Days / 2 Nights",
        "price_inr": 10499,
        "original_price_inr": 15500,
        "badge": "Royal Agra Retreat",
        "image": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
        "highlights": ["Taj Mahal Sunrise Guided Excursion", "Mehtab Bagh Sunset Photography", "Tomb of I'timād-ud-Daulah (Baby Taj)", "Fatehpur Sikri Palace Complex & Buland Darwaza", "Agra Fort Mughal Palaces & Sheesh Mahal"],
        "inclusions": ["2 Nights 4★/5★ Luxury Hotel Stay in Agra", "Daily Buffet Breakfast & 1 Special Dinner", "Private AC Chauffeur Driven Vehicle", "Professional Guide for Taj Mahal, Agra Fort & Fatehpur Sikri", "Transfers from Delhi NCR / Agra"]
    },
    {
        "id": "pkg-jaipur-same-day-heritage",
        "title": "Same Day Royal Jaipur Pink City Express Tour",
        "destination": "Delhi NCR • Jaipur • Amer Fort • Hawa Mahal • Jal Mahal",
        "category": "Jaipur",
        "duration": "1 Day (Same Day Express)",
        "price_inr": 4999,
        "original_price_inr": 7500,
        "badge": "Same Day Jaipur Express",
        "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
        "highlights": ["Amer Fort Jeep ascent & Sheesh Mahal", "Jal Mahal photo-stop in Man Sagar Lake", "Hawa Mahal facade photo opportunity", "City Palace Museum & Jantar Mantar", "Johari & Bapu Bazaar shopping"],
        "inclusions": ["Dedicated Sanitized AC Cab with Driver", "Doorstep Pickup & Drop (Delhi NCR or Jaipur)", "Local Tour Guide at Amer Fort & City Palace", "Expressway Tolls, Taxes & Parking"]
    },
    {
        "id": "pkg-jaipur-heritage-haveli-retreat",
        "title": "Jaipur Pink City Heritage Havelis, Amer Fort & Chokhi Dhani Tour",
        "destination": "Jaipur • Amer • Nahargarh • Chokhi Dhani",
        "category": "Jaipur",
        "duration": "2 Days / 1 Night",
        "price_inr": 6999,
        "original_price_inr": 10500,
        "badge": "Jaipur Weekend Special",
        "image": "https://images.unsplash.com/photo-1617854818583-09e7f077a156?auto=format&fit=crop&w=800&q=80",
        "highlights": ["Amer Fort Jeep ascent & Sheesh Mahal", "City sunset panorama from Nahargarh Fort", "Chokhi Dhani Cultural Village Dinner", "City Palace & Jantar Mantar", "Jal Mahal & Bapu Bazaar shopping"],
        "inclusions": ["1 Night Deluxe Heritage Haveli / 4★ Hotel Stay", "Buffet Breakfast & Welcome Drink", "Private AC Cab for Transfers & Sightseeing", "Chokhi Dhani Cultural Dinner Ticket", "All Tolls & Parking"]
    },
    {
        "id": "pkg-jaipur-pink-city-royal",
        "title": "Jaipur Royal Pink City & Forts Experience",
        "destination": "Jaipur • Amer • Nahargarh • Jaigarh • Chokhi Dhani",
        "category": "Jaipur",
        "duration": "3 Days / 2 Nights",
        "price_inr": 9999,
        "original_price_inr": 14500,
        "badge": "Jaipur Grand Special",
        "image": "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80",
        "highlights": ["Amber Fort Jeep ascent & Sheesh Mahal", "Hawa Mahal & Jal Mahal photo-stop", "City Palace Museum & Jantar Mantar", "Sunset over Jaipur from Nahargarh Fort", "Chokhi Dhani Cultural Village & Dinner", "Jaigarh Fort & Albert Hall Museum"],
        "inclusions": ["2 Nights Heritage Haveli / 4★ Hotel Stay", "Daily Buffet Breakfast", "Private AC Cab for all Sightseeing", "Chokhi Dhani Dinner Ticket", "Local Guide at Amber Fort"]
    },
    {
        "id": "pkg-mathura-vrindavan-same-day",
        "title": "Same Day Sacred Mathura & Vrindavan Braj Darshan Express",
        "destination": "Delhi NCR • Mathura • Vrindavan • Prem Mandir",
        "category": "Mathura & Vrindavan",
        "duration": "1 Day (Same Day Darshan)",
        "price_inr": 3999,
        "original_price_inr": 5800,
        "badge": "Same Day Braj Express",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "highlights": ["Shri Krishna Janmasthan Mathura", "Banke Bihari Ji Temple in Vrindavan", "Dwarkadhish Temple & Vishram Ghat", "ISKCON Temple & Nidhivan grove", "Prem Mandir Evening Light & Water Show"],
        "inclusions": ["Dedicated Private AC Cab from Delhi NCR / Mathura", "Doorstep Pickup & Drop", "Darshan Timing Coordination", "All Tolls, Parking & Driver Allowances"]
    },
    {
        "id": "pkg-mathura-vrindavan-gokul-barsana",
        "title": "Divine Mathura, Vrindavan, Gokul & Barsana 2-Day Yatra",
        "destination": "Mathura • Vrindavan • Gokul • Barsana • Prem Mandir",
        "category": "Mathura & Vrindavan",
        "duration": "2 Days / 1 Night",
        "price_inr": 5999,
        "original_price_inr": 8800,
        "badge": "Braj Weekend Special",
        "image": "https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=800&q=80",
        "highlights": ["Shri Krishna Janmasthan & Dwarkadhish Temple", "Banke Bihari Ji, ISKCON & Nidhivan", "Prem Mandir Grand Light & Water Show", "Gokul Raman Reti & Chaurasi Khamba", "Barsana Shri Radha Rani Temple", "Vishram Ghat Evening Yamuna Aarti"],
        "inclusions": ["1 Night Deluxe Hotel / Ashram Stay in Vrindavan/Mathura", "Pure Satvik Breakfast & Dinner", "Private AC Cab for all Temple Sightseeing", "VIP Darshan Guidance", "All Tolls & Permits"]
    },
    {
        "id": "pkg-mathura-vrindavan-dham",
        "title": "Sacred Mathura & Vrindavan Dham Yatra (Braj Bhoomi Darshan)",
        "destination": "Mathura • Vrindavan • Gokul • Barsana • Govardhan",
        "category": "Mathura & Vrindavan",
        "duration": "3 Days / 2 Nights",
        "price_inr": 8499,
        "original_price_inr": 12000,
        "badge": "Complete Braj Dham",
        "image": "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80",
        "highlights": ["Shri Krishna Janmasthan Mathura", "Banke Bihari Ji & Nidhivan in Vrindavan", "Prem Mandir Musical Fountain & Light Show", "Govardhan Parikrama & Radha Kund", "Barsana Radha Rani Mandir & Gokul Raman Reti"],
        "inclusions": ["2 Nights Deluxe Hotel / Ashram Resort Stay", "Daily Pure Satvik Breakfast & Dinner", "Private Sanitized AC Cab", "Special Darshan Assistance", "Pickup & Drop from Delhi / Mathura"]
    },
    {
        "id": "pkg-golden-triangle-delhi-agra",
        "title": "Golden Triangle Express: Delhi & Agra Taj Tour",
        "destination": "New Delhi • Old Delhi • Agra • Fatehpur Sikri",
        "category": "Golden Triangle",
        "duration": "3 Days / 2 Nights",
        "price_inr": 9999,
        "original_price_inr": 14500,
        "badge": "Taj Heritage Express",
        "image": "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
        "highlights": ["Sunrise view of Taj Mahal", "UNESCO Agra Fort", "Fatehpur Sikri & Buland Darwaza", "Delhi Qutub Minar & India Gate", "Mehtab Bagh Sunset"],
        "inclusions": ["2 Nights 4★ Hotel Stay in Delhi & Agra", "Daily Buffet Breakfast", "Private AC Chauffeur Driven Cab", "Approved Tour Guide", "Tolls & Parking"]
    },
    {
        "id": "pkg-golden-triangle-classic",
        "title": "Golden Triangle Classic: Delhi, Agra & Jaipur Grand Tour",
        "destination": "Delhi • Agra • Fatehpur Sikri • Jaipur Pink City",
        "category": "Golden Triangle",
        "duration": "6 Days / 5 Nights",
        "price_inr": 18999,
        "original_price_inr": 26000,
        "badge": "India's #1 Circuit",
        "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
        "highlights": ["Delhi Qutub Minar & Humayun's Tomb", "Taj Mahal Sunrise & Agra Fort", "Fatehpur Sikri Buland Darwaza", "Jaipur Amber Fort Jeep Ascent", "Nahargarh Sunset & Chokhi Dhani Dinner"],
        "inclusions": ["5 Nights Deluxe 4★ Hotel / Heritage Haveli Stays", "Daily Buffet Breakfast", "Private Sanitized AC Vehicle", "City Guides at Delhi, Agra & Jaipur", "All Tolls & Permits"]
    },
    {
        "id": "pkg-delhi-mathura-agra-same-day",
        "title": "Delhi - Mathura - Vrindavan - Agra Heritage & Pilgrimage Circuit",
        "destination": "Delhi • Mathura • Vrindavan • Agra Taj Mahal",
        "category": "Golden Triangle",
        "duration": "4 Days / 3 Nights",
        "price_inr": 12999,
        "original_price_inr": 18500,
        "badge": "Pilgrimage + Heritage",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "highlights": ["Delhi Qutub Minar & Akshardham", "Krishna Janmabhoomi & Banke Bihari Ji", "Prem Mandir Evening Light Show", "Taj Mahal Sunrise & UNESCO Agra Fort", "Mehtab Bagh & Fatehpur Sikri"],
        "inclusions": ["3 Nights 4★ Hotel Stays (Delhi, Vrindavan, Agra)", "Daily Buffet Breakfast & Dinner", "Dedicated AC Chauffeur Driven Cab", "Tolls, Interstate Taxes & Parking"]
    }
]
