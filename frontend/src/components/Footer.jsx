import React from 'react';
import { Phone, Mail, MessageCircle, Heart, Shield } from 'lucide-react';

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

export default function Footer({ onOpenInquiry, onOpenAdmin, onOpenPolicy }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: '#070B14',
      borderTop: '1px solid rgba(245, 158, 11, 0.2)',
      paddingTop: '46px',
      paddingBottom: '28px',
      color: '#94A3B8'
    }}>
      <div className="container">
        
        {/* Main Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '28px',
          marginBottom: '32px'
        }}>
          
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img 
                src="/images/logo.jpg" 
                alt="Mankotia Holidays Logo" 
                onError={(e) => { e.currentTarget.src = '/static/images/logo.jpg'; }}
                style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '10px' }} 
              />
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', margin: 0, fontFamily: 'var(--font-heading)' }}>
                  Mankotia <span className="text-gradient-gold">Holidays</span>
                </h3>
                <div style={{ fontSize: '0.72rem', color: '#F59E0B', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  Pilgrimage & Domestic Specialist
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#94A3B8', marginBottom: '20px' }}>
              Mankotia Holidays is a leading travel platform in India featuring the largest network of hotels, genuine guest reviews, and complete travel solutions including flight/train/bus ticketing, taxi rentals, luxury cottages, and spiritual yatras.
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <a 
                href="https://wa.me/919816461616" 
                target="_blank" 
                rel="noopener noreferrer"
                title="WhatsApp Chat"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#22C55E',
                  transition: 'all 0.2s'
                }}
              >
                <MessageCircle size={18} />
              </a>
              <a 
                href="tel:+919816461616"
                title="Direct Phone Call"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#06B6D4',
                  transition: 'all 0.2s'
                }}
              >
                <Phone size={18} />
              </a>
              <a 
                href="mailto:mankotiaholidays38@gmail.com"
                title="Official Email"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F59E0B',
                  transition: 'all 0.2s'
                }}
              >
                <Mail size={18} />
              </a>
              <a
                href="https://www.instagram.com/mankotiaholidays38/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mankotia Holidays on Instagram"
                title="Instagram Page"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F472B6',
                  transition: 'all 0.2s'
                }}
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="https://www.facebook.com/kuldip.mankotia.39"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mankotia Holidays on Facebook"
                title="Facebook Page"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#60A5FA',
                  transition: 'all 0.2s'
                }}
              >
                <FacebookIcon size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Our Core Services */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '18px' }}>
              ⚡ Our Travel Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }} style={{ color: '#CBD5E1' }}>
                  🚌 Volvo / Car Packages
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }} style={{ color: '#CBD5E1' }}>
                  💑 Group Tour & Honeymoon Packages
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }} style={{ color: '#CBD5E1' }}>
                  ✈️🚆 Online Flights, Trains & Buses
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }} style={{ color: '#CBD5E1' }}>
                  🚖 Volvo / Car / Taxi Rentals
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }} style={{ color: '#CBD5E1' }}>
                  🏨🏡 Hotels & Mountain Cottages Booking
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }} style={{ color: '#CBD5E1' }}>
                  🏕️🧗 Camping, Sightseeing & Adventure
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Pilgrimages & Yatras */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '18px' }}>
              🕉️ Pilgrimages & Yatras
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li>
                <a href="#char-dham" onClick={(e) => { e.preventDefault(); scrollTo('char-dham'); }} style={{ color: '#CBD5E1' }}>
                  Char Dham Yatra Deluxe (10N/11D)
                </a>
              </li>
              <li>
                <a href="#char-dham" onClick={(e) => { e.preventDefault(); scrollTo('char-dham'); }} style={{ color: '#CBD5E1' }}>
                  Do Dham: Kedarnath & Badrinath (5N/6D)
                </a>
              </li>
              <li>
                <a href="#char-dham" onClick={(e) => { e.preventDefault(); scrollTo('char-dham'); }} style={{ color: '#CBD5E1' }}>
                  Kedarnath Helicopter Express (3D/2N)
                </a>
              </li>
              <li>
                <a href="#packages" onClick={(e) => { e.preventDefault(); scrollTo('packages'); }} style={{ color: '#CBD5E1' }}>
                  Golden Triangle: Delhi-Agra-Jaipur
                </a>
              </li>
              <li>
                <a href="#yatra-guide" onClick={(e) => { e.preventDefault(); scrollTo('yatra-guide'); }} style={{ color: '#CBD5E1' }}>
                  Biometric Yatra Registration Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Uttarakhand & Domestic */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '18px' }}>
              🏔️ Popular Destinations
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li>
                <a href="#uttarakhand" onClick={(e) => { e.preventDefault(); scrollTo('uttarakhand'); }} style={{ color: '#CBD5E1' }}>
                  Nainital & Lake District (4D/3N)
                </a>
              </li>
              <li>
                <a href="#uttarakhand" onClick={(e) => { e.preventDefault(); scrollTo('uttarakhand'); }} style={{ color: '#CBD5E1' }}>
                  Jim Corbett Tiger Safari & Mussoorie
                </a>
              </li>
              <li>
                <a href="#uttarakhand" onClick={(e) => { e.preventDefault(); scrollTo('uttarakhand'); }} style={{ color: '#CBD5E1' }}>
                  Auli Skiing & Chopta-Tungnath Trek
                </a>
              </li>
              <li>
                <a href="#packages" onClick={(e) => { e.preventDefault(); scrollTo('packages'); }} style={{ color: '#CBD5E1' }}>
                  Himachal: Manali, Solang & Atal Tunnel
                </a>
              </li>
              <li>
                <a href="#packages" onClick={(e) => { e.preventDefault(); scrollTo('packages'); }} style={{ color: '#CBD5E1' }}>
                  Kashmir: Dal Lake Houseboat & Gondola
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Support */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '18px' }}>
              📞 Reach Our Team
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Phone size={16} color="#F59E0B" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ color: '#FFFFFF', fontWeight: 600 }}>Phone / Call Now:</div>
                  <a href="tel:+919816461616" style={{ display: 'block', color: '#94A3B8' }}>+91 98164 61616</a>
                  <a href="tel:+919811485028" style={{ display: 'block', color: '#94A3B8' }}>+91 98114 85028</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MessageCircle size={16} color="#22C55E" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ color: '#FFFFFF', fontWeight: 600 }}>24/7 WhatsApp Support:</div>
                  <a href="https://wa.me/919816461616" target="_blank" rel="noopener noreferrer" style={{ color: '#94A3B8' }}>+91 98164 61616</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Mail size={16} color="#06B6D4" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ color: '#FFFFFF', fontWeight: 600 }}>Email Inquiries:</div>
                  <a href="mailto:mankotiaholidays38@gmail.com" style={{ color: '#94A3B8' }}>mankotiaholidays38@gmail.com</a>
                </div>
              </div>

              {onOpenInquiry && (
                <button
                  onClick={() => onOpenInquiry({ destination: 'Custom Holiday Inquiry' })}
                  className="btn btn-outline-gold btn-sm"
                  style={{ marginTop: '8px' }}
                >
                  Custom Inquiry
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.82rem'
        }}>
          <div>
            © {new Date().getFullYear()} <strong>Mankotia Holidays</strong>. All rights reserved. Devoted to spiritual and domestic journeys across Incredible India.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {onOpenPolicy && (
              <>
                <button
                  onClick={() => onOpenPolicy('cancellation')}
                  style={{ background: 'transparent', border: 'none', color: '#94A3B8', fontSize: '0.78rem', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#F59E0B'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                >
                  Cancellation & Refund
                </button>
                <span style={{ color: '#334155' }}>•</span>
                <button
                  onClick={() => onOpenPolicy('terms')}
                  style={{ background: 'transparent', border: 'none', color: '#94A3B8', fontSize: '0.78rem', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#F59E0B'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                >
                  Terms & Conditions
                </button>
                <span style={{ color: '#334155' }}>•</span>
                <button
                  onClick={() => onOpenPolicy('privacy')}
                  style={{ background: 'transparent', border: 'none', color: '#94A3B8', fontSize: '0.78rem', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#F59E0B'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                >
                  Privacy Policy
                </button>
              </>
            )}

            {onOpenAdmin && (
              <>
                <span style={{ color: '#334155' }}>•</span>
                <button
                  onClick={onOpenAdmin}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#64748B',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: 0,
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#F59E0B'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#64748B'}
                  title="Management Portal"
                >
                  <Shield size={12} /> Admin Portal
                </button>
              </>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748B', fontSize: '0.78rem' }}>
              <span>Devoted Pilgrimages</span>
              <Heart size={12} color="#EF4444" fill="#EF4444" />
            </div>
          </div>
        </div>

      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919816461616?text=Hi%20Mankotia%20Holidays!%20I%20would%20like%20to%20inquire%20about%20Char%20Dham%20/%20Uttarakhand%20packages."
        target="_blank"
        className="floating-whatsapp"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </footer>
  );
}
