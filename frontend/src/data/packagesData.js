export const PACKAGES = [
  // ==========================================
  // 1. CHAR DHAM & PILGRIMAGE PACKAGES (7 tours)
  // ==========================================
  {
    id: "pkg-chardham-deluxe",
    title: "Sacred Char Dham Yatra Deluxe Tour",
    destination: "Yamunotri • Gangotri • Kedarnath • Badrinath",
    category: "Pilgrimage",
    duration: "10 Nights / 11 Days",
    price_inr: 34999,
    original_price_inr: 45000,
    badge: "Divine Best Seller",
    rating: 4.9,
    reviews_count: 148,
    image: "/images/packages/kedarnath_temple.jpg",
    description: "Complete spiritual pilgrimage covering all four sacred Himalayan Dhams with dedicated mountain vehicle, deluxe hotel stays, biometric registration assistance, and VIP Darshan guidance.",
    highlights: [
      "Complete 4 Holy Dhams in Uttarakhand Himalayas",
      "Yamunotri Holy Bath at Surya Kund & Divya Shila",
      "Gangotri Temple Darshan on sacred Bhagirathi banks",
      "Kedarnath Dham Temple Darshan with Heli / Trek support",
      "Badrinath Ji Darshan & Mana (First Indian Village)",
      "Devprayag & Rudraprayag Sacred River Confluences",
      "Pick-up & Drop from Haridwar / Rishikesh / Dehradun"
    ],
    inclusions: [
      "10 Nights Deluxe Hotel & Swiss Camp Stays",
      "Daily Pure Vegetarian Satvik Breakfast & Dinner",
      "Dedicated Sanitized AC Tempo Traveller / Private Mountain SUV",
      "Experienced Mountain Chauffeur & Yatra Coordinator",
      "Yatra Biometric Registration & Medical First-Aid Kit",
      "Toll, Parking, Green Tax & Driver Allowances"
    ],
    days: [
      { day: 1, title: "Pickup from Haridwar/Dehradun & Drive to Barkot", desc: "Chauffeur pickup, scenic drive along Yamuna valley, check-in at Barkot resort." },
      { day: 2, title: "Yamunotri Dham Darshan & Holy Surya Kund Dip", desc: "Trek to Yamunotri Temple from Janki Chatti, holy dip, darshan & return to Barkot." },
      { day: 3, title: "Barkot to Uttarkashi & Kashi Vishwanath Temple", desc: "Scenic mountain drive to Uttarkashi, evening Aarti at ancient Kashi Vishwanath Temple." },
      { day: 4, title: "Gangotri Dham Darshan & Harsil Apple Valley", desc: "Holy bath in Bhagirathi river, Gangotri Puja & scenic drive through Harsil valley." },
      { day: 5, title: "Uttarkashi to Guptkashi / Sitapur Base", desc: "Drive along Mandakini river to Kedarnath base, biometric pass verification." },
      { day: 6, title: "Ascent to Sacred Kedarnath Dham & Evening Aarti", desc: "Heli-shuttle or trek to Kedarnath, check-in near temple & witness divine Maha Aarti." },
      { day: 7, title: "Morning Kedarnath Darshan & Descent to Guptkashi", desc: "Early morning Abhishek darshan, descent to base & relax at Guptkashi resort." },
      { day: 8, title: "Guptkashi to Badrinath Dham via Joshimath", desc: "Drive along Alaknanda river to Badrinath, check-in & evening temple Darshan." },
      { day: 9, title: "Badrinath Darshan, Mana Village & Rudraprayag", desc: "Holy bath in Tapt Kund, visit Mana (First Indian Village) & drive to Rudraprayag." },
      { day: 10, title: "Rudraprayag to Rishikesh Ganga Aarti", desc: "Visit Devprayag river confluence, drive to Rishikesh & witness Triveni Ghat Aarti." },
      { day: 11, title: "Rishikesh Sightseeing & Return Drop", desc: "Visit Ram Jhula, Lakshman Jhula & drop at Haridwar/Dehradun for onward journey." }
    ]
  },
  {
    id: "pkg-dodham-kedar-badri",
    title: "Divine Do Dham Yatra: Kedarnath & Badrinath Ji",
    destination: "Kedarnath • Badrinath • Guptkashi • Joshimath",
    category: "Pilgrimage",
    duration: "5 Nights / 6 Days",
    price_inr: 22500,
    original_price_inr: 29999,
    badge: "Most Popular Yatra",
    rating: 4.9,
    reviews_count: 215,
    image: "/images/packages/badrinath_temple.jpg",
    description: "Express spiritual journey to Lord Shiva's Kedarnath Jyotirlinga and Lord Vishnu's Badrinath Dham with smooth transfers from Haridwar/Rishikesh.",
    highlights: [
      "Kedarnath Jyotirlinga Darshan & Evening Swarna Aarti",
      "Badrinath Temple Darshan & Tapt Kund Hot Spring Bath",
      "Mana Village, Bheem Pul, Vyas Gufa & Saraswati River",
      "Scenic Drive along Alaknanda & Mandakini Rivers",
      "Helicopter Shuttle / Trek Support Assistance"
    ],
    inclusions: [
      "5 Nights Deluxe Hotel / Camp Accommodation",
      "Pure Veg Breakfast & Dinner Daily",
      "Private Sanitized Mountain Vehicle (Innova / Ertiga / Tempo)",
      "Yatra Registration & Toll/Parking Included",
      "24/7 On-Trip Assistance by Mankotia Holidays"
    ],
    days: [
      { day: 1, title: "Haridwar/Dehradun Pickup to Guptkashi", desc: "Chauffeur pickup, scenic drive via Devprayag & Rudraprayag confluences to Guptkashi." },
      { day: 2, title: "Guptkashi to Kedarnath Dham (Heli / Trek)", desc: "Transfer to Helipad or Sonprayag, ascent to Kedarnath & evening Temple Aarti." },
      { day: 3, title: "Kedarnath Morning Darshan to Pipalkoti", desc: "Early morning temple darshan, descent to base & scenic drive to Pipalkoti." },
      { day: 4, title: "Pipalkoti to Badrinath Ji & Mana Village", desc: "Drive to Badrinath Dham, Tapt Kund holy bath, Darshan & Mana village tour." },
      { day: 5, title: "Badrinath to Rishikesh via Joshimath", desc: "Morning Darshan, visit Narsingh Temple in Joshimath & drive to Rishikesh." },
      { day: 6, title: "Rishikesh Sightseeing & Return Drop", desc: "Ram Jhula, Triveni Ghat visit & on-time drop at Haridwar/Dehradun." }
    ]
  },
  {
    id: "pkg-kedarnath-heli",
    title: "Kedarnath Dham Helicopter & VIP Express",
    destination: "Guptkashi • Phata/Sirsi • Kedarnath Ji",
    category: "Pilgrimage",
    duration: "3 Days / 2 Nights",
    price_inr: 19999,
    original_price_inr: 26500,
    badge: "Helicopter Special",
    rating: 5.0,
    reviews_count: 98,
    image: "/images/packages/kedarnath_heli_shrine.jpg",
    description: "VIP Express package with confirmed Helicopter Shuttle from Phata/Sirsi/Guptkashi helipads directly to Kedarnath Top, priority temple darshan, and scenic resort stays.",
    highlights: [
      "Helicopter Round-trip Tickets (Phata / Sirsi / Guptkashi)",
      "Priority VIP Darshan Assistance at Kedarnath Temple",
      "Stay in Scenic Resort near Helipad / Temple Top",
      "Special Rudrabhishek & Evening Aarti Support",
      "Haridwar / Rishikesh / Dehradun Airport Transfers"
    ],
    inclusions: [
      "2 Nights Deluxe Mountain Resort / Cottage Stay",
      "All Meals (Vegetarian / Satvik)",
      "Helicopter Boarding Assistance & Slot Management",
      "Private AC Cab for Ground Transfers",
      "Emergency Oxygen & First-Aid Support"
    ],
    days: [
      { day: 1, title: "Pickup from Haridwar/Dehradun to Helipad Resort", desc: "Chauffeur pickup, drive to Phata/Guptkashi resort & heli briefing session." },
      { day: 2, title: "Helicopter Flight to Kedarnath, VIP Darshan & Stay", desc: "10-minute helicopter flight to Kedarnath Top, VIP Darshan, Aarti & stay near temple." },
      { day: 3, title: "Return Heli Flight & Drop-off at Haridwar/Dehradun", desc: "Morning Abhishek, return flight to base helipad & chauffeur transfer to airport/station." }
    ]
  },
  {
    id: "pkg-gangotri-yamunotri-dodham",
    title: "Gangotri & Yamunotri Sacred River Dhams",
    destination: "Barkot • Yamunotri • Uttarkashi • Gangotri • Harsil",
    category: "Pilgrimage",
    duration: "5 Days / 4 Nights",
    price_inr: 18500,
    original_price_inr: 24000,
    badge: "Sacred Rivers Yatra",
    rating: 4.8,
    reviews_count: 110,
    image: "/images/packages/bhagirathi_river_glacial.jpg",
    description: "Pilgrimage to the holy origins of India's two most revered rivers: Goddess Yamuna at Yamunotri and Goddess Ganga at Gangotri through picturesque Harsil Valley.",
    highlights: [
      "Yamunotri Holy Surya Kund & Divya Shila Darshan",
      "Gangotri Shrine Puja on sacred Bhagirathi banks",
      "Harsil Apple Valley & Wilson Cottage stopover",
      "Ancient Kashi Vishwanath Temple in Uttarkashi",
      "Dedicated mountain vehicle with experienced driver"
    ],
    inclusions: [
      "4 Nights Deluxe Hotel Stays in Barkot & Uttarkashi",
      "Daily Pure Satvik Breakfast & Dinner",
      "Private AC Sedan/SUV for full tour",
      "Yatra Biometric Registration Assistance"
    ],
    days: [
      { day: 1, title: "Haridwar/Dehradun Pickup to Barkot", desc: "Chauffeur pickup, drive past Kempty falls to Barkot valley resort." },
      { day: 2, title: "Yamunotri Dham Darshan & Return to Barkot", desc: "Trek from Janki Chatti to Yamunotri, holy thermal bath, puja & return." },
      { day: 3, title: "Barkot to Uttarkashi & Kashi Vishwanath Temple", desc: "Scenic mountain drive to Uttarkashi, check-in & evening temple Aarti." },
      { day: 4, title: "Gangotri Dham Darshan, Harsil & Return Uttarkashi", desc: "Holy dip in Bhagirathi, darshan at Gangotri & explore Harsil apple orchards." },
      { day: 5, title: "Uttarkashi to Rishikesh/Haridwar Return Drop", desc: "Drive along Tehri Dam bypass & on-time return drop at station/airport." }
    ]
  },
  {
    id: "pkg-badrinath-mana-heli",
    title: "Badrinath Ji VIP Darshan & Mana Heritage Yatra",
    destination: "Joshimath • Badrinath Ji • Mana Village",
    category: "Pilgrimage",
    duration: "4 Days / 3 Nights",
    price_inr: 16999,
    original_price_inr: 22500,
    badge: "Lord Vishnu's Abode",
    rating: 4.9,
    reviews_count: 88,
    image: "/images/packages/neelkanth_peak.jpg",
    description: "Dedicated spiritual retreat to Lord Badri Vishal, hot sulfur spring bath at Tapt Kund, and cultural exploration of Mana - the First Village of India.",
    highlights: [
      "Special Mahabhishek & Evening Shayan Aarti at Badrinath",
      "Tapt Kund Natural Geothermal Sulfur Bath",
      "Mana Village: Vyas Gufa, Ganesh Gufa & Saraswati River",
      "Bheem Pul & Swargarohini Mountain Peak Views",
      "Joshimath Narsingh Temple & Shankaracharya Math"
    ],
    inclusions: [
      "3 Nights Deluxe Hotel Stays near Badrinath Temple",
      "Daily Hot Satvik Meals (Breakfast & Dinner)",
      "Private Mountain Chauffeur Driven Vehicle",
      "Priority VIP Darshan & Special Puja Coordination"
    ],
    days: [
      { day: 1, title: "Haridwar/Dehradun Pickup to Joshimath", desc: "Drive via Devprayag, Rudraprayag & Karnaprayag to Joshimath." },
      { day: 2, title: "Joshimath to Badrinath Dham & Evening Aarti", desc: "Drive to Badrinath, Tapt Kund bath, check-in & witness divine Maha Aarti." },
      { day: 3, title: "Mana First Indian Village & Drive to Pipalkoti", desc: "Visit Vyas Cave, Saraswati Sangam, Bheem Pul & drive to Pipalkoti." },
      { day: 4, title: "Pipalkoti to Rishikesh & Return Drop", desc: "Visit Rishikesh Triveni Ghat & on-time drop at Haridwar/Dehradun." }
    ]
  },
  {
    id: "pkg-panch-kedar-spiritual",
    title: "Panch Kedar Sacred Trekking & Shiva Circuit",
    destination: "Kedarnath • Tungnath • Rudranath • Madhyamaheshwar",
    category: "Pilgrimage",
    duration: "8 Days / 7 Nights",
    price_inr: 28999,
    original_price_inr: 38000,
    badge: "Ultimate Shiva Pilgrimage",
    rating: 5.0,
    reviews_count: 65,
    image: "/images/packages/tungnath_shiva_temple.jpg",
    description: "The supreme Himalayan pilgrimage honoring the 5 sacred forms of Lord Shiva in Garhwal Himalayas with certified trek leaders, porters, and camps.",
    highlights: [
      "Kedarnath (Hump), Tungnath (Arms - Highest Shiva Temple)",
      "Madhyamaheshwar (Navel) & Rudranath (Face) Darshan",
      "Chandrashila 360-degree Himalayan Summit Panorama",
      "Certified High-Altitude Mountain Guides & Porters",
      "Campfire Satsangs & Satvik Mountain Meals"
    ],
    inclusions: [
      "7 Nights Alpine Swiss Camps & Deluxe Homestays",
      "All Nutritious Vegetarian Meals on Trek",
      "Trek Permits, First-Aid Kit & Emergency Oxygen",
      "Private Mountain Vehicle for Inter-Valley Transfers"
    ],
    days: [
      { day: 1, title: "Haridwar Pickup to Guptkashi", desc: "Chauffeur pickup, scenic drive along Alaknanda & Mandakini rivers." },
      { day: 2, title: "Guptkashi to Kedarnath Dham Ascent", desc: "Trek/heli to Kedarnath, Jyotirlinga Darshan & evening Aarti." },
      { day: 3, title: "Kedarnath to Chopta base camp", desc: "Descent from Kedarnath & scenic transfer to Chopta alpine camp." },
      { day: 4, title: "Chopta to Tungnath & Chandrashila Peak", desc: "Summit Tungnath & Chandrashila (12,100 ft) for 360° Himalayan views." },
      { day: 5, title: "Trek to Madhyamaheshwar Shrine", desc: "Scenic mountain trail through dense forests to sacred Madhyamaheshwar." },
      { day: 6, title: "Madhyamaheshwar Darshan & Return to Sagar Base", desc: "Morning puja, descent to Sagar village & rest." },
      { day: 7, title: "Kalpeshwar Dham Darshan & Joshimath", desc: "Visit Kalpeshwar (Jata of Shiva) & evening in Joshimath." },
      { day: 8, title: "Joshimath to Rishikesh & Return Drop", desc: "Scenic descent along Ganga valley & on-time return drop." }
    ]
  },
  {
    id: "pkg-haridwar-rishikesh-weekend",
    title: "Haridwar, Rishikesh & Devprayag Ganga Retreat",
    destination: "Haridwar • Rishikesh • Devprayag • Neelkanth",
    category: "Pilgrimage",
    duration: "4 Days / 3 Nights",
    price_inr: 10999,
    original_price_inr: 15500,
    badge: "Spiritual Weekend",
    rating: 4.8,
    reviews_count: 142,
    image: "/images/packages/rishikesh_ganga_aarti.jpg",
    description: "Immerse in divine Ganga Aarti at Har Ki Pauri, visit ancient Neelkanth Mahadev temple, witness the holy Bhagirathi-Alaknanda confluence at Devprayag, and explore yoga ashrams in Rishikesh.",
    highlights: [
      "Har Ki Pauri World-Famous Grand Ganga Aarti",
      "Rishikesh Triveni Ghat Aarti, Ram Jhula & Parmarth Niketan",
      "Devprayag Sacred Confluence of Bhagirathi & Alaknanda",
      "Neelkanth Mahadev Ancient Forest Temple Excursion",
      "Mansa Devi & Chandi Devi Cable Car Darshan"
    ],
    inclusions: [
      "3 Nights Riverside 3★/4★ Hotel Stay",
      "Daily Satvik Buffet Breakfast & Dinner",
      "Private AC Sedan for all Sightseeing & Transfers",
      "Ganga Aarti Special VIP Ghat Pass Assistance"
    ],
    days: [
      { day: 1, title: "Pickup at Haridwar & Har Ki Pauri Evening Aarti", desc: "Chauffeur pickup, check-in, Mansa Devi temple & evening Har Ki Pauri Ganga Aarti." },
      { day: 2, title: "Haridwar to Rishikesh Ashrams & Beatles Ashram", desc: "Drive to Rishikesh, visit Ram Jhula, Swarg Ashram & evening Parmarth Niketan Aarti." },
      { day: 3, title: "Day Trip to Devprayag Confluence & Neelkanth Mahadev", desc: "Scenic mountain drive to Devprayag confluence & holy Neelkanth temple." },
      { day: 4, title: "Morning Ganga Ghat Stroll, Shopping & Drop", desc: "Ayurvedic souvenir shopping, local cafe brunch & drop at Haridwar/Dehradun." }
    ]
  },

  // ==========================================
  // 2. UTTARAKHAND SPECIALS (7 tours)
  // ==========================================
  {
    id: "pkg-uttarakhand-jewels",
    title: "Jewels of Uttarakhand: Nainital, Mussoorie & Corbett",
    destination: "Nainital • Corbett • Mussoorie • Rishikesh",
    category: "Uttarakhand",
    duration: "6 Days / 5 Nights",
    price_inr: 17999,
    original_price_inr: 24000,
    badge: "Family Favorite",
    rating: 4.8,
    reviews_count: 184,
    image: "/images/packages/nainital_lake.jpg",
    description: "The ultimate Uttarakhand holiday combining serene lake boating in Nainital, thrilling tiger jeep safaris in Jim Corbett, waterfalls in Mussoorie, and Ganga Aarti in Rishikesh.",
    highlights: [
      "Emerald Naini Lake Boating & Naina Devi Temple",
      "Jim Corbett National Park 4x4 Open Jeep Tiger Safari",
      "Mussoorie Kempty Falls, Gun Hill & Mall Road",
      "Rishikesh Triveni Ghat Maha Aarti & Ram Jhula",
      "Scenic Himalayan Foothill Drives & Lake Excursions"
    ],
    inclusions: [
      "5 Nights 3★/4★ Hill Resort & Riverside Jungle Lodge",
      "Daily Buffet Breakfast & Dinner",
      "1 Open Jeep Safari in Corbett Tiger Reserve",
      "Private AC Sedan/SUV for all Sightseeing & Transfers",
      "All Tolls, Parking & Driver Night Charges"
    ],
    days: [
      { day: 1, title: "Delhi/Kathgodam Pickup to Nainital Lakes", desc: "Chauffeur pickup, scenic drive to Nainital, check-in, Naini lake boat ride & Mall Road." },
      { day: 2, title: "Nainital Lake Tour & Viewpoints Excursion", desc: "Bhimtal, Sattal, Naukuchiatal lake tour, Snow View Point & Naina Devi Temple." },
      { day: 3, title: "Nainital to Jim Corbett Jungle Resort", desc: "Drive to Corbett National Park, check-in at jungle resort, Garjiya Devi Temple visit." },
      { day: 4, title: "Corbett Morning Jeep Safari & Drive to Mussoorie", desc: "Early morning 4x4 open jeep tiger safari, breakfast & scenic drive to Mussoorie." },
      { day: 5, title: "Mussoorie Sightseeing: Kempty Falls & Mall Road", desc: "Kempty Falls, Gun Hill cable car, Company Garden & evening walk on Mall Road." },
      { day: 6, title: "Mussoorie to Rishikesh & Return Drop", desc: "Drive via Rishikesh Ram Jhula, Triveni Ghat & on-time drop at Dehradun/Delhi." }
    ]
  },
  {
    id: "pkg-auli-chopta",
    title: "Auli Ski Paradise & Chopta-Tungnath Snow Trek",
    destination: "Auli • Chopta • Tungnath • Rishikesh",
    category: "Uttarakhand",
    duration: "5 Days / 4 Nights",
    price_inr: 15999,
    original_price_inr: 21500,
    badge: "Adventure & Nature",
    rating: 4.9,
    reviews_count: 126,
    image: "/images/packages/auli_snow_skiing.jpg",
    description: "Discover the 'Mini Switzerland of India' at Chopta, summit Chandrashila Peak, visit the world's highest Shiva temple at Tungnath (12,073 ft), and ride the Auli Cable Car with Nanda Devi views.",
    highlights: [
      "Auli Ropeway (Asia's longest cable car) & Ski Slopes",
      "Tungnath Temple (Highest Shiva Temple in the World)",
      "Chandrashila Peak 360° Himalayan Summit Panorama",
      "Chopta Alpine Bugyals & Rhododendron Forests",
      "Deoriatal High-Altitude Emerald Lake Camping"
    ],
    inclusions: [
      "4 Nights Deluxe Alpine Camp / Resort Accommodation",
      "Daily Wholesome Breakfast & Nutritious Dinners",
      "Certified Mountain Trek Guide & Forest Permits",
      "Private Mountain Vehicle Transfers",
      "Campfire Evenings & Stargazing Sessions"
    ],
    days: [
      { day: 1, title: "Haridwar/Rishikesh Pickup to Chopta Bugyal", desc: "Chauffeur pickup, scenic drive via Devprayag & Rudraprayag to Chopta alpine camp." },
      { day: 2, title: "Chopta to Tungnath Temple & Chandrashila Summit Trek", desc: "Scenic trek through rhododendron forests to Tungnath & Chandrashila 360° summit." },
      { day: 3, title: "Chopta to Auli Ski Resort via Joshimath", desc: "Scenic drive to Joshimath, board Auli cable car with snow peak views & resort check-in." },
      { day: 4, title: "Auli Meadows, Gorson Bugyal & Artificial Lake", desc: "Explore Auli ski slopes, Gorson Bugyal trek & sunset over Nanda Devi peak." },
      { day: 5, title: "Auli to Rishikesh & Return Drop", desc: "Descent from Auli, scenic drive along Alaknanda valley & drop at Haridwar/Dehradun." }
    ]
  },
  {
    id: "pkg-kumaon-hidden-gems",
    title: "Kumaon Tranquility: Kausani, Ranikhet & Mukteshwar",
    destination: "Kausani • Ranikhet • Mukteshwar • Almora",
    category: "Uttarakhand",
    duration: "5 Days / 4 Nights",
    price_inr: 14500,
    original_price_inr: 19999,
    badge: "Serene & Scenic",
    rating: 4.8,
    reviews_count: 94,
    image: "/images/packages/nainital_lake.jpg",
    description: "Breathtaking panoramic views of Trishul & Nanda Devi peaks from Kausani, lush pine forests of Ranikhet, and apple orchards of Mukteshwar.",
    highlights: [
      "Kausani 300 km Panoramic Himalayan Sunrise",
      "Ranikhet Chaubatia Apple Orchards & Golf Course",
      "Mukteshwar Chauli ki Jali Cliff & Ancient Shiva Temple",
      "Almora Bright End Corner & Kasar Devi Hippie Hill",
      "Peaceful Countryside Homestays & Organic Pahadi Food"
    ],
    inclusions: [
      "4 Nights Deluxe Boutique Mountain Resort Stay",
      "Daily Buffet Breakfast & Authentic Kumaoni Dinner",
      "Private AC Sedan/SUV for full tour",
      "All Sightseeing, Toll & Driver Allowances"
    ],
    days: [
      { day: 1, title: "Kathgodam/Delhi Pickup to Mukteshwar", desc: "Chauffeur pickup, drive past mountain lakes to Mukteshwar orchard resort." },
      { day: 2, title: "Mukteshwar to Almora & Kausani Sunset", desc: "Visit Chauli ki Jali, Kasar Devi temple, Almora heritage & sunset in Kausani." },
      { day: 3, title: "Kausani Sunrise, Tea Gardens & Drive to Ranikhet", desc: "Panoramic sunrise, visit Kausani tea factory & drive to Ranikhet pine forests." },
      { day: 4, title: "Ranikhet Golf Course, Orchards & Temples", desc: "Visit Chaubatia gardens, Jhula Devi temple & Asia's highest 9-hole golf course." },
      { day: 5, title: "Ranikhet to Kathgodam/Delhi Return Drop", desc: "Scenic mountain descent, souvenir shopping & on-time return drop." }
    ]
  },
  {
    id: "pkg-jim-corbett-safari",
    title: "Jim Corbett Wildlife Tiger Safari & Jungle Retreat",
    destination: "Corbett National Park • Dhikala • Kosi River",
    category: "Uttarakhand",
    duration: "3 Days / 2 Nights",
    price_inr: 9999,
    original_price_inr: 14500,
    badge: "Wild Safari",
    rating: 4.8,
    reviews_count: 210,
    image: "/images/packages/corbett_tiger.jpg",
    description: "India's premier tiger reserve experience featuring 4x4 open jeep jungle safaris, riverside luxury resort stay with swimming pool, and birdwatching on Kosi river banks.",
    highlights: [
      "4x4 Open Gypsy Jungle Safari with Forest Guide",
      "Spot Royal Bengal Tigers, Wild Elephants & Deer",
      "Riverside Resort Stay with Campfire & Live BBQ",
      "Garjiya Devi Temple & Corbett Heritage Museum",
      "Kosi River Body Surfing & Guided Nature Walk"
    ],
    inclusions: [
      "2 Nights Luxury Jungle Resort / Riverside Cottage",
      "All Meals Included (Buffet Breakfast, Lunch & Dinner)",
      "1 Open Gypsy Safari Permit & Guide Charges",
      "Round-trip Transfers from Delhi / Kathgodam"
    ],
    days: [
      { day: 1, title: "Delhi/Kathgodam Pickup to Corbett Jungle Resort", desc: "Chauffeur pickup, resort check-in, relax by the pool & evening nature walk." },
      { day: 2, title: "Early Morning Tiger Safari & Kosi River Walk", desc: "6 AM Jeep Safari inside Corbett zone, tiger tracking & afternoon museum visit." },
      { day: 3, title: "Garjiya Devi Temple, Souvenir Shopping & Drop", desc: "Visit scenic river temple & comfortable return transfer to Delhi/Kathgodam." }
    ]
  },
  {
    id: "pkg-mussoorie-kanatal-dhanaulti",
    title: "Mussoorie, Kanatal & Dhanaulti Eco-Park Retreat",
    destination: "Mussoorie • Dhanaulti • Kanatal • Dehradun",
    category: "Uttarakhand",
    duration: "4 Days / 3 Nights",
    price_inr: 12500,
    original_price_inr: 17000,
    badge: "Queen of Hills",
    rating: 4.7,
    reviews_count: 135,
    image: "/images/packages/kempty_falls_mussoorie.jpg",
    description: "Escape to Mussoorie's colonial charm, explore Dhanaulti deodar eco-parks, ride the Surkanda Devi ropeway, and stay in serene Swiss tents in Kanatal.",
    highlights: [
      "Mussoorie Kempty Falls, Cloud's End & Mall Road",
      "Dhanaulti Eco-Park Deodar Forest Nature Stroll",
      "Surkanda Devi Temple 360° Ropeway Ride (9,995 ft)",
      "Kanatal Swiss Tent Glamping with Bonfire & Music",
      "Dehradun Robber's Cave & Sahastradhara Springs"
    ],
    inclusions: [
      "3 Nights Deluxe Resort & Glamping Tents",
      "Daily Buffet Breakfast & Dinner",
      "Private AC Sedan/SUV for full tour",
      "All Sightseeing, Parking & Driver Night Charges"
    ],
    days: [
      { day: 1, title: "Dehradun/Delhi Pickup to Mussoorie", desc: "Chauffeur pickup, drive up the hills, check-in & evening walk on Mall Road." },
      { day: 2, title: "Mussoorie Full Day: Kempty Falls & Company Garden", desc: "Kempty Falls, Gun Hill cable car & sunset view from George Everest." },
      { day: 3, title: "Mussoorie to Dhanaulti & Kanatal Glamping", desc: "Visit Dhanaulti Eco-Park, Surkanda Devi ropeway & check-in at Kanatal camp." },
      { day: 4, title: "Dehradun Robber's Cave & Return Drop", desc: "Scenic descent to Dehradun, visit Guchhupani cave & drop at airport/station." }
    ]
  },
  {
    id: "pkg-nainital-kausani-binsar",
    title: "Nainital Lake District, Kausani & Binsar Wildlife",
    destination: "Nainital • Binsar • Kausani • Almora",
    category: "Uttarakhand",
    duration: "5 Days / 4 Nights",
    price_inr: 15500,
    original_price_inr: 21000,
    badge: "Himalayan Panorama",
    rating: 4.8,
    reviews_count: 112,
    image: "/images/packages/nainital_lake.jpg",
    description: "Explore the lake paradise of Nainital, birdwatching in Binsar wildlife sanctuary, and sunrise over snow-clad Trishul and Nanda Devi peaks in Kausani.",
    highlights: [
      "Nainital Lake Boating & Snow View Point Cable Car",
      "Binsar Zero Point 300 km Snow Peak Himalayan Panorama",
      "Kausani Tea Estate & Anasakti Ashram (Mahatma Gandhi)",
      "Almora Kasar Devi Temple & Local Bal Mithai Tasting",
      "Scenic Mountain Passes & Pine Forest Trails"
    ],
    inclusions: [
      "4 Nights 3★/4★ Boutique Mountain Resort Stay",
      "Daily Buffet Breakfast & Authentic Pahadi Dinner",
      "Private Chauffeur Driven Mountain Cab",
      "All Sightseeing & Sanctuary Entry Permits"
    ],
    days: [
      { day: 1, title: "Kathgodam/Delhi Pickup to Nainital", desc: "Chauffeur pickup, scenic drive, Naini lake boat ride & Mall Road." },
      { day: 2, title: "Nainital 7-Lake Tour & Viewpoints", desc: "Bhimtal, Sattal, Naukuchiatal & Naina Devi temple." },
      { day: 3, title: "Nainital to Binsar Sanctuary & Almora", desc: "Drive to Binsar sanctuary, Zero point hike & sunset at Kasar Devi." },
      { day: 4, title: "Binsar to Kausani Tea Gardens", desc: "Drive to Kausani, visit Anasakti ashram, tea factory & sunset views." },
      { day: 5, title: "Kausani Sunrise to Kathgodam Drop", desc: "Magical 300km Himalayan sunrise & return drop at Kathgodam/Delhi." }
    ]
  },
  {
    id: "pkg-rishikesh-adventure-camp",
    title: "Rishikesh White Water Rafting & Riverside Glamping",
    destination: "Rishikesh • Shivpuri • Mohan Chatti",
    category: "Uttarakhand",
    duration: "3 Days / 2 Nights",
    price_inr: 7499,
    original_price_inr: 10500,
    badge: "Adventure Capital",
    rating: 4.9,
    reviews_count: 260,
    image: "/images/packages/rishikesh_ganga_aarti.jpg",
    description: "The ultimate adventure adrenaline package in Rishikesh: 16 km Ganga white water rafting, cliff jumping, luxury riverside AC dome camping, and Ganga Aarti.",
    highlights: [
      "16 KM Shivpuri to Rishikesh Grade III/IV River Rafting",
      "Cliff Jumping & Body Surfing in Holy River Ganga",
      "Luxury Riverside Alpine / Dome Camping with Swimming Pool",
      "Triveni Ghat Evening Maha Aarti & Ram Jhula Walk",
      "Campfire, DJ Night, Volleyball & Barbecue"
    ],
    inclusions: [
      "2 Nights Luxury Riverside AC Camp / Cottage",
      "All Buffet Meals (2 Breakfast, 2 Lunch, 2 Dinner)",
      "16 KM Rafting Gear, Life Jackets & River Guide",
      "Bonfire Night with Live Snacks & Music"
    ],
    days: [
      { day: 1, title: "Haridwar/Dehradun Pickup to Rishikesh Camp", desc: "Check-in at luxury riverside camp, volleyball, river dip & evening bonfire." },
      { day: 2, title: "16KM Ganga White Water Rafting & Cliff Jump", desc: "Conquer rapids like Roller Coaster, Golf Course & cliff jump, evening Triveni Aarti." },
      { day: 3, title: "Beatles Ashram, Cafe Hopping & Return Drop", desc: "Visit Beatles Ashram, Little Buddha cafe & return drop at station/airport." }
    ]
  },

  // ==========================================
  // 3. HIMACHAL PRADESH ESCAPES (7 tours)
  // ==========================================
  {
    id: "pkg-manali-spiti",
    title: "Magical Manali & Solang Valley Escape",
    destination: "Manali • Solang • Atal Tunnel • Sissu",
    category: "Himachal",
    duration: "4 Days / 3 Nights",
    price_inr: 12999,
    original_price_inr: 17500,
    badge: "Himachal Best Seller",
    rating: 4.8,
    reviews_count: 310,
    image: "/images/packages/solang_valley_snow.jpg",
    description: "Experience the snow magic of Himachal with Solang Valley adventures, engineering wonder Atal Tunnel, Sissu waterfall in Lahaul, and cozy Old Manali cafes.",
    highlights: [
      "Solang Valley Adventure Sports (Paragliding & Zorbing)",
      "Drive through Atal Tunnel into Sissu Valley (Lahaul)",
      "500-Year-Old Hadimba Temple & Vashisht Hot Springs",
      "Jogini Waterfalls Nature Hike & Old Manali Cafes",
      "Mall Road Shopping & Riverside Bonfire Night"
    ],
    inclusions: [
      "3 Nights 3★/4★ Mountain Resort Stay",
      "Daily Buffet Breakfast & Dinner",
      "Private Sightseeing Cab / Volvo Coach",
      "Bonfire Night with Live Music",
      "All Sightseeing & Mountain Transfers"
    ],
    days: [
      { day: 1, title: "Chandigarh/Delhi Pickup & Drive to Manali", desc: "Chauffeur pickup, scenic drive along Beas river, check-in & evening Mall Road stroll." },
      { day: 2, title: "Solang Valley Snow Point, Atal Tunnel & Sissu", desc: "Adventure activities in Solang, pass through 9km Atal Tunnel to Sissu waterfall." },
      { day: 3, title: "Hadimba Temple, Vashisht Springs & Old Manali", desc: "Visit Hadimba Devi temple, Manu temple, Vashisht hot water bath & cafe hopping." },
      { day: 4, title: "Kullu Shawl Weaving, Rafting & Return Drop", desc: "Visit Kullu river rafting point, Vaishno Devi temple & drop at Chandigarh/Delhi." }
    ]
  },
  {
    id: "pkg-shimla-kufri-royal",
    title: "Royal Shimla, Kufri & Chail Heritage Retreat",
    destination: "Shimla • Kufri • Chail • Mashobra",
    category: "Himachal",
    duration: "4 Days / 3 Nights",
    price_inr: 11500,
    original_price_inr: 15999,
    badge: "Queen of Hills",
    rating: 4.8,
    reviews_count: 195,
    image: "/images/packages/shimla_ridge.jpg",
    description: "Colonial charm on Shimla Ridge & Mall Road, snow adventures in Kufri, and the world's highest cricket ground at Chail Palace.",
    highlights: [
      "Historic Shimla Ridge, Mall Road & Christ Church",
      "Kufri Snow Fun World & Himalayan Wildlife Zoo",
      "Chail Royal Maharaja Palace & Highest Cricket Ground",
      "Jakhu Temple Giant Hanuman Statue Cable Car",
      "Mashobra Pine Forests & Apple Orchards"
    ],
    inclusions: [
      "3 Nights Deluxe Heritage / Hill Resort Stay",
      "Daily Buffet Breakfast & Dinner",
      "Private AC Sedan for all Sightseeing & Transfers",
      "All Tolls, Parking & Driver Charges"
    ],
    days: [
      { day: 1, title: "Chandigarh/Delhi Pickup to Shimla", desc: "Chauffeur pickup, scenic Himalayan Expressway drive to Shimla, Mall Road & Ridge." },
      { day: 2, title: "Kufri Adventure Valley & Jakhu Temple", desc: "Excursion to Kufri snow viewpoint, pony rides, Himalayan zoo & Jakhu cable car." },
      { day: 3, title: "Day Excursion to Chail Palace & Mashobra", desc: "Visit Chail Maharaja Palace, highest cricket ground, Kali Tibba & Mashobra valley." },
      { day: 4, title: "Viceregal Lodge Tour & Return Drop", desc: "Tour historic Indian Institute of Advanced Study & return drop at Chandigarh/Delhi." }
    ]
  },
  {
    id: "pkg-dharamshala-dalhousie",
    title: "Dharamshala, McLeodGanj & Dalhousie Mini Switzerland",
    destination: "Dharamshala • McLeodGanj • Dalhousie • Khajjiar",
    category: "Himachal",
    duration: "5 Days / 4 Nights",
    price_inr: 16500,
    original_price_inr: 22000,
    badge: "Tibetan & Alpine Charm",
    rating: 4.9,
    reviews_count: 160,
    image: "/images/packages/khajjiar_lake.jpg",
    description: "Spiritual residence of Dalai Lama in McLeodGanj, picturesque tea gardens in Dharamshala, colonial Dalhousie, and the green alpine meadows of Khajjiar.",
    highlights: [
      "Dalai Lama Main Temple Complex & Namgyal Monastery",
      "Bhagsunag Waterfall & Cafe Stroll in McLeodGanj",
      "Khajjiar (Mini Switzerland of India) Alpine Meadow",
      "Dharamshala International Cricket Stadium (HPCA)",
      "Colonial St. John in the Wilderness Church"
    ],
    inclusions: [
      "4 Nights 3★/4★ Mountain Resort Accommodation",
      "Daily Buffet Breakfast & Dinner",
      "Private Mountain Sedan/SUV for full tour",
      "All Sightseeing & Forest Green Taxes"
    ],
    days: [
      { day: 1, title: "Pathankot/Chandigarh Pickup to Dharamshala", desc: "Chauffeur pickup, scenic drive to Dharamshala, check-in & visit HPCA cricket stadium." },
      { day: 2, title: "McLeodGanj Monastery, Bhagsunag & Naddi Viewpoint", desc: "Dalai Lama temple, Bhagsunag waterfall, Tibetan market & sunset from Naddi." },
      { day: 3, title: "Dharamshala to Dalhousie Colonial Town", desc: "Scenic drive via Dhauladhar range to Dalhousie, check-in & Gandhi Chowk walk." },
      { day: 4, title: "Full Day Khajjiar Mini Switzerland & Kalatop Sanctuary", desc: "Explore emerald Khajjiar lake, horse riding, zorbing & Kalatop pine sanctuary." },
      { day: 5, title: "Dalhousie Church, Panchpula & Return Drop", desc: "Visit St. John Church, Panchpula springs & return drop at Pathankot/Chandigarh." }
    ]
  },
  {
    id: "pkg-spiti-valley-roadtrip",
    title: "Spiti Valley 4x4 Road Trip: Kaza, Tabo & Chandratal",
    destination: "Kaza • Tabo • Key Monastery • Chandratal Lake",
    category: "Himachal",
    duration: "7 Days / 6 Nights",
    price_inr: 24999,
    original_price_inr: 33000,
    badge: "Bucket List Expedition",
    rating: 5.0,
    reviews_count: 140,
    image: "/images/packages/key_monastery_spiti.jpg",
    description: "The ultimate Himalayan road expedition to the Middle Land of Spiti: 1000-year-old Key Monastery, world's highest post office Hikkim, and moon lake Chandratal.",
    highlights: [
      "Chandratal High-Altitude Moon Lake Glamping",
      "1000-Year-Old Key Monastery & Tabo Caves",
      "World's Highest Post Office in Hikkim (14,567 ft)",
      "Highest Suspension Bridge in Asia at Chicham",
      "Cross Kunzum Pass (14,931 ft) & Rohtang Pass"
    ],
    inclusions: [
      "6 Nights Homestays & Swiss Camping at Chandratal",
      "Daily Wholesome Breakfast & Nutritious Dinners",
      "Dedicated 4x4 Mountain SUV (Innova / Scorpio / Gypsy)",
      "Inner Line Forest Permits & Oxygen Support"
    ],
    days: [
      { day: 1, title: "Chandigarh to Kalpa Kinnaur", desc: "Chauffeur pickup, drive along Sutlej river to Kalpa with Kinner Kailash views." },
      { day: 2, title: "Kalpa to Kaza via Tabo Monastery", desc: "Drive into Spiti valley, visit UNESCO Tabo monastery & arrive in Kaza." },
      { day: 3, title: "Key Monastery, Kibber & Chicham Bridge", desc: "Visit Key Gompa, highest bridge in Asia at Chicham & snow leopard valley." },
      { day: 4, title: "Hikkim, Komic & Langza Fossil Village", desc: "Post a letter from Hikkim, visit highest village Komic & Buddha statue in Langza." },
      { day: 5, title: "Kaza to Chandratal Lake via Kunzum Pass", desc: "Cross Kunzum Pass, trek to crescent Chandratal lake & glamping." },
      { day: 6, title: "Chandratal to Manali via Atal Tunnel", desc: "Drive through rugged Batal road, Atal Tunnel into Manali resort." },
      { day: 7, title: "Manali to Chandigarh Return Drop", desc: "Scenic mountain descent & drop at Chandigarh railway station/airport." }
    ]
  },
  {
    id: "pkg-shimla-manali-combo",
    title: "Complete Himachal Odyssey: Shimla, Kullu & Manali",
    destination: "Shimla • Kufri • Kullu • Manali • Solang",
    category: "Himachal",
    duration: "6 Days / 5 Nights",
    price_inr: 17999,
    original_price_inr: 24500,
    badge: "Himachal Grand Tour",
    rating: 4.8,
    reviews_count: 225,
    image: "/images/packages/shimla_ridge.jpg",
    description: "The classic Himachal family tour covering colonial capital Shimla, snow fun at Kufri, river rafting in Kullu valley, and alpine adventures in Manali & Solang.",
    highlights: [
      "Shimla Mall Road, Ridge & Christ Church",
      "Kufri Snow Viewpoint & Horse Riding",
      "Kullu River Rafting Point & Shawl Factories",
      "Solang Valley Paragliding & Atal Tunnel Sissu",
      "Hadimba Temple, Vashisht Springs & Old Manali"
    ],
    inclusions: [
      "2 Nights Shimla + 3 Nights Manali Deluxe Stays",
      "Daily Buffet Breakfast & Dinner",
      "Private AC Sedan/SUV for all Sightseeing",
      "All Tolls, Parking & Driver Allowances"
    ],
    days: [
      { day: 1, title: "Delhi/Chandigarh Pickup to Shimla", desc: "Drive to Shimla, check-in, evening stroll on Mall Road & Lakkar Bazar." },
      { day: 2, title: "Shimla Kufri Excursion & Jakhu Temple", desc: "Excursion to Kufri snow park, Himalayan zoo & Jakhu ropeway." },
      { day: 3, title: "Shimla to Manali via Kullu Valley", desc: "Scenic drive past Pandoh dam, Hanogi temple & Kullu river rafting point to Manali." },
      { day: 4, title: "Solang Valley Snow Point & Atal Tunnel", desc: "Paragliding in Solang, pass through Atal Tunnel to Sissu Lahaul." },
      { day: 5, title: "Manali Local Sightseeing & Cafe Hopping", desc: "Hadimba Devi temple, Manu temple, Vashisht hot bath & Club House." },
      { day: 6, title: "Manali to Chandigarh/Delhi Return Drop", desc: "Scenic highway descent & on-time return drop." }
    ]
  },
  {
    id: "pkg-kasol-tirthan-jibhi",
    title: "Kasol, Parvati Valley, Jibhi & Tirthan Valley",
    destination: "Kasol • Manikaran • Jibhi • Tirthan Valley",
    category: "Himachal",
    duration: "4 Days / 3 Nights",
    price_inr: 11999,
    original_price_inr: 16500,
    badge: "Offbeat Himachal",
    rating: 4.9,
    reviews_count: 180,
    image: "/images/packages/solang_valley_snow.jpg",
    description: "Relax by the roaring Parvati river in Kasol, soak in hot springs at Manikaran Sahib, explore wooden cottages in Jibhi, and fish for trout in Tirthan valley.",
    highlights: [
      "Kasol Riverside Cafes & Chalal Village Nature Hike",
      "Manikaran Sahib Gurudwara & Natural Hot Geothermal Springs",
      "Jibhi Hidden Waterfall & Traditional Wooden Cottages",
      "Jalori Pass & Serolsar Lake Trek (10,800 ft)",
      "Great Himalayan National Park UNESCO Buffer Zone"
    ],
    inclusions: [
      "3 Nights Boutique Riverside Cottages & Homestays",
      "Daily Wholesome Breakfast & Dinner",
      "Private Mountain Vehicle Transfers",
      "Campfire Evenings & Stargazing"
    ],
    days: [
      { day: 1, title: "Chandigarh Pickup to Kasol Parvati Valley", desc: "Chauffeur pickup, scenic drive along Parvati river, check-in & cafe stroll." },
      { day: 2, title: "Manikaran Hot Springs & Chalal Forest Hike", desc: "Visit Manikaran Sahib gurudwara, hot sulfur springs & pine forest walk in Chalal." },
      { day: 3, title: "Kasol to Jibhi & Jalori Pass Serolsar Lake", desc: "Scenic mountain drive to Jibhi, explore waterfall & trek to holy Serolsar lake." },
      { day: 4, title: "Tirthan Trout River & Return Drop", desc: "Visit Tirthan river valley, trout farm & drop at Chandigarh/Delhi." }
    ]
  },
  {
    id: "pkg-bir-billing-paragliding",
    title: "Bir Billing Paragliding Capital & Palampur Tea Hills",
    destination: "Bir Billing • Palampur • Baijnath • Kangra",
    category: "Himachal",
    duration: "4 Days / 3 Nights",
    price_inr: 12499,
    original_price_inr: 17000,
    badge: "Sky Adventure",
    rating: 4.8,
    reviews_count: 150,
    image: "/images/packages/bir_billing_paragliding.jpg",
    description: "Fly like a bird at the World's 2nd Highest Paragliding Takeoff Point in Billing, explore lush Palampur tea estates, and visit ancient Baijnath Shiva Temple.",
    highlights: [
      "Tandem Paragliding Flight from Billing (8,000 ft) to Bir",
      "Palampur Emerald Tea Gardens & Dhauladhar Views",
      "800-Year-Old Baijnath Jyotirlinga Stone Temple",
      "Tibetan Monasteries & Deer Park Eco-Institute",
      "Historic Kangra Fort & Masrur Rock-Cut Temples"
    ],
    inclusions: [
      "3 Nights Boutique Mountain Resort / Camp Stay",
      "Daily Buffet Breakfast & Dinner",
      "Private Mountain Cab for all Sightseeing",
      "Tandem Paragliding Pilot & Safety Gear Booking Assistance"
    ],
    days: [
      { day: 1, title: "Pathankot/Chandigarh Pickup to Bir", desc: "Chauffeur pickup, scenic drive to Bir Tibetan colony, monastery visit & cafes." },
      { day: 2, title: "Tandem Paragliding Flight & Landing Site Sunset", desc: "Drive to Billing top, exhilarating 20-min paragliding flight & sunset at landing ground." },
      { day: 3, title: "Palampur Tea Estates & Baijnath Temple", desc: "Explore Palampur tea factory, tea tasting & ancient 13th-century Baijnath temple." },
      { day: 4, title: "Kangra Fort Visit & Return Drop", desc: "Tour grand Kangra Fort & on-time return drop at Pathankot/Chandigarh." }
    ]
  },

  // ==========================================
  // 4. KASHMIR PARADISE (7 tours)
  // ==========================================
  {
    id: "pkg-kashmir-paradise",
    title: "Kashmir: Heaven on Earth Luxury Tour",
    destination: "Srinagar • Gulmarg • Pahalgam • Sonmarg",
    category: "Kashmir",
    duration: "5 Days / 4 Nights",
    price_inr: 21999,
    original_price_inr: 29000,
    badge: "Kashmir Crown",
    rating: 4.9,
    reviews_count: 240,
    image: "/images/packages/dal_lake_shikara.jpg",
    description: "Indulge in a royal Kashmiri holiday with handcrafted cedarwood houseboats on Dal Lake, world-famous Gulmarg Gondola rides, and pristine Lidder river valleys in Pahalgam.",
    highlights: [
      "Dal Lake Handcrafted Luxury Cedarwood Houseboat Stay",
      "Gulmarg Gondola Ride to Phase 1 & 2 (14,000 ft)",
      "Pahalgam Betaab Valley, Aru Valley & Chandanwari",
      "Romantic Sunset Shikara Ride & Floating Flower Market",
      "Mughal Royal Terraced Gardens (Shalimar & Nishat)"
    ],
    inclusions: [
      "1 Night Luxury Houseboat + 3 Nights Deluxe Hotels",
      "Daily Breakfast & Authentic Wazwan Dinner",
      "Private AC Sedan/SUV with Local Driver",
      "1-Hour Complimentary Shikara Ride on Dal Lake",
      "Airport Pick-up & Drop at Srinagar"
    ],
    days: [
      { day: 1, title: "Srinagar Airport Pickup, Mughal Gardens & Shikara Ride", desc: "Chauffeur pickup, Shalimar & Nishat Bagh, romantic Dal Lake sunset Shikara ride & houseboat check-in." },
      { day: 2, title: "Srinagar to Gulmarg Gondola Cable Car Adventure", desc: "Scenic drive to Gulmarg, ride Asia's highest cable car to snow peaks & alpine hotel check-in." },
      { day: 3, title: "Gulmarg to Pahalgam Valley of Shepherds", desc: "Drive past saffron fields of Pampore to Pahalgam along the roaring Lidder river." },
      { day: 4, title: "Pahalgam Betaab Valley, Aru Valley & Baisaran", desc: "Explore Betaab valley film shooting spots, Aru pine valleys & horse ride to Baisaran meadow." },
      { day: 5, title: "Srinagar Old City Heritage & Airport Return Drop", desc: "Visit Jamia Masjid, Shankaracharya temple, dry fruit shopping & Srinagar airport drop." }
    ]
  },
  {
    id: "pkg-kashmir-honeymoon-luxury",
    title: "Royal Kashmir Luxury Honeymoon with Houseboat",
    destination: "Srinagar • Dal Lake • Gulmarg • Pahalgam",
    category: "Kashmir",
    duration: "6 Days / 5 Nights",
    price_inr: 25999,
    original_price_inr: 35000,
    badge: "Honeymoon Special",
    rating: 5.0,
    reviews_count: 175,
    image: "/images/packages/dal_lake_shikara.jpg",
    description: "Tailor-made romantic honeymoon in Kashmir with luxury houseboat Jacuzzi suites, flower bed decorations, candle-lit dinners, and private cab transfers.",
    highlights: [
      "Super Deluxe Houseboat with Private Balcony on Nigeen Lake",
      "Candle-Light Dinner with Kashmiri Kahwa & Badam Kheer",
      "Honeymoon Cake, Flower Bed Decoration & Fruit Basket",
      "Gulmarg Gondola Snow Cable Car Experience",
      "Private Photography Session in Traditional Kashmiri Pheran"
    ],
    inclusions: [
      "1 Night Luxury Houseboat + 4 Nights 4★ Resorts",
      "Daily Special Breakfast & Candle-Light Dinners",
      "Dedicated Private AC Sedan with Romantic Playlist",
      "Complimentary Shikara Ride & Photo Shoot"
    ],
    days: [
      { day: 1, title: "Srinagar Arrival, Shikara Ride & Romantic Houseboat", desc: "Airport pickup, flower bouquet welcome, Shikara ride & candle-light dinner on houseboat." },
      { day: 2, title: "Mughal Gardens & Drive to Gulmarg Alpine Resort", desc: "Chashme Shahi, Pari Mahal & scenic mountain drive to Gulmarg." },
      { day: 3, title: "Gulmarg Gondola Ride to Apharwat Peak", desc: "Cable car ride to snow mountains, snow sledging & cozy resort stay." },
      { day: 4, title: "Gulmarg to Pahalgam Romantic Pine Valley", desc: "Drive along Lidder river, check-in at riverside resort & couple walk." },
      { day: 5, title: "Betaab Valley & Mini Switzerland Baisaran", desc: "Explore scenic meadows, horse riding to Baisaran & evening shopping." },
      { day: 6, title: "Srinagar Souvenir Shopping & Airport Drop", desc: "Pashmina shawl and walnut shopping, airport drop with unforgettable memories." }
    ]
  },
  {
    id: "pkg-sonamarg-glacier-special",
    title: "Sonamarg Meadow of Gold & Thajiwas Glacier Tour",
    destination: "Srinagar • Sonamarg • Thajiwas • Kheer Bhawani",
    category: "Kashmir",
    duration: "4 Days / 3 Nights",
    price_inr: 15999,
    original_price_inr: 21500,
    badge: "Glacier Special",
    rating: 4.8,
    reviews_count: 120,
    image: "/images/packages/sonamarg_glacier.jpg",
    description: "Explore the golden meadows of Sonamarg, trek to perpetual snow at Thajiwas Glacier, fish for Himalayan trout in Sindh river, and cruise Dal Lake.",
    highlights: [
      "Sonamarg Thajiwas Glacier Sledge & Snow Point",
      "Sindh River Roaring Rapids & Pine Valley Camping",
      "Sacred Kheer Bhawani Temple & Manasbal Lake",
      "Dal Lake Shikara Cruise & Floating Market",
      "Srinagar Shankaracharya Hill Temple"
    ],
    inclusions: [
      "1 Night Houseboat + 2 Nights Sonamarg/Srinagar Hotel",
      "Daily Buffet Breakfast & Dinner",
      "Private AC Cab for all Sightseeing & Transfers",
      "1-Hour Shikara Ride Included"
    ],
    days: [
      { day: 1, title: "Srinagar Pickup, Shikara Ride & Houseboat Stay", desc: "Airport pickup, check-in to Dal Lake houseboat & sunset Shikara cruise." },
      { day: 2, title: "Srinagar to Sonamarg Meadow of Gold", desc: "Scenic drive along Sindh river, Thajiwas glacier pony ride & riverside camp/hotel." },
      { day: 3, title: "Sonamarg to Manasbal Lake & Srinagar", desc: "Visit Manasbal lake (deepest lake in Kashmir), Kheer Bhawani & Srinagar hotel." },
      { day: 4, title: "Mughal Gardens & Srinagar Airport Drop", desc: "Explore Shalimar & Nishat Bagh & on-time drop at Srinagar airport." }
    ]
  },
  {
    id: "pkg-doodhpathri-offbeat-kashmir",
    title: "Offbeat Kashmir: Doodhpathri, Yusmarg & Srinagar",
    destination: "Doodhpathri • Yusmarg • Nilnag • Srinagar",
    category: "Kashmir",
    duration: "4 Days / 3 Nights",
    price_inr: 14500,
    original_price_inr: 19500,
    badge: "Untouched Beauty",
    rating: 4.9,
    reviews_count: 85,
    image: "/images/packages/dal_lake_shikara.jpg",
    description: "Escape the tourist crowds to the Valley of Milk at Doodhpathri and alpine grasslands of Yusmarg with bubbling streams, pine forests, and homestays.",
    highlights: [
      "Doodhpathri Shaliganga River Valley of Milk",
      "Yusmarg Meadow of Jesus & Nilnag Pine Lake",
      "Zero Commercial Crowd & Pure Himalayan Solitude",
      "Traditional Kashmiri Wazwan Feast & Kahwa",
      "Srinagar Dal Lake Houseboat Experience"
    ],
    inclusions: [
      "3 Nights Deluxe Boutique Stays & Houseboat",
      "Daily Breakfast & Authentic Kashmiri Dinner",
      "Private Mountain Chauffeur Driven Cab",
      "All Sightseeing & Forest Green Entry Taxes"
    ],
    days: [
      { day: 1, title: "Srinagar Arrival & Dal Lake Sunset Houseboat", desc: "Chauffeur pickup, check-in at luxury houseboat & sunset Shikara cruise." },
      { day: 2, title: "Full Day Excursion to Doodhpathri Valley of Milk", desc: "Explore crystal clear Shaliganga river, lush green meadows & pine forest picnic." },
      { day: 3, title: "Day Trip to Yusmarg & Nilnag Emerald Lake", desc: "Scenic mountain drive to Yusmarg meadows, pony trek to Nilnag lake & return." },
      { day: 4, title: "Old Srinagar Heritage Stroll & Airport Drop", desc: "Visit Jamia Masjid, spice & dry fruit shopping, on-time airport drop." }
    ]
  },
  {
    id: "pkg-gulmarg-ski-snow-adventure",
    title: "Gulmarg Alpine Snow & Skiing Winter Holiday",
    destination: "Gulmarg • Apharwat Peak • Tangmarg • Srinagar",
    category: "Kashmir",
    duration: "4 Days / 3 Nights",
    price_inr: 18999,
    original_price_inr: 25000,
    badge: "Snow Paradise",
    rating: 4.9,
    reviews_count: 165,
    image: "/images/packages/gulmarg_gondola_ski.jpg",
    description: "Immerse in winter wonderland with Asia's highest cable car, professional ski instructors, snowmobiles, and cozy pine resort stays in Gulmarg.",
    highlights: [
      "Gulmarg Gondola Phase 1 (Kongdoori) & Phase 2 (Apharwat)",
      "Beginner Skiing & Snowboarding Lessons with Certified Coach",
      "Snowmobile Rides, Sledging & Igloo Cafe Experience",
      "Tangmarg Pine Forests & Drung Frozen Waterfall",
      "Cozy Resort with Central Heating & Hot Kashmiri Kahwa"
    ],
    inclusions: [
      "2 Nights Gulmarg Alpine Resort + 1 Night Srinagar Hotel",
      "Daily Buffet Breakfast & Dinner",
      "Heated Rooms & 4x4 Snow Vehicle for Tangmarg-Gulmarg",
      "Gondola Ticket Booking Assistance"
    ],
    days: [
      { day: 1, title: "Srinagar Airport to Gulmarg Snow Valley", desc: "Chauffeur pickup, drive past Tangmarg snow trees to Gulmarg heated resort." },
      { day: 2, title: "Full Day Gulmarg Gondola Phase 1 & 2 Snow", desc: "Board cable car to 14,000 ft Apharwat peak, snow activities & ski lesson." },
      { day: 3, title: "Drung Frozen Waterfall to Srinagar Houseboat", desc: "Visit frozen waterfall in Drung, drive to Srinagar & Dal Lake Shikara." },
      { day: 4, title: "Mughal Gardens & Srinagar Airport Drop", desc: "Visit Nishat Bagh & on-time drop at Srinagar airport." }
    ]
  },
  {
    id: "pkg-kashmir-gurez-valley",
    title: "Hidden Gurez Valley & Habba Khatoon Expedition",
    destination: "Gurez Valley • Razdan Pass • Dawar • Srinagar",
    category: "Kashmir",
    duration: "5 Days / 4 Nights",
    price_inr: 21500,
    original_price_inr: 28500,
    badge: "Off-the-Map Kashmir",
    rating: 5.0,
    reviews_count: 70,
    image: "/images/packages/gurez_valley.jpg",
    description: "Travel along the ancient Silk Route across Razdan Pass (11,672 ft) to the mythical Gurez Valley, Kishan Ganga river, and pyramid peak Habba Khatoon.",
    highlights: [
      "Spectacular Cross-Mountain Drive over Razdan Pass",
      "Habba Khatoon Pyramid Peak & Spring Water Source",
      "Kishan Ganga River Rafting & Trout Fishing",
      "Shina Tribal Culture & Wooden Village Architecture",
      "Srinagar Dal Lake Houseboat Stay"
    ],
    inclusions: [
      "2 Nights Gurez Homestay + 2 Nights Srinagar Stays",
      "All Wholesome Meals Included in Gurez",
      "Dedicated 4x4 Mountain Cab with Experienced Driver",
      "Gurez Inner Line Permits & Border Passes"
    ],
    days: [
      { day: 1, title: "Srinagar Arrival & Houseboat Stay", desc: "Chauffeur pickup, Shikara ride & overnight stay on Dal Lake." },
      { day: 2, title: "Srinagar to Gurez Valley via Razdan Pass", desc: "Scenic drive over Razdan Pass with Harmukh peak views, arrive in Dawar." },
      { day: 3, title: "Habba Khatoon Peak & Kishan Ganga Exploration", desc: "Visit Habba Khatoon spring, explore border villages & local Shina culture." },
      { day: 4, title: "Gurez to Wular Lake & Srinagar", desc: "Descent from Gurez, visit Asia's largest freshwater lake Wular & Srinagar." },
      { day: 5, title: "Srinagar Souvenir Shopping & Airport Drop", desc: "Dry fruit market visit & on-time Srinagar airport transfer." }
    ]
  },
  {
    id: "pkg-vaishnodevi-kashmir-combo",
    title: "Maa Vaishno Devi Darshan & Kashmir Valley Combo",
    destination: "Katra • Vaishno Devi • Srinagar • Gulmarg • Pahalgam",
    category: "Kashmir",
    duration: "7 Days / 6 Nights",
    price_inr: 24999,
    original_price_inr: 33000,
    badge: "Spiritual & Scenic",
    rating: 4.9,
    reviews_count: 195,
    image: "/images/packages/katra_trikuta_mountain.jpg",
    description: "The ultimate North Indian journey combining the divine blessings of Mata Vaishno Devi in Katra with the scenic paradise of Kashmir valley.",
    highlights: [
      "Mata Vaishno Devi Bhawan Yatra (Heli / Battery Car Support)",
      "Scenic Drive across Chenani-Nashri Tunnel & Banihal",
      "Dal Lake Luxury Houseboat Stay & Shikara Ride",
      "Gulmarg Gondola Ride & Snow Viewpoint",
      "Pahalgam Betaab Valley & Saffron Fields of Pampore"
    ],
    inclusions: [
      "2 Nights Katra + 1 Night Houseboat + 3 Nights Kashmir Resorts",
      "Daily Pure Veg / Satvik Breakfast & Dinner",
      "Private AC Vehicle for entire Jammu-Kashmir tour",
      "Yatra Parchi & VIP Darshan Guidance"
    ],
    days: [
      { day: 1, title: "Jammu Airport/Station Pickup to Katra", desc: "Chauffeur pickup, drive to Katra, hotel check-in & Yatra briefing." },
      { day: 2, title: "Mata Vaishno Devi Holy Darshan", desc: "Trek/helicopter to Holy Cave Bhawan, Darshan & return to Katra." },
      { day: 3, title: "Katra to Srinagar via Patnitop & Banihal Tunnel", desc: "Scenic mountain highway drive, arrive in Srinagar & check-in to houseboat." },
      { day: 4, title: "Srinagar to Gulmarg Gondola Cable Car", desc: "Day trip to Gulmarg, ride cable car to snow peaks & return to Srinagar." },
      { day: 5, title: "Srinagar to Pahalgam Valley of Shepherds", desc: "Drive past Pampore saffron fields, explore Betaab valley & Lidder river." },
      { day: 6, title: "Pahalgam to Srinagar Mughal Gardens", desc: "Visit Shalimar & Nishat Bagh, sunset Shikara ride on Dal Lake." },
      { day: 7, title: "Srinagar Airport Return Drop", desc: "Souvenir dry fruit shopping & on-time airport drop." }
    ]
  },

  // ==========================================
  // 5. ROYAL RAJASTHAN (7 tours)
  // ==========================================
  {
    id: "pkg-rajasthan-royal",
    title: "Royal Rajputana: Jaipur, Jodhpur & Udaipur",
    destination: "Jaipur • Jodhpur • Udaipur",
    category: "Rajasthan",
    duration: "6 Days / 5 Nights",
    price_inr: 22999,
    original_price_inr: 31000,
    badge: "Heritage Special",
    rating: 4.8,
    reviews_count: 155,
    image: "/images/packages/jaipur_pink_city.jpg",
    description: "Explore the land of maharajas with majestic Amber Fort in Jaipur, towering Mehrangarh Fort in Jodhpur, and romantic boat cruises on Lake Pichola in Udaipur.",
    highlights: [
      "Amber Fort Elephant/Jeep Ride & City Palace Jaipur",
      "Udaipur Lake Pichola Boat Cruise & Jag Mandir",
      "Mehrangarh Fort & Jaswant Thada in Blue City Jodhpur",
      "Cultural Rajasthani Folk Dance, Music & Royal Dinner",
      "Heritage Haveli Stay with Rajputana Architecture"
    ],
    inclusions: [
      "5 Nights Heritage Haveli & 4★ Hotel Stays",
      "Daily Royal Breakfast & Traditional Dinners",
      "Private AC Sedan Cab with English/Hindi Speaking Driver",
      "Palace Tour Guide Assistance & Entry Support"
    ],
    days: [
      { day: 1, title: "Jaipur Airport/Railway Pickup & City Palace", desc: "Chauffeur pickup, check-in, visit City Palace, Jantar Mantar & Hawa Mahal." },
      { day: 2, title: "Amber Fort, Nahargarh & Chokhi Dhani Dinner", desc: "Amber Fort jeep ascent, Jal Mahal photo stop, Nahargarh sunset & cultural dinner." },
      { day: 3, title: "Jaipur to Jodhpur Blue City via Ajmer/Pushkar", desc: "Drive via holy Brahma Temple in Pushkar, arrive in Jodhpur & explore Clock Tower market." },
      { day: 4, title: "Mehrangarh Fort, Jaswant Thada & Drive to Udaipur", desc: "Explore grand Mehrangarh Fort, marble cenotaph Jaswant Thada & drive to Udaipur." },
      { day: 5, title: "Udaipur City Palace & Lake Pichola Sunset Cruise", desc: "Visit massive City Palace Udaipur, Saheliyon ki Bari & romantic boat ride on Lake Pichola." },
      { day: 6, title: "Sajjangarh Monsoon Palace & Return Drop", desc: "Visit Monsoon Palace overlooking city lakes & return drop at Udaipur/Jaipur airport." }
    ]
  },
  {
    id: "pkg-jaisalmer-desert-camp",
    title: "Golden City Jaisalmer, Thar Safari & Desert Camps",
    destination: "Jaisalmer • Sam Sand Dunes • Kuldhara",
    category: "Rajasthan",
    duration: "4 Days / 3 Nights",
    price_inr: 13500,
    original_price_inr: 18500,
    badge: "Desert Safari",
    rating: 4.9,
    reviews_count: 220,
    image: "/images/packages/jaisalmer_desert.jpg",
    description: "Live like royalty in luxury desert Swiss tents, enjoy camel & 4x4 dune bashing safaris on Sam Sand Dunes, and explore the living Golden Fort of Jaisalmer.",
    highlights: [
      "Sam Sand Dunes Luxury Swiss Tent Stay with Cultural Folk Show",
      "Camel Safari & 4x4 Jeep Dune Bashing at Sunset",
      "UNESCO Jaisalmer Golden Fort (Sonar Qila) & Patwon ki Haveli",
      "Ghost Village of Kuldhara & Gadisar Lake Boating",
      "Rajasthani Kalbelia Dance, Fire Show & Royal Buffet"
    ],
    inclusions: [
      "1 Night Desert Swiss Camp + 2 Nights Heritage Haveli Hotel",
      "All Meals in Desert Camp + Daily Breakfast in City",
      "Camel Safari & Jeep Dune Bashing Charges Included",
      "Private AC Cab for all Transfers & Sightseeing"
    ],
    days: [
      { day: 1, title: "Jodhpur/Jaisalmer Pickup & Gadisar Lake", desc: "Chauffeur pickup, heritage hotel check-in, Gadisar lake sunset & market." },
      { day: 2, title: "Jaisalmer Fort, Havelis & Drive to Desert Camp", desc: "Sonar Qila, Patwon ki Haveli, drive to Sam dunes, camel safari & folk night." },
      { day: 3, title: "Thar Desert Sunrise, Kuldhara & City Exploration", desc: "Dune sunrise, visit abandoned Kuldhara ghost village & Tanot border temple." },
      { day: 4, title: "Souvenir Leather/Craft Shopping & Drop", desc: "Local bazaar shopping & on-time return drop at Jaisalmer/Jodhpur station." }
    ]
  },
  {
    id: "pkg-udaipur-mountabu-romantic",
    title: "Venice of the East Udaipur & Mount Abu Hill Station",
    destination: "Udaipur • Mount Abu • Dilwara Temples",
    category: "Rajasthan",
    duration: "5 Days / 4 Nights",
    price_inr: 16999,
    original_price_inr: 23000,
    badge: "Lakes & Hills",
    rating: 4.8,
    reviews_count: 140,
    image: "/images/packages/udaipur_city_palace.jpg",
    description: "Experience the romance of Udaipur's royal lakes and palaces combined with the cool mountain breezes and ornate Jain marble carvings of Mount Abu.",
    highlights: [
      "Lake Pichola Sunset Boat Cruise & Jag Mandir Island",
      "Massive City Palace of Udaipur & Vintage Car Museum",
      "Mount Abu 11th-Century Dilwara Marble Jain Temples",
      "Nakki Lake Boating, Toad Rock & Sunset Point",
      "Saheliyon ki Bari & Sajjangarh Monsoon Palace"
    ],
    inclusions: [
      "2 Nights Udaipur Lake Hotel + 2 Nights Mount Abu Resort",
      "Daily Buffet Breakfast & Dinner",
      "Private AC Sedan for entire tour",
      "All Sightseeing, Parking & Toll Taxes"
    ],
    days: [
      { day: 1, title: "Udaipur Airport/Station Pickup & City Palace", desc: "Chauffeur pickup, City Palace Udaipur, Jagdish temple & Bagore ki Haveli show." },
      { day: 2, title: "Lake Pichola Cruise, Saheliyon ki Bari & Monsoon Palace", desc: "Boat cruise on Lake Pichola, fountains at Saheliyon ki Bari & sunset palace." },
      { day: 3, title: "Udaipur to Mount Abu Hill Station", desc: "Scenic mountain drive to Mount Abu, Nakki lake boating & sunset point." },
      { day: 4, title: "Dilwara Temples, Guru Shikhar Peak & Toad Rock", desc: "Marvel at intricate Dilwara marble carvings & highest peak Guru Shikhar." },
      { day: 5, title: "Mount Abu to Udaipur Airport/Station Drop", desc: "Scenic descent & on-time return drop for onward journey." }
    ]
  },
  {
    id: "pkg-ranthambore-tiger-jaipur",
    title: "Ranthambore Tiger Safari & Pink City Jaipur",
    destination: "Jaipur • Ranthambore Tiger Reserve",
    category: "Rajasthan",
    duration: "4 Days / 3 Nights",
    price_inr: 14999,
    original_price_inr: 20500,
    badge: "Wild Royalty",
    rating: 4.8,
    reviews_count: 115,
    image: "/images/packages/ranthambore_tiger.jpg",
    description: "Combine the grandeur of Jaipur's palaces and forts with thrilling open canter tiger safaris inside Ranthambore National Park.",
    highlights: [
      "Open Canter / Gypsy Safari in Ranthambore Tiger Reserve",
      "Spot Royal Bengal Tigers, Leopards, Crocodiles & Deer",
      "UNESCO Amber Fort, Hawa Mahal & City Palace Jaipur",
      "Historic 10th-Century Ranthambore Fort & Trinetra Ganesh",
      "Stay in Luxury Jungle Lodge with Pool & Garden"
    ],
    inclusions: [
      "2 Nights Jaipur + 1 Night Ranthambore Jungle Resort",
      "Daily Buffet Breakfast & Dinner",
      "1 Jungle Safari Permit & Forest Guide Charges",
      "Private AC Vehicle for all Transfers & Sightseeing"
    ],
    days: [
      { day: 1, title: "Jaipur Arrival & Pink City Sightseeing", desc: "Chauffeur pickup, City Palace, Hawa Mahal & Johari Bazaar shopping." },
      { day: 2, title: "Amber Fort Excursion & Drive to Ranthambore", desc: "Amber fort elephant/jeep tour, Jal Mahal & scenic drive to Ranthambore lodge." },
      { day: 3, title: "Morning Tiger Safari & Ranthambore Fort", desc: "Early morning jungle safari inside tiger territory, visit Ranthambore fort." },
      { day: 4, title: "Ranthambore to Jaipur Airport/Station Drop", desc: "Comfortable drive back to Jaipur & on-time return transfer." }
    ]
  },
  {
    id: "pkg-pushkar-ajmer-jaipur",
    title: "Sacred Pushkar, Ajmer Sharif & Royal Jaipur",
    destination: "Jaipur • Ajmer • Pushkar Holy Lake",
    category: "Rajasthan",
    duration: "3 Days / 2 Nights",
    price_inr: 9999,
    original_price_inr: 13999,
    badge: "Spiritual Heritage",
    rating: 4.7,
    reviews_count: 130,
    image: "/images/packages/pushkar_lake.jpg",
    description: "Visit the world's only Lord Brahma Temple and sacred Sarovar lake in Pushkar, pay homage at Ajmer Sharif Dargah, and tour the royal sights of Jaipur.",
    highlights: [
      "World-Famous Lord Brahma Temple & 52 Holy Ghats in Pushkar",
      "Dargah Hazrat Khwaja Moinuddin Chishti in Ajmer",
      "Pushkar Camel Desert Sunset & Rose Garden Walk",
      "Jaipur Amber Fort, Jal Mahal & Nahargarh Fort",
      "Traditional Rajasthani Thali Dining Experience"
    ],
    inclusions: [
      "1 Night Pushkar Desert Resort + 1 Night Jaipur Hotel",
      "Daily Breakfast & Authentic Rajasthani Dinner",
      "Private AC Sedan for full tour",
      "All Sightseeing & Toll Taxes"
    ],
    days: [
      { day: 1, title: "Jaipur Arrival, Amber Fort & Nahargarh Sunset", desc: "Chauffeur pickup, Amber Fort, Jal Mahal & sunset over city from Nahargarh." },
      { day: 2, title: "Jaipur to Ajmer Dargah & Pushkar Brahma Temple", desc: "Drive to Ajmer Sharif Dargah, proceed to Pushkar, holy bath & Brahma temple puja." },
      { day: 3, title: "Pushkar Desert Stroll & Return Drop at Jaipur", desc: "Pushkar lake morning Aarti, souvenir shopping & return drop at Jaipur airport/station." }
    ]
  },
  {
    id: "pkg-bikaner-jodhpur-jaisalmer",
    title: "Desert Triangle: Bikaner, Jaisalmer & Jodhpur",
    destination: "Bikaner • Jaisalmer • Jodhpur",
    category: "Rajasthan",
    duration: "6 Days / 5 Nights",
    price_inr: 21500,
    original_price_inr: 28500,
    badge: "Thar Circuit",
    rating: 4.8,
    reviews_count: 95,
    image: "/images/packages/jaisalmer_desert.jpg",
    description: "Venture deep into the Thar Desert exploring Junagarh Fort in Bikaner, camel breeding farm, Sam dunes camp in Jaisalmer, and Mehrangarh Fort in Jodhpur.",
    highlights: [
      "Bikaner Unconquered Junagarh Fort & Karni Mata Rat Temple",
      "Asia's Largest Camel Breeding Farm & Research Centre",
      "Jaisalmer Golden Fort, Havelis & Sam Sand Dunes Swiss Camp",
      "Jodhpur Blue City, Mehrangarh Fort & Jaswant Thada",
      "Authentic Dal Baati Churma & Desert Cultural Evening"
    ],
    inclusions: [
      "4 Nights Heritage Hotels + 1 Night Desert Swiss Camp",
      "Daily Buffet Breakfast & Traditional Dinners",
      "Camel Safari on Thar Dunes with Evening Folk Show",
      "Private AC Vehicle with Dedicated Chauffeur"
    ],
    days: [
      { day: 1, title: "Jaipur/Jodhpur Pickup to Bikaner", desc: "Drive to Bikaner, check-in, visit Junagarh Fort & camel breeding farm." },
      { day: 2, title: "Karni Mata Temple & Drive to Jaisalmer", desc: "Visit Karni Mata temple, drive to Golden City Jaisalmer & Gadisar lake." },
      { day: 3, title: "Jaisalmer Fort, Havelis & Sam Sand Dunes Camp", desc: "Sonar Qila tour, drive to desert dunes, camel ride, folk dance & tent stay." },
      { day: 4, title: "Sam Dunes to Jodhpur Blue City", desc: "Drive to Jodhpur, check-in, explore Clock Tower & blue city streets." },
      { day: 5, title: "Mehrangarh Fort, Jaswant Thada & Umaid Bhawan", desc: "Explore grand Mehrangarh Fort, museum & royal Umaid Bhawan Palace." },
      { day: 6, title: "Jodhpur Souvenir Shopping & Airport Drop", desc: "Spices and handicrafts shopping & on-time return drop at Jodhpur airport." }
    ]
  },
  {
    id: "pkg-grand-rajasthan-forts",
    title: "Grand Rajasthan Heritage: Jaipur, Pushkar, Jodhpur & Udaipur",
    destination: "Jaipur • Pushkar • Jodhpur • Ranakpur • Udaipur",
    category: "Rajasthan",
    duration: "7 Days / 6 Nights",
    price_inr: 26999,
    original_price_inr: 36000,
    badge: "Grand Royal Journey",
    rating: 4.9,
    reviews_count: 110,
    image: "/images/packages/jaipur_pink_city.jpg",
    description: "The complete royal grand circuit of Rajasthan covering majestic palaces, ancient desert temples, marble Jain wonders at Ranakpur, and lake cruises.",
    highlights: [
      "Jaipur Amber Fort, City Palace & Hawa Mahal",
      "Sacred Pushkar Lake & Lord Brahma Temple",
      "Jodhpur Mehrangarh Fort & Jaswant Thada",
      "Ranakpur 1,444 Marble Pillar Jain Temple Complex",
      "Udaipur City Palace & Lake Pichola Sunset Boat Cruise"
    ],
    inclusions: [
      "6 Nights Luxury Heritage Haveli & 4★ Hotel Stays",
      "Daily Royal Buffet Breakfast & Dinner",
      "Private AC Sedan/Innova for full 7-day tour",
      "All Sightseeing, Toll Taxes & Driver Night Charges"
    ],
    days: [
      { day: 1, title: "Jaipur Arrival & City Palace Sightseeing", desc: "Chauffeur pickup, City Palace, Hawa Mahal & evening market." },
      { day: 2, title: "Amber Fort & Cultural Evening at Chokhi Dhani", desc: "Amber Fort jeep ascent, Jal Mahal photo stop & Rajasthani cultural feast." },
      { day: 3, title: "Jaipur to Pushkar Brahma Temple & Jodhpur", desc: "Drive to holy Pushkar lake, Brahma temple & arrive in Jodhpur." },
      { day: 4, title: "Mehrangarh Fort & Blue City Heritage Walk", desc: "Explore grand Mehrangarh Fort, Jaswant Thada & Umaid Bhawan museum." },
      { day: 5, title: "Jodhpur to Udaipur via Ranakpur Marble Temple", desc: "Scenic drive via 1444 pillar Ranakpur temple to lake city Udaipur." },
      { day: 6, title: "Udaipur City Palace & Lake Pichola Cruise", desc: "Massive City Palace, Saheliyon ki Bari & romantic sunset boat ride." },
      { day: 7, title: "Udaipur Airport/Railway Return Drop", desc: "Souvenir shopping & on-time return drop at Udaipur/Jaipur." }
    ]
  },

  // ==========================================
  // 6. GOA & KERALA ESCAPES (7 tours)
  // ==========================================
  {
    id: "pkg-goa-sun-sand",
    title: "Tropical Goa Beach & Cruise Carnival",
    destination: "North & South Goa",
    category: "Goa & Kerala",
    duration: "4 Days / 3 Nights",
    price_inr: 9999,
    original_price_inr: 14500,
    badge: "Trending Beach",
    rating: 4.7,
    reviews_count: 280,
    image: "/images/packages/goa_beach_yacht.jpg",
    description: "Relax on sun-kissed beaches, explore Portuguese heritage in Fontainhas Latin Quarter, and enjoy sunset party cruises on Mandovi River.",
    highlights: [
      "Baga, Calangute, Anjuna & Candolim Beach Tour",
      "Mandovi River Sunset Cruise with DJ & Goan Folk Dance",
      "Historic Fort Aguada & Chapora Fort (Dil Chahta Hai point)",
      "UNESCO Portuguese Churches in Old Goa (Basilica of Bom Jesus)",
      "Water Sports Combo (Parasailing, Jet Ski, Banana Ride)"
    ],
    inclusions: [
      "3 Nights Beach Resort Stay with Swimming Pool",
      "Daily Buffet Breakfast",
      "All Sightseeing in Private AC Cab",
      "Airport / Railway Station Transfers in Goa"
    ],
    days: [
      { day: 1, title: "Goa Airport Pickup & North Goa Beach Shacks", desc: "Chauffeur pickup, resort check-in, relax at Calangute/Baga beach & lively beach shacks." },
      { day: 2, title: "Fort Aguada, Chapora & Water Sports Combo", desc: "Visit 17th-century Fort Aguada, Chapora fort & enjoy parasailing and jet ski at Anjuna." },
      { day: 3, title: "Old Goa Heritage Churches & Mandovi Sunset Cruise", desc: "Basilica of Bom Jesus, Se Cathedral, Fontainhas colorful quarter & Mandovi river cruise." },
      { day: 4, title: "Souvenir Shopping & Airport Return Drop", desc: "Panaji cashew and feni shopping & on-time transfer to Goa Dabolim/Mopa airport." }
    ]
  },
  {
    id: "pkg-kerala-backwaters",
    title: "God's Own Country: Munnar, Thekkady & Alleppey",
    destination: "Munnar • Thekkady • Alleppey Backwaters",
    category: "Goa & Kerala",
    duration: "5 Days / 4 Nights",
    price_inr: 18999,
    original_price_inr: 25500,
    badge: "Honeymoon Special",
    rating: 4.9,
    reviews_count: 172,
    image: "/images/packages/kerala_houseboat.jpg",
    description: "Endless rolling tea estates in Munnar, spice plantations & boat safaris in Thekkady, and private luxury houseboat cruise on Alleppey backwaters.",
    highlights: [
      "Private Air-Conditioned Houseboat Cruise in Alleppey",
      "Munnar Tea Plantations, Mattupetty Dam & Echo Point",
      "Periyar National Park Lake Boat Safari & Spice Walk",
      "Authentic Kerala Ayurvedic Rejuvenation Experience",
      "Fort Kochi Chinese Fishing Nets & Heritage Walk"
    ],
    inclusions: [
      "1 Night Luxury AC Houseboat + 3 Nights 4★ Resort",
      "All Meals on Houseboat + Daily Breakfast at Resorts",
      "Dedicated Private AC Sedan/Innova for full tour",
      "Cochin Airport Pickup and Drop"
    ],
    days: [
      { day: 1, title: "Cochin Pickup & Scenic Drive to Munnar Tea Hills", desc: "Chauffeur pickup, Cheeyappara & Valara waterfalls, arrive in Munnar & tea plantation stroll." },
      { day: 2, title: "Munnar Full Day Sightseeing: Eravikulam & Mattupetty", desc: "Visit Eravikulam National Park (Nilgiri Tahr), Mattupetty Dam, Echo Point & Tea Museum." },
      { day: 3, title: "Munnar to Thekkady Spice Plantations & Periyar Safari", desc: "Scenic mountain drive to Thekkady, spice garden guided tour & Periyar boat safari." },
      { day: 4, title: "Thekkady to Alleppey Luxury Private Houseboat Cruise", desc: "12:30 PM check-in to private Kettuvallam houseboat, cruise tranquil backwaters & feast on Kerala meals." },
      { day: 5, title: "Alleppey to Fort Kochi Heritage & Airport Drop", desc: "Morning backwater sunrise, visit Fort Kochi Chinese fishing nets & Cochin airport drop." }
    ]
  },
  {
    id: "pkg-south-goa-luxury-heritage",
    title: "South Goa 5-Star Luxury Beach Resort & Dudhsagar Falls",
    destination: "South Goa • Palolem • Dudhsagar • Colva",
    category: "Goa & Kerala",
    duration: "4 Days / 3 Nights",
    price_inr: 15500,
    original_price_inr: 21000,
    badge: "Luxury & Serenity",
    rating: 4.8,
    reviews_count: 140,
    image: "/images/packages/goa_beach_yacht.jpg",
    description: "Indulge in peaceful white-sand beaches at Palolem, private 4x4 jungle jeep safari to Dudhsagar Waterfalls, organic spice plantation tour, and 5-star beachfront resorts.",
    highlights: [
      "Dudhsagar 4-Tier Waterfall 4x4 Jungle Jeep Safari",
      "Pristine Palolem & Agonda Tranquil White Sand Beaches",
      "Sahakari Organic Spice Plantation Tour with Goan Buffet",
      "Colva Beach Sunset & Cabo de Rama Cliff Viewpoint",
      "5-Star Beach Resort Stay with Spa & Infinity Pool"
    ],
    inclusions: [
      "3 Nights 5★ Beach Resort Stay",
      "Daily Lavish Buffet Breakfast",
      "Dudhsagar Jeep Safari & Forest Entry Permits",
      "Private AC Luxury Sedan for all Transfers"
    ],
    days: [
      { day: 1, title: "Goa Airport to South Goa Luxury Resort", desc: "Chauffeur pickup, resort check-in, pool relax & evening sunset at Colva beach." },
      { day: 2, title: "Dudhsagar Waterfall Jeep Safari & Spice Farm", desc: "4x4 jungle safari to Dudhsagar waterfall, swim in natural pool & spice lunch." },
      { day: 3, title: "Palolem Beach, Agonda & Cabo de Rama Fort", desc: "Explore southern coastline, cliff views from Cabo de Rama & beach shacks." },
      { day: 4, title: "Resort Spa, Souvenirs & Airport Drop", desc: "Morning spa, cashew & feni shopping & on-time airport drop." }
    ]
  },
  {
    id: "pkg-wayanad-rainforest-treehouse",
    title: "Wayanad Rainforest, Luxury Treehouse & Nature",
    destination: "Wayanad • Chembra Peak • Edakkal Caves",
    category: "Goa & Kerala",
    duration: "4 Days / 3 Nights",
    price_inr: 12999,
    original_price_inr: 17500,
    badge: "Treehouse Glamping",
    rating: 4.9,
    reviews_count: 110,
    image: "/images/packages/wayanad_rainforest.jpg",
    description: "Stay in a romantic luxury treehouse perched 60 ft amidst coffee and spice plantations, explore Edakkal prehistoric caves, and trek to heart-shaped Chembra Lake.",
    highlights: [
      "Authentic Luxury Wooden Treehouse Stay in Rainforest",
      "Chembra Peak & Heart-Shaped Emerald Mountain Lake",
      "Edakkal Prehistoric Neolithic Rock Engraving Caves",
      "Banasura Sagar Dam (Largest Earthen Dam in India)",
      "Bamboo Rafting in Kuruva Island & Soochipara Falls"
    ],
    inclusions: [
      "1 Night Luxury Treehouse + 2 Nights Plantation Resort",
      "Daily Plantation Breakfast & Kerala Dinners",
      "Private AC Cab for all Sightseeing & Transfers",
      "Calicut (Kozhikode) Airport/Station Pickup & Drop"
    ],
    days: [
      { day: 1, title: "Calicut Pickup & Drive to Wayanad Rainforest", desc: "Chauffeur pickup, drive up 9 hairpin ghats, check-in to treehouse & coffee walk." },
      { day: 2, title: "Edakkal Caves, Soochipara Falls & Zip Line", desc: "Explore prehistoric caves, bathe in Soochipara waterfall & tea factory tour." },
      { day: 3, title: "Banasura Sagar Dam & Kuruva Island Bamboo Raft", desc: "Speedboat at Banasura dam, bamboo rafting at Kuruva island & campfire." },
      { day: 4, title: "Pookode Lake, Souvenir Spices & Calicut Drop", desc: "Boating at Pookode lake, organic spice shopping & Calicut drop." }
    ]
  },
  {
    id: "pkg-kerala-complete-kovalam",
    title: "Complete Kerala: Munnar, Thekkady, Alleppey & Kovalam",
    destination: "Munnar • Thekkady • Alleppey • Kovalam • Kanyakumari",
    category: "Goa & Kerala",
    duration: "7 Days / 6 Nights",
    price_inr: 27500,
    original_price_inr: 37000,
    badge: "Kerala Grand Tour",
    rating: 4.9,
    reviews_count: 145,
    image: "/images/packages/kerala_houseboat.jpg",
    description: "The complete Kerala experience from misty tea hills of Munnar, wildlife safaris in Thekkady, luxury backwater houseboat cruise in Alleppey to crescent Kovalam beach.",
    highlights: [
      "Munnar Eravikulam National Park & Tea Hills",
      "Periyar Lake Wildlife Sanctuary Boat Safari",
      "Private Luxury Air-Conditioned Houseboat Cruise",
      "Kovalam Lighthouse Beach & Sunset Promenade",
      "Day Trip to Kanyakumari (Triveni Sangam & Vivekananda Rock)"
    ],
    inclusions: [
      "1 Night Houseboat + 5 Nights 4★ Deluxe Hill & Beach Resorts",
      "All Meals on Houseboat + Daily Breakfast at Resorts",
      "Dedicated Private AC Sedan/Innova with Chauffeur",
      "Cochin Pickup & Trivandrum Airport Drop"
    ],
    days: [
      { day: 1, title: "Cochin Pickup to Munnar Tea Hills", desc: "Chauffeur pickup, Cheeyappara waterfalls & Munnar resort check-in." },
      { day: 2, title: "Munnar Full Day Sightseeing & Tea Museum", desc: "Eravikulam park, Mattupetty dam, Echo point & tea factory." },
      { day: 3, title: "Munnar to Thekkady Spice Plantation & Safari", desc: "Drive to Thekkady, spice garden guided walk & Periyar boat safari." },
      { day: 4, title: "Thekkady to Alleppey Luxury Private Houseboat", desc: "Check-in to private houseboat, cruise backwaters & authentic Kerala lunch." },
      { day: 5, title: "Alleppey to Kovalam Lighthouse Beach", desc: "Drive to Kovalam, check-in to beach resort & relax on Lighthouse beach." },
      { day: 6, title: "Day Excursion to Kanyakumari Cape", desc: "Vivekananda Rock Memorial, Thiruvalluvar statue & Triveni Sangam sunset." },
      { day: 7, title: "Padmanabhaswamy Temple & Trivandrum Drop", desc: "Visit world's richest Padmanabhaswamy temple & Trivandrum airport drop." }
    ]
  },
  {
    id: "pkg-goa-party-yacht-vip",
    title: "Goa VIP Private Yacht Cruise & Scuba Island Combo",
    destination: "Grand Island • Calangute • Panaji • Baga",
    category: "Goa & Kerala",
    duration: "4 Days / 3 Nights",
    price_inr: 14999,
    original_price_inr: 21000,
    badge: "VIP Party & Scuba",
    rating: 4.8,
    reviews_count: 190,
    image: "/images/packages/goa_beach_yacht.jpg",
    description: "Experience Goa in ultimate style with Grand Island scuba diving, private luxury sunset yacht cruise with champagne, and VIP club entry.",
    highlights: [
      "Grand Island Scuba Diving with Certified PADI Instructor & Video",
      "Private 2-Hour Luxury Sunset Yacht Cruise on Mandovi River",
      "Water Sports Package (Parasailing, Jet Ski, Banana & Bumper Ride)",
      "Dolphin Spotting Boat Ride in Arabian Sea",
      "VIP Club Pass & North Goa Beach Nightlife"
    ],
    inclusions: [
      "3 Nights 4★ Beach Resort Stay with Swimming Pool",
      "Daily Buffet Breakfast & Scuba Buffet Lunch on Island",
      "Scuba Diving Video & Photos in HD",
      "All Sightseeing & Island Boat Transfers"
    ],
    days: [
      { day: 1, title: "Goa Airport Pickup & Sunset Yacht Cruise", desc: "Chauffeur pickup, check-in, 2-hour private yacht cruise with music & drinks." },
      { day: 2, title: "Grand Island Scuba Diving & Dolphin Safari", desc: "Boat to Grand Island, underwater scuba dive, coral reef exploration & BBQ lunch." },
      { day: 3, title: "North Goa Water Sports & Fort Aguada", desc: "Parasailing & jet ski combo at Baga, visit 17th-century Aguada fort & nightlife." },
      { day: 4, title: "Fontainhas Latin Quarter & Airport Drop", desc: "Explore colorful Portuguese street quarter, souvenir shopping & airport drop." }
    ]
  },
  {
    id: "pkg-munnar-alleppey-express",
    title: "Munnar Emerald Hills & Alleppey Houseboat Express",
    destination: "Munnar • Alleppey Backwaters • Kochi",
    category: "Goa & Kerala",
    duration: "4 Days / 3 Nights",
    price_inr: 14500,
    original_price_inr: 19500,
    badge: "Classic Kerala",
    rating: 4.9,
    reviews_count: 130,
    image: "/images/packages/kerala_houseboat.jpg",
    description: "The ideal short vacation in Kerala combining 2 nights in the cool tea hills of Munnar and 1 night on a private luxury houseboat in Alleppey backwaters.",
    highlights: [
      "Munnar Endless Rolling Tea Hills & Echo Point",
      "Private Air-Conditioned Houseboat Cruise in Alleppey",
      "Cheeyappara & Valara Mountain Waterfalls",
      "Authentic Kerala Sadya Feast with Karimeen Fish Curry",
      "Fort Kochi Heritage Walk & Chinese Fishing Nets"
    ],
    inclusions: [
      "2 Nights Munnar Hill Resort + 1 Night Alleppey Houseboat",
      "All Meals on Houseboat + Daily Breakfast in Munnar",
      "Dedicated Private AC Sedan with Driver",
      "Cochin Airport / Railway Station Transfers"
    ],
    days: [
      { day: 1, title: "Cochin Pickup & Drive to Munnar Tea Hills", desc: "Chauffeur pickup, Cheeyappara waterfalls, Munnar check-in & evening walk." },
      { day: 2, title: "Munnar Full Day: Eravikulam & Mattupetty Dam", desc: "Eravikulam park, Mattupetty dam, Echo point & tea museum." },
      { day: 3, title: "Munnar to Alleppey Luxury Private Houseboat", desc: "Drive to Alleppey, 12:30 PM houseboat check-in, cruise backwaters & sunset." },
      { day: 4, title: "Alleppey to Fort Kochi & Airport Drop", desc: "Morning backwater sunrise, visit Fort Kochi Chinese fishing nets & airport drop." }
    ]
  },
  // ==========================================
  // 7. INDIVIDUAL & COMBO PACKAGES: DELHI, AGRA, JAIPUR & MATHURA-VRINDAVAN
  // ==========================================
  
  // ==========================================
  // 7. INDIVIDUAL & COMBO PACKAGES: DELHI, AGRA, JAIPUR & MATHURA-VRINDAVAN
  // ==========================================
  
  // --- A. INDIVIDUAL DELHI PACKAGES ---
  {
    id: "pkg-delhi-same-day-darshan",
    title: "Same Day Delhi Capital Sightseeing & Heritage Express",
    destination: "Old Delhi • New Delhi • Akshardham Temple",
    category: "Delhi",
    duration: "1 Day (Full Day)",
    price_inr: 3499,
    original_price_inr: 5500,
    badge: "Same Day Delhi Express",
    rating: 4.8,
    reviews_count: 128,
    image: "/images/packages/delhi_monuments.jpg",
    description: "Full day express city tour of India's capital covering Mughal wonders, colonial landmarks of Lutyens' Delhi, and the magnificent Akshardham Temple with dedicated AC cab and chauffeur.",
    highlights: [
      "Red Fort & Jama Masjid photo-stop with Old Delhi vibes",
      "Qutub Minar (UNESCO World Heritage Site)",
      "Humayun's Tomb & India Gate War Memorial drive",
      "Rashtrapati Bhavan, Parliament House & Connaught Place",
      "Lotus Temple (Bahá'í House of Worship) & Swaminarayan Akshardham Temple",
      "Delhi Street Food & Souvenir Shopping support"
    ],
    inclusions: [
      "Full Day Dedicated AC Sedan/SUV with Driver (8 Hrs / 80 Kms or Full Day)",
      "Doorstep Pickup & Drop anywhere in Delhi / NCR / Airport / Railway Station",
      "All Fuel, Toll Taxes, Parking & Driver Allowances",
      "Customizable Sightseeing Stops & Lunch Break"
    ],
    days: [
      { day: 1, title: "Delhi Full Day Heritage & Modern Capital Tour", desc: "Morning pickup, explore Red Fort, Jama Masjid, India Gate, drive past Parliament & Rashtrapati Bhavan, visit Humayun's Tomb, Qutub Minar, Lotus Temple & grand Akshardham Temple evening light/water show followed by drop-off." }
    ]
  },
  {
    id: "pkg-delhi-capital-sightseeing",
    title: "Delhi Capital City Heritage & Sightseeing Tour",
    destination: "Old Delhi • New Delhi • Swaminarayan Akshardham",
    category: "Delhi",
    duration: "2 Days / 1 Night",
    price_inr: 6499,
    original_price_inr: 9500,
    badge: "Delhi Weekend Special",
    rating: 4.8,
    reviews_count: 162,
    image: "/images/packages/delhi_monuments.jpg",
    description: "Explore India's historic and vibrant capital city spanning the Mughal grandeur of Old Delhi, the colonial architecture of Lutyens' Delhi, and the magnificent modern Akshardham Temple.",
    highlights: [
      "Red Fort, Jama Masjid & exciting Chandni Chowk Cycle Rickshaw Ride",
      "UNESCO World Heritage sites: Qutub Minar & Humayun's Tomb",
      "India Gate War Memorial & Rashtrapati Bhavan drive-through",
      "Lotus Temple (Bahá'í House of Worship) tranquil visit",
      "Grand Swaminarayan Akshardham Temple with Evening Water & Light Show",
      "Delhi Street Food Trail at Paranthe Wali Gali & Chaat corners"
    ],
    inclusions: [
      "1 Night 4★ Deluxe Hotel Stay in Central/South Delhi",
      "Daily Buffet Breakfast",
      "Private AC Sedan/SUV with Knowledgeable Chauffeur",
      "Old Delhi Rickshaw Ride Experience",
      "Airport / Station Pickup & Drop Included"
    ],
    days: [
      { day: 1, title: "Old Delhi Heritage, Chandni Chowk & Grand Akshardham Evening", desc: "Pickup in Delhi, visit Red Fort, Jama Masjid, cycle rickshaw ride in Chandni Chowk, Raj Ghat & evening Sahaj Anand Water Show at Akshardham Temple." },
      { day: 2, title: "Lutyens Delhi, Qutub Minar, Humayun's Tomb & Lotus Temple", desc: "Drive past India Gate & Parliament House, explore Humayun's Tomb, Qutub Minar, Lotus Temple & drop at Delhi Airport / Railway Station." }
    ]
  },
  {
    id: "pkg-delhi-ncr-monuments-weekend",
    title: "Grand Delhi Heritage, Culture & Food Walk Extravaganza",
    destination: "Old Delhi • New Delhi • Mehrauli • Akshardham • Dilli Haat",
    category: "Delhi",
    duration: "3 Days / 2 Nights",
    price_inr: 9499,
    original_price_inr: 13999,
    badge: "Complete Capital Tour",
    rating: 4.9,
    reviews_count: 85,
    image: "/images/packages/delhi_monuments.jpg",
    description: "An unhurried luxury exploration of Delhi's 8 historic cities, UNESCO monuments, artisan markets at Dilli Haat, food trails in Old Delhi, and musical water fountain shows.",
    highlights: [
      "Mehrauli Archaeological Park & UNESCO Qutub Minar Complex",
      "Humayun's Tomb & Lodhi Art District Walk",
      "Safdarjung Tomb, Agrasen ki Baoli & National War Memorial",
      "Chandni Chowk, Khari Baoli Spice Market & Paranthe Wali Gali",
      "Akshardham Musical Fountain Show & Dilli Haat Handicrafts Shopping",
      "National Museum & Rashtrapati Bhavan Heritage Tour"
    ],
    inclusions: [
      "2 Nights 4★ Deluxe Hotel Stay in Delhi NCR",
      "Daily Buffet Breakfast & 1 Traditional Mughal Lunch / Dinner",
      "Dedicated AC Chauffeur Driven Private Sedan/SUV",
      "Airport / Railway Station Transfers & Sightseeing",
      "Monument Parking, Tolls & Driver Allowances"
    ],
    days: [
      { day: 1, title: "Arrival, Lutyens Delhi, National War Memorial & Dilli Haat", desc: "Chauffeur pickup, check-in, visit India Gate, National War Memorial, Safdarjung Tomb & evening handicrafts shopping at Dilli Haat." },
      { day: 2, title: "Old Delhi Mughal Trail, Spice Market & Akshardham Light Show", desc: "Explore Red Fort, Jama Masjid, cycle rickshaw ride, Khari Baoli spice walk, Raj Ghat & evening boat ride & light show at Akshardham Temple." },
      { day: 3, title: "UNESCO Monuments: Humayun's Tomb, Qutub Minar & Departure Drop", desc: "Visit Humayun's Tomb, Lodhi Gardens, Agrasen ki Baoli stepwell, Qutub Minar & on-time drop at Delhi Airport / Railway Station." }
    ]
  },

  // --- B. INDIVIDUAL AGRA PACKAGES ---
  {
    id: "pkg-agra-taj-same-day-express",
    title: "Same Day Agra Taj Mahal & UNESCO Fort Express Tour",
    destination: "Delhi NCR • Yamuna Expressway • Agra Taj Mahal • Agra Fort",
    category: "Agra",
    duration: "1 Day (Same Day Express)",
    price_inr: 4499,
    original_price_inr: 6500,
    badge: "Same Day Taj Express",
    rating: 4.9,
    reviews_count: 220,
    image: "/images/packages/taj_mahal_sunrise.jpg",
    description: "The most convenient same-day Taj Mahal tour from Delhi NCR via high-speed Yamuna Expressway. Experience the Taj Mahal, UNESCO Agra Fort, and authentic marble inlay craft in a single day.",
    highlights: [
      "Taj Mahal guided tour with approved historian guide & skip-the-line assistance",
      "UNESCO Agra Fort (Diwan-i-Aam, Jahangiri Mahal, Musamman Burj)",
      "Mehtab Bagh sunset view of Taj Mahal across River Yamuna",
      "Traditional Agra Petha tasting & live Pietra Dura marble inlay workshop",
      "Smooth 3-hour journey via Yamuna Expressway in private AC Cab"
    ],
    inclusions: [
      "Dedicated Private AC Sedan / SUV with Chauffeur from Delhi NCR",
      "Doorstep Pickup & Drop (Hotel / Home / Delhi Airport / Station)",
      "Govt Approved English/Hindi Tour Guide in Agra",
      "All Yamuna Expressway Tolls, Border Permits, Parking & Fuel"
    ],
    days: [
      { day: 1, title: "Same Day Express: Delhi to Taj Mahal, Agra Fort & Return", desc: "6:00 AM pickup from Delhi NCR, express drive via Yamuna Expressway to Agra, visit Taj Mahal with guide, buffet lunch break, explore Agra Fort & Mehtab Bagh, return express drive with drop at Delhi by 8:30 PM." }
    ]
  },
  {
    id: "pkg-agra-fatehpur-sikri-heritage",
    title: "Agra Mughal Marvels & Taj Mahal Heritage Tour",
    destination: "Agra • Fatehpur Sikri • Mehtab Bagh • Sikandra",
    category: "Agra",
    duration: "2 Days / 1 Night",
    price_inr: 6999,
    original_price_inr: 10500,
    badge: "Agra Overnight Special",
    rating: 4.8,
    reviews_count: 135,
    image: "/images/packages/agra_red_fort.jpg",
    description: "An immersive overnight getaway to the Mughal capital featuring the breathtaking Taj Mahal at sunrise, the formidable Agra Fort, Mehtab Bagh gardens, and Emperor Akbar's Fatehpur Sikri.",
    highlights: [
      "Early morning Taj Mahal sunrise tour with expert historian guide",
      "Agra Fort: Diwan-i-Aam, Diwan-i-Khas, Jahangiri Mahal & Musamman Burj",
      "Fatehpur Sikri: Buland Darwaza, Jama Masjid & Tomb of Salim Chishti",
      "Mehtab Bagh moonlit sunset view across the sacred Yamuna River",
      "Traditional Agra Petha tasting & marble inlay art demonstration"
    ],
    inclusions: [
      "1 Night Deluxe 4★ Hotel Stay near Taj VIP Gate",
      "Buffet Breakfast & Welcome Drink",
      "Private AC Vehicle for all transfers from Delhi NCR or Agra Station",
      "Govt Approved Tour Guide at Taj Mahal & Agra Fort",
      "All Parking, Highway Tolls & Driver Allowances"
    ],
    days: [
      { day: 1, title: "Arrival in Agra, Agra Fort, Mehtab Bagh Sunset & Artisan Tour", desc: "Pickup from Delhi NCR or Agra Station, check-in, explore UNESCO Agra Fort, sunset view of Taj Mahal from Mehtab Bagh & visit marble craftsmanship centers." },
      { day: 2, title: "Sunrise Taj Mahal, Fatehpur Sikri Buland Darwaza & Departure", desc: "Witness majestic sunrise at Taj Mahal with expert guide, breakfast, excursion to Fatehpur Sikri royal complex & return drop at Delhi/Agra." }
    ]
  },
  {
    id: "pkg-agra-taj-sunrise-sunset",
    title: "Agra Taj Mahal Sunrise, Fatehpur Sikri & Royal Heritage Retreat",
    destination: "Agra • Fatehpur Sikri • Sikandra • Itmad-ud-Daulah (Baby Taj)",
    category: "Agra",
    duration: "3 Days / 2 Nights",
    price_inr: 10499,
    original_price_inr: 15500,
    badge: "Royal Agra Retreat",
    rating: 4.9,
    reviews_count: 78,
    image: "/images/packages/buland_darwaza.jpg",
    description: "A luxury in-depth exploration of Mughal architectural jewels: Taj Mahal during both sunrise & sunset, Baby Taj (Tomb of I'timād-ud-Daulah), Akbar's Tomb at Sikandra, and Fatehpur Sikri.",
    highlights: [
      "Taj Mahal Sunrise VIP Guided Excursion",
      "Sunset photography at Mehtab Bagh Gardens & Yamuna Viewpoint",
      "Tomb of I'timād-ud-Daulah (Baby Taj) & Sikandra Tomb",
      "Fatehpur Sikri UNESCO Palace Complex & Buland Darwaza",
      "Agra Fort Mughal Palaces & Sheesh Mahal",
      "Chaar Bagh Mughal Garden Walks & Heritage High Tea"
    ],
    inclusions: [
      "2 Nights 4★ / 5★ Luxury Hotel Stay in Agra",
      "Daily Buffet Breakfast & 1 Candlelight Dinner",
      "Private AC Chauffeur Driven Vehicle for 3 Days",
      "Professional Guide for Taj Mahal, Agra Fort & Fatehpur Sikri",
      "Delhi / NCR / Agra Station Transfers Included"
    ],
    days: [
      { day: 1, title: "Pickup, Agra Fort, Baby Taj & Sunset at Mehtab Bagh", desc: "Pickup, check-in, visit Tomb of I'timād-ud-Daulah (Baby Taj), UNESCO Agra Fort, and sunset over Taj Mahal from Mehtab Bagh." },
      { day: 2, title: "Sunrise Taj Mahal, Artisan Tour & Akbar's Tomb at Sikandra", desc: "Magical sunrise at Taj Mahal with historian guide, breakfast, visit marble inlay workshops, sadar bazaar & Akbar's Tomb at Sikandra." },
      { day: 3, title: "Fatehpur Sikri Grand Tour & Departure Drop", desc: "Excursion to Emperor Akbar's fortified city Fatehpur Sikri & Buland Darwaza, followed by comfortable highway drop to Delhi / Agra." }
    ]
  },

  // --- C. INDIVIDUAL JAIPUR PACKAGES ---
  {
    id: "pkg-jaipur-same-day-heritage",
    title: "Same Day Royal Jaipur Pink City Express Tour",
    destination: "Delhi NCR • Jaipur • Amer Fort • Hawa Mahal • Jal Mahal",
    category: "Jaipur",
    duration: "1 Day (Same Day Express)",
    price_inr: 4999,
    original_price_inr: 7500,
    badge: "Same Day Jaipur Express",
    rating: 4.8,
    reviews_count: 140,
    image: "/images/packages/hawa_mahal.jpg",
    description: "Full day royal excursion to the Pink City of Jaipur from Delhi NCR or Jaipur. Experience grand Amer Fort, Jal Mahal, Hawa Mahal, City Palace, and vibrant Johari Bazaar in a single action-packed day.",
    highlights: [
      "Amer Fort Jeep ascent & Sheesh Mahal (Mirror Palace)",
      "Photo-stop at Jal Mahal (Water Palace) in Man Sagar Lake",
      "Iconic Hawa Mahal (Palace of Winds) facade photo opportunity",
      "City Palace Royal Museum & Jantar Mantar Observatory",
      "Shopping at Johari Bazaar for blue pottery, textiles & jewelry",
      "Smooth travel via Delhi-Mumbai Expressway"
    ],
    inclusions: [
      "Dedicated Sanitized AC Sedan / SUV with Chauffeur",
      "Doorstep Pickup & Drop (Delhi NCR or Jaipur)",
      "Local Tour Guide Assistance at Amer Fort & City Palace",
      "All Expressway Tolls, Taxes, Parking & Fuel"
    ],
    days: [
      { day: 1, title: "Express Jaipur Pink City Sightseeing & Return", desc: "Early morning pickup, express drive to Jaipur, Amer Fort tour, Jal Mahal photo-stop, City Palace, Hawa Mahal, shopping in Pink City bazaars & return express drive with evening drop-off." }
    ]
  },
  {
    id: "pkg-jaipur-heritage-haveli-retreat",
    title: "Jaipur Pink City Heritage Havelis, Amer Fort & Chokhi Dhani Tour",
    category: "Jaipur",
    destination: "Jaipur • Amer • Nahargarh • Chokhi Dhani",
    duration: "2 Days / 1 Night",
    price_inr: 6999,
    original_price_inr: 10500,
    badge: "Jaipur Weekend Special",
    rating: 4.9,
    reviews_count: 185,
    image: "/images/packages/amber_fort_jaipur.jpg",
    description: "The ideal weekend royal getaway to Jaipur featuring heritage haveli stays, Amber Fort Jeep ascent, sunset over Jaipur from Nahargarh Fort, and cultural dinner extravaganza at Chokhi Dhani.",
    highlights: [
      "Amer Fort Jeep ascent & Sheesh Mahal mirror palace",
      "Panoramic sunset over the entire Pink City from Nahargarh Fort",
      "Chokhi Dhani Cultural Village: Folk dance, camel ride & royal thali",
      "City Palace, Jantar Mantar & Hawa Mahal sightseeing",
      "Jal Mahal water palace photo-stop & Bapu Bazaar shopping"
    ],
    inclusions: [
      "1 Night Deluxe Heritage Haveli / 4★ Hotel Stay in Jaipur",
      "Buffet Breakfast & Welcome Drink",
      "Private AC Cab for all Transfers & Sightseeing",
      "Chokhi Dhani Traditional Village Dinner Ticket",
      "All Tolls, Parking & Driver Night Allowances"
    ],
    days: [
      { day: 1, title: "Jaipur Arrival, City Palace, Nahargarh Sunset & Chokhi Dhani", desc: "Pickup in Jaipur or Delhi, check-in, visit City Palace, Jantar Mantar, sunset at Nahargarh Fort & royal cultural dinner at Chokhi Dhani." },
      { day: 2, title: "Amber Fort, Jal Mahal, Hawa Mahal & Departure Drop", desc: "Jeep ascent to Amber Fort, Sheesh Mahal, Jal Mahal photo-stop, Hawa Mahal, Bapu Bazaar handicraft shopping & return drop." }
    ]
  },
  {
    id: "pkg-jaipur-pink-city-royal",
    title: "Jaipur Royal Pink City & Forts Experience",
    destination: "Jaipur • Amer • Nahargarh • Jaigarh • Chokhi Dhani",
    category: "Jaipur",
    duration: "3 Days / 2 Nights",
    price_inr: 9999,
    original_price_inr: 14500,
    badge: "Jaipur Grand Special",
    rating: 4.9,
    reviews_count: 210,
    image: "/images/packages/jaipur_pink_city.jpg",
    description: "Experience the splendor of the Maharaja era with grand hill fortresses, pink sandstone palaces, observatory wonders, bustling jewel bazars, and authentic cultural village dining.",
    highlights: [
      "Amber Fort Jeep ascent & Sheesh Mahal mirror palace tour",
      "Iconic Hawa Mahal (Palace of Winds) & Jal Mahal photo-stop",
      "City Palace Museum & Jantar Mantar UNESCO Astronomical Observatory",
      "Panoramic Sunset view over Jaipur from Nahargarh Fort",
      "Traditional Rajasthani Folk Dance, Camel Ride & Feast at Chokhi Dhani",
      "Jaigarh Fort (World's largest cannon Jaivana) & Albert Hall Museum"
    ],
    inclusions: [
      "2 Nights Deluxe Heritage Haveli / 4★ Hotel Stay in Jaipur",
      "Daily Buffet Breakfast & Authentic Welcome Drink",
      "Private Sanitized AC Sedan/SUV for all transfers & sightseeing",
      "Chokhi Dhani Cultural Entry & Traditional Dinner Ticket",
      "Local Guide for Amber Fort & City Palace"
    ],
    days: [
      { day: 1, title: "Jaipur Arrival, City Palace, Jantar Mantar & Bazaars", desc: "Pickup in Jaipur/Delhi, hotel check-in, explore City Palace royal residence, Jantar Mantar & evening stroll through colorful Pink City bazaars." },
      { day: 2, title: "Amber Fort, Jal Mahal, Nahargarh Sunset & Chokhi Dhani", desc: "Visit magnificent Amber Fort, Jal Mahal in Man Sagar Lake, sunset over the city at Nahargarh Fort & royal dinner at Chokhi Dhani." },
      { day: 3, title: "Hawa Mahal, Albert Hall Museum, Jaigarh Fort & Drop", desc: "Photo-stop at Hawa Mahal, explore Albert Hall Museum, Jaigarh Fort (world's largest cannon Jaivana) & airport/station drop." }
    ]
  },

  // --- D. INDIVIDUAL MATHURA & VRINDAVAN PACKAGES ---
  {
    id: "pkg-mathura-vrindavan-same-day",
    title: "Same Day Sacred Mathura & Vrindavan Braj Darshan Express",
    destination: "Delhi NCR • Mathura • Vrindavan • Prem Mandir",
    category: "Mathura & Vrindavan",
    duration: "1 Day (Same Day Darshan)",
    price_inr: 3999,
    original_price_inr: 5800,
    badge: "Same Day Braj Express",
    rating: 4.9,
    reviews_count: 240,
    image: "/images/packages/shri_krishna_janmasthan.jpg",
    description: "Divine same-day pilgrimage from Delhi NCR via Yamuna Expressway to Lord Krishna's sacred birthplace Mathura and beloved Vrindavan with Prem Mandir musical light show.",
    highlights: [
      "Shri Krishna Janmasthan Temple Complex & Garbha Griha in Mathura",
      "Dwarkadhish Temple & Vishram Ghat Yamuna Darshan",
      "Banke Bihari Ji Temple & Nidhivan sacred tulsi groves in Vrindavan",
      "ISKCON Sri Krishna Balaram Temple",
      "Grand Prem Mandir Musical Fountain & Illuminated Light Show in the evening",
      "Famous Mathura Peda & Vrindavan Lassi food experience"
    ],
    inclusions: [
      "Dedicated Private AC Sedan / SUV with Chauffeur from Delhi NCR / Mathura",
      "Doorstep Pickup & Drop (Hotel / Home / Delhi Airport / Station)",
      "Darshan Timing & Queue Management Assistance",
      "All Yamuna Expressway Tolls, Parking & Driver Allowances"
    ],
    days: [
      { day: 1, title: "Same Day Braj Darshan: Mathura, Vrindavan & Prem Mandir", desc: "6:30 AM pickup from Delhi NCR, drive to Mathura, visit Shri Krishna Janmabhoomi & Dwarkadhish Temple, lunch break, proceed to Vrindavan for Banke Bihari Ji darshan, ISKCON temple, mystical Nidhivan, evening dazzling Prem Mandir light show & return drive with drop at Delhi by 9:30 PM." }
    ]
  },
  {
    id: "pkg-mathura-vrindavan-gokul-barsana",
    title: "Divine Mathura, Vrindavan, Gokul & Barsana 2-Day Yatra",
    destination: "Mathura • Vrindavan • Gokul • Barsana • Prem Mandir",
    category: "Mathura & Vrindavan",
    duration: "2 Days / 1 Night",
    price_inr: 5999,
    original_price_inr: 8800,
    badge: "Braj Weekend Special",
    rating: 4.9,
    reviews_count: 195,
    image: "/images/packages/banke_bihari_vrindavan.jpg",
    description: "A heartfelt 2-day spiritual journey traversing the major holy shrines of Braj Bhoomi including Mathura Janmabhoomi, Vrindavan Banke Bihari, Gokul Raman Reti, and Barsana Radha Rani Temple.",
    highlights: [
      "Shri Krishna Janmasthan & Dwarkadhish Temple in Mathura",
      "Banke Bihari Ji, ISKCON Temple & Nidhivan in Vrindavan",
      "Prem Mandir Spectacular Evening Light & Water Fountain Show",
      "Gokul: Raman Reti, Chaurasi Khamba & Krishna Bal Leela Sthan",
      "Barsana: Shri Radha Rani Mandir on Bhanugarh Hill",
      "Evening Yamuna Maha Aarti at Vishram Ghat"
    ],
    inclusions: [
      "1 Night Deluxe Hotel / Ashram Resort Stay in Vrindavan/Mathura",
      "Pure Satvik Vegetarian Buffet Breakfast & Dinner",
      "Private Sanitized AC Cab for all Temple Sightseeing",
      "VIP Darshan Guidance & Chauffeur Support",
      "All Tolls, Parking & Interstate Permits"
    ],
    days: [
      { day: 1, title: "Mathura Janmabhoomi, Gokul Raman Reti & Prem Mandir Evening", desc: "Pickup in Delhi NCR/Mathura, visit Shri Krishna Janmasthan, Gokul Raman Reti, check-in at Vrindavan hotel, evening Prem Mandir illuminated light show & Yamuna Aarti." },
      { day: 2, title: "Banke Bihari Ji, ISKCON, Nidhivan, Barsana & Return Drop", desc: "Morning darshan at Banke Bihari Ji, ISKCON temple, Nidhivan grove, drive to Barsana Shri Radha Rani Temple, shopping for idols/kanha poshak & return drop." }
    ]
  },
  {
    id: "pkg-mathura-vrindavan-dham",
    title: "Sacred Mathura & Vrindavan Dham Yatra (Braj Bhoomi Darshan)",
    destination: "Mathura • Vrindavan • Gokul • Barsana • Govardhan",
    category: "Mathura & Vrindavan",
    duration: "3 Days / 2 Nights",
    price_inr: 8499,
    original_price_inr: 12000,
    badge: "Complete Braj Dham",
    rating: 4.9,
    reviews_count: 310,
    image: "/images/packages/prem_mandir_vrindavan.jpg",
    description: "Immerse in the divine leelas of Lord Shri Krishna and Radha Rani across the sacred realm of Braj Bhoomi covering Mathura Janmabhoomi, Banke Bihari Ji, illuminated Prem Mandir, Govardhan Parikrama, and Barsana.",
    highlights: [
      "Shri Krishna Janmasthan & Dwarkadhish Temple in Mathura",
      "Banke Bihari Ji VIP Darshan & Nidhivan sacred grove in Vrindavan",
      "World-famous Prem Mandir Musical Light & Fountain Show",
      "Govardhan Hill Parikrama, Mansi Ganga & Radha Kund",
      "Barsana Shri Radha Rani Temple & Gokul Raman Reti Ashram",
      "Yamuna River Evening Maha Aarti at Vishram Ghat Mathura"
    ],
    inclusions: [
      "2 Nights Deluxe Hotel / Ashram Resort Stay in Vrindavan/Mathura",
      "Daily Pure Satvik Vegetarian Breakfast & Dinner",
      "Private Sanitized AC Cab for all Temple Sightseeing & Transfers",
      "Special Puja / Darshan Coordination Support & Chauffeur",
      "Pickup & Drop from Delhi NCR / Mathura Railway Station"
    ],
    days: [
      { day: 1, title: "Delhi/Mathura Pickup, Krishna Janmabhoomi & Yamuna Aarti", desc: "Chauffeur pickup, check-in, visit Shri Krishna Janmasthan Temple complex, Dwarkadhish Temple & witness evening Yamuna Maha Aarti at Vishram Ghat." },
      { day: 2, title: "Vrindavan Temples: Banke Bihari, ISKCON, Nidhivan & Prem Mandir", desc: "Morning darshan at Banke Bihari Ji, ISKCON Krishna Balaram Temple, mystical Nidhivan & evening dazzling light show at Prem Mandir." },
      { day: 3, title: "Gokul Raman Reti, Govardhan Parikrama, Barsana & Return Drop", desc: "Visit Raman Reti Gokul, Govardhan Mansi Ganga, Barsana Radha Rani Mandir & on-time return drop at Delhi NCR or Mathura Station." }
    ]
  },

  // --- E. GOLDEN TRIANGLE COMBO CIRCUITS ---
  {
    id: "pkg-golden-triangle-delhi-agra",
    title: "Golden Triangle Express: Delhi & Agra Taj Tour",
    destination: "New Delhi • Old Delhi • Agra • Fatehpur Sikri",
    category: "Golden Triangle",
    duration: "3 Days / 2 Nights",
    price_inr: 9999,
    original_price_inr: 14500,
    badge: "Taj Heritage Express",
    rating: 4.9,
    reviews_count: 176,
    image: "/images/packages/taj_mahal_sunrise.jpg",
    description: "The classic North India cultural gateway covering the iconic monuments of Delhi and the eternal wonder Taj Mahal in Agra via the high-speed Yamuna Expressway with dedicated chauffeur and expert guide.",
    highlights: [
      "Sunrise view of the iconic Taj Mahal with skip-the-line entry",
      "UNESCO World Heritage Agra Fort & Diwan-i-Aam / Diwan-i-Khas",
      "Fatehpur Sikri royal complex & magnificent Buland Darwaza",
      "Delhi sightseeing: Qutub Minar, India Gate, Lotus Temple & Red Fort",
      "Smooth transfers via Yamuna Expressway in private AC Sedan/SUV",
      "Mehtab Bagh sunset viewpoint of the Taj Mahal across the Yamuna"
    ],
    inclusions: [
      "2 Nights Deluxe 4★ Hotel Stays in Delhi & Agra",
      "Daily Buffet Breakfast & Welcome Drinks",
      "Dedicated Sanitized AC Private Cab with Chauffeur",
      "Monument Entry Assistance & Approved English/Hindi Tour Guide",
      "All Tolls, Interstate Taxes, Driver Allowance & Parking"
    ],
    days: [
      { day: 1, title: "Arrival in Delhi & Capital City Heritage Sightseeing", desc: "Pickup from Delhi Airport/Station, visit Qutub Minar, Humayun's Tomb, India Gate, Rashtrapati Bhavan drive, Lotus Temple, check-in & relax." },
      { day: 2, title: "Old Delhi Tour & Express Drive to Agra (Sunset at Mehtab Bagh)", desc: "Visit Red Fort photo-stop, Jama Masjid, drive via Yamuna Expressway to Agra, check-in, sunset at Mehtab Bagh & visit Agra marble artisans." },
      { day: 3, title: "Sunrise Taj Mahal, Agra Fort, Fatehpur Sikri & Return Drop", desc: "Early morning Taj Mahal sunrise darshan, breakfast, explore Agra Fort, visit Fatehpur Sikri Buland Darwaza & drop back at Delhi Airport/Station." }
    ]
  },
  {
    id: "pkg-golden-triangle-classic",
    title: "Golden Triangle Classic: Delhi, Agra & Jaipur Grand Tour",
    destination: "Delhi • Agra • Fatehpur Sikri • Jaipur Pink City",
    category: "Golden Triangle",
    duration: "6 Days / 5 Nights",
    price_inr: 18999,
    original_price_inr: 26000,
    badge: "India's #1 Circuit",
    rating: 5.0,
    reviews_count: 245,
    image: "/images/packages/taj_mahal_sunrise.jpg",
    description: "India's most celebrated heritage journey connecting the political capital Delhi, the Mughal marvel Agra (Taj Mahal), and the royal Rajputana Pink City Jaipur with palace stays and guided excursions.",
    highlights: [
      "Comprehensive Delhi Sightseeing: Qutub Minar, India Gate, Humayun's Tomb",
      "Breathtaking Sunrise at Taj Mahal & Agra Fort UNESCO Site",
      "En-route exploration of Emperor Akbar's abandoned city Fatehpur Sikri",
      "Jaipur Amber Fort Jeep ascent, City Palace, Jantar Mantar & Hawa Mahal",
      "Sunset over Pink City from Nahargarh Fort & Jal Mahal photo-stop",
      "Traditional Rajasthani cultural evening dinner at Chokhi Dhani"
    ],
    inclusions: [
      "5 Nights Deluxe 4★ Hotel / Heritage Haveli Stays (2N Delhi, 1N Agra, 2N Jaipur)",
      "Daily Buffet Breakfast & Traditional Welcome",
      "Private Sanitized AC Chauffeur Driven Vehicle (Sedan/SUV/Innova)",
      "Govt Approved City Guides at Delhi, Agra & Jaipur",
      "All Highway Tolls, Border Permits, Parking & Driver Night Charges"
    ],
    days: [
      { day: 1, title: "Delhi Arrival & Capital Heritage Tour", desc: "Pickup, explore Qutub Minar, Lotus Temple, India Gate & Rashtrapati Bhavan drive. Overnight in Delhi." },
      { day: 2, title: "Old Delhi Heritage to Mughal City Agra", desc: "Visit Red Fort, Jama Masjid, drive via Yamuna Expressway to Agra. Evening Mehtab Bagh sunset view of Taj Mahal." },
      { day: 3, title: "Sunrise Taj Mahal, Agra Fort & Fatehpur Sikri to Jaipur", desc: "Breathtaking Taj Mahal sunrise tour, Agra Fort exploration, visit Fatehpur Sikri Buland Darwaza & drive to Jaipur Pink City." },
      { day: 4, title: "Royal Jaipur: Amber Fort, Jal Mahal & Pink City Bazaars", desc: "Jeep ascent to Amber Fort, Sheesh Mahal, Jal Mahal photo-stop, Hawa Mahal & colorful Johari/Bapu bazaar shopping." },
      { day: 5, title: "City Palace, Jantar Mantar & Nahargarh Sunset", desc: "Explore City Palace royal museum, Jantar Mantar observatory, sunset at Nahargarh Fort & cultural dinner at Chokhi Dhani." },
      { day: 6, title: "Jaipur to Delhi Departure Drop", desc: "Morning breakfast, visit Albert Hall Museum & scenic highway drive back to Delhi Airport / Railway Station." }
    ]
  },
  {
    id: "pkg-delhi-mathura-agra-same-day",
    title: "Delhi - Mathura - Vrindavan - Agra Heritage & Pilgrimage Circuit",
    destination: "Delhi • Mathura • Vrindavan • Agra Taj Mahal",
    category: "Golden Triangle",
    duration: "4 Days / 3 Nights",
    price_inr: 12999,
    original_price_inr: 18500,
    badge: "Pilgrimage + Heritage",
    rating: 4.9,
    reviews_count: 195,
    image: "/images/packages/taj_mahal_sunrise.jpg",
    description: "The ultimate blend of spirituality and world heritage combining Delhi capital monuments, the divine Krishna temples of Mathura-Vrindavan, and the majestic Taj Mahal in Agra.",
    highlights: [
      "Capital Sightseeing: Qutub Minar, India Gate & Akshardham Temple",
      "Lord Krishna Janmabhoomi & Banke Bihari Ji Darshan in Braj",
      "Spectacular Evening Prem Mandir Light & Water Show",
      "Sunrise at Taj Mahal & Guided tour of UNESCO Agra Fort",
      "Mehtab Bagh sunset & Fatehpur Sikri Buland Darwaza visit"
    ],
    inclusions: [
      "3 Nights 4★ Deluxe Hotel Stays (1N Delhi, 1N Vrindavan, 1N Agra)",
      "Daily Buffet Breakfast & Satvik Dinners",
      "Dedicated AC Chauffeur Driven Vehicle for entire circuit",
      "Tolls, Interstate Permits, Parking & Driver Allowances"
    ],
    days: [
      { day: 1, title: "Delhi Sightseeing & Grand Akshardham Temple", desc: "Pickup in Delhi, visit Qutub Minar, India Gate, Lotus Temple & magnificent Swaminarayan Akshardham Temple." },
      { day: 2, title: "Delhi to Mathura & Vrindavan Divine Temple Tour", desc: "Drive to Mathura, visit Shri Krishna Janmasthan, Banke Bihari Temple in Vrindavan, and evening Prem Mandir musical fountain show." },
      { day: 3, title: "Vrindavan to Agra: Taj Mahal Sunset & Agra Fort", desc: "Drive via Yamuna Expressway to Agra, visit UNESCO Agra Fort, Itmad-ud-Daulah, and evening Mehtab Bagh sunset view of Taj Mahal." },
      { day: 4, title: "Sunrise Taj Mahal, Fatehpur Sikri & Departure Drop to Delhi", desc: "Early morning Taj Mahal sunrise visit, explore Emperor Akbar's Fatehpur Sikri & smooth express highway drop back to Delhi." }
    ]
  }
];

