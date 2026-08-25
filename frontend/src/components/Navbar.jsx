import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, Sparkles, X, Shield } from 'lucide-react';

export default function Navbar({ onOpenInquiry, onOpenAdmin, onOpenPolicy }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [packagesMenuOpen, setPackagesMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      setPackagesMenuOpen(false);
      setMoreMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
    setPackagesMenuOpen(false);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 500,
      transition: 'all 0.3s ease',
      background: isScrolled ? 'rgba(11, 17, 32, 0.92)' : 'rgba(11, 17, 32, 0.75)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: isScrolled ? '1px solid rgba(245, 158, 11, 0.2)' : '1px solid rgba(255, 255, 255, 0.06)',
      boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.5)' : 'none'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', fontFamily: 'var(--font-body)' }}>
        
        {/* Brand Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '68px',
            height: '46px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <img
                src="/images/logo.jpg"
                alt="Mankotia Holidays"
                onError={(e) => { e.currentTarget.src = '/static/images/logo.jpg'; }}
                style={{ width: '68px', height: '46px', objectFit: 'contain' }}
            />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.4px', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '5px' }}>
              Mankotia <span className="text-gradient-gold">Holidays</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: '#94A3B8', fontWeight: 600, letterSpacing: '0.4px', textTransform: 'uppercase' }}>
              Pilgrimage & Domestic Specialist
            </div>
          </div>
        </a>

        {/* Core desktop navigation */}
        <ul style={{ display: 'none', alignItems: 'center', gap: '20px', listStyle: 'none', marginLeft: 'auto', marginRight: '24px' }} className="desktop-nav">
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('top'); }} style={{ fontSize: '0.9rem', fontWeight: 600, color: '#F8FAFC' }}>
              Home
            </a>
          </li>

          {/* All Packages Dropdown */}
          <li style={{ position: 'relative' }}>
            <button
              onClick={() => { setPackagesMenuOpen(!packagesMenuOpen); setMoreMenuOpen(false); }}
              aria-expanded={packagesMenuOpen}
              style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'transparent', border: 'none', color: '#E2E8F0', font: 'inherit', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', padding: '8px 0' }}
            >
              <span>All Packages</span>
              <ChevronDown size={15} style={{ transform: packagesMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            {packagesMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '44px',
                left: '-20px',
                minWidth: '240px',
                padding: '10px',
                background: '#111A2E',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '12px',
                boxShadow: '0 16px 36px rgba(0,0,0,0.5)',
                zIndex: 200,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 700, padding: '4px 10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Tour Categories
                </div>
                <a href="#packages" onClick={(e) => { e.preventDefault(); scrollTo('packages'); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', color: '#F8FAFC', fontSize: '0.86rem', borderRadius: '6px', fontWeight: 600, textDecoration: 'none' }}>
                  <span>🌟</span> All Tour Packages
                </a>
                <a href="#packages" onClick={(e) => { e.preventDefault(); scrollTo('packages'); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', color: '#CBD5E1', fontSize: '0.86rem', borderRadius: '6px', textDecoration: 'none' }}>
                  <span>🕉️</span> Char Dham & Pilgrimages
                </a>
                <a href="#packages" onClick={(e) => { e.preventDefault(); scrollTo('packages'); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', color: '#CBD5E1', fontSize: '0.86rem', borderRadius: '6px', textDecoration: 'none' }}>
                  <span>🏔️</span> Uttarakhand Specials
                </a>
                <a href="#packages" onClick={(e) => { e.preventDefault(); scrollTo('packages'); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', color: '#CBD5E1', fontSize: '0.86rem', borderRadius: '6px', textDecoration: 'none' }}>
                  <span>🌲</span> Himachal Pradesh
                </a>
                <a href="#packages" onClick={(e) => { e.preventDefault(); scrollTo('packages'); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', color: '#CBD5E1', fontSize: '0.86rem', borderRadius: '6px', textDecoration: 'none' }}>
                  <span>🌸</span> Kashmir Paradise
                </a>
                <a href="#packages" onClick={(e) => { e.preventDefault(); scrollTo('packages'); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', color: '#CBD5E1', fontSize: '0.86rem', borderRadius: '6px', textDecoration: 'none' }}>
                  <span>🏰</span> Royal Rajasthan
                </a>
                <a href="#packages" onClick={(e) => { e.preventDefault(); scrollTo('packages'); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', color: '#CBD5E1', fontSize: '0.86rem', borderRadius: '6px', textDecoration: 'none' }}>
                  <span>🏖️</span> Goa & Kerala
                </a>
              </div>
            )}
          </li>

          <li>
            <a href="#char-dham" onClick={(e) => { e.preventDefault(); scrollTo('char-dham'); }} style={{ fontSize: '0.9rem', fontWeight: 600, color: '#E2E8F0' }}>
              Sacred Yatra
            </a>
          </li>
          <li>
            <a href="#ai-planner" onClick={(e) => { e.preventDefault(); scrollTo('ai-planner'); }} style={{ fontSize: '0.9rem', fontWeight: 600, color: '#E2E8F0', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={15} color="#F59E0B" /> Trip Planner
            </a>
          </li>
          <li>
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => { setMoreMenuOpen(!moreMenuOpen); setPackagesMenuOpen(false); }}
                aria-expanded={moreMenuOpen}
                style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'transparent', border: 'none', color: '#E2E8F0', font: 'inherit', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', padding: '8px 0' }}
              >
                More <ChevronDown size={15} style={{ transform: moreMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              {moreMenuOpen && (
                <div style={{ position: 'absolute', top: '44px', right: 0, minWidth: '200px', padding: '8px', background: '#111A2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', boxShadow: '0 16px 30px rgba(0,0,0,0.35)', zIndex: 100 }}>
                  <a href="#uttarakhand" onClick={(e) => { e.preventDefault(); scrollTo('uttarakhand'); }} style={{ display: 'block', padding: '9px 12px', color: '#E2E8F0', fontSize: '0.86rem' }}>Uttarakhand Explorer</a>
                  <a href="#yatra-guide" onClick={(e) => { e.preventDefault(); scrollTo('yatra-guide'); }} style={{ display: 'block', padding: '9px 12px', color: '#E2E8F0', fontSize: '0.86rem' }}>Yatra Guide & Passes</a>
                  <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollTo('testimonials'); }} style={{ display: 'block', padding: '9px 12px', color: '#E2E8F0', fontSize: '0.86rem' }}>Pilgrim Reviews</a>
                  {onOpenPolicy && (
                    <button
                      onClick={() => { setMoreMenuOpen(false); onOpenPolicy('cancellation'); }}
                      style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', padding: '9px 12px', color: '#94A3B8', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <span>Cancellation & Policies</span>
                    </button>
                  )}
                  {onOpenAdmin && (
                    <button 
                      onClick={() => { setMoreMenuOpen(false); onOpenAdmin(); }} 
                      style={{ width: '100%', textAlign: 'left', background: 'rgba(245, 158, 11, 0.08)', border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '4px', padding: '9px 12px', color: '#FCD34D', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '0 0 6px 6px' }}
                    >
                      <Shield size={14} color="#F59E0B" /> Admin Portal
                    </button>
                  )}
                </div>
              )}
            </div>
          </li>
        </ul>

        {/* Primary action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

          <button 
            onClick={() => onOpenInquiry({})}
            className="btn btn-primary-gold btn-sm nav-cta"
          >
            Book Now
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '6px'
            }}
            className="mobile-toggle"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div style={{
          background: 'rgba(11, 17, 32, 0.98)',
          borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          animation: 'fadeIn 0.2s ease-out',
          maxHeight: '85vh',
          overflowY: 'auto'
        }}>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('top'); }} style={{ color: '#F8FAFC', fontWeight: 700, fontSize: '1.05rem' }}>
            Home
          </a>

          {/* Mobile All Packages Category Section */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '10px',
            padding: '12px',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <div style={{ color: '#F59E0B', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              📦 Explore All Tour Packages
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <a href="#packages" onClick={(e) => { e.preventDefault(); scrollTo('packages'); }} style={{ color: '#F1F5F9', fontSize: '0.88rem', padding: '6px 8px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '6px', textDecoration: 'none' }}>
                🕉️ Char Dham
              </a>
              <a href="#packages" onClick={(e) => { e.preventDefault(); scrollTo('packages'); }} style={{ color: '#F1F5F9', fontSize: '0.88rem', padding: '6px 8px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '6px', textDecoration: 'none' }}>
                🏔️ Uttarakhand
              </a>
              <a href="#packages" onClick={(e) => { e.preventDefault(); scrollTo('packages'); }} style={{ color: '#F1F5F9', fontSize: '0.88rem', padding: '6px 8px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '6px', textDecoration: 'none' }}>
                🌲 Himachal
              </a>
              <a href="#packages" onClick={(e) => { e.preventDefault(); scrollTo('packages'); }} style={{ color: '#F1F5F9', fontSize: '0.88rem', padding: '6px 8px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '6px', textDecoration: 'none' }}>
                🌸 Kashmir
              </a>
              <a href="#packages" onClick={(e) => { e.preventDefault(); scrollTo('packages'); }} style={{ color: '#F1F5F9', fontSize: '0.88rem', padding: '6px 8px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '6px', textDecoration: 'none' }}>
                🏰 Rajasthan
              </a>
              <a href="#packages" onClick={(e) => { e.preventDefault(); scrollTo('packages'); }} style={{ color: '#F1F5F9', fontSize: '0.88rem', padding: '6px 8px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '6px', textDecoration: 'none' }}>
                🏖️ Goa & Kerala
              </a>
            </div>
          </div>

          <a href="#char-dham" onClick={(e) => { e.preventDefault(); scrollTo('char-dham'); }} style={{ color: '#F8FAFC', fontWeight: 600, fontSize: '1rem' }}>
            Sacred Char Dham Yatra
          </a>
          <a href="#ai-planner" onClick={(e) => { e.preventDefault(); scrollTo('ai-planner'); }} style={{ color: '#F8FAFC', fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="#F59E0B" /> AI Trip Planner
          </a>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a href="#uttarakhand" onClick={(e) => { e.preventDefault(); scrollTo('uttarakhand'); }} style={{ color: '#CBD5E1', fontSize: '0.92rem' }}>Uttarakhand Explorer</a>
            <a href="#yatra-guide" onClick={(e) => { e.preventDefault(); scrollTo('yatra-guide'); }} style={{ color: '#CBD5E1', fontSize: '0.92rem' }}>Yatra Guidelines & Registration</a>
            <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollTo('testimonials'); }} style={{ color: '#CBD5E1', fontSize: '0.92rem' }}>Reviews & Testimonials</a>
            {onOpenAdmin && (
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }} 
                style={{ textAlign: 'left', background: 'transparent', border: 'none', color: '#FCD34D', fontSize: '0.92rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}
              >
                <Shield size={16} color="#F59E0B" /> Admin Leads Portal
              </button>
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenInquiry({}); }} 
              className="btn btn-primary-gold" 
              style={{ flex: 1 }}
            >
              Book Now
            </button>
          </div>
        </div>
      )}

      {/* Inline styles for responsive breakpoints */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
          .nav-cta { display: inline-flex !important; }
        }
        @media (max-width: 991px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
