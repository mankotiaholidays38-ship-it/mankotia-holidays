import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, Sparkles, X, Shield } from 'lucide-react';

export default function Navbar({ onOpenInquiry, onOpenAdmin }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
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
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px', fontFamily: 'var(--font-body)' }}>
        
        {/* Brand Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.35rem', letterSpacing: '-0.5px', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Mankotia <span className="text-gradient-gold">Holidays</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              Pilgrimage & Domestic Specialist
            </div>
          </div>
        </a>

        {/* Core desktop navigation */}
        <ul style={{ display: 'none', alignItems: 'center', gap: '24px', listStyle: 'none', marginLeft: 'auto', marginRight: '32px' }} className="desktop-nav">
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('top'); }} style={{ fontSize: '0.9rem', fontWeight: 600, color: '#F8FAFC' }}>
              Home
            </a>
          </li>
          <li>
            <a href="#packages" onClick={(e) => { e.preventDefault(); scrollTo('packages'); }} style={{ fontSize: '0.9rem', fontWeight: 600, color: '#E2E8F0' }}>
              Tour Packages
            </a>
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
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                aria-expanded={moreMenuOpen}
                style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'transparent', border: 'none', color: '#E2E8F0', font: 'inherit', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', padding: '8px 0' }}
              >
                More <ChevronDown size={15} />
              </button>
              {moreMenuOpen && (
                <div style={{ position: 'absolute', top: '42px', right: 0, minWidth: '200px', padding: '8px', background: '#111A2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', boxShadow: '0 16px 30px rgba(0,0,0,0.35)', zIndex: 100 }}>
                  <a href="#uttarakhand" onClick={(e) => { e.preventDefault(); scrollTo('uttarakhand'); }} style={{ display: 'block', padding: '10px 12px', color: '#E2E8F0', fontSize: '0.88rem' }}>Uttarakhand</a>
                  <a href="#yatra-guide" onClick={(e) => { e.preventDefault(); scrollTo('yatra-guide'); }} style={{ display: 'block', padding: '10px 12px', color: '#E2E8F0', fontSize: '0.88rem' }}>Yatra Guide</a>
                  <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollTo('testimonials'); }} style={{ display: 'block', padding: '10px 12px', color: '#E2E8F0', fontSize: '0.88rem' }}>Reviews</a>
                  {onOpenAdmin && (
                    <button 
                      onClick={() => { setMoreMenuOpen(false); onOpenAdmin(); }} 
                      style={{ width: '100%', textAlign: 'left', background: 'rgba(245, 158, 11, 0.08)', border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '4px', padding: '10px 12px', color: '#FCD34D', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '0 0 6px 6px' }}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
          gap: '16px',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('top'); }} style={{ color: '#F8FAFC', fontWeight: 600, fontSize: '1rem' }}>
            Home
          </a>
          <a href="#packages" onClick={(e) => { e.preventDefault(); scrollTo('packages'); }} style={{ color: '#F8FAFC', fontWeight: 600, fontSize: '1rem' }}>
            Tour Packages
          </a>
          <a href="#char-dham" onClick={(e) => { e.preventDefault(); scrollTo('char-dham'); }} style={{ color: '#F8FAFC', fontWeight: 600, fontSize: '1rem' }}>
            Sacred Yatra
          </a>
          <a href="#ai-planner" onClick={(e) => { e.preventDefault(); scrollTo('ai-planner'); }} style={{ color: '#F8FAFC', fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="#F59E0B" /> Trip Planner
          </a>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ color: '#94A3B8', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Explore More</span>
            <a href="#uttarakhand" onClick={(e) => { e.preventDefault(); scrollTo('uttarakhand'); }} style={{ color: '#F8FAFC', fontWeight: 600, fontSize: '1rem' }}>Uttarakhand</a>
            <a href="#yatra-guide" onClick={(e) => { e.preventDefault(); scrollTo('yatra-guide'); }} style={{ color: '#F8FAFC', fontWeight: 600, fontSize: '1rem' }}>Yatra Guide</a>
            <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollTo('testimonials'); }} style={{ color: '#F8FAFC', fontWeight: 600, fontSize: '1rem' }}>Reviews</a>
            {onOpenAdmin && (
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }} 
                style={{ textAlign: 'left', background: 'transparent', border: 'none', color: '#FCD34D', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}
              >
                <Shield size={16} color="#F59E0B" /> Admin Leads Portal
              </button>
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
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
