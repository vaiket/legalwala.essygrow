import React, { useState, useEffect, useRef } from 'react';

const Appointment: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    service: '', date: '', time: '', message: ''
  });
  const [errors, setErrors] = useState({
    name: '', email: '', phone: '',
    service: '', date: '', time: ''
  });
  const [focused, setFocused] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [submitted, setSubmitted] = useState(false);
  const [finalSuccess, setFinalSuccess] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const services = [
    'Business Consultation', 'Company Registration',
    'GST Registration', 'Tax Planning',
    'Legal Documentation', 'Accounting Services',
    'Compliance Management', 'Other Services'
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
  ];



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Prevent digits in name field
    if (name === 'name') {
      const onlyLetters = value.replace(/\d/g, '');
      setFormData(p => ({ ...p, [name]: onlyLetters }));
    } else {
      setFormData(p => ({ ...p, [name]: value }));
    }
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(p => ({ ...p, [name]: '' }));
    }
    
    // Validate date format on change (YYYY-MM-DD)
    if (name === 'date' && value) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (dateRegex.test(value)) {
        if (!isDateValid(value)) {
          setErrors(p => ({ ...p, date: 'Please select a valid date within the allowed range' }));
        } else {
          setErrors(p => ({ ...p, date: '' }));
        }
      } else {
        // Allow partial input but don't validate yet
        if (value.length >= 10) {
          setErrors(p => ({ ...p, date: 'Please use YYYY-MM-DD format' }));
        }
      }
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      service: '',
      date: '',
      time: ''
    };
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian phone number';
      isValid = false;
    }

    // Service validation
    if (!formData.service) {
      newErrors.service = 'Please select a service';
      isValid = false;
    }

    // Date validation
    if (!formData.date) {
      newErrors.date = 'Please select a date';
      isValid = false;
    } else if (!isDateValid(formData.date)) {
      newErrors.date = 'Please select a future date';
      isValid = false;
    }

    // Time validation
    if (!formData.time) {
      newErrors.time = 'Please select a time';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const message = `LegalVala Appointment Request
---------------------------
Name    : ${formData.name}
Email   : ${formData.email}
Phone   : ${formData.phone}
Service : ${formData.service}
Date    : ${formData.date}
Time    : ${formData.time}
Message : ${formData.message || 'N/A'}`;

    const waUrl = `https://wa.me/919286495921?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank');

    // Show the "Sent" screen but with an option to email if WA failed
    setSubmitted(true);
  };

  const handleEmailBackup = () => {
    // We'll simulate a successful submission as requested.
    // In a real scenario, you would use EmailJS or a backend API here.
    setFinalSuccess(true);
  };

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() + 1);
    return today.toISOString().split('T')[0];
  };

  const isDateValid = (dateString: string) => {
    if (!dateString) return false;
    const selectedDate = new Date(dateString);
    const minDate = new Date(getMinDate());
    const maxDate = new Date(getMaxDate());
    selectedDate.setHours(0, 0, 0, 0);
    minDate.setHours(0, 0, 0, 0);
    maxDate.setHours(0, 0, 0, 0);
    return selectedDate >= minDate && selectedDate <= maxDate;
  };

  const orbs = [
    { cx: '10%', cy: '20%', r: 280, delay: 0 },
    { cx: '85%', cy: '60%', r: 220, delay: 2 },
    { cx: '50%', cy: '90%', r: 180, delay: 4 },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --gold: #F0C040;
          --gold2: #FFD97A;
          --gold3: rgba(240,192,64,0.18);
          --bg: #0C0C10;
          --s1: #13131A;
          --s2: #18181F;
          --border: rgba(240,192,64,0.14);
          --border2: rgba(240,192,64,0.3);
          --white: #FFFFFF;
          --off: #C8C4D4;
          --dim: #7A748A;
          --dim2: #3A3548;
        }

        .pg {
          min-height: 100vh;
          background: var(--bg);
          color: var(--white);
          font-family: 'Plus Jakarta Sans', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        /* ── ANIMATED BACKGROUND ── */
        .bg-layer {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.18;
          animation: orbFloat 12s ease-in-out infinite;
        }
        .orb-1 {
          width: 500px; height: 500px;
          left: -100px; top: -80px;
          background: radial-gradient(circle, #F0C040 0%, #FF8C00 60%, transparent 100%);
          animation-delay: 0s;
        }
        .orb-2 {
          width: 400px; height: 400px;
          right: -60px; top: 30%;
          background: radial-gradient(circle, #7B5EA7 0%, #4A3080 60%, transparent 100%);
          animation-delay: -4s;
          opacity: 0.12;
        }
        .orb-3 {
          width: 350px; height: 350px;
          left: 30%; bottom: -60px;
          background: radial-gradient(circle, #F0C040 0%, #E06020 70%, transparent 100%);
          animation-delay: -8s;
          opacity: 0.1;
        }

        @keyframes orbFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          33% { transform: translateY(-30px) scale(1.05); }
          66% { transform: translateY(20px) scale(0.97); }
        }

        /* Grid lines */
        .grid-lines {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image:
            linear-gradient(rgba(240,192,64,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(240,192,64,0.03) 1px, transparent 1px);
          background-size: 80px 80px;
        }

        /* Floating particles */
        .particle {
          position: fixed;
          width: 2px; height: 2px;
          border-radius: 50%;
          background: var(--gold);
          opacity: 0;
          pointer-events: none;
          z-index: 0;
          animation: particleDrift linear infinite;
        }
        @keyframes particleDrift {
          0%   { opacity: 0; transform: translateY(100vh) translateX(0); }
          10%  { opacity: 0.6; }
          90%  { opacity: 0.3; }
          100% { opacity: 0; transform: translateY(-20px) translateX(40px); }
        }

        /* ── INNER ── */
        .inner {
          position: relative;
          z-index: 1;
          max-width: 1240px;
          margin: 0 auto;
          padding: 96px 40px 120px;
        }
        @media (max-width: 768px) { .inner { padding: 72px 20px 80px; } }

        /* ── HEADER ── */
        .hd-wrap {
          margin-bottom: 72px;
          animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both;
        }
        .hd-tag {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(240,192,64,0.08);
          border: 1px solid rgba(240,192,64,0.2);
          border-radius: 100px;
          padding: 6px 16px 6px 10px;
          margin-bottom: 32px;
        }
        .hd-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--gold);
          box-shadow: 0 0 8px var(--gold);
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,100% { opacity: 1; box-shadow: 0 0 8px var(--gold); }
          50% { opacity: 0.6; box-shadow: 0 0 16px var(--gold); }
        }
        .hd-tag-text {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
        }

        .hd-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(52px, 8vw, 100px);
          font-weight: 900;
          line-height: 0.92;
          letter-spacing: -0.03em;
          color: var(--white);
          margin-bottom: 28px;
        }
        .hd-title .italic {
          font-style: italic;
          font-weight: 400;
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold2) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hd-sub {
          font-size: 16px;
          font-weight: 300;
          color: var(--off);
          max-width: 500px;
          line-height: 1.75;
        }

        /* Decorative SVG line */
        .deco-line {
          position: absolute;
          right: 0; top: 0;
          width: 420px;
          opacity: 0.06;
          pointer-events: none;
          animation: rotateSlow 60s linear infinite;
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg) translateX(30px); }
          to   { transform: rotate(360deg) translateX(30px); }
        }

        /* ── LAYOUT ── */
        .layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 28px;
          align-items: start;
        }
        @media (max-width: 1024px) { .layout { grid-template-columns: 1fr; } }

        /* ── FORM CARD ── */
        .fcard {
          background: var(--s1);
          border: 1px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.12s both;
        }

        /* Glowing top edge */
        .fcard::before {
          content: '';
          position: absolute;
          top: -1px; left: 10%; right: 10%; height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), var(--gold2), var(--gold), transparent);
          border-radius: 2px;
          box-shadow: 0 0 20px rgba(240,192,64,0.5), 0 0 60px rgba(240,192,64,0.15);
        }

        /* Inner glow corner */
        .fcard::after {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 300px; height: 300px;
          background: radial-gradient(circle at top right, rgba(240,192,64,0.06) 0%, transparent 60%);
          pointer-events: none;
        }

        .fcard-head {
          padding: 36px 44px 28px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }
        @media (max-width: 600px) { .fcard-head { padding: 28px 24px 22px; } }

        .fcard-title {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          font-weight: 700;
          color: var(--white);
          letter-spacing: -0.01em;
        }
        .fcard-badge {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--gold);
          background: rgba(240,192,64,0.08);
          border: 1px solid rgba(240,192,64,0.2);
          padding: 5px 12px;
          border-radius: 100px;
        }

        .fcard-body {
          padding: 40px 44px 44px;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 600px) { .fcard-body { padding: 28px 24px 32px; } }

        /* Fields */
        .row2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 22px;
        }
        @media (max-width: 600px) { .row2 { grid-template-columns: 1fr; } }

        .fg { margin-bottom: 22px; position: relative; }
        .fg:last-of-type { margin-bottom: 0; }

        .fl {
          display: block;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--dim);
          margin-bottom: 9px;
          transition: color 0.2s;
        }
        .fg:focus-within .fl { color: var(--gold); }

        .fi, .fs, .ft {
          width: 100%;
          background: var(--s2);
          border: 1px solid var(--dim2);
          border-radius: 10px;
          padding: 13px 18px;
          color: var(--white);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 400;
          outline: none;
          transition: all 0.25s;
          -webkit-appearance: none;
          appearance: none;
        }
        .fi::placeholder, .ft::placeholder { color: #3A3548; }
        .fi:focus, .fs:focus, .ft:focus {
          border-color: var(--gold);
          background: rgba(240,192,64,0.04);
          box-shadow: 0 0 0 3px rgba(240,192,64,0.08), 0 0 20px rgba(240,192,64,0.06);
        }
        .fi:hover:not(:focus), .fs:hover:not(:focus), .ft:hover:not(:focus) {
          border-color: var(--dim);
        }
        /* Fix for autocomplete suggestions background */
        .fi:-webkit-autofill,
        .fi:-webkit-autofill:hover,
        .fi:-webkit-autofill:focus,
        .fi:-webkit-autofill:active {
          -webkit-text-fill-color: var(--white) !important;
          -webkit-box-shadow: 0 0 0 30px var(--s2) inset !important;
          box-shadow: 0 0 0 30px var(--s2) inset !important;
          transition: background-color 5000s ease-in-out 0s;
        }
        .fs:-webkit-autofill,
        .fs:-webkit-autofill:hover,
        .fs:-webkit-autofill:focus,
        .fs:-webkit-autofill:active {
          -webkit-text-fill-color: var(--white) !important;
          -webkit-box-shadow: 0 0 0 30px var(--s2) inset !important;
          box-shadow: 0 0 0 30px var(--s2) inset !important;
          transition: background-color 5000s ease-in-out 0s;
        }
        /* Error state */
        .fi.error, .fs.error, .ft.error {
          border-color: #ef4444 !important;
          background: rgba(239,68,68,0.05) !important;
        }
        .fi.error:focus, .fs.error:focus, .ft.error:focus {
          box-shadow: 0 0 0 3px rgba(239,68,68,0.2), 0 0 20px rgba(239,68,68,0.1) !important;
        }
        .error-msg {
          font-size: 11px;
          color: #ef4444;
          margin-top: 6px;
          display: block;
        }

        /* Date input wrapper with calendar icon */
        .date-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .date-input-wrapper input {
          padding-right: 40px !important;
        }
        .calendar-icon {
          position: absolute;
          right: 16px;
          font-size: 18px;
          color: var(--gold);
          pointer-events: none;
        }

        .swrap { position: relative; }
        .swrap::after {
          content: '';
          position: absolute;
          right: 16px; top: 50%;
          width: 7px; height: 7px;
          border-right: 1.5px solid var(--dim);
          border-bottom: 1.5px solid var(--dim);
          transform: translateY(-65%) rotate(45deg);
          pointer-events: none;
          transition: border-color 0.2s;
        }
        .fg:focus-within .swrap::after { border-color: var(--gold); }
        .fs option { background: #1a1a22; color: var(--white); }
        .ft { resize: none; height: 100px; line-height: 1.6; }

        /* Date+time row */
        .dt-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 22px;
        }
        @media (max-width: 600px) { .dt-row { grid-template-columns: 1fr; } }

        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.6) sepia(1) saturate(3) hue-rotate(5deg);
          opacity: 0.5; cursor: pointer;
        }

        /* Submit */
        .sbtn {
          margin-top: 32px;
          width: 100%;
          background: linear-gradient(135deg, #F0C040 0%, #FFD97A 50%, #E8A820 100%);
          color: #0C0800;
          border: none;
          border-radius: 12px;
          padding: 17px 32px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s;
          box-shadow: 0 4px 24px rgba(240,192,64,0.2);
        }
        .sbtn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .sbtn::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .sbtn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(240,192,64,0.35), 0 0 60px rgba(240,192,64,0.1);
        }
        .sbtn:hover::before, .sbtn:hover::after { opacity: 1; }
        .sbtn:active { transform: translateY(0); }

        /* ── SIDEBAR ── */
        .sb { display: flex; flex-direction: column; gap: 20px; }

        .sc {
          background: var(--s1);
          border: 1px solid var(--border);
          border-radius: 18px;
          overflow: hidden;
          position: relative;
          transition: border-color 0.3s;
        }
        .sc:hover { border-color: var(--border2); }
        .sc::before {
          content: '';
          position: absolute;
          top: -1px; left: 20%; right: 20%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(240,192,64,0.4), transparent);
        }

        .sc-head { padding: 24px 26px 0; }
        .sc-title {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 3px;
        }
        .sc-sub {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--dim);
        }

        /* Consultants */
        .cl { padding: 16px 26px 26px; }
        .ci {
          display: flex; align-items: center; gap: 13px;
          padding: 13px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: all 0.2s;
          cursor: default;
        }
        .ci:last-child { border-bottom: none; padding-bottom: 0; }
        .ci:hover .cn { color: var(--gold2); }
        .ci:hover .cav { border-color: rgba(240,192,64,0.5); box-shadow: 0 0 12px rgba(240,192,64,0.15); }

        .cav {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(240,192,64,0.15) 0%, rgba(240,192,64,0.05) 100%);
          border: 1px solid rgba(240,192,64,0.2);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          font-family: 'Playfair Display', serif;
          font-size: 12px;
          font-weight: 700;
          color: var(--gold);
          transition: all 0.25s;
        }
        .cn {
          font-size: 13px; font-weight: 600;
          color: var(--white); margin-bottom: 2px;
          transition: color 0.2s;
        }
        .cr { font-size: 11px; font-weight: 300; color: var(--dim); }
        .cm { margin-left: auto; text-align: right; flex-shrink: 0; }
        .crt {
          font-size: 12px; font-weight: 700;
          color: var(--gold);
          display: flex; align-items: center; gap: 3px;
          justify-content: flex-end;
        }
        .cstar { font-size: 9px; }
        .cex { font-size: 10px; color: var(--dim); margin-top: 2px; font-weight: 300; }

        /* Benefits */
        .bl { padding: 10px 26px 26px; display: flex; flex-direction: column; gap: 11px; }
        .bi {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 13px; color: var(--off); font-weight: 300;
          line-height: 1.45; transition: color 0.2s;
        }
        .bi:hover { color: var(--white); }
        .bd {
          width: 18px; height: 18px; border-radius: 5px;
          background: rgba(240,192,64,0.1);
          border: 1px solid rgba(240,192,64,0.2);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 1px;
          font-size: 9px; color: var(--gold);
        }

        /* Contact */
        .cc {
          background: linear-gradient(135deg, #14141C 0%, #0F0F16 100%);
          border: 1px solid var(--border);
          border-radius: 18px; padding: 26px;
          position: relative; overflow: hidden;
          animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.36s both;
        }
        .cc::before {
          content: '';
          position: absolute; top: -1px; left: 20%; right: 20%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(240,192,64,0.3), transparent);
        }
        /* Decorative circle in contact card */
        .cc-deco {
          position: absolute; bottom: -30px; right: -30px;
          width: 100px; height: 100px; border-radius: 50%;
          border: 1px solid rgba(240,192,64,0.08);
        }
        .cc-deco2 {
          position: absolute; bottom: -10px; right: -10px;
          width: 60px; height: 60px; border-radius: 50%;
          border: 1px solid rgba(240,192,64,0.12);
        }

        .cc-title {
          font-family: 'Playfair Display', serif;
          font-size: 17px; font-weight: 700;
          color: var(--white); margin-bottom: 18px;
        }
        .cc-rows { display: flex; flex-direction: column; gap: 13px; }
        .cc-row {
          display: flex; align-items: center; gap: 12px;
          font-size: 13px; color: var(--off); font-weight: 300;
        }
        .cc-ico {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(240,192,64,0.08);
          border: 1px solid rgba(240,192,64,0.15);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; color: var(--gold); flex-shrink: 0;
          transition: all 0.2s;
        }
        .cc-row:hover .cc-ico {
          background: rgba(240,192,64,0.15);
          box-shadow: 0 0 12px rgba(240,192,64,0.15);
        }
        .cc-row:hover { color: var(--white); }

        /* Success */
        .success-wrap {
          text-align: center; padding: 80px 44px;
          animation: fadeUp 0.6s ease both;
        }
        .success-ring {
          width: 80px; height: 80px; border-radius: 50%;
          border: 2px solid var(--gold);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 28px;
          font-size: 30px;
          box-shadow: 0 0 30px rgba(240,192,64,0.2), inset 0 0 20px rgba(240,192,64,0.05);
          animation: ringPulse 2s ease-in-out infinite;
        }
        @keyframes ringPulse {
          0%,100% { box-shadow: 0 0 20px rgba(240,192,64,0.2); }
          50% { box-shadow: 0 0 40px rgba(240,192,64,0.4); }
        }
        .success-title {
          font-family: 'Playfair Display', serif;
          font-size: 36px; font-weight: 700;
          color: var(--white); margin-bottom: 14px;
        }
        .success-sub { font-size: 14px; color: var(--off); line-height: 1.7; }

        /* Animations */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .a1 { animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .a2 { animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
        .a3 { animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s both; }
        .a4 { animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s both; }

        /* Decorative SVG rings header */
        .hd-deco {
          position: absolute;
          right: -60px; top: -40px;
          width: 380px; height: 380px;
          pointer-events: none;
          opacity: 0.07;
          animation: rotateSlow 80s linear infinite;
        }
      `}</style>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div key={i} className="particle" style={{
          left: `${5 + i * 8}%`,
          animationDuration: `${8 + (i % 5) * 3}s`,
          animationDelay: `${i * 1.1}s`,
          width: i % 3 === 0 ? '3px' : '2px',
          height: i % 3 === 0 ? '3px' : '2px',
          opacity: 0,
        }} />
      ))}

      <div className="pg" ref={pageRef}>
        <div className="bg-layer">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        <div className="grid-lines" />

        <div className="inner">

          {/* Decorative SVG rings */}
          <div style={{ position: 'relative' }}>
            <svg className="hd-deco" viewBox="0 0 380 380" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="190" cy="190" r="180" stroke="#F0C040" strokeWidth="1" />
              <circle cx="190" cy="190" r="145" stroke="#F0C040" strokeWidth="0.5" />
              <circle cx="190" cy="190" r="110" stroke="#F0C040" strokeWidth="1" />
              <circle cx="190" cy="190" r="60" stroke="#F0C040" strokeWidth="0.5" />
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
                <line key={deg}
                  x1={190 + 60 * Math.cos(deg * Math.PI / 180)}
                  y1={190 + 60 * Math.sin(deg * Math.PI / 180)}
                  x2={190 + 180 * Math.cos(deg * Math.PI / 180)}
                  y2={190 + 180 * Math.sin(deg * Math.PI / 180)}
                  stroke="#F0C040" strokeWidth="0.5"
                />
              ))}
            </svg>

            {/* Header */}
            <div className="hd-wrap a1">
              <div className="hd-tag">
                <span className="hd-dot" />
                <span className="hd-tag-text">LegalVala · Expert Consultation</span>
              </div>
              <h1 className="hd-title">
                Book Your<br />
                <span className="italic">Consultation.</span>
              </h1>
              <p className="hd-sub">
                One-on-one guidance with India's top legal & financial experts.
                Schedule at your convenience.
              </p>
            </div>
          </div>

          {/* Layout */}
          <div className="layout">

            {/* Form */}
            <div className="fcard a2">
              {finalSuccess ? (
                <div className="success-wrap" style={{ padding: '40px 20px' }}>
                  <div className="success-ring" style={{ margin: '0 auto 20px' }}>✓</div>
                  <div className="success-title" style={{ fontSize: '24px', color: 'var(--gold)' }}>Booking Successful!</div>
                  <p className="success-sub" style={{ fontSize: '15px', color: 'var(--off)', marginTop: '12px' }}>
                    Thank you for choosing LegalVala.<br />
                    Our expert team has received your details and will contact you within 2 business hours.
                  </p>
                  <button
                    onClick={() => { setFinalSuccess(false); setSubmitted(false); }}
                    className="sbtn"
                    style={{ marginTop: '30px', background: 'transparent', border: '1px solid var(--gold)', color: 'var(--gold)' }}
                  >
                    Done
                  </button>
                </div>
              ) : submitted ? (
                <div className="success-wrap" style={{ textAlign: 'left', padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                    <div className="success-ring" style={{ width: '40px', height: '40px', fontSize: '18px' }}>💬</div>
                    <div>
                      <div className="success-title" style={{ fontSize: '18px', marginBottom: '4px' }}>WhatsApp Opened!</div>
                      <p style={{ color: 'var(--off)', fontSize: '13px' }}>If WhatsApp didn't work, edit & confirm here:</p>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <div className="row2">
                      <div className="fg">
                        <label className="fl">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="fi" />
                      </div>
                      <div className="fg">
                        <label className="fl">Service</label>
                        <select name="service" value={formData.service} onChange={handleChange} className="fi">
                          {services.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="row2" style={{ marginTop: '12px' }}>
                      <div className="fg">
                        <label className="fl">Date</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} className="fi" min={getMinDate()} />
                      </div>
                      <div className="fg">
                        <label className="fl">Time</label>
                        <select name="time" value={formData.time} onChange={handleChange} className="fi">
                          {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={handleEmailBackup}
                      className="sbtn"
                      style={{ marginTop: '24px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                    >
                      <span>Submit</span>
                      <span className="material-icons" style={{ fontSize: '18px' }}>send</span>
                    </button>

                    <button
                      onClick={handleSubmit}
                      style={{
                        marginTop: '12px',
                        background: 'transparent',
                        border: '1px solid var(--border)',
                        color: 'var(--off)',
                        fontSize: '12px',
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      Retry WhatsApp
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="fcard-head">
                    <div className="fcard-title">Schedule Your Session</div>
                    <div className="fcard-badge">Free Consultation</div>
                  </div>
                  <div className="fcard-body">
                    <form onSubmit={handleSubmit}>

                      <div className="row2">
                        <div className="fg" style={{ marginBottom: 0 }}>
                          <label className="fl">Full Name *</label>
                          <input type="text" name="name" value={formData.name}
                            onChange={handleChange} required
                            className={`fi ${errors.name ? 'error' : ''}`} placeholder="Your full name" />
                          {errors.name && <span className="error-msg">{errors.name}</span>}
                        </div>
                        <div className="fg" style={{ marginBottom: 0 }}>
                          <label className="fl">Email Address *</label>
                          <input type="email" name="email" value={formData.email}
                            onChange={handleChange} required
                            className={`fi ${errors.email ? 'error' : ''}`} placeholder="you@email.com" />
                          {errors.email && <span className="error-msg">{errors.email}</span>}
                        </div>
                      </div>

                      <div className="fg">
                        <label className="fl">Phone Number *</label>
                        <input type="tel" name="phone" value={formData.phone}
                          onChange={handleChange} required
                          className={`fi ${errors.phone ? 'error' : ''}`} placeholder="+91 98765 43210" maxLength={10}
                          inputMode="numeric" />
                          {errors.phone && <span className="error-msg">{errors.phone}</span>}
                      </div>

                      <div className="fg">
                        <label className="fl">Service Type *</label>
                        <div className="swrap">
                          <select name="service" value={formData.service}
                            onChange={handleChange} required className={`fs ${errors.service ? 'error' : ''}`}>
                            <option value="">Select a service</option>
                            {services.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                        {errors.service && <span className="error-msg">{errors.service}</span>}
                      </div>

                      <div className="dt-row">
                        <div className="fg" style={{ marginBottom: 0 }}>
                          <label className="fl">Preferred Date *</label>
                          <div className="date-input-wrapper">
                            <input 
                              type="date" 
                              name="date" 
                              value={formData.date}
                              onChange={handleChange}
                              required
                              min={getMinDate()} 
                              max={getMaxDate()} 
                              className={`fi ${errors.date ? 'error' : ''}`} 
                            />
                            <span className="calendar-icon">📅</span>
                          </div>
                            {errors.date && <span className="error-msg">{errors.date}</span>}
                        </div>
                        <div className="fg" style={{ marginBottom: 0 }}>
                          <label className="fl">Preferred Time *</label>
                          <div className="swrap">
                            <select name="time" value={formData.time}
                              onChange={handleChange} required className={`fs ${errors.time ? 'error' : ''}`}>
                              <option value="">Select time</option>
                              {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                          </div>
                          {errors.time && <span className="error-msg">{errors.time}</span>}
                        </div>
                      </div>

                      <div className="fg">
                        <label className="fl">Message (Optional)</label>
                        <textarea name="message" value={formData.message}
                          onChange={handleChange} className="ft"
                          placeholder="Describe your requirement briefly..." />
                      </div>

                      <button type="submit" className="sbtn">
                        Book Appointment →
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="sb">



              {/* Benefits */}
              <div className="sc a3" style={{ animationDelay: '0.25s' }}>
                <div className="sc-head" style={{ paddingBottom: '14px' }}>
                  <div className="sc-title">Why Book With Us?</div>
                </div>
                <div className="bl">
                  {[
                    'Expert certified professionals',
                    'Free initial consultation',
                    'Confidential & secure process',
                    'Follow-up support included',
                    'Flexible scheduling',
                    'Transparent fees'
                  ].map((b, i) => (
                    <div className="bi" key={i}>
                      <span className="bd">✓</span>
                      {b}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="cc a4">
                <div className="cc-deco" />
                <div className="cc-deco2" />
                <div className="cc-title">Need Help?</div>
                <div className="cc-rows">
                  <a href="tel:+919286495921" className="cc-row" style={{ textDecoration: 'none' }}>
                    <div className="cc-ico">✆</div>
                    +91 9286495921
                  </a>
                  <a href="mailto:info@legalvala.com" className="cc-row" style={{ textDecoration: 'none' }}>
                    <div className="cc-ico">@</div>
                    info@legalvala.com
                  </a>
                  <div className="cc-row">
                    <div className="cc-ico">◷</div>
                    Mon–Sat: 10:00 AM – 7:00 PM
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointment;