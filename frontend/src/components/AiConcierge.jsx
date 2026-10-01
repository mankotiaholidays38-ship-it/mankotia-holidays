import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Send, X, Bot, RefreshCw, MessageCircle, Check, ArrowRight,
  Sparkles, Calendar, Users, MapPin, Phone, Mail, User,
  FileText, Shield, Info, CheckCircle, AlertCircle
} from 'lucide-react';

// ────────────────────────────────────────────────
// TEXT FORMATTER
// ────────────────────────────────────────────────
function formatInline(text) {
  if (!text) return '';
  const parts = [];
  const regex = /\*\*(.+?)\*\*/g;
  let last = 0, match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.substring(last, match.index));
    parts.push(<strong key={match.index} style={{ color: '#F8FAFC', fontWeight: 700 }}>{match[1]}</strong>);
    last = regex.lastIndex;
  }
  if (last < text.length) parts.push(text.substring(last));
  return parts.length > 0 ? parts : text;
}

function renderMsg(text, isUser = false) {
  if (!text) return null;
  if (isUser) return <span>{text}</span>;
  const paras = text.split(/\n\n+/);
  return paras.map((para, pi) => {
    const lines = para.split('\n').filter(l => l.trim());
    const isBullet = lines.length > 0 && lines.every(l => /^[•\-\*]\s+/.test(l.trim()));
    const isNum = lines.length > 0 && lines.every(l => /^\d+[\.\)]\s+/.test(l.trim()));
    if (isBullet) return (
      <ul key={pi} style={{ margin: '6px 0', paddingLeft: '18px', listStyleType: 'disc' }}>
        {lines.map((l, li) => <li key={li} style={{ marginBottom: '4px', lineHeight: 1.55 }}>{formatInline(l.trim().replace(/^[•\-\*]\s+/, ''))}</li>)}
      </ul>
    );
    if (isNum) return (
      <ol key={pi} style={{ margin: '6px 0', paddingLeft: '20px' }}>
        {lines.map((l, li) => <li key={li} style={{ marginBottom: '4px', lineHeight: 1.55 }}>{formatInline(l.trim().replace(/^\d+[\.\)]\s+/, ''))}</li>)}
      </ol>
    );
    return (
      <div key={pi} style={{ marginBottom: pi < paras.length - 1 ? '10px' : 0, lineHeight: 1.55 }}>
        {lines.map((l, li) => (
          <React.Fragment key={li}>{formatInline(l)}{li < lines.length - 1 && <br />}</React.Fragment>
        ))}
      </div>
    );
  });
}

// ────────────────────────────────────────────────
// DESTINATION DETECTOR
// ────────────────────────────────────────────────
function detectDest(text) {
  const t = (text || '').toLowerCase();
  if (t.includes('char dham') || t.includes('chardham') || t.includes('yamunotri')) return 'Sacred Char Dham Yatra Deluxe Tour';
  if (t.includes('do dham') || t.includes('kedar badri')) return 'Divine Do Dham Yatra: Kedarnath & Badrinath Ji';
  if (t.includes('helicopter') || t.includes('heli') || t.includes('kedarnath')) return 'Kedarnath Dham Helicopter & VIP Express';
  if (t.includes('nainital') || t.includes('corbett')) return 'Jewels of Uttarakhand: Nainital, Corbett & Rishikesh';
  if (t.includes('manali') || t.includes('shimla')) return 'Enchanting Manali, Solang Valley & Atal Tunnel';
  if (t.includes('kashmir') || t.includes('gulmarg') || t.includes('pahalgam')) return 'Paradise on Earth: Srinagar, Gulmarg & Pahalgam';
  if (t.includes('rajasthan') || t.includes('jaipur') || t.includes('udaipur')) return 'Royal Heritage of Rajasthan';
  return '';
}

// ────────────────────────────────────────────────
// CONSTANTS
// ────────────────────────────────────────────────
const WHATSAPP_NUM = '919811485028';

