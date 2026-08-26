import React, { useState, useEffect } from 'react';
import { X, Sparkles, User, Phone, Mail, MapPin, Users, Calendar, ArrowRight, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Compass, Search, Check, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUICK_DESTINATION_PILLS, VISUAL_DESTINATIONS } from '../data/packagesData';

const getTodayDateString = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const isPastJourneyDate = (dateStr) => {
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

export default function InquiryModal({ isOpen, onClose, initialData = {} }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    destination: initialData.destination || '',
    travelers: '2 Adults (Couple)',
    number_of_persons: 2,
    children: 0,
    child_ages: [],
    vehicle_category: 'Sedan Car',
    rooms_required: 1,
    meal_plan: 'Breakfast Only (CP)',
    hotel_category: '3 Star',
    itinerary_text: '',
    travel_date: '',
    pickup: '',
    drop: '',
    days: 4,
    budget: 'Standard',
    notes: initialData.notes || ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('All');
  const [isDestinationDrawerOpen, setIsDestinationDrawerOpen] = useState(false);
  const [destinationSearch, setDestinationSearch] = useState('');

  useEffect(() => {
    if (initialData.destination) {
      setFormData(prev => ({
        ...prev,
        destination: initialData.destination,
        notes: initialData.notes || '',
        days: initialData.days || prev.days,
        travelers: initialData.travelers || prev.travelers,
        budget: initialData.budget || prev.budget,
        itinerary_text: initialData.itinerary_text || prev.itinerary_text,
        travel_date: initialData.travel_date || prev.travel_date,
        pickup: initialData.pickup || prev.pickup,
        drop: initialData.drop || prev.drop,
        number_of_persons: initialData.number_of_persons || prev.number_of_persons,
        rooms_required: initialData.rooms_required || prev.rooms_required,
        vehicle_category: initialData.vehicle_category || prev.vehicle_category,
        hotel_category: initialData.hotel_category || prev.hotel_category,
        meal_plan: initialData.meal_plan || prev.meal_plan
      }));
    }
  }, [initialData]);

  useEffect(() => {
    if (isOpen) setSuccess(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.travel_date || !formData.pickup || !formData.drop || !formData.vehicle_category || !formData.meal_plan || formData.child_ages.some((age) => !age)) {
      alert('Please complete all required customer and journey details.');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      alert('Please enter a valid Indian mobile number with exactly 10 digits.');
      return;
    }
    if (isPastJourneyDate(formData.travel_date)) {
      alert('Please enter a valid date for journey. Selected travel date is before the present date.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          destination: formData.destination,
          travel_date: formData.travel_date,
          pickup: formData.pickup,
          drop: formData.drop,
          days: Number(formData.days),
          number_of_persons: Number(formData.number_of_persons),
          children: Number(formData.children),
          child_ages: formData.child_ages.join(', '),
          vehicle_category: formData.vehicle_category,
          rooms_required: Number(formData.rooms_required),
          meal_plan: formData.meal_plan,
          hotel_category: formData.hotel_category,
          itinerary_text: formData.itinerary_text,
          travelers: formData.travelers,
          budget: formData.budget,
          notes: formData.notes,
          source: 'Website Booking Modal'
        })
      });

      const data = await res.json();
      if (data.success) {
        setWhatsappUrl(data.whatsapp_redirect_url || '');
        setSuccess(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        setTimeout(() => {
          if (data.whatsapp_redirect_url) {
            window.open(data.whatsapp_redirect_url, '_blank');
          }
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      const waMsg = encodeURIComponent(`Hi Mankotia Holidays! I want to inquire about ${formData.destination}. Name: ${formData.name}, Phone: ${formData.phone}`);
      window.open(`https://wa.me/919816461616?text=${waMsg}`, '_blank');
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: '#94A3B8',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Content */}
        {!success ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge-gold">
                <Sparkles size={12} /> Instant Travel Inquiry
              </span>
            </div>

            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>
              Get Customized Package & Best Quote
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#94A3B8', marginBottom: '24px' }}>
              Fill in your details below. We record your inquiry in our database and send customized PDF vouchers & discounts directly on WhatsApp.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                
                {/* Full Name */}
                <div className="form-input-group">
                  <label><User size={14} color="#F59E0B" /> Full Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Ramesh Chandra"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="form-input-group">
                  <label><Phone size={14} color="#F59E0B" /> WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="e.g. 9876543210"
                    inputMode="numeric"
                    maxLength={10}
                    pattern="[6-9][0-9]{9}"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                    required
                  />
                </div>

              </div>

              <div className="form-input-group" style={{ marginBottom: '16px' }}>
                <label><Mail size={14} color="#F59E0B" /> Email Address *</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="e.g. ramesh@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              {/* Destination / Yatra Attractive Visual Selector */}
              <div className="form-input-group" style={{ marginBottom: '18px' }}>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 700, color: '#F1F5F9' }}>
                    <MapPin size={16} color="#F59E0B" /> Destination / Yatra Selection *
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#FCD34D', fontWeight: 600 }}>
                    {VISUAL_DESTINATIONS.length}+ Curated Destinations
                  </span>
                </label>

                {/* Active Showcase Card */}
                {(() => {
                  const currentMeta = VISUAL_DESTINATIONS.find(d => 
                    d.title === formData.destination || 
                    (formData.destination && formData.destination.includes(d.title)) || 
                    (formData.destination && d.subtitle.includes(formData.destination)) ||
                    (d.title.includes('Char Dham') && formData.destination && formData.destination.includes('Char Dham')) ||
                    (d.title.includes('Do Dham') && formData.destination && formData.destination.includes('Do Dham')) ||
                    (d.title.includes('Kedarnath') && formData.destination && formData.destination.includes('Kedarnath')) ||
                    (d.title.includes('Manali') && formData.destination && formData.destination.includes('Manali')) ||
                    (d.title.includes('Kashmir') && formData.destination && formData.destination.includes('Kashmir'))
                  ) || {
                    icon: formData.destination ? '📍' : '🗺️',
                    title: formData.destination || 'Click to Select Destination / Tour *',
                    subtitle: formData.destination ? 'Personalized Himalayan holiday crafted by Mankotia Holidays' : 'Tap here to browse all 18 curated tours or type custom destination',
                    badge: formData.destination ? 'Selected' : 'Choose Destination',
                    days: formData.days || 4
                  };

                  return (
                    <div 
                      onClick={() => setIsDestinationDrawerOpen(!isDestinationDrawerOpen)}
                      style={{
                        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.14) 0%, rgba(15, 23, 42, 0.95) 100%)',
                        border: '1.5px solid rgba(245, 158, 11, 0.45)',
                        borderRadius: '12px',
                        padding: '12px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        cursor: 'pointer',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35), 0 0 15px rgba(245, 158, 11, 0.1)',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
                        <div style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '10px',
                          background: 'rgba(245, 158, 11, 0.2)',
                          border: '1px solid rgba(245, 158, 11, 0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.6rem',
                          flexShrink: 0
                        }}>
                          {currentMeta.icon}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '2px' }}>
                            <span style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.2px' }}>
                              {formData.destination}
                            </span>
                            <span style={{
                              background: 'rgba(245, 158, 11, 0.25)',
                              color: '#FCD34D',
                              border: '1px solid rgba(245, 158, 11, 0.4)',
                              padding: '2px 8px',
                              borderRadius: '10px',
                              fontSize: '0.72rem',
                              fontWeight: 700
                            }}>
                              {currentMeta.badge || 'Selected'}
                            </span>
                          </div>
                          <p style={{ margin: 0, fontSize: '0.76rem', color: '#94A3B8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {currentMeta.subtitle}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        style={{
                          background: isDestinationDrawerOpen ? 'rgba(245, 158, 11, 0.3)' : 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(245, 158, 11, 0.4)',
                          color: '#FCD34D',
                          padding: '7px 12px',
                          borderRadius: '8px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          flexShrink: 0,
                          cursor: 'pointer'
                        }}
                      >
                        <Compass size={14} />
                        <span>{isDestinationDrawerOpen ? 'Hide Choices' : 'Browse All (18 Choices)'}</span>
                        {isDestinationDrawerOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </div>
                  );
                })()}

                {/* Quick 1-Click Select Pills Bar */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
                  {QUICK_DESTINATION_PILLS.map((qDest, qIdx) => {
                    const isSelected = formData.destination === qDest.value || formData.destination.includes(qDest.label);
                    return (
                      <button
                        key={qIdx}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, destination: qDest.value }));
                          const found = VISUAL_DESTINATIONS.find(d => d.title.includes(qDest.label) || qDest.value.includes(d.title));
                          if (found && found.days) {
                            setFormData(prev => ({ ...prev, destination: qDest.value, days: found.days }));
                          }
                        }}
                        style={{
                          padding: '4px 10px',
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          borderRadius: '14px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          background: isSelected ? 'rgba(245, 158, 11, 0.3)' : 'rgba(255, 255, 255, 0.04)',
                          border: isSelected ? '1px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.1)',
                          color: isSelected ? '#FCD34D' : '#CBD5E1',
                          boxShadow: isSelected ? '0 0 10px rgba(245, 158, 11, 0.25)' : 'none'
                        }}
                      >
                        {qDest.label}
                      </button>
                    );
                  })}
                </div>

                {/* Visual Destination Card Gallery Drawer */}
                {isDestinationDrawerOpen && (
                  <div style={{
                    marginTop: '12px',
                    padding: '16px',
                    background: '#0B132B',
                    border: '1px solid rgba(245, 158, 11, 0.35)',
                    borderRadius: '12px',
                    boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.5), 0 10px 30px rgba(0, 0, 0, 0.5)',
                    animation: 'fadeIn 0.25s ease-out'
                  }}>
                    {/* Category Tabs & Search Row */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
                      
                      {/* Search Input */}
                      <div style={{ position: 'relative' }}>
                        <Search size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                          type="text"
                          className="form-control"
                          style={{ paddingLeft: '36px', height: '38px', fontSize: '0.85rem', background: '#0F172A', borderColor: 'rgba(255, 255, 255, 0.15)' }}
                          placeholder="Search destination, yatra, circuit or state..."
                          value={destinationSearch}
                          onChange={(e) => setDestinationSearch(e.target.value)}
                        />
                        {destinationSearch && (
                          <button 
                            type="button" 
                            onClick={() => setDestinationSearch('')}
                            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>

                      {/* Category Tabs */}
                      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
                        {['All', 'Char Dham', 'Uttarakhand', 'Himachal', 'Kashmir', 'Rajasthan', 'Goa & Kerala', 'Custom'].map((tab) => (
                          <button
                            key={tab}
                            type="button"
                            onClick={() => setSelectedCategoryTab(tab)}
                            style={{
                              padding: '5px 12px',
                              fontSize: '0.76rem',
                              fontWeight: 700,
                              whiteSpace: 'nowrap',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              background: selectedCategoryTab === tab ? '#F59E0B' : 'rgba(255, 255, 255, 0.06)',
                              color: selectedCategoryTab === tab ? '#0B1120' : '#CBD5E1',
                              border: selectedCategoryTab === tab ? '1px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.08)'
                            }}
                          >
                            {tab === 'All' ? '🌟 All (18)' : tab}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Cards Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
                      gap: '10px',
                      maxHeight: '280px',
                      overflowY: 'auto',
                      paddingRight: '4px'
                    }}>
                      {VISUAL_DESTINATIONS
                        .filter(item => {
                          const matchesTab = selectedCategoryTab === 'All' || item.tab === selectedCategoryTab;
                          const matchesSearch = !destinationSearch || 
                            item.title.toLowerCase().includes(destinationSearch.toLowerCase()) || 
                            item.subtitle.toLowerCase().includes(destinationSearch.toLowerCase()) || 
                            item.category.toLowerCase().includes(destinationSearch.toLowerCase());
                          return matchesTab && matchesSearch;
                        })
                        .map((dest) => {
                          const isSelected = formData.destination === dest.title || formData.destination.includes(dest.title) || dest.title.includes(formData.destination);
                          return (
                            <div
                              key={dest.id}
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  destination: dest.title,
                                  days: dest.days || prev.days
                                }));
                              }}
                              style={{
                                background: isSelected 
                                  ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(15, 23, 42, 0.95) 100%)' 
                                  : 'rgba(15, 23, 42, 0.75)',
                                border: isSelected ? '1.5px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '10px',
                                padding: '10px 12px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px',
                                boxShadow: isSelected ? '0 0 14px rgba(245, 158, 11, 0.25)' : 'none'
                              }}
                            >
                              {/* Top Badge & Duration */}
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <span style={{ fontSize: '1.2rem' }}>{dest.icon}</span>
                                  <span style={{
                                    fontSize: '0.68rem',
                                    fontWeight: 700,
                                    color: isSelected ? '#FCD34D' : '#94A3B8',
                                    background: 'rgba(255, 255, 255, 0.06)',
                                    padding: '1px 6px',
                                    borderRadius: '6px'
                                  }}>
                                    {dest.badge}
                                  </span>
                                </div>
                                <span style={{
                                  fontSize: '0.7rem',
                                  fontWeight: 700,
                                  color: '#06B6D4',
                                  background: 'rgba(6, 182, 212, 0.12)',
                                  padding: '2px 7px',
                                  borderRadius: '6px'
                                }}>
                                  ⏱️ {dest.days} Days
                                </span>
                              </div>

                              {/* Title */}
                              <div style={{
                                fontSize: '0.88rem',
                                fontWeight: 800,
                                color: isSelected ? '#FFFFFF' : '#E2E8F0',
                                lineHeight: '1.25'
                              }}>
                                {dest.title}
                              </div>

                              {/* Subtitle */}
                              <div style={{
                                fontSize: '0.73rem',
                                color: '#94A3B8',
                                lineHeight: '1.3'
                              }}>
                                {dest.subtitle}
                              </div>

                              {/* Active Checkmark Pill */}
                              {isSelected && (
                                <div style={{
                                  position: 'absolute',
                                  top: '8px',
                                  right: '8px',
                                  width: '18px',
                                  height: '18px',
                                  borderRadius: '50%',
                                  background: '#F59E0B',
                                  color: '#0B1120',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  <Check size={12} strokeWidth={3} />
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>

                    {/* Custom Destination Option Input */}
                    <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <label style={{ fontSize: '0.78rem', color: '#CBD5E1', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                        ✨ Don't see your destination? Type custom destination:
                      </label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          className="form-control"
                          style={{ fontSize: '0.84rem', height: '36px', background: '#0F172A' }}
                          placeholder="e.g. Spiti Valley, Ayodhya & Varanasi, Leh Ladakh..."
                          value={formData.destination}
                          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        />
                        <button
                          type="button"
                          onClick={() => setIsDestinationDrawerOpen(false)}
                          style={{
                            padding: '0 14px',
                            background: '#F59E0B',
                            color: '#0B1120',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            cursor: 'pointer'
                          }}
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                
                {/* Travelers */}
                <div className="form-input-group">
                  <label><Users size={14} color="#F59E0B" /> Travel Group</label>
                  <select
                    className="form-control"
                    value={formData.travelers}
                    onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                  >
                    <option value="1 Person (Solo)" style={{ background: '#111A2E' }}>1 Person (Solo)</option>
                    <option value="2 Adults (Couple)" style={{ background: '#111A2E' }}>2 Adults (Couple)</option>
                    <option value="Family (3-5 People)" style={{ background: '#111A2E' }}>Family (3-5 People)</option>
                    <option value="Group (6-12 People)" style={{ background: '#111A2E' }}>Group (6-12 People)</option>
                    <option value="Senior Citizens Group" style={{ background: '#111A2E' }}>Senior Citizens Group</option>
                  </select>
                </div>

                {/* Children */}
                <div className="form-input-group">
                  <label><Users size={14} color="#F59E0B" /> Children *</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="form-control"
                    value={formData.children}
                    onChange={(e) => {
                      const count = Math.max(0, Number(e.target.value) || 0);
                      setFormData({ ...formData, children: count, child_ages: Array.from({ length: count }, (_, index) => formData.child_ages[index] || '') });
                    }}
                    required
                  />
                  {formData.child_ages.length > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '8px', marginTop: '8px' }}>
                      {formData.child_ages.map((age, index) => (
                        <input
                          key={index}
                          type="number"
                          min="0"
                          max="17"
                          className="form-control"
                          placeholder={`Child ${index + 1} age`}
                          value={age}
                          onChange={(e) => {
                            const childAges = [...formData.child_ages];
                            childAges[index] = e.target.value;
                            setFormData({ ...formData, child_ages: childAges });
                          }}
                          required
                        />
                      ))}
                    </div>
                  )}
                  <small style={{ display: 'block', marginTop: '6px', color: '#FCD34D', fontSize: '0.75rem' }}>
                    Children below 5 years are complimentary.
                  </small>
                </div>

              </div>

              {/* Travel Date */}
              <div className="form-input-group" style={{ marginBottom: '16px' }}>
                <label><Calendar size={14} color="#F59E0B" /> Date of Journey *</label>
                <input
                  type="date"
                  min={getTodayDateString()}
                  className="form-control"
                  style={isPastJourneyDate(formData.travel_date) ? { borderColor: '#EF4444', background: 'rgba(239, 68, 68, 0.1)', boxShadow: '0 0 0 1px #EF4444' } : {}}
                  placeholder="Select journey date"
                  value={formData.travel_date}
                  onChange={(e) => setFormData({ ...formData, travel_date: e.target.value })}
                  required
                />
                {isPastJourneyDate(formData.travel_date) && (
                  <div style={{
                    marginTop: '8px',
                    padding: '8px 12px',
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    borderRadius: '8px',
                    color: '#FCA5A5',
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    lineHeight: '1.4'
                  }}>
                    <AlertCircle size={16} color="#EF4444" style={{ flexShrink: 0 }} />
                    <span>
                      <strong>Please enter a valid date for journey:</strong> The selected date is before the present date ({new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}). Please select a valid current or upcoming date.
                    </span>
                  </div>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div className="form-input-group">
                  <label>Pickup *</label>
                  <input type="text" className="form-control" placeholder="e.g. Haridwar / Delhi / Airport" value={formData.pickup} onChange={(e) => setFormData({ ...formData, pickup: e.target.value })} required />
                </div>
                <div className="form-input-group">
                  <label>Drop *</label>
                  <input type="text" className="form-control" placeholder="e.g. Dehradun / Haridwar / Delhi" value={formData.drop} onChange={(e) => setFormData({ ...formData, drop: e.target.value })} required />
                </div>
                <div className="form-input-group">
                  <label>Tour Days *</label>
                  <input type="number" min="1" max="60" className="form-control" value={formData.days} onChange={(e) => setFormData({ ...formData, days: e.target.value })} required />
                </div>
                <div className="form-input-group">
                  <label>Persons *</label>
                  <input type="number" min="1" max="1000" className="form-control" value={formData.number_of_persons} onChange={(e) => setFormData({ ...formData, number_of_persons: e.target.value })} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div className="form-input-group">
                  <label>Vehicle Category *</label>
                  <select className="form-control" value={formData.vehicle_category} onChange={(e) => setFormData({ ...formData, vehicle_category: e.target.value })} required>
                    <option>Sedan Car</option>
                    <option>SUV / MUV</option>
                    <option>Tempo Traveller</option>
                    <option>Mini Bus</option>
                    <option>Large Bus</option>
                    <option>No Vehicle Required</option>
                  </select>
                </div>
                <div className="form-input-group">
                  <label>Rooms Required *</label>
                  <input type="number" min="1" max="500" className="form-control" value={formData.rooms_required} onChange={(e) => setFormData({ ...formData, rooms_required: e.target.value })} required />
                </div>
                <div className="form-input-group">
                  <label>Meal Plan *</label>
                  <select className="form-control" value={formData.meal_plan} onChange={(e) => setFormData({ ...formData, meal_plan: e.target.value })} required>
                    <option>Breakfast Only (CP)</option>
                    <option>Breakfast and Dinner (MAP)</option>
                    <option>Breakfast, Lunch and Dinner (AP)</option>
                    <option>No Meals</option>
                  </select>
                </div>
                <div className="form-input-group">
                  <label>Hotel Category *</label>
                  <select className="form-control" value={formData.hotel_category} onChange={(e) => setFormData({ ...formData, hotel_category: e.target.value })} required>
                    <option>Budget</option>
                    <option>3 Star</option>
                    <option>4 Star</option>
                    <option>5 Star</option>
                    <option>Luxury Resort</option>
                  </select>
                </div>
              </div>

              {/* Special Notes */}
              <div className="form-input-group" style={{ marginBottom: '24px' }}>
                <label>Special Requests (Helicopter, Senior Citizen Care, Satvik Food)</label>
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="e.g. Need helicopter tickets from Phata, ground floor rooms, pure satvik meals..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary-gold btn-lg"
                style={{ width: '100%' }}
                disabled={loading}
              >
                {loading ? (
                  <span>Saving Inquiry...</span>
                ) : (
                  <>
                    <span>Submit & Get WhatsApp Quote</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <div style={{ textAlign: 'center', marginTop: '14px', fontSize: '0.8rem', color: '#64748B' }}>
                🔒 Your contact details are 100% private and saved securely in our local database.
              </div>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#10B981',
              margin: '0 auto 20px',
              border: '2px solid rgba(16, 185, 129, 0.4)'
            }}>
              <CheckCircle2 size={40} />
            </div>

            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '10px' }}>
              Inquiry Successfully Recorded!
            </h3>

            <p style={{ fontSize: '0.92rem', color: '#CBD5E1', marginBottom: '20px', lineHeight: 1.6 }}>
              Thank you, <strong>{formData.name}</strong>! Your travel inquiry for <strong>{formData.destination}</strong> has been logged into our private database. 
              Our senior holiday planner is connecting with you on WhatsApp right now.
            </p>

            {/* Optional Token Advance Box */}
            <div style={{
              background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.12) 0%, rgba(17, 26, 46, 0.8) 100%)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              borderRadius: '14px',
              padding: '16px 20px',
              marginBottom: '22px',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ fontWeight: 800, color: '#F59E0B', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={16} /> Optional: Lock Your Travel Dates Instantly
                </div>
                <span className="badge-gold" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                  ₹2,000 Token Advance
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#CBD5E1', margin: '0 0 10px', lineHeight: 1.45 }}>
                To immediately reserve vehicle & hotel allocations for peak 2026 yatra dates, pay a token advance via UPI/GPay/PhonePe:
              </p>
              <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '8px 12px', borderRadius: '8px', fontSize: '0.82rem', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <span>Official UPI ID: <strong style={{ color: '#FCD34D' }}>9816461616@upi</strong></span>
                <span style={{ color: '#10B981', fontWeight: 600 }}>Name: Mankotia Holidays</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href={whatsappUrl || 'https://wa.me/919816461616'}
                target="_blank"
                className="btn btn-whatsapp"
              >
                <MessageCircle size={18} />
                <span>Open WhatsApp Chat & Confirm</span>
              </a>

              <button
                onClick={() => { setSuccess(false); onClose(); }}
                className="btn btn-call"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
