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
    },
    "shimla_manali": {
        "title": "Enchanting Himachal: Shimla, Kullu & Manali Tour",
        "destination": "Shimla, Kullu & Manali",
        "duration": "5 Days / 4 Nights",
        "estimated_cost_inr": "Price On Request",
        "best_season": "March to June (Summer) & October to February (Winter/Snow)",
        "packing_essentials": [
            "Warm jackets, thermals, and woolen caps",
            "Comfortable trekking or walking shoes",
            "Motion sickness medication (winding mountain roads)",
            "Sunglasses and sunscreen (high altitude sun)",
            "Camera and power banks"
        ],
        "highlights": [
            "Explore the colonial charm of The Ridge & Mall Road in Shimla",
            "Visit Kufri for scenic Himalayan views and adventure activities",
            "Drive through the picturesque Kullu Valley and visit shawl factories",
            "Experience Solang Valley's thrilling adventure sports and snow",
            "Sightseeing at Hadimba Devi Temple and Vashisht Hot Springs"
        ],
        "days": [
            {
                "day_number": 1,
                "theme": "Arrival in Chandigarh & Scenic Drive to Shimla",
                "morning": "Pickup from Chandigarh Airport/Railway Station. Begin your beautiful drive towards the hills of Shimla.",
                "afternoon": "En-route lunch. Arrive in Shimla, the Queen of Hills, and check into your hotel.",
                "evening": "Stroll down the famous Mall Road, visit The Ridge, and enjoy the crisp mountain air.",
                "meal_recommendation": "Try some local Himachali Siddu or hot momos on Mall Road.",
                "stay_suggestion": "Deluxe Hotel in Shimla",
                "pro_tip": "Keep a jacket handy as temperatures drop in the evening."
            },
            {
                "day_number": 2,
                "theme": "Shimla Local Sightseeing & Kufri Excursion",
                "morning": "Post breakfast, head for a half-day excursion to Kufri, known for its panoramic views and nature parks.",
                "afternoon": "Return to Shimla. Visit the Jakhu Temple (dedicated to Lord Hanuman) and the historic Indian Institute of Advanced Studies.",
                "evening": "Free time for shopping at Lakkar Bazaar (famous for wooden crafts).",
                "meal_recommendation": "Hearty North Indian dinner at a popular Mall Road restaurant.",
                "stay_suggestion": "Same Hotel in Shimla",
                "pro_tip": "Beware of monkeys at Jakhu Temple; keep your sunglasses and phones secure."
            },
            {
                "day_number": 3,
                "theme": "Shimla to Manali via Scenic Kullu Valley",
                "morning": "Check out early and begin the long, picturesque drive to Manali (7-8 hours).",
                "afternoon": "En-route, stop in Kullu Valley. Visit a traditional Kullu Shawl factory and the Vaishno Devi Temple. Enjoy riverside views of the Beas River.",
                "evening": "Arrive in Manali by evening. Check into your hotel and relax after the long journey.",
                "meal_recommendation": "Warm Himachali Dham or traditional Indian dinner.",
                "stay_suggestion": "Riverside Resort/Hotel in Manali",
                "pro_tip": "The drive is winding; if prone to motion sickness, take medication beforehand."
            },
            {
                "day_number": 4,
                "theme": "Adventure in Solang Valley & Atal Tunnel",
                "morning": "Head to Solang Valley for a day of adventure. Enjoy paragliding, zorbing, or a ropeway ride.",
                "afternoon": "Depending on weather and road conditions, take a drive through the engineering marvel, Atal Tunnel, towards Sissu in Lahaul Valley.",
                "evening": "Return to Manali. Spend a cozy evening at cafes in Old Manali.",
                "meal_recommendation": "Trout fish or wood-fired pizza in Old Manali cafes.",
                "stay_suggestion": "Same Hotel in Manali",
                "pro_tip": "Start early to avoid traffic jams on the way to Solang Valley."
            },
            {
                "day_number": 5,
                "theme": "Manali Local Sightseeing & Departure to Chandigarh",
                "morning": "Visit the ancient Hadimba Devi Temple (surrounded by cedar forests) and the Vashisht Village known for its hot sulfur springs.",
                "afternoon": "Explore the Tibetan Monastery and pick up souvenirs. After lunch, begin your return journey towards Chandigarh.",
                "evening": "Drop-off at Chandigarh Airport/Railway Station for your onward journey with wonderful memories.",
                "meal_recommendation": "Comfort food during the drive back to the plains.",
                "stay_suggestion": "Drop at Destination / Onward Journey",
                "pro_tip": "Start the drive down by early afternoon as the journey to Chandigarh takes around 8 hours."
            }
        ]
    },
    "kedarnath_heli": {
        "title": "Kedarnath Helicopter VIP Darshan",
        "destination": "Kedarnath (Uttarakhand)",
        "duration": "3 Days / 2 Nights",
        "estimated_cost_inr": "Price On Request",
        "best_season": "May to June & Sept to Oct",
        "packing_essentials": ["Warm jackets", "Aadhar Card originals", "Yatra Registration Slip"],
        "highlights": ["10-Minute scenic helicopter flight", "VIP Darshan at Kedarnath Temple", "Comfortable base camp stay"],
        "days": [
            {
                "day_number": 1,
                "theme": "Arrival at Base & Helipad Briefing",
                "morning": "Pickup from Haridwar/Dehradun and drive along the scenic Mandakini river towards Guptkashi/Phata.",
                "afternoon": "Check-in at premium resort near the helipad. Complete biometric verification and weighing process for the flight.",
                "evening": "Visit ancient Triyuginarayan Temple or relax at resort. Early dinner.",
                "meal_recommendation": "Warm Satvik dinner at the resort.",
                "stay_suggestion": "Deluxe Resort near Phata/Sirsi Helipad",
                "pro_tip": "Pack only 2kg of essential luggage in a small backpack for the helicopter ride."
            },
            {
                "day_number": 2,
                "theme": "Helicopter Flight & Kedarnath Darshan",
                "morning": "Early morning transfer to helipad. Board the helicopter for a breathtaking 10-minute flight over the Himalayas to Kedarnath.",
                "afternoon": "Experience VIP Darshan at the Kedarnath Jyotirlinga. Soak in the spiritual aura and explore Bhairavnath Temple.",
                "evening": "Fly back to base helipad before sunset. Return to the resort and celebrate the successful darshan.",
                "meal_recommendation": "Hot herbal tea and local Garhwali Thali.",
                "stay_suggestion": "Same Resort near Helipad",
                "pro_tip": "Mountain weather is unpredictable; flights may be delayed, so keep a buffer time."
            },
            {
                "day_number": 3,
                "theme": "Return Journey to Haridwar/Dehradun",
                "morning": "Post breakfast, check out from the resort and commence the downhill journey.",
                "afternoon": "En-route lunch near Devprayag (Sangam of Alaknanda and Bhagirathi).",
                "evening": "Drop-off at Haridwar Railway Station or Dehradun Airport.",
                "meal_recommendation": "Riverside cafe lunch in Rishikesh.",
                "stay_suggestion": "Drop at Destination / Onward Journey",
                "pro_tip": "Collect holy Gangajal from Devprayag or Haridwar."
            }
        ]
    },
    "uttarakhand": {
        "title": "Uttarakhand Complete Tour (Nainital, Corbett, Mussoorie, Rishikesh)",
        "destination": "Uttarakhand",
        "duration": "6 Days / 5 Nights",
        "estimated_cost_inr": "Price On Request",
        "best_season": "March to June & Oct to Dec",
        "packing_essentials": ["Comfortable walking shoes", "Jungle safari clothing (earthy colors)", "Binoculars"],
        "highlights": ["Boating in Naini Lake", "Jungle Safari in Jim Corbett", "Kempty Falls in Mussoorie", "Ganga Aarti in Rishikesh"],
        "days": [
            {
                "day_number": 1,
                "theme": "Arrival & Nainital Lake City Tour",
                "morning": "Pickup from Delhi/Kathgodam and scenic drive up the Kumaon hills to Nainital.",
                "afternoon": "Check-in at hotel. Enjoy boating on the famous Naini Lake and visit the Naina Devi Temple.",
                "evening": "Stroll down the vibrant Mall Road and explore the Tibetan Market.",
                "meal_recommendation": "Momos and Thukpa at Tibetan Market.",
                "stay_suggestion": "Lakeview Hotel in Nainital",
                "pro_tip": "Hire a cycle rickshaw for a relaxed ride along the Mall Road."
            },
            {
                "day_number": 2,
                "theme": "Nainital Seven Lakes & Drive to Jim Corbett",
                "morning": "Excursion to Bhimtal, Sattal, and Naukuchiatal for serene nature views.",
                "afternoon": "Drive down from the hills towards the dense jungles of Jim Corbett National Park.",
                "evening": "Check-in at a jungle resort. Enjoy a bonfire and nature documentary screening.",
                "meal_recommendation": "Kumaoni style chicken curry or local paneer dishes.",
                "stay_suggestion": "Jungle Resort in Corbett",
                "pro_tip": "Sleep early to prepare for the pre-dawn jungle safari."
            },
            {
                "day_number": 3,
                "theme": "Corbett Jungle Safari & Transfer to Mussoorie",
                "morning": "Early 6 AM open jeep safari in Corbett Tiger Reserve. Spot elephants, deer, and if lucky, the Royal Bengal Tiger.",
                "afternoon": "Return for heavy breakfast. Check out and embark on a long scenic drive to Mussoorie, the Queen of Hills.",
                "evening": "Arrive in Mussoorie by late evening. Check-in and relax.",
                "meal_recommendation": "Hearty North Indian dinner after a long journey.",
                "stay_suggestion": "Hill-view Resort in Mussoorie",
                "pro_tip": "Safari zones require advance booking, ensure IDs match the permits."
            },
            {
                "day_number": 4,
                "theme": "Mussoorie Sightseeing & Kempty Falls",
                "morning": "Visit the famous cascading Kempty Falls and enjoy a refreshing dip or photography.",
                "afternoon": "Take the ropeway to Gun Hill for panoramic views of the Doon Valley and Himalayan peaks.",
                "evening": "Walk along Camel's Back Road and explore the cafes on Mall Road.",
                "meal_recommendation": "Try the famous bakeries on Mall Road.",
                "stay_suggestion": "Same Resort in Mussoorie",
                "pro_tip": "Visit Kempty falls early to avoid massive crowds."
            },
            {
                "day_number": 5,
                "theme": "Mussoorie to Rishikesh Yoga Capital",
                "morning": "Drive down from Mussoorie towards the spiritual town of Rishikesh.",
                "afternoon": "Check-in at hotel. Visit the iconic suspension bridges: Ram Jhula and Laxman Jhula.",
                "evening": "Witness the divine and musical Ganga Maha Aarti at Parmarth Niketan or Triveni Ghat.",
                "meal_recommendation": "Ayurvedic Satvik thali at Chotiwala Restaurant.",
                "stay_suggestion": "Riverside Hotel in Rishikesh",
                "pro_tip": "Rishikesh is completely vegetarian and alcohol-free."
            },
            {
                "day_number": 6,
                "theme": "Rishikesh Adventure & Departure",
                "morning": "Optional early morning Yoga session or thrilling White Water River Rafting on the Ganges.",
                "afternoon": "Visit the Beatles Ashram. Post lunch, begin your return journey.",
                "evening": "Drop-off at Dehradun Airport, Haridwar, or Delhi.",
                "meal_recommendation": "Organic cafe breakfast overlooking the Ganges.",
                "stay_suggestion": "Drop at Destination / Onward Journey",
                "pro_tip": "Rafting has age and health restrictions; check with the guide beforehand."
            }
        ]
    },
    "auli_chopta": {
        "title": "Auli Ski Paradise & Chopta Tungnath Trek",
        "destination": "Auli & Chopta",
        "duration": "5 Days / 4 Nights",
        "estimated_cost_inr": "Price On Request",
        "best_season": "Dec to Feb (Snow) or April to June (Meadows)",
        "packing_essentials": ["Heavy thermals and snow-proof jackets", "Waterproof trekking boots", "Sunglasses with UV protection"],
        "highlights": ["Asia's longest cable car ride in Auli", "Skiing and snow activities", "Trek to Tungnath (Highest Shiva Temple)", "Camping in Chopta meadows"],
        "days": [
            {
                "day_number": 1,
                "theme": "Arrival in Haridwar & Drive to Chopta",
                "morning": "Pickup from Haridwar/Rishikesh and drive along the Alaknanda river.",
                "afternoon": "Pass through Devprayag and Rudraprayag. Stop for lunch en-route.",
                "evening": "Arrive in Chopta (Mini Switzerland of India). Check-in to your luxury Swiss camp.",
                "meal_recommendation": "Warm Pahadi dinner around a bonfire.",
                "stay_suggestion": "Swiss Camps in Chopta",
                "pro_tip": "Chopta has limited electricity, carry fully charged power banks."
            },
            {
                "day_number": 2,
                "theme": "Tungnath & Chandrashila Peak Trek",
                "morning": "Start the 3.5 km trek through rhododendron forests to Tungnath, the highest Shiva temple in the world.",
                "afternoon": "For the adventurous, trek another 1.5 km to Chandrashila Peak (13,000 ft) for a 360-degree view of the Himalayas.",
                "evening": "Trek back down to the campsite. Relax those muscles with hot soup and dinner.",
                "meal_recommendation": "Hot Maggi and ginger tea during the trek.",
                "stay_suggestion": "Same Camps in Chopta",
                "pro_tip": "Carry a sturdy trekking pole and stay hydrated to prevent altitude sickness."
            },
            {
                "day_number": 3,
                "theme": "Chopta to Joshimath & Auli Ropeway",
                "morning": "Post breakfast, enjoy the scenic drive down from Chopta towards Joshimath.",
                "afternoon": "Take the spectacular 4 km cable car (Gondola) ride from Joshimath up to Auli.",
                "evening": "Check-in at Auli resort. Enjoy the sunset casting a golden glow on Nanda Devi peak.",
                "meal_recommendation": "Continental or North Indian dinner at the resort.",
                "stay_suggestion": "Resort in Auli / Joshimath",
                "pro_tip": "The ropeway ticket counter closes early; ensure you reach Joshimath by 3 PM."
            },
            {
                "day_number": 4,
                "theme": "Auli Snow Activities & Artificial Lake",
                "morning": "Spend the day enjoying skiing (with instructors) or playing in the snow meadows.",
                "afternoon": "Visit the Auli Artificial Lake, the world's highest man-made lake.",
                "evening": "Take the chairlift ride for panoramic views. Return to Joshimath/Auli hotel.",
                "meal_recommendation": "Hot chocolate and local snacks.",
                "stay_suggestion": "Resort in Auli / Joshimath",
                "pro_tip": "Rent snow boots and ski gear from local vendors near the GMVN base."
            },
            {
                "day_number": 5,
                "theme": "Return Journey to Haridwar/Rishikesh",
                "morning": "Check out early and begin the long drive down to the plains.",
                "afternoon": "Lunch stop at Srinagar or Devprayag.",
                "evening": "Drop-off at Haridwar or Rishikesh.",
                "meal_recommendation": "Traditional thali en-route.",
                "stay_suggestion": "Drop at Destination / Onward Journey",
                "pro_tip": "Roads can face occasional landslides during rain; keep a buffer for your return train/flight."
            }
        ]
    },
    "kashmir": {
        "title": "Kashmir Luxury Tour (Srinagar, Gulmarg, Pahalgam)",
        "destination": "Kashmir",
        "duration": "5 Days / 4 Nights",
        "estimated_cost_inr": "Price On Request",
        "best_season": "April to October (Pleasant) or Jan to Feb (Snow)",
        "packing_essentials": ["Warm woolens", "Comfortable walking shoes", "Valid ID card for checkpoints"],
        "highlights": ["Houseboat stay on Dal Lake", "Shikara Ride", "Gulmarg Gondola Ride to Mt. Apharwat", "Pahalgam Betaab Valley"],
        "days": [
            {
                "day_number": 1,
                "theme": "Srinagar Arrival & Houseboat Experience",
                "morning": "Pickup from Srinagar Airport (SXR). Transfer to Dal Lake or Nigeen Lake.",
                "afternoon": "Check-in at a premium traditional Houseboat. Enjoy a 1-hour romantic Shikara ride exploring floating gardens.",
                "evening": "Relax on the houseboat deck watching the sunset.",
                "meal_recommendation": "Authentic Kashmiri Kahwa (saffron tea) and Wazwan dinner.",
                "stay_suggestion": "Luxury Houseboat in Srinagar",
                "pro_tip": "Buy saffron and papier-mâché crafts directly from floating market vendors."
            },
            {
                "day_number": 2,
                "theme": "Srinagar Mughal Gardens & City Tour",
                "morning": "Visit the magnificent Mughal Gardens: Shalimar Bagh, Nishat Bagh, and Chashma Shahi.",
                "afternoon": "Visit the Shankaracharya Temple perched on a hilltop for a sweeping view of Srinagar.",
                "evening": "Explore the local markets of Lal Chowk for Pashmina shawls and dry fruits.",
                "meal_recommendation": "Try Rogan Josh or Gushtaba at a local restaurant.",
                "stay_suggestion": "Premium Hotel in Srinagar",
                "pro_tip": "Bargaining is expected when buying Kashmiri shawls and carpets."
            },
            {
                "day_number": 3,
                "theme": "Day Excursion to Gulmarg (Meadow of Flowers)",
                "morning": "Drive to Gulmarg. Witness snow-capped peaks and pine forests.",
                "afternoon": "Experience the world-famous Gulmarg Gondola ride (Phase 1 & Phase 2) up to Mt. Apharwat (13,000 ft).",
                "evening": "Enjoy snow activities or pony rides before driving back to Srinagar.",
                "meal_recommendation": "Hot snacks and tea near the Gondola base station.",
                "stay_suggestion": "Same Hotel in Srinagar",
                "pro_tip": "Pre-book Gondola tickets online months in advance as they sell out quickly."
            },
            {
                "day_number": 4,
                "theme": "Day Excursion to Pahalgam (Valley of Shepherds)",
                "morning": "Drive to Pahalgam via the saffron fields of Pampore and Awantipora ruins.",
                "afternoon": "Visit the breathtaking Betaab Valley, Aru Valley, and Chandanwari via local union taxi.",
                "evening": "Stroll by the Lidder River and soak in the tranquil pine-scented air. Return to Srinagar.",
                "meal_recommendation": "Fresh river trout fish.",
                "stay_suggestion": "Same Hotel in Srinagar",
                "pro_tip": "Outside commercial vehicles are not allowed for Pahalgam local sightseeing; you must hire a local taxi union cab."
            },
            {
                "day_number": 5,
                "theme": "Srinagar Departure",
                "morning": "Enjoy a relaxed breakfast. Last-minute souvenir shopping if time permits.",
                "afternoon": "Transfer to Srinagar Airport for your return flight.",
                "evening": "Departure.",
                "meal_recommendation": "Bakery items like Girda or Tsot from local Kashmiri bakeries.",
                "stay_suggestion": "Drop at Destination / Onward Journey",
                "pro_tip": "Srinagar Airport has multiple security checks; arrive at least 3 hours before your flight."
            }
        ]
    },
    "delhi": {
        "title": "Delhi Capital Heritage Tour",
        "destination": "Delhi",
        "duration": "2 Days / 1 Night",
        "estimated_cost_inr": "Price On Request",
        "best_season": "October to March",
        "packing_essentials": ["Comfortable walking shoes", "Sunglasses and hat", "Metro card or change for transport"],
        "highlights": ["Red Fort & Jama Masjid", "India Gate & Rashtrapati Bhavan", "Qutub Minar", "Lotus Temple"],
        "days": [
            {
                "day_number": 1,
                "theme": "Old Delhi Heritage & Lutyens' Delhi",
                "morning": "Pickup in Delhi. Visit the majestic Red Fort and India's largest mosque, Jama Masjid.",
                "afternoon": "Enjoy a thrilling cycle rickshaw ride through the narrow lanes of Chandni Chowk. Drive past India Gate, Parliament House, and Rashtrapati Bhavan.",
                "evening": "Visit the peaceful Humayun's Tomb at sunset.",
                "meal_recommendation": "Famous Parathas at Paranthe Wali Gali or Karim's kebabs.",
                "stay_suggestion": "4-Star Hotel in Central/South Delhi",
                "pro_tip": "Dress modestly when visiting Jama Masjid (shoulders and knees covered)."
            },
            {
                "day_number": 2,
                "theme": "South Delhi Architecture & Culture",
                "morning": "Visit the towering Qutub Minar complex and marvel at the Iron Pillar.",
                "afternoon": "Find inner peace at the stunning Lotus Temple (Bahá'í House of Worship). Explore Dilli Haat for regional handicrafts.",
                "evening": "Drop-off at Delhi Airport or Railway Station.",
                "meal_recommendation": "Regional thali at Dilli Haat.",
                "stay_suggestion": "Drop at Destination / Onward Journey",
                "pro_tip": "Red Fort and Lotus Temple are closed on Mondays."
            }
        ]
    },
    "agra": {
        "title": "Agra & Taj Mahal Express",
        "destination": "Agra",
        "duration": "2 Days / 1 Night",
        "estimated_cost_inr": "Price On Request",
        "best_season": "October to March",
        "packing_essentials": ["Valid ID for monument entry", "Comfortable walking shoes", "Camera"],
        "highlights": ["Sunrise at Taj Mahal", "Agra Fort", "Fatehpur Sikri"],
        "days": [
            {
                "day_number": 1,
                "theme": "Arrival, Agra Fort & Mehtab Bagh",
                "morning": "Arrive in Agra. Visit the massive Agra Fort, a UNESCO World Heritage site made of red sandstone.",
                "afternoon": "Check-in to the hotel and relax. Visit the tomb of Itimad-ud-Daulah (Baby Taj).",
                "evening": "Watch the sunset over the Taj Mahal from Mehtab Bagh across the Yamuna River.",
                "meal_recommendation": "Try the famous Agra Petha (sweet pumpkin candy).",
                "stay_suggestion": "Premium Hotel in Agra (Taj Ganj area)",
                "pro_tip": "Buy tickets online in advance to skip the long queues at monuments."
            },
            {
                "day_number": 2,
                "theme": "Sunrise Taj Mahal & Fatehpur Sikri",
                "morning": "Early morning visit to the Taj Mahal to witness it bathed in the golden hues of sunrise.",
                "afternoon": "Return for breakfast. Drive to the abandoned ghost city of Fatehpur Sikri and explore Buland Darwaza.",
                "evening": "Departure/Drop-off.",
                "meal_recommendation": "Mughlai cuisine like Chicken Tikka or Paneer Butter Masala.",
                "stay_suggestion": "Drop at Destination / Onward Journey",
                "pro_tip": "The Taj Mahal is closed every Friday for general viewing."
            }
        ]
    },
    "jaipur": {
        "title": "Jaipur Pink City Royal Tour",
        "destination": "Jaipur",
        "duration": "3 Days / 2 Nights",
        "estimated_cost_inr": "Price On Request",
        "best_season": "October to March",
        "packing_essentials": ["Colorful ethnic wear for photos", "Sunscreen", "Comfortable footwear"],
        "highlights": ["Amber Fort Elephant/Jeep Ride", "Hawa Mahal", "City Palace", "Jantar Mantar Observatory"],
        "days": [
            {
                "day_number": 1,
                "theme": "Arrival, City Palace & Local Bazaars",
                "morning": "Arrive in Jaipur and check-in to a heritage hotel. Visit the magnificent City Palace.",
                "afternoon": "Explore the Jantar Mantar (UNESCO World Heritage astronomical observatory).",
                "evening": "Shop for traditional Jaipuri jutties, block prints, and jewelry at Johari Bazaar and Bapu Bazaar.",
                "meal_recommendation": "Traditional Dal Baati Churma at Chokhi Dhani.",
                "stay_suggestion": "Heritage Haveli/Hotel in Jaipur",
                "pro_tip": "Bargain politely but firmly in the local bazaars."
            },
            {
                "day_number": 2,
                "theme": "Majestic Forts of Jaipur",
                "morning": "Photo stop at Hawa Mahal (Palace of Winds). Proceed to the grand Amber Fort; enjoy an elephant or jeep ride to the top.",
                "afternoon": "Visit the Jal Mahal (Water Palace) for picturesque photos. Explore Nahargarh Fort for sweeping city views.",
                "evening": "Watch the sunset from Nahargarh or attend the light and sound show at Amber Fort.",
                "meal_recommendation": "Laal Maas (spicy Rajasthani meat curry) or Gatte Ki Sabzi.",
                "stay_suggestion": "Same Hotel in Jaipur",
                "pro_tip": "Visit Hawa Mahal early in the morning when the sun hits the front facade directly for the best photos."
            },
            {
                "day_number": 3,
                "theme": "Albert Hall Museum & Departure",
                "morning": "Visit the Albert Hall Museum, a stunning example of Indo-Saracenic architecture.",
                "afternoon": "Visit the serene Birla Mandir. Final souvenir shopping.",
                "evening": "Drop-off at Jaipur Airport or Railway Station.",
                "meal_recommendation": "Kachori and lassi at Rawat Mishtan Bhandar.",
                "stay_suggestion": "Drop at Destination / Onward Journey",
                "pro_tip": "Check out the ancient Egyptian mummy kept in the Albert Hall Museum."
            }
        ]
    },
    "mathura": {
        "title": "Mathura & Vrindavan Krishna Janmabhoomi Tour",
        "destination": "Mathura & Vrindavan",
        "duration": "3 Days / 2 Nights",
        "estimated_cost_inr": "Price On Request",
        "best_season": "October to March (or during Holi/Janmashtami)",
        "packing_essentials": ["Modest clothing", "Slip-on shoes for temple hopping", "Small bag for Prasad"],
        "highlights": ["Krishna Janmasthan Temple", "Banke Bihari Temple", "Prem Mandir Evening Lighting", "Govardhan Parikrama"],
        "days": [
            {
                "day_number": 1,
                "theme": "Birthplace of Lord Krishna",
                "morning": "Arrive in Mathura. Visit the Shri Krishna Janmasthan Temple complex (the exact birthplace).",
                "afternoon": "Visit the Dwarkadhish Temple and take a boat ride on the Yamuna river at Vishram Ghat.",
                "evening": "Attend the beautiful evening Yamuna Aarti at Vishram Ghat.",
                "meal_recommendation": "Mathura's famous Peda and hot milk.",
                "stay_suggestion": "Hotel in Mathura or Vrindavan",
                "pro_tip": "Electronic items and leather are strictly prohibited inside the Krishna Janmasthan temple."
            },
            {
                "day_number": 2,
                "theme": "Temples of Vrindavan",
                "morning": "Drive to Vrindavan. Seek blessings at the highly revered Banke Bihari Temple and ISKCON Temple.",
                "afternoon": "Visit the mysterious Nidhivan, where it's believed Lord Krishna still performs the Raas Leela at night.",
                "evening": "Witness the spectacular musical fountain and color-changing lighting at Prem Mandir.",
                "meal_recommendation": "Pure vegetarian Satvik meals at temple ashrams.",
                "stay_suggestion": "Same Hotel in Mathura/Vrindavan",
                "pro_tip": "Beware of mischievous monkeys in Vrindavan who often snatch spectacles and phones."
            },
            {
                "day_number": 3,
                "theme": "Govardhan Hill & Departure",
                "morning": "Drive to Govardhan. Visit the sacred Govardhan Hill, Radha Kund, and Shyam Kund.",
                "afternoon": "Complete your spiritual journey with a visit to the Kusum Sarovar.",
                "evening": "Departure and drop-off.",
                "meal_recommendation": "Kachori and Jalebi breakfast.",
                "stay_suggestion": "Drop at Destination / Onward Journey",
                "pro_tip": "If you wish to do the full 21km Govardhan Parikrama, hire an e-rickshaw."
            }
        ]
    },
    "golden_triangle": {
        "title": "The Golden Triangle (Delhi, Agra, Jaipur)",
        "destination": "Delhi, Agra, Jaipur",
        "duration": "6 Days / 5 Nights",
        "estimated_cost_inr": "Price On Request",
        "best_season": "October to March",
        "packing_essentials": ["Comfortable walking shoes", "Sunscreen and hat", "Universal power adapter"],
        "highlights": ["India Gate & Qutub Minar", "Taj Mahal Sunrise", "Amber Fort & Hawa Mahal", "Fatehpur Sikri"],
        "days": [
            {
                "day_number": 1,
                "theme": "Arrival & Old Delhi Heritage",
                "morning": "Pickup from Delhi Airport. Visit Jama Masjid and enjoy a rickshaw ride in Chandni Chowk.",
                "afternoon": "Drive past India Gate and Parliament. Visit Humayun's Tomb.",
                "evening": "Check-in to your Delhi hotel and relax.",
                "meal_recommendation": "North Indian Mughlai cuisine.",
                "stay_suggestion": "4-Star Hotel in Delhi",
                "pro_tip": "Start early to avoid Delhi's notorious peak-hour traffic."
            },
            {
                "day_number": 2,
                "theme": "New Delhi to Agra & Agra Fort",
                "morning": "Visit the towering Qutub Minar and Lotus Temple.",
                "afternoon": "Drive to Agra via the Yamuna Expressway (approx. 3.5 hours).",
                "evening": "Check-in to Agra hotel. Visit the historic Agra Fort before sunset.",
                "meal_recommendation": "Agra Petha and Mughlai dinner.",
                "stay_suggestion": "Premium Hotel in Agra",
                "pro_tip": "Keep toll cash ready for the Yamuna Expressway if not using FASTag."
            },
            {
                "day_number": 3,
                "theme": "Sunrise at Taj Mahal & Drive to Jaipur",
                "morning": "Experience the majestic Taj Mahal at sunrise. Return to hotel for breakfast.",
                "afternoon": "Drive to Jaipur. En-route, visit the magnificent ghost city of Fatehpur Sikri and the stepwell of Chand Baori (Abhaneri).",
                "evening": "Arrive in Jaipur (the Pink City) and check-in to your heritage hotel.",
                "meal_recommendation": "Rajasthani Thali.",
                "stay_suggestion": "Heritage Hotel in Jaipur",
                "pro_tip": "Taj Mahal is closed on Fridays."
            },
            {
                "day_number": 4,
                "theme": "Jaipur Forts & Palaces",
                "morning": "Photo stop at Hawa Mahal. Visit the grand Amber Fort.",
                "afternoon": "Explore the City Palace and the Jantar Mantar observatory.",
                "evening": "Visit the local bazaars for block-printed textiles and jewelry.",
                "meal_recommendation": "Dal Baati Churma.",
                "stay_suggestion": "Same Hotel in Jaipur",
                "pro_tip": "Hire government-approved guides at monuments for accurate history."
            },
            {
                "day_number": 5,
                "theme": "Jaipur Culture & Return to Delhi",
                "morning": "Visit the Albert Hall Museum or Nahargarh Fort for a sweeping city view.",
                "afternoon": "Post lunch, begin the drive back to Delhi (approx. 5 hours).",
                "evening": "Arrive in Delhi. Final evening at leisure or visit Dilli Haat.",
                "meal_recommendation": "Continental or Indian dinner at hotel.",
                "stay_suggestion": "4-Star Hotel in Delhi",
                "pro_tip": "Highway dhabas offer excellent fresh food during the drive."
            },
            {
                "day_number": 6,
                "theme": "Departure",
                "morning": "Relaxed breakfast. Final souvenir shopping at Connaught Place.",
                "afternoon": "Transfer to Delhi Airport/Railway Station for departure.",
                "evening": "Drop-off.",
                "meal_recommendation": "Try a famous South Indian thali in Connaught Place.",
                "stay_suggestion": "Drop at Destination / Onward Journey",
                "pro_tip": "Ensure your baggage weight is within limits before heading to the airport."
            }
        ]
    },
    "rajasthan": {
        "title": "Royal Rajasthan Complete (Jodhpur, Udaipur, Jaisalmer)",
        "destination": "Rajasthan",
        "duration": "6 Days / 5 Nights",
        "estimated_cost_inr": "Price On Request",
        "best_season": "October to March",
        "packing_essentials": ["Light cotton clothing for day", "Warm jacket for desert nights", "Sunscreen and sunglasses"],
        "highlights": ["Mehrangarh Fort in Blue City", "Lake Pichola Boat Ride in White City", "Desert Safari in Golden City"],
        "days": [
            {
                "day_number": 1,
                "theme": "Arrival in Blue City (Jodhpur)",
                "morning": "Arrive in Jodhpur. Check-in to hotel. Visit the imposing Mehrangarh Fort towering over the city.",
                "afternoon": "Visit the white marble cenotaph, Jaswant Thada, and Umaid Bhawan Palace Museum.",
                "evening": "Explore the vibrant Sardar Market around the Clock Tower.",
                "meal_recommendation": "Makhaniya Lassi and Mirchi Bada at Shri Mishrilal Hotel.",
                "stay_suggestion": "Heritage Hotel in Jodhpur",
                "pro_tip": "The audio guide at Mehrangarh Fort is highly recommended."
            },
            {
                "day_number": 2,
                "theme": "Drive to Golden City (Jaisalmer)",
                "morning": "Drive through the Thar desert to Jaisalmer (approx. 5 hours).",
                "afternoon": "Check-in to hotel. Visit the serene Gadisar Lake and Vyas Chhatri.",
                "evening": "Relax and enjoy the golden hues of the sunset over the sandstone city.",
                "meal_recommendation": "Ker Sangri and Bajre ki Roti.",
                "stay_suggestion": "Premium Hotel in Jaisalmer",
                "pro_tip": "Keep yourself hydrated during the desert drive."
            },
            {
                "day_number": 3,
                "theme": "Jaisalmer Fort & Desert Safari",
                "morning": "Explore the Jaisalmer Fort (Sonar Quila), the only living fort in India, and the intricate Patwon Ki Haveli.",
                "afternoon": "Drive to the Sam Sand Dunes. Experience a thrilling Jeep Safari and Camel Ride on the dunes.",
                "evening": "Enjoy cultural Rajasthani folk dance (Kalbelia) and musical performances by the campfire at the desert camp.",
                "meal_recommendation": "Traditional Rajasthani buffet at the desert camp.",
                "stay_suggestion": "Luxury Desert Camp in Sam Sand Dunes",
                "pro_tip": "Nights in the desert drop to freezing temperatures in winter; dress warmly."
            },
            {
                "day_number": 4,
                "theme": "Drive to City of Lakes (Udaipur)",
                "morning": "Check out from the desert camp and embark on a long scenic drive to Udaipur (approx. 8 hours).",
                "afternoon": "En-route, stop at the stunning Ranakpur Jain Temple, famous for its 1444 uniquely carved marble pillars.",
                "evening": "Arrive in Udaipur. Check-in and relax at your lake-facing hotel.",
                "meal_recommendation": "Dinner overlooking Lake Pichola.",
                "stay_suggestion": "Lakeview Hotel in Udaipur",
                "pro_tip": "Leather items are strictly prohibited inside Ranakpur Temple."
            },
            {
                "day_number": 5,
                "theme": "Udaipur Royal Palaces & Lakes",
                "morning": "Visit the massive City Palace complex and the ancient Jagdish Temple.",
                "afternoon": "Stroll through the beautiful Saheliyon Ki Bari (Garden of the Maidens). Take a scenic boat ride on Lake Pichola to Jag Mandir.",
                "evening": "Watch the Dharohar folk dance show at Bagore Ki Haveli.",
                "meal_recommendation": "Try the royal Mewari cuisine.",
                "stay_suggestion": "Same Hotel in Udaipur",
                "pro_tip": "Book the sunset slot for the Lake Pichola boat ride for the best views."
            },
            {
                "day_number": 6,
                "theme": "Departure",
                "morning": "Visit the Monsoon Palace (Sajjangarh) for panoramic views of the city and lakes.",
                "afternoon": "Transfer to Udaipur Airport or Railway Station for departure.",
                "evening": "Drop-off.",
                "meal_recommendation": "Quick bites at local cafes.",
                "stay_suggestion": "Drop at Destination / Onward Journey",
                "pro_tip": "Monsoon palace involves a steep winding drive via forest department jeeps."
            }
        ]
    },
    "goa": {
        "title": "Tropical Goa Beach Holiday",
        "destination": "Goa",
        "duration": "4 Days / 3 Nights",
        "estimated_cost_inr": "Price On Request",
        "best_season": "October to March",
        "packing_essentials": ["Swimwear and beach cover-ups", "Sunscreen and sunglasses", "Light cotton resort wear"],
        "highlights": ["Baga & Calangute Beaches", "Aguada Fort", "Old Goa Churches", "Mandovi River Cruise"],
        "days": [
            {
                "day_number": 1,
                "theme": "Arrival & North Goa Beaches",
                "morning": "Arrival at Goa Airport (Dabolim/Mopa) and transfer to a North Goa beach resort.",
                "afternoon": "Relax at the famous Calangute or Baga beach. Enjoy thrilling water sports.",
                "evening": "Experience the vibrant nightlife at Tito's Lane or a beachfront shack.",
                "meal_recommendation": "Goan Fish Curry and Prawn Balchão at a beach shack.",
                "stay_suggestion": "Beach Resort in North Goa",
                "pro_tip": "Always negotiate prices for water sports upfront."
            },
            {
                "day_number": 2,
                "theme": "Forts & River Cruise",
                "morning": "Visit the historic Aguada Fort and its lighthouse, offering sweeping views of the Arabian Sea.",
                "afternoon": "Explore the vibrant streets of Panjim (Fontainhas - Latin Quarter) for colorful Portuguese architecture.",
                "evening": "Enjoy a sunset cruise on the Mandovi River with live Goan music and dance.",
                "meal_recommendation": "Pork Vindaloo or Chicken Xacuti in Panjim.",
                "stay_suggestion": "Same Resort in North Goa",
                "pro_tip": "Fontainhas is perfect for Instagram-worthy walking tours."
            },
            {
                "day_number": 3,
                "theme": "South Goa Heritage & Serenity",
                "morning": "Drive to South Goa. Visit the UNESCO World Heritage churches of Old Goa: Basilica of Bom Jesus and Se Cathedral.",
                "afternoon": "Visit the serene and pristine Colva or Palolem Beach in South Goa. Relax on the white sands.",
                "evening": "Visit the Shri Mangeshi Temple. Return to your resort.",
                "meal_recommendation": "Bebinca (traditional Goan layered dessert).",
                "stay_suggestion": "Same Resort in North Goa (or shift to South Goa)",
                "pro_tip": "Modest clothing is required to enter the Old Goa churches."
            },
            {
                "day_number": 4,
                "theme": "Departure",
                "morning": "Enjoy a relaxed breakfast by the pool. Last-minute cashew and spice shopping.",
                "afternoon": "Transfer to Goa Airport or Madgaon Railway Station for your return journey.",
                "evening": "Drop-off.",
                "meal_recommendation": "Continental breakfast at the resort.",
                "stay_suggestion": "Drop at Destination / Onward Journey",
                "pro_tip": "Buy Goan cashews from local markets rather than tourist hotspots."
            }
        ]
    },
    "kerala": {
        "title": "Kerala God's Own Country (Munnar, Thekkady, Alleppey)",
        "destination": "Kerala",
        "duration": "5 Days / 4 Nights",
        "estimated_cost_inr": "Price On Request",
        "best_season": "September to March",
        "packing_essentials": ["Umbrella or light raincoat", "Comfortable walking shoes", "Mosquito repellent"],
        "highlights": ["Munnar Tea Gardens", "Periyar Wildlife Sanctuary", "Alleppey Houseboat Backwaters"],
        "days": [
            {
                "day_number": 1,
                "theme": "Arrival in Kochi & Drive to Munnar",
                "morning": "Pickup from Kochi Airport. Drive to the hill station of Munnar, surrounded by lush green tea estates.",
                "afternoon": "Stop at Cheeyappara and Valara Waterfalls en-route.",
                "evening": "Check-in at the resort in Munnar. Enjoy the cool, misty climate.",
                "meal_recommendation": "Kerala style chicken roast with Appam.",
                "stay_suggestion": "Hill Resort in Munnar",
                "pro_tip": "The road to Munnar has hairpin bends; carry motion sickness pills."
            },
            {
                "day_number": 2,
                "theme": "Munnar Tea Gardens Sightseeing",
                "morning": "Visit the Tata Tea Museum and lush Eravikulam National Park (home to the endangered Nilgiri Tahr).",
                "afternoon": "Explore the Mattupetty Dam (optional speed boating) and Echo Point.",
                "evening": "Visit the local spice and tea markets.",
                "meal_recommendation": "Freshly brewed Munnar tea and local snacks.",
                "stay_suggestion": "Same Resort in Munnar",
                "pro_tip": "Eravikulam National Park is closed during the calving season (Feb-March)."
            },
            {
                "day_number": 3,
                "theme": "Wild Thekkady (Periyar)",
                "morning": "Drive to Thekkady. The route is filled with spice plantations.",
                "afternoon": "Enjoy a scenic boat cruise on Periyar Lake to spot wild elephants and bisons on the banks.",
                "evening": "Attend a traditional Kathakali dance performance or Kalaripayattu martial arts show.",
                "meal_recommendation": "Karimeen Pollichathu (Pearl spot fish baked in plantain leaf).",
                "stay_suggestion": "Jungle Resort in Thekkady",
                "pro_tip": "Book the Periyar boat cruise tickets online well in advance."
            },
            {
                "day_number": 4,
                "theme": "Alleppey Backwaters Houseboat",
                "morning": "Drive to Alleppey, the Venice of the East.",
                "afternoon": "Board your private traditional Kettuvallam (Houseboat). Cruise through the serene backwaters, observing village life.",
                "evening": "The houseboat docks at sunset. Enjoy a romantic dinner on the deck.",
                "meal_recommendation": "Traditional Kerala Sadhya served on a banana leaf on the houseboat.",
                "stay_suggestion": "Premium Houseboat in Alleppey",
                "pro_tip": "Houseboats dock at 5:30 PM due to local regulations; the AC usually operates only at night."
            },
            {
                "day_number": 5,
                "theme": "Departure from Kochi",
                "morning": "Check out from the houseboat after breakfast.",
                "afternoon": "Drive to Kochi. If time permits, visit the Chinese Fishing Nets, Fort Kochi, and Jewish Synagogue.",
                "evening": "Drop-off at Kochi Airport for your onward flight.",
                "meal_recommendation": "South Indian filter coffee and dosas.",
                "stay_suggestion": "Drop at Destination / Onward Journey",
                "pro_tip": "Fort Kochi area has excellent colonial-era cafes."
            }
        ]
    }
}
