import React from 'react';
import { ShieldCheck, FileCheck, HeartPulse, Plane, CheckCircle2, Phone, AlertCircle } from 'lucide-react';

export default function YatraGuide({ onOpenInquiry }) {
  const steps = [
    {
      icon: <FileCheck size={24} color="#F59E0B" />,
      title: "1. Biometric Registration",
      desc: "Mandatory for all pilgrims by Uttarakhand Tourism. Mankotia Holidays provides full assistance with online registration, QR slip generation, and wristband issuance.",
      badge: "Mandatory"
    },
    {
      icon: <HeartPulse size={24} color="#EF4444" />,
      title: "2. Medical & Fitness Prep",
      desc: "Kedarnath (11,750 ft) & Badrinath (10,200 ft) are high-altitude zones. Regular 20-min daily walks 3 weeks prior, hydration, and carrying Diamox/emergency meds are advised.",
      badge: "Health Advisory"
    },
    {
      icon: <Plane size={24} color="#06B6D4" />,
      title: "3. Helicopter Guidelines",
      desc: "Heli-shuttles operate from Phata, Sirsi, and Guptkashi. Maximum passenger baggage is 5kg per person. Boarding slot management and verification handled by our team.",
      badge: "Heli Slots"
    },
    {
      icon: <ShieldCheck size={24} color="#10B981" />,
      title: "4. VIP Darshan Assistance",
      desc: "Special puja, Rudrabhishek at Kedarnath, and Swarna Mahabhishek at Badrinath Ji are arranged with authorized temple priest coordinators for peaceful worship.",
      badge: "Devotion First"
    }
  ];

  const packingItems = [
    "Heavy fleece jacket, windcheater & thermal innerwear",
    "Waterproof trekking boots with deep rubber treads",
    "Lightweight rain poncho or sturdy travel umbrella",
    "Personal first-aid kit (pain relief spray, Diamox, band-aids)",
    "Original Aadhar Card / Gov ID with 3 printed photocopies",
    "Power bank (minimum 20,000 mAh) & insulated thermos water flask",
    "UV protection sunglasses & high SPF 50+ sunscreen",
    "Sufficient cash (limited working ATMs in Sonprayag & Kedarnath)"
  ];

  return (
    <section id="yatra-guide" className="section-padding" style={{
      background: 'linear-gradient(180deg, #111A2E 0%, #0B1120 100%)',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-wrap">
            <span className="badge-saffron">
              <ShieldCheck size={14} /> Pilgrim Advisory 2026
            </span>
          </div>
          <h2>
            Essential <span className="text-gradient-gold">Yatra Preparation Guide</span>
          </h2>
          <p>
            Everything you need to know before starting your holy Char Dham or Do Dham pilgrimage. Complete peace of mind with Mankotia Holidays.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
          marginBottom: '50px'
        }}>
          {steps.map((step, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '28px 24px', position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px'
              }}>
                <span className="badge-gold" style={{ fontSize: '0.7rem', padding: '3px 8px' }}>
                  {step.badge}
                </span>
              </div>

              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                {step.icon}
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
                {step.title}
              </h3>

              <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.6 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Packing Checklist Box */}
        <div className="glass-panel" style={{
          padding: '36px',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
                🎒 High Altitude Himalayan Packing Checklist
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#94A3B8', margin: '4px 0 0' }}>
                Recommended essentials for Yamunotri, Kedarnath, Badrinath, Auli & Chopta
              </p>
            </div>

            <button
              onClick={() => onOpenInquiry({ destination: 'Char Dham Yatra Consultation' })}
              className="btn btn-outline-gold btn-sm"
            >
              Get Free Yatra Consultation
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '14px'
          }}>
            {packingItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B', marginTop: '2px', flexShrink: 0 }}>
                  <CheckCircle2 size={12} strokeWidth={3} />
                </div>
                <span style={{ fontSize: '0.88rem', color: '#E2E8F0', lineHeight: 1.4 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Emergency Alert Box */}
          <div style={{
            marginTop: '28px',
            padding: '16px 20px',
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <AlertCircle size={22} color="#F87171" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '0.85rem', color: '#FECACA' }}>
                <strong>24/7 Pilgrim Helpline:</strong> Mankotia Holidays coordinators are stationed across Haridwar, Guptkashi, Sonprayag & Joshimath.
              </div>
            </div>

            <a href="tel:+919816461616" className="btn btn-call btn-sm" style={{ background: 'rgba(239, 68, 68, 0.2)', borderColor: 'rgba(239, 68, 68, 0.4)' }}>
              <Phone size={14} /> Call Helpline: +91 98164 61616
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
