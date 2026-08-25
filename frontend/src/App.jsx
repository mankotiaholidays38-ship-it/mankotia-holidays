import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import YatraSpecial from './components/YatraSpecial';
import PackageCatalog from './components/PackageCatalog';
import AiItineraryPlanner from './components/AiItineraryPlanner';
import UttarakhandExplorer from './components/UttarakhandExplorer';
import YatraGuide from './components/YatraGuide';
import Testimonials from './components/Testimonials';
import WhyChooseUs from './components/WhyChooseUs';
import InquiryModal from './components/InquiryModal';
import AdminPortal from './components/AdminPortal';
import AiConcierge from './components/AiConcierge';
import Footer from './components/Footer';

export default function App() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryData, setInquiryData] = useState({});
  const [adminPortalOpen, setAdminPortalOpen] = useState(false);

  const handleOpenInquiry = (data = {}) => {
    setInquiryData(data);
    setInquiryModalOpen(true);
  };

  const handleCloseInquiry = () => {
    setInquiryModalOpen(false);
    setInquiryData({});
  };

  const handleOpenAdmin = () => {
    setAdminPortalOpen(true);
  };

  const handleCloseAdmin = () => {
    setAdminPortalOpen(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0B1120' }}>
      {/* Navigation Header */}
      <Navbar 
        onOpenInquiry={handleOpenInquiry}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        {/* Hero & Quick Booking */}
        <Hero onOpenInquiry={handleOpenInquiry} />

        {/* Sacred Char Dham & Do Dham Special Module */}
        <YatraSpecial onOpenInquiry={handleOpenInquiry} />

        {/* Full Domestic Package Catalog */}
        <PackageCatalog onOpenInquiry={handleOpenInquiry} />

        {/* AI Smart Trip Generator & Google Maps Routing */}
        <AiItineraryPlanner onOpenInquiry={handleOpenInquiry} />

        {/* Uttarakhand Explorer */}
        <UttarakhandExplorer onOpenInquiry={handleOpenInquiry} />

        {/* Essential Yatra Guidelines & Biometric Pass Info */}
        <YatraGuide onOpenInquiry={handleOpenInquiry} />

        {/* Verified Pilgrim Testimonials */}
        <Testimonials />

        {/* Why Choose Mankotia Holidays */}
        <WhyChooseUs />
      </main>

      {/* Footer */}
      <Footer 
        onOpenInquiry={handleOpenInquiry} 
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Floating 24/7 AI Concierge (Aria) */}
      <AiConcierge />

      {/* Booking & Quote Modal */}
      <InquiryModal 
        isOpen={inquiryModalOpen}
        onClose={handleCloseInquiry}
        initialData={inquiryData}
      />

      {/* Admin Leads & Management Portal */}
      <AdminPortal 
        isOpen={adminPortalOpen}
        onClose={handleCloseAdmin}
      />

    </div>
  );
}