export const UTTARAKHAND_DESTINATIONS = [
  {
    name: "Sacred Char Dham Yatra",
    badge: "Most Sacred",
    tagline: "Yamunotri • Gangotri • Kedarnath • Badrinath",
    image: "/images/packages/kedarnath_temple.jpg",
    altitude: "10,000 - 12,000 ft",
    ideal_duration: "10-11 Days",
    price_inr: 34999,
    description: "The supreme Hindu pilgrimage nestled in the Garhwal Himalayas for spiritual liberation and divine grace with VIP Darshan."
  },
  {
    name: "Do Dham (Kedarnath & Badrinath)",
    badge: "Spiritual Express",
    tagline: "Lord Shiva Jyotirlinga & Lord Badrinath Ji",
    image: "/images/packages/badrinath_temple.jpg",
    altitude: "11,750 ft",
    ideal_duration: "5-6 Days",
    price_inr: 22500,
    description: "The two most revered shrines of Uttarakhand with helicopter & private mountain vehicle express packages."
  },
  {
    name: "Nainital Emerald Lake District",
    badge: "Scenic Lakes",
    tagline: "Emerald Naini Lake, Bhimtal & Sattal",
    image: "/images/packages/nainital_lake.jpg",
    altitude: "6,837 ft",
    ideal_duration: "3-4 Days",
    price_inr: 12500,
    description: "Romantic hill station famed for emerald boating lakes, Naina Devi Temple, cable car snow view, and pine-clad hills."
  },
  {
    name: "Mussoorie Queen of Hills & Kanatal",
    badge: "Heritage Hill Station",
    tagline: "Kempty Falls, Gun Hill & George Everest",
    image: "/images/packages/kempty_falls_mussoorie.jpg",
    altitude: "6,580 ft",
    ideal_duration: "3-4 Days",
    price_inr: 12500,
    description: "Colonial charm, panoramic Doon valley views, cascading waterfalls, Dhanaulti eco-parks, and Swiss tent glamping."
  },
  {
    name: "Jim Corbett Tiger Reserve",
    badge: "Wildlife Safari",
    tagline: "Royal Bengal Tiger Reserve & Jungle Lodges",
    image: "/images/packages/corbett_tiger.jpg",
    altitude: "1,300 ft",
    ideal_duration: "2-3 Days",
    price_inr: 9999,
    description: "India's oldest national park with 4x4 open gypsy jungle safaris, wild elephant herds, and riverside luxury lodges."
  },
  {
    name: "Auli Ski Slopes & Chopta Tungnath",
    badge: "Snow & Alpine Trek",
    tagline: "Mini Switzerland & Highest Shiva Temple",
    image: "/images/packages/auli_snow_skiing.jpg",
    altitude: "9,200 - 12,100 ft",
    ideal_duration: "4-5 Days",
    price_inr: 15999,
    description: "Skiing slopes of Auli, lush meadows of Chopta, Chandrashila summit, and the world's highest Shiva shrine at Tungnath."
  },
  {
    name: "Rishikesh Rafting & Glamping",
    badge: "Yoga & Holy Ganga",
    tagline: "16KM River Rafting & Evening Ganga Aarti",
    image: "/images/packages/rishikesh_ganga_aarti.jpg",
    altitude: "1,200 ft",
    ideal_duration: "2-3 Days",
    price_inr: 7499,
    description: "Ganga Maha Aarti at Triveni Ghat, white-water river rafting, luxury riverside dome camping, and Beatles Ashram."
  },
  {
    name: "Kumaon Highlands: Kausani & Ranikhet",
    badge: "Tranquil Himalayas",
    tagline: "300KM Himalayan Sunrise & Pine Forests",
    image: "/images/packages/kempty_falls_mussoorie.jpg",
    altitude: "6,200 ft",
    ideal_duration: "4-5 Days",
    price_inr: 14500,
    description: "Panoramic views of Trishul & Nanda Devi snow peaks, Kausani tea estates, Ranikhet golf course, and Mukteshwar orchards."
  }
];

