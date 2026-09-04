import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesBookingHub from './components/ServicesBookingHub';
import YatraSpecial from './components/YatraSpecial';
import PackageCatalog from './components/PackageCatalog';
const AiItineraryPlanner = React.lazy(() => import('./components/AiItineraryPlanner'));
const UttarakhandExplorer = React.lazy(() => import('./components/UttarakhandExplorer'));
const YatraGuide = React.lazy(() => import('./components/YatraGuide'));
const Testimonials = React.lazy(() => import('./components/Testimonials'));
const WhyChooseUs = React.lazy(() => import('./components/WhyChooseUs'));
import InquiryModal from './components/InquiryModal';
import AdminPortal from './components/AdminPortal';
import AiConcierge from './components/AiConcierge';
import PolicyModal from './components/PolicyModal';
import Footer from './components/Footer';

export default function App() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryData, setInquiryData] = useState({});
  const [adminPortalOpen, setAdminPortalOpen] = useState(false);
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [policyInitialTab, setPolicyInitialTab] = useState('cancellation');

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

  const handleOpenPolicy = (tab = 'cancellation') => {
    setPolicyInitialTab(tab);
    setPolicyModalOpen(true);
  };

  const handleClosePolicy = () => {
    setPolicyModalOpen(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0B1120' }}>
      {/* Navigation Header */}
      <Navbar 
        onOpenInquiry={handleOpenInquiry}
        onOpenAdmin={handleOpenAdmin}
        onOpenPolicy={handleOpenPolicy}
      />

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        {/* Hero & Quick Booking */}
        <Hero onOpenInquiry={handleOpenInquiry} />

        {/* All Travel Services Booking Hub: Flights, Trains, Buses, Cabs, Hotels & Cottages */}
        <ServicesBookingHub onOpenInquiry={handleOpenInquiry} />

        {/* Sacred Char Dham & Do Dham Special Module */}
        <YatraSpecial onOpenInquiry={handleOpenInquiry} />

        {/* Full Domestic Package Catalog */}
        <PackageCatalog onOpenInquiry={handleOpenInquiry} />

        <React.Suspense fallback={<div style={{ padding: '60px 20px', textAlign: 'center', color: '#94A3B8' }}>Loading...</div>}>
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
        </React.Suspense>
      </main>

      {/* Footer */}
      <Footer 
        onOpenInquiry={handleOpenInquiry} 
        onOpenAdmin={handleOpenAdmin}
        onOpenPolicy={handleOpenPolicy}
      />

      {/* Floating 24/7 AI Concierge (Aria) */}
      <AiConcierge />

      {/* Booking & Quote Modal */}
      <InquiryModal 
        isOpen={inquiryModalOpen}
        onClose={handleCloseInquiry}
        initialData={inquiryData}
      />

      {/* Trust, Cancellation & Legal Policies Modal */}
      <PolicyModal
        isOpen={policyModalOpen}
        onClose={handleClosePolicy}
        initialTab={policyInitialTab}
      />

      {/* Admin Leads & Management Portal */}
      <AdminPortal 
        isOpen={adminPortalOpen}
        onClose={handleCloseAdmin}
      />

    </div>
  );
}
