import { useState, useRef, useEffect, useCallback } from "react";

const AVATAR_GRADIENTS = [
  ["#c5a059", "#d4af37"],
  ["#6366f1", "#818cf8"],
  ["#ec4899", "#f472b6"],
  ["#14b8a6", "#2dd4bf"],
  ["#f59e0b", "#fbbf24"],
  ["#8b5cf6", "#a78bfa"],
  ["#ef4444", "#f87171"],
];

const getInitials = (name: string) => {
  const parts = name.replace(/^Dr\.\s*/i, "").split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return parts[0].substring(0, 2).toUpperCase();
};

const ProfessionalAvatar = ({ name, index, size = 50 }: { name: string; index: number; size?: number }) => {
  const [g1, g2] = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];
  const initials = getInitials(name);
  const gradId = `av-grad-${index}`;
  return (
    <svg width={size} height={size} viewBox="0 0 50 50" style={{ borderRadius: "50%", display: "block", flexShrink: 0 }}>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={g1} />
          <stop offset="100%" stopColor={g2} />
        </linearGradient>
      </defs>
      <circle cx="25" cy="25" r="25" fill={`url(#${gradId})`} />
      <circle cx="25" cy="25" r="22" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <text x="25" y="26" textAnchor="middle" dominantBaseline="central" fill="#fff" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="17" letterSpacing="1">
        {initials}
      </text>
    </svg>
  );
};