export const YATRA_TIMELINE = [
  {
    step: "Day 1-2",
    dham: "Yamunotri Dham",
    river: "Yamuna River",
    elevation: "10,797 ft",
    ritual: "Holy bath at Surya Kund thermal springs, cooking prasad & darshan at Yamunotri Temple.",
    icon: "fa-solid fa-water"
  },
  {
    step: "Day 3-4",
    dham: "Gangotri Dham",
    river: "Bhagirathi River",
    elevation: "10,200 ft",
    ritual: "Holy dip at sacred ghats, puja at Gangotri shrine & scenic drive through Harsil Apple Valley.",
    icon: "fa-solid fa-mountain-sun"
  },
  {
    step: "Day 5-7",
    dham: "Kedarnath Dham",
    river: "Mandakini River",
    elevation: "11,750 ft",
    ritual: "Ascent via Helicopter or Trek, Lord Shiva Jyotirlinga Darshan, and divine Evening Swarna Maha Aarti.",
    icon: "fa-solid fa-om"
  },
  {
    step: "Day 8-9",
    dham: "Badrinath Dham",
    river: "Alaknanda River",
    elevation: "10,279 ft",
    ritual: "Tapt Kund holy sulfur bath, Badrinath Ji Mahabhishek darshan & visit to Mana (First Indian Village).",
    icon: "fa-solid fa-sun"
  },
  {
    step: "Day 10-11",
    dham: "Rishikesh / Haridwar",
    river: "Holy Ganga",
    elevation: "1,100 ft",
    ritual: "Devprayag Sangam view, evening Ganga Maha Aarti at Triveni Ghat & departure with divine blessings.",
    icon: "fa-solid fa-hands-praying"
  }
];

