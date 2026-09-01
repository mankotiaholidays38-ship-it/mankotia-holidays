"""
Curated high-quality travel itinerary presets for popular pilgrimage and domestic tour circuits.
Used for offline fallback and fast responses in AI Service.
"""

POPULAR_DESTINATIONS = {
    "chardham": {
        "title": "Sacred Char Dham Yatra: Yamunotri, Gangotri, Kedarnath & Badrinath",
        "destination": "Char Dham (Uttarakhand)",
        "duration": "11 Days / 10 Nights",
        "estimated_cost_inr": "Price On Request",
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
                "afternoon": "Fly down via Helicopter or trek down to Gaurikund. Vehicle pickup from Sonprayag back to Guptkashi hotel.",
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
        "estimated_cost_inr": "Price On Request",
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
                "theme": "Return Drive & Farewell Drop-off",
                "morning": "Breakfast in Rudraprayag and drive towards Rishikesh/Haridwar.",
                "afternoon": "Stop at Devprayag Sangam & Ram Jhula Rishikesh.",
                "evening": "Drop-off at Haridwar Railway Station / Dehradun Airport.",
                "meal_recommendation": "Riverside cafe lunch in Rishikesh.",
                "stay_suggestion": "Drop at Destination / Onward Journey",
                "pro_tip": "Collect holy Gangajal water before your onward trip."
            }
        ]
    }
}
