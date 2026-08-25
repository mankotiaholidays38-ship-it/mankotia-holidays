import React, { useRef } from 'react';
import { MapPin, Clock, Mountain, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { UTTARAKHAND_DESTINATIONS } from '../data/packagesData';

export default function UttarakhandExplorer({ onOpenInquiry }) {
  const sliderRef = useRef(null);

  const scrollSlider = (direction) => {
    const el = sliderRef.current;
    if (el) {
      const scrollStep = 340;
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

  return (
    <section id="uttarakhand" className="section-padding" style={{
      background: 'radial-gradient(ellipse at 50% 50%, rgba(17, 26, 46, 0.85) 0%, #0B1120 100%)',
      position: 'relative',
      paddingTop: '60px',
      paddingBottom: '70px'
    }}>
      <div className="container">
        
        {/* Section Header & Slider Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px'
        }}>
          <div>
            <div className="badge-wrap">
              <span className="badge-cyan">
                <Mountain size={14} /> Devbhoomi Uttarakhand
              </span>
            </div>
            <h2 style={{ margin: '6px 0 8px', fontSize: 'clamp(1.7rem, 4vw, 2.3rem)' }}>
              Explore The Jewels of <span className="text-gradient-cyan">Uttarakhand</span>
            </h2>
            <p style={{ margin: 0, maxWidth: '650px', fontSize: '0.92rem', color: '#94A3B8' }}>
              From sacred Char Dham shrines and emerald lakes of Nainital to royal Bengal tigers in Corbett and snowy peaks of Auli.
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
                borderColor: 'rgba(6, 182, 212, 0.3)',
                color: '#38BDF8',
                background: 'rgba(15, 23, 42, 0.8)'
              }}
              title="Previous Destination"
              aria-label="Previous Destination"
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
                borderColor: 'rgba(6, 182, 212, 0.3)',
                color: '#38BDF8',
                background: 'rgba(15, 23, 42, 0.8)'
              }}
              title="Next Destination (Continuous Loop)"
              aria-label="Next Destination"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Continuous Horizontal Destination Slider */}
        <div
          ref={sliderRef}
          style={{
            display: 'flex',
            gap: '22px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingBottom: '16px',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {UTTARAKHAND_DESTINATIONS.map((dest, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                flex: '0 0 320px',
                maxWidth: '320px',
                scrollSnapAlign: 'start',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: '16px',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                background: 'linear-gradient(180deg, rgba(17, 26, 46, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
              }}
            >
              <div>
                {/* Image Container */}
                <div style={{
                  position: 'relative',
                  height: '190px',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={dest.image} 
                    alt={dest.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px'
                  }}>
                    <span className="badge-cyan" style={{ fontSize: '0.72rem', padding: '3px 9px' }}>
                      {dest.badge}
                    </span>
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    background: 'rgba(11, 17, 32, 0.85)',
                    backdropFilter: 'blur(8px)',
                    padding: '3px 9px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.72rem',
                    color: '#FCD34D',
                    fontWeight: 700
                  }}>
                    <Mountain size={11} style={{ display: 'inline', marginRight: '4px' }} />
                    {dest.altitude}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '18px 18px 12px' }}>
                  <div style={{ fontSize: '0.76rem', color: '#06B6D4', fontWeight: 700, marginBottom: '4px' }}>
                    {dest.tagline}
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px', lineHeight: 1.3 }}>
                    {dest.name}
                  </h3>

                  <p style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.5, marginBottom: '14px' }}>
                    {dest.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '0.76rem',
                    color: '#CBD5E1',
                    marginBottom: '12px'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} color="#F59E0B" /> {dest.ideal_duration}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={13} color="#06B6D4" /> Uttarakhand
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Footer */}
              <div style={{
                padding: '12px 18px 16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(0, 0, 0, 0.2)'
              }}>
                <div>
                  <div style={{ fontSize: '0.68rem', color: '#94A3B8', textTransform: 'uppercase' }}>
                    Starting From
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#F59E0B' }}>
                    ₹{dest.price_inr ? dest.price_inr.toLocaleString('en-IN') : '9,999'}
                  </div>
                </div>

                <button
                  onClick={() => onOpenInquiry({
                    destination: dest.name,
                    notes: `Inquiry for Uttarakhand Package: ${dest.name} (${dest.ideal_duration})`
                  })}
                  className="btn btn-primary-gold"
                  style={{ padding: '7px 14px', fontSize: '0.78rem', borderRadius: '8px', fontWeight: 700 }}
                >
                  <span>Book Tour</span>
                  <ArrowRight size={12} />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div style={{ textAlign: 'center', marginTop: '8px', color: '#64748B', fontSize: '0.75rem' }}>
          <span>👈 Swipe or click arrows to explore all Uttarakhand packages (loops continuously) 👉</span>
        </div>

      </div>
    </section>
  );
}