export const TESTIMONIALS = [
  {
    name: "Pandit Rajeshwar Shastri",
    location: "Varanasi, UP",
    tour: "Char Dham Yatra Deluxe (Family of 6)",
    rating: 5,
    date: "May 2025",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    review: "Mankotia Holidays made our Char Dham Yatra truly divine and effortless. My elderly parents were provided ground floor rooms, wheelchair assistance, and pure Satvik bhojan at every halt. The driver was extremely skilled on mountain roads. Har Har Mahadev!"
  },
  {
    name: "Dr. Ananya & Rohit Verma",
    location: "Delhi NCR",
    tour: "Kedarnath VIP Helicopter & Do Dham",
    rating: 5,
    date: "June 2025",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    review: "Helicopter boarding at Phata was completely hassle-free thanks to the Mankotia team coordinators. We did priority darshan at Kedarnath and reached Badrinath the next day without any delay. Highly recommended for busy professionals!"
  },
  {
    name: "Vikramjit Singh",
    location: "Chandigarh",
    tour: "Uttarakhand Jewels & Corbett Safari",
    rating: 5,
    date: "Oct 2025",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    review: "We spotted a Royal Bengal tiger in Jim Corbett on the morning safari organized by Mankotia Holidays! The resorts in Nainital and Mussoorie were 4-star luxury with great valley views. 10/10 service and transparent pricing."
  },
  {
    name: "Smt. Meenakshi Sundaram",
    location: "Chennai, Tamil Nadu",
    tour: "Divine Do Dham: Kedarnath & Badrinath",
    rating: 5,
    date: "Sep 2025",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    review: "As a senior citizen traveling from South India, language and food were my worries. Mankotia Holidays arranged pure South Indian Satvik food and our tour coordinator supported us through every darshan queue. Unforgettable pilgrimage!"
  },
  {
    name: "Sneha & Kunal Kapoor",
    location: "Mumbai, Maharashtra",
    tour: "Royal Kashmir Luxury Honeymoon",
    rating: 5,
    date: "Dec 2025",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    review: "The Dal Lake luxury cedarwood houseboat and candle-light dinner exceeded our expectations. Gondola phase 2 snow in Gulmarg was breathtaking. The driver was polite and knew all the best scenic photo spots!"
  },
  {
    name: "Col. Arvind Rathore",
    location: "Jaipur, Rajasthan",
    tour: "Spiti Valley & Manali 4x4 Expedition",
    rating: 5,
    date: "July 2025",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    review: "Top-notch 4x4 Innova and expert mountain pilot for our Spiti circuit. Camping at Chandratal under the stars was pure magic. Clean homestays, emergency oxygen kit, and 100% punctuality. Mankotia Holidays is unmatched in the Himalayas!"
  },
  {
    name: "Adv. Ramesh & Priya Kulkarni",
    location: "Pune, Maharashtra",
    tour: "Grand Royal Rajasthan Heritage Circuit",
    rating: 5,
    date: "Nov 2025",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
    review: "From palace heritage havelis in Jaipur and Udaipur to sunset camel safaris in Jaisalmer Sam dunes, every arrangement was royal. Transparent pricing with zero hidden costs. Mankotia Holidays is our permanent travel partner!"
  }
];

