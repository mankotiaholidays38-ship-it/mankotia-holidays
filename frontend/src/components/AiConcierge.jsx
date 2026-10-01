import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Send, X, Bot, RefreshCw, MessageCircle, Check, ArrowRight,
  Sparkles, Calendar, Users, MapPin, Phone, Mail, User,
  FileText, Shield, Info, CheckCircle, AlertCircle, ShieldCheck, Award, Building2
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
  if (t.includes('char dham') || t.includes('chardham') || t.includes('yamunotri') || t.includes('gangotri')) {
    return 'Sacred Char Dham Yatra Deluxe Tour (10N/11D)';
  }
  if (t.includes('do dham') || t.includes('kedar badri') || t.includes('kedar-badri') || t.includes('dodham')) {
    return 'Divine Do Dham Yatra: Kedarnath & Badrinath Ji (5N/6D)';
  }
  if (t.includes('helicopter') || t.includes('heli') || t.includes('chopper') || t.includes('shuttle')) {
    return 'Kedarnath Dham Helicopter & VIP Express';
  }
  if (t.includes('kedarnath')) {
    return 'Kedarnath Dham Yatra';
  }
  if (t.includes('badrinath')) {
    return 'Badrinath Dham Yatra';
  }
  if (t.includes('nainital') || t.includes('corbett') || t.includes('jim corbett')) {
    return 'Jewels of Uttarakhand: Nainital, Corbett & Rishikesh';
  }
  if (t.includes('uttarakhand') || t.includes('mussoorie') || t.includes('rishikesh') || t.includes('auli')) {
    return 'Uttarakhand Special Tour: Mussoorie, Rishikesh & Auli';
  }
  if (t.includes('manali') || t.includes('shimla') || t.includes('himachal') || t.includes('solang') || t.includes('atal tunnel')) {
    return 'Enchanting Himachal: Manali, Solang Valley & Shimla';
  }
  if (t.includes('kashmir') || t.includes('gulmarg') || t.includes('pahalgam') || t.includes('srinagar')) {
    return 'Paradise on Earth: Srinagar, Gulmarg & Pahalgam';
  }
  if (t.includes('rajasthan') || t.includes('jaipur') || t.includes('udaipur') || t.includes('jodhpur')) {
    return 'Royal Heritage of Rajasthan: Jaipur & Udaipur';
  }
  if (t.includes('golden triangle') || t.includes('delhi agra') || t.includes('taj mahal')) {
    return 'Golden Triangle: Delhi, Agra & Jaipur';
  }
  if (t.includes('goa')) {
    return 'Goa Beach Holiday & Coastal Retreat';
  }
  if (t.includes('kerala') || t.includes('munnar') || t.includes('alleppey')) {
    return 'Serene Kerala: Munnar & Alleppey Houseboat';
  }
  return '';
}

// ────────────────────────────────────────────────
// CONSTANTS
// ────────────────────────────────────────────────
const WHATSAPP_PRIMARY = '919816461616';
const WHATSAPP_SECONDARY = '919811485028';
const WHATSAPP_NUM = WHATSAPP_PRIMARY;
const PHONE_PRIMARY = '+919816461616';
const PHONE_SECONDARY = '+919811485028';
const AGENCY_EMAIL = 'mankotiaholidays38@gmail.com';

