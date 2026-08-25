import React, { useRef } from 'react';
import { 
  ShieldCheck, 
  FileCheck, 
  HeartPulse, 
  Plane, 
  CheckCircle2, 
  Phone, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight, 
  Utensils, 
  HeartHandshake, 
  CloudRain, 
  Compass, 
  Sparkles 
} from 'lucide-react';

export default function YatraGuide({ onOpenInquiry }) {
  const sliderRef = useRef(null);

  const scrollSlider = (direction) => {
    const el = sliderRef.current;
    if (el) {
      const scrollStep = 320;
      const maxScroll = el.scrollWidth - el.clientWidth;

      if (direction === 'right') {
        if (el.scrollLeft >= maxScroll - 20) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: scrollStep, behavior: 'smooth' });
        }
      } else {
        if (el.scrollLeft <= 20) {
          el.scrollTo({ left: maxScroll, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: -scrollStep, behavior: 'smooth' });
        }
      }
    }
  };

  const advisories = [
    {
      icon: <FileCheck size={26} color="#F59E0B" />,
      title: "1. Biometric Yatra e-Pass",
      badge: "Mandatory",
      badgeColor: "#F59E0B",
      desc: "Mandatory biometric registration by Uttarakhand Tourism. Mankotia Holidays provides complete doorstep assistance with online registration, QR slip verification, and wristband issuance.",
      actionText: "Get e-Pass Help"
    },
    {
      icon: <HeartPulse size={26} color="#EF4444" />,
      title: "2. High Altitude Fitness",
      badge: "Health Advisory",
      badgeColor: "#EF4444",
      desc: "Kedarnath (11,750 ft) & Badrinath (10,200 ft) are high-altitude zones. Regular 20-min daily brisk walks 3 weeks prior, deep hydration, and carrying Diamox & personal meds are highly advised.",
      actionText: "Medical Tips"
    },
    {
      icon: <Plane size={26} color="#06B6D4" />,
      title: "3. Helicopter Guidelines",
      badge: "Heli Slots",
      badgeColor: "#06B6D4",
      desc: "Heli-shuttles operate from Phata, Sirsi, and Guptkashi. Maximum passenger baggage is 5kg per person. Boarding slot management and verification handled directly by our ground team.",
      actionText: "Heli Tickets"
    },
    {
      icon: <ShieldCheck size={26} color="#10B981" />,
      title: "4. VIP Swarna Darshan",
      badge: "VIP Puja",
      badgeColor: "#10B981",
      desc: "Special Swarna Aarti, Rudrabhishek at Kedarnath, and Mahabhishek at Badrinath Ji are coordinated with authorized temple priest trusts for undisturbed, peaceful worship.",
      actionText: "Book VIP Darshan"
    },
    {
      icon: <Utensils size={26} color="#F59E0B" />,
      title: "5. 100% Satvik Meals",
      badge: "Pure Vegetarian",
      badgeColor: "#F59E0B",
      desc: "Fresh, hygienic, pure vegetarian and Satvik bhojan (no onion, no garlic on request) served hot at every hill halt to maintain light digestion and high energy.",
      actionText: "Satvik Menu"
    },
    {
      icon: <HeartHandshake size={26} color="#A78BFA" />,
      title: "6. Senior & Palki Care",
      badge: "Elderly Care",
      badgeColor: "#A78BFA",
      desc: "Pre-booking of certified pony, palki, and kandi porters for elderly pilgrims. Guaranteed ground-floor hotel room allocations and on-demand medical oxygen support.",
      actionText: "Elderly Assistance"
    },
    {
      icon: <CloudRain size={26} color="#38BDF8" />,
      title: "7. Woolen & Rain Gear",
      badge: "Weather Kit",
      badgeColor: "#38BDF8",
      desc: "High Himalayan weather changes quickly. Carry 3-layer thermal wear, waterproof hiking boots with rubber treads, windcheaters, and heavy-duty rain ponchos.",
      actionText: "Packing Guide"
    },
    {
      icon: <Compass size={26} color="#10B981" />,
      title: "8. 24/7 Mountain SOS",
      badge: "24/7 Support",
      badgeColor: "#10B981",
      desc: "Dedicated ground coordinators stationed at Haridwar, Guptkashi, Sonprayag, Joshimath, and Badrinath for round-the-clock road logistics and medical assistance.",
      actionText: "24/7 Helpline"
    }
  ];

  const packingItems = [
    "Heavy fleece jacket, windcheater & thermal innerwear (3 layers)",
    "Waterproof trekking boots with deep rubber treads & woolen socks",
    "Lightweight rain poncho or sturdy windproof travel umbrella",
    "Personal first-aid kit (pain relief spray, Diamox, band-aids, glucose)",
    "Original Aadhar Card / Gov ID with 3 printed photocopies",
    "Power bank (minimum 20,000 mAh) & insulated thermos water flask",
    "UV protection sunglasses & high SPF 50+ sunscreen",
    "Sufficient cash (limited working ATMs in Sonprayag & Kedarnath)"
  ];

  return (
    <section id="yatra-guide" className="section-padding" style={{
      background: 'linear-gradient(180deg, #111A2E 0%, #0B1120 100%)',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Section Header & Slider Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
          marginBottom: '20px'
        }}>
          <div>
            <div className="badge-wrap">
              <span className="badge-saffron">
                <ShieldCheck size={14} /> Pilgrim Advisory & Rules 2026
              </span>
            </div>
            <h2 style={{ margin: '6px 0 8px', fontSize: 'clamp(1.7rem, 4vw, 2.3rem)' }}>
              Essential <span className="text-gradient-gold">Yatra Preparation Guide</span>
            </h2>
            <p style={{ margin: 0, maxWidth: '650px', fontSize: '0.92rem', color: '#94A3B8' }}>
              Mandatory registrations, high-altitude health advisories, helicopter guidelines, and Satvik care for a safe Char Dham pilgrimage.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => scrollSlider('left')}
              className="btn btn-outline"
              style={{
                width: '42px',
                height: '42px',
                padding: 0,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: 'rgba(245, 158, 11, 0.3)',
                color: '#F59E0B',
                background: 'rgba(15, 23, 42, 0.8)'
              }}
              title="Previous Advisory"
              aria-label="Previous Advisory"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollSlider('right')}
              className="btn btn-outline"
              style={{
                width: '42px',
                height: '42px',
                padding: 0,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: 'rgba(245, 158, 11, 0.3)',
                color: '#F59E0B',
                background: 'rgba(15, 23, 42, 0.8)'
              }}
              title="Next Advisory (Continuous Loop)"
              aria-label="Next Advisory"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Continuous Horizontal Advisory Slider */}
        <div
          ref={sliderRef}
          style={{
            display: 'flex',
            gap: '20px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingBottom: '20px',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {advisories.map((step, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                flex: '0 0 300px',
                maxWidth: '300px',
                scrollSnapAlign: 'start',
                padding: '24px 22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                borderRadius: '16px',
                border: '1px solid rgba(245, 158, 11, 0.2)',
                background: 'linear-gradient(180deg, rgba(17, 26, 46, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)'
              }}
            >
              <div>
                {/* Top Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {step.icon}
                  </div>

                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '3px 9px',
                    borderRadius: 'var(--radius-full)',
                    background: `${step.badgeColor}22`,
                    color: step.badgeColor,
                    border: `1px solid ${step.badgeColor}44`
                  }}>
                    {step.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px', lineHeight: 1.3 }}>
                  {step.title}
                </h3>

                <p style={{ fontSize: '0.84rem', color: '#94A3B8', lineHeight: 1.6, margin: 0 }}>
                  {step.desc}
                </p>
              </div>

              {/* Action Button */}
              <div style={{ marginTop: '18px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <button
                  type="button"
                  onClick={() => onOpenInquiry({
                    destination: 'Char Dham Preparation Consultation',
                    notes: `Inquiry regarding ${step.title} (${step.badge})`
                  })}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#F59E0B',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: 0
                  }}
                >
                  <span>{step.actionText}</span>
                  <CheckCircle2 size={13} />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div style={{ textAlign: 'center', marginBottom: '22px', color: '#64748B', fontSize: '0.75rem' }}>
          <span>👈 Swipe or click arrows to view all 8 mandatory preparation guides (loops continuously) 👉</span>
        </div>

        {/* Packing Checklist Box */}
        <div className="glass-panel" style={{
          padding: '22px 24px',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          maxWidth: '1000px',
          margin: '0 auto',
          borderRadius: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
                🎒 High Altitude Himalayan Packing Checklist
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#94A3B8', margin: '4px 0 0' }}>
                Recommended essentials for Yamunotri, Kedarnath, Badrinath, Auli & Chopta
              </p>
            </div>

            <button
              onClick={() => onOpenInquiry({ destination: 'Char Dham Yatra Consultation' })}
              className="btn btn-outline-gold btn-sm"
              style={{ fontSize: '0.8rem', padding: '6px 14px' }}
            >
              Get Free Yatra Consultation
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '12px'
          }}>
            {packingItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B', marginTop: '2px', flexShrink: 0 }}>
                  <CheckCircle2 size={12} strokeWidth={3} />
                </div>
                <span style={{ fontSize: '0.84rem', color: '#E2E8F0', lineHeight: 1.4 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