export const ALL_DESTINATION_CATEGORIES = [
  {
    group: "Delhi & Capital Specials",
    options: [
      "Same Day Delhi Capital Sightseeing & Heritage Express",
      "Delhi Capital City Heritage & Sightseeing Tour (2D/1N)",
      "Grand Delhi Heritage, Culture & Food Walk Extravaganza (3D/2N)"
    ]
  },
  {
    group: "Agra & Taj Mahal Specials",
    options: [
      "Same Day Agra Taj Mahal & UNESCO Fort Express Tour",
      "Agra Mughal Marvels & Taj Mahal Heritage Tour (2D/1N)",
      "Agra Taj Mahal Sunrise, Fatehpur Sikri & Royal Heritage Retreat (3D/2N)"
    ]
  },
  {
    group: "Jaipur Pink City Specials",
    options: [
      "Same Day Royal Jaipur Pink City Express Tour",
      "Jaipur Pink City Heritage Havelis, Amer Fort & Chokhi Dhani Tour (2D/1N)",
      "Jaipur Royal Pink City & Forts Experience (3D/2N)"
    ]
  },
  {
    group: "Mathura & Vrindavan Braj Dham",
    options: [
      "Same Day Sacred Mathura & Vrindavan Braj Darshan Express",
      "Divine Mathura, Vrindavan, Gokul & Barsana 2-Day Yatra (2D/1N)",
      "Sacred Mathura & Vrindavan Dham Yatra (Braj Bhoomi Darshan 3D/2N)"
    ]
  },
  {
    group: "Golden Triangle Combo Circuits",
    options: [
      "Golden Triangle Classic (Delhi • Agra • Jaipur Grand Tour 6D/5N)",
      "Golden Triangle Express (Delhi & Agra Taj Mahal Tour 3D/2N)",
      "Delhi - Mathura - Vrindavan - Agra Heritage & Pilgrimage Circuit (4D/3N)"
    ]
  },
  {
    group: "Sacred Pilgrimages & Yatras",
    options: [
      "Char Dham Yatra (Yamunotri • Gangotri • Kedarnath • Badrinath)",
      "Do Dham Yatra (Kedarnath & Badrinath Ji)",
      "Kedarnath Helicopter Express & VIP Darshan",
      "Badrinath Ji & Joshimath Yatra",
      "Gangotri & Yamunotri Yatra",
      "Hemkund Sahib & Valley of Flowers Trek"
    ]
  },
  {
    group: "Uttarakhand Holidays & Treks",
    options: [
      "Uttarakhand Complete (Nainital • Corbett • Mussoorie • Rishikesh)",
      "Nainital Lake City & Jim Corbett Safari",
      "Mussoorie Queen of Hills & Dhanaulti",
      "Auli Ski Paradise & Chopta Tungnath Trek",
      "Rishikesh & Haridwar Spiritual Retreat",
      "Kausani, Ranikhet & Almora Hill Circuit"
    ]
  },
  {
    group: "Himachal Pradesh Escapes",
    options: [
      "Manali & Solang Valley (Atal Tunnel & Sissu Snow Tour)",
      "Shimla & Kufri Royal Heritage Tour",
      "Complete Himachal (Shimla • Kullu • Manali • Chandigarh)",
      "Dharamshala & McLeodganj Peace Valley",
      "Dalhousie & Khajjiar (Mini Switzerland)",
      "Spiti Valley High-Altitude Adventure Circuit"
    ]
  },
  {
    group: "Kashmir: Heaven on Earth",
    options: [
      "Kashmir Luxury Tour (Srinagar • Gulmarg • Pahalgam)",
      "Srinagar Dal Lake Houseboat & Mughal Gardens",
      "Gulmarg Gondola & Snow Experience",
      "Pahalgam Valley & Betaab Valley Tour",
      "Sonmarg Meadow of Gold & Thajiwas Glacier"
    ]
  },
  {
    group: "Royal Rajasthan",
    options: [
      "Royal Rajasthan (Jaipur • Jodhpur • Udaipur)",
      "Jaipur Pink City & Royal Forts Experience",
      "Udaipur City of Lakes & Royal Palaces",
      "Jaisalmer Golden Fort & Thar Desert Camping"
    ]
  },
  {
    group: "Goa & Coastal Holidays",
    options: [
      "Tropical Goa Beach, Water Sports & Cruise Holiday",
      "North Goa Beaches, Nightlife & Forts",
      "South Goa Peaceful Beaches & Heritage Churches"
    ]
  },
  {
    group: "Kerala God's Own Country",
    options: [
      "Kerala Complete (Munnar • Thekkady • Alleppey)",
      "Alleppey Luxury Houseboat & Backwaters",
      "Munnar Tea Plantations & Misty Hills"
    ]
  },
  {
    group: "Custom / Group Tours",
    options: [
      "Custom Holiday / Multi-City Tour (Specify in Notes)",
      "Educational / Student Group Tour",
      "Corporate Offsite & Group Booking"
    ]
  }
];

