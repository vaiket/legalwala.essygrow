import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registrationServices } from '../data/servicesData';

const Registration: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const registrationCategories = [
    { id: 'all', name: 'All Registrations', icon: '📋' },
    { id: 'tax', name: 'Tax Registrations', icon: '🧾' },
    { id: 'business', name: 'Business Licenses', icon: '🏢' },
    { id: 'intellectual', name: 'Intellectual Property', icon: '💡' },
    { id: 'certification', name: 'Certifications', icon: '✅' },
  ];

  // FIX: safe filter with lowercase match + fallback
  const filteredServices =
    selectedCategory === 'all'
      ? registrationServices
      : registrationServices.filter(
        (s) => (s.category ?? '').toLowerCase() === selectedCategory
      );

  const displayServices =
    filteredServices.length > 0 ? filteredServices : registrationServices;

  return (
    <>
      <style>{css}</style>
      <div className="rg-page">

        {/* ── HEADER ── */}
        <div className="rg-header">
          <div className="rg-header-orb" />
          <span className="rg-label">Tax & Registration</span>
          <h1 className="rg-title">
            Complete Registration &<br />
            <em>Licensing Solutions</em>
          </h1>
          <p className="rg-sub">
            From GST to trademarks — we handle all your compliance requirements
            so you can focus on running your business.
          </p>

          {/* quick stats */}
          <div className="rg-stats">
            {[
              { n: '15K+', l: 'Registrations Done' },
              { n: '99.2%', l: 'Success Rate' },
              { n: '7 Days', l: 'Avg. Delivery' },
              { n: '₹0', l: 'Hidden Charges' },
            ].map((s, i) => (
              <div key={i} className="rg-stat">
                <span className="rg-stat-n">{s.n}</span>
                <span className="rg-stat-l">{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rg-container">

          {/* ── FILTER TABS ── */}
          <div className="rg-filters">
            {registrationCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rg-filter-btn${selectedCategory === cat.id ? ' rg-filter-active' : ''}`}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>

          {/* ── SERVICES GRID ── */}
          {displayServices.length === 0 ? (
            <div className="rg-empty">
              <span style={{ fontSize: 40 }}>📭</span>
              <p>No services found for this category.</p>
            </div>
          ) : (
            <div className="rg-grid">
              {displayServices.map((service, i) => (
                <div key={service.id ?? i} className="rg-card">
                  {/* top accent bar */}
                  <div className="rg-card-accent" />

                  <div className="rg-card-top">
                    <div className="rg-card-icon">
                      <span className="material-icons" style={{ fontSize: 22, color: '#c5a059' }}>
                        {service.icon}
                      </span>
                    </div>
                    <div className="rg-card-pricing">
                      <span className="rg-price">{service.price}</span>
                      <span className="rg-time">{service.time}</span>
                    </div>
                  </div>

                  <h3 className="rg-card-title">{service.title}</h3>
                  <p className="rg-card-desc">{service.description}</p>

                  {service.features && service.features.length > 0 && (
                    <div className="rg-feature-chips">
                      {service.features.slice(0, 2).map((f, idx) => (
                        <span key={idx} className="rg-chip">{f}</span>
                      ))}
                      {service.features.length > 2 && (
                        <span className="rg-chip rg-chip-more">+{service.features.length - 2} more</span>
                      )}
                    </div>
                  )}

                  <Link to={`/service/${service.id}`} className="rg-cta">
                    Apply Now →
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* ── WHY US ── */}
          <div className="rg-why">
            <div className="rg-why-header">
              <div className="rg-gold-line" />
              <h2 className="rg-why-title">Why Choose LegalVala?</h2>
              <div className="rg-gold-line" />
            </div>
            <div className="rg-why-grid">
              {[
                { icon: '🧑‍💼', title: 'Expert Guidance', desc: 'Qualified CAs and CSs with 5+ years of registration experience.' },
                { icon: '⚡', title: 'Quick Processing', desc: 'Fastest turnaround in the industry — we track every application.' },
                { icon: '💰', title: 'Affordable Pricing', desc: 'All-inclusive flat pricing. Government fees + GST included.' },
                { icon: '💬', title: 'Complete Support', desc: 'End-to-end assistance via call, WhatsApp or email — anytime.' },
                { icon: '💳', title: 'Easy EMI', desc: 'Flexible payment options with easy EMI facilities. Start today and pay in manageable installments.' },
              ].map((w, i) => (
                <div key={i} className="rg-why-card">
                  <div className="rg-why-icon">{w.icon}</div>
                  <h4 className="rg-why-card-title">{w.title}</h4>
                  <p className="rg-why-card-desc">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA BANNER ── */}
          <div className="rg-cta-banner">
            <div className="rg-cta-glow1" />
            <div className="rg-cta-glow2" />
            <h2 className="rg-cta-title">Need Help with Registration?</h2>
            <p className="rg-cta-sub">
              Our experts are here to guide you through the entire process.
              Get started today with a free 30-minute consultation.
            </p>
            <div className="rg-cta-btns">
              <Link to="/appointment" className="rg-btn-gold">Get Started Free →</Link>
              <a href="tel:+91 9286495921" className="rg-btn-ghost">📞 Free Consultation</a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,600;12..96,700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.rg-page { min-height:100vh; background:#080809; color:#fff; font-family:'Bricolage Grotesque',sans-serif; padding-bottom:40px; }

/* header */
.rg-header {
  position:relative; overflow:hidden; text-align:center;
  padding:140px 24px 40px;
  background:linear-gradient(180deg,#0d0d0f 0%,#080809 100%);
  border-bottom:1px solid #1a1a1a;
}
.rg-header-orb {
  position:absolute; top:-140px; left:50%; transform:translateX(-50%);
  width:700px; height:500px; border-radius:50%;
  background:radial-gradient(ellipse,rgba(197,160,89,0.07) 0%,transparent 70%);
  filter:blur(80px); pointer-events:none;
}
.rg-label {
  display:inline-block; font-size:10px; font-weight:700; letter-spacing:3px;
  text-transform:uppercase; color:#c5a059;
  background:rgba(197,160,89,0.1); border:1px solid rgba(197,160,89,0.25);
  padding:5px 16px; border-radius:100px; margin-bottom:24px;
}
.rg-title {
  font-size:clamp(36px,5.5vw,68px); font-weight:300;
  letter-spacing:-0.03em; line-height:1.08; color:#fff; margin:0 0 20px;
}
.rg-title em { font-style:italic; color:#c5a059; }
.rg-sub { color:#64748b; font-size:16px; line-height:1.8; max-width:520px; margin:0 auto 40px; }

.rg-stats {
  display:inline-flex; gap:0;
  border:1px solid #1a1a1a; border-radius:14px; overflow:hidden;
  background:#0d0d0f;
}
.rg-stat {
  padding:16px 28px; display:flex; flex-direction:column; align-items:center; gap:3px;
  border-right:1px solid #1a1a1a;
}
.rg-stat:last-child { border-right:none; }
.rg-stat-n { font-size:22px; font-weight:700; color:#c5a059; }
.rg-stat-l { font-size:10px; color:#4b5563; letter-spacing:1px; text-transform:uppercase; }

/* container */
.rg-container { max-width:1280px; margin:0 auto; padding:40px 40px; }

/* filters */
.rg-filters { display:flex; flex-wrap:wrap; justify-content:center; gap:10px; margin-bottom:48px; }
.rg-filter-btn {
  display:inline-flex; align-items:center; gap:8px;
  padding:10px 20px; border-radius:10px; border:1px solid #1e293b;
  background:#0d0d0f; color:#64748b; font-size:13px; font-weight:600;
  cursor:pointer; font-family:inherit; transition:all 0.2s;
}
.rg-filter-btn:hover { border-color:rgba(197,160,89,0.4); color:#c5a059; }
.rg-filter-active { background:linear-gradient(135deg,#c5a059,#a07830) !important; color:#000 !important; border-color:transparent !important; box-shadow:0 4px 20px rgba(197,160,89,0.35); }

/* empty */
.rg-empty { text-align:center; padding:80px 20px; color:#4b5563; display:flex; flex-direction:column; align-items:center; gap:12px; }

/* grid — 3 col */
.rg-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-bottom:60px; }

/* card */
.rg-card {
  background:#0d0d0f; border:1px solid #1a1a1a; border-radius:18px;
  padding:24px; display:flex; flex-direction:column;
  position:relative; overflow:hidden;
  transition:border-color 0.25s, transform 0.25s, box-shadow 0.25s;
}
.rg-card:hover { border-color:rgba(197,160,89,0.35); transform:translateY(-5px); box-shadow:0 20px 50px rgba(0,0,0,0.5); }
.rg-card-accent {
  position:absolute; top:0; left:0; right:0; height:2px;
  background:linear-gradient(90deg,transparent,rgba(197,160,89,0.6),transparent);
  opacity:0; transition:opacity 0.3s;
}
.rg-card:hover .rg-card-accent { opacity:1; }

.rg-card-top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px; }
.rg-card-icon {
  width:44px; height:44px; border-radius:12px;
  background:linear-gradient(135deg,#1a1500,#2a2000);
  border:1px solid rgba(197,160,89,0.25);
  display:flex; align-items:center; justify-content:center;
}
.rg-card-pricing { text-align:right; }
.rg-price { display:block; font-size:20px; font-weight:700; color:#c5a059; line-height:1; }
.rg-time { font-size:10px; color:#4b5563; margin-top:3px; display:block; }

.rg-card-title { font-size:17px; font-weight:600; color:#fff; margin:0 0 8px; }
.rg-card-desc { font-size:13px; color:#64748b; line-height:1.7; margin:0 0 16px; flex-grow:1; }

.rg-feature-chips { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:18px; }
.rg-chip {
  font-size:11px; color:#94a3b8;
  background:#111115; border:1px solid #1e293b;
  padding:3px 10px; border-radius:8px;
}
.rg-chip-more { color:#c5a05980; border-color:rgba(197,160,89,0.2); }

.rg-cta {
  display:block; text-align:center; margin-top:auto;
  background:transparent; border:1px solid rgba(197,160,89,0.45); color:#c5a059;
  font-size:12px; font-weight:700; letter-spacing:0.5px;
  padding:12px; border-radius:10px; text-decoration:none;
  transition:background 0.2s, color 0.2s;
}
.rg-cta:hover { background:linear-gradient(135deg,#c5a059,#a07830); color:#000; }

/* why us */
.rg-why { margin-bottom:60px; }
.rg-why-header { display:flex; align-items:center; justify-content:center; gap:20px; margin-bottom:36px; }
.rg-gold-line { height:1px; flex:0 0 60px; background:linear-gradient(90deg,transparent,rgba(197,160,89,0.5),transparent); }
.rg-why-title { font-size:28px; font-weight:300; color:#fff; white-space:nowrap; }
.rg-why-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:16px; }
.rg-why-card {
  background:#0d0d0f; border:1px solid #1a1a1a; border-radius:16px; padding:24px;
  text-align:center; transition:border-color 0.25s, transform 0.25s;
}
.rg-why-card:hover { border-color:rgba(197,160,89,0.35); transform:translateY(-4px); }
.rg-why-icon { font-size:30px; margin-bottom:12px; }
.rg-why-card-title { font-size:15px; font-weight:600; color:#fff; margin:0 0 8px; }
.rg-why-card-desc { font-size:12px; color:#64748b; line-height:1.7; margin:0; }

/* cta banner */
.rg-cta-banner {
  position:relative; overflow:hidden; text-align:center;
  background:linear-gradient(135deg,#0d0d0f,#111115);
  border:1px solid rgba(197,160,89,0.2); border-radius:24px; padding:64px 40px;
}
.rg-cta-glow1 { position:absolute; top:-80px; left:20%; width:400px; height:300px; background:radial-gradient(ellipse,rgba(197,160,89,0.1) 0%,transparent 70%); filter:blur(60px); pointer-events:none; }
.rg-cta-glow2 { position:absolute; bottom:-80px; right:20%; width:300px; height:300px; background:radial-gradient(ellipse,rgba(197,160,89,0.06) 0%,transparent 70%); filter:blur(60px); pointer-events:none; }
.rg-cta-title { position:relative; z-index:1; font-size:clamp(26px,4vw,42px); font-weight:300; color:#fff; margin:0 0 14px; }
.rg-cta-sub { position:relative; z-index:1; color:#64748b; font-size:15px; line-height:1.8; max-width:500px; margin:0 auto 32px; }
.rg-cta-btns { position:relative; z-index:1; display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
.rg-btn-gold {
  display:inline-flex; align-items:center;
  background:linear-gradient(135deg,#c5a059,#a07830); color:#000;
  font-size:13px; font-weight:700; letter-spacing:1px; text-transform:uppercase;
  padding:14px 32px; border-radius:10px; text-decoration:none;
  box-shadow:0 4px 24px rgba(197,160,89,0.4); transition:transform 0.2s, box-shadow 0.2s;
}
.rg-btn-gold:hover { transform:translateY(-3px); box-shadow:0 10px 40px rgba(197,160,89,0.5); }
.rg-btn-ghost {
  display:inline-flex; align-items:center;
  background:transparent; border:1px solid #1e293b; color:#e2e8f0;
  font-size:13px; font-weight:600; letter-spacing:1px; text-transform:uppercase;
  padding:14px 32px; border-radius:10px; text-decoration:none;
  transition:border-color 0.2s, transform 0.2s;
}
.rg-btn-ghost:hover { border-color:rgba(197,160,89,0.4); transform:translateY(-2px); }

/* responsive */
@media (max-width:1024px) {
  .rg-grid { grid-template-columns:repeat(2,1fr); }
  .rg-why-grid { grid-template-columns:repeat(2,1fr); }
}
@media (max-width:600px) {
  .rg-container { padding:40px 20px; }
  .rg-grid { grid-template-columns:1fr; }
  .rg-why-grid { grid-template-columns:1fr; }
  .rg-stats { flex-wrap:wrap; }
  .rg-stat { min-width:50%; border-bottom:1px solid #1a1a1a; }
  .rg-cta-banner { padding:40px 20px; }
}
`;

export default Registration;