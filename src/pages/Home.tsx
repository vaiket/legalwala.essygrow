import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import TestimonialsSection from '../components/TestimonialsSection';
import HeroSection from '../components/HeroSection';

/* ── intersection observer hook ── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── animated counter ── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const { ref, visible } = useInView();
  useEffect(() => {
    if (!visible) return;
    let cur = 0;
    const step = Math.ceil(target / 50);
    const t = setInterval(() => {
      cur += step; if (cur >= target) { setV(target); clearInterval(t); } else setV(cur);
    }, 20);
    return () => clearInterval(t);
  }, [visible, target]);
  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>;
}

const Home: React.FC = () => {
  const servicesSection = useInView();
  const whySection = useInView();
  const processSection = useInView();
  const ctaSection = useInView();

  const mainServices = [
    {
      title: 'Start a Business',
      icon: 'business_center',
      emoji: '🏢',
      desc: 'Private Limited Company, LLP, Partnership Firm, OPC & Nidhi Company Registration.',
      link: '/start-business',
      tag: 'Most Popular',
      color: '#c5a059',
    },
    {
      title: 'Tax & Registration',
      icon: 'receipt_long',
      emoji: '📋',
      desc: 'GST Registration, Trademark, FSSAI Food License, Import Export Code, ISO Certification.',
      link: '/registration',
      tag: 'High Demand',
      color: '#60a5fa',
    },
    {
      title: 'Manage Business',
      icon: 'insights',
      emoji: '📊',
      desc: 'Accounting, Bookkeeping, Project Reports, MCA Annual Filings & Audit Compliance.',
      link: '/manage-business',
      tag: 'Compliance',
      color: '#34d399',
    },
    {
      title: 'Legal Documents',
      icon: 'description',
      emoji: '📝',
      desc: 'Drafting agreements, NDAs, employee contracts, terms of service & SHAs.',
      link: '/document',
      tag: 'Advisory',
      color: '#f472b6',
    },
  ];

  const process = [
    { step: '01', title: 'Consultation', desc: 'Book a free expert call. We understand your business needs and chart the fastest legal path forward.', icon: '💬' },
    { step: '02', title: 'Documentation', desc: 'Our team prepares and verifies every document. You just upload — we handle the complexity.', icon: '📁' },
    { step: '03', title: 'Filing & Processing', desc: 'We file directly with the government authority and track status in real time on your behalf.', icon: '⚡' },
    { step: '04', title: 'Certificate Delivery', desc: 'Your registration certificate and legal documents are delivered digitally within the committed timeline.', icon: '🎯' },
  ];

  const expertise = [
    { label: 'CA & CS Team', icon: '⚖️', desc: 'Qualified Chartered Accountants and Company Secretaries with 10+ years.' },
    { label: 'Zero Hidden Fees', icon: '💰', desc: 'Flat pricing — government fees, professional charges and GST all included.' },
    { label: 'Dedicated Manager', icon: '👤', desc: 'A single point of contact assigned to your account for the whole journey.' },
    { label: 'Govt. Registered', icon: '🏛️', desc: 'Officially registered firm, fully authorised to file with MCA, GSTN & Trademark Registry.' },
    { label: 'Secure & Private', icon: '🔒', desc: '256-bit encryption. Your documents are never shared or sold to third parties.' },
    { label: 'On-Time Guarantee', icon: '⏱️', desc: 'We commit to timelines. Delays happen on government side — never on ours.' },
  ];

  return (
    <>
      <style>{homeCSS}</style>
      <HeroSection />

      {/* ══ SERVICES SECTION ══════════════════════════════════════════ */}
      <section className="hp-section hp-services-bg">
        {/* subtle dot grid */}
        <div className="hp-dot-grid" />

        <div
          ref={servicesSection.ref}
          className={`hp-container ${servicesSection.visible ? 'hp-visible' : 'hp-hidden'}`}
        >
          {/* section label */}
          <div className="hp-section-label">
            <span className="hp-label-line" />
            <span className="hp-label-text">Core Services</span>
            <span className="hp-label-line" />
          </div>

          <div className="hp-section-head">
            <h2 className="hp-section-title">Our Expertise<br /><em>At a Glance</em></h2>
            <p className="hp-section-sub">
              From registration to compliance — every service your business needs,
              handled by certified experts.
            </p>
          </div>

          <div className="hp-services-grid">
            {mainServices.map((s, i) => (
              <Link key={i} to={s.link} className="hp-service-card" style={{ '--card-color': s.color } as React.CSSProperties}>
                {/* top accent */}
                <div className="hp-card-accent" />

                {/* tag */}
                <span className="hp-card-tag">{s.tag}</span>

                {/* emoji icon */}
                <div className="hp-card-emoji">{s.emoji}</div>

                <h3 className="hp-card-title">{s.title}</h3>
                <p className="hp-card-desc">{s.desc}</p>

                <div className="hp-card-footer">
                  <span className="hp-card-cta">
                    Learn more
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>

                {/* hover glow */}
                <div className="hp-card-glow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US ══════════════════════════════════════════════ */}
      <section className="hp-section hp-why-bg">
        <div className="hp-why-orb1" />
        <div className="hp-why-orb2" />

        <div
          ref={whySection.ref}
          className={`hp-container ${whySection.visible ? 'hp-visible' : 'hp-hidden'}`}
        >
          <div className="hp-why-inner">
            {/* LEFT */}
            <div className="hp-why-left">
              <div className="hp-section-label hp-label-left">
                <span className="hp-label-line" />
                <span className="hp-label-text">Compliance Guarantee</span>
              </div>
              <h2 className="hp-why-title">
                Avoid Penalties.<br />
                <span style={{ color: '#c5a059' }}>Stay Compliant.</span>
              </h2>
              <p className="hp-why-desc">
                We bring together wide-ranging expertise in Indian taxation and compliance.
                At LegalVala, we provide end-to-end tax planning, financial services, and key
                legal business solutions — so you never have to worry about compliance again.
              </p>

              {/* achievement badges */}
              <div className="hp-achievements">
                <div className="hp-achievement">
                  <div className="hp-ach-icon">🏆</div>
                  <div>
                    <div className="hp-ach-title">Best Business Advisory Firm</div>
                    <div className="hp-ach-sub">Recognized by CII — Gujarat Chapter, 2023</div>
                  </div>
                </div>
                <div className="hp-achievement">
                  <div className="hp-ach-icon">✅</div>
                  <div>
                    <div className="hp-ach-title">100% Quality Assured Filings</div>
                    <div className="hp-ach-sub">Zero errors — backed by our 4-step review process</div>
                  </div>
                </div>
                <div className="hp-achievement">
                  <div className="hp-ach-icon">📜</div>
                  <div>
                    <div className="hp-ach-title">ISO 9001:2015 Certified Firm</div>
                    <div className="hp-ach-sub">Quality management system certified</div>
                  </div>
                </div>
              </div>

              <Link to="/about-us" className="hp-btn-white">
                Discover Our Firm →
              </Link>
            </div>

            {/* RIGHT — expertise grid */}
            <div className="hp-expertise-grid">
              {expertise.map((e, i) => (
                <div key={i} className="hp-exp-card">
                  <div className="hp-exp-icon">{e.icon}</div>
                  <div className="hp-exp-label">{e.label}</div>
                  <div className="hp-exp-desc">{e.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROCESS SECTION ═══════════════════════════════════════════ */}
      <section className="hp-section hp-process-bg">
        <div className="hp-process-line-bg" />

        <div
          ref={processSection.ref}
          className={`hp-container ${processSection.visible ? 'hp-visible' : 'hp-hidden'}`}
        >
          <div className="hp-section-label">
            <span className="hp-label-line" />
            <span className="hp-label-text">How It Works</span>
            <span className="hp-label-line" />
          </div>

          <div className="hp-section-head">
            <h2 className="hp-section-title">From Inquiry to<br /><em>Completion</em></h2>
          </div>

          <div className="hp-process-grid">
            {process.map((p, i) => (
              <div key={i} className="hp-process-card">
                <div className="hp-process-step">{p.step}</div>
                <div className="hp-process-icon">{p.icon}</div>
                <h4 className="hp-process-title">{p.title}</h4>
                <p className="hp-process-desc">{p.desc}</p>
                {i < process.length - 1 && <div className="hp-process-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ NUMBERS STRIP ══════════════════════════════════════════════ */}
      <div className="hp-numbers-strip">
        {[
          { n: 15000, s: '+', l: 'Clients Served' },
          { n: 5000, s: '+', l: 'Services Delivered' },
          { n: 500, s: 'Cr+', l: 'Tax Filed' },
          { n: 99, s: '.2%', l: 'Success Rate' },
          { n: 150, s: '+', l: 'Cities Covered' },
        ].map((s, i) => (
          <div key={i} className="hp-num-item">
            <div className="hp-num-val">
              <Counter target={s.n} suffix={s.s} />
            </div>
            <div className="hp-num-lbl">{s.l}</div>
          </div>
        ))}
      </div>

      {/* ══ CTA SECTION ════════════════════════════════════════════════ */}
      <section className="hp-section" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <div
          ref={ctaSection.ref}
          className={`hp-container ${ctaSection.visible ? 'hp-visible' : 'hp-hidden'}`}
        >
          <div className="hp-cta-banner">
            <div className="hp-cta-glow1" />
            <div className="hp-cta-glow2" />
            <div className="hp-cta-inner">
              <div className="hp-cta-badge">Free Consultation Available</div>
              <h2 className="hp-cta-title">Ready to Simplify Your Compliance?</h2>
              <p className="hp-cta-sub">
                Book a free 30-minute call with our expert CA team. No commitment required.
              </p>
              <div className="hp-cta-btns">
                <Link to="/appointment" className="hp-btn-gold">
                  Book Free Consultation →
                </Link>
                <a href="tel:+91 9286495921" className="hp-btn-ghost">
                  📞 Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials — untouched */}
      <TestimonialsSection />
    </>
  );
};

export default Home;

/* ════════════════ CSS ════════════════ */
const homeCSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,600;12..96,700&display=swap');

/* ── shared layout ── */
.hp-section {
  position: relative; overflow: hidden;
  padding: 100px 0;
}
.hp-container {
  max-width: 1280px; margin: 0 auto; padding: 0 40px;
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.hp-hidden { opacity: 0; transform: translateY(36px); }
.hp-visible { opacity: 1; transform: translateY(0); }

/* ── section labels ── */
.hp-section-label {
  display: flex; align-items: center; justify-content: center; gap: 16px;
  margin-bottom: 20px;
}
.hp-label-left { justify-content: flex-start; }
.hp-label-line {
  height: 1px; flex: 0 0 40px;
  background: linear-gradient(90deg, transparent, rgba(197,160,89,0.5), transparent);
}
.hp-label-text {
  font-size: 10px; font-weight: 700; letter-spacing: 3px;
  text-transform: uppercase; color: #c5a059;
}
.hp-section-head { text-align: center; margin-bottom: 60px; }
.hp-section-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(32px, 4.5vw, 56px);
  font-weight: 300; color: #fff; margin: 0 0 16px;
  line-height: 1.1; letter-spacing: -0.02em;
}
.hp-section-title em { font-style: italic; color: #c5a059; }
.hp-section-sub {
  color: #64748b; font-size: 16px; max-width: 480px; margin: 0 auto;
  line-height: 1.75;
}

/* ── SERVICES ── */
.hp-services-bg { background: #080809; }
.hp-dot-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image: radial-gradient(rgba(197,160,89,0.06) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
}

.hp-services-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
}

.hp-service-card {
  position: relative; overflow: hidden;
  background: #0d0d0f;
  border: 1px solid #1a1a1a;
  border-radius: 20px; padding: 32px 24px;
  text-decoration: none;
  display: flex; flex-direction: column;
  transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
}
.hp-service-card:hover {
  border-color: var(--card-color, #c5a059);
  transform: translateY(-6px);
  box-shadow: 0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(197,160,89,0.1);
}
.hp-card-accent {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, var(--card-color, #c5a059), transparent);
  opacity: 0; transition: opacity 0.3s;
}
.hp-service-card:hover .hp-card-accent { opacity: 1; }
.hp-card-tag {
  font-size: 9px; font-weight: 700; letter-spacing: 1.5px;
  text-transform: uppercase; color: var(--card-color, #c5a059);
  background: color-mix(in srgb, var(--card-color, #c5a059) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--card-color, #c5a059) 30%, transparent);
  padding: 3px 8px; border-radius: 6px;
  display: inline-block; margin-bottom: 20px; width: fit-content;
}
.hp-card-emoji { font-size: 36px; margin-bottom: 16px; }
.hp-card-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 18px; font-weight: 600; color: #fff;
  margin: 0 0 10px; letter-spacing: -0.02em;
}
.hp-card-desc {
  color: #64748b; font-size: 13px; line-height: 1.75;
  margin: 0; flex-grow: 1;
}
.hp-card-footer { margin-top: 24px; }
.hp-card-cta {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 12px; font-weight: 600; color: #94a3b8;
  transition: color 0.2s; letter-spacing: 0.5px;
}
.hp-service-card:hover .hp-card-cta { color: var(--card-color, #c5a059); }
.hp-card-glow {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(400px circle at 50% 120%, color-mix(in srgb, var(--card-color, #c5a059) 8%, transparent), transparent);
  opacity: 0; transition: opacity 0.4s;
}
.hp-service-card:hover .hp-card-glow { opacity: 1; }

/* ── WHY US ── */
.hp-why-bg {
  background: #0a0a0b;
  border-top: 1px solid #1a1a1a;
  border-bottom: 1px solid #1a1a1a;
}
.hp-why-orb1 {
  position: absolute; top: -100px; right: -100px;
  width: 500px; height: 500px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(197,160,89,0.05) 0%, transparent 70%);
  filter: blur(60px); pointer-events: none;
}
.hp-why-orb2 {
  position: absolute; bottom: -80px; left: -80px;
  width: 400px; height: 400px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(96,165,250,0.03) 0%, transparent 70%);
  filter: blur(60px); pointer-events: none;
}
.hp-why-inner {
  display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start;
}
.hp-why-left {}
.hp-why-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(32px, 4vw, 52px); font-weight: 300;
  color: #fff; line-height: 1.15; letter-spacing: -0.02em;
  margin: 12px 0 20px;
}
.hp-why-desc {
  color: #64748b; font-size: 15px; line-height: 1.8;
  margin: 0 0 32px; max-width: 440px;
}
.hp-achievements { display: flex; flex-direction: column; gap: 12px; margin-bottom: 36px; }
.hp-achievement {
  display: flex; align-items: flex-start; gap: 14px;
  background: #0d0d0f; border: 1px solid #1a1a1a;
  border-radius: 14px; padding: 16px 18px;
  transition: border-color 0.2s;
}
.hp-achievement:hover { border-color: rgba(197,160,89,0.3); }
.hp-ach-icon { font-size: 22px; margin-top: 1px; }
.hp-ach-title { color: #e2e8f0; font-size: 14px; font-weight: 600; margin-bottom: 2px; }
.hp-ach-sub { color: #4b5563; font-size: 11px; letter-spacing: 0.5px; }
.hp-btn-white {
  display: inline-flex; align-items: center;
  background: #fff; color: #000;
  font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
  padding: 14px 28px; border-radius: 10px;
  text-decoration: none; transition: background 0.2s, transform 0.2s;
}
.hp-btn-white:hover { background: #f1f5f9; transform: translateY(-2px); }

/* expertise grid */
.hp-expertise-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
}
.hp-exp-card {
  background: #0d0d0f; border: 1px solid #1a1a1a;
  border-radius: 16px; padding: 22px;
  transition: border-color 0.25s, transform 0.25s;
}
.hp-exp-card:hover { border-color: rgba(197,160,89,0.35); transform: translateY(-3px); }
.hp-exp-icon { font-size: 26px; margin-bottom: 10px; }
.hp-exp-label { color: #e2e8f0; font-size: 14px; font-weight: 600; margin-bottom: 6px; }
.hp-exp-desc { color: #4b5563; font-size: 12px; line-height: 1.7; }

/* ── PROCESS ── */
.hp-process-bg { background: #060607; }
.hp-process-line-bg {
  position: absolute; top: 50%; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(197,160,89,0.1) 20%, rgba(197,160,89,0.1) 80%, transparent);
  transform: translateY(-50%); pointer-events: none;
}
.hp-process-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; position: relative;
}
.hp-process-card {
  position: relative;
  background: #0d0d0f; border: 1px solid #1a1a1a;
  border-radius: 20px; padding: 28px 22px;
  transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
}
.hp-process-card:hover {
  border-color: rgba(197,160,89,0.4); transform: translateY(-5px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
}
.hp-process-step {
  font-size: 11px; font-weight: 700; letter-spacing: 2px;
  color: rgba(197,160,89,0.5); margin-bottom: 14px;
}
.hp-process-icon { font-size: 32px; margin-bottom: 14px; }
.hp-process-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  color: #fff; font-size: 17px; font-weight: 600; margin: 0 0 8px;
}
.hp-process-desc { color: #64748b; font-size: 13px; line-height: 1.7; margin: 0; }
.hp-process-arrow {
  position: absolute; top: 50%; right: -20px;
  transform: translateY(-50%);
  color: rgba(197,160,89,0.3); font-size: 22px; z-index: 2;
}

/* ── NUMBERS STRIP ── */
.hp-numbers-strip {
  display: flex; justify-content: stretch;
  background: #0d0d0f;
  border-top: 1px solid #1a1a1a; border-bottom: 1px solid #1a1a1a;
}
.hp-num-item {
  flex: 1; padding: 32px 20px;
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  border-right: none;
  transition: background 0.2s;
}
.hp-num-item:last-child { border-right: none; }
.hp-num-item:hover { background: rgba(197,160,89,0.03); }
.hp-num-val {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(24px, 3vw, 36px); font-weight: 700; color: #c5a059;
}
.hp-num-lbl { font-size: 10px; color: #4b5563; text-transform: uppercase; letter-spacing: 1.5px; }

/* ── CTA BANNER ── */
.hp-cta-banner {
  position: relative; overflow: hidden;
  background: linear-gradient(135deg, #0d0d0f 0%, #111115 100%);
  border: 1px solid rgba(197,160,89,0.25);
  border-radius: 28px; padding: 72px 48px; text-align: center;
}
.hp-cta-glow1 {
  position: absolute; top: -60px; left: 20%; width: 400px; height: 300px;
  background: radial-gradient(ellipse, rgba(197,160,89,0.12) 0%, transparent 70%);
  filter: blur(60px); pointer-events: none;
}
.hp-cta-glow2 {
  position: absolute; bottom: -60px; right: 20%; width: 300px; height: 300px;
  background: radial-gradient(ellipse, rgba(197,160,89,0.07) 0%, transparent 70%);
  filter: blur(60px); pointer-events: none;
}
.hp-cta-inner { position: relative; z-index: 2; }
.hp-cta-badge {
  display: inline-flex; align-items: center;
  background: rgba(197,160,89,0.1); border: 1px solid rgba(197,160,89,0.3);
  color: #c5a059; font-size: 10px; font-weight: 700; letter-spacing: 2px;
  text-transform: uppercase; padding: 5px 14px; border-radius: 100px;
  margin-bottom: 24px;
}
.hp-cta-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(28px, 4vw, 48px); font-weight: 300;
  color: #fff; margin: 0 0 16px; letter-spacing: -0.02em;
}
.hp-cta-sub { color: #64748b; font-size: 16px; margin: 0 0 36px; }
.hp-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
.hp-btn-gold {
  display: inline-flex; align-items: center;
  background: linear-gradient(135deg, #c5a059, #a07830);
  color: #000; font-size: 13px; font-weight: 700;
  letter-spacing: 1px; text-transform: uppercase;
  padding: 15px 32px; border-radius: 10px;
  text-decoration: none;
  box-shadow: 0 4px 24px rgba(197,160,89,0.4);
  transition: transform 0.2s, box-shadow 0.2s;
}
.hp-btn-gold:hover { transform: translateY(-3px); box-shadow: 0 10px 40px rgba(197,160,89,0.5); }
.hp-btn-ghost {
  display: inline-flex; align-items: center;
  background: transparent; border: 1px solid #1e293b;
  color: #e2e8f0; font-size: 13px; font-weight: 600;
  letter-spacing: 1px; text-transform: uppercase;
  padding: 15px 32px; border-radius: 10px;
  text-decoration: none; transition: border-color 0.2s, transform 0.2s;
}
.hp-btn-ghost:hover { border-color: rgba(197,160,89,0.4); transform: translateY(-2px); }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .hp-services-grid { grid-template-columns: repeat(2, 1fr); }
  .hp-process-grid { grid-template-columns: repeat(2, 1fr); }
  .hp-why-inner { grid-template-columns: 1fr; gap: 48px; }
  .hp-process-arrow { display: none; }
}

/* ── TABLET (641px – 1024px) ── */
@media (max-width: 1024px) and (min-width: 641px) {
  .hp-section { padding: 60px 0; }
  .hp-section-head { margin-bottom: 36px; }
  .hp-expertise-grid { grid-template-columns: repeat(3, 1fr); }
  .hp-achievements { gap: 8px; }
  .hp-achievement { padding: 12px 14px; }
}

/* ── MOBILE (max 640px) ── */
@media (max-width: 640px) {

  /* Layout */
  .hp-section { padding: 40px 0; }
  .hp-container { padding: 0 16px; }
  .hp-section-head { margin-bottom: 24px; }
  .hp-section-label { margin-bottom: 12px; }

  /* Section title smaller */
  .hp-section-title { font-size: 26px; margin-bottom: 10px; }
  .hp-section-sub { font-size: 13px; }

  /* ── Services: 2 columns compact ── */
  .hp-services-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  .hp-service-card {
    padding: 16px 14px;
    border-radius: 14px;
  }
  .hp-card-tag { font-size: 8px; padding: 2px 6px; margin-bottom: 10px; }
  .hp-card-emoji { font-size: 26px; margin-bottom: 8px; }
  .hp-card-title { font-size: 14px; margin-bottom: 6px; }
  .hp-card-desc { font-size: 11px; line-height: 1.5; }
  .hp-card-footer { margin-top: 12px; }
  .hp-card-cta { font-size: 11px; }

  /* ── Why Us ── */
  .hp-why-inner { grid-template-columns: 1fr; gap: 24px; }
  .hp-why-title { font-size: 24px; margin: 8px 0 12px; }
  .hp-why-desc { font-size: 13px; margin-bottom: 20px; }
  .hp-achievements { gap: 8px; margin-bottom: 20px; }
  .hp-achievement { padding: 10px 12px; gap: 10px; border-radius: 10px; }
  .hp-ach-icon { font-size: 18px; }
  .hp-ach-title { font-size: 12px; }
  .hp-ach-sub { font-size: 10px; }
  .hp-btn-white { font-size: 11px; padding: 11px 20px; }

  /* ── Expertise: 2 columns compact ── */
  .hp-expertise-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
  .hp-exp-card { padding: 14px 12px; border-radius: 12px; }
  .hp-exp-icon { font-size: 20px; margin-bottom: 6px; }
  .hp-exp-label { font-size: 12px; margin-bottom: 4px; }
  .hp-exp-desc { font-size: 10px; line-height: 1.5; }

  /* ── Process: 2 columns compact ── */
  .hp-process-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  .hp-process-card { padding: 16px 14px; border-radius: 14px; }
  .hp-process-step { font-size: 10px; margin-bottom: 8px; }
  .hp-process-icon { font-size: 24px; margin-bottom: 8px; }
  .hp-process-title { font-size: 14px; margin-bottom: 6px; }
  .hp-process-desc { font-size: 11px; line-height: 1.5; }
  .hp-process-arrow { display: none; }

  /* ── Numbers strip: 3 in a row ── */
  .hp-numbers-strip { flex-wrap: wrap; }
  .hp-num-item {
    flex: 0 0 33.33%;
    padding: 16px 8px;
    border-bottom: 1px solid #1a1a1a;
  }
  .hp-num-val { font-size: 20px; }
  .hp-num-lbl { font-size: 9px; letter-spacing: 0.5px; }

  /* ── CTA Banner ── */
  .hp-cta-banner { padding: 28px 16px; border-radius: 16px; }
  .hp-cta-badge { font-size: 9px; padding: 4px 10px; margin-bottom: 14px; }
  .hp-cta-title { font-size: 22px; margin-bottom: 10px; }
  .hp-cta-sub { font-size: 13px; margin-bottom: 20px; }
  .hp-cta-btns { gap: 10px; flex-direction: column; align-items: stretch; }
  .hp-btn-gold { font-size: 12px; padding: 13px 20px; justify-content: center; }
  .hp-btn-ghost { font-size: 12px; padding: 13px 20px; justify-content: center; }
}
`;