export const QUICK_DESTINATION_PILLS = [
  { label: "Delhi Special", value: "Delhi Capital City Heritage & Sightseeing Tour" },
  { label: "Agra & Taj", value: "Agra Mughal Marvels & Taj Mahal Heritage Tour" },
  { label: "Jaipur Forts", value: "Jaipur Royal Pink City & Forts Experience" },
  { label: "Mathura Vrindavan", value: "Sacred Mathura & Vrindavan Dham Yatra (Braj Bhoomi Darshan)" },
  { label: "Golden Triangle", value: "Golden Triangle Classic (Delhi • Agra • Jaipur Grand Tour)" },
  { label: "Char Dham", value: "Char Dham Yatra (Yamunotri • Gangotri • Kedarnath • Badrinath)" },
  { label: "Do Dham", value: "Do Dham Yatra (Kedarnath & Badrinath Ji)" },
  { label: "Kedarnath Heli", value: "Kedarnath Helicopter Express & VIP Darshan" },
  { label: "Uttarakhand", value: "Uttarakhand Complete (Nainital • Corbett • Mussoorie • Rishikesh)" },
  { label: "Manali", value: "Manali & Solang Valley (Atal Tunnel & Sissu Snow Tour)" },
  { label: "Kashmir", value: "Kashmir Luxury Tour (Srinagar • Gulmarg • Pahalgam)" },
  { label: "Rajasthan", value: "Royal Rajasthan (Jaipur • Jodhpur • Udaipur)" },
  { label: "Goa", value: "Tropical Goa Beach, Water Sports & Cruise Holiday" },
  { label: "Kerala", value: "Kerala Complete (Munnar • Thekkady • Alleppey)" }
];

