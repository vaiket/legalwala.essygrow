import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const ROTATING_WORDS = [
  "Business Growth.",
  "Personal Growth.",
  "Financial Freedom.",
  "Tax Compliance.",
  "Wealth Creation.",
];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "erasing">("typing");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── typewriter / eraser loop ──
  useEffect(() => {
    const target = ROTATING_WORDS[wordIndex];

    if (phase === "typing") {
      if (displayed.length < target.length) {
        const t = setTimeout(
          () => setDisplayed(target.slice(0, displayed.length + 1)),
          72
        );
        return () => clearTimeout(t);
      } else {
        setPhase("pause");
      }
    }

    if (phase === "pause") {
      const t = setTimeout(() => setPhase("erasing"), 2400);
      return () => clearTimeout(t);
    }

    if (phase === "erasing") {
      if (displayed.length > 0) {
        const t = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          38
        );
        return () => clearTimeout(t);
      } else {
        setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
        setPhase("typing");
      }
    }
  }, [displayed, phase, wordIndex]);

  // ── floating particles canvas ──
  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = (canvas.width = canvas.offsetWidth);
    let H = (canvas.height = canvas.offsetHeight);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -Math.random() * 0.4 - 0.1,
      o: Math.random() * 0.4 + 0.05,
    }));

    let raf: number;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197,160,89,${p.o})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
      });
      raf = requestAnimationFrame(draw);
    }
    draw();

    const onResize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  // ── mouse parallax spotlight ──
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = sectionRef.current!;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <style>{heroCSS}</style>

      <section ref={sectionRef} className="hv-root">
        {/* canvas particles */}
        <canvas ref={canvasRef} className="hv-canvas" />

        {/* mouse spotlight */}
        <div className="hv-spotlight" />

        {/* diagonal grid lines */}
        <svg className="hv-grid" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 12 }, (_, i) => (
            <line
              key={i}
              x1={i * 130 - 200} y1="0"
              x2={i * 130 + 300} y2="900"
              stroke="rgba(197,160,89,0.04)" strokeWidth="1"
            />
          ))}
        </svg>

        {/* ambient orbs */}
        <div className="hv-orb hv-orb1" />
        <div className="hv-orb hv-orb2" />
        <div className="hv-orb hv-orb3" />

        {/* ── CONTENT ── */}
        <div className="hv-inner">

          {/* top pill badge */}
          <div className="hv-badge hv-anim1">
            <span className="hv-badge-dot" />
            <span>India's Trusted CA & Compliance Firm</span>
            <span className="hv-badge-sep">✦</span>
            <span style={{ color: "#c5a059" }}>Est. 2020</span>
          </div>

          {/* headline */}
          <h1 className="hv-h1 hv-anim2">
            Empowering Your
          </h1>

          {/* rotating gold word */}
          <h1 className="hv-h1 hv-gold hv-anim3">
            <span className="hv-word-wrap">
              {displayed}
              <span className={`hv-cursor${phase === "pause" ? " hv-blink" : ""}`} />
            </span>
          </h1>

          {/* sub */}
          <p className="hv-sub hv-anim4">
            Smart business compliance starts with expert Tax, GST, ITR, and registration
            support from Legalvala — your partner from startup to scale.
          </p>

          {/* trust chips */}
          {/* <div className="hv-chips hv-anim4">
            {["✅ 10,000+ Clients", "⚡ 7-Day Delivery", "🏆 ISO Certified", "🔒 100% Secure"].map((c, i) => (
              <span key={i} className="hv-chip">{c}</span>
            ))}
          </div> */}

          {/* CTAs */}
          <div className="hv-ctas hv-anim5">
            <Link to="/appointment" className="hv-btn-primary">
              <span>Consult an Expert</span>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
            <Link to="/services" className="hv-btn-outline">
              Explore Services
            </Link>
          </div>

          {/* bottom stat bar */}
          <div className="hv-stats hv-anim5">
            {[
              { n: "15,000+", l: "Clients Served" },
              { n: "₹500Cr+", l: "Tax Filed" },
              { n: "99.2%", l: "Success Rate" },
              { n: "150+", l: "Cities" },
            ].map((s, i) => (
              <div key={i} className="hv-stat">
                <span className="hv-stat-num">{s.n}</span>
                <span className="hv-stat-lbl">{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* decorative bottom line */}
        <div className="hv-bottom-line" />
      </section>
    </>
  );
}

const heroCSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,600;12..96,700&display=swap');

.hv-root {
  --mx: 50%; --my: 50%;
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #080809;
  overflow: hidden;
  border-bottom: 1px solid #1a1a1a;
  font-family: 'Bricolage Grotesque', sans-serif;
}

/* canvas */
.hv-canvas {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  pointer-events: none;
}

/* spotlight */
.hv-spotlight {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(700px circle at var(--mx) var(--my), rgba(197,160,89,0.06), transparent 65%);
  transition: background 0.05s;
}

/* grid lines */
.hv-grid {
  position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;
}

/* orbs */
.hv-orb {
  position: absolute; border-radius: 50%; pointer-events: none; filter: blur(100px);
}
.hv-orb1 {
  width: 600px; height: 400px;
  top: -120px; right: -100px;
  background: radial-gradient(ellipse, rgba(197,160,89,0.07) 0%, transparent 70%);
  animation: hv-drift 18s ease-in-out infinite alternate;
}
.hv-orb2 {
  width: 500px; height: 300px;
  bottom: -80px; left: -100px;
  background: radial-gradient(ellipse, rgba(197,160,89,0.04) 0%, transparent 70%);
  animation: hv-drift 22s ease-in-out infinite alternate-reverse;
}
.hv-orb3 {
  width: 300px; height: 300px;
  top: 40%; left: 50%; transform: translate(-50%, -50%);
  background: radial-gradient(ellipse, rgba(197,160,89,0.03) 0%, transparent 70%);
  animation: hv-pulse-orb 6s ease-in-out infinite;
}

/* inner */
.hv-inner {
  position: relative; z-index: 10;
  text-align: center;
  padding: 120px 24px 80px;
  max-width: 900px;
  width: 100%;
}

/* badge */
.hv-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(197,160,89,0.08);
  border: 1px solid rgba(197,160,89,0.25);
  color: #9ca3af; font-size: 11px; font-weight: 600;
  letter-spacing: 1.5px; text-transform: uppercase;
  padding: 6px 16px; border-radius: 100px;
  margin-bottom: 32px;
}
.hv-badge-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #c5a059; box-shadow: 0 0 8px #c5a059;
  animation: hv-pulse-dot 2s ease-in-out infinite;
}
.hv-badge-sep { color: rgba(197,160,89,0.4); }

