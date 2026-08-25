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
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '120px',
      paddingBottom: '80px',
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
        height: '200px',
        background: 'linear-gradient(to top, #0B1120, transparent)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Top Badges */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div className="badge-saffron" style={{ animation: 'slideUp 0.4s ease-out' }}>
            <span className="pulse-dot"></span>
            <span>Char Dham Yatra 2026 Bookings Open</span>
            <span style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '2px 8px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 700 }}>
              VIP Pass & Heli Slots
            </span>
          </div>
        </div>

        {/* Hero Main Heading */}
        <div style={{ textAlign: 'center', maxWidth: '920px', margin: '0 auto 36px' }}>
          <h1 style={{
            fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-1px',
            marginBottom: '20px'
          }}>
            Sacred Pilgrimages & <br />
            <span className="text-gradient-gold">Divine Holidays In India</span>
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#CBD5E1',
            maxWidth: '780px',
            margin: '0 auto 24px',
            lineHeight: 1.6
          }}>
            Experience life-transforming spiritual journeys with <strong>Char Dham Yatra</strong>, <strong>Do Dham Yatra</strong>, <strong>Kedarnath Helicopter Express</strong>, and breathtaking <strong>Uttarakhand & Himachal holidays</strong> with Mankotia Holidays.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onOpenInquiry({ destination: 'Char Dham Yatra Deluxe' })}
              className="btn btn-primary-gold btn-lg"
            >
              <span>Book Your Sacred Yatra</span>
              <ArrowRight size={18} />
            </button>
            <a
              href="#ai-planner"
              className="btn btn-outline-gold btn-lg"
            >
              <span>Custom AI Trip Planner</span>
            </a>
          </div>
        </div>

        {/* Rotating Tour Showcase */}
        <div
          className="tour-slider"
          onMouseEnter={() => setSliderPaused(true)}
          onMouseLeave={() => setSliderPaused(false)}
          style={{
            maxWidth: '1080px',
            minHeight: '260px',
            margin: '0 auto 50px',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45)'
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

        {/* Trust Badges & Stats Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          maxWidth: '1080px',
          margin: '0 auto'
        }}>
          
          <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#F59E0B', fontFamily: 'var(--font-heading)' }}>
              10,000+
            </div>
            <div style={{ fontSize: '0.9rem', color: '#CBD5E1', fontWeight: 600 }}>
              Blessed Pilgrims Guided
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
              Char Dham & Himalayan Tours
            </div>
          </div>

          <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06B6D4', fontFamily: 'var(--font-heading)' }}>
              100%
            </div>
            <div style={{ fontSize: '0.9rem', color: '#CBD5E1', fontWeight: 600 }}>
              Verified Mountain Drivers
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
              Sanitized Cabs & Tempo Travellers
            </div>
          </div>

          <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10B981', fontFamily: 'var(--font-heading)' }}>
              24 / 7
            </div>
            <div style={{ fontSize: '0.9rem', color: '#CBD5E1', fontWeight: 600 }}>
              On-Ground Yatra Support
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
              Helicopter, Medical & VIP Darshan
            </div>
          </div>

          <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#A78BFA', fontFamily: 'var(--font-heading)' }}>
              4.9 ★
            </div>
            <div style={{ fontSize: '0.9rem', color: '#CBD5E1', fontWeight: 600 }}>
              Top Rated Travel Agency
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
              500+ Verified Google Reviews
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