export const VISUAL_DESTINATIONS = [
  {
    id: "delhi-capital",
    category: "Delhi",
    tab: "Delhi",
    icon: "🏛️",
    title: "Delhi Capital Heritage",
    subtitle: "Red Fort • Qutub Minar • Akshardham • India Gate",
    days: 2,
    badge: "Capital Special"
  },
  {
    id: "agra-taj-mahal",
    category: "Agra",
    tab: "Agra",
    icon: "🕌",
    title: "Agra & Taj Mahal Tour",
    subtitle: "Taj Mahal Sunrise • Agra Fort • Mehtab Bagh",
    days: 2,
    badge: "Wonder of World"
  },
  {
    id: "jaipur-pink-city",
    category: "Jaipur",
    tab: "Jaipur",
    icon: "👑",
    title: "Jaipur Pink City & Forts",
    subtitle: "Amber Fort • Hawa Mahal • City Palace • Chokhi Dhani",
    days: 3,
    badge: "Royal Pink City"
  },
  {
    id: "mathura-vrindavan",
    category: "Mathura & Vrindavan",
    tab: "Mathura & Vrindavan",
    icon: "🦚",
    title: "Mathura & Vrindavan Dham",
    subtitle: "Krishna Janmabhoomi • Banke Bihari • Prem Mandir",
    days: 3,
    badge: "Divine Braj"
  },
  {
    id: "golden-triangle-classic",
    category: "Golden Triangle",
    tab: "Golden Triangle",
    icon: "✨",
    title: "Golden Triangle Grand Tour",
    subtitle: "Delhi • Agra Taj Mahal • Jaipur Pink City",
    days: 6,
    badge: "India's #1 Circuit"
  },
  {
    id: "chardham-deluxe",
    category: "Sacred Pilgrimages",
    tab: "Char Dham",
    icon: "🕉️",
    title: "Char Dham Yatra (Complete)",
    subtitle: "Yamunotri • Gangotri • Kedarnath • Badrinath",
    days: 11,
    badge: "Divine Best Seller"
  },
  {
    id: "dodham-kedar-badri",
    category: "Sacred Pilgrimages",
    tab: "Char Dham",
    icon: "🙏",
    title: "Do Dham Yatra (Kedarnath & Badrinath)",
    subtitle: "Kedarnath Jyotirlinga • Badrinath Ji • Mana",
    days: 6,
    badge: "Most Popular"
  },
  {
    id: "kedarnath-heli",
    category: "Sacred Pilgrimages",
    tab: "Char Dham",
    icon: "🚁",
    title: "Kedarnath Helicopter Express",
    subtitle: "Phata/Sirsi Helipad • Priority Darshan",
    days: 3,
    badge: "VIP Darshan"
  },
  {
    id: "badrinath-joshimath",
    category: "Sacred Pilgrimages",
    tab: "Char Dham",
    icon: "🛕",
    title: "Badrinath Ji & Joshimath Yatra",
    subtitle: "Tapt Kund • Badrinath Temple • Mana Village",
    days: 4,
    badge: "Spiritual"
  },
  {
    id: "uttarakhand-complete",
    category: "Uttarakhand",
    tab: "Uttarakhand",
    icon: "🏔️",
    title: "Uttarakhand Complete Tour",
    subtitle: "Nainital Lake • Jim Corbett • Mussoorie • Rishikesh",
    days: 6,
    badge: "Family Favorite"
  },
  {
    id: "auli-chopta",
    category: "Uttarakhand",
    tab: "Uttarakhand",
    icon: "⛷️",
    title: "Auli Ski & Chopta Tungnath Trek",
    subtitle: "Auli Ropeway • Tungnath Temple • Chandrashila",
    days: 5,
    badge: "Adventure & Trek"
  },
  {
    id: "nainital-corbett",
    category: "Uttarakhand",
    tab: "Uttarakhand",
    icon: "🐅",
    title: "Nainital Lake & Corbett Safari",
    subtitle: "Naini Lake Boating • Jim Corbett Tiger Safari",
    days: 4,
    badge: "Wildlife & Hills"
  },
  {
    id: "mussoorie-rishikesh",
    category: "Uttarakhand",
    tab: "Uttarakhand",
    icon: "🌊",
    title: "Mussoorie & Rishikesh Ganga Retreat",
    subtitle: "Kempty Falls • Mall Road • Ganga Aarti • Rafting",
    days: 4,
    badge: "Peace & Nature"
  },
  {
    id: "manali-solang",
    category: "Himachal",
    tab: "Himachal",
    icon: "🌲",
    title: "Manali & Solang Snow Valley",
    subtitle: "Solang Valley • Atal Tunnel • Sissu • Hadimba",
    days: 4,
    badge: "Snow & Adventure"
  },
  {
    id: "shimla-manali",
    category: "Himachal",
    tab: "Himachal",
    icon: "❄️",
    title: "Complete Himachal (Shimla & Manali)",
    subtitle: "Shimla Mall Road • Kufri • Kullu • Manali",
    days: 6,
    badge: "Honeymoon & Family"
  },
  {
    id: "dharamshala-dalhousie",
    category: "Himachal",
    tab: "Himachal",
    icon: "🧘",
    title: "Dharamshala & Dalhousie",
    subtitle: "McLeodganj • Dalai Lama Temple • Khajjiar",
    days: 5,
    badge: "Serene Mountains"
  },
  {
    id: "kashmir-luxury",
    category: "Kashmir",
    tab: "Kashmir",
    icon: "⛵",
    title: "Kashmir Paradise Luxury Tour",
    subtitle: "Dal Lake Houseboat • Gulmarg Gondola • Pahalgam",
    days: 5,
    badge: "Crown of India"
  },
  {
    id: "srinagar-gulmarg",
    category: "Kashmir",
    tab: "Kashmir",
    icon: "🏔️",
    title: "Srinagar & Gulmarg Snow Tour",
    subtitle: "Shikara Ride • Mughal Gardens • Gulmarg Snow",
    days: 4,
    badge: "Romantic Escape"
  },
  {
    id: "rajasthan-royal",
    category: "Rajasthan",
    tab: "Rajasthan",
    icon: "🏰",
    title: "Royal Rajasthan Circuit",
    subtitle: "Jaipur Pink City • Jodhpur Mehrangarh • Udaipur",
    days: 6,
    badge: "Royal Heritage"
  },
  {
    id: "udaipur-jaipur",
    category: "Rajasthan",
    tab: "Rajasthan",
    icon: "👑",
    title: "Jaipur & Udaipur Palace Tour",
    subtitle: "Amber Fort • City Palace • Lake Pichola Boat",
    days: 5,
    badge: "Palace Special"
  },
  {
    id: "goa-beach",
    category: "Goa & Kerala",
    tab: "Goa & Kerala",
    icon: "🏖️",
    title: "Tropical Goa Beach & Carnival",
    subtitle: "Calangute • Baga • Cruise Party • Water Sports",
    days: 4,
    badge: "Beach & Fun"
  },
  {
    id: "kerala-backwaters",
    category: "Goa & Kerala",
    tab: "Goa & Kerala",
    icon: "🌴",
    title: "Kerala Backwaters & Munnar Hills",
    subtitle: "Munnar Tea Gardens • Alleppey Houseboat Stay",
    days: 5,
    badge: "God's Own Country"
  },
  {
    id: "custom-tour",
    category: "Custom",
    tab: "Custom",
    icon: "✨",
    title: "Custom Tour / Multi-City Package",
    subtitle: "Personalized routing, vehicle & hotels",
    days: 5,
    badge: "Tailor Made"
  }
];
