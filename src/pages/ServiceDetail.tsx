import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getServiceById, ServiceData } from '../data/servicesData';
import emailjs from '@emailjs/browser';

// ─── Replace these with your actual EmailJS credentials ───
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // e.g. 'abc123XYZ'

/* ─── animated counter ─── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const delay = setTimeout(() => {
      let start = 0;
      const duration = 1500;
      const totalSteps = 60;
      const stepTime = Math.floor(duration / totalSteps);
      const increment = Math.ceil(target / totalSteps);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) { setVal(target); clearInterval(timer); }
        else setVal(start);
      }, stepTime);
      return () => clearInterval(timer);
    }, 700);
    return () => clearTimeout(delay);
  }, [target]);
  return <span>{val.toLocaleString()}{suffix}</span>;
}

/* ─── Particle canvas background ─── */
function ParticleBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      o: Math.random() * 0.5 + 0.1,
    }));
    let raf: number;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,55,${p.o})`; ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    const onResize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}

/* ══════════════ MAIN COMPONENT ══════════════ */
const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<ServiceData | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', phone: '' });
  const [isSending, setIsSending] = useState(false);
  const [finalSuccess, setFinalSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'docs' | 'process' | 'faq'>('docs');
  const heroRef = useRef<HTMLDivElement>(null);

  const getParentInfo = (cat: string) => {
    if (['company', 'partnership', 'other'].includes(cat))              return { name: 'Start a Business', path: '/start-business' };
    if (['tax', 'business', 'intellectual', 'certification'].includes(cat)) return { name: 'Registration',    path: '/registration' };
    if (['accounting', 'compliance', 'consulting', 'reports'].includes(cat)) return { name: 'Manage Business', path: '/manage-business' };
    if (['legal'].includes(cat))                                         return { name: 'Legal Documents',   path: '/document' };
    return { name: 'Services', path: '/services' };
  };

  useEffect(() => {
    const s = getServiceById(id);
    if (s) setService(s);
    else navigate('/services');
  }, [id, navigate]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty('--mx', `${x}%`);
      hero.style.setProperty('--my', `${y}%`);
    };
    hero.addEventListener('mousemove', onMove);
    return () => hero.removeEventListener('mousemove', onMove);
  }, [service]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name in errors) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    let newErrors = { name: '', email: '', phone: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'; isValid = false;
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'; isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'; isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address'; isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'; isValid = false;
    } else if (!/^\+?[0-9]{10,14}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Invalid phone number'; isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSending(true);

    const templateParams = {
      to_name:    'LegalVala Team',
      from_name:  formData.name,
      from_email: formData.email,
      phone:      formData.phone,
      service:    service?.title || '',
      message:    formData.message || 'No message provided',
      reply_to:   formData.email,
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      setFinalSuccess(true);
    } catch (error) {
      console.error('EmailJS send failed:', error);
      // Fallback to WhatsApp if EmailJS fails
      const message = `LegalVala Service Inquiry
