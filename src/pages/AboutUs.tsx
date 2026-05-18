import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────
   LEGALVALA – ABOUT PAGE  (Fixed v3)
   Black / gold cinematic theme
   All blank-section bugs resolved
───────────────────────────────────────────── */

const useInView = (threshold = 0.12) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
};

/* ── Inline global styles ── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap');

    :root {
      --gold: #C9A84C;
      --gold-light: #E8C97A;
      --gold-dim: rgba(201,168,76,0.15);
      --bg: #050505;
      --surface: #0D0D0D;
      --surface2: #141414;
      --border: rgba(201,168,76,0.18);
      --text: #E8E0D4;
      --muted: #6B6560;
    }

    .av-root {
      font-family: 'Inter', sans-serif;
      background: var(--bg);
      color: var(--text);
      overflow-x: hidden;
    }
    .av-root * { box-sizing: border-box; margin: 0; padding: 0; }

    /* Noise overlay */
    .av-root::before {
      content: '';
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
      opacity: .4;
    }

    /* ── Keyframes ── */
    @keyframes heroFade  { from { opacity:0; transform:translateY(32px) } to { opacity:1; transform:none } }
    @keyframes lineDraw  { from { transform:scaleX(0) } to { transform:scaleX(1) } }
    @keyframes pulse     { 0%,100%{opacity:.6} 50%{opacity:1} }
    @keyframes rotSlow   { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }
    @keyframes glowPulse { 0%,100%{box-shadow:0 0 40px rgba(201,168,76,.15)} 50%{box-shadow:0 0 80px rgba(201,168,76,.35)} }
    @keyframes orbFloat  { 0%,100%{transform:translate(0,0)} 33%{transform:translate(30px,-20px)} 66%{transform:translate(-20px,15px)} }

    .hero-word { animation: heroFade .8s cubic-bezier(.22,1,.36,1) both; }
    .hero-word:nth-child(1) { animation-delay:.1s }
    .hero-word:nth-child(2) { animation-delay:.25s }
    .hero-word:nth-child(3) { animation-delay:.4s }
    .hero-word:nth-child(4) { animation-delay:.55s }

    /* ── Reveal animation classes (used by Reveal component) ── */
    .rv-up    { opacity:0; transform:translateY(40px);  transition: opacity .7s ease, transform .7s ease; }
    .rv-left  { opacity:0; transform:translateX(40px);  transition: opacity .7s ease, transform .7s ease; }
    .rv-right { opacity:0; transform:translateX(-40px); transition: opacity .7s ease, transform .7s ease; }
    .rv-scale { opacity:0; transform:scale(.92);        transition: opacity .6s ease, transform .6s ease; }
    .rv-up.rv-visible, .rv-left.rv-visible, .rv-right.rv-visible { opacity:1; transform:none; }
    .rv-scale.rv-visible { opacity:1; transform:scale(1); }

    /* ── Gold line ── */
    .gold-line {
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--gold), transparent);
      transform-origin: left;
      animation: lineDraw 1.2s 1s ease both;
    }

    /* ── Stat card ── */
    .stat-card {
      background: var(--surface2);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 32px 24px;
      text-align: center;
      position: relative;
      overflow: hidden;
      transition: transform .3s ease, border-color .3s ease;
    }
    .stat-card:hover { transform: translateY(-4px); border-color: var(--gold); }
    .stat-card::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 50% 0%, rgba(201,168,76,.08) 0%, transparent 70%);
      pointer-events: none;
    }

    /* ── Value card ── */
    .val-card {
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 28px;
      background: var(--surface);
      transition: all .3s ease;
      position: relative;
      overflow: hidden;
      height: 100%;
    }
    .val-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--gold), transparent);
      transform: scaleX(0);
      transition: transform .4s ease;
    }
    .val-card:hover::before  { transform: scaleX(1); }
    .val-card:hover {
      background: var(--surface2);
      border-color: var(--gold-light);
      transform: translateY(-3px);
    }

    /* ── Founder glow ── */
    .founder-img-ring { animation: glowPulse 3s ease-in-out infinite; }

    /* ── CTA buttons ── */
    .btn-gold-outline {
      background: transparent;
      border: 1px solid var(--gold);
      color: var(--gold);
      padding: 12px 28px;
      border-radius: 8px;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      letter-spacing: .08em;
      cursor: pointer;
      transition: all .3s ease;
      text-transform: uppercase;
    }
    .btn-gold-outline:hover {
      background: var(--gold);
      color: #000;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(201,168,76,.3);
    }
    .btn-ghost {
      background: transparent;
      border: 1px solid rgba(255,255,255,.15);
      color: var(--text);
      padding: 12px 28px;
      border-radius: 8px;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      letter-spacing: .08em;
      cursor: pointer;
      transition: all .3s ease;
      text-transform: uppercase;
    }
    .btn-ghost:hover {
      border-color: rgba(255,255,255,.4);
      background: rgba(255,255,255,.04);
    }

    /* ── Orb ── */
    .orb {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      filter: blur(80px);
      animation: orbFloat 12s ease-in-out infinite;
    }

    /* ── Typography helpers ── */
    .section-eyebrow {
      font-size: 11px;
      letter-spacing: .2em;
      text-transform: uppercase;
      color: var(--gold);
      font-weight: 500;
    }
    .section-title {
      font-family: 'Bricolage Grotesque', sans-serif;
      font-weight: 300;
      color: var(--text);
      line-height: 1.1;
    }

    /* ── Service grid border trick ── */
    .service-grid { border-left: 1px solid var(--border); border-top: 1px solid var(--border); }
    .service-cell {
      border-right: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
      padding: 40px 32px;
      position: relative;
      overflow: hidden;
      cursor: default;
      transition: background .3s ease;
    }
    .service-cell:hover { background: var(--surface); }

    /* scrollbar */
    .av-root ::-webkit-scrollbar { width: 4px; }
    .av-root ::-webkit-scrollbar-track { background: var(--bg); }
    .av-root ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

    /* ── What We Handle Responsive ── */
    @media (max-width: 1024px) {
      .wh-grid { grid-template-columns: repeat(2, 1fr) !important; }
    }
    @media (max-width: 640px) {
      .wh-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 10px !important;
      }
      .wh-card {
        padding: 14px !important;
        border-radius: 10px !important;
      }
    }
    @media (max-width: 400px) {
      .wh-grid { grid-template-columns: 1fr !important; }
    }

    /* Responsive */
    @media (max-width: 640px) {
      .journey-card { width: 80% !important; }
      .founder-grid { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

/* ══════════════════════════════════════
   Reveal — uses its OWN IntersectionObserver
   No class-based stagger hack needed
══════════════════════════════════════ */
const Reveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  dir?: "up" | "left" | "right" | "scale";
  delay?: number;
  style?: React.CSSProperties;
}> = ({ children, className = "", dir = "up", delay = 0, style }) => {
  const { ref, inView } = useInView();
  const base =
    dir === "left"
      ? "rv-left"
      : dir === "right"
        ? "rv-right"
        : dir === "scale"
          ? "rv-scale"
          : "rv-up";
  return (
    <div
      ref={ref}
      className={`${base} ${inView ? "rv-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s`, ...style }}
    >
      {children}
    </div>
  );
};

