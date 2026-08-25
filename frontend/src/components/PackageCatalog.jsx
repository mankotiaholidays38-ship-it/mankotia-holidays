import React, { useState, useRef } from 'react';
import { MapPin, Clock, Star, Check, Tag, Search, X, SlidersHorizontal, ShieldCheck, Sparkles, ArrowRight, Eye, ChevronLeft, ChevronRight, Calendar, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { PACKAGES } from '../data/packagesData';

export default function PackageCatalog({ onOpenInquiry }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [expandedItineraries, setExpandedItineraries] = useState({});

  const sliderRefs = useRef({});

  const categories = [
    { id: 'All', label: 'All Packages', icon: '🌟', color: '#F59E0B' },
    { id: 'Pilgrimage', label: 'Char Dham & Pilgrimage', icon: '🕉️', color: '#F59E0B' },
    { id: 'Uttarakhand', label: 'Uttarakhand Specials', icon: '🏔️', color: '#06B6D4' },
    { id: 'Himachal', label: 'Himachal Pradesh', icon: '🌲', color: '#10B981' },
    { id: 'Kashmir', label: 'Kashmir Paradise', icon: '🌸', color: '#EC4899' },
    { id: 'Rajasthan', label: 'Royal Rajasthan', icon: '🏰', color: '#F97316' },
    { id: 'Goa & Kerala', label: 'Goa & Kerala', icon: '🏖️', color: '#38BDF8' }
  ];

  const categoryDescriptions = {
    'Pilgrimage': 'Sacred Himalayan Dhams, VIP Kedarnath Helicopter shuttles, and biometric registration support.',
    'Uttarakhand': 'Scenic emerald lakes, Jim Corbett tiger safaris, Queen of Hills Mussoorie, and alpine ski slopes.',
    'Himachal': 'Snowy Solang valley, engineering wonder Atal Tunnel, colonial Shimla, and mini Switzerland Khajjiar.',
    'Kashmir': 'Royal Dal Lake houseboats, Asia\'s highest Gulmarg gondola, and picturesque pine valleys in Pahalgam.',
    'Rajasthan': 'Grand royal forts, heritage Rajputana havelis, and romantic Lake Pichola boat cruises.',
    'Goa & Kerala': 'Sun-kissed Goan beach carnivals and tranquil luxury backwater houseboat cruises in Alleppey.'
  };

  const toggleItinerary = (pkgId) => {
    setExpandedItineraries(prev => ({
      ...prev,
      [pkgId]: !prev[pkgId]
    }));
  };

  const scrollSlider = (catId, direction) => {
    const el = sliderRefs.current[catId];
    if (el) {
      const scrollStep = 340;
      const maxScroll = el.scrollWidth - el.clientWidth;

      if (direction === 'right') {
        // If at or near the end, loop smoothly back to the beginning!
        if (el.scrollLeft >= maxScroll - 20) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: scrollStep, behavior: 'smooth' });
        }
      } else {
        // If at or near the beginning, loop smoothly around to the end!
        if (el.scrollLeft <= 20) {
          el.scrollTo({ left: maxScroll, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: -scrollStep, behavior: 'smooth' });
        }
      }
    }
  };

  const filterAndSort = (pkgs) => {
    return pkgs.filter((p) => {
      const query = searchQuery.trim().toLowerCase();
      if (!query) return true;
      return (
        p.title.toLowerCase().includes(query) ||
        p.destination.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        (p.highlights && p.highlights.some(h => h.toLowerCase().includes(query)))
      );
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price_inr - b.price_inr;
      if (sortBy === 'price-high') return b.price_inr - a.price_inr;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  };

  const sectionsToRender = activeCategory === 'All'
    ? categories.filter(c => c.id !== 'All')
    : categories.filter(c => c.id === activeCategory);

  const handleBookFromModal = (pkg) => {
    setSelectedPackage(null);
    onOpenInquiry({
      destination: pkg.title,
      notes: `Selected package: ${pkg.title} | Destination: ${pkg.destination} | Duration: ${pkg.duration} | Price: ₹${pkg.price_inr.toLocaleString('en-IN')}`
    });
  };

  const renderCard = (pkg) => {
    const isExpanded = !!expandedItineraries[pkg.id];

    return (
      <div 
        key={pkg.id} 
        className="glass-card package-slider-card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
          borderRadius: '16px',
          background: 'linear-gradient(180deg, rgba(17, 26, 46, 0.95) 0%, rgba(15, 23, 42, 0.9) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
          scrollSnapAlign: 'start',
          flex: '0 0 min(340px, 85vw)',
          minWidth: 'min(340px, 85vw)',
          transition: 'transform 0.25s ease, border-color 0.25s ease'
        }}
      >
        <div>
          <div style={{ position: 'relative', height: '190px', overflow: 'hidden' }}>
            <img 
              src={pkg.image} 
              alt={pkg.title}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span className="badge-gold" style={{ fontSize: '0.72rem', padding: '3px 8px', fontWeight: 700 }}>
                {pkg.badge}
              </span>
            </div>
            <div style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              background: 'rgba(11, 17, 32, 0.88)',
              backdropFilter: 'blur(8px)',
              padding: '3px 8px',
              borderRadius: '20px',
              fontSize: '0.72rem',
              color: '#FFFFFF',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <Clock size={12} color="#F59E0B" /> {pkg.duration}
            </div>
          </div>

          <div style={{ padding: '16px 16px 10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.76rem', color: '#38BDF8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', maxWidth: '70%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <MapPin size={12} style={{ flexShrink: 0 }} /> {pkg.destination}
              </span>
              <span style={{ fontSize: '0.76rem', color: '#FCD34D', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Star size={12} fill="#FCD34D" color="#FCD34D" /> {pkg.rating} ({pkg.reviews_count})
              </span>
            </div>

            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px', lineHeight: 1.3, height: '2.6em', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
              {pkg.title}
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '10px' }}>
              {pkg.highlights.slice(0, 2).map((hl, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#94A3B8' }}>
                  <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', flexShrink: 0 }}>
                    <Check size={9} strokeWidth={3} />
                  </div>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {hl}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px dashed rgba(255, 255, 255, 0.08)', paddingTop: '8px', marginBottom: '6px' }}>
              <button
                type="button"
                onClick={() => toggleItinerary(pkg.id)}
                style={{
                  background: isExpanded ? 'rgba(245, 158, 11, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                  border: isExpanded ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  width: '100%',
                  color: isExpanded ? '#FCD34D' : '#38BDF8',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={13} />
                  <span>{isExpanded ? 'Hide Day-by-Day Schedule' : `Show Itinerary (${pkg.days ? pkg.days.length : 'Full'} Days)`}</span>
                </span>
                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {isExpanded && (
                <div style={{
                  marginTop: '8px',
                  padding: '8px',
                  background: 'rgba(11, 17, 32, 0.8)',
                  borderRadius: '8px',
                  maxHeight: '160px',
                  overflowY: 'auto',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  animation: 'fadeIn 0.2s ease-out'
                }}>
                  {pkg.days && pkg.days.length > 0 ? (
                    pkg.days.map((d, dIdx) => (
                      <div key={dIdx} style={{ fontSize: '0.72rem', borderBottom: dIdx < pkg.days.length - 1 ? '1px solid rgba(255, 255, 255, 0.04)' : 'none', paddingBottom: '4px' }}>
                        <strong style={{ color: '#FCD34D' }}>Day {d.day}:</strong> <span style={{ color: '#F1F5F9' }}>{d.title}</span>
                      </div>
                    ))
                  ) : (
                    <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
                      Detailed day-wise itinerary available upon booking or in full overview.
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedPackage(pkg)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94A3B8',
                fontSize: '0.74rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '2px 0',
                textDecoration: 'underline'
              }}
            >
              <Eye size={12} /> Full inclusions & overview
            </button>

          </div>
        </div>

        <div style={{
          padding: '12px 16px 14px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          background: 'rgba(0, 0, 0, 0.2)'
        }}>
          <div>
            <div style={{ fontSize: '0.66rem', color: '#94A3B8', textTransform: 'uppercase' }}>
              Starting From
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#F59E0B', fontFamily: 'var(--font-heading)' }}>
                ₹{pkg.price_inr.toLocaleString('en-IN')}
              </span>
              <span style={{ fontSize: '0.72rem', color: '#64748B', textDecoration: 'line-through' }}>
                ₹{pkg.original_price_inr.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <button
            onClick={() => onOpenInquiry({
              destination: pkg.title,
              notes: `Package Booking: ${pkg.title} (${pkg.duration})`
            })}
            className="btn btn-primary-gold"
            style={{ padding: '7px 14px', fontSize: '0.78rem', borderRadius: '8px', fontWeight: 700 }}
          >
            <span>Book Now</span>
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <section id="packages" className="section-padding" style={{
      background: 'linear-gradient(180deg, #0B1120 0%, #111A2E 100%)',
      position: 'relative'
    }}>
      <div className="container">
        <div className="section-header" style={{ marginBottom: '20px' }}>
          <div className="badge-wrap">
            <span className="badge-gold">
              <Tag size={14} /> Curated Domestic Holidays
            </span>
          </div>
          <h2>
            Explore <span className="text-gradient-gold">All Tour Packages</span>
          </h2>
          <p>
            Browse 40+ handcrafted holiday itineraries across Char Dham, Uttarakhand, Himachal, Kashmir, Rajasthan, Goa & Kerala. Slide through multiple options below!
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1100px',
          margin: '0 auto 14px',
          background: 'rgba(17, 26, 46, 0.75)',
          backdropFilter: 'blur(12px)',
          padding: '8px 14px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div style={{ position: 'relative', flex: '1 1 260px', minWidth: '220px' }}>
            <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destination (e.g. Manali, Kedarnath, Shimla, Nainital)..."
              style={{
                width: '100%',
                padding: '7px 32px 7px 34px',
                background: '#0B1120',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '20px',
                color: '#FFFFFF',
                fontSize: '0.84rem',
                outline: 'none'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SlidersHorizontal size={14} color="#F59E0B" />
            <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 600 }}>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: '#0B1120',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                color: '#F8FAFC',
                padding: '5px 8px',
                fontSize: '0.8rem',
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

        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '8px',
          marginBottom: '20px',
          justifyContent: 'flex-start',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '20px',
                border: activeCategory === cat.id ? '1.5px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.08)',
                background: activeCategory === cat.id ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(217, 119, 6, 0.15))' : 'rgba(255, 255, 255, 0.03)',
                color: activeCategory === cat.id ? '#FDE68A' : '#CBD5E1',
                fontWeight: activeCategory === cat.id ? 700 : 500,
                fontSize: '0.82rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          {sectionsToRender.map((sec) => {
            const sectionPackages = PACKAGES.filter(p => p.category === sec.id);
            const filteredSecPkgs = filterAndSort(sectionPackages);

            if (filteredSecPkgs.length === 0) return null;

            return (
              <div key={sec.id} style={{
                background: 'rgba(15, 23, 42, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '16px',
                padding: '20px',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.4rem' }}>{sec.icon}</span>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                          {sec.label}
                        </h3>
                        <span style={{ fontSize: '0.72rem', background: 'rgba(245, 158, 11, 0.15)', color: '#FCD34D', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                          {filteredSecPkgs.length} Tours Available
                        </span>
                      </div>
                      <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '2px' }}>
                        {categoryDescriptions[sec.id] || 'Handcrafted packages with chauffeur & verified stays.'}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '0.72rem', color: '#64748B', marginRight: '4px' }} className="mobile-hide">
                      Slide for options
                    </span>
                    <button
                      type="button"
                      onClick={() => scrollSlider(sec.id, 'left')}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      aria-label="Previous tours"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollSlider(sec.id, 'right')}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(245, 158, 11, 0.18)',
                        border: '1px solid rgba(245, 158, 11, 0.35)',
                        color: '#FCD34D',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      aria-label="Next tours"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

                <div 
                  ref={el => sliderRefs.current[sec.id] = el}
                  className="package-slider-track"
                  style={{
                    display: 'flex',
                    gap: '16px',
                    overflowX: 'auto',
                    scrollSnapType: 'x mandatory',
                    paddingBottom: '10px',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch'
                  }}
                >
                  {filteredSecPkgs.map((pkg) => renderCard(pkg))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.72rem', color: '#64748B', marginTop: '6px' }}>
                  <span>👈 Swipe sideways to see all {filteredSecPkgs.length} {sec.label} options 👉</span>
                </div>
              </div>
            );
          })}
        </div>

        {PACKAGES.filter(p => activeCategory === 'All' || p.category === activeCategory).filter(p => {
          const query = searchQuery.trim().toLowerCase();
          if (!query) return true;
          return p.title.toLowerCase().includes(query) || p.destination.toLowerCase().includes(query);
        }).length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(17, 26, 46, 0.4)', borderRadius: '16px', maxWidth: '600px', margin: '20px auto' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔍</div>
            <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '8px' }}>No packages matched "{searchQuery}"</h3>
            <p style={{ fontSize: '0.88rem', color: '#94A3B8', marginBottom: '18px' }}>Try searching with a different term like "Kedarnath", "Manali", "Shimla", or reset the filter.</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} className="btn btn-outline-gold btn-sm">
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {selectedPackage && (
        <div className="modal-backdrop" onClick={() => setSelectedPackage(null)}>
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <button 
              onClick={() => setSelectedPackage(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255, 255, 255, 0.08)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', cursor: 'pointer', zIndex: 10 }}
            >
              <X size={18} />
            </button>

            <div style={{ position: 'relative', height: '220px', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px' }}>
              <img src={selectedPackage.image} alt={selectedPackage.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11, 17, 32, 0.9) 0%, transparent 60%)' }}></div>
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
                <span className="badge-gold" style={{ fontSize: '0.72rem', padding: '3px 8px', marginBottom: '6px' }}>
                  {selectedPackage.badge}
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', margin: 0, textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                  {selectedPackage.title}
                </h3>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '18px' }}>
              <span style={{ fontSize: '0.8rem', background: 'rgba(6, 182, 212, 0.15)', color: '#67E8F9', padding: '4px 10px', borderRadius: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={13} /> {selectedPackage.destination}
              </span>
              <span style={{ fontSize: '0.8rem', background: 'rgba(245, 158, 11, 0.15)', color: '#FCD34D', padding: '4px 10px', borderRadius: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={13} /> {selectedPackage.duration}
              </span>
              <span style={{ fontSize: '0.8rem', background: 'rgba(16, 185, 129, 0.15)', color: '#6EE7B7', padding: '4px 10px', borderRadius: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={13} fill="#10B981" color="#10B981" /> {selectedPackage.rating} ({selectedPackage.reviews_count} reviews)
              </span>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '20px' }}>
              {selectedPackage.description}
            </p>

            {selectedPackage.days && selectedPackage.days.length > 0 && (
              <div style={{ marginBottom: '22px' }}>
                <h4 style={{ fontSize: '0.95rem', color: '#FCD34D', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={15} /> Day-by-Day Schedule:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(11, 17, 32, 0.6)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  {selectedPackage.days.map((d, i) => (
                    <div key={i} style={{ fontSize: '0.82rem', borderBottom: i < selectedPackage.days.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none', paddingBottom: '6px' }}>
                      <strong style={{ color: '#38BDF8' }}>Day {d.day}: {d.title}</strong>
                      <div style={{ color: '#94A3B8', marginTop: '2px', fontSize: '0.78rem' }}>{d.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.95rem', color: '#FCD34D', fontWeight: 700, marginBottom: '10px' }}>
                ✨ Package Highlights:
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px' }}>
                {selectedPackage.highlights.map((hl, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#CBD5E1' }}>
                    <Check size={13} color="#10B981" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '0.95rem', color: '#67E8F9', fontWeight: 700, marginBottom: '10px' }}>
                🛡️ Verified Inclusions:
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px' }}>
                {selectedPackage.inclusions.map((inc, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#CBD5E1' }}>
                    <Check size={13} color="#06B6D4" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase' }}>All-Inclusive Price</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F59E0B' }}>
                  ₹{selectedPackage.price_inr.toLocaleString('en-IN')}{' '}
                  <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 400 }}>/ person</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href={`https://wa.me/919816461616?text=${encodeURIComponent(`Hi Mankotia Holidays! I am interested in booking "${selectedPackage.title}" (${selectedPackage.duration}) priced at ₹${selectedPackage.price_inr}. Please share dates and details.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-whatsapp btn-sm"
                  style={{ textDecoration: 'none' }}
                >
                  <MessageCircle size={15} /> WhatsApp
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
