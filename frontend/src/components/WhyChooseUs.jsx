import React from 'react';
import { ShieldCheck, HeartHandshake, Compass, Award, Clock, Utensils, CheckCircle2 } from 'lucide-react';

export default function WhyChooseUs() {
  const perks = [
    {
      icon: <Award size={26} color="#F59E0B" />,
      title: "10+ Years Himalayan Mastery",
      desc: "Deep-rooted expertise in Garhwal & Kumaon terrain, high-altitude logistics, weather monitoring, and priority slot reservations."
    },
    {
      icon: <Utensils size={26} color="#10B981" />,
      title: "100% Satvik Food Assurance",
      desc: "Fresh, hygienic, pure vegetarian and Jain/Satvik food (no onion, no garlic on request) at every stop of the sacred yatra."
    },
    {
      icon: <ShieldCheck size={26} color="#06B6D4" />,
      title: "Verified Mountain Drivers & Cabs",
      desc: "Licensed hilly-terrain drivers with sanitized vehicles (Innova Crysta, Ertiga, AC Tempo Travellers) equipped with emergency first-aid."
    },
    {
      icon: <HeartHandshake size={26} color="#A78BFA" />,
      title: "Senior Citizens & Family Care",
      desc: "Special assistance with wheelchairs, pony/palki reservations, ground floor hotel allocations, and medical oxygen cylinders."
    },
    {
      icon: <Clock size={26} color="#F59E0B" />,
      title: "24/7 Real-Time Ground Help",
      desc: "Live field coordinators stationed across Haridwar, Guptkashi, Sonprayag, Joshimath, and Badrinath to assist anytime."
    },
    {
      icon: <Compass size={26} color="#10B981" />,
      title: "Transparent & Best Price Guarantee",
      desc: "Clear upfront quotes with all tolls, parking, driver night allowances, and taxes included. Zero surprise charges."
    }
  ];

  return (
    <section id="why-us" className="section-padding" style={{
      background: 'linear-gradient(180deg, #0B1120 0%, #111A2E 100%)',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-wrap">
            <span className="badge-gold">
              <CheckCircle2 size={14} /> Trust & Excellence
            </span>
          </div>
          <h2>
            Why Devotees Choose <span className="text-gradient-gold">Mankotia Holidays</span>
          </h2>
          <p>
            We don't just book tours — we take personal responsibility for your safety, comfort, and spiritual fulfillment every mile of the way.
          </p>
        </div>

        {/* Perks Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px'
        }}>
          {perks.map((p, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '32px 28px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                {p.icon}
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
                {p.title}
              </h3>

              <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.6 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
