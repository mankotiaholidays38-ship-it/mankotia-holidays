import React, { useRef } from 'react';
import { Star, Quote, CheckCircle2, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { TESTIMONIALS } from '../data/packagesData';

export default function Testimonials() {
  const sliderRef = useRef(null);

  const scrollSlider = (direction) => {
    const el = sliderRef.current;
    if (el) {
      const scrollStep = 360;
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
    <section id="testimonials" className="section-padding" style={{
      background: 'radial-gradient(ellipse at 50% 50%, rgba(17, 26, 46, 0.9) 0%, #0B1120 100%)',
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
              <span className="badge-gold">
                <Star size={14} fill="#F59E0B" /> Verified Traveler Stories
              </span>
            </div>
            <h2 style={{ margin: '6px 0 8px', fontSize: 'clamp(1.7rem, 4vw, 2.3rem)' }}>
              Loved by <span className="text-gradient-gold">Over 10,000+ Pilgrims</span>
            </h2>
            <p style={{ margin: 0, maxWidth: '650px', fontSize: '0.92rem', color: '#94A3B8' }}>
              Real reviews and sacred experiences from devotees, families, and couples who journeyed with Mankotia Holidays.
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
              title="Previous Review"
              aria-label="Previous Review"
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
              title="Next Review (Continuous Loop)"
              aria-label="Next Review"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Continuous Horizontal Reviews Slider */}
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
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                flex: '0 0 350px',
                maxWidth: '350px',
                scrollSnapAlign: 'start',
                padding: '28px 24px',
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
                {/* Quote Icon */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  opacity: 0.12,
                  color: '#F59E0B'
                }}>
                  <Quote size={38} />
                </div>

                {/* Rating Stars */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>

                {/* Tour Badge */}
                <div style={{
                  display: 'inline-block',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: '#06B6D4',
                  background: 'rgba(6, 182, 212, 0.12)',
                  padding: '3px 9px',
                  borderRadius: 'var(--radius-full)',
                  marginBottom: '14px',
                  border: '1px solid rgba(6, 182, 212, 0.2)'
                }}>
                  {t.tour}
                </div>

                {/* Review Body */}
                <p style={{
                  fontSize: '0.88rem',
                  color: '#CBD5E1',
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                  marginBottom: '20px'
                }}>
                  "{t.review}"
                </p>
              </div>

              {/* Author */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '14px'
              }}>
                <img 
                  src={t.avatar} 
                  alt={t.name}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #F59E0B',
                    flexShrink: 0
                  }}
                />
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</span>
                    <CheckCircle2 size={13} color="#10B981" style={{ flexShrink: 0 }} />
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#64748B' }}>
                    {t.location} • {t.date}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div style={{ textAlign: 'center', marginTop: '10px', color: '#64748B', fontSize: '0.75rem' }}>
          <span>👈 Swipe or click arrows to read more pilgrim experiences (loops continuously) 👉</span>
        </div>

      </div>
    </section>
  );
}