const INITIAL_MSG = {
  sender: 'bot',
  text: "**Namaste and Welcome to Mankotia Holidays.** 🙏\n\nI am **Yatra Mitra**, your Senior Travel Concierge. I am honored to assist you with sacred Himalayan pilgrimages, VIP Kedarnath helicopter arrangements, and bespoke private holiday tours across India.\n\nPlease select an itinerary below or specify your destination and preferred travel dates:",
  options: [
    '💬 Connect on WhatsApp',
    '📞 Contact Us',
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
  '💬 Connect on WhatsApp',
  '📞 Contact Us',
  '🕉️ Char Dham',
  '🚁 Kedarnath Heli',
  '⛰️ Do Dham',
  '🏔️ Uttarakhand',
  '❄️ Manali/Shimla',
  '🌺 Kashmir',
  '💰 Seasonal Rates & Quote',
  '📋 Cancel Policy',
  '📜 T&C',
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

const isWhatsAppAction = (t) => {
  const s = (t || '').toLowerCase().trim();
  return (
    s.includes('connect on whatsapp') ||
    s.includes('open whatsapp') ||
    s.includes('chat on whatsapp') ||
    s.includes('whatsapp chat') ||
    s.includes('whatsapp admin') ||
    s.includes('whatsapp par') ||
    s.includes('whatsapp pe') ||
    s.includes('wa.me') ||
    s === 'whatsapp' ||
    s === '💬 whatsapp' ||
    s === '📱 whatsapp' ||
    s.includes('connect whatsapp')
  );
};

const isContactAction = (t) => {
  const s = (t || '').toLowerCase().trim();
  return (
    s.includes('contact us') ||
    s.includes('bcontact us') ||
    s.includes('contact information') ||
    s.includes('contact details') ||
    s.includes('contact number') ||
    s.includes('reach our team') ||
    s.includes('reach us') ||
    s.includes('how to contact') ||
    s.includes('sampark') ||
    s === 'contact' ||
    s === '📞 contact' ||
    s === 'helpline' ||
    s === 'support'
  );
};

const isCallAction = (t) => {
  const s = (t || '').toLowerCase().trim();
  return (
    (s.includes('call') && !s.includes('cancel')) ||
    s.includes('dial') ||
    s.includes('phone')
  );
};

const isEmailAction = (t) => {
  const s = (t || '').toLowerCase().trim();
  return (
    s.includes('email') ||
    s.includes('mail') ||
    s.includes('send email')
  );
};

const isMenuAction = (t) => {
  const s = (t || '').toLowerCase().trim();
  return (
    s.includes('back to menu') ||
    s.includes('main menu') ||
    s.includes('menu par') ||
    s === 'menu' ||
    s === '🔙 menu' ||
    s === '🔙 back to menu' ||
    s === 'home' ||
    s === 'start again'
  );
};

const isPolicyAction = (t) => {
  const s = (t || '').toLowerCase().trim();
  return (
    s.includes('cancellation') ||
    s.includes('cancel policy') ||
    s.includes('refund') ||
    s.includes('terms') ||
    s.includes('condition') ||
    s.includes('t&c') ||
    s.includes('tnc')
  );
};

const isDirectAction = (t) => {
  return (
    isBookAction(t) ||
    isWhatsAppAction(t) ||
    isContactAction(t) ||
    isCallAction(t) ||
    isEmailAction(t) ||
    isMenuAction(t)
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
    width: '100%', padding: '10px 12px', borderRadius: '8px',
    background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.14)',
    color: '#F8FAFC', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s'
  };
  const labelStyle = {
    fontSize: '0.74rem', color: '#94A3B8', marginBottom: '5px',
    display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600
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
      setError('Network error. Please contact us on WhatsApp: +91 9816461616');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'absolute', inset: 0, background: '#0B1120',
      borderRadius: '16px', zIndex: 20,
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      animation: 'slideUp 0.22s ease'
    }}>
      {/* Form Header */}
      <div style={{
        padding: '13px 16px',
        background: 'linear-gradient(180deg, #0B1120 0%, #131F37 100%)',
        borderBottom: '1px solid rgba(217, 119, 6, 0.22)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(217, 119, 6, 0.35)'
          }}>
            <Calendar size={18} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ fontSize: '0.93rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.2px' }}>
              Tour Reservation &amp; Inquiry Desk
            </div>
            <div style={{ fontSize: '0.69rem', color: '#94A3B8' }}>
              Official Booking Portal • Zero advance payment required
            </div>
          </div>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '4px' }}>
          <X size={18} />
        </button>
      </div>

      {/* Form Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px' }}>
        <form onSubmit={handleSubmit}>

          <div style={fieldWrap}>
            <label style={labelStyle}><User size={11} /> Primary Traveler Full Name *</label>
            <input style={inputStyle} placeholder="Full legal name" value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              onFocus={e => e.target.style.borderColor = '#D97706'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.14)'} />
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}><Phone size={11} /> Phone / WhatsApp Mobile *</label>
            <input style={inputStyle} placeholder="+91 98XXXXXXXX" value={form.phone} type="tel"
              onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
              onFocus={e => e.target.style.borderColor = '#D97706'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.14)'} />
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}><Mail size={11} /> Corporate / Personal Email *</label>
            <input style={inputStyle} placeholder="your@email.com" value={form.email} type="email"
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              onFocus={e => e.target.style.borderColor = '#D97706'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.14)'} />
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}><MapPin size={11} /> Preferred Destination / Itinerary</label>
            <input style={inputStyle} placeholder="e.g. Char Dham Yatra, Kashmir, Himachal..." value={form.destination}
              onChange={e => setForm(p => ({ ...p, destination: e.target.value }))}
              onFocus={e => e.target.style.borderColor = '#D97706'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.14)'} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '11px' }}>
            <div>
              <label style={labelStyle}><Calendar size={11} /> Proposed Travel Date *</label>
              <input
                style={{ ...inputStyle, colorScheme: 'dark' }}
                type="date" value={form.travel_date}
                onChange={e => setForm(p => ({ ...p, travel_date: e.target.value }))}
                onFocus={e => e.target.style.borderColor = '#D97706'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.14)'}
              />
            </div>
            <div>
              <label style={labelStyle}><Users size={11} /> Number of Guests *</label>
              <input style={inputStyle} type="number" min="1" max="500" value={form.num_travelers}
                onChange={e => setForm(p => ({ ...p, num_travelers: e.target.value }))}
                onFocus={e => e.target.style.borderColor = '#D97706'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.14)'} />
            </div>
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}><FileText size={11} /> Special Preferences / Room Category / Requirements</label>
            <textarea
              style={{ ...inputStyle, minHeight: '68px', resize: 'vertical' }}
              placeholder="Senior citizens in party, hotel tier preference, meal restrictions, vehicle type..."
              value={form.message}
              onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              onFocus={e => e.target.style.borderColor = '#D97706'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.14)'}
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
            background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.22)',
            borderRadius: '8px', padding: '8px 12px', marginBottom: '12px',
            fontSize: '0.72rem', color: '#86EFAC',
            display: 'flex', gap: '7px', alignItems: 'flex-start'
          }}>
            <ShieldCheck size={13} style={{ flexShrink: 0, marginTop: '1px', color: '#34D399' }} />
            <span>Guaranteed zero advance commitment. Our tour coordinator will connect within 2 hours with customized options.</span>
          </div>

          <button
            type="submit"
            id="chatbot-booking-submit"
            disabled={loading}
            style={{
              width: '100%', padding: '12px', borderRadius: '8px',
              background: loading ? 'rgba(217,119,6,0.5)' : 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
              border: 'none', color: '#FFFFFF', fontSize: '0.88rem', fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              boxShadow: loading ? 'none' : '0 4px 14px rgba(217,119,6,0.4)',
              transition: 'all 0.2s', letterSpacing: '0.2px'
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
                Processing Inquiry...
              </>
            ) : (
              <><Send size={15} /> Send Reservation Inquiry</>
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
      position: 'absolute', inset: 0, background: '#0B1120',
      borderRadius: '16px', zIndex: 20,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '30px', gap: '16px',
      animation: 'slideUp 0.22s ease'
    }}>
      <div style={{
        width: '68px', height: '68px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 28px rgba(16,185,129,0.4)'
      }}>
        <CheckCircle size={36} color="#FFFFFF" />
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '1.12rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px', letterSpacing: '0.2px' }}>
          Booking Inquiry Registered
        </div>
        <div style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.6, maxWidth: '340px' }}>
          Thank you. Our senior tour coordinator will review your preferences and contact you via WhatsApp / phone within <strong style={{ color: '#FCD34D' }}>2 hours</strong> with your tailored proposal.
        </div>
        {data?.lead_id && (
          <div style={{ marginTop: '10px', fontSize: '0.72rem', color: '#64748B', fontFamily: 'monospace' }}>
            Reference Number: {data.lead_id}
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
          padding: '11px 22px', borderRadius: '8px',
          background: 'linear-gradient(135deg, #15803D 0%, #0F766E 100%)',
          color: '#FFFFFF', fontWeight: 700, fontSize: '0.86rem',
          textDecoration: 'none',
          boxShadow: '0 4px 14px rgba(21,128,61,0.35)'
        }}
      >
        <MessageCircle size={16} /> Open Admin WhatsApp Desk
      </a>

      <button
        onClick={onContinue}
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: '#CBD5E1', borderRadius: '8px',
          padding: '8px 20px', fontSize: '0.82rem', cursor: 'pointer'
        }}
      >
        Return to Concierge Chat
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

  const connectAdminWhatsApp = (itineraryOverride) => {
    const itinerary = itineraryOverride || lastDest || 'Sacred Char Dham Yatra Deluxe Tour (10N/11D)';
    const waText = `Namaste Mankotia Holidays! 🙏\n\nI am inquiring about the itinerary: *${itinerary}*.\nPlease share customized package details, available travel dates, and best seasonal price quote.\n\nThank you!`;
    const waUrl = `https://wa.me/${WHATSAPP_PRIMARY}?text=${encodeURIComponent(waText)}`;

    try {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('Failed to open WhatsApp:', err);
    }

    setMessages(prev => [
      ...prev,
      { sender: 'user', text: '💬 Connect on WhatsApp' },
      {
        sender: 'bot',
        text: `Connecting you directly to the Mankotia Holidays WhatsApp Desk for **${itinerary}**.\n\nYour session is opening with your selected itinerary pre-filled. If WhatsApp did not launch automatically, please click the direct button below:`,
        isWhatsAppRedirect: true,
        selectedItinerary: itinerary,
        whatsappUrl: waUrl,
        options: [
          '📞 Contact Us',
          '📋 Book Now',
          '🕉️ Char Dham 2026',
          '🚁 Kedarnath Heli',
          '⛰️ Do Dham'
        ],
        allow_multiselect: true
      }
    ]);
  };

  const openContactOptions = (itineraryOverride) => {
    const itinerary = itineraryOverride || lastDest || 'Custom Tour Package';
    const waText = `Namaste Mankotia Holidays! 🙏\n\nI would like to contact your team regarding *${itinerary}*.\nPlease share your package details, available dates, and customized quotes.`;
    const waUrl = `https://wa.me/${WHATSAPP_PRIMARY}?text=${encodeURIComponent(waText)}`;

    setMessages(prev => [
      ...prev,
      { sender: 'user', text: '📞 Contact Us' },
      {
        sender: 'bot',
        isContactCard: true,
        selectedItinerary: itinerary,
        whatsappUrl: waUrl,
        text: `**Mankotia Holidays Official Contact Desk** 📞\n\nOur Senior Tour Coordinators are available 24/7. You may connect directly via direct telephone lines, official WhatsApp desk, or corporate email:`,
        options: [
          '💬 Connect on WhatsApp',
          `📞 Call ${PHONE_PRIMARY}`,
          `📞 Call ${PHONE_SECONDARY}`,
          '✉️ Send Email Inquiry',
          '📋 Book Now'
        ],
        allow_multiselect: false
      }
    ]);
  };

  const makeDirectCall = (opt) => {
    const cleaned = (opt || '').replace(/[^0-9]/g, '');
    let targetPhone = PHONE_PRIMARY;
    if (cleaned.includes('9811485028')) {
      targetPhone = PHONE_SECONDARY;
    } else if (cleaned.includes('8627068616')) {
      targetPhone = '+918627068616';
    } else if (cleaned.includes('9971135092')) {
      targetPhone = '+919971135092';
    } else if (cleaned.length >= 10) {
      targetPhone = `+${cleaned}`;
    }
    window.location.href = `tel:${targetPhone}`;
  };

  const makeDirectEmail = () => {
    const subject = encodeURIComponent(`Tour Package Inquiry: ${lastDest || 'Mankotia Holidays'}`);
    const body = encodeURIComponent(
      `Namaste Mankotia Holidays team,\n\nI am inquiring about the ${lastDest || 'tour'} package.\n\nPlease share customized quotes, available travel dates, and hotel options.\n\nThank you!`
    );
    window.location.href = `mailto:${AGENCY_EMAIL}?subject=${subject}&body=${body}`;
  };

  const openMainMenu = () => {
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: '🔙 Back to Menu' },
      {
        sender: 'bot',
        text: "**Main Menu** 🧭\n\nWelcome back. How may I assist you with Mankotia Holidays today? Please select an itinerary or service below, or enter your travel schedule:",
        options: [
          '🕉️ Char Dham Yatra 2026',
          '🚁 Kedarnath Helicopter',
          '⛰️ Do Dham (Kedar-Badri)',
          '🏔️ Uttarakhand Tours',
          '❄️ Himachal & Manali',
          '🌺 Kashmir Paradise',
          '💬 Connect on WhatsApp',
          '📞 Contact Us',
          '📋 Cancellation Policy',
          '📜 Terms & Conditions',
        ],
        allow_multiselect: true
      }
    ]);
  };

  const sendText = async (query) => {
    const q = (query !== undefined ? query : input).trim();
    if (!q) return;

    if (isMenuAction(q)) {
      if (query === undefined) setInput('');
      openMainMenu();
      return;
    }

    const d = detectDest(q);
    if (d) setLastDest(d);

    if (isBookAction(q)) { openBookForm(d || lastDest); return; }
    if (isWhatsAppAction(q)) { connectAdminWhatsApp(d || lastDest); return; }
    if (isContactAction(q)) { openContactOptions(d || lastDest); return; }
    if (isCallAction(q)) { makeDirectCall(q); return; }
    if (isEmailAction(q)) { makeDirectEmail(); return; }

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

        let replyOpts = Array.isArray(data.options) ? [...data.options] : [];
        if (isPolicyAction(q) || isPolicyAction(data.reply)) {
          if (!replyOpts.some(isMenuAction)) {
            replyOpts = ['🔙 Back to Menu', ...replyOpts];
          }
        }

        setMessages(prev => [...prev, {
          sender: 'bot',
          text: data.reply,
          options: replyOpts,
          allow_multiselect: data.allow_multiselect !== false,
          dest: rd || d || lastDest
        }]);
      } else {
        let fallbackOpts = ['📋 Book Now', '🕉️ Char Dham Yatra 2026', '💬 Connect on WhatsApp', '📞 Contact Us'];
        if (isPolicyAction(q)) {
          fallbackOpts = ['🔙 Back to Menu', ...fallbackOpts];
        }
        setMessages(prev => [...prev, {
          sender: 'bot',
          text: "Thank you for your inquiry. Please click **📋 Book Now** to submit a booking form, or connect with our Senior Travel Coordinators directly on WhatsApp.",
          options: fallbackOpts,
          allow_multiselect: true
        }]);
      }
    } catch {
      let errOpts = ['📋 Book Now', '💬 Connect on WhatsApp', '📞 Contact Us'];
      if (isPolicyAction(q)) {
        errOpts = ['🔙 Back to Menu', ...errOpts];
      }
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: `Unable to reach the network. You may call or message our 24/7 helpline directly at **${PHONE_PRIMARY}**.`,
        options: errOpts,
        allow_multiselect: true
      }]);
    } finally {
      setLoading(false);
    }
  };

  const sendSelected = (msgIdx) => {
    const sel = selectedMap[msgIdx] || [];
    if (!sel.length) return;

    if (sel.some(isMenuAction)) {
      setSelectedMap(prev => ({ ...prev, [msgIdx]: [] }));
      openMainMenu();
      return;
    }

    const hasBk = sel.some(isBookAction);
    const hasWa = sel.some(isWhatsAppAction);
    const hasContact = sel.some(isContactAction);

    // If an itinerary was also selected among the items
    const itineraryChoice = sel.find(s => !isDirectAction(s));
    let chosenDest = lastDest;
    if (itineraryChoice) {
      const rd = detectDest(itineraryChoice);
      chosenDest = rd || itineraryChoice.replace(/[🕉️🚁⛰️🏔️❄️🌺📋📜📞💬📱💰]/g, '').trim();
      setLastDest(chosenDest);
    }

    setSelectedMap(prev => ({ ...prev, [msgIdx]: [] }));

    if (hasBk) {
      openBookForm(chosenDest);
      return;
    }
    if (hasWa) {
      connectAdminWhatsApp(chosenDest);
      return;
    }
    if (hasContact) {
      openContactOptions(chosenDest);
      return;
    }

    const q = sel.length === 1 ? sel[0] : `Inquiring about: ${sel.join(', ')}`;
    sendText(q);
  };

  const sendSingle = (opt) => {
    if (isMenuAction(opt)) { openMainMenu(); return; }
    if (isBookAction(opt)) { openBookForm(lastDest); return; }
    if (isWhatsAppAction(opt)) { connectAdminWhatsApp(lastDest); return; }
    if (isContactAction(opt)) { openContactOptions(lastDest); return; }
    if (isCallAction(opt)) { makeDirectCall(opt); return; }
    if (isEmailAction(opt)) { makeDirectEmail(); return; }
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
          aria-label="Open Mankotia Holidays Executive Concierge - Yatra Mitra"
          title="Mankotia Holidays Official Travel Desk"
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
            <ShieldCheck size={13} color="#F59E0B" />
            Official Travel Desk
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
        <div
          id="mankotia-concierge-window"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: 'min(440px, calc(100vw - 32px))',
            height: 'min(640px, calc(100vh - 36px))',
            maxHeight: 'calc(100vh - 36px)',
            background: '#0B1120',
            borderRadius: '16px',
            border: '1px solid rgba(217, 119, 6, 0.32)',
            borderTop: '3px solid #D97706',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(217, 119, 6, 0.15)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'slideUp 0.24s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >

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
            padding: '11px 14px',
            background: 'linear-gradient(180deg, #0B1120 0%, #131F37 100%)',
            borderBottom: '1px solid rgba(217, 119, 6, 0.20)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexShrink: 0, gap: '10px'
          }}>
            {/* Identity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '50%',
                background: '#FFFFFF', padding: '2px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 3px 10px rgba(0,0,0,0.4)',
                border: '2px solid #D97706',
                overflow: 'hidden', flexShrink: 0
              }}>
                <img
                  src="/images/logo.jpg"
                  alt="Mankotia Holidays"
                  onError={(e) => { e.currentTarget.src = '/static/images/logo.jpg'; }}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'nowrap' }}>
                  <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Mankotia Holidays
                  </span>
                  <span style={{
                    fontSize: '0.58rem', background: 'rgba(217,119,6,0.18)', color: '#FCD34D',
                    border: '1px solid rgba(217,119,6,0.45)', borderRadius: '4px',
                    padding: '1px 5px', fontWeight: 700, letterSpacing: '0.4px', textTransform: 'uppercase',
                    flexShrink: 0
                  }}>
                    Official Desk
                  </span>
                </div>
                <div style={{ fontSize: '0.68rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px', whiteSpace: 'nowrap' }}>
                  <span>Yatra Mitra (Senior Concierge)</span>
                  <span style={{ color: '#475569' }}>•</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#34D399', fontWeight: 600 }}>
                    <span className="pulse-dot" style={{ backgroundColor: '#10B981', width: '6px', height: '6px' }} />
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Utility Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              <button
                onClick={resetChat}
                title="Restart Conversation"
                style={{
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                  color: '#94A3B8', borderRadius: '7px', padding: '6px 7px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              >
                <RefreshCw size={13} />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Close Concierge Desk"
                aria-label="Close Chatbot"
                style={{
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                  color: '#94A3B8', borderRadius: '7px', padding: '5px 6px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#EF4444'; e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* ── DEDICATED 3-COLUMN ACTION STRIP (ZERO OVERLAPPING GUARANTEED) ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '6px',
            padding: '7px 12px 9px 12px',
            background: '#0D1526',
            borderBottom: '1px solid rgba(217, 119, 6, 0.22)',
            flexShrink: 0
          }}>
            {/* Book Tour */}
            <button
              id="chatbot-header-book-btn"
              onClick={() => openBookForm(lastDest)}
              title="Open Official Tour Reservation Form"
              style={{
                background: 'rgba(217,119,6,0.15)', border: '1px solid rgba(217,119,6,0.42)',
                color: '#FCD34D', borderRadius: '7px', padding: '6px 4px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer',
                transition: 'all 0.15s', whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(217,119,6,0.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(217,119,6,0.15)'; }}
            >
              <Calendar size={12} color="#F59E0B" /> Book Tour
            </button>

            {/* WhatsApp with Selected Itinerary */}
            <button
              id="chatbot-header-whatsapp-btn"
              onClick={() => connectAdminWhatsApp(lastDest)}
              title={`Chat on WhatsApp for ${lastDest || 'tour inquiry'}`}
              style={{
                background: 'rgba(34,197,94,0.14)', border: '1px solid rgba(34,197,94,0.38)',
                color: '#4ADE80', borderRadius: '7px', padding: '6px 4px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer',
                transition: 'all 0.15s', whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,197,94,0.24)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(34,197,94,0.14)'; }}
            >
              <MessageCircle size={13} color="#4ADE80" /> WhatsApp
            </button>

            {/* Contact Us Direct Action */}
            <button
              id="chatbot-header-contact-btn"
              onClick={() => openContactOptions(lastDest)}
              title="Helpline, Mail & WhatsApp Support"
              style={{
                background: 'rgba(14,165,233,0.14)', border: '1px solid rgba(14,165,233,0.38)',
                color: '#38BDF8', borderRadius: '7px', padding: '6px 4px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer',
                transition: 'all 0.15s', whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(14,165,233,0.24)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(14,165,233,0.14)'; }}
            >
              <Phone size={12} color="#38BDF8" /> Contact Us
            </button>
          </div>

          {/* ── MESSAGES ── */}
          <div style={{
            flex: 1, padding: '13px', overflowY: 'auto',
            display: 'flex', flexDirection: 'column', gap: '12px',
            background: '#080E1B'
          }}>
            {messages.map((m, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start', gap: '8px', alignItems: 'flex-start' }}>
                {m.sender === 'bot' && (
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: '#FFFFFF', padding: '1px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: '2px',
                    border: '1.5px solid #D97706',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
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
                  maxWidth: '88%', padding: '11px 14px',
                  borderRadius: m.sender === 'user' ? '14px 14px 2px 14px' : '2px 14px 14px 14px',
                  background: m.sender === 'user'
                    ? 'linear-gradient(135deg, #B45309 0%, #92400E 100%)'
                    : '#101B30',
                  color: m.sender === 'user' ? '#FFFFFF' : '#E2E8F0',
                  fontWeight: m.sender === 'user' ? 600 : 400,
                  fontSize: '0.84rem', lineHeight: 1.56,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                  border: m.sender === 'user'
                    ? '1px solid rgba(245, 158, 11, 0.35)'
                    : '1px solid rgba(255,255,255,0.08)',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word'
                }}>
                  {renderMsg(m.text, m.sender === 'user')}

                  {/* ── WHATSAPP DIRECT REDIRECT CARD ── */}
                  {m.isWhatsAppRedirect && (
                    <div style={{
                      marginTop: '12px', padding: '12px 14px',
                      background: 'rgba(16,185,129,0.09)', border: '1px solid rgba(16,185,129,0.32)',
                      borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '9px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                          <MessageCircle size={15} color="#4ADE80" style={{ flexShrink: 0 }} />
                          <span style={{ fontSize: '0.80rem', color: '#86EFAC', fontWeight: 800, letterSpacing: '0.2px' }}>
                            Official Admin WhatsApp Desk
                          </span>
                        </div>
                        <span style={{ fontSize: '0.60rem', background: 'rgba(16,185,129,0.22)', color: '#4ADE80', padding: '2px 6px', borderRadius: '4px', fontWeight: 700, textTransform: 'uppercase', flexShrink: 0 }}>
                          Verified
                        </span>
                      </div>
                      <div style={{ fontSize: '0.76rem', color: '#E2E8F0', lineHeight: 1.45, wordBreak: 'break-word' }}>
                        Selected Itinerary: <strong style={{ color: '#FCD34D' }}>{m.selectedItinerary || lastDest}</strong>
                      </div>
                      <a
                        href={m.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        id="chatbot-msg-whatsapp-direct-btn"
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                          padding: '9px 14px', borderRadius: '8px',
                          background: 'linear-gradient(135deg, #15803D 0%, #0F766E 100%)',
                          color: '#FFFFFF', fontWeight: 700, fontSize: '0.80rem',
                          textDecoration: 'none', boxShadow: '0 4px 14px rgba(21,128,61,0.4)',
                          textAlign: 'center', lineHeight: 1.3
                        }}
                      >
                        <MessageCircle size={15} style={{ flexShrink: 0 }} />
                        <span>Chat on WhatsApp (+91 {WHATSAPP_PRIMARY.slice(2)})</span>
                      </a>
                    </div>
                  )}

                  {/* ── CONTACT US DIRECT OPTIONS CARD (CALL / MAIL / WHATSAPP) ── */}
                  {m.isContactCard && (
                    <div style={{
                      marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '9px'
                    }}>
                      {/* Direct Phone Helplines */}
                      <div style={{
                        background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.28)',
                        borderRadius: '10px', padding: '11px 12px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Phone size={14} color="#38BDF8" />
                            <span style={{ fontWeight: 700, fontSize: '0.79rem', color: '#7DD3FC' }}>Direct Telephone Helplines</span>
                          </div>
                          <span style={{ fontSize: '0.60rem', background: 'rgba(14,165,233,0.2)', color: '#38BDF8', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>24/7 Active</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <a
                            href={`tel:${PHONE_PRIMARY}`}
                            id="contact-card-call-primary"
                            style={{
                              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                              padding: '8px 11px', borderRadius: '7px',
                              background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
                              color: '#FFFFFF', fontWeight: 700, fontSize: '0.77rem',
                              textDecoration: 'none', boxShadow: '0 2px 8px rgba(2,132,199,0.3)'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Phone size={12} />
                              <span>Senior Desk: {PHONE_PRIMARY}</span>
                            </div>
                            <span style={{ fontSize: '0.66rem', background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '4px' }}>Call Now</span>
                          </a>
                          <a
                            href={`tel:${PHONE_SECONDARY}`}
                            id="contact-card-call-secondary"
                            style={{
                              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                              padding: '8px 11px', borderRadius: '7px',
                              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)',
                              color: '#F1F5F9', fontWeight: 600, fontSize: '0.77rem',
                              textDecoration: 'none'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Phone size={12} color="#94A3B8" />
                              <span>Operations: {PHONE_SECONDARY}</span>
                            </div>
                            <span style={{ fontSize: '0.66rem', color: '#94A3B8' }}>Call</span>
                          </a>
                        </div>
                      </div>

                      {/* Official WhatsApp Support */}
                      <div style={{
                        background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.28)',
                        borderRadius: '10px', padding: '11px 12px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <MessageCircle size={14} color="#4ADE80" />
                            <span style={{ fontWeight: 700, fontSize: '0.79rem', color: '#86EFAC' }}>Official WhatsApp Support</span>
                          </div>
                          <span style={{ fontSize: '0.60rem', background: 'rgba(16,185,129,0.2)', color: '#4ADE80', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>Priority Desk</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <a
                            href={m.whatsappUrl || `https://wa.me/${WHATSAPP_PRIMARY}?text=${encodeURIComponent(`Namaste Mankotia Holidays! I want to inquire about ${lastDest}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            id="contact-card-wa-primary"
                            style={{
                              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                              padding: '8px 11px', borderRadius: '7px',
                              background: 'linear-gradient(135deg, #15803D 0%, #0F766E 100%)',
                              color: '#FFFFFF', fontWeight: 700, fontSize: '0.77rem',
                              textDecoration: 'none', boxShadow: '0 2px 8px rgba(21,128,61,0.3)'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <MessageCircle size={13} />
                              <span>Admin Desk (+91 {WHATSAPP_PRIMARY.slice(2)})</span>
                            </div>
                            <span style={{ fontSize: '0.66rem', background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '4px' }}>Chat</span>
                          </a>
                          <a
                            href={`https://wa.me/${WHATSAPP_SECONDARY}?text=${encodeURIComponent(`Namaste Mankotia Holidays! I want to inquire about ${lastDest}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            id="contact-card-wa-secondary"
                            style={{
                              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                              padding: '8px 11px', borderRadius: '7px',
                              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)',
                              color: '#F1F5F9', fontWeight: 600, fontSize: '0.77rem',
                              textDecoration: 'none'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <MessageCircle size={13} color="#94A3B8" />
                              <span>Support (+91 {WHATSAPP_SECONDARY.slice(2)})</span>
                            </div>
                            <span style={{ fontSize: '0.66rem', color: '#94A3B8' }}>Chat</span>
                          </a>
                        </div>
                      </div>

                      {/* Central Email Inquiries */}
                      <div style={{
                        background: 'rgba(217,119,6,0.08)', border: '1px solid rgba(217,119,6,0.25)',
                        borderRadius: '10px', padding: '11px 12px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Mail size={14} color="#FCD34D" />
                            <span style={{ fontWeight: 700, fontSize: '0.79rem', color: '#FCD34D' }}>Central Email Inquiries</span>
                          </div>
                          <span style={{ fontSize: '0.60rem', background: 'rgba(217,119,6,0.2)', color: '#FCD34D', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>Corporate</span>
                        </div>
                        <a
                          href={`mailto:${AGENCY_EMAIL}?subject=${encodeURIComponent(`Tour Inquiry: ${m.selectedItinerary || lastDest || 'Travel Package'}`)}&body=${encodeURIComponent(`Namaste Mankotia Holidays,\n\nI would like to inquire about the ${m.selectedItinerary || lastDest || 'tour'} package.\n\nPlease share customized quotes, available travel dates, and hotel details.\n\nThank you!`)}`}
                          id="contact-card-email-btn"
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                            padding: '8px 11px', borderRadius: '7px',
                            background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                            color: '#FFFFFF', fontWeight: 700, fontSize: '0.77rem',
                            textDecoration: 'none', boxShadow: '0 2px 8px rgba(217,119,6,0.3)',
                            wordBreak: 'break-all'
                          }}
                        >
                          <Mail size={13} style={{ flexShrink: 0 }} />
                          <span>{AGENCY_EMAIL}</span>
                        </a>
                      </div>

                      {/* Registered Offices badge */}
                      <div style={{
                        fontSize: '0.67rem', color: '#94A3B8', padding: '7px 10px',
                        background: 'rgba(255,255,255,0.03)', borderRadius: '7px',
                        border: '1px solid rgba(255,255,255,0.06)',
                        display: 'flex', alignItems: 'center', gap: '6px', lineHeight: 1.4
                      }}>
                        <MapPin size={12} color="#F59E0B" style={{ flexShrink: 0 }} />
                        <span>Offices: <strong>Delhi</strong> • <strong>Manali</strong> • <strong>Una (HP)</strong></span>
                      </div>
                    </div>
                  )}

                  {/* Quick Options */}
                  {m.sender === 'bot' && m.options && m.options.length > 0 && (
                    <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                      <div style={{ fontSize: '0.69rem', color: '#94A3B8', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ color: '#FCD34D', fontWeight: 700 }}>Options:</span>
                        <span>Tap to select or explore:</span>
                        {(selectedMap[idx] || []).length > 0 && (
                          <span style={{ marginLeft: 'auto', background: 'rgba(16,185,129,0.2)', color: '#34D399', padding: '1px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700 }}>
                            {(selectedMap[idx] || []).length} selected
                          </span>
                        )}
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {m.options.map((opt, oi) => {
                          const isSel = (selectedMap[idx] || []).includes(opt);
                          const isBk = isBookAction(opt);
                          const isWa = isWhatsAppAction(opt);
                          const isCt = isContactAction(opt);
                          const isCall = isCallAction(opt);
                          const isMail = isEmailAction(opt);
                          const isMenu = isMenuAction(opt);
                          const isAct = isBk || isWa || isCt || isCall || isMail || isMenu;

                          let borderStyle = '1px solid rgba(255,255,255,0.12)';
                          let bgStyle = 'rgba(255,255,255,0.04)';
                          let textColor = '#CBD5E1';

                          if (isMenu) {
                            borderStyle = '1px solid rgba(168,85,247,0.45)';
                            bgStyle = 'rgba(168,85,247,0.12)';
                            textColor = '#D8B4FE';
                          } else if (isBk) {
                            borderStyle = '1px solid rgba(217,119,6,0.45)';
                            bgStyle = 'rgba(217,119,6,0.15)';
                            textColor = '#FCD34D';
                          } else if (isWa) {
                            borderStyle = '1px solid rgba(34,197,94,0.4)';
                            bgStyle = 'rgba(34,197,94,0.12)';
                            textColor = '#4ADE80';
                          } else if (isCt || isCall) {
                            borderStyle = '1px solid rgba(14,165,233,0.4)';
                            bgStyle = 'rgba(14,165,233,0.12)';
                            textColor = '#38BDF8';
                          } else if (isMail) {
                            borderStyle = '1px solid rgba(217,119,6,0.4)';
                            bgStyle = 'rgba(217,119,6,0.12)';
                            textColor = '#FCD34D';
                          } else if (isSel) {
                            borderStyle = '1px solid #10B981';
                            bgStyle = 'rgba(16,185,129,0.16)';
                            textColor = '#FFFFFF';
                          }

                          return (
                            <button
                              key={oi}
                              type="button"
                              onClick={() => isAct ? sendSingle(opt) : toggleOpt(idx, opt)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '6px 10px',
                                borderRadius: '7px',
                                border: borderStyle,
                                background: bgStyle,
                                color: textColor,
                                fontSize: '0.73rem',
                                fontWeight: isAct || isSel ? 700 : 500,
                                cursor: 'pointer',
                                textAlign: 'left',
                                lineHeight: 1.35,
                                maxWidth: '100%',
                                wordBreak: 'break-word',
                                transition: 'all 0.15s ease'
                              }}
                              onMouseEnter={e => {
                                if (!isSel) e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                              }}
                              onMouseLeave={e => {
                                if (!isSel) e.currentTarget.style.background = bgStyle;
                              }}
                            >
                              {isMenu ? (
                                <RefreshCw size={11} color="#C084FC" style={{ flexShrink: 0 }} />
                              ) : isBk ? (
                                <Calendar size={11} color="#F59E0B" style={{ flexShrink: 0 }} />
                              ) : isWa ? (
                                <MessageCircle size={11} color="#4ADE80" style={{ flexShrink: 0 }} />
                              ) : isCt || isCall ? (
                                <Phone size={11} color="#38BDF8" style={{ flexShrink: 0 }} />
                              ) : isMail ? (
                                <Mail size={11} color="#FCD34D" style={{ flexShrink: 0 }} />
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
                              <span style={{ flex: 1 }}>{opt}</span>
                              <ArrowRight size={10} style={{ opacity: 0.5, flexShrink: 0, marginLeft: '2px' }} />
                            </button>
                          );
                        })}
                      </div>

                      {/* Multi-select action */}
                      {(selectedMap[idx] || []).length > 0 && (
                        <div style={{ marginTop: '8px', display: 'flex', gap: '6px' }}>
                          <button
                            type="button"
                            onClick={() => sendSelected(idx)}
                            style={{
                              flex: 1, padding: '7px 12px', borderRadius: '7px',
                              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                              border: 'none', color: '#FFF', fontSize: '0.74rem', fontWeight: 700,
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
                            style={{ padding: '7px 11px', borderRadius: '7px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8', fontSize: '0.71rem', cursor: 'pointer' }}
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
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: '#FFFFFF', padding: '1px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  border: '1.5px solid #D97706',
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
                <div style={{ padding: '9px 13px', borderRadius: '12px', background: '#101B30', color: '#94A3B8', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ width: '11px', height: '11px', border: '2px solid rgba(217,119,6,0.3)', borderTopColor: '#D97706', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                  Senior Concierge is composing response...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* ── QUICK CHIPS ── */}
          <div
            className="chatbot-quick-chips"
            style={{
              padding: '7px 12px', background: '#090F1E',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              overflowX: 'auto', whiteSpace: 'nowrap',
              display: 'flex', gap: '6px', flexShrink: 0,
              scrollbarWidth: 'none', msOverflowStyle: 'none'
            }}
          >
            {QUICK_CHIPS.map((q, i) => {
              const isBk = isBookAction(q);
              const isWa = isWhatsAppAction(q);
              const isCt = isContactAction(q);

              let chipBg = 'rgba(255,255,255,0.04)';
              let chipBorder = '1px solid rgba(255,255,255,0.1)';
              let chipColor = '#CBD5E1';

              if (isBk) {
                chipBg = 'rgba(217,119,6,0.15)';
                chipBorder = '1px solid rgba(217,119,6,0.4)';
                chipColor = '#FCD34D';
              } else if (isWa) {
                chipBg = 'rgba(34,197,94,0.14)';
                chipBorder = '1px solid rgba(34,197,94,0.35)';
                chipColor = '#4ADE80';
              } else if (isCt) {
                chipBg = 'rgba(14,165,233,0.14)';
                chipBorder = '1px solid rgba(14,165,233,0.35)';
                chipColor = '#38BDF8';
              }

              return (
                <button
                  key={i}
                  onClick={() => sendSingle(q)}
                  style={{
                    padding: '4px 10px', borderRadius: '6px', flexShrink: 0,
                    background: chipBg,
                    border: chipBorder,
                    color: chipColor,
                    fontSize: '0.71rem', fontWeight: (isBk || isWa || isCt) ? 700 : 500,
                    cursor: 'pointer', transition: 'all 0.15s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(217,119,6,0.22)'; e.currentTarget.style.borderColor = '#D97706'; e.currentTarget.style.color = '#FFF'; }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = chipBg;
                    e.currentTarget.style.borderColor = chipBorder;
                    e.currentTarget.style.color = chipColor;
                  }}
                >
                  {q}
                </button>
              );
            })}
          </div>

          {/* ── INPUT BAR ── */}
          <div style={{
            padding: '9px 12px', background: '#090F1E',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0
          }}>
            <input
              id="aria-chat-input"
              type="text"
              placeholder="Ask about Char Dham, Kedarnath Heli, Himachal, quotes..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendText(); } }}
              style={{
                padding: '9px 12px', fontSize: '0.82rem', flex: 1, minWidth: 0,
                background: 'rgba(15, 23, 42, 0.85)',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: '8px', color: '#F8FAFC', outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={e => e.target.style.borderColor = '#D97706'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.14)'}
            />
            <button
              id="aria-send-btn"
              onClick={() => sendText()}
              disabled={loading || !input.trim()}
              style={{
                width: '38px', height: '38px', borderRadius: '8px',
                background: input.trim() ? 'linear-gradient(135deg, #D97706 0%, #B45309 100%)' : 'rgba(255,255,255,0.06)',
                border: input.trim() ? '1px solid rgba(245,158,11,0.35)' : '1px solid rgba(255,255,255,0.1)',
                color: input.trim() ? '#FFF' : '#64748B',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: input.trim() ? 'pointer' : 'not-allowed', flexShrink: 0,
                boxShadow: input.trim() ? '0 4px 14px rgba(217,119,6,0.35)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              <Send size={15} />
            </button>
          </div>

          {/* ── POLICY & HELPLINE FOOTER ── */}
          <div style={{
            padding: '6px 12px', background: '#060B15',
            borderTop: '1px solid rgba(255,255,255,0.04)',
            display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center', flexShrink: 0,
            overflowX: 'auto', whiteSpace: 'nowrap', scrollbarWidth: 'none', msOverflowStyle: 'none'
          }}>
            {[
              { icon: <Shield size={10} />, label: 'Cancellation Policy', action: () => sendText('cancellation policy') },
              { icon: <FileText size={10} />, label: 'Terms & Conditions', action: () => sendText('terms and conditions') },
              { icon: <Phone size={10} />, label: 'Helpline Desk', action: () => openContactOptions() },
            ].map((link, i) => (
              <button
                key={i}
                onClick={link.action}
                style={{
                  background: 'none', border: 'none', color: '#64748B',
                  fontSize: '0.66rem', cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  padding: '2px 4px', borderRadius: '4px', transition: 'color 0.15s',
                  fontWeight: 500, flexShrink: 0
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#FCD34D'}
                onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
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
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        .chatbot-quick-chips::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}


