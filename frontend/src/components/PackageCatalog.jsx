import React, { useState, useRef } from 'react';
import { MapPin, Clock, Star, Check, Tag, Search, X, SlidersHorizontal, ShieldCheck, Sparkles, ArrowRight, Eye, ChevronLeft, ChevronRight, Calendar, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { PACKAGES } from '../data/packagesData';

export default function PackageCatalog({ onOpenInquiry }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [expandedItineraries, setExpandedItineraries] = useState({});

  React.useEffect(() => {
    const handleCategorySelect = (e) => {
      if (e.detail) {
        setActiveCategory(e.detail);
      }
    };
    window.addEventListener('selectPackageCategory', handleCategorySelect);
    return () => window.removeEventListener('selectPackageCategory', handleCategorySelect);
  }, []);

  const categories = [
    { id: 'All', label: 'All Packages', icon: '🌟', color: '#F59E0B' },
    { id: 'Delhi', label: 'Delhi Specials', icon: '🏛️', color: '#38BDF8' },
    { id: 'Agra', label: 'Agra & Taj Mahal', icon: '🕌', color: '#F43F5E' },
    { id: 'Jaipur', label: 'Jaipur Pink City', icon: '👑', color: '#FB923C' },
    { id: 'Mathura Vrindavan', label: 'Mathura & Vrindavan', icon: '🦚', color: '#A855F7' },
    { id: 'Golden Triangle', label: 'Golden Triangle Circuits', icon: '✨', color: '#EAB308' },
    { id: 'Pilgrimage', label: 'Char Dham & Pilgrimage', icon: '🕉️', color: '#F59E0B' },
    { id: 'Uttarakhand', label: 'Uttarakhand Specials', icon: '🏔️', color: '#06B6D4' },
    { id: 'Himachal', label: 'Himachal Pradesh', icon: '🌲', color: '#10B981' },
    { id: 'Kashmir', label: 'Kashmir Paradise', icon: '🌸', color: '#EC4899' },
    { id: 'Rajasthan', label: 'Royal Rajasthan', icon: '🏰', color: '#F97316' },
    { id: 'Goa & Kerala', label: 'Goa & Kerala', icon: '🏖️', color: '#38BDF8' }
  ];

  const getCategoryPackages = (catId) => {
    return PACKAGES.filter(p => {
      if (catId === 'All') return true;
      const titleLower = (p.title || '').toLowerCase();
      const destLower = (p.destination || '').toLowerCase();
      const catLower = (p.category || '').toLowerCase();

      if (catId === 'Delhi') return catLower.includes('delhi') || p.id.startsWith('pkg-delhi-') || titleLower.includes('delhi') || destLower.includes('delhi');
      if (catId === 'Agra') return catLower.includes('agra') || p.id.startsWith('pkg-agra-') || titleLower.includes('agra') || destLower.includes('agra');
      if (catId === 'Jaipur') return catLower.includes('jaipur') || p.id.startsWith('pkg-jaipur-') || titleLower.includes('jaipur') || destLower.includes('jaipur');
      if (catId === 'Mathura Vrindavan') return catLower.includes('mathura') || catLower.includes('vrindavan') || p.id.startsWith('pkg-mathura-') || titleLower.includes('mathura') || titleLower.includes('vrindavan') || destLower.includes('mathura') || destLower.includes('vrindavan');
      if (catId === 'Golden Triangle') return catLower.includes('golden triangle') || p.id.startsWith('pkg-golden-triangle-') || titleLower.includes('golden triangle') || destLower.includes('golden triangle');
      if (catId === 'Pilgrimage') return (
        catLower.includes('pilgrimage') || 
        catLower.includes('chardham') || 
        catLower.includes('sacred') || 
        p.id.startsWith('pkg-chardham-') || 
        p.id.startsWith('pkg-dodham-') || 
        p.id.startsWith('pkg-kedarnath-') || 
        p.id.startsWith('pkg-badrinath-') || 
        p.id.startsWith('pkg-gangotri-') || 
        p.id.startsWith('pkg-panch-kedar-') || 
        p.id.startsWith('pkg-vaishnodevi-')
      );
      if (catId === 'Uttarakhand') return catLower.includes('uttarakhand') || p.id.startsWith('pkg-uttarakhand-') || p.id.startsWith('pkg-auli-') || p.id.startsWith('pkg-jim-corbett-') || p.id.startsWith('pkg-mussoorie-') || p.id.startsWith('pkg-kumaon-') || p.id.startsWith('pkg-nainital-') || p.id.startsWith('pkg-rishikesh-');
      if (catId === 'Himachal') return catLower.includes('himachal') || p.id.startsWith('pkg-shimla-') || p.id.startsWith('pkg-manali-') || p.id.startsWith('pkg-spiti-') || p.id.startsWith('pkg-kasol-') || p.id.startsWith('pkg-bir-') || p.id.startsWith('pkg-dharamshala-');
      if (catId === 'Kashmir') return catLower.includes('kashmir') || p.id.startsWith('pkg-kashmir-') || p.id.startsWith('pkg-sonamarg-') || p.id.startsWith('pkg-doodhpathri-') || p.id.startsWith('pkg-gulmarg-');
      if (catId === 'Rajasthan') return catLower.includes('rajasthan') || catLower.includes('jaipur') || p.id.startsWith('pkg-jaipur-') || p.id.startsWith('pkg-rajasthan-') || p.id.startsWith('pkg-jaisalmer-') || p.id.startsWith('pkg-udaipur-') || p.id.startsWith('pkg-pushkar-') || p.id.startsWith('pkg-bikaner-');
      if (catId === 'Goa & Kerala') return catLower.includes('goa') || catLower.includes('kerala') || p.id.startsWith('pkg-goa-') || p.id.startsWith('pkg-kerala-') || p.id.startsWith('pkg-south-goa-') || p.id.startsWith('pkg-wayanad-') || p.id.startsWith('pkg-munnar-');
      return p.category === catId;
    });
  };

  const toggleItinerary = (pkgId) => {
    setExpandedItineraries(prev => ({
      ...prev,
      [pkgId]: !prev[pkgId]
    }));
  };

  const handleBookFromModal = (pkg) => {
    setSelectedPackage(null);
    onOpenInquiry({
      destination: pkg.title,
      notes: `Selected package: ${pkg.title} | Destination: ${pkg.destination} | Duration: ${pkg.duration} | Requesting Custom Quote`
    });
  };

  const currentCategoryPool = getCategoryPackages(activeCategory);
  const displayedPackages = currentCategoryPool.filter((p) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      p.title.toLowerCase().includes(query) ||
      p.destination.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      (p.highlights && p.highlights.some(h => h.toLowerCase().includes(query)))
    );
  });

  const renderCard = (pkg, isGrid = false) => {
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
          flex: isGrid ? '1 1 auto' : '0 0 min(340px, 85vw)',
          minWidth: isGrid ? '0' : 'min(340px, 85vw)',
          width: isGrid ? '100%' : 'auto',
          transition: 'transform 0.25s ease, border-color 0.25s ease'
        }}
      >
        <div>
          <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
            <img 
              src={pkg.image} 
              alt={pkg.title}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.onerror = null;
                if (pkg.category === 'Mathura & Vrindavan' || pkg.category === 'Sacred Pilgrimages') {
                  e.currentTarget.src = "/images/packages/prem_mandir_vrindavan.jpg";
                } else if (pkg.category === 'Jaipur') {
                  e.currentTarget.src = "/images/packages/hawa_mahal.jpg";
                } else {
                  e.currentTarget.src = "/images/packages/kedarnath_temple.jpg";
                }
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease'
              }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%)' }}></div>
            
            <span 
              className="badge-gold"
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                fontSize: '0.68rem',
                padding: '3px 8px',
                borderRadius: '6px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.5)'
              }}
            >
              {pkg.badge}
            </span>

            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(11, 17, 32, 0.85)',
              backdropFilter: 'blur(4px)',
              padding: '3px 7px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: '#F59E0B',
              border: '1px solid rgba(245, 158, 11, 0.3)'
            }}>
              <Star size={11} fill="#F59E0B" color="#F59E0B" />
              <span>{pkg.rating}</span>
            </div>

            <div style={{ position: 'absolute', bottom: '10px', left: '12px', right: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#38BDF8', fontSize: '0.74rem', fontWeight: 600, marginBottom: '2px' }}>
                <MapPin size={12} />
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{pkg.destination}</span>
              </div>
              <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#FFFFFF', margin: 0, lineHeight: 1.25, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {pkg.title}
              </h3>
            </div>
          </div>

          <div style={{ padding: '14px 14px 10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#94A3B8', background: 'rgba(255, 255, 255, 0.04)', padding: '3px 7px', borderRadius: '4px' }}>
                <Clock size={12} color="#F59E0B" /> {pkg.duration}
              </span>
              <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 600, background: 'rgba(16, 185, 129, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                100% Sanitized AC Cab
              </span>
            </div>

            <p style={{ fontSize: '0.79rem', color: '#94A3B8', lineHeight: 1.4, margin: '0 0 10px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {pkg.description}
            </p>

            {pkg.highlights && pkg.highlights.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '10px' }}>
                {pkg.highlights.slice(0, 3).map((hl, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', fontSize: '0.74rem', color: '#CBD5E1' }}>
                    <Check size={11} color="#F59E0B" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{hl}</span>
                  </div>
                ))}
              </div>
            )}

            {pkg.days && pkg.days.length > 0 && (
              <div style={{ marginBottom: '10px' }}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItinerary(pkg.id);
                  }}
                  style={{
                    background: isExpanded ? 'rgba(245, 158, 11, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '6px',
                    padding: '5px 8px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: isExpanded ? '#FCD34D' : '#94A3B8',
                    fontSize: '0.73rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={11} color="#F59E0B" /> {isExpanded ? 'Hide Day Schedule' : `View ${pkg.days.length}-Day Plan`}
                  </span>
                  {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>

                {isExpanded && (
                  <div style={{
                    marginTop: '6px',
                    padding: '8px',
                    background: 'rgba(11, 17, 32, 0.7)',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    maxHeight: '160px',
                    overflowY: 'auto'
                  }}>
                    {pkg.days.map((d, di) => (
                      <div key={di} style={{ fontSize: '0.72rem', borderBottom: di < pkg.days.length - 1 ? '1px solid rgba(255, 255, 255, 0.04)' : 'none', paddingBottom: '4px' }}>
                        <span style={{ color: '#38BDF8', fontWeight: 700 }}>Day {d.day}: </span>
                        <span style={{ color: '#F8FAFC', fontWeight: 600 }}>{d.title}</span>
                        <div style={{ color: '#94A3B8', marginTop: '1px', fontSize: '0.68rem', lineHeight: 1.3 }}>{d.desc}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div style={{ padding: '10px 14px 14px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>


          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setSelectedPackage(pkg)}
              style={{
                flex: '1',
                padding: '7px 8px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                fontSize: '0.74rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}
            >
              <Eye size={13} /> View Details
            </button>
            <button
              onClick={() => onOpenInquiry({
                destination: pkg.title,
                notes: `Interested in: ${pkg.title} (${pkg.duration}) - Requesting Custom Quote`
              })}
              style={{
                flex: '1.4',
                padding: '7px 8px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                border: 'none',
                color: '#0B1120',
                fontSize: '0.74rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}
            >
              Book Now <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="packages" className="section-padding" style={{ position: 'relative', background: '#0B1120', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: '380px', height: '380px', background: 'radial-gradient(circle, rgba(245, 158, 11, 0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '5%', width: '420px', height: '420px', background: 'radial-gradient(circle, rgba(6, 182, 212, 0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 16px' }}>
          <div className="badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <Sparkles size={13} /> 100% Verified Packages • 40+ Handcrafted Tours
          </div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.35rem)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.18, margin: 0 }}>
            Explore All Tour Packages
          </h2>
        </div>

        {/* Search Bar */}
        <div style={{
          maxWidth: '560px',
          margin: '0 auto 16px',
          position: 'relative'
        }}>
          <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search packages by destination, temple, fort, city..."
            style={{
              width: '100%',
              padding: '10px 40px 10px 42px',
              background: 'rgba(17, 26, 46, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '24px',
              color: '#FFFFFF',
              fontSize: '0.88rem',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Destination Category Filter Tabs - Wrapping & Centered (All visible at a glance) */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '8px 10px',
          maxWidth: '1100px',
          margin: '0 auto 20px',
          padding: '0 4px'
        }}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '24px',
                  border: isActive ? '1.5px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: isActive ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.28), rgba(217, 119, 6, 0.18))' : 'rgba(255, 255, 255, 0.04)',
                  color: isActive ? '#FDE68A' : '#CBD5E1',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.18s ease',
                  boxShadow: isActive ? '0 0 14px rgba(245, 158, 11, 0.25)' : 'none'
                }}
              >
                <span style={{ fontSize: '1rem', lineHeight: 1 }}>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Minimalist Summary when Search or Category is Active */}
        {(searchQuery || activeCategory !== 'All') && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            padding: '6px 14px',
            background: 'rgba(15, 23, 42, 0.6)',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            fontSize: '0.8rem',
            color: '#94A3B8'
          }}>
            <div>
              <span>Showing <strong style={{ color: '#FCD34D' }}>{displayedPackages.length}</strong> {displayedPackages.length === 1 ? 'package' : 'packages'}</span>
              {activeCategory !== 'All' && <span> in <strong style={{ color: '#38BDF8' }}>{activeCategory}</strong></span>}
              {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#FDA4AF',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <X size={13} /> Reset
            </button>
          </div>
        )}

        {/* Package Sliders by Destination & Category (SLIDERS ONLY) */}
        {activeCategory === 'All' && !searchQuery ? (
          <div>
            {categories.filter(c => c.id !== 'All').map((catObj) => {
              const catPackages = getCategoryPackages(catObj.id);
              if (!catPackages || catPackages.length === 0) return null;
              return (
                <DestinationPackageSlider
                  key={catObj.id}
                  categoryObj={catObj}
                  packages={catPackages}
                  renderCard={renderCard}
                  onSelectCategory={(id) => setActiveCategory(id)}
                />
              );
            })}
          </div>
        ) : displayedPackages.length > 0 ? (
          <div>
            <DestinationPackageSlider
              categoryObj={categories.find(c => c.id === activeCategory) || { id: activeCategory, label: activeCategory, icon: '🌟' }}
              packages={displayedPackages}
              renderCard={renderCard}
              onSelectCategory={null}
            />
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '48px 20px', background: 'rgba(17, 26, 46, 0.4)', borderRadius: '16px', maxWidth: '500px', margin: '20px auto' }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '10px' }}>🔍</div>
            <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF', marginBottom: '6px' }}>No packages matched your search</h3>
            <p style={{ fontSize: '0.84rem', color: '#94A3B8', marginBottom: '16px' }}>Try searching with a different destination or keyword.</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} className="btn btn-outline-gold btn-sm">
              Show All Packages
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
              <img 
                src={selectedPackage.image} 
                alt={selectedPackage.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/packages/kedarnath_temple.jpg";
                }}
              />
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#10B981', background: 'rgba(16, 185, 129, 0.1)', padding: '6px 12px', borderRadius: '20px', fontWeight: 600 }}>
                <ShieldCheck size={14} /> Custom Quotes & Instant Support
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href={`https://wa.me/919816461616?text=${encodeURIComponent(`Hi Mankotia Holidays! I am interested in booking "${selectedPackage.title}" (${selectedPackage.duration}). Please share dates and best price quote.`)}`}
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

function DestinationPackageSlider({ 
  categoryObj, 
  packages, 
  renderCard, 
  onSelectCategory 
}) {
  const scrollRef = React.useRef(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(true);

  // Auto-slide every 5 seconds (5000 ms)
  React.useEffect(() => {
    if (isPaused || !packages || packages.length <= 1) return undefined;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % packages.length;
        if (scrollRef.current) {
          const cardWidth = scrollRef.current.firstElementChild?.offsetWidth || 330;
          const gap = 18;
          scrollRef.current.scrollTo({
            left: nextIndex * (cardWidth + gap),
            behavior: 'smooth'
          });
        }
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, packages]);

  const handleManualScroll = (direction) => {
    setIsPaused(true);
    let nextIndex = currentIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % packages.length;
    } else {
      nextIndex = (currentIndex - 1 + packages.length) % packages.length;
    }
    setCurrentIndex(nextIndex);

    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.offsetWidth || 330;
      const gap = 18;
      scrollRef.current.scrollTo({
        left: nextIndex * (cardWidth + gap),
        behavior: 'smooth'
      });
    }

    setTimeout(() => setIsPaused(false), 8000);
  };

  const handleScrollEvent = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.offsetWidth || 330;
      const gap = 18;
      const index = Math.round(scrollRef.current.scrollLeft / (cardWidth + gap));
      if (index !== currentIndex && index >= 0 && index < packages.length) {
        setCurrentIndex(index);
      }
    }
  };

  if (!packages || packages.length === 0) return null;

  return (
    <div 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        position: 'relative',
        marginBottom: '32px',
        background: 'linear-gradient(180deg, rgba(17, 26, 46, 0.75) 0%, rgba(15, 23, 42, 0.85) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '20px',
        padding: '22px 18px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.35)'
      }}
    >
      {/* Header with Title, Badge, View All & Navigation Arrows */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '16px',
        paddingBottom: '12px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3rem'
          }}>
            {categoryObj.icon}
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', margin: 0, letterSpacing: '-0.2px' }}>
              {categoryObj.label} Packages
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px' }}>
              <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                {packages.length} Handcrafted Tours
              </span>
              <span style={{ fontSize: '0.7rem', background: 'rgba(245, 158, 11, 0.15)', color: '#FCD34D', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>
                ⚡ Auto-slides every 5s
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {onSelectCategory && (
            <button
              onClick={() => onSelectCategory(categoryObj.id)}
              style={{
                background: 'rgba(245, 158, 11, 0.12)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                color: '#FCD34D',
                borderRadius: '20px',
                padding: '5px 12px',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.2s ease'
              }}
            >
              Filter {categoryObj.label} <ChevronRight size={13} />
            </button>
          )}

          {/* Expand / Collapse Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              color: '#CBD5E1',
              borderRadius: '20px',
              padding: '5px 12px',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            aria-label={isExpanded ? "Collapse destination packages" : "Expand destination packages"}
          >
            {isExpanded ? <span>Hide</span> : <span>Show Packages</span>}
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {/* Slider Prev / Next Manual Arrows */}
          {isExpanded && (
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => handleManualScroll('prev')}
                aria-label="Previous Package"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#F59E0B'; e.currentTarget.style.color = '#0B1120'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.color = '#FFFFFF'; }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => handleManualScroll('next')}
                aria-label="Next Package"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#F59E0B'; e.currentTarget.style.color = '#0B1120'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.color = '#FFFFFF'; }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Horizontally Scrollable Cards Slider (Collapsible) */}
      {isExpanded && (
        <>
          <div 
            ref={scrollRef}
            onScroll={handleScrollEvent}
            style={{
              display: 'flex',
              gap: '18px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              paddingBottom: '12px',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(245, 158, 11, 0.4) transparent'
            }}
          >
            {packages.map((pkg) => (
              <div key={pkg.id} style={{ scrollSnapAlign: 'start', flex: '0 0 min(330px, 82vw)', minWidth: 'min(330px, 82vw)' }}>
                {renderCard(pkg, false)}
              </div>
            ))}
          </div>

          {/* Pagination Dot Indicators */}
          {packages.length > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '12px' }}>
              {packages.map((pkg, idx) => (
                <button
                  key={pkg.id}
                  onClick={() => {
                    setIsPaused(true);
                    setCurrentIndex(idx);
                    if (scrollRef.current) {
                      const cardWidth = scrollRef.current.firstElementChild?.offsetWidth || 330;
                      const gap = 18;
                      scrollRef.current.scrollTo({ left: idx * (cardWidth + gap), behavior: 'smooth' });
                    }
                  }}
                  style={{
                    width: idx === currentIndex ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '8px',
                    border: 'none',
                    background: idx === currentIndex ? '#F59E0B' : 'rgba(255, 255, 255, 0.25)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
