import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Compass, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Share2, 
  ArrowRight, 
  Navigation, 
  ExternalLink, 
  Map, 
  Car 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ALL_DESTINATION_CATEGORIES } from '../data/packagesData';

export default function AiItineraryPlanner({ onOpenInquiry }) {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(5);
  const [budget, setBudget] = useState('Standard / Deluxe');
  const [travelStyle, setTravelStyle] = useState('Family & Leisure');
  const [travelers, setTravelers] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [sameAsPickup, setSameAsPickup] = useState(true);

  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [showDetailedSchedule, setShowDetailedSchedule] = useState(false);
  const [expandedDay, setExpandedDay] = useState(1);
  const [copied, setCopied] = useState(false);

  const quickPresets = [
    { 
      name: "Char Dham Yatra", 
      fullName: "Char Dham Yatra (Yamunotri • Gangotri • Kedarnath • Badrinath)", 
      days: 11, 
      style: "Pilgrimage & Spiritual",
      pickup: "Haridwar Railway Station / Dehradun Airport",
      drop: "Haridwar Railway Station / Dehradun Airport"
    },
    { 
      name: "Do Dham Yatra", 
      fullName: "Do Dham Yatra (Kedarnath & Badrinath Ji)", 
      days: 6, 
      style: "Pilgrimage & Spiritual",
      pickup: "Haridwar Railway Station / Dehradun Airport",
      drop: "Haridwar Railway Station / Dehradun Airport"
    },
    { 
      name: "Kedarnath Heli", 
      fullName: "Kedarnath Helicopter Express & VIP Darshan", 
      days: 3, 
      style: "VIP Pilgrimage",
      pickup: "Haridwar / Dehradun Jolly Grant Airport",
      drop: "Haridwar / Dehradun Jolly Grant Airport"
    },
    { 
      name: "Uttarakhand Tour", 
      fullName: "Uttarakhand Complete (Nainital • Corbett • Mussoorie • Rishikesh)", 
      days: 6, 
      style: "Family & Leisure",
      pickup: "Delhi IGI Airport / Kathgodam Railway Station",
      drop: "Dehradun Airport / Haridwar / Delhi"
    },
    { 
      name: "Auli & Chopta", 
      fullName: "Auli Ski Paradise & Chopta Tungnath Trek", 
      days: 5, 
      style: "Adventure & Nature",
      pickup: "Haridwar / Rishikesh / Dehradun Airport",
      drop: "Rishikesh / Haridwar / Dehradun Airport"
    },
    { 
      name: "Manali & Solang", 
      fullName: "Manali & Solang Valley (Atal Tunnel & Sissu Snow Tour)", 
      days: 4, 
      style: "Himalayan Snow",
      pickup: "Chandigarh Airport / Railway Station",
      drop: "Chandigarh / Delhi IGI Airport"
    },
    { 
      name: "Kashmir Paradise", 
      fullName: "Kashmir Luxury Tour (Srinagar • Gulmarg • Pahalgam)", 
      days: 5, 
      style: "Luxury & Nature",
      pickup: "Srinagar International Airport (SXR)",
      drop: "Srinagar International Airport (SXR)"
    },
    { 
      name: "Royal Rajasthan", 
      fullName: "Royal Rajasthan (Jaipur • Jodhpur • Udaipur)", 
      days: 6, 
      style: "Heritage Special",
      pickup: "Jaipur International Airport / Railway Station",
      drop: "Udaipur Maharana Pratap Airport / Jaipur"
    },
    { 
      name: "Goa Beach", 
      fullName: "Tropical Goa Beach, Water Sports & Cruise Holiday", 
      days: 4, 
      style: "Beach & Leisure",
      pickup: "Goa Dabolim Airport (GOI) / Mopa Airport (GOX)",
      drop: "Goa Dabolim Airport / Mopa Airport"
    },
    { 
      name: "Kerala Tour", 
      fullName: "Kerala Complete (Munnar • Thekkady • Alleppey)", 
      days: 5, 
      style: "Nature & Backwaters",
      pickup: "Cochin International Airport (COK)",
      drop: "Cochin International Airport (COK)"
    }
  ];



  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setItinerary(null);

    const resolvedDrop = sameAsPickup ? pickupLocation : (dropLocation || pickupLocation);

    try {
      const res = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          days: parseInt(days),
          budget,
          travel_style: travelStyle,
          travelers,
          special_requests: specialRequests,
          pickup_location: pickupLocation,
          drop_location: resolvedDrop
        })
      });

      const data = await res.json();
      if (data.success && data.itinerary) {
        setItinerary(data.itinerary);
        setExpandedDay(1);
        confetti({
          particleCount: 70,
          spread: 50,
          origin: { y: 0.7 }
        });
      }
    } catch (err) {
      console.error(err);
      alert('Error generating itinerary. Please try again or message our team directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!itinerary) return;
    const text = `🌴 ${itinerary.title}\n📍 Destination: ${itinerary.destination}\n🚗 Pickup: ${itinerary.pickup_location || pickupLocation}\n🏁 Drop: ${itinerary.drop_location || dropLocation}\n🗺️ Route: ${itinerary.route_summary || 'Custom Highway Route'}\n⏱️ Duration: ${itinerary.duration}\n💰 Cost: ${itinerary.estimated_cost_inr}\n\n` +
      itinerary.days.map(d => `Day ${d.day_number}: ${d.theme}\n- Morning: ${d.morning}\n- Afternoon: ${d.afternoon}\n- Evening: ${d.evening}\n- Stay: ${d.stay_suggestion}\n`).join('\n') +
      `\n🗺️ Google Maps Directions: ${itinerary.google_maps_route_url || ''}\nCurated by Mankotia Holidays (Call/WhatsApp: +919816461616)`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    if (!itinerary) return;
    const resolvedDrop = itinerary.drop_location || (sameAsPickup ? pickupLocation : dropLocation);
    const itineraryText = `Title: ${itinerary.title}\nDestination: ${itinerary.destination}\nPickup: ${itinerary.pickup_location || pickupLocation}\nDrop: ${resolvedDrop}\nRoute: ${itinerary.route_summary || 'Google Maps Verified'}\nDuration: ${itinerary.duration}\nEstimated cost: ${itinerary.estimated_cost_inr || 'Custom Quote'}\n\n${itinerary.days.map(day => `Day ${day.day_number}: ${day.theme}\nMorning: ${day.morning}\nAfternoon: ${day.afternoon}\nEvening: ${day.evening}\nStay: ${day.stay_suggestion}`).join('\n\n')}`;
    onOpenInquiry({
      destination: itinerary.destination || destination,
      days: parseInt(days, 10),
      travelers,
      budget,
      pickup: itinerary.pickup_location || pickupLocation,
      drop: resolvedDrop,
      itinerary_text: itineraryText,
      notes: `Selected AI itinerary: ${itinerary.title} | Pickup: ${itinerary.pickup_location || pickupLocation} | Drop: ${resolvedDrop} | Duration: ${itinerary.duration} | Estimated cost: ${itinerary.estimated_cost_inr || 'Custom Quote'} | Style: ${travelStyle} | Requests: ${specialRequests || 'None'}`
    });
  };

  const handleBookTrip = () => {
    if (!itinerary) return;
    const resolvedDrop = itinerary.drop_location || (sameAsPickup ? pickupLocation : dropLocation);
    onOpenInquiry({
      destination: itinerary.title,
      days: parseInt(days, 10),
      travelers,
      budget,
      pickup: itinerary.pickup_location || pickupLocation,
      drop: resolvedDrop,
      itinerary_text: `Title: ${itinerary.title}\nDestination: ${itinerary.destination}\nPickup: ${itinerary.pickup_location || pickupLocation}\nDrop: ${resolvedDrop}\nDuration: ${itinerary.duration}\nEstimated cost: ${itinerary.estimated_cost_inr || 'Custom Quote'}\n\n${itinerary.days.map(day => `Day ${day.day_number}: ${day.theme}\nMorning: ${day.morning}\nAfternoon: ${day.afternoon}\nEvening: ${day.evening}\nStay: ${day.stay_suggestion}`).join('\n\n')}`,
      notes: `Selected AI itinerary: ${itinerary.title} | Destination: ${itinerary.destination} | Pickup: ${itinerary.pickup_location || pickupLocation} | Drop: ${resolvedDrop} | Duration: ${itinerary.duration} | Estimated cost: ${itinerary.estimated_cost_inr || 'Custom Quote'}`
    });
  };

  return (
    <section id="ai-planner" className="section-padding" style={{
      background: 'radial-gradient(ellipse at 50% 30%, rgba(139, 92, 246, 0.08) 0%, #0B1120 80%)',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-wrap">
            <span className="badge-gold">
              <Sparkles size={14} /> AI Powered Travel Planner
            </span>
          </div>
          <h2>
            AI Smart <span className="text-gradient-gold">Itinerary Generator</span>
          </h2>
          <p>
            Create your custom holiday plan tailored by destination, duration, budget, and pickup location instantly.
          </p>
        </div>

        {/* Studio Form & Quick Presets */}
        <div className="glass-panel" style={{
          maxWidth: '1020px',
          margin: '0 auto 24px',
          padding: '24px 26px',
          border: '1px solid rgba(139, 92, 246, 0.25)',
          borderRadius: '16px'
        }}>
          
          {/* Quick Presets Chips */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '0.82rem', color: '#94A3B8', fontWeight: 600, marginBottom: '8px' }}>
              ⚡ Quick Select Popular Tours:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {quickPresets.map((preset, i) => {
                const isSelected = destination === preset.fullName || destination === preset.name || destination.includes(preset.name);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setDestination(preset.fullName);
                      setDays(preset.days);
                      setTravelStyle(preset.style);
                      if (preset.pickup) setPickupLocation(preset.pickup);
                      if (preset.drop) setDropLocation(preset.drop);
                    }}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-full)',
                      background: isSelected ? 'rgba(245, 158, 11, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected ? '1px solid #F59E0B' : '1px solid var(--border-light)',
                      color: isSelected ? '#FCD34D' : '#CBD5E1',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {preset.name} ({preset.days}D)
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleGenerate}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '18px',
              marginBottom: '20px'
            }}>
              
              {/* Destination Multiple Choices Select */}
              <div className="form-input-group">
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={14} color="#F59E0B" /> Destination / Yatra
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#FCD34D' }}>
                    Multiple options
                  </span>
                </label>
                <select 
                  className="form-control"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                >
                  <option value="" disabled>-- Select Destination / Tour --</option>
                  {ALL_DESTINATION_CATEGORIES.map((cat, idx) => (
                    <optgroup key={idx} label={`📍 ${cat.group}`} style={{ background: '#111A2E', color: '#F59E0B', fontWeight: 700 }}>
                      {cat.options.map((opt, oIdx) => (
                        <option key={oIdx} value={opt} style={{ background: '#0B1120', color: '#F1F5F9' }}>
                          {opt}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                  {destination && !ALL_DESTINATION_CATEGORIES.some(cat => cat.options.includes(destination)) && (
                    <optgroup label="Custom Destination" style={{ background: '#111A2E', color: '#06B6D4', fontWeight: 700 }}>
                      <option value={destination} style={{ background: '#0B1120', color: '#F1F5F9' }}>
                        {destination}
                      </option>
                    </optgroup>
                  )}
                </select>
              </div>

              {/* Duration Slider */}
              <div className="form-input-group">
                <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} color="#F59E0B" /> Duration
                  </span>
                  <span style={{ color: '#F59E0B', fontWeight: 700 }}>{days} Days</span>
                </label>
                <input 
                  type="range"
                  min="2"
                  max="15"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  style={{
                    width: '100%',
                    accentColor: '#F59E0B',
                    height: '38px',
                    cursor: 'pointer'
                  }}
                />
              </div>

              {/* Budget Tier */}
              <div className="form-input-group">
                <label><DollarSign size={14} color="#F59E0B" /> Budget Tier</label>
                <select 
                  className="form-control"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                >
                  <option value="Budget / Economy" style={{ background: '#111A2E' }}>Budget / Economy</option>
                  <option value="Standard / Deluxe" style={{ background: '#111A2E' }}>Standard / Deluxe (Recommended)</option>
                  <option value="Luxury / 4★ Resort" style={{ background: '#111A2E' }}>Luxury / 4★ Resort</option>
                  <option value="VIP / Helicopter" style={{ background: '#111A2E' }}>VIP / Helicopter Tier</option>
                </select>
              </div>

              {/* Travel Style */}
              <div className="form-input-group">
                <label><Compass size={14} color="#F59E0B" /> Travel Style</label>
                <select 
                  className="form-control"
                  value={travelStyle}
                  onChange={(e) => setTravelStyle(e.target.value)}
                >
                  <option value="Pilgrimage & Spiritual" style={{ background: '#111A2E' }}>Pilgrimage & Spiritual</option>
                  <option value="Family & Leisure" style={{ background: '#111A2E' }}>Family & Leisure</option>
                  <option value="Adventure & Trekking" style={{ background: '#111A2E' }}>Adventure & Trekking</option>
                  <option value="Honeymoon & Romantic" style={{ background: '#111A2E' }}>Honeymoon & Romantic</option>
                  <option value="Senior Citizen Special" style={{ background: '#111A2E' }}>Senior Citizen Special</option>
                </select>
              </div>

              {/* Travelers */}
              <div className="form-input-group">
                <label><Users size={14} color="#F59E0B" /> Travelers</label>
                <input 
                  type="text"
                  className="form-control"
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  placeholder="e.g. 2 Adults, 1 Child"
                />
              </div>

            </div>

            {/* Single Clear Pickup & Drop Location Row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '18px',
              marginBottom: '20px'
            }}>
              {/* Pickup Location */}
              <div className="form-input-group" style={{ marginBottom: 0 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#CBD5E1', marginBottom: '6px', fontWeight: 600 }}>
                  <Car size={15} color="#10B981" />
                  <span>Pickup Location / Arrival Hub</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Haridwar Railway Station / Dehradun Airport / Delhi"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  required
                />
              </div>

              {/* Drop Location */}
              <div className="form-input-group" style={{ marginBottom: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#CBD5E1', margin: 0, fontWeight: 600 }}>
                    <MapPin size={15} color="#06B6D4" />
                    <span>Drop Location / Departure Hub</span>
                  </label>
                  <label style={{ fontSize: '0.76rem', color: '#38BDF8', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', margin: 0, fontWeight: 500 }}>
                    <input 
                      type="checkbox"
                      checked={sameAsPickup}
                      onChange={(e) => {
                        setSameAsPickup(e.target.checked);
                        if (e.target.checked) {
                          setDropLocation(pickupLocation);
                        }
                      }}
                      style={{ accentColor: '#38BDF8', cursor: 'pointer' }}
                    />
                    Same as Pickup
                  </label>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Haridwar Railway Station / Dehradun Airport"
                  value={sameAsPickup ? pickupLocation : dropLocation}
                  onChange={(e) => {
                    setDropLocation(e.target.value);
                    setSameAsPickup(false);
                  }}
                  disabled={sameAsPickup}
                  required
                />
              </div>
            </div>

            {/* Special Requests */}
            <div className="form-input-group" style={{ marginBottom: '24px' }}>
              <label>Special Notes & Preferences (Optional)</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Need helicopter tickets from Phata, wheelchair assistance, pure satvik food..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div style={{ textAlign: 'center' }}>
              <button 
                type="submit" 
                className="btn btn-primary-gold btn-lg"
                disabled={loading}
                style={{ minWidth: '280px' }}
              >
                {loading ? (
                  <span>Generating AI Itinerary with Maps...</span>
                ) : (
                  <>
                    <Sparkles size={18} />
                    <span>Generate Custom Itinerary</span>
                  </>
                )}
              </button>
            </div>
          </form>

        </div>

        {/* AI Itinerary Results Output */}
        {itinerary && (
          <div className="glass-panel" style={{
            maxWidth: '1050px',
            margin: '0 auto',
            padding: '36px',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '16px',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            
            {/* Header / Summary Bar */}
            <div style={{
              borderBottom: '1px solid var(--border-light)',
              paddingBottom: '24px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <span className="badge-gold" style={{ marginBottom: '10px' }}>
                  {itinerary.duration} Custom Plan
                </span>
                <h3 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#FFFFFF', marginTop: '6px' }}>
                  {itinerary.title}
                </h3>
                <div style={{ fontSize: '0.92rem', color: '#94A3B8', marginTop: '6px' }}>
                  📍 <strong>{itinerary.destination}</strong> • Estimated Cost: <span style={{ color: '#F59E0B', fontWeight: 700 }}>{itinerary.estimated_cost_inr}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={handleCopy}
                  className="btn btn-call btn-sm"
                  title="Copy Full Itinerary"
                >
                  <Copy size={15} />
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>

                <button
                  onClick={handleWhatsAppShare}
                  className="btn btn-whatsapp btn-sm"
                >
                  <Share2 size={15} />
                  <span>Get WhatsApp Quote</span>
                </button>

                <button
                  onClick={handleBookTrip}
                  className="btn btn-primary-gold btn-sm"
                >
                  <span>Book This Trip</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Google Maps Route Banner */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(14, 116, 144, 0.25) 0%, rgba(30, 41, 59, 0.8) 100%)',
              border: '1px solid rgba(6, 182, 212, 0.4)',
              borderRadius: '12px',
              padding: '18px 22px',
              marginBottom: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{
                  background: '#0891B2',
                  color: '#FFFFFF',
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Map size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#67E8F9', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Google Maps Road Route & Transit
                  </div>
                  <div style={{ fontSize: '0.98rem', color: '#F1F5F9', fontWeight: 600, marginTop: '2px' }}>
                    🚗 <strong>Start:</strong> {itinerary.pickup_location || pickupLocation}
                  </div>
                  <div style={{ fontSize: '0.98rem', color: '#F1F5F9', fontWeight: 600, marginTop: '2px' }}>
                    🏁 <strong>End:</strong> {itinerary.drop_location || dropLocation}
                  </div>
                  {itinerary.route_summary && (
                    <div style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '4px' }}>
                      🛣️ <em>{itinerary.route_summary}</em>
                    </div>
                  )}
                </div>
              </div>

              {itinerary.google_maps_route_url && (
                <a
                  href={itinerary.google_maps_route_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-cyan btn-sm"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#0891B2',
                    color: '#FFFFFF',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(8, 145, 178, 0.4)'
                  }}
                >
                  <span>Open Route in Google Maps</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>

            {/* Highlights & Packing Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginBottom: '32px'
            }}>
              {/* Trip Highlights */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '20px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)'
              }}>
                <h4 style={{ fontSize: '0.95rem', color: '#FCD34D', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  ✨ Trip Highlights:
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0, margin: 0 }}>
                  {itinerary.highlights?.map((hl, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', color: '#CBD5E1' }}>
                      <CheckCircle2 size={14} color="#10B981" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Packing Essentials */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '20px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)'
              }}>
                <h4 style={{ fontSize: '0.95rem', color: '#67E8F9', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  🎒 Packing Essentials:
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0, margin: 0 }}>
                  {itinerary.packing_essentials?.map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', color: '#CBD5E1' }}>
                      <span style={{ color: '#06B6D4' }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Collapsible Day-by-Day Schedule Header Toggle */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              borderRadius: '12px',
              padding: '16px 20px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={18} color="#F59E0B" />
                  <span>Day-by-Day Tour Roadmap ({itinerary.days?.length || days} Days)</span>
                </h4>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '3px' }}>
                  {showDetailedSchedule ? 'Click hide to minimize space' : 'Click to expand morning, afternoon, evening & hotel plan'}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowDetailedSchedule(!showDetailedSchedule)}
                className="btn btn-primary-gold btn-sm"
                style={{ fontSize: '0.8rem', padding: '8px 16px' }}
              >
                <span>{showDetailedSchedule ? '▲ Hide Detailed Schedule' : '📅 Show Full Day-by-Day Itinerary'}</span>
                {showDetailedSchedule ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>
            </div>

            {/* When collapsed: Sleek Compact Preview */}
            {!showDetailedSchedule && (
              <div style={{
                background: 'rgba(11, 17, 32, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
                padding: '14px 18px',
                marginBottom: '24px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
                  Route Summary:
                </span>
                {itinerary.days?.map((day) => (
                  <span key={day.day_number} style={{
                    fontSize: '0.76rem',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: '#CBD5E1',
                    padding: '3px 8px',
                    borderRadius: '6px'
                  }}>
                    <strong style={{ color: '#FCD34D' }}>D{day.day_number}:</strong> {day.theme ? day.theme.split('&')[0].trim() : `Day ${day.day_number}`}
                  </span>
                ))}
              </div>
            )}

            {/* When expanded: Full Detailed Day-by-Day Timeline Accordion */}
            {showDetailedSchedule && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px', animation: 'fadeIn 0.25s ease-out' }}>
                {itinerary.days?.map((day, idx) => {
                  const isExpanded = expandedDay === day.day_number;
                  const isFirstDay = idx === 0;
                  const isLastDay = idx === itinerary.days.length - 1;

                  return (
                    <div
                      key={day.day_number}
                      className="glass-card"
                      style={{
                        overflow: 'hidden',
                        border: isExpanded ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--border-light)',
                        borderRadius: '12px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {/* Accordion Header */}
                      <div
                        onClick={() => setExpandedDay(isExpanded ? null : day.day_number)}
                        style={{
                          padding: '16px 20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          background: isExpanded ? 'rgba(245, 158, 11, 0.08)' : 'transparent',
                          gap: '12px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                          <span style={{
                            background: isExpanded ? '#F59E0B' : 'rgba(255, 255, 255, 0.08)',
                            color: isExpanded ? '#0F172A' : '#FFFFFF',
                            fontWeight: 800,
                            fontSize: '0.85rem',
                            padding: '4px 12px',
                            borderRadius: 'var(--radius-full)'
                          }}>
                            Day {day.day_number}
                          </span>

                          {isFirstDay && (
                            <span style={{
                              background: 'rgba(52, 211, 153, 0.15)',
                              color: '#34D399',
                              border: '1px solid rgba(52, 211, 153, 0.3)',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: '4px'
                            }}>
                              🚀 Tour Starts (Pickup)
                            </span>
                          )}

                          {isLastDay && (
                            <span style={{
                              background: 'rgba(244, 63, 94, 0.15)',
                              color: '#F43F5E',
                              border: '1px solid rgba(244, 63, 94, 0.3)',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: '4px'
                            }}>
                              🏁 Tour Concludes (Drop)
                            </span>
                          )}

                          <span style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF' }}>
                            {day.theme}
                          </span>
                        </div>

                        <div style={{ color: '#94A3B8' }}>
                          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                      </div>

                      {/* Accordion Expanded Content */}
                      {isExpanded && (
                        <div style={{ padding: '20px', borderTop: '1px solid var(--border-light)', background: 'rgba(10, 15, 29, 0.4)' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                            
                            <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px' }}>
                              <div style={{ fontSize: '0.8rem', color: '#F59E0B', fontWeight: 700, marginBottom: '4px' }}>
                                🌅 Morning:
                              </div>
                              <div style={{ fontSize: '0.88rem', color: '#E2E8F0', lineHeight: 1.5 }}>
                                {day.morning}
                              </div>
                            </div>

                            <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px' }}>
                              <div style={{ fontSize: '0.8rem', color: '#06B6D4', fontWeight: 700, marginBottom: '4px' }}>
                                ☀️ Afternoon:
                              </div>
                              <div style={{ fontSize: '0.88rem', color: '#E2E8F0', lineHeight: 1.5 }}>
                                {day.afternoon}
                              </div>
                            </div>

                            <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px' }}>
                              <div style={{ fontSize: '0.8rem', color: '#A78BFA', fontWeight: 700, marginBottom: '4px' }}>
                                🌙 Evening & Night:
                              </div>
                              <div style={{ fontSize: '0.88rem', color: '#E2E8F0', lineHeight: 1.5 }}>
                                {day.evening}
                              </div>
                            </div>

                          </div>

                          {/* Extra Details Row */}
                          <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '16px',
                            paddingTop: '12px',
                            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                            fontSize: '0.82rem',
                            color: '#94A3B8'
                          }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                              {day.meal_recommendation && (
                                <div>🍽️ <strong>Meal:</strong> {day.meal_recommendation}</div>
                              )}
                              {day.stay_suggestion && (
                                <div>🏨 <strong>Stay:</strong> {day.stay_suggestion}</div>
                              )}
                            </div>
                            {day.pro_tip && (
                              <div style={{ color: '#FCD34D' }}>💡 <strong>Pro Tip:</strong> {day.pro_tip}</div>
                            )}
                          </div>

                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(day.location_name || day.stay_suggestion || day.theme)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              color: '#38BDF8',
                              textDecoration: 'none',
                              fontSize: '0.78rem',
                              fontWeight: 600,
                              marginTop: '8px'
                            }}
                          >
                            <MapPin size={12} />
                            <span>View on Google Maps</span>
                            <ExternalLink size={10} />
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
