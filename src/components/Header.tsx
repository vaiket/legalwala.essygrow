import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const logoUrl = `${process.env.PUBLIC_URL ?? ''}/images/logo.jpeg`;

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoLoadError, setLogoLoadError] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Start a Business', path: '/start-business' },
    { label: 'Registration', path: '/registration' },
    { label: 'Manage Business', path: '/manage-business' },
    { label: 'Services', path: '/services' },
    { label: 'About Us', path: '/about-us' },
    { label: 'Contact', path: '/contact-us' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 w-full z-[9999] transition-all duration-300 backdrop-blur-md border-brand-border ${isScrolled ? 'bg-[#08080a]/90 shadow-md py-3' : 'bg-[#08080a]/80 py-5'
        }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-3">
            {logoLoadError ? (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-brand-gold font-serif text-lg font-bold text-brand-bg">
                LV
              </div>
            ) : (
              <img
                src={logoUrl}
                alt="LegalVala"
                className="block h-10 w-10 max-h-10 min-h-[2.5rem] min-w-[2.5rem] rounded-full object-cover object-center shrink-0 ring-1 ring-white/10"
                onError={() => setLogoLoadError(true)}
              />
            )}
            <div className="flex flex-col items-start leading-none min-w-0">
              <span className="font-bricolage font-bold text-xl sm:text-2xl tracking-tight text-white mb-0.5 truncate max-w-[120px] sm:max-w-none">Legalvala</span>
              <span className="text-[8px] sm:text-[10px] uppercase font-bold tracking-widest text-slate-500 font-mono truncate max-w-[150px] sm:max-w-none">GROW YOUR BUSINESS WITH US</span>
            </div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden xl:flex items-center gap-6 ml-10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xs lg:text-sm font-medium transition-colors whitespace-nowrap ${location.pathname === item.path
                    ? 'text-brand-gold font-medium'
                    : 'text-slate-300 hover:text-brand-gold'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Tablet/Smaller Desktop Nav (Reduced items) */}
          <nav className="hidden md:flex xl:hidden items-center gap-4 ml-6">
             {navItems.filter(i => ['Home', 'Services', 'About Us', 'Contact'].includes(i.label)).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xs font-medium transition-colors whitespace-nowrap ${location.pathname === item.path
                    ? 'text-brand-gold'
                    : 'text-slate-300 hover:text-brand-gold'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Buttons */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 ml-auto">
            <Link to="/appointment" className="px-4 lg:px-6 py-2 border border-brand-gold/40 text-brand-gold font-semibold rounded-full hover:bg-brand-gold/10 transition-colors text-xs lg:text-sm whitespace-nowrap">
              Book Appointment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden ml-auto flex items-center gap-3">
             <button className="text-slate-200 p-1" onClick={toggleMobileMenu}>
               <span className="material-icons">
                 {isMobileMenuOpen ? 'close' : 'menu'}
               </span>
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-surface border-t border-brand-border shadow-xl overflow-y-auto max-h-[calc(100vh-80px)]">
          <div className="flex flex-col px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={toggleMobileMenu}
                className={`px-4 py-3 rounded-lg font-medium block border border-transparent hover:border-brand-border hover:bg-brand-border/30 transition-all ${location.pathname === item.path
                    ? 'text-brand-gold bg-brand-border/40'
                    : 'text-slate-200'
                  }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-brand-border flex flex-col gap-3">
              <Link to="/appointment" onClick={toggleMobileMenu} className="text-center px-6 py-3 border border-brand-gold/40 text-brand-gold rounded-full font-semibold transition-colors">Book Appointment</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
