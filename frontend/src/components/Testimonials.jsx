import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/packagesData';

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding" style={{
      background: 'radial-gradient(ellipse at 50% 50%, rgba(17, 26, 46, 0.9) 0%, #0B1120 100%)',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-wrap">
            <span className="badge-gold">
              <Star size={14} fill="#F59E0B" /> Verified Traveler Stories
            </span>
          </div>
          <h2>
            Loved by <span className="text-gradient-gold">Over 10,000+ Pilgrims</span>
          </h2>
          <p>
            Real reviews and experiences from devotees and families who trusted Mankotia Holidays for their sacred and leisure trips.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px'
        }}>
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="glass-card" style={{
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}>
              <div>
                {/* Quote Icon */}
                <div style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  opacity: 0.15,
                  color: '#F59E0B'
                }}>
                  <Quote size={40} />
                </div>

                {/* Rating */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>

                {/* Tour Badge */}
                <div style={{
                  display: 'inline-block',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#06B6D4',
                  background: 'rgba(6, 182, 212, 0.12)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  marginBottom: '16px'
                }}>
                  {t.tour}
                </div>

                {/* Review Body */}
                <p style={{
                  fontSize: '0.95rem',
                  color: '#CBD5E1',
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                  marginBottom: '24px'
                }}>
                  "{t.review}"
                </p>
              </div>

              {/* Author */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                borderTop: '1px solid var(--border-light)',
                paddingTop: '16px'
              }}>
                <img 
                  src={t.avatar} 
                  alt={t.name}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #F59E0B'
                  }}
                />
                <div>
                  <div style={{ fontSize: '0.98rem', fontWeight: 700, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {t.name}
                    <CheckCircle2 size={14} color="#10B981" />
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                    {t.location} • Verified Traveler ({t.date})
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
