import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot } from 'lucide-react';

export default function AiConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "🙏 **Namaste! I'm Aria**, your AI Travel Concierge at **Mankotia Holidays**.\n\nWhether you need details on **Char Dham Yatra 2026**, **Kedarnath Helicopter Booking**, **Uttarakhand Specials**, **Himachal**, or **Kashmir**, ask me anything or click a quick topic below!"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    "Char Dham Yatra 2026 Dates & Prices",
    "Kedarnath Helicopter Tickets & Booking",
    "Uttarakhand Family Tour (Nainital & Corbett)",
    "Do Dham Yatra (Kedarnath-Badrinath) Plan",
    "Packing list for high altitude yatra"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (userQuery) => {
    const query = userQuery || input;
    if (!query.trim()) return;

    const newMsgs = [...messages, { sender: 'user', text: query }];
    setMessages(newMsgs);
    if (!userQuery) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat-concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: newMsgs.map(m => ({ role: m.sender === 'user' ? 'user' : 'model', parts: [m.text] }))
        })
      });

      const data = await res.json();
      if (data.success && data.reply) {
        setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: "📞 Our travel experts are readily available! Please connect with us directly on WhatsApp at **+91 9816461616** or call **+91 9816461616** for instant quotes and bookings." 
        }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: "✨ You can speak directly to our tour planner on WhatsApp (+919816461616) or call +919816461616 for instant assistance." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="floating-concierge-btn"
          aria-label="Open AI Travel Concierge"
        >
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#8B5CF6'
          }}>
            <Bot size={16} />
          </div>
          <span>Ask Aria AI</span>
          <span className="pulse-dot" style={{ backgroundColor: '#4ADE80' }}></span>
        </button>
      )}

      {/* Concierge Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '90vw',
          maxWidth: '400px',
          height: '560px',
          maxHeight: '85vh',
          background: '#111A2E',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid rgba(139, 92, 246, 0.4)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(139, 92, 246, 0.25)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #1E1B4B 0%, #1E293B 100%)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                <Bot size={22} />
              </div>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Aria Concierge
                  <span className="pulse-dot"></span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                  Mankotia Holidays AI Assistant
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            padding: '18px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            background: '#0B1120'
          }}>
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  gap: '8px'
                }}
              >
                {m.sender === 'bot' && (
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#8B5CF6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    flexShrink: 0,
                    fontSize: '12px'
                  }}>
                    <Bot size={15} />
                  </div>
                )}

                <div style={{
                  maxWidth: '82%',
                  padding: '12px 16px',
                  borderRadius: m.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: m.sender === 'user' ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : '#1E293B',
                  color: m.sender === 'user' ? '#0F172A' : '#F8FAFC',
                  fontWeight: m.sender === 'user' ? 600 : 400,
                  fontSize: '0.88rem',
                  lineHeight: 1.5,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  whiteSpace: 'pre-line'
                }}>
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                  <Bot size={15} />
                </div>
                <div style={{ padding: '10px 16px', borderRadius: '16px', background: '#1E293B', color: '#94A3B8', fontSize: '0.85rem' }}>
                  Thinking & crafting response...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Question Chips */}
          <div style={{
            padding: '8px 12px',
            background: '#111A2E',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            display: 'flex',
            gap: '6px'
          }}>
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-light)',
                  color: '#CBD5E1',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <div style={{
            padding: '12px 16px',
            background: '#111A2E',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <input
              type="text"
              className="form-control"
              placeholder="Ask about Yatra, packages, weather..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              style={{ padding: '10px 14px', fontSize: '0.88rem' }}
            />

            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
                border: 'none',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                opacity: input.trim() ? 1 : 0.6
              }}
            >
              <Send size={16} />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