const INITIAL_MSG = {
  sender: 'bot',
  text: "**Namaste! 🙏** I am **Yatra Mitra**, your travel assistant at Mankotia Holidays. How can I help you plan your trip today?",
  options: [
    '🕉️ Char Dham Yatra 2026',
    '🚁 Kedarnath Helicopter',
    '⛰️ Do Dham (Kedar-Badri)',
    '🏔️ Uttarakhand Tours',
    '❄️ Himachal & Manali',
    '🌺 Kashmir Paradise',
    '📋 Cancellation Policy',
    '📜 Terms & Conditions',
  ],
};

const QUICK_CHIPS = [
  '🕉️ Char Dham',
  '🚁 Kedarnath Heli',
  '⛰️ Do Dham',
  '🏔️ Uttarakhand',
  '❄️ Manali/Shimla',
  '🌺 Kashmir',
  '💰 Seasonal Rates & Quote',
  '📋 Cancel Policy',
  '📜 T&C',
  '📞 Contact Us',
];

const isBookAction = (t) => {
  const s = (t || '').toLowerCase();
  return (
    s.includes('book now') || s.includes('📋 book') ||
    s.includes('fill query form') || s.includes('book karo') ||
    s.includes('booking karo') || s.includes('book trip') ||
    s.includes('📅 book')
  );
};

