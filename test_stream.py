import requests

def test_endpoint():
    url = "http://127.0.0.1:8000/api/generate-itinerary-stream"
    payload = {
        "destination": "Goa",
        "days": 4,
        "budget": "Standard / Deluxe",
        "travel_style": "Family & Leisure",
        "travelers": "2 Adults",
        "special_requests": "",
        "pickup_location": "Goa Airport",
        "drop_location": "Goa Airport"
    }
    
    try:
        response = requests.post(url, json=payload, stream=True)
        print("Status Code:", response.status_code)
        
        with open("stream_output.txt", "w", encoding="utf-8") as f:
            for chunk in response.iter_content(chunk_size=1024):
                if chunk:
                    f.write(chunk.decode('utf-8'))
        print("Done. Saved to stream_output.txt")
    except Exception as e:
        print("Exception:", str(e))

if __name__ == "__main__":
    test_endpoint()
