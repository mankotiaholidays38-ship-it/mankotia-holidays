import React, { useState } from 'react';
import { X, ShieldCheck, FileText, AlertCircle, RefreshCw, Lock, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function PolicyModal({ isOpen, onClose, initialTab = 'cancellation' }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '750px', maxHeight: '88vh' }} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '14px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(245, 158, 11, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F59E0B'
            }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                Mankotia Holidays Trust & Policies
              </h3>
              <p style={{ fontSize: '0.76rem', color: '#94A3B8', margin: '2px 0 0' }}>
                Transparent Booking, Cancellation, and Privacy Standards
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#CBD5E1',
              cursor: 'pointer'
            }}
            aria-label="Close Modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Policy Tabs */}
        <div style={{
          display: 'flex',
          gap: '6px',
          background: 'rgba(0, 0, 0, 0.3)',
          padding: '4px',
          borderRadius: '10px',
          marginBottom: '18px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setActiveTab('cancellation')}
            style={{
              flex: '1 1 auto',
              padding: '8px 14px',
              borderRadius: '8px',
              background: activeTab === 'cancellation' ? 'var(--primary-gold)' : 'transparent',
              color: activeTab === 'cancellation' ? '#0F172A' : '#CBD5E1',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <RefreshCw size={14} /> Cancellation & Refund
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            style={{
              flex: '1 1 auto',
              padding: '8px 14px',
              borderRadius: '8px',
              background: activeTab === 'terms' ? 'var(--primary-gold)' : 'transparent',
              color: activeTab === 'terms' ? '#0F172A' : '#CBD5E1',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <FileText size={14} /> Terms & Conditions
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            style={{
              flex: '1 1 auto',
              padding: '8px 14px',
              borderRadius: '8px',
              background: activeTab === 'privacy' ? 'var(--primary-gold)' : 'transparent',
              color: activeTab === 'privacy' ? '#0F172A' : '#CBD5E1',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Lock size={14} /> Privacy & Safety
          </button>
        </div>

        {/* Tab 1: Cancellation & Refund */}
        {activeTab === 'cancellation' && (
          <div style={{ fontSize: '0.85rem', color: '#CBD5E1', lineHeight: 1.6 }}>
            <div style={{
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              padding: '12px 16px',
              borderRadius: '10px',
              marginBottom: '16px'
            }}>
              <div style={{ fontWeight: 700, color: '#F59E0B', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertCircle size={15} /> Transparent Yatra Cancellation Rules
              </div>
              <div>
                We understand that Himalayan travel plans can change due to health or unforeseen emergencies. Our refund structure is designed to be fair and transparent.
              </div>
            </div>

            <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>
              1. Standard Road Tour Cancellation Timeline
            </h4>
            <ul style={{ paddingLeft: '20px', marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><strong>30+ Days Prior to Travel:</strong> 90% Refund of booking advance amount (10% covers administrative charges).</li>
              <li><strong>15 to 29 Days Prior:</strong> 50% Refund of the total tour advance.</li>
              <li><strong>8 to 14 Days Prior:</strong> 25% Refund of the total tour advance.</li>
              <li><strong>Less than 7 Days / No-Show:</strong> 100% Non-Refundable as hotels and hill chauffeurs are pre-locked.</li>
            </ul>

            <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>
              2. Kedarnath Helicopter Tickets Policy
            </h4>
            <p style={{ marginBottom: '12px' }}>
              Helicopter tickets operate directly under DGCA and Uttarakhand Civil Aviation (UCADA) regulations. If chopper flights are cancelled due to inclement weather, dense fog, or technical guidelines, refunds are issued strictly per the official government aviation portal refund guidelines.
            </p>

            <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>
              3. Natural Calamities & Landslide Rescheduling
            </h4>
            <p style={{ margin: 0 }}>
              In the rare event of major landslides, road closures, or government yatra halts, Mankotia Holidays provides full on-ground assistance with safe alternative halts or tour date rescheduling at nominal actual costs.
            </p>
          </div>
        )}

        {/* Tab 2: Terms & Conditions */}
        {activeTab === 'terms' && (
          <div style={{ fontSize: '0.85rem', color: '#CBD5E1', lineHeight: 1.6 }}>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>
              1. Mandatory Biometric Registration & Identification
            </h4>
            <p style={{ marginBottom: '12px' }}>
              Per Uttarakhand Tourism directives, all Char Dham and Do Dham pilgrims must carry a valid government photo ID (Aadhar Card, Voter ID, Passport) and generate a Biometric Yatra e-Pass. Our team provides free assistance with this registration.
            </p>

            <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>
              2. Hill Driving & Passenger Safety Regulations
            </h4>
            <p style={{ marginBottom: '12px' }}>
              Per Uttarakhand Police and Transport Department safety mandates, commercial mountain driving is restricted between <strong>8:00 PM and 5:00 AM</strong> in steep ghat sections. All itineraries are paced comfortably for daylight travel.
            </p>

            <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>
              3. Satvik Meals & Stays
            </h4>
            <p style={{ marginBottom: '12px' }}>
              All meals included in our Char Dham and Do Dham packages are 100% pure vegetarian. Jain/Satvik food (no onion, no garlic) is available on prior notice without extra charge.
            </p>

            <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>
              4. High-Altitude Medical Fitness
            </h4>
            <p style={{ margin: 0 }}>
              Pilgrims with pre-existing heart, asthma, or respiratory conditions are advised to consult their doctor prior to ascending to Kedarnath (11,750 ft) and carry prescribed medications. Emergency portable oxygen cylinders are carried in our support vehicles.
            </p>
          </div>
        )}

        {/* Tab 3: Privacy & Safety */}
        {activeTab === 'privacy' && (
          <div style={{ fontSize: '0.85rem', color: '#CBD5E1', lineHeight: 1.6 }}>
            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              padding: '12px 16px',
              borderRadius: '10px',
              marginBottom: '16px'
            }}>
              <div style={{ fontWeight: 700, color: '#10B981', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={15} /> 100% Data Confidentiality & Zero Spam Promise
              </div>
              <div>
                We respect your personal privacy. Your contact details, WhatsApp number, and travel schedules are never sold, rented, or shared with third-party marketers.
              </div>
            </div>

            <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>
              1. Information We Collect
            </h4>
            <p style={{ marginBottom: '12px' }}>
              We collect your name, phone number, email address, travel dates, and group size exclusively to generate customized tour estimates, biometric registration slips, and hotel reservation vouchers.
            </p>

            <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>
              2. Secure Communication & Helpline
            </h4>
            <p style={{ marginBottom: '12px' }}>
              All inquiries submitted through our website are transmitted over 256-bit SSL encryption. Communication regarding your trip happens directly through our official helpline (<strong>+91 86270 68616</strong>, <strong>+91 99711 35092</strong>, <strong>+91 98164 61616</strong>) and email (<strong>mankotiaholidays38@gmail.com</strong>).
            </p>

            <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>
              3. Official GST & Registered Offices
            </h4>
            <div style={{
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              borderRadius: '10px',
              padding: '12px 14px',
              marginBottom: '12px',
              fontSize: '0.82rem'
            }}>
              <div style={{ color: '#FCD34D', fontWeight: 700, marginBottom: '8px' }}>
                GSTIN / UIN: 07AGQPM4637F1Z4
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', color: '#CBD5E1' }}>
                <div>
                  <strong style={{ color: '#FFFFFF' }}>Delhi Office:</strong><br />
                  Ground Floor, WP-135A, Pitam Pura, New Delhi - 110034
                </div>
                <div>
                  <strong style={{ color: '#FFFFFF' }}>Manali Office:</strong><br />
                  Kwality Cafe, Hadimba Road, Manali, H.P. - 175131
                </div>
                <div>
                  <strong style={{ color: '#FFFFFF' }}>Una Office:</strong><br />
                  66 - Basant Vihar, Rakkar colony, Una, H.P. - 174303
                </div>
              </div>
            </div>

            <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>
              4. Opt-Out Anytime
            </h4>
            <p style={{ margin: 0 }}>
              You may request deletion of your inquiry details or opt out of trip advisory updates at any time by messaging us on WhatsApp or sending an email.
            </p>
          </div>
        )}

        {/* Modal Footer */}
        <div style={{
          marginTop: '20px',
          paddingTop: '14px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
            Questions? Call 24/7 Helpline: <strong style={{ color: '#F59E0B' }}>+91 98164 61616</strong>
          </div>

          <button
            onClick={onClose}
            className="btn btn-primary-gold btn-sm"
          >
            I Understand & Agree
          </button>
        </div>

      </div>
    </div>
  );
}