---------------------------
Service : ${service?.title}
Name    : ${formData.name}
Email   : ${formData.email}
Phone   : ${formData.phone}
Message : ${formData.message}`;

      const waUrl = `https://wa.me/919286495921?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
      
      // Show success message even if WhatsApp opens
      setFinalSuccess(true);
    } finally {
      setIsSending(false);
    }
  };

  if (!service) return (
    <div style={styles.loadingScreen}>
      <div style={styles.spinner} />
      <span style={{ color: '#d4af37', marginTop: 16, fontSize: 14, letterSpacing: 2 }}>LOADING</span>
    </div>
  );

  const parentInfo = getParentInfo(service.category);

  const whyUs = [
    { icon: '⚡', title: 'Lightning Fast',  desc: "Fastest processing in the industry — we handle government queues so you don't have to wait." },
    { icon: '🔒', title: '100% Secure',     desc: 'Your documents and data are encrypted end-to-end. We never share information with third parties.' },
    { icon: '🎯', title: 'Expert Team',     desc: 'Our CAs, CSs and legal experts have 10+ years of combined experience in Indian business law.' },
    { icon: '💬', title: '24/7 Support',    desc: 'Dedicated relationship manager assigned to your account. Call, WhatsApp or email — anytime.' },
    { icon: '💳', title: 'Easy EMI',        desc: 'Flexible payment options with easy EMI facilities. Start today and pay in manageable installments.' },
  ];

  const faqs = [
    { q: 'How do I get started?',              a: 'Simply fill in the inquiry form. Our team will call you within 2 hours on business days to guide you through the process.' },
    { q: 'Are there any hidden charges?',       a: 'No. The price shown is all-inclusive of government fees, professional fees, and GST. Zero surprises.' },
    { q: 'What happens after I submit documents?', a: 'We file everything with the appropriate authority and send you real-time status updates via WhatsApp and email.' },
    { q: 'Can I track my application?',         a: "Yes. You'll receive a unique tracking ID once your application is submitted, viewable on your client portal." },
  ];

  return (
    <>
      <style>{css}</style>
      <div style={styles.page}>

        {/* BREADCRUMB */}
        <div className="sd-breadcrumb-wrap" style={{ ...styles.breadcrumb, justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link to="/" style={styles.breadLink}>Home</Link>
            <span style={styles.breadSep}>/</span>
            <Link to="/services" style={styles.breadLink}>Services</Link>
            <span style={styles.breadSep}>/</span>
            <span style={styles.breadActive}>{service.title}</span>
          </div>
          <button
            onClick={() => navigate(parentInfo.path)}
            style={{ background: 'transparent', border: '1px solid #334155', color: '#cbd5e1', padding: '6px 14px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: "'Inter', sans-serif", transition: 'all 0.2s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#64748b'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.color = '#cbd5e1'; }}
          >
            <span className="material-icons" style={{ fontSize: '16px' }}>arrow_back</span>
            Back to {parentInfo.name}
          </button>
        </div>

        {/* HERO */}
        <div ref={heroRef} className="sd-hero" style={styles.hero}>
          <ParticleBg />
          <div className="sd-spotlight" />
          <div style={styles.heroInner} className="sd-hero-inner">
            {/* LEFT */}
            <div style={styles.heroLeft} className="sd-fade-up sd-hero-left">
              <div style={styles.iconWrap} className="sd-icon-float sd-icon-wrap">
                <span className="material-icons" style={{ fontSize: 36, color: '#d4af37' }}>{service.icon}</span>
              </div>
              <div style={styles.badge} className="sd-hero-badge">LEGALVALA VERIFIED ✦</div>
              <h1 style={styles.heroTitle} className="sd-hero-title">{service.title}</h1>
              <p style={styles.heroDesc} className="sd-hero-desc">{service.description}</p>
              <div style={styles.metaRow} className="sd-meta-row">
                <div style={styles.metaCard}>
                  <span style={styles.metaLabel}>Starting From</span>
                  <span style={styles.metaValue} className="sd-meta-value">{service.price}</span>
                </div>
                <div style={styles.metaDivider} className="sd-meta-divider" />
                <div style={styles.metaCard}>
                  <span style={styles.metaLabel}>Estimated Time</span>
                  <span style={styles.metaValue2} className="sd-meta-value2">{service.time}</span>
                </div>
                <div style={styles.metaDivider} className="sd-meta-divider" />
                <div style={styles.metaCard}>
                  <span style={styles.metaLabel}>Success Rate</span>
                  <span style={styles.metaValue2} className="sd-meta-value2">99.2%</span>
                </div>
              </div>
              <div style={styles.heroCtas} className="sd-hero-ctas">
                <button className="sd-btn-primary" onClick={() => document.getElementById('sd-form')?.scrollIntoView({ behavior: 'smooth' })}>
                  Get Started Now →
                </button>
                <a href="tel:+919286495921" className="sd-btn-outline">📞 Free Consultation</a>
              </div>
            </div>

            {/* RIGHT – features card */}
            <div style={styles.featureCard} className="sd-fade-up sd-delay-200 sd-feature-card">
              <div style={styles.featureCardGlow} />
              <h3 style={styles.featureTitle}>Key Features</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {service.features.map((f, i) => (
                  <li key={i} style={styles.featureItem}>
                    <span style={styles.featureCheck}>✦</span>
                    <span style={{ color: '#e2e8f0' }}>{f}</span>
                  </li>
                ))}
              </ul>
              <div style={styles.trustRow}>
                <span style={styles.trustBadge}>🏆 Govt Approved</span>
                <span style={styles.trustBadge}>✅ ISO Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="sd-section-reveal sd-main-grid" style={styles.mainGrid}>

          {/* LEFT COL */}
          <div style={styles.leftCol}>
            <div style={styles.tabBar}>
              {(['docs', 'process', 'faq'] as const).map(t => (
                <button key={t} onClick={() => setActiveTab(t)} style={{ ...styles.tab, ...(activeTab === t ? styles.tabActive : {}) }}>
                  {t === 'docs' ? '📋 Documents' : t === 'process' ? '⚙️ Process' : '❓ FAQs'}
                </button>
              ))}
            </div>

            {activeTab === 'docs' && service.documents && (
              <div style={styles.tabPanel} className="sd-tab-fade">
                <div style={styles.sectionHeader}>
                  <div style={styles.sectionLine} />
                  <h2 style={styles.sectionTitle}>Documents Required</h2>
                </div>
                <div style={styles.docsGrid}>
                  {service.documents.map((doc, i) => (
                    <div key={i} style={styles.docCard} className="sd-doc-card">
                      <span className="material-icons" style={{ color: '#d4af37', fontSize: 20 }}>description</span>
                      <span style={{ color: '#cbd5e1', fontSize: 14 }}>{doc}</span>
                    </div>
                  ))}
                </div>
                <div style={styles.docNote}>
                  <span style={{ color: '#d4af37' }}>ℹ️</span>
                  <span style={{ color: '#94a3b8', fontSize: 13 }}>
                    Don't have all documents ready? No problem — our team will guide you step by step on obtaining each one.
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'process' && service.process && (
              <div style={styles.tabPanel} className="sd-tab-fade">
                <div style={styles.sectionHeader}>
                  <div style={styles.sectionLine} />
                  <h2 style={styles.sectionTitle}>How It Works</h2>
                </div>
                <div style={styles.processStack}>
                  {service.process.map((step, i) => (
                    <div key={i} style={styles.processRow} className="sd-process-row">
                      <div style={styles.processLeft}>
                        <div style={styles.processNumWrap}>
                          <div style={styles.processNum}>{String(step.step).padStart(2, '0')}</div>
                          {i < service.process!.length - 1 && <div style={styles.processLine} />}
                        </div>
                      </div>
                      <div style={styles.processCard}>
                        <div style={styles.processCardAccent} />
                        <h4 style={styles.processCardTitle}>{step.title}</h4>
                        <p style={styles.processCardDesc}>{step.description}</p>
                        <span style={styles.processTag}>Step {step.step}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div style={styles.tabPanel} className="sd-tab-fade">
                <div style={styles.sectionHeader}>
                  <div style={styles.sectionLine} />
                  <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {faqs.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COL – FORM */}
          <div style={styles.rightCol} id="sd-form">
            <div style={styles.formCard} className="sd-form-card">
              <div style={styles.formGlow} />
              <div style={styles.formHeader}>
                <div style={styles.formHeaderDot} />
                <div>
                  <h3 style={styles.formTitle} className="sd-form-title">Get Started Now</h3>
                  <p style={styles.formSubtitle}>Expert callback within 2 hours</p>
                </div>
              </div>

              {finalSuccess ? (
                <div style={{ textAlign: 'center', padding: '30px 20px' }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                  <h4 style={{ color: '#d4af37', fontSize: 22, margin: '0 0 10px' }}>Submission Successful!</h4>
                  <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 24px' }}>
                    Our team has received your inquiry. We will contact you shortly within 2 business hours.
                  </p>
                  <button
                    onClick={() => setFinalSuccess(false)}
                    style={{ background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '10px 24px', borderRadius: '10px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={styles.form}>
                  {[
                    { id: 'name',  label: 'Full Name',     type: 'text',  placeholder: 'Enter Your Name' },
                    { id: 'email', label: 'Email Address', type: 'email', placeholder: 'Enter Your Email' },
                    { id: 'phone', label: 'Phone Number',  type: 'tel',   placeholder: 'Enter Your Phone' },
                  ].map(f => (
                    <div key={f.id} style={{ ...styles.fieldWrap, display: 'flex', flexDirection: 'column' }}>
                      <label style={styles.label}>{f.label}</label>
                      <input
                        type={f.type} id={f.id} name={f.id}
                        value={(formData as any)[f.id]}
                        onChange={handleInputChange}
                        required placeholder={f.placeholder}
                        className="sd-input"
                        style={(errors as any)[f.id] ? { ...styles.input, borderColor: '#ef4444' } : styles.input}
                      />
                      {(errors as any)[f.id] && <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{(errors as any)[f.id]}</span>}
                    </div>
                  ))}
                  <div style={styles.fieldWrap}>
                    <label style={styles.label}>Message <span style={{ color: '#64748b' }}>(Optional)</span></label>
                    <textarea
                      id="message" name="message" value={formData.message}
                      onChange={handleInputChange} rows={3}
                      placeholder="Any specific requirements or questions?"
                      className="sd-input" style={{ ...styles.input, resize: 'none' }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="sd-btn-primary"
                    disabled={isSending}
                    style={{ width: '100%', marginTop: 8, opacity: isSending ? 0.6 : 1, cursor: isSending ? 'not-allowed' : 'pointer' }}
                  >
                    {isSending ? 'Sending...' : 'Submit Inquiry ✦'}
                  </button>
                  <p style={styles.formNote}>🔒 Your data is 100% secure and never shared.</p>
                </form>
              )}

              <div style={styles.trustSignals}>
                {['⭐ 5.0 Rating', '🏆 15K+ Clients', '✅ No Hidden Fees'].map((t, i) => (
                  <span key={i} style={styles.trustChip}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* WHY US */}
        <div className="sd-section-reveal sd-why-section" style={styles.whySection}>
          <div style={styles.whyHeader}>
            <div style={styles.goldLine} />
            <h2 style={styles.whyTitle}>Why Choose LegalVala?</h2>
            <p style={styles.whySub}>India's most trusted compliance & registration partner</p>
          </div>
          <div className="sd-why-grid" style={styles.whyGrid}>
            {whyUs.map((w, i) => (
              <div key={i} style={styles.whyCard} className="sd-why-card">
                <div style={styles.whyIcon} className="sd-why-icon">{w.icon}</div>
                <h4 style={styles.whyCardTitle} className="sd-why-title-text">{w.title}</h4>
                <p style={styles.whyCardDesc} className="sd-why-desc-text">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA BANNER */}
        <div className="sd-section-reveal sd-cta-banner" style={styles.ctaBanner}>
          <div style={styles.ctaGlow1} />
          <div style={styles.ctaGlow2} />
          <h2 style={styles.ctaTitle} className="sd-cta-title">Ready to Register Your {service.title}?</h2>
          <p style={styles.ctaDesc} className="sd-cta-desc">Join 15,000+ entrepreneurs who trusted LegalVala. Get a free expert consultation today.</p>
          <div className="sd-cta-btns" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <button className="sd-btn-primary" style={{ fontSize: 16, padding: '14px 36px' }}
              onClick={() => document.getElementById('sd-form')?.scrollIntoView({ behavior: 'smooth' })}>
              Start Now — {service.price}
            </button>
            <a href="tel:+919286495921" className="sd-btn-outline" style={{ fontSize: 16, padding: '14px 36px' }}>
              📞 Talk to Expert
            </a>
          </div>
        </div>

      </div>
    </>
  );
};

/* ─── FAQ accordion ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ ...styles.faqItem, ...(open ? styles.faqItemOpen : {}) }} onClick={() => setOpen(!open)} className="sd-faq">
      <div style={styles.faqQ}>
        <span style={{ color: '#e2e8f0', fontSize: 15 }}>{q}</span>
        <span style={{ ...styles.faqChev, transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
      </div>
      {open && <p style={styles.faqA}>{a}</p>}
    </div>
  );
}

/* ════════════════ STYLES ════════════════ */
const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#0a0a0b', color: '#fff', fontFamily: "'Bricolage Grotesque', sans-serif", paddingTop: 80, paddingBottom: 80 },
  loadingScreen: { minHeight: '100vh', background: '#0a0a0b', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  spinner: { width: 40, height: 40, border: '3px solid #1a1a1a', borderTop: '3px solid #d4af37', borderRadius: '50%', animation: 'sd-spin 0.8s linear infinite' },
  breadcrumb: { padding: '20px 40px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #1a1a1a' },
  breadLink: { color: '#64748b', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s' },
  breadSep: { color: '#334155', fontSize: 13 },
  breadActive: { color: '#d4af37', fontSize: 13, fontWeight: 600 },
  hero: { position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #0e0e10 0%, #111115 60%, #0e0e10 100%)', borderBottom: '1px solid #1a1a1a', padding: '40px 40px' },
  heroInner: { maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 40, alignItems: 'flex-start', flexWrap: 'wrap', position: 'relative', zIndex: 2 },
  heroLeft: { flex: 1, minWidth: 320 },
  iconWrap: { width: 72, height: 72, borderRadius: 18, background: 'linear-gradient(135deg, #1a1500, #2a2000)', border: '1px solid #d4af3740', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: '0 0 30px #d4af3720' },
  badge: { display: 'inline-flex', alignItems: 'center', gap: 6, background: '#d4af3715', border: '1px solid #d4af3740', color: '#d4af37', fontSize: 11, fontWeight: 700, letterSpacing: 2, padding: '4px 12px', borderRadius: 100, marginBottom: 20 },
  heroTitle: { fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 300, lineHeight: 1.1, margin: '0 0 20px', color: '#fff', letterSpacing: -1 },
  heroDesc: { color: '#94a3b8', fontSize: 17, lineHeight: 1.7, margin: '0 0 36px', maxWidth: 560 },
  metaRow: { display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap', marginBottom: 36 },
  metaCard: { display: 'flex', flexDirection: 'column', gap: 4 },
  metaLabel: { fontSize: 11, color: '#64748b', letterSpacing: 1, textTransform: 'uppercase' },
  metaValue: { fontSize: 36, fontWeight: 700, color: '#d4af37', lineHeight: 1 },
  metaValue2: { fontSize: 22, fontWeight: 600, color: '#e2e8f0', lineHeight: 1 },
  metaDivider: { width: 1, height: 40, background: '#1e293b' },
  heroCtas: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  featureCard: { width: 320, flexShrink: 0, background: 'linear-gradient(145deg, #111115, #0e0e10)', border: '1px solid #d4af3730', borderRadius: 20, padding: 28, position: 'relative', overflow: 'hidden', backdropFilter: 'blur(20px)' },
  featureCardGlow: { position: 'absolute', top: -60, right: -60, width: 160, height: 160, background: '#d4af3712', borderRadius: '50%', filter: 'blur(40px)' },
  featureTitle: { color: '#d4af37', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 },
  featureItem: { display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0', borderBottom: '1px solid #1a1a1a' },
  featureCheck: { color: '#d4af37', fontSize: 10, marginTop: 4, flexShrink: 0 },
  trustRow: { display: 'flex', gap: 8, marginTop: 20 },
  trustBadge: { background: '#d4af3715', border: '1px solid #d4af3730', color: '#d4af37', fontSize: 11, padding: '4px 10px', borderRadius: 8 },
  mainGrid: { maxWidth: 1280, margin: '0 auto', padding: '40px 40px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, alignItems: 'start' },
  leftCol: {},
  rightCol: {},
  tabBar: { display: 'flex', gap: 4, marginBottom: 28, background: '#0d0d0f', border: '1px solid #1a1a1a', borderRadius: 12, padding: 4 },
  tab: { flex: 1, padding: '10px 16px', borderRadius: 9, border: 'none', background: 'transparent', color: '#64748b', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' },
  tabActive: { background: 'linear-gradient(135deg, #d4af37, #b8932a)', color: '#000', boxShadow: '0 4px 20px #d4af3740' },
  tabPanel: {},
  sectionHeader: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 },
  sectionLine: { width: 4, height: 28, background: 'linear-gradient(180deg, #d4af37, #b8932a)', borderRadius: 2 },
  sectionTitle: { fontSize: 26, fontWeight: 300, color: '#fff', margin: 0 },
  docsGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 },
  docCard: { display: 'flex', alignItems: 'center', gap: 10, background: '#0d0d0f', border: '1px solid #1a1a1a', borderRadius: 12, padding: '14px 16px', position: 'relative', overflow: 'hidden', transition: 'border-color 0.2s, transform 0.2s' },
  docNumber: { position: 'absolute', top: 6, right: 8, fontSize: 11, color: '#1e293b', fontWeight: 700 },
  docNote: { marginTop: 20, padding: '14px 16px', background: '#d4af3708', border: '1px solid #d4af3720', borderRadius: 10, display: 'flex', gap: 10, alignItems: 'flex-start' },
  processStack: { display: 'flex', flexDirection: 'column', gap: 0 },
  processRow: { display: 'flex', gap: 20, alignItems: 'flex-start' },
  processLeft: { display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 },
  processNumWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  processNum: { width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #d4af37, #b8932a)', color: '#000', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 0 20px #d4af3740', zIndex: 1 },
  processLine: { width: 2, flex: 1, minHeight: 40, background: 'linear-gradient(180deg, #d4af3760, transparent)', margin: '4px 0' },
  processCard: { flex: 1, background: '#0d0d0f', border: '1px solid #1a1a1a', borderRadius: 14, padding: '20px 24px', marginBottom: 16, position: 'relative', overflow: 'hidden', transition: 'border-color 0.2s' },
  processCardAccent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: 'linear-gradient(180deg, #d4af37, #b8932a)', borderRadius: '3px 0 0 3px' },
  processCardTitle: { color: '#fff', fontSize: 16, fontWeight: 600, margin: '0 0 6px' },
  processCardDesc: { color: '#64748b', fontSize: 14, margin: '0 0 10px', lineHeight: 1.6 },
  processTag: { fontSize: 11, color: '#d4af37', background: '#d4af3715', padding: '2px 8px', borderRadius: 6, letterSpacing: 1 },
  faqItem: { background: '#0d0d0f', border: '1px solid #1a1a1a', borderRadius: 12, padding: '16px 20px', cursor: 'pointer', transition: 'border-color 0.2s' },
  faqItemOpen: { borderColor: '#d4af3740' },
  faqQ: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  faqChev: { color: '#d4af37', fontSize: 18, transition: 'transform 0.25s', flexShrink: 0 },
  faqA: { color: '#64748b', fontSize: 14, lineHeight: 1.7, margin: '12px 0 0' },
  formCard: { background: '#0d0d0f', border: '1px solid #1a1a1a', borderRadius: 20, padding: 28, position: 'sticky', top: 24, overflow: 'hidden' },
  formGlow: { position: 'absolute', bottom: -60, left: '50%', transform: 'translateX(-50%)', width: 200, height: 200, background: '#d4af3710', borderRadius: '50%', filter: 'blur(50px)', pointerEvents: 'none' },
  formHeader: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 },
  formHeaderDot: { width: 10, height: 10, borderRadius: '50%', background: '#d4af37', boxShadow: '0 0 12px #d4af37', animation: 'sd-pulse 2s ease-in-out infinite', flexShrink: 0 },
  formTitle: { color: '#fff', fontSize: 20, fontWeight: 600, margin: 0 },
  formSubtitle: { color: '#64748b', fontSize: 12, margin: 0 },
  form: { display: 'flex', flexDirection: 'column', gap: 14 },
  fieldWrap: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 12, color: '#94a3b8', fontWeight: 500, letterSpacing: 0.5 },
  input: { background: '#111115', border: '1px solid #1e293b', borderRadius: 10, padding: '11px 14px', color: '#fff', fontSize: 14, fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s', width: '100%', boxSizing: 'border-box' as const },
  formNote: { color: '#334155', fontSize: 12, textAlign: 'center', margin: '8px 0 0' },
  trustSignals: { display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20, justifyContent: 'center' },
  trustChip: { fontSize: 11, color: '#64748b', background: '#111115', border: '1px solid #1a1a1a', padding: '4px 10px', borderRadius: 8 },
  whySection: { maxWidth: 1280, margin: '0 auto', padding: '20px 40px 40px' },
  whyHeader: { textAlign: 'center', marginBottom: 48 },
  goldLine: { width: 60, height: 3, background: 'linear-gradient(90deg, transparent, #d4af37, transparent)', margin: '0 auto 20px', borderRadius: 2 },
  whyTitle: { fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 300, color: '#fff', margin: '0 0 12px' },
  whySub: { color: '#64748b', fontSize: 16, margin: 0 },
  whyGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 },
  whyCard: { background: '#0d0d0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: 28, transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s' },
  whyIcon: { fontSize: 36, marginBottom: 16 },
  whyCardTitle: { color: '#fff', fontSize: 17, fontWeight: 600, margin: '0 0 10px' },
  whyCardDesc: { color: '#64748b', fontSize: 14, lineHeight: 1.7, margin: 0 },
  ctaBanner: { maxWidth: 1280, margin: '0 auto 60px', padding: '64px 40px', textAlign: 'center', background: 'linear-gradient(135deg, #111115, #0d0d0f)', border: '1px solid #d4af3730', borderRadius: 24, position: 'relative', overflow: 'hidden' },
  ctaGlow1: { position: 'absolute', top: -80, left: '20%', width: 300, height: 300, background: '#d4af3715', borderRadius: '50%', filter: 'blur(80px)' },
  ctaGlow2: { position: 'absolute', bottom: -80, right: '20%', width: 300, height: 300, background: '#d4af3710', borderRadius: '50%', filter: 'blur(80px)' },
  ctaTitle: { fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 300, color: '#fff', margin: '0 0 16px', position: 'relative', zIndex: 1 },
  ctaDesc: { color: '#64748b', fontSize: 16, margin: '0 0 36px', position: 'relative', zIndex: 1 },
};

/* ─── Global CSS ─── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@300;400;600;700&display=swap');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');

  @keyframes sd-spin    { to { transform: rotate(360deg); } }
  @keyframes sd-pulse   { 0%,100% { box-shadow: 0 0 8px #d4af37; } 50% { box-shadow: 0 0 24px #d4af37, 0 0 48px #d4af3740; } }
  @keyframes sd-tab-in  { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform: translateY(0); } }
  @keyframes sd-float   { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  @keyframes sd-fade-up { from { opacity:0; transform: translateY(24px); } to { opacity:1; transform: translateY(0); } }
  @keyframes sd-reveal  { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }

  .sd-section-reveal { animation: sd-reveal 0.6s ease both; }
  .sd-fade-up   { animation: sd-fade-up 0.7s ease both; }
  .sd-delay-200 { animation-delay: 0.2s; }
  .sd-icon-float { animation: sd-float 4s ease-in-out infinite; }
  .sd-tab-fade  { animation: sd-tab-in 0.3s ease; }

  .sd-hero { --mx: 50%; --my: 50%; }
  .sd-spotlight {
    position: absolute; inset: 0; pointer-events: none; z-index: 1;
    background: radial-gradient(600px circle at var(--mx) var(--my), #d4af370d, transparent 70%);
    transition: background 0.1s;
  }

  .sd-btn-primary {
    display: inline-flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #d4af37, #b8932a);
    color: #000; border: none; border-radius: 10px;
    padding: 13px 28px; font-size: 14px; font-weight: 700;
    cursor: pointer; font-family: inherit; letter-spacing: 0.5px;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 20px #d4af3740; text-decoration: none;
  }
  .sd-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px #d4af3760; }
  .sd-btn-outline {
    display: inline-flex; align-items: center; justify-content: center;
    background: transparent; color: #d4af37;
    border: 1px solid #d4af3760; border-radius: 10px;
    padding: 13px 28px; font-size: 14px; font-weight: 600;
    cursor: pointer; font-family: inherit; letter-spacing: 0.5px;
    transition: background 0.2s, border-color 0.2s; text-decoration: none;
  }
  .sd-btn-outline:hover { background: #d4af3710; border-color: #d4af37; }

  .sd-input:focus { border-color: #d4af37 !important; box-shadow: 0 0 0 3px #d4af3715 !important; }
  .sd-input::placeholder { color: #334155; }

  .sd-doc-card:hover  { border-color: #d4af3750 !important; transform: translateY(-2px); }
  .sd-faq:hover       { border-color: #d4af3530 !important; }
  .sd-why-card:hover  { border-color: #d4af3550 !important; transform: translateY(-4px); box-shadow: 0 20px 40px #00000060; }

  .sd-main-grid {
    display: grid !important;
    grid-template-columns: 1fr 380px;
    gap: 40px;
    align-items: start;
  }

  /* ── TABLET (max 1024px) ── */
  @media (max-width: 1024px) {
    .sd-main-grid { grid-template-columns: 1fr !important; }
  }

  /* ── TABLET (max 768px) ── */
  @media (max-width: 768px) {
    .sd-why-grid   { grid-template-columns: repeat(2,1fr) !important; }
    .sd-docs-grid  { grid-template-columns: 1fr !important; }
    .sd-hero { padding: 40px 20px !important; }
  }

  /* ── MOBILE (max 480px) ── */
  @media (max-width: 480px) {
    .sd-why-grid   { grid-template-columns: 1fr !important; }
    .sd-hero-title { font-size: 32px !important; }
  }

  /* ══════════════════════════════════════
     FULL RESPONSIVE OVERRIDES
  ══════════════════════════════════════ */

  /* ── Large tablet (max 1100px) ── */
  @media (max-width: 1100px) {
    .sd-main-grid { grid-template-columns: 1fr 340px !important; gap: 24px !important; }
  }

  /* ── Tablet (max 900px) ── */
  @media (max-width: 900px) {
    .sd-main-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
    .sd-why-grid  { grid-template-columns: repeat(3, 1fr) !important; }
  }

  /* ── Small tablet / large mobile (max 768px) ── */
  @media (max-width: 768px) {
    /* Breadcrumb */
    .sd-breadcrumb-wrap { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; padding: 14px 16px !important; }

    /* Hero */
    .sd-hero { padding: 28px 16px 32px !important; }
    .sd-hero-inner { flex-direction: column !important; gap: 24px !important; }
    .sd-hero-left { min-width: unset !important; width: 100% !important; }
    .sd-feature-card { width: 100% !important; }
    .sd-meta-row { gap: 16px !important; }
    .sd-hero-ctas { flex-direction: column !important; }
    .sd-btn-primary, .sd-btn-outline { width: 100% !important; justify-content: center !important; }

    /* Main grid */
    .sd-main-grid { padding: 24px 16px !important; }

    /* Tabs */
    .sd-tab-bar { gap: 2px !important; }
    .sd-tab-btn { font-size: 11px !important; padding: 8px 8px !important; }

    /* Docs grid */
    .sd-docs-grid { grid-template-columns: 1fr !important; }

    /* Why grid */
    .sd-why-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
    .sd-why-section { padding: 20px 16px 32px !important; }

    /* CTA Banner */
    .sd-cta-banner { padding: 36px 16px !important; margin: 0 16px 40px !important; border-radius: 16px !important; }
    .sd-cta-btns { flex-direction: column !important; align-items: stretch !important; }
  }

  /* ── Mobile (max 480px) ── */
  @media (max-width: 480px) {
    /* Hero */
    .sd-hero { padding: 20px 12px 24px !important; }
    .sd-icon-wrap { width: 52px !important; height: 52px !important; border-radius: 14px !important; margin-bottom: 14px !important; }
    .sd-hero-badge { font-size: 9px !important; padding: 3px 10px !important; }
    .sd-hero-title { font-size: 26px !important; margin-bottom: 12px !important; }
    .sd-hero-desc { font-size: 13px !important; margin-bottom: 20px !important; }
    .sd-meta-value { font-size: 26px !important; }
    .sd-meta-value2 { font-size: 18px !important; }
    .sd-meta-divider { display: none !important; }
    .sd-meta-row { gap: 12px !important; flex-wrap: wrap !important; }

    /* Feature card */
    .sd-feature-card { padding: 18px !important; border-radius: 14px !important; }

    /* Main grid */
    .sd-main-grid { padding: 16px 12px !important; gap: 24px !important; }

    /* Tabs */
    .sd-tab-btn { font-size: 10px !important; padding: 7px 6px !important; }

    /* Form card */
    .sd-form-card { padding: 18px !important; border-radius: 14px !important; }
    .sd-form-title { font-size: 16px !important; }

    /* Why grid */
    .sd-why-grid { grid-template-columns: 1fr !important; }
    .sd-why-card { padding: 18px !important; }
    .sd-why-icon { font-size: 28px !important; margin-bottom: 10px !important; }
    .sd-why-title-text { font-size: 14px !important; }
    .sd-why-desc-text { font-size: 12px !important; }

    /* CTA */
    .sd-cta-banner { padding: 28px 12px !important; }
    .sd-cta-title { font-size: 22px !important; }
    .sd-cta-desc { font-size: 13px !important; }
  }
`;

export default ServiceDetail;