/* ══════════════════════════════════════
   Stat card — wrapped in its own Reveal
══════════════════════════════════════ */
/* ══════════════════════════════════════
   Stat card — wrapped in its own Reveal
══════════════════════════════════════ */
const Stat: React.FC<{
  num: string;
  label: string;
  delay?: number;
}> = ({ num, label, delay = 0 }) => (
  <Reveal delay={delay}>
    <div
      className="stat-card"
      style={{
        width: "100%",
        minHeight: "170px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 20px",
      }}
    >
      <div
        style={{
          fontSize: "clamp(2.2rem,4vw,3rem)",
          fontFamily: "Bricolage Grotesque, sans-serif",
          fontWeight: 600,
          color: "var(--gold)",
          lineHeight: 1,
          textAlign: "center",
        }}
      >
        {num}
      </div>

      <div
        style={{
          marginTop: 12,
          fontSize: "0.95rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--muted)",
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        {label}
      </div>
    </div>
  </Reveal>
);

/* ══════════════════════════════════════
   Value card — wrapped in its own Reveal
══════════════════════════════════════ */
const ValueCard: React.FC<{
  icon: string;
  title: string;
  desc: string;
  delay?: number;
}> = ({ icon, title, desc, delay = 0 }) => (
  <Reveal delay={delay} style={{ height: "100%" }}>
    <div className="val-card">
      <div style={{ fontSize: 28, marginBottom: 16 }}>{icon}</div>
      <div
        style={{
          fontFamily: "Bricolage Grotesque, sans-serif",
          fontSize: "1.25rem",
          color: "var(--text)",
          marginBottom: 10,
          fontWeight: 400,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.7 }}>
        {desc}
      </div>
    </div>
  </Reveal>
);

/* ══════════════════════════════════════
   Journey milestones data
══════════════════════════════════════ */
const milestones = [
  {
    year: "2021",
    label: "The Beginning",
    desc: "The journey of Legalvala started from a small shop with limited resources but unlimited determination to help people with legal and business solutions.",
    side: "left",
  },
  {
    year: "Early Days",
    label: "Personal Dedication",
    desc: "Himanshu personally handled client consultations, registrations, documentation, and business support services with dedication and hard work.",
    side: "right",
  },
  {
    year: "Growth",
    label: "Building Reputation",
    desc: "Through consistency, professionalism, and client satisfaction, Legalvala gradually built its reputation in the market.",
    side: "left",
  },
  {
    year: "Today",
    label: "A Trusted Startup",
    desc: "From a small shop to a growing startup, the journey reflects hard work, trust, and the vision to create something meaningful for businesses across India.",
    side: "right",
  },
];

/* ══════════════════════════════════════
   Journey item — own hook per item
══════════════════════════════════════ */
const JourneyItem: React.FC<{
  milestone: (typeof milestones)[0];
  index: number;
}> = ({ milestone: m, index: i }) => {
  const { ref, inView } = useInView(0.2);
  const isLeft = m.side === "left";
  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        justifyContent: isLeft ? "flex-start" : "flex-end",
        marginBottom: 48,
        position: "relative",
      }}
    >
      {/* spine dot */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 28,
          transform: "translateX(-50%)",
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "var(--gold)",
          zIndex: 2,
          boxShadow:
            "0 0 0 4px rgba(201,168,76,.15), 0 0 16px rgba(201,168,76,.3)",
        }}
      />

      {/* card */}
      <div
        className="journey-card"
        style={{
          width: "42%",
          background: "var(--surface2)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          padding: "24px 28px",
          opacity: inView ? 1 : 0,
          transform: inView
            ? "none"
            : isLeft
              ? "translateX(-40px)"
              : "translateX(40px)",
          transition: "opacity .7s ease, transform .7s ease",
          transitionDelay: `${i * 0.08}s`,
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: ".18em",
            color: "var(--gold)",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          {m.year}
        </div>
        <div
          style={{
            fontFamily: "Bricolage Grotesque, sans-serif",
            fontSize: "1.2rem",
            color: "var(--text)",
            marginBottom: 8,
          }}
        >
          {m.label}
        </div>
        <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>
          {m.desc}
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
const AboutUs: React.FC = () => {
  return (
    <div className="av-root" style={{ position: "relative", zIndex: 1 }}>
      <GlobalStyles />

      {/* ─── HERO ─────────────────────────────── */}
      <section
        style={{
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "120px 24px 80px",
        }}
      >
        {/* bg orbs */}
        <div
          className="orb"
          style={{
            width: 500,
            height: 500,
            top: "-15%",
            left: "-10%",
            background:
              "radial-gradient(circle, rgba(201,168,76,.12) 0%, transparent 70%)",
            animationDelay: "0s",
          }}
        />
        <div
          className="orb"
          style={{
            width: 350,
            height: 350,
            bottom: "5%",
            right: "-8%",
            background:
              "radial-gradient(circle, rgba(201,168,76,.08) 0%, transparent 70%)",
            animationDelay: "-5s",
          }}
        />

        {/* top rule */}
        <div
          style={{
            position: "absolute",
            top: 48,
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            maxWidth: 600,
          }}
        >
          <div className="gold-line" />
        </div>

        <div
          style={{
            textAlign: "center",
            maxWidth: 820,
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            className="section-eyebrow hero-word"
            style={{ marginBottom: 24 }}
          >
            Est. 2020 Ahmedabad, India
          </div>

          <h1 style={{ margin: "0 0 24px", lineHeight: 1.05 }}>
            <span
              className="section-title hero-word"
              style={{ display: "block", fontSize: "clamp(3rem,7vw,6rem)" }}
            >
              The People
            </span>
            <span
              className="section-title hero-word"
              style={{
                display: "block",
                fontSize: "clamp(3rem,7vw,6rem)",
                fontStyle: "italic",
                color: "var(--gold)",
              }}
            >
              Behind the Brief
            </span>
          </h1>

          <p
            className="hero-word"
            style={{
              fontSize: "1rem",
              color: "var(--muted)",
              maxWidth: 560,
              margin: "0 auto 40px",
              lineHeight: 1.8,
            }}
          >
            We translate the labyrinth of Indian compliance into a clear path —
            so founders can stay focused on building, not filing.
          </p>

          <div
            className="hero-word"
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/contact-us"
              className="btn-gold-outline"
              style={{ textDecoration: "none" }}
            >
              Work With Us
            </Link>
            <Link
              to="/services"
              className="btn-ghost"
              style={{ textDecoration: "none" }}
            >
              Our Services
            </Link>
          </div>
        </div>

        {/* bottom rule */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: "50%",
            transform: "translateX(-50%)",
            width: "30%",
          }}
        >
          <div className="gold-line" style={{ animationDelay: "1.5s" }} />
        </div>
      </section>

      {/* ─── STATS ────────────────────────────── */}
      <section style={{ padding: "80px 24px", position: "relative" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="section-eyebrow" style={{ marginBottom: 12 }}>
                By the numbers
              </div>

              <h2
                className="section-title"
                style={{ fontSize: "clamp(2rem,4vw,3rem)" }}
              >
                Proof in Practice
              </h2>
            </div>
          </Reveal>

          {/* UPDATED RESPONSIVE ROW */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 20,
              width: "100%",
            }}
          >
            <Stat num="5,000+" label="Happy Clients" delay={0} />

            <Stat num="5000+" label="Services Delivered" delay={0.1} />

            <Stat num="15+" label="Expert Professionals" delay={0.2} />

            <Stat num="99.2%" label="Client Satisfaction" delay={0.3} />
          </div>
        </div>
      </section>

      {/* ─── FOUNDER / OUR STORY ──────────────── */}
      <section
        style={{
          padding: "100px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, var(--surface2) 0%, var(--bg) 60%)",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background:
              "linear-gradient(90deg,transparent,var(--border),transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background:
              "linear-gradient(90deg,transparent,var(--border),transparent)",
          }}
        />

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            className="founder-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 80,
              alignItems: "center",
            }}
          >
            {/* LEFT — Founder photo */}
            <Reveal dir="right">
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {/* decorative rings */}
                <div
                  style={{
                    position: "absolute",
                    width: 320,
                    height: 320,
                    borderRadius: "50%",
                    border: "1px solid var(--border)",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    width: 380,
                    height: 380,
                    borderRadius: "50%",
                    border: "1px dashed rgba(201,168,76,.12)",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    animation: "rotSlow 30s linear infinite",
                  }}
                />

                {/* photo */}
                <div
                  className="founder-img-ring"
                  style={{
                    width: 260,
                    height: 260,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2px solid var(--gold)",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {/* Replace this div with: <img src="/founder.jpg" alt="Founder" style={{width:'100%',height:'100%',objectFit:'cover'}} /> */}
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(145deg,#1a1510,#2a1f0d)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <span style={{ fontSize: 64 }}>👤</span>
                    <span
                      style={{
                        fontSize: 11,
                        color: "var(--muted)",
                        letterSpacing: ".15em",
                        textTransform: "uppercase",
                      }}
                    >
                      Founder Photo
                    </span>
                  </div>
                </div>

                {/* badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: "10%",
                    background: "var(--surface2)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    padding: "12px 20px",
                    textAlign: "center",
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Bricolage Grotesque, sans-serif",
                      fontSize: "1.8rem",
                      color: "var(--gold)",
                      lineHeight: 1,
                    }}
                  >
                    5+
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--muted)",
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      marginTop: 4,
                    }}
                  >
                    Years Active
                  </div>
                </div>
              </div>
            </Reveal>

            {/* RIGHT — Story text */}
            <Reveal dir="left">
              <div>
                <div className="section-eyebrow" style={{ marginBottom: 16 }}>
                  Our Story
                </div>
                <h2
                  className="section-title"
                  style={{
                    fontSize: "clamp(2rem,3.5vw,2.8rem)",
                    marginBottom: 24,
                  }}
                >
                  Started by a<br />
                  <em style={{ color: "var(--gold)" }}>
                    frustrated entrepreneur
                  </em>
                </h2>
                <p
                  style={{
                    color: "var(--muted)",
                    lineHeight: 1.9,
                    marginBottom: 18,
                    fontSize: "0.95rem",
                  }}
                >
                  Founded by Himanshu in 2020 legalvala was established with a
                  vision to make legal and business services simple, affordable,
                  and accessible for every entrepreneur and business owner
                  across India.
                </p>
                <p
                  style={{
                    color: "var(--muted)",
                    lineHeight: 1.9,
                    marginBottom: 18,
                    fontSize: "0.95rem",
                  }}
                >
                  Today, Legalvala provides a wide range of professional
                  services including Company Registration, LLP Registration, GST
                  Registration, Trademark Registration, ISO Certification,
                  Income Tax Filing, Compliance Management, Digital Marketing,
                  and complete business consultancy solutions.
                </p>
                <p
                  style={{
                    color: "var(--muted)",
                    lineHeight: 1.9,
                    marginBottom: 18,
                    fontSize: "0.95rem",
                  }}
                >
                  Under the leadership of Himanshu, Legalvala has become known
                  for transparent guidance, fast service, and reliable business
                  support. The company believes in building long-term
                  relationships with clients by delivering quality services with
                  honesty and professionalism.
                </p>
                <p
                  style={{
                    color: "var(--muted)",
                    lineHeight: 1.9,
                    fontSize: "0.95rem",
                  }}
                >
                  Our mission is to simplify complicated legal and business
                  processes so entrepreneurs can focus on growing their
                  businesses while we handle the legal and compliance
                  responsibilities. Legalvala – Building Businesses with Trust,
                  Compliance & Growth.
                </p>

                {/* signature */}
                <div
                  style={{
                    marginTop: 32,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 1,
                      background: "var(--gold)",
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: "Bricolage Grotesque, sans-serif",
                        fontSize: "1.1rem",
                        color: "var(--text)",
                      }}
                    >
                      Himanshu Agarwal
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--muted)",
                        letterSpacing: ".08em",
                      }}
                    >
                      Founder
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── VALUES ───────────────────────────── */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="section-eyebrow" style={{ marginBottom: 12 }}>
                What drives us
              </div>
              <h2
                className="section-title"
                style={{ fontSize: "clamp(2rem,4vw,3rem)" }}
              >
                Core Principles
              </h2>
            </div>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 20,
            }}
          >
            <ValueCard
              icon="⚖️"
              title="Integrity"
              desc="We give you the honest answer, even when it's not what you want to hear."
              delay={0}
            />
            <ValueCard
              icon="🎯"
              title="Precision"
              desc='Legal work has zero margin for "close enough." We check, then check again.'
              delay={0.1}
            />
            <ValueCard
              icon="🤝"
              title="Client First"
              desc="Your deadline is our deadline. Your problem is our problem."
              delay={0.2}
            />
            <ValueCard
              icon="💡"
              title="Clarity"
              desc="No jargon. Every document, every clause — explained in plain language."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ─── JOURNEY TIMELINE ─────────────────── */}
      <section
        style={{
          padding: "100px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--surface)",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background:
              "linear-gradient(90deg,transparent,var(--border),transparent)",
          }}
        />

        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <div className="section-eyebrow" style={{ marginBottom: 12 }}>
                2020 esent
              </div>
              <h2
                className="section-title"
                style={{ fontSize: "clamp(2rem,4vw,3rem)" }}
              >
                The Journey
              </h2>
            </div>
          </Reveal>

          {/* vertical spine + items */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: 1,
                background:
                  "linear-gradient(180deg, transparent, var(--border) 10%, var(--border) 90%, transparent)",
                transform: "translateX(-50%)",
              }}
            />
            {milestones.map((m, i) => (
              <JourneyItem key={i} milestone={m} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT WE DO ───────────────────────── */}
      <section style={{ padding: "60px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div className="section-eyebrow" style={{ marginBottom: 12 }}>
                Our Expertise
              </div>
              <h2
                className="section-title"
                style={{ fontSize: "clamp(1.6rem,4vw,3rem)" }}
              >
                What We Handle
              </h2>
            </div>
          </Reveal>

          <div
            className="service-grid wh-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
              alignItems: "stretch",
            }}
          >
            {[
              {
                num: "01",
                title: "Company Registration",
                desc: "Private limited, LLP, OPC, Section 8 — all structures, all states.",
                delay: 0,
              },
              {
                num: "02",
                title: "GST & Tax Filing",
                desc: "Returns, registrations, audits and litigation support.",
                delay: 0.08,
              },
              {
                num: "03",
                title: "Legal Documentation",
                desc: "Agreements, MOUs, IP filings, employment contracts.",
                delay: 0.16,
              },
              {
                num: "04",
                title: "Compliance Management",
                desc: "Annual filings, board meetings, ROC obligations — handled end-to-end.",
                delay: 0.24,
              },
            ].map((s, i) => (
              <Reveal key={i} delay={s.delay} style={{ height: "100%" }}>
                <div
                  className="service-cell wh-card"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    padding: "20px",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Bricolage Grotesque, sans-serif",
                      fontSize: "3.5rem",
                      color: "rgba(201,168,76,.12)",
                      lineHeight: 1,
                      marginBottom: 16,
                      userSelect: "none",
                    }}
                  >
                    {s.num}
                  </div>
                  <h3
                    style={{
                      fontFamily: "Bricolage Grotesque, sans-serif",
                      fontSize: "1.3rem",
                      color: "var(--text)",
                      marginBottom: 12,
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 13.5,
                      color: "var(--muted)",
                      lineHeight: 1.8,
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────── */}
      <section
        style={{
          padding: "100px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="orb"
          style={{
            width: 600,
            height: 600,
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            background:
              "radial-gradient(circle, rgba(201,168,76,.1) 0%, transparent 65%)",
            animation: "none",
          }}
        />

        <Reveal>
          <div
            style={{
              maxWidth: 680,
              margin: "0 auto",
              textAlign: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div className="section-eyebrow" style={{ marginBottom: 16 }}>
              Let's talk
            </div>
            <h2
              className="section-title"
              style={{ fontSize: "clamp(2.2rem,5vw,4rem)", marginBottom: 20 }}
            >
              Your Next Chapter
              <br />
              <em style={{ color: "var(--gold)" }}>Starts Here</em>
            </h2>
            <p
              style={{
                color: "var(--muted)",
                marginBottom: 40,
                lineHeight: 1.8,
                fontSize: "0.95rem",
              }}
            >
              Whether you're registering your first company or restructuring an
              established enterprise, our team is ready to move as fast as you
              do.
            </p>
            <div
              style={{
                display: "flex",
                gap: 14,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/appointment"
                className="btn-gold-outline"
                style={{ textDecoration: "none" }}
              >
                Schedule a Free Call
              </Link>
              <Link
                to="/services"
                className="btn-ghost"
                style={{ textDecoration: "none" }}
              >
                Browse Services
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default AboutUs;
