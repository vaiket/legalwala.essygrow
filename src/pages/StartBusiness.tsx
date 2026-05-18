import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { businessServices } from '../data/servicesData';

const StartBusiness: React.FC = () => {
  const [selectedBusinessType, setSelectedBusinessType] = useState('all');

  const businessTypes = [
    { id: 'all', name: 'All Business Types', icon: '🏢' },
    { id: 'company', name: 'Company', icon: '🏛️' },
    { id: 'partnership', name: 'Partnership', icon: '🤝' },
    // { id: 'llp', name: 'LLP', icon: '👥' },
    { id: 'other', name: 'Other Entities', icon: '🔖' },
  ];

  // FIX: safe filter — if category missing on service, show in 'all' only
  const filteredServices =
    selectedBusinessType === 'all'
      ? businessServices
      : businessServices.filter(
        (s) => (s.category ?? '').toLowerCase() === selectedBusinessType
      );

  // FIX: fallback so grid is never fully blank
  const displayServices =
    filteredServices.length > 0 ? filteredServices : businessServices;

  return (
    <>
      <style>{css}</style>
      <div className="sb-page">

        {/* ── HEADER ── */}
        <div className="sb-header">
          <div className="sb-header-orb" />
          <span className="sb-label">Start a Business</span>
          <h1 className="sb-title">
            Choose the Right<br />
            <em>Business Structure</em>
          </h1>
          <p className="sb-sub">
            We provide complete business registration services with expert CA & CS guidance —
            from consultation to your certificate in hand.
          </p>
        </div>

        <div className="sb-container">

          {/* ── FILTER TABS ── */}
          <div className="sb-filters">
            {businessTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedBusinessType(type.id)}
                className={`sb-filter-btn${selectedBusinessType === type.id ? ' sb-filter-active' : ''}`}
              >
                <span>{type.icon}</span>
                {type.name}
              </button>
            ))}
          </div>

          {/* ── SERVICES GRID ── */}
          {displayServices.length === 0 ? (
            <div className="sb-empty">
              <span style={{ fontSize: 40 }}>📭</span>
              <p>No services found for this category.</p>
            </div>
          ) : (
            <div className="sb-grid">
              {displayServices.map((service, i) => (
                <div key={service.id ?? i} className="sb-card">
                  <div className="sb-card-top">
                    <div className="sb-card-icon">
                      <span className="material-icons" style={{ fontSize: 26, color: '#c5a059' }}>
                        {service.icon}
                      </span>
                    </div>
                    <div className="sb-card-pricing">
                      <span className="sb-price">{service.price}</span>
                      <span className="sb-time">{service.time}</span>
                    </div>
                  </div>

                  <h3 className="sb-card-title">{service.title}</h3>
                  <p className="sb-card-desc">{service.description}</p>

                  {service.features && service.features.length > 0 && (
                    <div className="sb-features">
                      <span className="sb-features-label">Key Features</span>
                      <ul className="sb-feature-list">
                        {service.features.map((f, idx) => (
                          <li key={idx} className="sb-feature-item">
                            <span className="sb-check">✦</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Link to={`/service/${service.id}`} className="sb-cta">
                    Get Started →
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* ── PROCESS STRIP ── */}
          <div className="sb-process">
            <div className="sb-process-header">
              <div className="sb-gold-line" />
              <h2 className="sb-process-title">Our Registration Process</h2>
              <div className="sb-gold-line" />
            </div>
            <div className="sb-process-grid">
              {[
                { n: '01', title: 'Consultation', desc: 'Expert call to choose the right business structure for your goals.', icon: '💬' },
                { n: '02', title: 'Documentation', desc: 'We prepare and verify every required document — you just upload.', icon: '📁' },
                { n: '03', title: 'Filing', desc: 'We submit to MCA / concerned authority and track status in real time.', icon: '⚡' },
                { n: '04', title: 'Certificate', desc: 'Registration certificate delivered digitally within committed timeline.', icon: '🎯' },
              ].map((s, i) => (
                <div key={i} className="sb-process-card">
                  <div className="sb-process-num">{s.n}</div>
                  <div className="sb-process-icon">{s.icon}</div>
                  <h4 className="sb-process-step-title">{s.title}</h4>
                  <p className="sb-process-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA BANNER ── */}
          <div className="sb-cta-banner">
            <div className="sb-cta-glow1" />
            <div className="sb-cta-glow2" />
            <h2 className="sb-cta-title">Ready to Start Your Business?</h2>
            <p className="sb-cta-sub">
              Get expert guidance for your business registration. Our team ensures smooth,
              hassle-free process with zero hidden charges.
            </p>
            <div className="sb-cta-btns">
              <Link to="/appointment" className="sb-btn-gold">Start Registration →</Link>
              <a href="tel:+91 9286495921" className="sb-btn-ghost">📞 Schedule Consultation</a>
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

.sb-page { min-height:100vh; background:#080809; color:#fff; font-family:'Bricolage Grotesque',sans-serif; padding-bottom:40px; }

/* header */
.sb-header {
  position:relative; overflow:hidden; text-align:center;
  padding:140px 24px 40px;
  background:linear-gradient(180deg,#0d0d0f 0%,#080809 100%);
  border-bottom:1px solid #1a1a1a;
}
.sb-header-orb {
  position:absolute; top:-120px; left:50%; transform:translateX(-50%);
  width:600px; height:400px; border-radius:50%;
  background:radial-gradient(ellipse,rgba(197,160,89,0.08) 0%,transparent 70%);
  filter:blur(60px); pointer-events:none;
}
.sb-label {
  display:inline-block; font-size:10px; font-weight:700; letter-spacing:3px;
  text-transform:uppercase; color:#c5a059;
  background:rgba(197,160,89,0.1); border:1px solid rgba(197,160,89,0.25);
  padding:5px 16px; border-radius:100px; margin-bottom:24px;
}
.sb-title {
  font-size:clamp(36px,5.5vw,68px); font-weight:300;
  letter-spacing:-0.03em; line-height:1.08; color:#fff; margin:0 0 20px;
}
.sb-title em { font-style:italic; color:#c5a059; }
.sb-sub { color:#64748b; font-size:16px; line-height:1.8; max-width:540px; margin:0 auto; }

/* container */
.sb-container { max-width:1280px; margin:0 auto; padding:40px 40px; }

/* filters */
.sb-filters { display:flex; flex-wrap:wrap; justify-content:center; gap:10px; margin-bottom:48px; }
.sb-filter-btn {
  display:inline-flex; align-items:center; gap:8px;
  padding:10px 20px; border-radius:10px; border:1px solid #1e293b;
  background:#0d0d0f; color:#64748b; font-size:13px; font-weight:600;
  cursor:pointer; font-family:inherit; transition:all 0.2s;
}
.sb-filter-btn:hover { border-color:rgba(197,160,89,0.4); color:#c5a059; }
.sb-filter-active { background:linear-gradient(135deg,#c5a059,#a07830) !important; color:#000 !important; border-color:transparent !important; box-shadow:0 4px 20px rgba(197,160,89,0.35); }

/* empty state */
.sb-empty { text-align:center; padding:80px 20px; color:#4b5563; display:flex; flex-direction:column; align-items:center; gap:12px; }

/* grid — 2 col for start-business */
.sb-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:24px; margin-bottom:60px; }

/* card */
.sb-card {
  background:#0d0d0f; border:1px solid #1a1a1a; border-radius:20px;
  padding:28px; display:flex; flex-direction:column; gap:0;
  transition:border-color 0.25s, transform 0.25s, box-shadow 0.25s;
  position:relative; overflow:hidden;
}
.sb-card::before {
  content:''; position:absolute; top:0; left:0; right:0; height:2px;
  background:linear-gradient(90deg,transparent,rgba(197,160,89,0.6),transparent);
  opacity:0; transition:opacity 0.3s;
}
.sb-card:hover { border-color:rgba(197,160,89,0.35); transform:translateY(-5px); box-shadow:0 20px 50px rgba(0,0,0,0.5); }
.sb-card:hover::before { opacity:1; }

.sb-card-top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px; }
.sb-card-icon {
  width:52px; height:52px; border-radius:14px;
  background:linear-gradient(135deg,#1a1500,#2a2000);
  border:1px solid rgba(197,160,89,0.25);
  display:flex; align-items:center; justify-content:center;
}
.sb-card-pricing { text-align:right; }
.sb-price { display:block; font-size:28px; font-weight:700; color:#c5a059; line-height:1; }
.sb-time { font-size:11px; color:#4b5563; margin-top:4px; display:block; }

.sb-card-title { font-size:22px; font-weight:600; color:#fff; margin:0 0 10px; letter-spacing:-0.02em; }
.sb-card-desc { font-size:14px; color:#64748b; line-height:1.75; margin:0 0 20px; }

.sb-features { margin-bottom:24px; }
.sb-features-label { font-size:10px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#c5a059; display:block; margin-bottom:10px; }
.sb-feature-list { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:8px; }
.sb-feature-item { display:flex; align-items:flex-start; gap:10px; color:#94a3b8; font-size:13px; line-height:1.5; }
.sb-check { color:#c5a059; font-size:9px; margin-top:3px; flex-shrink:0; }

.sb-cta {
  display:block; width:100%; text-align:center; margin-top:auto;
  background:transparent; border:1px solid rgba(197,160,89,0.5); color:#c5a059;
  font-size:13px; font-weight:700; letter-spacing:0.5px;
  padding:13px; border-radius:10px; text-decoration:none;
  transition:background 0.2s, color 0.2s, transform 0.2s;
}
.sb-cta:hover { background:linear-gradient(135deg,#c5a059,#a07830); color:#000; transform:translateY(-1px); }

/* process */
.sb-process { margin-bottom:60px; }
.sb-process-header { display:flex; align-items:center; justify-content:center; gap:20px; margin-bottom:40px; }
.sb-gold-line { height:1px; flex:0 0 60px; background:linear-gradient(90deg,transparent,rgba(197,160,89,0.5),transparent); }
.sb-process-title { font-size:28px; font-weight:300; color:#fff; white-space:nowrap; }
.sb-process-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
.sb-process-card {
  background:#0d0d0f; border:1px solid #1a1a1a; border-radius:16px; padding:24px;
  text-align:center; transition:border-color 0.25s, transform 0.25s;
}
.sb-process-card:hover { border-color:rgba(197,160,89,0.35); transform:translateY(-4px); }
.sb-process-num { font-size:11px; font-weight:700; letter-spacing:2px; color:rgba(197,160,89,0.5); margin-bottom:12px; }
.sb-process-icon { font-size:30px; margin-bottom:12px; }
.sb-process-step-title { font-size:16px; font-weight:600; color:#fff; margin:0 0 8px; }
.sb-process-desc { font-size:12px; color:#64748b; line-height:1.7; margin:0; }

/* cta banner */
.sb-cta-banner {
  position:relative; overflow:hidden; text-align:center;
  background:linear-gradient(135deg,#0d0d0f,#111115);
  border:1px solid rgba(197,160,89,0.2); border-radius:24px; padding:64px 40px;
}
.sb-cta-glow1 { position:absolute; top:-80px; left:20%; width:400px; height:300px; background:radial-gradient(ellipse,rgba(197,160,89,0.1) 0%,transparent 70%); filter:blur(60px); pointer-events:none; }
.sb-cta-glow2 { position:absolute; bottom:-80px; right:20%; width:300px; height:300px; background:radial-gradient(ellipse,rgba(197,160,89,0.06) 0%,transparent 70%); filter:blur(60px); pointer-events:none; }
.sb-cta-title { position:relative; z-index:1; font-size:clamp(28px,4vw,44px); font-weight:300; color:#fff; margin:0 0 16px; }
.sb-cta-sub { position:relative; z-index:1; color:#64748b; font-size:15px; line-height:1.8; max-width:500px; margin:0 auto 36px; }
.sb-cta-btns { position:relative; z-index:1; display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
.sb-btn-gold {
  display:inline-flex; align-items:center;
  background:linear-gradient(135deg,#c5a059,#a07830); color:#000;
  font-size:13px; font-weight:700; letter-spacing:1px; text-transform:uppercase;
  padding:14px 32px; border-radius:10px; text-decoration:none;
  box-shadow:0 4px 24px rgba(197,160,89,0.4); transition:transform 0.2s, box-shadow 0.2s;
}
.sb-btn-gold:hover { transform:translateY(-3px); box-shadow:0 10px 40px rgba(197,160,89,0.5); }
.sb-btn-ghost {
  display:inline-flex; align-items:center;
  background:transparent; border:1px solid #1e293b; color:#e2e8f0;
  font-size:13px; font-weight:600; letter-spacing:1px; text-transform:uppercase;
  padding:14px 32px; border-radius:10px; text-decoration:none;
  transition:border-color 0.2s, transform 0.2s;
}
.sb-btn-ghost:hover { border-color:rgba(197,160,89,0.4); transform:translateY(-2px); }

/* responsive */
@media (max-width:900px) {
  .sb-grid { grid-template-columns:1fr; }
  .sb-process-grid { grid-template-columns:repeat(2,1fr); }
}
@media (max-width:600px) {
  .sb-container { padding:40px 20px; }
  .sb-process-grid { grid-template-columns:1fr; }
  .sb-cta-banner { padding:40px 20px; }
}
`;

export default StartBusiness;