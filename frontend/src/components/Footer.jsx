import React from 'react';
import { Phone, Mail, MessageCircle, Heart, Shield } from 'lucide-react';

export default function Footer({ onOpenInquiry, onOpenAdmin }) {
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
              <div style={{
                width: '82px',
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <img
                  src="/images/logo.jpg"
                  alt="Mankotia Holidays"
                  onError={(e) => { e.currentTarget.src = '/static/images/logo.jpg'; }}
                  style={{ width: '82px', height: '56px', objectFit: 'contain' }}
                />
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.3rem', color: '#FFFFFF' }}>
                Mankotia <span className="text-gradient-gold">Holidays</span>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#94A3B8', marginBottom: '20px' }}>
              Your trusted partner for Sacred Char Dham Yatra, Do Dham Yatra, Kedarnath Helicopter Packages, Uttarakhand scenic tours, and Incredible India holidays.
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <a 
                href="https://wa.me/919816461616" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#22C55E',
                  fontSize: '18px'
                }}
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>
              <a 
                href="tel:+919816461616"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#06B6D4',
                  fontSize: '16px'
                }}
              >
                <i className="fa-solid fa-phone"></i>
              </a>
              <a 
                href="mailto:mankotiaholidays38@gmail.com"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F59E0B',
                  fontSize: '16px'
                }}
              >
                <i className="fa-solid fa-envelope"></i>
              </a>
              <a
                href="https://www.instagram.com/mankotiaholidays38/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mankotia Holidays on Instagram"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F472B6',
                  fontSize: '17px'
                }}
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="https://www.facebook.com/kuldip.mankotia.39"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mankotia Holidays on Facebook"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#60A5FA',
                  fontSize: '17px'
                }}
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </div>
          </div>

          {/* Col 2: Pilgrimages & Yatra */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '18px' }}>
              🕉️ Sacred Pilgrimages
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li>
                <a href="#char-dham" onClick={(e) => { e.preventDefault(); scrollTo('char-dham'); }} style={{ color: '#CBD5E1', transition: 'color 0.2s' }}>
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
                <a href="#yatra-guide" onClick={(e) => { e.preventDefault(); scrollTo('yatra-guide'); }} style={{ color: '#CBD5E1' }}>
                  Biometric Yatra Registration Guide
                </a>
              </li>
              <li>
                <a href="#yatra-guide" onClick={(e) => { e.preventDefault(); scrollTo('yatra-guide'); }} style={{ color: '#CBD5E1' }}>
                  High Altitude Health & Packing Guide
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
        rel="noopener noreferrer"
        className="floating-whatsapp"
        title="Chat on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>
    </footer>
  );
}
