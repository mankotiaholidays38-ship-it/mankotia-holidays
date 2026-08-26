import React, { useRef } from 'react';
import { 
  ShieldCheck, 
  HeartHandshake, 
  Compass, 
  Award, 
  Clock, 
  Utensils, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  HeartPulse, 
  FileCheck 
} from 'lucide-react';

export default function WhyChooseUs() {
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

  const perks = [
    {
      icon: <Award size={26} color="#F59E0B" />,
      title: "India's Largest Hotel Network & Reviews",
      badge: "10,000+ Reviews",
      desc: "Widest collection of verified hotels, mountain cottages, and luxury camps with authentic guest reviews so you always choose the perfect stay."
    },
    {
      icon: <Compass size={26} color="#38BDF8" />,
      title: "All-in-One Multi-Modal Travel",
      badge: "Flights • Trains • Buses • Cabs",
      desc: "Seamless one-stop booking for flight tickets, Tatkal train assistance, Volvo AC buses, and sanitized chauffeur-driven mountain cabs."
    },
    {
      icon: <Award size={26} color="#F59E0B" />,
      title: "10+ Years Himalayan Mastery",
      badge: "Proven Heritage",
      desc: "Deep-rooted expertise in Garhwal & Kumaon terrain, real-time mountain weather monitoring, and priority slot reservations."
    },
    {
      icon: <Utensils size={26} color="#10B981" />,
      title: "100% Satvik Food Assurance",
      badge: "Pure Veg / Jain",
      desc: "Fresh, hygienic, pure vegetarian and Satvik bhojan (no onion, no garlic on request) served hot at every halt of your sacred journey."
    },
    {
      icon: <ShieldCheck size={26} color="#06B6D4" />,
      title: "Verified Mountain Drivers & Cabs",
      badge: "100% Safe Driving",
      desc: "Licensed hilly-terrain chauffeurs with sanitized vehicles (Innova Crysta, Ertiga, AC Tempo Travellers) and safety first-aid kits."
    },
    {
      icon: <HeartHandshake size={26} color="#A78BFA" />,
      title: "Senior Citizens & Family Care",
      badge: "Special Assistance",
      desc: "Guaranteed ground floor hotel rooms, wheelchair assistance, pony/palki pre-booking, and compassionate elderly yatra support."
    },
    {
      icon: <Clock size={26} color="#F59E0B" />,
      title: "24/7 Real-Time Ground Help",
      badge: "Live Field Support",
      desc: "On-ground coordinators stationed at Haridwar, Guptkashi, Sonprayag, Joshimath, and Badrinath to assist you anytime."
    },
    {
      icon: <Compass size={26} color="#10B981" />,
      title: "Transparent & Best Price Guarantee",
      badge: "Zero Hidden Costs",
      desc: "Clear upfront quotes with all tolls, state permits, parking, driver night allowances, and taxes included. No surprise fees."
    },
    {
      icon: <HeartPulse size={26} color="#EF4444" />,
      title: "Emergency Oxygen & Medical Aid",
      badge: "High Altitude Safety",
      desc: "High-altitude medical first-aid kits, emergency portable oxygen canisters, and direct tie-ups with district hill dispensaries."
    },
    {
      icon: <FileCheck size={26} color="#38BDF8" />,
      title: "Biometric e-Pass & VIP Darshan",
      badge: "Hassle-Free Entry",
      desc: "Complete registration guidance for Uttarakhand Tourism e-Pass, Kedarnath Heli ticket coordination, and special puja support."
    }
  ];

  return (
    <section id="why-us" className="section-padding" style={{
      background: 'linear-gradient(180deg, #0B1120 0%, #111A2E 100%)',
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
              <span className="badge-gold">
                <CheckCircle2 size={14} /> Trust & Excellence
              </span>
            </div>
            <h2 style={{ margin: '6px 0 8px', fontSize: 'clamp(1.7rem, 4vw, 2.3rem)' }}>
              Why Devotees Choose <span className="text-gradient-gold">Mankotia Holidays</span>
            </h2>
            <p style={{ margin: 0, maxWidth: '650px', fontSize: '0.92rem', color: '#94A3B8' }}>
              We don't just book tours — we take personal responsibility for your safety, comfort, and spiritual fulfillment every mile of the way.
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
              title="Previous Perk"
              aria-label="Previous Perk"
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
              title="Next Perk (Continuous Loop)"
              aria-label="Next Perk"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Continuous Horizontal Perks Slider */}
        <div
          ref={sliderRef}
          style={{
            display: 'flex',
            gap: '20px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingBottom: '16px',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {perks.map((p, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                flex: '0 0 300px',
                maxWidth: '300px',
                scrollSnapAlign: 'start',
                padding: '26px 22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: '16px',
                border: '1px solid rgba(245, 158, 11, 0.2)',
                background: 'linear-gradient(180deg, rgba(17, 26, 46, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {p.icon}
                  </div>

                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(245, 158, 11, 0.12)',
                    color: '#FCD34D',
                    border: '1px solid rgba(245, 158, 11, 0.25)'
                  }}>
                    {p.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px', lineHeight: 1.3 }}>
                  {p.title}
                </h3>

                <p style={{ fontSize: '0.84rem', color: '#94A3B8', lineHeight: 1.6, margin: 0 }}>
                  {p.desc}
                </p>
              </div>

              <div style={{ marginTop: '16px', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981', fontSize: '0.76rem', fontWeight: 600 }}>
                <CheckCircle2 size={13} />
                <span>Verified Mankotia Promise</span>
              </div>

            </div>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div style={{ textAlign: 'center', marginTop: '10px', color: '#64748B', fontSize: '0.75rem' }}>
          <span>👈 Swipe or click arrows to explore all Mankotia promises (loops continuously) 👉</span>
        </div>

      </div>
    </section>
  );
}
