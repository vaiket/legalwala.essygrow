import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import StartBusiness from './pages/StartBusiness';
import Registration from './pages/Registration';
import ManageBusiness from './pages/ManageBusiness';
import Document from './pages/Document';
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import Appointment from './pages/Appointment';
import ContactUs from './pages/ContactUs';

import ServiceDetail from './pages/ServiceDetail';
import TermsConditions from './pages/TermsConditions';
import RefundPolicy from './pages/RefundPolicyPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans bg-brand-bg text-slate-200">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/start-business" element={<StartBusiness />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/manage-business" element={<ManageBusiness />} />
            <Route path="/document" element={<Document />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/contact-us" element={<ContactUs />} />
            
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <Footer />

        {/* ── WhatsApp Floating Button ── */}
        <a
          href="https://wa.me/919286495921?text=Hello%20LegalVala%2C%20I%20need%20help%20with%20my%20business%20legal%20%26%20compliance%20requirements.%20Please%20guide%20me."
          target="_blank"
          rel="noopener noreferrer"
          title="Chat with us on WhatsApp"
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#25D366',
            color: '#fff',
            borderRadius: '50%',
            width: 56,
            height: 56,
            textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 28px rgba(37,211,102,0.5)';
            const tooltip = e.currentTarget.querySelector('.wa-tooltip') as HTMLElement;
            if (tooltip) tooltip.style.opacity = '1';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(37,211,102,0.4)';
            const tooltip = e.currentTarget.querySelector('.wa-tooltip') as HTMLElement;
            if (tooltip) tooltip.style.opacity = '0';
          }}
        >
          {/* Tooltip */}
          <span
            className="wa-tooltip"
            style={{
              position: 'absolute',
              right: 66,
              bottom: '50%',
              transform: 'translateY(50%)',
              background: '#1a1a1a',
              color: '#fff',
              fontSize: 12,
              fontWeight: 500,
              fontFamily: 'Inter, sans-serif',
              padding: '6px 12px',
              borderRadius: 8,
              whiteSpace: 'nowrap',
              opacity: 0,
              transition: 'opacity 0.2s',
              pointerEvents: 'none',
              boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
            }}
          >
            💬 Chat with us
          </span>

          {/* WhatsApp SVG Icon */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>
    </Router>
  );
}

export default App;
