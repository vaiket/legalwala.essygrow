import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const logoUrl = `${process.env.PUBLIC_URL ?? ''}/images/logo.jpeg`;

const Footer: React.FC = () => {
  const [logoLoadError, setLogoLoadError] = useState(false);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-surface border-t border-brand-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 cursor-pointer" onClick={handleLogoClick}>
              {logoLoadError ? (
                <div className="w-10 h-10 bg-brand-gold flex items-center justify-center text-brand-bg font-serif font-bold text-lg">
                  LV
                </div>
              ) : (
                <img
                  src={logoUrl}
                  alt="Legalvala"
                  className="h-10 w-10 rounded-full object-cover object-center ring-1 ring-white/10"
                  onError={() => setLogoLoadError(true)}
                />
              )}
              <div className="flex flex-col items-start leading-none">
                <span className="font-bricolage font-bold text-2xl tracking-tight text-white mb-1">Legalvala</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 font-mono">Advisory & Compliance Hub</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm mb-6 max-w-md">
              Your trusted partner for Tax, GST, ITR, Audit, and Company Registration services in India. Stay compliant, stay ahead with expert guidance.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-slate-400 hover:text-brand-gold text-sm transition-colors">Services</Link></li>
              <li><Link to="/about-us" className="text-slate-400 hover:text-brand-gold text-sm transition-colors">About Us</Link></li>
              <li><Link to="/contact-us" className="text-slate-400 hover:text-brand-gold text-sm transition-colors">Contact</Link></li>
              <li><Link to="/appointment" className="text-slate-400 hover:text-brand-gold text-sm transition-colors">Book Appointment</Link></li>
              <li><Link to="/terms-conditions" className="text-slate-400 hover:text-brand-gold text-sm transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/refund-policy" className="text-slate-400 hover:text-brand-gold text-sm transition-colors">Refund Policy</Link></li>
              <li><Link to="/privacy-policy" className="text-slate-400 hover:text-brand-gold text-sm transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/start-business" className="text-slate-400 hover:text-brand-gold text-sm transition-colors">Start Business</Link></li>
              <li><Link to="/registration" className="text-slate-400 hover:text-brand-gold text-sm transition-colors">Registration</Link></li>
              <li><Link to="/manage-business" className="text-slate-400 hover:text-brand-gold text-sm transition-colors">Manage Business</Link></li>
              <li><Link to="/document" className="text-slate-400 hover:text-brand-gold text-sm transition-colors">Legal Documents</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li><a href="https://www.gst.gov.in" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-gold text-sm transition-colors">GST Portal</a></li>
              <li><a href="https://www.mca.gov.in" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-gold text-sm transition-colors">MCA</a></li>
              <li><a href="https://www.icai.org" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-gold text-sm transition-colors">ICAI</a></li>
              <li><a href="https://www.icsi.edu" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-gold text-sm transition-colors">ICSI</a></li>
              <li><a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-gold text-sm transition-colors">RBI</a></li>
              <li><a href="https://www.dgft.gov.in" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-gold text-sm transition-colors">DGFT</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-border mt-8 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            © 2026 LegalVala. All rights reserved. | Compliance & Advisory Services
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
