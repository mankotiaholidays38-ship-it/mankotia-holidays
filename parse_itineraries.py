import re
import json
import uuid
import os

def parse_itineraries(filepath):
    packages = []
    
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            lines = [line.strip() for line in f.readlines()]
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        return []

    current_package = {}
    state = "SEARCHING"
    
    for i, line in enumerate(lines):
        if not line:
            continue
            
        # 1. Detect Duration and Title (Title is usually the line above)
        if state == "SEARCHING" and "Nights" in line and "Days" in line and "/" in line:
            current_package = {
                "id": f"pkg-custom-{uuid.uuid4().hex[:8]}",
                "title": "",
                "destination": "",
                "category": "Custom Tour",
                "duration": line,
                "price_inr": 0, # To be quoted
                "original_price_inr": 0,
                "badge": "Custom Package",
                "image": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
                "highlights": [],
                "inclusions": []
            }
            
            # Find title looking backwards
            for j in range(i-1, -1, -1):
                if lines[j]:
                    # Clean up title
                    title = lines[j]
                    title = re.sub(r'TOUR\s+WITH\s+MANKOTIA\s+HOLIDAYS', '', title, flags=re.IGNORECASE)
                    title = title.replace('WITH MANKOTIA HOLIDAYS', '').strip(' -')
                    current_package['title'] = title
                    
                    # Extract destination from title
                    dest_parts = [p.strip() for p in title.split('-')]
                    if len(dest_parts) > 1:
                        # try to get middle parts or unique parts
                        unique_dests = list(dict.fromkeys(dest_parts))
                        current_package['destination'] = " • ".join(unique_dests)
                    else:
                        current_package['destination'] = title
                    break
            
            state = "IN_ITINERARY"
            continue
            
        # 2. Extract Highlights / Days
        if state == "IN_ITINERARY":
            if line.startswith("Day "):
                current_package["highlights"].append(line)
            elif "End of the Tour" in line:
                state = "INCLUSIONS"
            continue
            
        # 3. Extract Inclusions
        if state == "INCLUSIONS":
            if "Exclusions:" in line:
                state = "EXCLUSIONS"
                continue
            if line.startswith("👉🏻") or line.startswith("👉"):
                inc = line.replace("👉🏻", "").replace("👉", "").strip()
                if inc:
                    current_package["inclusions"].append(inc)
            continue
            
        # 4. End of Package
        if state == "EXCLUSIONS":
            if "MANKOTIA HOLIDAYS" in line:
                # Limit highlights if there are too many (AI context limit protection)
                if len(current_package["highlights"]) > 10:
                    current_package["highlights"] = current_package["highlights"][:10]
                    
                # Fix empty arrays
                if not current_package["highlights"]:
                    current_package["highlights"] = ["Custom tailored days"]
                if not current_package["inclusions"]:
                    current_package["inclusions"] = ["Standard inclusions apply"]
                    
                packages.append(current_package)
                current_package = {}
                state = "SEARCHING"
                
    # Catch last package if file ended abruptly
    if current_package and current_package.get("title"):
         packages.append(current_package)
         
    return packages

if __name__ == "__main__":
    input_file = "data/site_itineraries.txt"
    output_file = "data/custom_packages.json"
    
    if not os.path.exists("data"):
        os.makedirs("data")
        
    print(f"Parsing {input_file}...")
    packages = parse_itineraries(input_file)
    print(f"Successfully parsed {len(packages)} packages.")
    
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(packages, f, indent=4, ensure_ascii=False)
        
    print(f"Saved to {output_file}")
