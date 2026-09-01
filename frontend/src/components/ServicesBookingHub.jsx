import React, { useState } from 'react';
import { 
  Plane, 
  Train, 
  Bus, 
  Car, 
  Hotel, 
  Calendar, 
  MapPin, 
  Users, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Star, 
  Clock, 
  Phone, 
  Mail, 
  User, 
  CheckCircle2,
  Heart,
  MessageCircle,
  AlertCircle
} from 'lucide-react';

const getTodayDateString = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const isPastDate = (dateStr) => {
  if (!dateStr) return false;
  const parts = dateStr.split('-');
  let selected;
  if (parts.length === 3) {
    selected = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  } else {
    selected = new Date(dateStr);
  }
  if (isNaN(selected.getTime())) return false;
  selected.setHours(0, 0, 0, 0);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return selected < now;
};

export default function ServicesBookingHub({ onOpenInquiry }) {
  const [activeServiceTab, setActiveServiceTab] = useState(null); // 'transit', 'cabs', 'hotels', 'group' or null (collapsed by default)

  const toggleServiceTab = (tab) => {
    setActiveServiceTab((prev) => (prev === tab ? null : tab));
    setTransitSuccess(null);
    setCabSuccess(null);
  };

  // Transit state (Flights / Trains / Buses)
  const [transitType, setTransitType] = useState('Domestic Flight'); // 'Domestic Flight', 'Express & Tatkal Train', 'Luxury AC Volvo Bus'
  const [transitFrom, setTransitFrom] = useState('');
  const [transitTo, setTransitTo] = useState('');
  const [transitDate, setTransitDate] = useState('');
  const [transitClass, setTransitClass] = useState('Economy');
  const [transitPassengers, setTransitPassengers] = useState(2);
  const [transitNotes, setTransitNotes] = useState('');
  const [transitCustomer, setTransitCustomer] = useState({ name: '', phone: '', email: '' });
  const [transitSubmitting, setTransitSubmitting] = useState(false);
  const [transitSuccess, setTransitSuccess] = useState(null);

  // Cab / Taxi / Volvo state
  const [cabType, setCabType] = useState('Innova Crysta (7 Seater)');
  const [cabTripType, setCabTripType] = useState('Outstation Round-Trip');
  const [cabPickup, setCabPickup] = useState('');
  const [cabDrop, setCabDrop] = useState('');
  const [cabDate, setCabDate] = useState('');
  const [cabDays, setCabDays] = useState(6);
  const [cabPassengers, setCabPassengers] = useState(4);
  const [cabNotes, setCabNotes] = useState('');
  const [cabCustomer, setCabCustomer] = useState({ name: '', phone: '', email: '' });
  const [cabSubmitting, setCabSubmitting] = useState(false);
  const [cabSuccess, setCabSuccess] = useState(null);

  // Hotel & Cottage state (Directs to Get Customized Package & Best Quote modal)
  const [hotelCity, setHotelCity] = useState('');
  const [hotelType, setHotelType] = useState('Deluxe Mountain Cottage');
  const [hotelCheckIn, setHotelCheckIn] = useState('');
  const [hotelNights, setHotelNights] = useState(3);
  const [hotelRooms, setHotelRooms] = useState(1);
  const [hotelGuests, setHotelGuests] = useState(2);
  const [hotelMeal, setHotelMeal] = useState('Breakfast and Dinner (MAP)');

  // Group / Honeymoon / Adventure state (Directs to Get Customized Package & Best Quote modal)
  const [tourCategory, setTourCategory] = useState('Honeymoon Special');
  const [groupDestination, setGroupDestination] = useState('');
  const [groupMembers, setGroupMembers] = useState(2);

  // Transit Form Submit (Individual Ticket Query - Separate API & Excel Record)
  const handleTransitSubmit = async (e) => {
    e.preventDefault();
    if (!transitCustomer.name || !transitCustomer.phone || !transitCustomer.email) {
      alert('Please provide your Name, 10-digit Mobile Number, and Email Address.');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(transitCustomer.phone)) {
      alert('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    if (!transitDate) {
      alert('Please select your Date of Journey.');
      return;
    }
    if (isPastDate(transitDate)) {
      alert('Please select a valid present or future journey date. Past dates are not allowed.');
      return;
    }

    setTransitSubmitting(true);
    try {
      const res = await fetch('/api/inquiry/ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: transitCustomer.name,
          phone: transitCustomer.phone,
          email: transitCustomer.email,
          transit_type: transitType,
          origin: transitFrom,
          destination: transitTo,
          travel_date: transitDate,
          travel_class: transitClass,
          passengers: Number(transitPassengers),
          notes: transitNotes,
          source: 'All Travel Services - Ticket Booking Form'
        })
      });

      const data = await res.json();
      if (data.success) {
        setTransitSuccess(data);
      } else {
        alert(data.detail || 'Failed to submit ticket booking query.');
      }
    } catch (err) {
      alert('Failed to submit inquiry. Please check your internet connection.');
    } finally {
      setTransitSubmitting(false);
    }
  };

  // Transport Form Submit (Individual Cab / Taxi Query - Separate API & Excel Record)
  const handleCabSubmit = async (e) => {
    e.preventDefault();
    if (!cabCustomer.name || !cabCustomer.phone || !cabCustomer.email) {
      alert('Please provide your Name, 10-digit Mobile Number, and Email Address.');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(cabCustomer.phone)) {
      alert('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    if (!cabDate) {
      alert('Please select your Pickup Date.');
      return;
    }
    if (isPastDate(cabDate)) {
      alert('Please select a valid present or future pickup date. Past dates are not allowed.');
      return;
    }

    setCabSubmitting(true);
    try {
      const res = await fetch('/api/inquiry/transport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cabCustomer.name,
          phone: cabCustomer.phone,
          email: cabCustomer.email,
          vehicle_category: cabType,
          rental_type: cabTripType,
          pickup: cabPickup,
          drop: cabDrop,
          pickup_date: cabDate,
          duration_days: Number(cabDays),
          passengers: Number(cabPassengers),
          notes: cabNotes,
          source: 'All Travel Services - Transport & Cab Form'
        })
      });

      const data = await res.json();
      if (data.success) {
        setCabSuccess(data);
      } else {
        alert(data.detail || 'Failed to submit vehicle rental query.');
      }
    } catch (err) {
      alert('Failed to submit inquiry. Please check your internet connection.');
    } finally {
      setCabSubmitting(false);
    }
  };

  // Hotel Submit -> Opens the standard Customized Package & Best Quote modal
  const handleHotelSubmit = (e) => {
    e.preventDefault();
    if (!hotelCheckIn) {
      alert('Please select your Check-In Date.');
      return;
    }
    if (isPastDate(hotelCheckIn)) {
      alert('Please select a valid present or future check-in date. Past dates are not allowed.');
      return;
    }
    onOpenInquiry({
      destination: `Hotels & Cottages: ${hotelCity}`,
      pickup: hotelCity,
      drop: hotelCity,
      travel_date: hotelCheckIn,
      days: hotelNights,
      rooms_required: hotelRooms,
      number_of_persons: hotelGuests,
      vehicle_category: 'No Vehicle Required',
      hotel_category: hotelType === 'Deluxe Mountain Cottage' ? 'Luxury Resort' : '3 Star',
      meal_plan: hotelMeal,
      travelers: `${hotelGuests} Guests in ${hotelRooms} Room(s)`,
      source: 'All Travel Services - Hotel Booking Hub',
      notes: `Hotel / Mountain Cottage Booking Query in ${hotelCity}.\nProperty: ${hotelType}\nMeal Plan: ${hotelMeal}\nNights: ${hotelNights}\nRooms: ${hotelRooms}\nGuests: ${hotelGuests}`
    });
  };

  // Group Submit -> Opens the standard Customized Package & Best Quote modal
  const handleGroupSubmit = (e) => {
    e.preventDefault();
    onOpenInquiry({
      destination: `${tourCategory}: ${groupDestination}`,
      pickup: 'Delhi / NCR / Haridwar',
      drop: groupDestination,
      number_of_persons: groupMembers,
      days: 5,
      vehicle_category: groupMembers > 8 ? 'Tempo Traveller' : 'SUV / MUV',
      travelers: `${groupMembers} Persons (${tourCategory})`,
      source: 'All Travel Services - Group & Honeymoon Hub',
      notes: `Special Package Query: ${tourCategory} in ${groupDestination} for ${groupMembers} Persons.`
    });
  };

  return (
    <section id="services" className="section-padding" style={{
      background: 'linear-gradient(180deg, #0B1120 0%, #0E1629 50%, #0B1120 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Subtle Highlights */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '-5%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '-5%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 36px' }}>
          <div className="badge-saffron" style={{ marginBottom: '10px' }}>
            <Sparkles size={14} />
            <span>Complete Multi-Service Travel Hub</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.9rem)', fontWeight: 800, marginBottom: '14px', letterSpacing: '-0.5px' }}>
            All Travel Services <span className="text-gradient-gold">Under One Single Roof</span>
          </h2>
          <p style={{ color: '#94A3B8', fontSize: 'clamp(0.92rem, 1.4vw, 1.05rem)', lineHeight: 1.6 }}>
            Online ticket booking for <strong style={{ color: '#F1F5F9' }}>Flights, Trains & Volvo Buses</strong>, sanitized <strong style={{ color: '#F1F5F9' }}>Taxi & Cab Rentals</strong>, and India’s largest collection of <strong style={{ color: '#F1F5F9' }}>Verified Hotels & Cottages</strong> with 10,000+ authentic reviews.
          </p>
        </div>

        {/* Master Service Navigation Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: activeServiceTab ? '26px' : '0'
        }}>
          <button
            type="button"
            onClick={() => toggleServiceTab('transit')}
            className={`btn ${activeServiceTab === 'transit' ? 'btn-primary-gold' : 'btn-outline-gold'}`}
            style={{
              padding: '12px 20px',
              fontSize: '0.92rem',
              fontWeight: 700,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              boxShadow: activeServiceTab === 'transit' ? '0 0 16px rgba(245, 158, 11, 0.4)' : 'none'
            }}
          >
            <Plane size={18} />
            <span>Flights, Trains & Buses Query</span>
            <span style={{ fontSize: '0.72rem', opacity: 0.8, marginLeft: '2px' }}>
              {activeServiceTab === 'transit' ? '▲ Close' : '▼ Open'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => toggleServiceTab('cabs')}
            className={`btn ${activeServiceTab === 'cabs' ? 'btn-primary-gold' : 'btn-outline-gold'}`}
            style={{
              padding: '12px 20px',
              fontSize: '0.92rem',
              fontWeight: 700,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              boxShadow: activeServiceTab === 'cabs' ? '0 0 16px rgba(6, 182, 212, 0.4)' : 'none'
            }}
          >
            <Car size={18} />
            <span>Volvo / Car / Taxi Rentals</span>
            <span style={{ fontSize: '0.72rem', opacity: 0.8, marginLeft: '2px' }}>
              {activeServiceTab === 'cabs' ? '▲ Close' : '▼ Open'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => toggleServiceTab('hotels')}
            className={`btn ${activeServiceTab === 'hotels' ? 'btn-primary-gold' : 'btn-outline-gold'}`}
            style={{
              padding: '12px 20px',
              fontSize: '0.92rem',
              fontWeight: 700,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              boxShadow: activeServiceTab === 'hotels' ? '0 0 16px rgba(168, 85, 247, 0.4)' : 'none'
            }}
          >
            <Hotel size={18} />
            <span>Hotels & Cottages Booking</span>
            <span style={{ fontSize: '0.72rem', opacity: 0.8, marginLeft: '2px' }}>
              {activeServiceTab === 'hotels' ? '▲ Close' : '▼ Open'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => toggleServiceTab('group')}
            className={`btn ${activeServiceTab === 'group' ? 'btn-primary-gold' : 'btn-outline-gold'}`}
            style={{
              padding: '12px 20px',
              fontSize: '0.92rem',
              fontWeight: 700,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              boxShadow: activeServiceTab === 'group' ? '0 0 16px rgba(244, 114, 182, 0.4)' : 'none'
            }}
          >
            <Heart size={18} />
            <span>Group, Honeymoon & Adventure</span>
            <span style={{ fontSize: '0.72rem', opacity: 0.8, marginLeft: '2px' }}>
              {activeServiceTab === 'group' ? '▲ Close' : '▼ Open'}
            </span>
          </button>
        </div>

        {/* Tab 1: Flights, Trains & Buses (Individual Form & Direct Submission) */}
        {activeServiceTab === 'transit' && (
          <div className="glass-panel" style={{
            padding: 'clamp(20px, 3vw, 36px)',
            borderRadius: '20px',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.45)',
            animation: 'fadeIn 0.3s ease'
          }}>
            {transitSuccess ? (
              <div style={{ textAlign: 'center', padding: '30px 16px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', border: '2px solid #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <CheckCircle2 size={36} color="#10B981" />
                </div>
                <h3 style={{ color: '#FFFFFF', fontSize: '1.45rem', fontWeight: 800, marginBottom: '8px' }}>
                  Ticket Booking Query Submitted Successfully!
                </h3>
                <p style={{ color: '#CBD5E1', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto 20px' }}>
                  Your reference ID is <strong style={{ color: '#FCD34D' }}>{transitSuccess.lead_id}</strong>. Our ticketing desk has generated your query summary Word document and is preparing the lowest fare quote for your route.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <a
                    href={transitSuccess.whatsapp_redirect_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary-gold"
                    style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <MessageCircle size={18} />
                    <span>Chat on WhatsApp for Instant Ticket Confirmation</span>
                  </a>
                  <button
                    onClick={() => setTransitSuccess(null)}
                    className="btn btn-outline-gold"
                    style={{ padding: '12px 20px' }}
                  >
                    Submit Another Query
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Transit Mode Switcher */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => { setTransitType('Domestic Flight'); setTransitClass('Economy'); }}
                    style={{
                      padding: '9px 18px',
                      borderRadius: '10px',
                      border: transitType === 'Domestic Flight' ? '1px solid #F59E0B' : '1px solid rgba(255,255,255,0.1)',
                      background: transitType === 'Domestic Flight' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.03)',
                      color: transitType === 'Domestic Flight' ? '#FCD34D' : '#94A3B8',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Plane size={16} /> ✈️ Domestic Flights
                  </button>

                  <button
                    type="button"
                    onClick={() => { setTransitType('Express & Tatkal Train'); setTransitClass('3rd AC / Tatkal'); }}
                    style={{
                      padding: '9px 18px',
                      borderRadius: '10px',
                      border: transitType === 'Express & Tatkal Train' ? '1px solid #06B6D4' : '1px solid rgba(255,255,255,0.1)',
                      background: transitType === 'Express & Tatkal Train' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255,255,255,0.03)',
                      color: transitType === 'Express & Tatkal Train' ? '#67E8F9' : '#94A3B8',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Train size={16} /> 🚆 Express & Tatkal Trains
                  </button>

                  <button
                    type="button"
                    onClick={() => { setTransitType('Luxury AC Volvo Bus'); setTransitClass('AC Multi-Axle Volvo'); }}
                    style={{
                      padding: '9px 18px',
                      borderRadius: '10px',
                      border: transitType === 'Luxury AC Volvo Bus' ? '1px solid #10B981' : '1px solid rgba(255,255,255,0.1)',
                      background: transitType === 'Luxury AC Volvo Bus' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.03)',
                      color: transitType === 'Luxury AC Volvo Bus' ? '#6EE7B7' : '#94A3B8',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Bus size={16} /> 🚌 Luxury AC Volvo Buses
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleTransitSubmit}>
                  {/* Customer Information Row */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    marginBottom: '18px'
                  }}>
                    <div style={{ color: '#FCD34D', fontSize: '0.84rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <User size={15} /> Customer Contact Details
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '14px'
                    }}>
                      <div>
                        <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rajesh Kumar"
                          value={transitCustomer.name}
                          onChange={(e) => setTransitCustomer({ ...transitCustomer, name: e.target.value })}
                          className="form-input"
                          style={{ width: '100%', background: '#111A2E', borderColor: 'rgba(255,255,255,0.12)', color: '#FFFFFF', padding: '10px 14px', borderRadius: '10px' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                          WhatsApp / Mobile *
                        </label>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          placeholder="10-digit Indian Mobile"
                          value={transitCustomer.phone}
                          onChange={(e) => setTransitCustomer({ ...transitCustomer, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                          className="form-input"
                          style={{ width: '100%', background: '#111A2E', borderColor: 'rgba(255,255,255,0.12)', color: '#FFFFFF', padding: '10px 14px', borderRadius: '10px' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. rajesh@gmail.com"
                          value={transitCustomer.email}
                          onChange={(e) => setTransitCustomer({ ...transitCustomer, email: e.target.value })}
                          className="form-input"
                          style={{ width: '100%', background: '#111A2E', borderColor: 'rgba(255,255,255,0.12)', color: '#FFFFFF', padding: '10px 14px', borderRadius: '10px' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Route & Journey Row */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
                    gap: '14px',
                    marginBottom: '18px'
                  }}>
                    <div>
                      <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                        From (Origin City / Station) *
                      </label>
                      <input
                        type="text"
                        value={transitFrom}
                        onChange={(e) => setTransitFrom(e.target.value)}
                        required
                        placeholder="e.g. Delhi / Mumbai / Haridwar"
                        className="form-input"
                        style={{ width: '100%', background: '#111A2E', borderColor: 'rgba(255,255,255,0.12)', color: '#FFFFFF', padding: '10px 14px', borderRadius: '10px' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                        To (Destination City / Station) *
                      </label>
                      <input
                        type="text"
                        value={transitTo}
                        onChange={(e) => setTransitTo(e.target.value)}
                        required
                        placeholder="e.g. Dehradun / Srinagar / Goa"
                        className="form-input"
                        style={{ width: '100%', background: '#111A2E', borderColor: 'rgba(255,255,255,0.12)', color: '#FFFFFF', padding: '10px 14px', borderRadius: '10px' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                        Date of Journey *
                      </label>
                      <input
                        type="date"
                        min={getTodayDateString()}
                        value={transitDate}
                        onChange={(e) => setTransitDate(e.target.value)}
                        required
                        className="form-input"
                        style={{
                          width: '100%',
                          background: '#111A2E',
                          borderColor: isPastDate(transitDate) ? '#EF4444' : 'rgba(255,255,255,0.12)',
                          color: '#FFFFFF',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          boxShadow: isPastDate(transitDate) ? '0 0 0 1px #EF4444' : 'none'
                        }}
                      />
                      {isPastDate(transitDate) && (
                        <div style={{
                          marginTop: '6px',
                          padding: '6px 10px',
                          background: 'rgba(239, 68, 68, 0.15)',
                          border: '1px solid rgba(239, 68, 68, 0.4)',
                          borderRadius: '6px',
                          color: '#FCA5A5',
                          fontSize: '0.78rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <AlertCircle size={14} color="#EF4444" style={{ flexShrink: 0 }} />
                          <span>Please select a present or future journey date. Past dates are not allowed.</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                        Class / Travel Type
                      </label>
                      <select
                        value={transitClass}
                        onChange={(e) => setTransitClass(e.target.value)}
                        className="form-input"
                        style={{ width: '100%', background: '#111A2E', borderColor: 'rgba(255,255,255,0.12)', color: '#FFFFFF', padding: '10px 14px', borderRadius: '10px' }}
                      >
                        {transitType === 'Domestic Flight' && (
                          <>
                            <option value="Economy">Economy Class</option>
                            <option value="Premium Economy">Premium Economy</option>
                            <option value="Business">Business Class</option>
                          </>
                        )}
                        {transitType === 'Express & Tatkal Train' && (
                          <>
                            <option value="3rd AC / Tatkal">3rd AC (3A) / Tatkal Assistance</option>
                            <option value="2nd AC">2nd AC (2A)</option>
                            <option value="1st AC">1st AC (1A)</option>
                            <option value="Sleeper Class">Sleeper Class (SL)</option>
                          </>
                        )}
                        {transitType === 'Luxury AC Volvo Bus' && (
                          <>
                            <option value="AC Multi-Axle Volvo">AC Multi-Axle Volvo (Semi-Sleeper)</option>
                            <option value="AC Sleeper Bus">AC Luxury Sleeper Coach</option>
                            <option value="Bharat Benz AC">Bharat Benz AC Executive</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                        Passengers Count *
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => setTransitPassengers(prev => Math.max(1, (Number(prev) || 1) - 1))}
                          style={{
                            width: '38px',
                            height: '42px',
                            borderRadius: '10px',
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            color: '#FFFFFF',
                            fontWeight: 800,
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            userSelect: 'none'
                          }}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min={1}
                          max={100}
                          value={transitPassengers}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === '') {
                              setTransitPassengers('');
                            } else {
                              const num = parseInt(val, 10);
                              setTransitPassengers(isNaN(num) ? 1 : Math.max(1, num));
                            }
                          }}
                          onBlur={() => {
                            if (!transitPassengers || Number(transitPassengers) < 1) {
                              setTransitPassengers(1);
                            }
                          }}
                          placeholder="Type count (e.g. 7, 12, 25)"
                          className="form-input"
                          style={{
                            width: '100%',
                            textAlign: 'center',
                            background: '#111A2E',
                            borderColor: 'rgba(255,255,255,0.12)',
                            color: '#FFFFFF',
                            padding: '10px 10px',
                            borderRadius: '10px',
                            fontWeight: 700,
                            fontSize: '0.95rem'
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setTransitPassengers(prev => (Number(prev) || 0) + 1)}
                          style={{
                            width: '38px',
                            height: '42px',
                            borderRadius: '10px',
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            color: '#FFFFFF',
                            fontWeight: 800,
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            userSelect: 'none'
                          }}
                        >
                          +
                        </button>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '4px', display: 'block' }}>
                        Type any passenger count manually or use +/-
                      </span>
                    </div>
                  </div>

                  {/* Notes / Special Preference */}
                  <div style={{ marginBottom: '18px' }}>
                    <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                      Special Notes (Train / Flight preference, timings, or urgent Tatkal requirement)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Prefer morning flight or Vande Bharat Express train..."
                      value={transitNotes}
                      onChange={(e) => setTransitNotes(e.target.value)}
                      className="form-input"
                      style={{ width: '100%', background: '#111A2E', borderColor: 'rgba(255,255,255,0.12)', color: '#FFFFFF', padding: '10px 14px', borderRadius: '10px' }}
                    />
                  </div>

                  {/* Submit row */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px',
                    paddingTop: '14px',
                    borderTop: '1px solid rgba(255,255,255,0.08)'
                  }}>
                    <div style={{ display: 'flex', gap: '14px', color: '#94A3B8', fontSize: '0.82rem', flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#10B981' }}>
                        <CheckCircle2 size={14} /> Instant PNR Confirmation
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#F59E0B' }}>
                        <CheckCircle2 size={14} /> Emergency Tatkal Support
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={transitSubmitting}
                      className="btn btn-primary-gold"
                      style={{ padding: '12px 28px', fontSize: '0.95rem', fontWeight: 700 }}
                    >
                      <span>{transitSubmitting ? 'Submitting...' : 'Submit Ticket Booking Query'}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        )}

        {/* Tab 2: Volvo / Car / Taxi Rentals (Individual Form & Direct Submission) */}
        {activeServiceTab === 'cabs' && (
          <div className="glass-panel" style={{
            padding: 'clamp(20px, 3vw, 36px)',
            borderRadius: '20px',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.45)',
            animation: 'fadeIn 0.3s ease'
          }}>
            {cabSuccess ? (
              <div style={{ textAlign: 'center', padding: '30px 16px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.2)', border: '2px solid #06B6D4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <CheckCircle2 size={36} color="#06B6D4" />
                </div>
                <h3 style={{ color: '#FFFFFF', fontSize: '1.45rem', fontWeight: 800, marginBottom: '8px' }}>
                  Transport & Cab Rental Query Submitted!
                </h3>
                <p style={{ color: '#CBD5E1', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto 20px' }}>
                  Your reference ID is <strong style={{ color: '#38BDF8' }}>{cabSuccess.lead_id}</strong>. Our transport operations desk has generated your query summary Word document and will provide vehicle allocation details shortly.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <a
                    href={cabSuccess.whatsapp_redirect_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary-gold"
                    style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <MessageCircle size={18} />
                    <span>Connect on WhatsApp for Fast Cab Confirmation</span>
                  </a>
                  <button
                    onClick={() => setCabSuccess(null)}
                    className="btn btn-outline-gold"
                    style={{ padding: '12px 20px' }}
                  >
                    Submit Another Cab Query
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Cab Fleet Selector */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '12px',
                  marginBottom: '20px'
                }}>
                  {[
                    { name: 'Swift Dzire / Etios', seats: '4 Seater Sedan', tag: 'Best for Couples/Small Families', color: '#F59E0B' },
                    { name: 'Innova Crysta (7 Seater)', seats: '6-7 Seater Premium', tag: 'Top Choice for Hills & Yatra', color: '#06B6D4' },
                    { name: 'Ertiga / XL6', seats: '6 Seater SUV', tag: 'Budget Friendly SUV', color: '#10B981' },
                    { name: 'Tempo Traveller (12-26 Seater)', seats: '12-26 Seater AC', tag: 'Spacious for Groups & Families', color: '#A78BFA' },
                    { name: 'Luxury Volvo Coach', seats: '35-45 Seater Bus', tag: 'Corporate & Large Pilgrimages', color: '#F472B6' }
                  ].map((car) => (
                    <div
                      key={car.name}
                      onClick={() => setCabType(car.name)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        border: cabType === car.name ? `2px solid ${car.color}` : '1px solid rgba(255,255,255,0.08)',
                        background: cabType === car.name ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.02)',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '2px' }}>
                        {car.name}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: car.color, fontWeight: 700 }}>
                        {car.seats}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '4px' }}>
                        {car.tag}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleCabSubmit}>
                  {/* Customer Information Row */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    marginBottom: '18px'
                  }}>
                    <div style={{ color: '#38BDF8', fontSize: '0.84rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <User size={15} /> Customer Contact Details
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '14px'
                    }}>
                      <div>
                        <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Vikas Sharma"
                          value={cabCustomer.name}
                          onChange={(e) => setCabCustomer({ ...cabCustomer, name: e.target.value })}
                          className="form-input"
                          style={{ width: '100%', background: '#111A2E', borderColor: 'rgba(255,255,255,0.12)', color: '#FFFFFF', padding: '10px 14px', borderRadius: '10px' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                          WhatsApp / Mobile *
                        </label>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          placeholder="10-digit Indian Mobile"
                          value={cabCustomer.phone}
                          onChange={(e) => setCabCustomer({ ...cabCustomer, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                          className="form-input"
                          style={{ width: '100%', background: '#111A2E', borderColor: 'rgba(255,255,255,0.12)', color: '#FFFFFF', padding: '10px 14px', borderRadius: '10px' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. vikas@gmail.com"
                          value={cabCustomer.email}
                          onChange={(e) => setCabCustomer({ ...cabCustomer, email: e.target.value })}
                          className="form-input"
                          style={{ width: '100%', background: '#111A2E', borderColor: 'rgba(255,255,255,0.12)', color: '#FFFFFF', padding: '10px 14px', borderRadius: '10px' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Route & Trip details */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
                    gap: '14px',
                    marginBottom: '18px'
                  }}>
                    <div>
                      <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                        Rental / Trip Type
                      </label>
                      <select
                        value={cabTripType}
                        onChange={(e) => setCabTripType(e.target.value)}
                        className="form-input"
                        style={{ width: '100%', background: '#111A2E', borderColor: 'rgba(255,255,255,0.12)', color: '#FFFFFF', padding: '10px 14px', borderRadius: '10px' }}
                      >
                        <option value="Outstation Round-Trip">Outstation Round-Trip (Char Dham / Hills)</option>
                        <option value="One-Way Drop">One-Way Intercity Drop</option>
                        <option value="Airport / Station Transfer">Airport / Railway Station Transfer</option>
                        <option value="Local Full Day Sightseeing">Local Full Day Sightseeing (8hr / 80km)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                        Pickup City / Location *
                      </label>
                      <input
                        type="text"
                        value={cabPickup}
                        onChange={(e) => setCabPickup(e.target.value)}
                        required
                        placeholder="e.g. Haridwar / Dehradun / Delhi"
                        className="form-input"
                        style={{ width: '100%', background: '#111A2E', borderColor: 'rgba(255,255,255,0.12)', color: '#FFFFFF', padding: '10px 14px', borderRadius: '10px' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                        Drop / Destination Route *
                      </label>
                      <input
                        type="text"
                        value={cabDrop}
                        onChange={(e) => setCabDrop(e.target.value)}
                        required
                        placeholder="e.g. Kedarnath / Badrinath / Manali"
                        className="form-input"
                        style={{ width: '100%', background: '#111A2E', borderColor: 'rgba(255,255,255,0.12)', color: '#FFFFFF', padding: '10px 14px', borderRadius: '10px' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                        Pickup Date *
                      </label>
                      <input
                        type="date"
                        min={getTodayDateString()}
                        value={cabDate}
                        onChange={(e) => setCabDate(e.target.value)}
                        required
                        className="form-input"
                        style={{
                          width: '100%',
                          background: '#111A2E',
                          borderColor: isPastDate(cabDate) ? '#EF4444' : 'rgba(255,255,255,0.12)',
                          color: '#FFFFFF',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          boxShadow: isPastDate(cabDate) ? '0 0 0 1px #EF4444' : 'none'
                        }}
                      />
                      {isPastDate(cabDate) && (
                        <div style={{
                          marginTop: '6px',
                          padding: '6px 10px',
                          background: 'rgba(239, 68, 68, 0.15)',
                          border: '1px solid rgba(239, 68, 68, 0.4)',
                          borderRadius: '6px',
                          color: '#FCA5A5',
                          fontSize: '0.78rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <AlertCircle size={14} color="#EF4444" style={{ flexShrink: 0 }} />
                          <span>Please select a present or future pickup date. Past dates are not allowed.</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                        Duration (Days)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={cabDays}
                        onChange={(e) => setCabDays(Number(e.target.value))}
                        className="form-input"
                        style={{ width: '100%', background: '#111A2E', borderColor: 'rgba(255,255,255,0.12)', color: '#FFFFFF', padding: '10px 14px', borderRadius: '10px' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '18px' }}>
                    <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                      Additional Route Requests / Pickup Point Notes
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Early morning 5 AM pickup, carrier required on top..."
                      value={cabNotes}
                      onChange={(e) => setCabNotes(e.target.value)}
                      className="form-input"
                      style={{ width: '100%', background: '#111A2E', borderColor: 'rgba(255,255,255,0.12)', color: '#FFFFFF', padding: '10px 14px', borderRadius: '10px' }}
                    />
                  </div>

                  {/* Submit row */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px',
                    paddingTop: '14px',
                    borderTop: '1px solid rgba(255,255,255,0.08)'
                  }}>
                    <div style={{ display: 'flex', gap: '14px', color: '#94A3B8', fontSize: '0.82rem', flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#06B6D4' }}>
                        <ShieldCheck size={14} /> 100% Certified Mountain Drivers
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#10B981' }}>
                        <CheckCircle2 size={14} /> Toll, Parking & State Tax Included
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={cabSubmitting}
                      className="btn btn-primary-gold"
                      style={{ padding: '12px 28px', fontSize: '0.95rem', fontWeight: 700 }}
                    >
                      <span>{cabSubmitting ? 'Submitting...' : 'Submit Transport / Cab Query'}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        )}

        {/* Tab 3: Hotels & Cottages Booking (Directs to Get Customized Package & Best Quote modal) */}
        {activeServiceTab === 'hotels' && (
          <div className="glass-panel" style={{
            padding: 'clamp(20px, 3vw, 36px)',
            borderRadius: '20px',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.45)',
            animation: 'fadeIn 0.3s ease'
          }}>
            {/* Highlight Banner */}
            <div style={{
              background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.15) 0%, rgba(245, 158, 11, 0.15) 100%)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              borderRadius: '12px',
              padding: '12px 18px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Star size={20} color="#F59E0B" fill="#F59E0B" />
                <div>
                  <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '0.92rem' }}>
                    India’s Largest Hotel & Mountain Cottage Platform
                  </div>
                  <div style={{ color: '#CBD5E1', fontSize: '0.78rem' }}>
                    Curated with 10,000+ verified guest reviews, zero hidden fees, and exclusive ground-floor room guarantees.
                  </div>
                </div>
              </div>
              <span style={{ background: '#A855F7', color: '#FFFFFF', padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700 }}>
                10,000+ Verified Reviews
              </span>
            </div>

            <form onSubmit={handleHotelSubmit}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                marginBottom: '20px'
              }}>
                <div>
                  <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                    Destination / City
                  </label>
                  <select
                    value={hotelCity}
                    onChange={(e) => setHotelCity(e.target.value)}
                    required
                    className="form-input"
                    style={{
                      width: '100%',
                      background: '#111A2E',
                      borderColor: 'rgba(255,255,255,0.12)',
                      color: hotelCity ? '#FFFFFF' : '#94A3B8',
                      padding: '11px 14px',
                      borderRadius: '10px'
                    }}
                  >
                    <option value="" disabled style={{ color: '#64748B' }}>-- Select Destination / City --</option>
                    <option value="Kedarnath / Guptkashi / Phata">Kedarnath / Guptkashi / Phata Base</option>
                    <option value="Badrinath / Joshimath">Badrinath / Joshimath</option>
                    <option value="Haridwar / Rishikesh">Haridwar / Rishikesh (Ganga View)</option>
                    <option value="Manali / Solang / Atal Tunnel">Manali & Solang Valley</option>
                    <option value="Shimla / Kufri">Shimla & Kufri</option>
                    <option value="Mussoorie / Dhanaulti">Mussoorie & Dhanaulti</option>
                    <option value="Nainital / Jim Corbett">Nainital & Jim Corbett Resort</option>
                    <option value="Srinagar / Gulmarg / Pahalgam">Kashmir (Houseboat & Resorts)</option>
                    <option value="Jaipur / Udaipur / Jodhpur">Rajasthan Heritage Havelis</option>
                    <option value="Goa / North & South Beach">Goa Beachfront Resorts</option>
                    <option value="Munnar / Alleppey">Kerala Backwater Stays</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                    Stay Category
                  </label>
                  <select
                    value={hotelType}
                    onChange={(e) => setHotelType(e.target.value)}
                    className="form-input"
                    style={{ width: '100%', background: '#111A2E', borderColor: 'rgba(255,255,255,0.12)', color: '#FFFFFF', padding: '11px 14px', borderRadius: '10px' }}
                  >
                    <option value="Deluxe Mountain Cottage">Scenic Mountain Wooden Cottage</option>
                    <option value="5 Star Luxury Resort">5-Star Luxury Resort & Spa</option>
                    <option value="3/4 Star Deluxe Hotel">3★ / 4★ Premium Hotel</option>
                    <option value="Riverside Swiss Luxury Camp">Riverside Luxury Swiss Camp / Glamping</option>
                    <option value="Budget Verified Clean Stay">Budget Verified Clean Stay / Ashram</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                    Check-In Date *
                  </label>
                  <input
                    type="date"
                    min={getTodayDateString()}
                    value={hotelCheckIn}
                    onChange={(e) => setHotelCheckIn(e.target.value)}
                    required
                    className="form-input"
                    style={{
                      width: '100%',
                      background: '#111A2E',
                      borderColor: isPastDate(hotelCheckIn) ? '#EF4444' : 'rgba(255,255,255,0.12)',
                      color: '#FFFFFF',
                      padding: '11px 14px',
                      borderRadius: '10px',
                      boxShadow: isPastDate(hotelCheckIn) ? '0 0 0 1px #EF4444' : 'none'
                    }}
                  />
                  {isPastDate(hotelCheckIn) && (
                    <div style={{
                      marginTop: '6px',
                      padding: '6px 10px',
                      background: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      borderRadius: '6px',
                      color: '#FCA5A5',
                      fontSize: '0.78rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <AlertCircle size={14} color="#EF4444" style={{ flexShrink: 0 }} />
                      <span>Please select a present or future check-in date. Past dates are not allowed.</span>
                    </div>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {/* Nights Manual Field */}
                  <div>
                    <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                      Nights Count *
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <button
                        type="button"
                        onClick={() => setHotelNights(prev => Math.max(1, (Number(prev) || 1) - 1))}
                        style={{
                          width: '34px',
                          height: '42px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#FFFFFF',
                          fontWeight: 800,
                          fontSize: '1.1rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          userSelect: 'none'
                        }}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={hotelNights}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === '') {
                            setHotelNights('');
                          } else {
                            const num = parseInt(val, 10);
                            setHotelNights(isNaN(num) ? 1 : Math.max(1, num));
                          }
                        }}
                        onBlur={() => {
                          if (!hotelNights || Number(hotelNights) < 1) {
                            setHotelNights(1);
                          }
                        }}
                        placeholder="Nights"
                        className="form-input"
                        style={{
                          width: '100%',
                          textAlign: 'center',
                          background: '#111A2E',
                          borderColor: 'rgba(255,255,255,0.12)',
                          color: '#FFFFFF',
                          padding: '10px 6px',
                          borderRadius: '8px',
                          fontWeight: 700,
                          fontSize: '0.9rem'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setHotelNights(prev => (Number(prev) || 0) + 1)}
                        style={{
                          width: '34px',
                          height: '42px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#FFFFFF',
                          fontWeight: 800,
                          fontSize: '1.1rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          userSelect: 'none'
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Rooms Manual Field */}
                  <div>
                    <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                      Rooms Count *
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <button
                        type="button"
                        onClick={() => setHotelRooms(prev => Math.max(1, (Number(prev) || 1) - 1))}
                        style={{
                          width: '34px',
                          height: '42px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#FFFFFF',
                          fontWeight: 800,
                          fontSize: '1.1rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          userSelect: 'none'
                        }}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={hotelRooms}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === '') {
                            setHotelRooms('');
                          } else {
                            const num = parseInt(val, 10);
                            setHotelRooms(isNaN(num) ? 1 : Math.max(1, num));
                          }
                        }}
                        onBlur={() => {
                          if (!hotelRooms || Number(hotelRooms) < 1) {
                            setHotelRooms(1);
                          }
                        }}
                        placeholder="Rooms"
                        className="form-input"
                        style={{
                          width: '100%',
                          textAlign: 'center',
                          background: '#111A2E',
                          borderColor: 'rgba(255,255,255,0.12)',
                          color: '#FFFFFF',
                          padding: '10px 6px',
                          borderRadius: '8px',
                          fontWeight: 700,
                          fontSize: '0.9rem'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setHotelRooms(prev => (Number(prev) || 0) + 1)}
                        style={{
                          width: '34px',
                          height: '42px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#FFFFFF',
                          fontWeight: 800,
                          fontSize: '1.1rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          userSelect: 'none'
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                    Meal Plan Preference
                  </label>
                  <select
                    value={hotelMeal}
                    onChange={(e) => setHotelMeal(e.target.value)}
                    className="form-input"
                    style={{ width: '100%', background: '#111A2E', borderColor: 'rgba(255,255,255,0.12)', color: '#FFFFFF', padding: '11px 14px', borderRadius: '10px' }}
                  >
                    <option value="Breakfast and Dinner (MAP)">Breakfast + Dinner (MAP Plan - Most Popular)</option>
                    <option value="Breakfast Only (CP)">Breakfast Only (CP Plan)</option>
                    <option value="Breakfast, Lunch and Dinner (AP)">All Meals: Breakfast + Lunch + Dinner (AP)</option>
                    <option value="No Meals">Room Only (EP Plan)</option>
                  </select>
                </div>
              </div>

              {/* Action row */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
                paddingTop: '14px',
                borderTop: '1px solid rgba(255,255,255,0.08)'
              }}>
                <div style={{ display: 'flex', gap: '16px', color: '#94A3B8', fontSize: '0.84rem', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#A855F7' }}>
                    <CheckCircle2 size={15} /> 100% Satvik & Pure Veg Available
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#F59E0B' }}>
                    <CheckCircle2 size={15} /> Real Verified Guest Reviews
                  </span>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary-gold"
                  style={{ padding: '12px 28px', fontSize: '0.95rem', fontWeight: 700 }}
                >
                  <span>Get Customized Hotel & Stay Quote</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 4: Group Tours, Honeymoon & Adventure (Directs to Get Customized Package & Best Quote modal) */}
        {activeServiceTab === 'group' && (
          <div className="glass-panel" style={{
            padding: 'clamp(20px, 3vw, 36px)',
            borderRadius: '20px',
            border: '1px solid rgba(244, 114, 182, 0.3)',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.45)',
            animation: 'fadeIn 0.3s ease'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '14px',
              marginBottom: '24px'
            }}>
              {[
                { title: 'Honeymoon Special Suites', icon: '💑', desc: 'Candlelight dinners, flower bed décor & luxury private transfers', cat: 'Honeymoon Special' },
                { title: 'School / College / Corporate Groups', icon: '🚌', desc: 'Custom AC Volvo coaches, safe stays & guided group management', cat: 'Large Group Tour' },
                { title: 'Camping & River Rafting', icon: '🏕️', desc: 'Rishikesh Grade 3/4 rapids, cliff jumping & luxury Swiss camps', cat: 'Adventure & Camping' },
                { title: 'Spiritual Yatras & Golden Triangle', icon: '🕉️', desc: 'Char Dham, Kashi-Ayodhya & Delhi-Agra-Jaipur circuits', cat: 'Pilgrimage & Golden Triangle' }
              ].map((item) => (
                <div
                  key={item.title}
                  onClick={() => setTourCategory(item.cat)}
                  style={{
                    padding: '16px',
                    borderRadius: '14px',
                    border: tourCategory === item.cat ? '2px solid #F472B6' : '1px solid rgba(255,255,255,0.08)',
                    background: tourCategory === item.cat ? 'rgba(244, 114, 182, 0.12)' : 'rgba(255,255,255,0.02)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{item.icon}</div>
                  <div style={{ fontSize: '0.96rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>{item.title}</div>
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8', lineHeight: 1.4 }}>{item.desc}</div>
                </div>
              ))}
            </div>

            <form onSubmit={handleGroupSubmit}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                marginBottom: '20px'
              }}>
                <div>
                  <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                    Desired Destination / Circuit
                  </label>
                  <input
                    type="text"
                    value={groupDestination}
                    onChange={(e) => setGroupDestination(e.target.value)}
                    required
                    placeholder="e.g. Manali, Kashmir, Goa, Char Dham, Rishikesh"
                    className="form-input"
                    style={{ width: '100%', background: '#111A2E', borderColor: 'rgba(255,255,255,0.12)', color: '#FFFFFF', padding: '11px 14px', borderRadius: '10px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                    Number of Members / Travelers
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={groupMembers}
                    onChange={(e) => setGroupMembers(Number(e.target.value))}
                    className="form-input"
                    style={{ width: '100%', background: '#111A2E', borderColor: 'rgba(255,255,255,0.12)', color: '#FFFFFF', padding: '11px 14px', borderRadius: '10px' }}
                  />
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
                paddingTop: '14px',
                borderTop: '1px solid rgba(255,255,255,0.08)'
              }}>
                <div style={{ color: '#F472B6', fontSize: '0.86rem', fontWeight: 600 }}>
                  ✨ Tailor-made itineraries, group discounts, and 24/7 dedicated trip supervisor included.
                </div>

                <button
                  type="submit"
                  className="btn btn-primary-gold"
                  style={{ padding: '12px 28px', fontSize: '0.95rem', fontWeight: 700 }}
                >
                  <span>Get Customized Package & Best Quote</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </section>
  );
}