// ────────────────────────────────────────────────
// BOOKING FORM COMPONENT
// ────────────────────────────────────────────────
function BookingForm({ destination, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    destination: destination || '',
    travel_date: '', num_travelers: 2, message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inputStyle = {
    width: '100%', padding: '10px 12px', borderRadius: '10px',
    background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
    color: '#F1F5F9', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s'
  };
  const labelStyle = {
    fontSize: '0.74rem', color: '#94A3B8', marginBottom: '5px',
    display: 'flex', alignItems: 'center', gap: '5px'
  };
  const fieldWrap = { marginBottom: '11px' };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.travel_date) {
      setError('Please fill all required fields (Name, Phone, Email, Travel Date).');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/chatbot-book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, num_travelers: Number(form.num_travelers) })
      });
      const data = await res.json();
      if (data.success) {
        onSuccess(data);
      } else {
        setError(data.detail || 'Submission failed. Please try again.');
      }
    } catch {
      setError('Network error. Please contact us on WhatsApp: +91 9811485028');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'absolute', inset: 0, background: '#080F1E',
      borderRadius: '20px', zIndex: 20,
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      animation: 'slideUp 0.22s ease'
    }}>
      {/* Form Header */}
      <div style={{
        padding: '13px 16px',
        background: 'linear-gradient(135deg,#1E1B4B 0%,#0F1C3A 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '10px',
            background: 'linear-gradient(135deg,#F59E0B 0%,#D97706 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Calendar size={18} color="#0F172A" />
          </div>
          <div>
            <div style={{ fontSize: '0.93rem', fontWeight: 700, color: '#FFFFFF' }}>Book Your Trip</div>
            <div style={{ fontSize: '0.69rem', color: '#94A3B8' }}>No payment required at this stage</div>
          </div>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
          <X size={18} />
        </button>
      </div>

      {/* Form Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px' }}>
        <form onSubmit={handleSubmit}>

          <div style={fieldWrap}>
            <label style={labelStyle}><User size={11} /> Full Name *</label>
            <input style={inputStyle} placeholder="Aapka poora naam / Your full name" value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              onFocus={e => e.target.style.borderColor = '#8B5CF6'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}><Phone size={11} /> Phone / WhatsApp *</label>
            <input style={inputStyle} placeholder="+91 98XXXXXXXX" value={form.phone} type="tel"
              onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
              onFocus={e => e.target.style.borderColor = '#8B5CF6'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}><Mail size={11} /> Email Address *</label>
            <input style={inputStyle} placeholder="your@email.com" value={form.email} type="email"
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              onFocus={e => e.target.style.borderColor = '#8B5CF6'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}><MapPin size={11} /> Destination / Package</label>
            <input style={inputStyle} placeholder="e.g. Char Dham Yatra, Kashmir, Manali..." value={form.destination}
              onChange={e => setForm(p => ({ ...p, destination: e.target.value }))}
              onFocus={e => e.target.style.borderColor = '#8B5CF6'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '11px' }}>
            <div>
              <label style={labelStyle}><Calendar size={11} /> Travel Date *</label>
              <input
                style={{ ...inputStyle, colorScheme: 'dark' }}
                type="date" value={form.travel_date}
                onChange={e => setForm(p => ({ ...p, travel_date: e.target.value }))}
                onFocus={e => e.target.style.borderColor = '#8B5CF6'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
              />
            </div>
            <div>
              <label style={labelStyle}><Users size={11} /> No. of Travelers *</label>
              <input style={inputStyle} type="number" min="1" max="500" value={form.num_travelers}
                onChange={e => setForm(p => ({ ...p, num_travelers: e.target.value }))}
                onFocus={e => e.target.style.borderColor = '#8B5CF6'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
            </div>
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}><FileText size={11} /> Special Requirements / Message</label>
            <textarea
              style={{ ...inputStyle, minHeight: '68px', resize: 'vertical' }}
              placeholder="Senior citizens, children ages, allergies, preferred hotels..."
              value={form.message}
              onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              onFocus={e => e.target.style.borderColor = '#8B5CF6'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '8px', padding: '8px 12px', marginBottom: '10px',
              display: 'flex', gap: '8px', alignItems: 'flex-start',
              fontSize: '0.77rem', color: '#FCA5A5'
            }}>
              <AlertCircle size={13} style={{ flexShrink: 0, marginTop: '1px' }} /> {error}
            </div>
          )}

          <div style={{
            background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: '8px', padding: '8px 12px', marginBottom: '12px',
            fontSize: '0.72rem', color: '#6EE7B7',
            display: 'flex', gap: '7px', alignItems: 'flex-start'
          }}>
            <Shield size={12} style={{ flexShrink: 0, marginTop: '1px' }} />
            <span>No payment needed now. Our consultant will call you within 2 hours with a custom quote on WhatsApp.</span>
          </div>

          <button
            type="submit"
            id="chatbot-booking-submit"
            disabled={loading}
            style={{
              width: '100%', padding: '12px', borderRadius: '10px',
              background: loading ? 'rgba(139,92,246,0.5)' : 'linear-gradient(135deg,#8B5CF6 0%,#6366F1 100%)',
              border: 'none', color: '#FFFFFF', fontSize: '0.88rem', fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              boxShadow: loading ? 'none' : '0 4px 14px rgba(139,92,246,0.45)',
              transition: 'all 0.2s'
            }}
          >
            {loading ? (
              <>
                <span style={{
                  width: '14px', height: '14px',
                  border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff',
                  borderRadius: '50%', display: 'inline-block',
                  animation: 'spin 0.7s linear infinite'
                }} />
                Submitting...
              </>
            ) : (
              <><Send size={15} /> Send Booking Request</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// BOOKING SUCCESS
// ────────────────────────────────────────────────
function BookingSuccess({ data, onContinue }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, background: '#080F1E',
      borderRadius: '20px', zIndex: 20,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '30px', gap: '16px',
      animation: 'slideUp 0.22s ease'
    }}>
      <div style={{
        width: '68px', height: '68px', borderRadius: '50%',
        background: 'linear-gradient(135deg,#10B981,#059669)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 28px rgba(16,185,129,0.45)'
      }}>
        <CheckCircle size={36} color="#FFFFFF" />
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '1.08rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
          Booking Request Sent! 🎉
        </div>
        <div style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.6 }}>
          Hamari team aapko <strong style={{ color: '#FCD34D' }}>2 ghante</strong> mein WhatsApp ya call par contact karegi with your custom quote.
        </div>
        {data?.lead_id && (
          <div style={{ marginTop: '8px', fontSize: '0.70rem', color: '#475569' }}>
            Reference ID: {data.lead_id}
          </div>
        )}
      </div>

      <a
        href={data?.whatsapp_redirect_url}
        target="_blank"
        rel="noopener noreferrer"
        id="booking-success-whatsapp"
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '12px 24px', borderRadius: '10px',
          background: 'linear-gradient(135deg,#25D366,#128C7E)',
          color: '#FFFFFF', fontWeight: 700, fontSize: '0.88rem',
          textDecoration: 'none',
          boxShadow: '0 4px 16px rgba(37,211,102,0.35)'
        }}
      >
        <MessageCircle size={17} /> Chat on WhatsApp Now
      </a>

      <button
        onClick={onContinue}
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: '#CBD5E1', borderRadius: '8px',
          padding: '9px 22px', fontSize: '0.82rem', cursor: 'pointer'
        }}
      >
        Continue Chatting
      </button>
    </div>
  );
}

// ────────────────────────────────────────────────
// MAIN CHATBOT
// ────────────────────────────────────────────────
export default function AiConcierge({ onOpenInquiry }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MSG]);
  const [selectedMap, setSelectedMap] = useState({});
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastDest, setLastDest] = useState('Sacred Char Dham Yatra Deluxe Tour');
  const [showBookForm, setShowBookForm] = useState(false);
  const [bookDest, setBookDest] = useState('');
  const [bookSuccess, setBookSuccess] = useState(null);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isOpen, loading]);

  useEffect(() => {
    if (!isOpen && messages.length > 1) setUnread(p => p + 1);
  }, [messages]);
  useEffect(() => { if (isOpen) setUnread(0); }, [isOpen]);

  const openBookForm = useCallback((dest) => {
    setBookDest(dest || lastDest || '');
    setShowBookForm(true);
    setBookSuccess(null);
  }, [lastDest]);

  const handleBookSuccess = useCallback((data) => {
    setShowBookForm(false);
    setBookSuccess(data);
  }, []);

  const resetChat = () => {
    setMessages([INITIAL_MSG]);
    setSelectedMap({});
    setShowBookForm(false);
    setBookSuccess(null);
  };

  const toggleOpt = (msgIdx, opt) => {
    setSelectedMap(prev => {
      const cur = prev[msgIdx] || [];
      return { ...prev, [msgIdx]: cur.includes(opt) ? cur.filter(o => o !== opt) : [...cur, opt] };
    });
  };

  const sendText = async (query) => {
    const q = (query !== undefined ? query : input).trim();
    if (!q) return;

    const d = detectDest(q);
    if (d) setLastDest(d);
    if (isBookAction(q)) { openBookForm(d); return; }

    const newMsgs = [...messages, { sender: 'user', text: q }];
    setMessages(newMsgs);
    if (query === undefined) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat-concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: q,
          history: newMsgs.map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [m.text || '']
          }))
        })
      });
      const data = await res.json();
      if (data.success && data.reply) {
        const rd = detectDest(data.reply);
        if (rd) setLastDest(rd);
        setMessages(prev => [...prev, {
          sender: 'bot',
          text: data.reply,
          options: Array.isArray(data.options) ? data.options : [],
          allow_multiselect: data.allow_multiselect !== false,
          dest: rd || d || lastDest
        }]);
      } else {
        setMessages(prev => [...prev, {
          sender: 'bot',
          text: "Aapki inquiry receive ho gayi. Kripya **📋 Book Now** dabayein ya WhatsApp par humse sampark karein.",
          options: ['📋 Book Now', '🕉️ Char Dham Yatra 2026', 'Connect on WhatsApp'],
          allow_multiselect: true
        }]);
      }
    } catch {
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: "Network error aaya. Aap seedha **+91 9811485028** par WhatsApp ya call kar sakte hain.",
        options: ['📋 Book Now', '📞 Contact Us'],
        allow_multiselect: true
      }]);
    } finally {
      setLoading(false);
    }
  };

  const sendSelected = (msgIdx) => {
    const sel = selectedMap[msgIdx] || [];
    if (!sel.length) return;
    if (sel.some(isBookAction)) { openBookForm(lastDest); }
    const q = sel.length === 1 ? sel[0] : `Inquiring about: ${sel.join(', ')}`;
    setSelectedMap(prev => ({ ...prev, [msgIdx]: [] }));
    sendText(q);
  };

  const sendSingle = (opt) => {
    if (isBookAction(opt)) { openBookForm(lastDest); return; }
    sendText(opt);
  };

  return (
    <>
      {/* ── FLOATING TRIGGER ── */}
      {!isOpen && (
        <button
          id="aria-chatbot-trigger"
          onClick={() => setIsOpen(true)}
          className="floating-chatbot-btn"
          aria-label="Open Mankotia Holidays Travel Assistant - Yatra Mitra"
          title="Chat with Yatra Mitra (Mankotia Holidays)"
        >
          {/* Circular Mankotia Holidays Logo */}
          <div style={{
            width: '100%', height: '100%', borderRadius: '50%',
            overflow: 'hidden', background: '#FFFFFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <img
              src="/images/logo.jpg"
              alt="Mankotia Holidays"
              onError={(e) => { e.currentTarget.src = '/static/images/logo.jpg'; }}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>

          {/* Online green indicator dot */}
          <span
            className="pulse-dot"
            style={{
              backgroundColor: '#10B981',
              position: 'absolute',
              bottom: '1px',
              right: '1px',
              width: '13px',
              height: '13px',
              border: '2px solid #0B1120',
              borderRadius: '50%'
            }}
          />

          {/* Floating Pill Label */}
          <span className="chatbot-pill-label">
            <Sparkles size={12} color="#F59E0B" />
            Chat with Us
          </span>

          {unread > 0 && (
            <span style={{
              position: 'absolute', top: '-4px', left: '-4px',
              background: '#EF4444', color: '#fff', borderRadius: '50%',
              width: '20px', height: '20px', fontSize: '0.66rem', fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(239,68,68,0.5)',
              border: '2px solid #0B1120'
            }}>{unread > 9 ? '9+' : unread}</span>
          )}
        </button>
      )}

      {/* ── CHAT WINDOW ── */}
      {isOpen && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px',
          width: '94vw', maxWidth: '460px', height: '670px', maxHeight: '90vh',
          background: '#080F1E',
          borderRadius: '20px',
          border: '1px solid rgba(139,92,246,0.32)',
          boxShadow: '0 32px 75px rgba(0,0,0,0.92), 0 0 42px rgba(139,92,246,0.16)',
          zIndex: 1000, display: 'flex', flexDirection: 'column', overflow: 'hidden',
          animation: 'slideUp 0.28s cubic-bezier(0.16,1,0.3,1)'
        }}>

          {/* BOOKING FORM OVERLAY */}
          {showBookForm && (
            <BookingForm
              destination={bookDest}
              onClose={() => setShowBookForm(false)}
              onSuccess={handleBookSuccess}
            />
          )}

          {/* BOOKING SUCCESS OVERLAY */}
          {bookSuccess && (
            <BookingSuccess
              data={bookSuccess}
              onContinue={() => setBookSuccess(null)}
            />
          )}

          {/* ── HEADER ── */}
          <div style={{
            padding: '13px 15px',
            background: 'linear-gradient(135deg,#1E1B4B 0%,#0F1C3A 100%)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexShrink: 0
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: '#FFFFFF', padding: '2px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(245,158,11,0.4)',
                border: '2px solid #F59E0B',
                overflow: 'hidden', flexShrink: 0
              }}>
                <img
                  src="/images/logo.jpg"
                  alt="Mankotia Holidays Logo"
                  onError={(e) => { e.currentTarget.src = '/static/images/logo.jpg'; }}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Yatra Mitra
                  <span className="pulse-dot" style={{ backgroundColor: '#10B981' }} />
                </div>
                <div style={{ fontSize: '0.69rem', color: '#94A3B8' }}>Mankotia Holidays • AI Travel Assistant</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              {/* Book Now */}
              <button
                id="chatbot-header-book-btn"
                onClick={() => openBookForm(lastDest)}
                title="Open Booking Form"
                style={{
                  background: 'rgba(245,158,11,0.18)', border: '1px solid rgba(245,158,11,0.4)',
                  color: '#FCD34D', borderRadius: '8px', padding: '6px 9px',
                  display: 'flex', alignItems: 'center', gap: '4px',
                  fontSize: '0.69rem', fontWeight: 700, cursor: 'pointer'
                }}
              >
                <Calendar size={12} /> Book Now
              </button>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${WHATSAPP_NUM}?text=Hello%20Mankotia%20Holidays%2C%20I%20would%20like%20to%20inquire%20about%20your%20tour%20packages.`}
                target="_blank" rel="noopener noreferrer"
                title="WhatsApp"
                style={{
                  background: 'rgba(34,197,94,0.13)', border: '1px solid rgba(34,197,94,0.3)',
                  color: '#4ADE80', borderRadius: '8px', padding: '6px 8px',
                  display: 'flex', alignItems: 'center', gap: '4px',
                  fontSize: '0.69rem', fontWeight: 600, textDecoration: 'none'
                }}
              >
                <MessageCircle size={13} /> WhatsApp
              </a>

              {/* Policy icon */}
              <button
                title="Cancellation & T&C"
                onClick={() => sendText('cancellation policy')}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8', borderRadius: '8px', padding: '6px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              >
                <Shield size={14} />
              </button>

              {/* Reset */}
              <button onClick={resetChat} title="Reset chat" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8', borderRadius: '8px', padding: '6px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <RefreshCw size={14} />
              </button>

              {/* Close */}
              <button onClick={() => setIsOpen(false)} title="Close" style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '6px', display: 'flex' }}>
                <X size={18} />
              </button>
            </div>
          </div>

          {/* ── MESSAGES ── */}
          <div style={{
            flex: 1, padding: '14px', overflowY: 'auto',
            display: 'flex', flexDirection: 'column', gap: '12px',
            background: '#080F1E'
          }}>
            {messages.map((m, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start', gap: '8px', alignItems: 'flex-start' }}>
                {m.sender === 'bot' && (
                  <div style={{
                    width: '26px', height: '26px', borderRadius: '50%',
                    background: '#FFFFFF', padding: '1px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: '2px',
                    border: '1.5px solid #F59E0B',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                    overflow: 'hidden'
                  }}>
                    <img
                      src="/images/logo.jpg"
                      alt="Mankotia Holidays"
                      onError={(e) => { e.currentTarget.src = '/static/images/logo.jpg'; }}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
                )}

                <div style={{
                  maxWidth: '88%', padding: '11px 15px',
                  borderRadius: m.sender === 'user' ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
                  background: m.sender === 'user' ? 'linear-gradient(135deg,#F59E0B 0%,#D97706 100%)' : '#1E293B',
                  color: m.sender === 'user' ? '#0F172A' : '#E2E8F0',
                  fontWeight: m.sender === 'user' ? 600 : 400,
                  fontSize: '0.85rem', lineHeight: 1.55,
                  boxShadow: '0 3px 10px rgba(0,0,0,0.3)',
                  border: m.sender === 'bot' ? '1px solid rgba(255,255,255,0.06)' : 'none'
                }}>
                  {renderMsg(m.text, m.sender === 'user')}

                  {/* Quick Options */}
                  {m.sender === 'bot' && m.options && m.options.length > 0 && (
                    <div style={{ marginTop: '11px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                      <div style={{ fontSize: '0.69rem', color: '#64748B', marginBottom: '7px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Sparkles size={10} style={{ color: '#F59E0B' }} />
                        <span style={{ color: '#CBD5E1', fontWeight: 600 }}>Quick options:</span>
                        {(selectedMap[idx] || []).length > 0 && (
                          <span style={{ marginLeft: 'auto', background: 'rgba(16,185,129,0.2)', color: '#34D399', padding: '1px 7px', borderRadius: '10px', fontSize: '0.65rem', fontWeight: 700 }}>
                            {(selectedMap[idx] || []).length} selected
                          </span>
                        )}
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                        {m.options.map((opt, oi) => {
                          const isSel = (selectedMap[idx] || []).includes(opt);
                          const isBk = isBookAction(opt);
                          return (
                            <div key={oi} style={{
                              display: 'inline-flex', alignItems: 'stretch', borderRadius: '8px',
                              border: isBk ? '1px solid rgba(245,158,11,0.6)' : isSel ? '1px solid #10B981' : '1px solid rgba(255,255,255,0.12)',
                              background: isBk ? 'rgba(245,158,11,0.18)' : isSel ? 'rgba(16,185,129,0.16)' : 'rgba(255,255,255,0.04)',
                              overflow: 'hidden', transition: 'all 0.15s'
                            }}>
                              <button
                                type="button"
                                onClick={() => isBk ? sendSingle(opt) : toggleOpt(idx, opt)}
                                style={{
                                  display: 'flex', alignItems: 'center', gap: '5px',
                                  padding: '5px 9px', background: 'none', border: 'none',
                                  color: isBk ? '#FCD34D' : isSel ? '#FFFFFF' : '#CBD5E1',
                                  fontSize: '0.73rem', fontWeight: isBk || isSel ? 700 : 400, cursor: 'pointer', textAlign: 'left'
                                }}
                              >
                                {isBk ? (
                                  <Calendar size={11} color="#F59E0B" />
                                ) : (
                                  <span style={{
                                    width: '13px', height: '13px', borderRadius: '3px',
                                    border: isSel ? '1px solid #10B981' : '1px solid rgba(255,255,255,0.3)',
                                    background: isSel ? '#10B981' : 'transparent',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                  }}>
                                    {isSel && <Check size={9} color="#FFF" strokeWidth={3} />}
                                  </span>
                                )}
                                <span>{opt}</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => sendSingle(opt)}
                                title={`Ask: ${opt}`}
                                style={{
                                  padding: '0 7px', background: 'rgba(255,255,255,0.04)',
                                  border: 'none', borderLeft: '1px solid rgba(255,255,255,0.08)',
                                  color: '#94A3B8', cursor: 'pointer',
                                  display: 'flex', alignItems: 'center', transition: 'background 0.15s'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.35)'; e.currentTarget.style.color = '#FFF'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#94A3B8'; }}
                              >
                                <ArrowRight size={11} />
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      {/* Multi-select action */}
                      {(selectedMap[idx] || []).length > 0 && (
                        <div style={{ marginTop: '7px', display: 'flex', gap: '6px' }}>
                          <button
                            type="button"
                            onClick={() => sendSelected(idx)}
                            style={{
                              flex: 1, padding: '7px 12px', borderRadius: '8px',
                              background: 'linear-gradient(135deg,#10B981 0%,#059669 100%)',
                              border: 'none', color: '#FFF', fontSize: '0.75rem', fontWeight: 700,
                              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                              boxShadow: '0 3px 10px rgba(16,185,129,0.3)'
                            }}
                          >
                            <Check size={13} strokeWidth={2.5} />
                            Send {(selectedMap[idx] || []).length} Selected
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedMap(p => ({ ...p, [idx]: [] }))}
                            style={{ padding: '7px 11px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8', fontSize: '0.72rem', cursor: 'pointer' }}
                          >
                            Clear
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading */}
            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '26px', height: '26px', borderRadius: '50%',
                  background: '#FFFFFF', padding: '1px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  border: '1.5px solid #F59E0B',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                  overflow: 'hidden'
                }}>
                  <img
                    src="/images/logo.jpg"
                    alt="Mankotia Holidays"
                    onError={(e) => { e.currentTarget.src = '/static/images/logo.jpg'; }}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
                <div style={{ padding: '10px 14px', borderRadius: '16px', background: '#1E293B', color: '#94A3B8', fontSize: '0.79rem', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ width: '12px', height: '12px', border: '2px solid rgba(245,158,11,0.3)', borderTopColor: '#F59E0B', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                  Yatra Mitra is typing...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* ── QUICK CHIPS ── */}
          <div style={{
            padding: '7px 10px', background: '#0D1729',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            overflowX: 'auto', whiteSpace: 'nowrap',
            display: 'flex', gap: '5px', flexShrink: 0,
            scrollbarWidth: 'none'
          }}>
            {QUICK_CHIPS.map((q, i) => (
              <button
                key={i}
                onClick={() => sendSingle(q)}
                style={{
                  padding: '4px 11px', borderRadius: '20px', flexShrink: 0,
                  background: isBookAction(q) ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.05)',
                  border: isBookAction(q) ? '1px solid rgba(245,158,11,0.45)' : '1px solid rgba(255,255,255,0.1)',
                  color: isBookAction(q) ? '#FCD34D' : '#CBD5E1',
                  fontSize: '0.71rem', fontWeight: isBookAction(q) ? 700 : 400,
                  cursor: 'pointer', transition: 'all 0.15s'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.22)'; e.currentTarget.style.borderColor = '#8B5CF6'; e.currentTarget.style.color = '#FFF'; }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = isBookAction(q) ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = isBookAction(q) ? 'rgba(245,158,11,0.45)' : 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = isBookAction(q) ? '#FCD34D' : '#CBD5E1';
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* ── INPUT BAR ── */}
          <div style={{
            padding: '10px 13px', background: '#0D1729',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', gap: '9px', flexShrink: 0
          }}>
            <input
              id="aria-chat-input"
              type="text"
              className="form-control"
              placeholder="English, Hindi, ya Hinglish mein likho..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendText(); } }}
              style={{ padding: '10px 13px', fontSize: '0.84rem', flex: 1 }}
            />
            <button
              id="aria-send-btn"
              onClick={() => sendText()}
              disabled={loading || !input.trim()}
              style={{
                width: '40px', height: '40px', borderRadius: '11px',
                background: input.trim() ? 'linear-gradient(135deg,#8B5CF6 0%,#6366F1 100%)' : 'rgba(139,92,246,0.25)',
                border: 'none', color: '#FFF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: input.trim() ? 'pointer' : 'not-allowed', flexShrink: 0,
                boxShadow: input.trim() ? '0 4px 12px rgba(139,92,246,0.45)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              <Send size={16} />
            </button>
          </div>

          {/* ── POLICY FOOTER ── */}
          <div style={{
            padding: '5px 12px', background: '#070D1B',
            borderTop: '1px solid rgba(255,255,255,0.04)',
            display: 'flex', gap: '8px', justifyContent: 'center', flexShrink: 0,
            flexWrap: 'wrap'
          }}>
            {[
              { icon: <Shield size={9} />, label: 'Cancellation Policy', q: 'cancellation policy' },
              { icon: <FileText size={9} />, label: 'Terms & Conditions', q: 'terms and conditions' },
              { icon: <Info size={9} />, label: 'Contact Us', q: 'contact information' },
            ].map((link, i) => (
              <button
                key={i}
                onClick={() => sendText(link.q)}
                style={{
                  background: 'none', border: 'none', color: '#334155',
                  fontSize: '0.63rem', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '3px',
                  padding: '2px 4px', borderRadius: '4px', transition: 'color 0.15s'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#94A3B8'}
                onMouseLeave={e => e.currentTarget.style.color = '#334155'}
              >
                {link.icon} {link.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Global keyframes */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(18px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
      `}</style>
    </>
  );
}


