import React, { useState, useEffect, useCallback } from 'react';
import { Shield, Lock, Search, Phone, MessageCircle, RefreshCw, X, FileSpreadsheet, Eye, EyeOff, Trash2 } from 'lucide-react';

export default function AdminPortal({ isOpen, onClose }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchLeads = useCallback(async (authToken) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/leads?token=${encodeURIComponent(authToken)}`);
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads || []);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setToken('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // When portal is opened or closed, reset authentication and clean any existing session
  useEffect(() => {
    sessionStorage.removeItem('mankotia_admin_token');
    localStorage.removeItem('mankotia_admin_token');
    if (!isOpen) {
      setIsAuthenticated(false);
      setToken('');
      setPassword('');
      setLeads([]);
      setError('');
      setSearchTerm('');
    }
  }, [isOpen]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json();
      if (data.success && data.token) {
        setToken(data.token);
        setIsAuthenticated(true);
        fetchLeads(data.token);
      } else {
        setError(data.detail || 'Invalid admin password.');
      }
    } catch (err) {
      console.error(err);
      setError('Connection error. Ensure backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken('');
    setPassword('');
    setLeads([]);
    setError('');
    sessionStorage.removeItem('mankotia_admin_token');
    localStorage.removeItem('mankotia_admin_token');
  };

  const handleDeleteLead = async (lead) => {
    if (!window.confirm(`Delete the inquiry from ${lead.name}? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/leads/${encodeURIComponent(lead.lead_id)}?token=${encodeURIComponent(token)}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.detail || 'Could not delete lead.');
      setLeads((currentLeads) => currentLeads.filter((currentLead) => currentLead.lead_id !== lead.lead_id));
    } catch (err) {
      setError(err.message);
    }
  };

  const closePortal = () => {
    handleLogout();
    onClose();
  };

  if (!isOpen) return null;

  const [activeCategoryTab, setActiveCategoryTab] = useState('all'); // 'all', 'package', 'ticket', 'transport'

  const filteredLeads = leads.filter(l => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = (
      (l.name && l.name.toLowerCase().includes(term)) ||
      (l.phone && l.phone.toLowerCase().includes(term)) ||
      (l.email && l.email.toLowerCase().includes(term)) ||
      (l.destination && l.destination.toLowerCase().includes(term)) ||
      (l.lead_id && l.lead_id.toLowerCase().includes(term))
    );
    if (!matchesSearch) return false;
    if (activeCategoryTab === 'all') return true;
    return l.category === activeCategoryTab;
  });

  return (
    <div className="modal-backdrop" onClick={closePortal}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '960px', width: '95vw', padding: '32px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closePortal}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: '#94A3B8',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {!isAuthenticated ? (
          /* Login Form */
          <div style={{ maxWidth: '420px', margin: '20px auto', textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F59E0B',
              margin: '0 auto 20px'
            }}>
              <Shield size={30} />
            </div>

            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
              Owner & Admin Portal
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#94A3B8', marginBottom: '24px' }}>
              Private database access for Mankotia Holidays lead management.
            </p>

            <form onSubmit={handleLogin} autoComplete="off">
              <div className="form-input-group" style={{ marginBottom: '20px', textAlign: 'left' }}>
                <label><Lock size={14} color="#F59E0B" /> Admin Password</label>
                <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  autoFocus
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  style={{ position: 'absolute', right: '10px', top: '8px', background: 'none', border: 0, color: '#94A3B8', cursor: 'pointer', padding: '6px' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                </div>
              </div>

              {error && (
                <div style={{
                  padding: '10px',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px',
                  color: '#FCA5A5',
                  fontSize: '0.85rem',
                  marginBottom: '16px'
                }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary-gold"
                style={{ width: '100%' }}
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Unlock Admin Portal'}
              </button>
            </form>
          </div>
        ) : (
          /* Leads Dashboard */
          <div>
            {/* Dashboard Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              borderBottom: '1px solid var(--border-light)',
              paddingBottom: '20px',
              marginBottom: '24px'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                    Customer Leads Database
                  </h3>
                  <span className="badge-gold">
                    {leads.length} Total Inquiries
                  </span>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '4px' }}>
                  Customer details are stored in the private owner database.
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a
                  href={`/api/admin/download-leads?token=${encodeURIComponent(token)}`}
                  download
                  className="btn btn-whatsapp btn-sm"
                  style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}
                >
                  <FileSpreadsheet size={15} />
                  <span>Download Excel (.xlsx)</span>
                </a>

                <button
                  onClick={() => fetchLeads(token)}
                  className="btn btn-call btn-sm"
                  title="Refresh Leads"
                >
                  <RefreshCw size={15} />
                </button>

                <button
                  onClick={handleLogout}
                  className="btn btn-call btn-sm"
                  style={{ color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setActiveCategoryTab('all')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: activeCategoryTab === 'all' ? '1px solid #F59E0B' : '1px solid rgba(255,255,255,0.1)',
                  background: activeCategoryTab === 'all' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.03)',
                  color: activeCategoryTab === 'all' ? '#FCD34D' : '#94A3B8',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                All Inquiries ({leads.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveCategoryTab('package')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: activeCategoryTab === 'package' ? '1px solid #F59E0B' : '1px solid rgba(255,255,255,0.1)',
                  background: activeCategoryTab === 'package' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.03)',
                  color: activeCategoryTab === 'package' ? '#FCD34D' : '#94A3B8',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                📦 Packages & Stays ({leads.filter(l => l.category === 'package').length})
              </button>
              <button
                type="button"
                onClick={() => setActiveCategoryTab('ticket')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: activeCategoryTab === 'ticket' ? '1px solid #06B6D4' : '1px solid rgba(255,255,255,0.1)',
                  background: activeCategoryTab === 'ticket' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255,255,255,0.03)',
                  color: activeCategoryTab === 'ticket' ? '#67E8F9' : '#94A3B8',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                ✈️🚆 Ticket Queries ({leads.filter(l => l.category === 'ticket').length})
              </button>
              <button
                type="button"
                onClick={() => setActiveCategoryTab('transport')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: activeCategoryTab === 'transport' ? '1px solid #10B981' : '1px solid rgba(255,255,255,0.1)',
                  background: activeCategoryTab === 'transport' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.03)',
                  color: activeCategoryTab === 'transport' ? '#6EE7B7' : '#94A3B8',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                🚖 Transport & Cabs ({leads.filter(l => l.category === 'transport').length})
              </button>
            </div>

            {/* Search Bar */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ position: 'relative' }}>
                <Search size={16} color="#94A3B8" style={{ position: 'absolute', top: '14px', left: '16px' }} />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by customer name, phone number, destination..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ paddingLeft: '44px' }}
                />
              </div>
            </div>

            {/* Leads Table */}
            <div style={{ overflowX: 'auto', maxHeight: '420px', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#FCD34D', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '12px 10px' }}>Date</th>
                    <th style={{ padding: '12px 10px' }}>Customer</th>
                    <th style={{ padding: '12px 10px' }}>Destination</th>
                    <th style={{ padding: '12px 10px' }}>Travelers</th>
                    <th style={{ padding: '12px 10px' }}>Notes / Source</th>
                    <th style={{ padding: '12px 10px', textAlign: 'right' }}>Quick Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead, idx) => (
                    <tr 
                      key={idx}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '12px 10px', color: '#64748B', whiteSpace: 'nowrap', fontSize: '0.8rem' }}>
                        {lead.timestamp ? lead.timestamp.split(' ')[0] : 'Today'}
                      </td>
                      <td style={{ padding: '12px 10px' }}>
                        <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{lead.name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>{lead.phone}</div>
                      </td>
                      <td style={{ padding: '12px 10px', color: '#67E8F9', fontWeight: 600 }}>
                        {lead.destination}
                      </td>
                      <td style={{ padding: '12px 10px', color: '#CBD5E1', fontSize: '0.82rem' }}>
                        {lead.travelers || '2 Travelers'}
                      </td>
                      <td style={{ padding: '12px 10px', color: '#94A3B8', fontSize: '0.8rem', maxWidth: '200px' }}>
                        {lead.notes || lead.source || 'Website form'}
                      </td>
                      <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                          <a
                            href={`tel:${lead.phone}`}
                            className="btn btn-call btn-sm"
                            style={{ padding: '6px 10px', borderRadius: '8px' }}
                            title="Call Customer"
                          >
                            <Phone size={13} />
                          </a>
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${lead.name}! This is Mankotia Holidays regarding your inquiry for ${lead.destination}. How can I assist you with custom quotes?`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-whatsapp btn-sm"
                            style={{ padding: '6px 10px', borderRadius: '8px' }}
                            title="Message on WhatsApp"
                          >
                            <MessageCircle size={13} />
                          </a>
                          <a
                            href={`/api/admin/hotel-plan/hotels-${encodeURIComponent(lead.lead_id).replace(/%23/g, '').replace(/%2D/g, '_')}.pdf?token=${encodeURIComponent(token)}`}
                            className="btn btn-call btn-sm"
                            style={{ padding: '6px 10px', borderRadius: '8px' }}
                            title="Download private hotel plan PDF"
                          >
                            <FileSpreadsheet size={13} />
                          </a>
                          <button
                            onClick={() => handleDeleteLead(lead)}
                            className="btn btn-call btn-sm"
                            style={{ padding: '6px 10px', borderRadius: '8px', color: '#FCA5A5', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                            title="Delete inquiry"
                            aria-label={`Delete inquiry from ${lead.name}`}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredLeads.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
                        No leads match your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