/* headings */
.hv-h1 {
  font-size: clamp(44px, 7.5vw, 96px);
  font-weight: 300;
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: #ffffff;
  margin: 0;
}
.hv-gold {
  color: #c5a059;
  min-height: 1.1em;
  display: block;
  margin-bottom: 8px;
}

/* word container */
.hv-word-wrap {
  display: inline-block;
  position: relative;
}

/* cursor */
.hv-cursor {
  display: inline-block;
  width: 3px;
  height: 0.82em;
  background: #c5a059;
  border-radius: 2px;
  margin-left: 4px;
  vertical-align: middle;
  box-shadow: 0 0 8px #c5a059;
}
.hv-cursor.hv-blink {
  animation: hv-blink 1s step-end infinite;
}

/* sub */
.hv-sub {
  color: #64748b;
  font-size: clamp(14px, 1.8vw, 17px);
  line-height: 1.8;
  max-width: 560px;
  margin: 28px auto 0;
}

/* trust chips */
.hv-chips {
  display: flex; flex-wrap: wrap; justify-content: center; gap: 8px;
  margin: 24px auto 0;
}
.hv-chip {
  background: rgba(255,255,255,0.03);
  border: 1px solid #1e293b;
  color: #64748b; font-size: 11px; font-weight: 500;
  padding: 5px 12px; border-radius: 100px;
  letter-spacing: 0.5px;
  transition: border-color 0.2s, color 0.2s;
}
.hv-chip:hover { border-color: rgba(197,160,89,0.3); color: #c5a059; }

/* CTAs */
.hv-ctas {
  display: flex; gap: 14px; justify-content: center;
  flex-wrap: wrap; margin-top: 36px;
}
.hv-btn-primary {
  display: inline-flex; align-items: center; gap: 10px;
  background: linear-gradient(135deg, #c5a059, #a07830);
  color: #000; font-weight: 700; font-size: 13px;
  letter-spacing: 1.5px; text-transform: uppercase;
  padding: 16px 32px; border-radius: 10px;
  text-decoration: none;
  box-shadow: 0 4px 24px rgba(197,160,89,0.4), 0 0 0 1px rgba(197,160,89,0.2);
  transition: transform 0.2s, box-shadow 0.2s;
}
.hv-btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 40px rgba(197,160,89,0.5), 0 0 0 1px rgba(197,160,89,0.3);
}
.hv-btn-outline {
  display: inline-flex; align-items: center;
  background: transparent;
  border: 1px solid #1e293b;
  color: #e2e8f0; font-weight: 600; font-size: 13px;
  letter-spacing: 1.5px; text-transform: uppercase;
  padding: 16px 32px; border-radius: 10px;
  text-decoration: none;
  transition: border-color 0.2s, background 0.2s, transform 0.2s;
}
.hv-btn-outline:hover {
  border-color: rgba(197,160,89,0.4);
  background: rgba(197,160,89,0.05);
  transform: translateY(-2px);
}

/* stat bar */
.hv-stats {
  display: flex; justify-content: center;
  gap: 0; margin-top: 56px;
  border: 1px solid #1a1a1a; border-radius: 16px;
  overflow: hidden; background: rgba(13,13,15,0.8);
  backdrop-filter: blur(12px);
}
.hv-stat {
  flex: 1; padding: 20px 12px;
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  border-right: 1px solid #1a1a1a;
  transition: background 0.2s;
}
.hv-stat:last-child { border-right: none; }
.hv-stat:hover { background: rgba(197,160,89,0.04); }
.hv-stat-num {
  font-size: clamp(18px, 2.5vw, 26px);
  font-weight: 700; color: #c5a059; line-height: 1;
}
.hv-stat-lbl {
  font-size: 10px; color: #4b5563;
  text-transform: uppercase; letter-spacing: 1px;
}

/* bottom line */
.hv-bottom-line {
  position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
  width: 60%; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(197,160,89,0.3), transparent);
}

