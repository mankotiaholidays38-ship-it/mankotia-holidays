import React, { useState } from 'react';
import { MapPin, Clock, Star, Check, Tag, Search, X, SlidersHorizontal, ShieldCheck, Sparkles, ArrowRight, Eye } from 'lucide-react';
import { PACKAGES } from '../data/packagesData';

export default function PackageCatalog({ onOpenInquiry }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedPackage, setSelectedPackage] = useState(null);

  const categories = [
    { id: 'All', label: 'All Packages', icon: 'fa-solid fa-earth-asia' },
    { id: 'Pilgrimage', label: 'Char Dham & Pilgrimage', icon: 'fa-solid fa-om' },
    { id: 'Uttarakhand', label: 'Uttarakhand Specials', icon: 'fa-solid fa-mountain' },
    { id: 'Himachal', label: 'Himachal Pradesh', icon: 'fa-solid fa-snowflake' },
    { id: 'Kashmir', label: 'Kashmir Paradise', icon: 'fa-solid fa-spa' },
    { id: 'Rajasthan', label: 'Royal Rajasthan', icon: 'fa-solid fa-monument' },
    { id: 'Goa & Kerala', label: 'Goa & Kerala', icon: 'fa-solid fa-umbrella-beach' }
  ];

  const filteredPackages = PACKAGES.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesCategory;

    const matchesSearch = 
      p.title.toLowerCase().includes(query) ||
      p.destination.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      (p.highlights && p.highlights.some(h => h.toLowerCase().includes(query)));

    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price_inr - b.price_inr;
    if (sortBy === 'price-high') return b.price_inr - a.price_inr;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured default
  });

  const handleBookFromModal = (pkg) => {
    setSelectedPackage(null);
    onOpenInquiry({
      destination: pkg.title,
      notes: `Selected package: ${pkg.title} | Destination: ${pkg.destination} | Duration: ${pkg.duration} | Price: ₹${pkg.price_inr.toLocaleString('en-IN')}`
    });
  };

  return (
    <section id="packages" className="section-padding" style={{
      background: 'linear-gradient(180deg, #0B1120 0%, #111A2E 100%)',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-wrap">
            <span className="badge-gold">
              <Tag size={14} /> Curated Holiday Packages
            </span>
          </div>
          <h2>
            Featured <span className="text-gradient-gold">Domestic Tour Packages</span>
          </h2>
          <p>
            Handcrafted luxury and budget packages across India with 100% transparent pricing, verified mountain stays, and instant booking assistance.
          </p>
        </div>

        {/* Search & Sort Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1050px',
          margin: '0 auto 24px',
          background: 'rgba(17, 26, 46, 0.7)',
          backdropFilter: 'blur(12px)',
          padding: '12px 18px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)'
        }}>
          {/* Search Input */}
          <div style={{ position: 'relative', flex: '1 1 280px', minWidth: '240px' }}>
            <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by destination (e.g. Kedarnath, Nainital, Manali)..."
              style={{
                width: '100%',
                padding: '10px 36px 10px 38px',
                background: '#0B1120',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius-full)',
                color: '#FFFFFF',
                fontSize: '0.88rem',
                outline: 'none'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SlidersHorizontal size={15} color="#F59E0B" />
            <span style={{ fontSize: '0.82rem', color: '#94A3B8', fontWeight: 600 }}>Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: '#0B1120',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                color: '#F8FAFC',
                padding: '8px 12px',
                fontSize: '0.84rem',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated (★)</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`filter-tab ${activeCategory === cat.id ? 'active' : ''}`}
            >
              <i className={cat.icon} style={{ marginRight: '6px' }}></i>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Empty Search Results */}
        {filteredPackages.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(17, 26, 46, 0.4)', borderRadius: '16px', maxWidth: '600px', margin: '20px auto' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔍</div>
            <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '8px' }}>No packages matched "{searchQuery}"</h3>
            <p style={{ fontSize: '0.88rem', color: '#94A3B8', marginBottom: '18px' }}>Try searching with a different term like "Char Dham", "Heli", "Himachal", or reset the filter.</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} className="btn btn-outline-gold btn-sm">
              Reset Filters
            </button>
          </div>
        )}

        {/* Packages Grid */}
        <div className="packages-grid">
          {filteredPackages.map((pkg) => (
            <div key={pkg.id} className="glass-card" style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflow: 'hidden',
              borderRadius: 'var(--radius-lg)'
            }}>
              <div>
                {/* Image */}
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  
                  {/* Badge */}
                  <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                    <span className="badge-gold" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
                      {pkg.badge}
                    </span>
                  </div>

                  {/* Duration Tag */}
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    background: 'rgba(11, 17, 32, 0.85)',
                    backdropFilter: 'blur(8px)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Clock size={12} color="#F59E0B" /> {pkg.duration}
                  </div>
                </div>

                {/* Body Content */}
                <div style={{ padding: '22px 20px 14px' }}>
                  
                  {/* Rating & Destination */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.8rem', color: '#06B6D4', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={13} /> {pkg.destination}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#FCD34D', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={13} fill="#FCD34D" color="#FCD34D" /> {pkg.rating} ({pkg.reviews_count})
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px', lineHeight: 1.3 }}>
                    {pkg.title}
                  </h3>

                  {/* Highlights Checklist */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                    {pkg.highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#94A3B8' }}>
                        <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', flexShrink: 0 }}>
                          <Check size={10} strokeWidth={3} />
                        </div>
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {hl}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Quick View Details Trigger */}
                  <button
                    onClick={() => setSelectedPackage(pkg)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#06B6D4',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: 0,
                      marginBottom: '8px'
                    }}
                  >
                    <Eye size={14} /> View Full Itinerary & Inclusions
                  </button>

                </div>
              </div>

              {/* Price & Action Row */}
              <div style={{
                padding: '16px 20px 20px',
                borderTop: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase' }}>
                    Starting from
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#F59E0B', fontFamily: 'var(--font-heading)' }}>
                      ₹{pkg.price_inr.toLocaleString('en-IN')}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: '#64748B', textDecoration: 'line-through' }}>
                      ₹{pkg.original_price_inr.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => onOpenInquiry({
                      destination: pkg.title,
                      notes: `Selected itinerary: ${pkg.title} | Duration: ${pkg.duration} | Starting price: ₹${pkg.price_inr.toLocaleString('en-IN')}`
                    })}
                    className="btn btn-primary-gold btn-sm"
                  >
                    <span>Book Now</span>
                  </button>
                  <a
                    href={`https://wa.me/919816461616?text=${encodeURIComponent(`Hi Mankotia Holidays! I want to get quotes for ${pkg.title} (${pkg.duration}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-sm"
                    title="Inquire on WhatsApp"
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Package Detailed Itinerary Modal */}
      {selectedPackage && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glass-panel" style={{
            maxWidth: '680px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: '#111A2E',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '20px',
            padding: '30px',
            position: 'relative'
          }}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedPackage(null)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: 'rgba(255,255,255,0.08)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge-gold" style={{ fontSize: '0.75rem' }}>{selectedPackage.badge}</span>
              <span style={{ fontSize: '0.82rem', color: '#06B6D4', fontWeight: 600 }}><MapPin size={13} style={{ display: 'inline' }} /> {selectedPackage.destination}</span>
            </div>

            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
              {selectedPackage.title}
            </h2>

            <p style={{ fontSize: '0.9rem', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '20px' }}>
              {selectedPackage.description}
            </p>

            {/* Highlights Box */}
            <div style={{ background: 'rgba(245, 158, 11, 0.06)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#FCD34D', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={16} color="#F59E0B" /> Key Tour Highlights
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '8px' }}>
                {selectedPackage.highlights.map((h, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#E2E8F0' }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B', flexShrink: 0 }}>
                      <Check size={10} strokeWidth={3} />
                    </div>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions Box */}
            <div style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#6EE7B7', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} color="#10B981" /> Verified Package Inclusions
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '8px' }}>
                {selectedPackage.inclusions.map((inc, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#E2E8F0' }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', flexShrink: 0 }}>
                      <Check size={10} strokeWidth={3} />
                    </div>
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '20px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase' }}>Package Pricing</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F59E0B', fontFamily: 'var(--font-heading)' }}>
                  ₹{selectedPackage.price_inr.toLocaleString('en-IN')} <span style={{ fontSize: '0.82rem', color: '#94A3B8', fontWeight: 400 }}>/ person</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href={`https://wa.me/919816461616?text=${encodeURIComponent(`Hi Mankotia Holidays! I am interested in ${selectedPackage.title} (${selectedPackage.duration}). Please share full details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <i className="fa-brands fa-whatsapp" style={{ marginRight: '6px' }}></i> WhatsApp Quote
                </a>
                <button
                  onClick={() => handleBookFromModal(selectedPackage)}
                  className="btn btn-primary-gold"
                >
                  Book This Tour <ArrowRight size={16} />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
