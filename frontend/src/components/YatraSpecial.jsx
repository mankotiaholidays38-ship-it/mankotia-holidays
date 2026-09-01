import React, { useState } from 'react';
import { MapPin, Check, ArrowRight, Compass, ChevronDown, ChevronUp, Calendar, Sparkles, Mountain, Plane, MessageCircle, ShieldCheck } from 'lucide-react';
import { YATRA_TIMELINE } from '../data/packagesData';

export default function YatraSpecial({ onOpenInquiry }) {
  const [activeTab, setActiveTab] = useState('chardham');
  const [showRouteItinerary, setShowRouteItinerary] = useState(false);

  const yatraPackages = {
    chardham: {
      title: "Sacred Char Dham Yatra Deluxe Tour (10N / 11D)",
      subtitle: "Yamunotri • Gangotri • Kedarnath • Badrinath",
      price: "Price On Request",
      badge: "Complete Spiritual Circuit",
      image: "/images/packages/kedarnath_temple.jpg",
      description: "Our flagship pilgrimage package covering all four sacred Himalayan shrines with comfortable stays, pure vegetarian Satvik meals, biometric yatra pass assistance, and experienced mountain drivers.",
      features: [
        "10 Nights Deluxe Hotel & Alpine Swiss Camp Stays",
        "Pure Vegetarian / Satvik Breakfast & Dinner Daily",
        "Dedicated AC Tempo Traveller / Mountain SUV (Innova/Ertiga)",
        "Biometric Registration & VIP Darshan Pass Assistance",
        "Yamunotri Holy Bath at Surya Kund & Divya Shila",
        "Gangotri Puja at Bhagirathi River Ghats",
        "Kedarnath Jyotirlinga Darshan (Heli/Trek Support)",
        "Badrinath Ji Darshan, Tapt Kund Bath & Mana First Indian Village",
        "Devprayag & Rudraprayag Sacred River Confluences View",
        "First-Aid Kit & Emergency Portable Oxygen Support"
      ]
    },
    dodham: {
      title: "Divine Do Dham Yatra: Kedarnath & Badrinath (5N / 6D)",
      subtitle: "Kedarnath Jyotirlinga & Lord Badrinath Ji",
      price: "Price On Request",
      badge: "Most Popular Pilgrimage",
      image: "/images/packages/badrinath_temple.jpg",
      description: "Ideal for travelers with limited time seeking the supreme blessings of Lord Shiva at Kedarnath and Lord Vishnu at Badrinath with Haridwar/Rishikesh pick-up and drop.",
      features: [
        "5 Nights Deluxe Hotel / Camp Accommodation",
        "Daily Hot Satvik Breakfast & Dinner",
        "Private Sanitized Mountain Vehicle with Experienced Driver",
        "Helicopter Shuttle Assistance (Phata/Sirsi/Guptkashi) or Trek Support",
        "Kedarnath Evening Swarna Maha Aarti",
        "Badrinath Temple Darshan & Tapt Kund Sulfur Bath",
        "Mana Village (Vyas Cave, Saraswati River, Bheem Pul)",
        "Scenic Mountain Passes & Confluence Views",
        "Yatra Registration & Toll/Parking Included"
      ]
    },
    heli: {
      title: "Kedarnath Dham Helicopter & VIP Express (3D / 2N)",
      subtitle: "Phata / Sirsi / Guptkashi Heli-Shuttle",
      price: "Price On Request",
      badge: "VIP Helicopter Express",
      image: "/images/packages/kedarnath_heli_shrine.jpg",
      description: "Fly directly to Kedarnath Helipad (just 500m from the temple) with confirmed helicopter shuttle tickets, priority VIP darshan guidance, and luxury resort stays.",
      features: [
        "Confirmed Helicopter Round-trip Tickets (Phata / Sirsi / Guptkashi)",
        "Priority VIP Darshan Assistance at Kedarnath Temple",
        "2 Nights Deluxe Mountain Resort / Cottage Stay",
        "All Vegetarian Meals Included (Breakfast, Lunch & Dinner)",
        "Dedicated Ground Coordinators at Helipad & Temple Top",
        "Special Rudrabhishek & Evening Aarti Assistance",
        "Airport / Railway Station Transfers from Dehradun / Haridwar",
        "Medical Oxygen & High-Altitude Acclimatization Support"
      ]
    }
  };

  const currentPkg = yatraPackages[activeTab];

  return (
    <section id="char-dham" className="section-padding" style={{
      background: 'linear-gradient(180deg, #0B1120 0%, #111A2E 50%, #0B1120 100%)',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-wrap">
            <span className="badge-saffron">
              <Sparkles size={14} /> Sacred Himalayan Pilgrimages
            </span>
          </div>
          <h2>
            Char Dham & Do Dham <span className="text-gradient-gold">Yatra 2026</span>
          </h2>
          <p>
            Embark on a sacred journey of faith and devotion in the abode of gods (Devbhoomi Uttarakhand). 
            All-inclusive packages with VIP Darshan, helicopter options, satvik meals, and verified hill drivers.
          </p>
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '22px' }}>
          <div style={{
            display: 'inline-flex',
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '4px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-light)',
            gap: '4px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => setActiveTab('chardham')}
              style={{
                padding: '8px 18px',
                borderRadius: 'var(--radius-full)',
                background: activeTab === 'chardham' ? 'var(--primary-gold)' : 'transparent',
                color: activeTab === 'chardham' ? '#0F172A' : '#CBD5E1',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.86rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Mountain size={15} /> Char Dham (10N/11D)
            </button>

            <button
              onClick={() => setActiveTab('dodham')}
              style={{
                padding: '8px 18px',
                borderRadius: 'var(--radius-full)',
                background: activeTab === 'dodham' ? 'var(--primary-gold)' : 'transparent',
                color: activeTab === 'dodham' ? '#0F172A' : '#CBD5E1',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.86rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Mountain size={15} /> Do Dham (5N/6D)
            </button>

            <button
              onClick={() => setActiveTab('heli')}
              style={{
                padding: '8px 18px',
                borderRadius: 'var(--radius-full)',
                background: activeTab === 'heli' ? 'var(--primary-gold)' : 'transparent',
                color: activeTab === 'heli' ? '#0F172A' : '#CBD5E1',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.86rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Plane size={15} /> Kedarnath Heli (3D/2N)
            </button>
          </div>
        </div>

        {/* Featured Yatra Card */}
        <div className="glass-panel" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          padding: '36px',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(245, 158, 11, 0.1)',
          marginBottom: '60px'
        }}>
          
          {/* Left Column: Image & Quick Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              height: '320px',
              border: '1px solid var(--border-light)'
            }}>
              <img 
                src={currentPkg.image} 
                alt={currentPkg.title}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px'
              }}>
                <span className="badge-gold">
                  {currentPkg.badge}
                </span>
              </div>
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px',
                background: 'linear-gradient(to top, rgba(11, 17, 32, 0.95), transparent)'
              }}>
                <div style={{ fontSize: '0.85rem', color: '#FCD34D', fontWeight: 600 }}>
                  <MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  {currentPkg.subtitle}
                </div>
              </div>
            </div>

            {/* Price Box */}
            <div style={{
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F59E0B', fontWeight: 700, fontSize: '0.95rem' }}>
                <Sparkles size={18} />
                <span>Custom All-Inclusive Pilgrimage Package</span>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => onOpenInquiry({
                    destination: currentPkg.title,
                    notes: `Selected itinerary: ${currentPkg.title} | Duration: ${currentPkg.duration} | Requesting Custom Quote`
                  })}
                  className="btn btn-primary-gold"
                >
                  Book Yatra Now
                </button>
                <a
                  href={`https://wa.me/919816461616?text=${encodeURIComponent(`Hi Mankotia Holidays! I want to inquire about ${currentPkg.title}. Please share available dates and best price quote.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  title="Inquire on WhatsApp"
                >
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Description & Inclusions List */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '12px', color: '#FFFFFF' }}>
                {currentPkg.title}
              </h3>
              <p style={{ fontSize: '1rem', color: '#CBD5E1', marginBottom: '24px', lineHeight: 1.6 }}>
                {currentPkg.description}
              </p>

              <h4 style={{ fontSize: '1rem', color: '#F59E0B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>
                Key Inclusions & Highlights:
              </h4>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '12px',
                marginBottom: '24px'
              }}>
                {currentPkg.features.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'rgba(16, 185, 129, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#10B981',
                      marginTop: '2px',
                      flexShrink: 0
                    }}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: '0.88rem', color: '#E2E8F0', lineHeight: 1.4 }}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Helpline banner */}
            <div style={{
              padding: '14px 18px',
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
                🕉️ <strong>Registration Assistance:</strong> We assist with free Uttarakhand Biometric Yatra e-Pass.
              </span>
              <a href="tel:+919816461616" style={{ fontSize: '0.85rem', color: '#F59E0B', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                Call +91 98164 61616 <ArrowRight size={14} />
              </a>
            </div>

          </div>

        </div>

        {/* Sacred Route Timeline Section (Collapsible on Click) */}
        <div style={{ marginTop: '28px' }}>
          
          {/* Header & Toggle Bar */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            borderRadius: '16px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span className="badge-cyan" style={{ fontSize: '0.72rem', padding: '3px 8px' }}>
                  <Compass size={13} /> Sacred Circuit Map
                </span>
                <span style={{ fontSize: '0.74rem', background: 'rgba(245, 158, 11, 0.15)', color: '#FCD34D', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                  5 Stages • 11 Days
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                The 4 Holy Dhams Route & Elevation
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.82rem', margin: '4px 0 0' }}>
                The traditional clockwise parikrama from West to East as prescribed by Adi Shankaracharya
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowRouteItinerary(!showRouteItinerary)}
              className="btn btn-primary-gold btn-sm"
              style={{ padding: '8px 18px', fontSize: '0.84rem', fontWeight: 700, borderRadius: '10px' }}
            >
              <Calendar size={15} />
              <span>{showRouteItinerary ? '▲ Hide Route Itinerary' : '👁️ View Sacred Route & Elevation Itinerary'}</span>
              {showRouteItinerary ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
          </div>

          {/* Collapsible Content */}
          {showRouteItinerary && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '16px',
              marginTop: '20px',
              animation: 'fadeIn 0.25s ease-out'
            }}>
              {YATRA_TIMELINE.map((item, idx) => (
                <div key={idx} className="glass-card" style={{
                  padding: '20px 18px',
                  position: 'relative',
                  borderTop: '3px solid #F59E0B',
                  borderRadius: '12px',
                  background: 'linear-gradient(180deg, rgba(17, 26, 46, 0.95) 0%, rgba(15, 23, 42, 0.85) 100%)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px'
                  }}>
                    <span style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      background: 'rgba(245, 158, 11, 0.15)',
                      color: '#F59E0B',
                      padding: '3px 9px',
                      borderRadius: 'var(--radius-full)'
                    }}>
                      {item.step}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#38BDF8', fontWeight: 700, background: 'rgba(6, 182, 212, 0.12)', padding: '2px 8px', borderRadius: '6px' }}>
                      {item.elevation}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '4px' }}>
                    {item.dham}
                  </h4>
                  <div style={{ fontSize: '0.78rem', color: '#06B6D4', fontWeight: 600, marginBottom: '8px' }}>
                    {item.river}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#CBD5E1', lineHeight: 1.5, margin: 0 }}>
                    {item.ritual}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