/* ── ANIMATIONS ── */
.hv-anim1 { animation: hv-up 0.8s ease 0.1s both; }
.hv-anim2 { animation: hv-up 0.8s ease 0.25s both; }
.hv-anim3 { animation: hv-up 0.8s ease 0.4s both; }
.hv-anim4 { animation: hv-up 0.8s ease 0.55s both; }
.hv-anim5 { animation: hv-up 0.8s ease 0.7s both; }

@keyframes hv-up {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes hv-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
@keyframes hv-pulse-dot {
  0%, 100% { box-shadow: 0 0 6px #c5a059; }
  50%       { box-shadow: 0 0 18px #c5a059, 0 0 32px rgba(197,160,89,0.4); }
}
@keyframes hv-drift {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(30px, 20px) scale(1.08); }
}
@keyframes hv-pulse-orb {
  0%, 100% { opacity: 0.5; transform: translate(-50%,-50%) scale(1); }
  50%       { opacity: 1;   transform: translate(-50%,-50%) scale(1.15); }
}

/* ── RESPONSIVE ── */
@media (max-width: 640px) {
  .hv-root { min-height: 85vh; }
  .hv-inner { padding: 80px 16px 40px; }
  .hv-badge { font-size: 9px; padding: 4px 12px; gap: 6px; margin-bottom: 20px; }
  .hv-h1 { font-size: 36px; letter-spacing: -0.02em; }
  .hv-sub { font-size: 13px; margin: 16px auto 0; max-width: 100%; }
  .hv-ctas { flex-direction: column; align-items: stretch; gap: 10px; margin-top: 24px; }
  .hv-btn-primary { justify-content: center; padding: 14px 20px; font-size: 12px; }
  .hv-btn-outline { justify-content: center; padding: 14px 20px; font-size: 12px; }
  .hv-stats { flex-wrap: wrap; margin-top: 28px; border-radius: 12px; }
  .hv-stat { flex: 0 0 50%; padding: 14px 8px; border-bottom: 1px solid #1a1a1a; }
  .hv-stat:nth-child(odd) { border-right: 1px solid #1a1a1a; }
  .hv-stat-num { font-size: 18px; }
  .hv-stat-lbl { font-size: 9px; }
  .hv-chips { gap: 6px; }
  .hv-chip { font-size: 10px; }
}
`;