const testimonials = [
  {
    id: 1,
    name: "Surendra Saini",
    role: "Director, Domantra Innovations Pvt Ltd",
    rating: 5,
    text: "We at Domantra Innovations are extremely satisfied with the company management services provided by Legalvala. Himanshu helped me with my ROC compliances and is always available for better solutions. Highly recommended!",
    tags: ["Company Management", "ROC Compliance", "Advisory"],
    category: "IT Company",
  },
  {
    id: 2,
    name: "Satish Chauhan",
    role: "CPPO, Blazing Render Creation Hub LLP",
    rating: 5,
    text: "I got my GST registration done through Legalvala, and I am very happy with their service. The team is highly professional and handled everything smoothly. I highly recommend Legalvala for all your legal and business needs!",
    tags: ["GST Registration", "Legal Services", "Professional"],
    category: "Creative Agency",
  },
  {
    id: 3,
    name: "Mohini Bhadoriya",
    role: "Director, Startfinity Navigator Pvt Ltd",
    rating: 5,
    text: "I availed the Company Registration and Compliance Package from Legalvala. Their pricing was the best in the market, and the entire process was fast, smooth, and transparent. I continue to work with them for their excellent service.",
    tags: ["Company Registration", "Compliance Package", "Transparent"],
    category: "Startup",
  },
  {
    id: 4,
    name: "Gajendra Singh",
    role: "Proprietor, Deepika Enterprises",
    rating: 5,
    text: "I am very happy with the GST registration service from Legalvala. Their team was professional, and we received our GST certificate within 4-5 days! Highly recommend them for quick and reliable legal services. Thank you!",
    tags: ["GST Registration", "Fast Service", "Certificate"],
    category: "Small Business",
  },
  {
    id: 5,
    name: "Akash Kumar",
    role: "Relationship Manager, HDFC Bank Ltd",
    rating: 5,
    text: "I got my Income Tax Return filed through Legalvala, and it was a great experience! The process was quick, hassle-free, and transparent. Their team is highly professional and supportive. Definitely a 5-star experience!",
    tags: ["Income Tax", "ITR Filing", "5-Star Service"],
    category: "Banking Professional",
  },
  {
    id: 6,
    name: "Charan Singh",
    role: "Owner, PTSK Traders",
    rating: 5,
    text: "I got my GST Registration and GST Return Filing done through Legalvala, and their service has been excellent! Their team is highly professional and efficient. They continue to handle my GST filings with great expertise.",
    tags: ["GST Registration", "GST Filing", "Efficient"],
    category: "Trading Business",
  },
  {
    id: 7,
    name: "Dr. Arul Ghandhi",
    role: "Director, Narmada Exploration & Mining Pvt Ltd",
    rating: 5,
    text: "I got ISO 9001, ISO 14001, and OEM certificates for my company from Legalvala. Their service was outstanding! After facing a scam elsewhere, Legalvala regained my trust. Special thanks to Himanshu Ji for handling everything smoothly.",
    tags: ["ISO Certification", "OEM Certificate", "Trusted"],
    category: "Mining & Exploration",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div style={{ display: "flex", gap: "3px", margin: "16px 0 12px" }}>
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={star <= rating ? "#f59e0b" : "#374151"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
    <span style={{ color: "#9ca3af", fontSize: "13px", marginLeft: "4px", lineHeight: "18px" }}>
      {rating}.0
    </span>
  </div>
);

const SnowflakeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" style={{ flexShrink: 0 }}>
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
  </svg>
);

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(3);
  const [animating, setAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = testimonials.length;

  const getVisibleIndices = () => {
    const prev2 = (activeIndex - 2 + total) % total;
    const prev1 = (activeIndex - 1 + total) % total;
    const next1 = (activeIndex + 1) % total;
    const next2 = (activeIndex + 2) % total;
    return [prev2, prev1, activeIndex, next1, next2];
  };

  const navigate = useCallback((dir: number) => {
    if (animating) return;
    setAnimating(true);
    setActiveIndex((prev) => (prev + dir + total) % total);
    setTimeout(() => setAnimating(false), 400);
  }, [animating, total]);

  const visible = getVisibleIndices();
  const activeTestimonial = testimonials[activeIndex];
  const prevTestimonial = testimonials[visible[1]];
  const nextTestimonial = testimonials[visible[3]];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!animating) {
        navigate(1);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex, animating, navigate]);

  return (
    <>
      <style>{testimonialsCSS}</style>
      <div
        style={{
          background: "#08080a",
          minHeight: "100vh",
          padding: "80px 0",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            pointerEvents: "none",
          }}
        />

        <div className="tm-container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span
              style={{
                display: "inline-block",
                border: "1px solid #1e293b",
                borderRadius: "20px",
                padding: "5px 16px",
                fontSize: "11px",
                letterSpacing: "1.5px",
                color: "#9ca3af",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Our Clients
            </span>
            <h2
              style={{
                color: "#ffffff",
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: "700",
                margin: "0 0 16px",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                fontFamily: "'Bricolage Grotesque', sans-serif",
              }}
            >
              Our success stories
            </h2>
            <p style={{ color: "#6b7280", fontSize: "15px", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
              Real business owners share how they simplified compliance and legal services with LegalVala's expert solutions.
            </p>
          </div>

          <div
            className="tm-avatar-row"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              marginBottom: "48px",
              flexWrap: "nowrap",
            }}
          >
            {testimonials.map((t, i) => {
              const isActive = i === activeIndex;
              const isAdjacent = Math.abs(i - activeIndex) === 1 ||
                (activeIndex === 0 && i === total - 1) ||
                (activeIndex === total - 1 && i === 0);

              return (
                <button
                  key={t.id}
                  onClick={() => { if (!animating) setActiveIndex(i); }}
                  className={`tm-avatar-btn ${isActive ? 'active' : ''} ${isAdjacent ? 'adjacent' : ''}`}
                  style={{
                    borderRadius: "50%",
                    border: isActive ? "2px solid #c5a059" : "2px solid transparent",
                    padding: "2px",
                    background: "transparent",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    flexShrink: 0,
                  }}
                >
                  <ProfessionalAvatar name={t.name} index={i} size={isActive ? 48 : 36} />
                </button>
              );
            })}
          </div>

          <div
            className="tm-cards-row"
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "stretch",
              justifyContent: "center",
              marginBottom: "48px",
              minHeight: "280px",
            }}
          >
            <div
              className="tm-side-card left"
              style={{
                flex: "0 0 340px",
                background: "#0c0d12",
                borderRadius: "16px",
                border: "1px solid #1e293b",
                padding: "28px",
                opacity: 0.55,
                transform: "scale(0.96)",
                transition: "all 0.4s ease",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                <ProfessionalAvatar name={prevTestimonial.name} index={visible[1]} size={44} />
                <div>
                  <div style={{ color: "#f9fafb", fontSize: "15px", fontWeight: "600" }}>{prevTestimonial.name}</div>
                  <div style={{ color: "#6b7280", fontSize: "12px" }}>{prevTestimonial.role}</div>
                </div>
              </div>
              <StarRating rating={prevTestimonial.rating} />
              <p style={{ color: "#9ca3af", fontSize: "13px", lineHeight: 1.65, margin: "0 0 16px" }}>
                "{prevTestimonial.text.slice(0, 100)}..."
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {prevTestimonial.tags.map((tag) => (
                  <span key={tag} style={{ background: "#1e293b", color: "#9ca3af", fontSize: "11px", padding: "4px 10px", borderRadius: "6px", border: "1px solid #334155" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="tm-active-card"
              style={{
                flex: "0 0 400px",
                background: "#0c0d12",
                borderRadius: "16px",
                border: "1px solid #334155",
                padding: "32px",
                boxShadow: "0 0 0 1px #c5a05922, 0 20px 60px rgba(0,0,0,0.5)",
                transition: "all 0.4s ease",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "20px" }}>
                <SnowflakeIcon />
                <span style={{ color: "#9ca3af", fontSize: "12px", letterSpacing: "0.5px" }}>
                  {activeTestimonial.category}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                <ProfessionalAvatar name={activeTestimonial.name} index={activeIndex} size={50} />
                <div>
                  <div style={{ color: "#f9fafb", fontSize: "16px", fontWeight: "600" }}>{activeTestimonial.name}</div>
                  <div style={{ color: "#6b7280", fontSize: "13px" }}>{activeTestimonial.role}</div>
                </div>
              </div>

              <StarRating rating={activeTestimonial.rating} />

              <p style={{ color: "#d1d5db", fontSize: "14px", lineHeight: 1.7, margin: "0 0 20px", fontStyle: "normal" }}>
                "{activeTestimonial.text}"
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {activeTestimonial.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: "#1e293b",
                      color: "#d1d5db",
                      fontSize: "11px",
                      padding: "5px 12px",
                      borderRadius: "6px",
                      border: "1px solid #334155",
                      fontWeight: "500",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="tm-side-card right"
              style={{
                flex: "0 0 340px",
                background: "#0c0d12",
                borderRadius: "16px",
                border: "1px solid #1e293b",
                padding: "28px",
                opacity: 0.55,
                transform: "scale(0.96)",
                transition: "all 0.4s ease",
                overflow: "hidden",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                <ProfessionalAvatar name={nextTestimonial.name} index={visible[3]} size={44} />
                <div>
                  <div style={{ color: "#f9fafb", fontSize: "15px", fontWeight: "600" }}>{nextTestimonial.name}</div>
                  <div style={{ color: "#6b7280", fontSize: "12px" }}>{nextTestimonial.role}</div>
                </div>
              </div>
              <StarRating rating={nextTestimonial.rating} />
              <p style={{ color: "#9ca3af", fontSize: "13px", lineHeight: 1.65, margin: "0 0 16px" }}>
                "{nextTestimonial.text.slice(0, 100)}..."
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {nextTestimonial.tags.map((tag) => (
                  <span key={tag} style={{ background: "#1e293b", color: "#9ca3af", fontSize: "11px", padding: "4px 10px", borderRadius: "6px", border: "1px solid #334155" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
            <button
              onClick={() => navigate(-1)}
              disabled={animating}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "#0c0d12",
                border: "1px solid #334155",
                color: "#9ca3af",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                fontSize: "18px",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#6b7280"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#334155"; e.currentTarget.style.color = "#9ca3af"; }}
            >
              ←
            </button>
            <button
              onClick={() => navigate(1)}
              disabled={animating}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "#0c0d12",
                border: "1px solid #334155",
                color: "#9ca3af",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                fontSize: "18px",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#6b7280"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#334155"; e.currentTarget.style.color = "#9ca3af"; }}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const testimonialsCSS = `
  .tm-avatar-btn {
    opacity: 0.4;
    width: 40px;
    height: 40px;
  }
  .tm-avatar-btn.active {
    opacity: 1;
    width: 52px;
    height: 52px;
  }
  .tm-avatar-btn.adjacent {
    opacity: 0.75;
  }

  @media (max-width: 1024px) {
    .tm-side-card {
      display: none !important;
    }
    .tm-active-card {
      flex: 0 0 100% !important;
      max-width: 600px;
    }
  }

  @media (max-width: 640px) {
    .tm-avatar-row {
      gap: 4px !important;
      overflow-x: auto;
      justify-content: flex-start !important;
      padding-bottom: 10px;
      scrollbar-width: none;
    }
    .tm-avatar-row::-webkit-scrollbar {
      display: none;
    }
    .tm-avatar-btn {
      width: 32px !important;
      height: 32px !important;
    }
    .tm-avatar-btn.active {
      width: 44px !important;
      height: 44px !important;
    }
    .tm-active-card {
      padding: 20px !important;
    }
  }
`;
