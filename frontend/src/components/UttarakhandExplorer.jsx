import React from 'react';
import { MapPin, Clock, Mountain, ArrowRight } from 'lucide-react';
import { UTTARAKHAND_DESTINATIONS } from '../data/packagesData';

export default function UttarakhandExplorer({ onOpenInquiry }) {
  return (
    <section id="uttarakhand" className="section-padding" style={{
      background: 'radial-gradient(ellipse at 50% 50%, rgba(17, 26, 46, 0.8) 0%, #0B1120 100%)',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-wrap">
            <span className="badge-cyan">
              <Mountain size={14} /> Devbhoomi Uttarakhand
            </span>
          </div>
          <h2>
            Explore The Jewels of <span className="text-gradient-cyan">Uttarakhand</span>
          </h2>
          <p>
            From emerald lakes of Nainital and royal Bengal tigers in Corbett to snow slopes of Auli and spiritual serenity in Rishikesh.
          </p>
        </div>

        {/* Destination Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '28px'
        }}>
          {UTTARAKHAND_DESTINATIONS.map((dest, idx) => (
            <div key={idx} className="glass-card" style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRadius: 'var(--radius-lg)'
            }}>
              <div>
                {/* Image Container */}
                <div style={{
                  position: 'relative',
                  height: '210px',
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
                    top: '12px',
                    left: '12px'
                  }}>
                    <span className="badge-cyan" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
                      {dest.badge}
                    </span>
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    background: 'rgba(11, 17, 32, 0.8)',
                    backdropFilter: 'blur(8px)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    color: '#FCD34D',
                    fontWeight: 600
                  }}>
                    <Mountain size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    {dest.altitude}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '24px 20px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#FFFFFF' }}>
                      {dest.name}
                    </h3>
                  </div>

                  <div style={{ fontSize: '0.82rem', color: '#06B6D4', fontWeight: 600, marginBottom: '10px' }}>
                    {dest.tagline}
                  </div>

                  <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.5, marginBottom: '16px' }}>
                    {dest.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8rem', color: '#64748B' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} color="#F59E0B" /> {dest.ideal_duration}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={13} color="#10B981" /> Uttarakhand, India
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div style={{ padding: '16px 20px 20px', borderTop: '1px solid var(--border-light)' }}>
                <button
                  onClick={() => onOpenInquiry({ destination: `Uttarakhand - ${dest.name}` })}
                  className="btn btn-outline-gold"
                  style={{ width: '100%', padding: '10px 16px', fontSize: '0.88rem' }}
                >
                  <span>Inquire {dest.name}</span>
                  <ArrowRight size={15} />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
