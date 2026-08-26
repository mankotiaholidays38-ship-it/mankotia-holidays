import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero({ onOpenInquiry }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [sliderPaused, setSliderPaused] = useState(false);

  const tourSlides = [
    {
      category: 'Sacred Pilgrimage',
      title: 'Char Dham Yatra',
      description: 'Kedarnath, Badrinath, Gangotri and Yamunotri with complete on-ground support.',
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=85',
      accent: '#F59E0B'
    },
    {
      category: 'Himalayan Escape',
      title: 'Manali & Himachal',
      description: 'Snow valleys, scenic drives and comfortable stays for your perfect mountain break.',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=85',
      accent: '#06B6D4'
    },
    {
      category: 'Family Holidays',
      title: 'Kashmir Paradise',
      description: 'Houseboats, Gulmarg snow and unforgettable family memories in the valley.',
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=85',
      accent: '#10B981'
    },
    {
      category: 'School & College Trips',
      title: 'Learning Beyond Classrooms',
      description: 'Safe, organized educational tours with transport, stays and group coordination.',
      image: 'https://images.unsplash.com/photo-1504150558240-0b4fd8946624?auto=format&fit=crop&w=1200&q=85',
      accent: '#A78BFA'
    },
    {
      category: 'Adventure Tours',
      title: 'Auli & Chopta',
      description: 'Ski slopes, alpine trails and guided Himalayan adventures for every group.',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85',
      accent: '#FB923C'
    },
    {
      category: 'Domestic Getaways',
      title: 'Goa, Kerala & Rajasthan',
      description: 'Beach escapes, backwaters and royal heritage journeys designed around you.',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85',
      accent: '#F472B6'
    }
  ];

  useEffect(() => {
    if (sliderPaused) return undefined;
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % tourSlides.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [sliderPaused, tourSlides.length]);

  return (
    <section style={{
      position: 'relative',
      minHeight: 'auto',
      display: 'flex',
      alignItems: 'center',
      paddingTop: 'clamp(80px, 11vh, 98px)',
      paddingBottom: '32px',
      background: 'radial-gradient(ellipse at 50% 20%, rgba(30, 41, 69, 0.9) 0%, #0B1120 70%)',
      overflow: 'hidden'
    }}>
      {/* Background Decorative Mountain Silhouette / Gradient Orbs */}
      <div style={{
        position: 'absolute',
        top: '-150px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '1000px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, rgba(234, 88, 12, 0.05) 50%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '140px',
        background: 'linear-gradient(to top, #0B1120, transparent)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Top Badges */}
        <div style={{ textAlign: 'center', marginBottom: '14px' }}>
          <div className="badge-saffron" style={{ animation: 'slideUp 0.4s ease-out' }}>
            <span className="pulse-dot"></span>
            <span>Char Dham Yatra 2026 Bookings Open</span>
            <span style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '2px 8px', borderRadius: '10px', fontSize: '0.72rem', fontWeight: 700 }}>
              VIP Pass & Heli Slots
            </span>
          </div>
        </div>

        {/* Hero Main Heading */}
        <div style={{ textAlign: 'center', maxWidth: '960px', margin: '0 auto 24px' }}>
          <h1 style={{
            fontSize: 'clamp(2.1rem, 4.8vw, 3.6rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-0.8px',
            marginBottom: '14px'
          }}>
            Sacred Pilgrimages, Luxury Stays & <br />
            <span className="text-gradient-gold">Complete Travel Solutions In India</span>
          </h1>
          <p style={{
            fontSize: 'clamp(0.92rem, 1.55vw, 1.08rem)',
            color: '#E2E8F0',
            maxWidth: '860px',
            margin: '0 auto 16px',
            lineHeight: 1.6
          }}>
            <strong>Mankotia Holidays</strong>, being a leading travel platform in India, hosts the <strong>largest network of hotels, luxury cottages & verified reviews</strong> to help you choose the perfect stay at unbeatable prices.
          </p>

          {/* Clean Simple Services Line (No button styling so on phone it doesn't look like clickable buttons) */}
          <div style={{
            color: '#CBD5E1',
            fontSize: 'clamp(0.85rem, 1.3vw, 0.95rem)',
            fontWeight: 500,
            lineHeight: 1.8,
            maxWidth: '850px',
            margin: '0 auto 16px',
            textAlign: 'center'
          }}>
            <span>🚌 Volvo / Car Packages</span>
            <span style={{ color: '#F59E0B', margin: '0 8px' }}>•</span>
            <span>💑 Group & Honeymoon Tours</span>
            <span style={{ color: '#F59E0B', margin: '0 8px' }}>•</span>
            <span>✈️🚆🚌 Flights, Trains & Buses</span>
            <span style={{ color: '#F59E0B', margin: '0 8px' }}>•</span>
            <span>🚖 Taxi & Car Rentals</span>
            <span style={{ color: '#F59E0B', margin: '0 8px' }}>•</span>
            <span>🏨🏡 Hotels & Cottages</span>
            <span style={{ color: '#F59E0B', margin: '0 8px' }}>•</span>
            <span>🏕️🧗 Camping & Adventure</span>
          </div>
        </div>

        {/* Dynamic Interactive Tour Carousel Card */}
        <div 
          onMouseEnter={() => setSliderPaused(true)}
          onMouseLeave={() => setSliderPaused(false)}
          className="glass-panel"
          style={{
            position: 'relative',
            maxWidth: '1000px',
            margin: '0 auto 24px',
            minHeight: '260px',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            boxShadow: '0 14px 36px rgba(0, 0, 0, 0.45)'
          }}
        >
          {tourSlides.map((slide, index) => (
            <div
              key={slide.title}
              style={{
                position: index === activeSlide ? 'relative' : 'absolute',
                inset: 0,
                minHeight: '260px',
                display: 'flex',
                alignItems: 'center',
                opacity: index === activeSlide ? 1 : 0,
                pointerEvents: index === activeSlide ? 'auto' : 'none',
                transition: 'opacity 0.7s ease',
                backgroundImage: `linear-gradient(90deg, rgba(5, 10, 22, 0.96) 0%, rgba(5, 10, 22, 0.78) 46%, rgba(5, 10, 22, 0.15) 100%), url(${slide.image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            >
              <div style={{ maxWidth: '560px', padding: '34px 42px', textAlign: 'left' }}>
                <div style={{ color: slide.accent, fontSize: '0.76rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>
                  {slide.category}
                </div>
                <h2 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.45rem)', color: '#FFFFFF', marginBottom: '8px' }}>
                  {slide.title}
                </h2>
                <p style={{ color: '#CBD5E1', fontSize: '0.95rem', lineHeight: 1.55, marginBottom: '18px' }}>
                  {slide.description}
                </p>
                <button
                  type="button"
                  className="btn btn-primary-gold btn-sm"
                  onClick={() => onOpenInquiry && onOpenInquiry({ destination: slide.title })}
                >
                  Plan This Journey <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ))}
          <div style={{ position: 'absolute', bottom: '18px', right: '28px', display: 'flex', gap: '7px' }}>
            {tourSlides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                aria-label={`Show ${slide.title}`}
                onClick={() => setActiveSlide(index)}
                style={{
                  width: index === activeSlide ? '26px' : '8px',
                  height: '8px',
                  padding: 0,
                  border: 0,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  background: index === activeSlide ? slide.accent : 'rgba(255,255,255,0.45)',
                  transition: 'all 0.25s ease'
                }}
              />
            ))}
          </div>
        </div>

        {/* Single-Line Trust Badges & Stats Bar (Auto-fit for all devices) */}
        <div 
          className="hero-stats-single-line"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: 'clamp(4px, 1.2vw, 16px)',
            width: '100%',
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 4px'
          }}
        >
          <div className="glass-card stat-item-card" style={{ padding: 'clamp(8px, 1.4vw, 18px) clamp(3px, 0.8vw, 10px)', textAlign: 'center', minWidth: 0, overflow: 'hidden', borderRadius: 'clamp(8px, 1.2vw, 14px)' }}>
            <div style={{ fontSize: 'clamp(0.95rem, 2.8vw, 1.85rem)', fontWeight: 800, color: '#F59E0B', fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}>
              10,000+
            </div>
            <div style={{ fontSize: 'clamp(0.62rem, 1.15vw, 0.88rem)', color: '#F1F5F9', fontWeight: 700, marginTop: '3px', lineHeight: 1.2, wordBreak: 'normal' }}>
              Blessed Pilgrims Guided
            </div>
            <div className="stat-subtext" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.74rem)', color: '#94A3B8', marginTop: '2px', lineHeight: 1.15 }}>
              Char Dham & Himalayan Tours
            </div>
          </div>

          <div className="glass-card stat-item-card" style={{ padding: 'clamp(8px, 1.4vw, 18px) clamp(3px, 0.8vw, 10px)', textAlign: 'center', minWidth: 0, overflow: 'hidden', borderRadius: 'clamp(8px, 1.2vw, 14px)' }}>
            <div style={{ fontSize: 'clamp(0.95rem, 2.8vw, 1.85rem)', fontWeight: 800, color: '#06B6D4', fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}>
              100%
            </div>
            <div style={{ fontSize: 'clamp(0.62rem, 1.15vw, 0.88rem)', color: '#F1F5F9', fontWeight: 700, marginTop: '3px', lineHeight: 1.2, wordBreak: 'normal' }}>
              Verified Mountain Drivers
            </div>
            <div className="stat-subtext" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.74rem)', color: '#94A3B8', marginTop: '2px', lineHeight: 1.15 }}>
              Sanitized Cabs & Tempo
            </div>
          </div>

          <div className="glass-card stat-item-card" style={{ padding: 'clamp(8px, 1.4vw, 18px) clamp(3px, 0.8vw, 10px)', textAlign: 'center', minWidth: 0, overflow: 'hidden', borderRadius: 'clamp(8px, 1.2vw, 14px)' }}>
            <div style={{ fontSize: 'clamp(0.95rem, 2.8vw, 1.85rem)', fontWeight: 800, color: '#10B981', fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}>
              24 / 7
            </div>
            <div style={{ fontSize: 'clamp(0.62rem, 1.15vw, 0.88rem)', color: '#F1F5F9', fontWeight: 700, marginTop: '3px', lineHeight: 1.2, wordBreak: 'normal' }}>
              On-Ground Yatra Support
            </div>
            <div className="stat-subtext" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.74rem)', color: '#94A3B8', marginTop: '2px', lineHeight: 1.15 }}>
              Helicopter & VIP Darshan
            </div>
          </div>

          <div className="glass-card stat-item-card" style={{ padding: 'clamp(8px, 1.4vw, 18px) clamp(3px, 0.8vw, 10px)', textAlign: 'center', minWidth: 0, overflow: 'hidden', borderRadius: 'clamp(8px, 1.2vw, 14px)' }}>
            <div style={{ fontSize: 'clamp(0.95rem, 2.8vw, 1.85rem)', fontWeight: 800, color: '#A78BFA', fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}>
              4.9 ★
            </div>
            <div style={{ fontSize: 'clamp(0.62rem, 1.15vw, 0.88rem)', color: '#F1F5F9', fontWeight: 700, marginTop: '3px', lineHeight: 1.2, wordBreak: 'normal' }}>
              Top Rated Travel Agency
            </div>
            <div className="stat-subtext" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.74rem)', color: '#94A3B8', marginTop: '2px', lineHeight: 1.15 }}>
              500+ Verified Reviews
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
