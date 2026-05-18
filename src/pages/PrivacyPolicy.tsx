import React from 'react';

const sections = [
  {
    id: 1,
    title: 'Introduction',
    content: 'This Policy establishes standards for data protection, confidentiality, compliance management, digital governance, and lawful usage of services provided through the platform.',
  },
  {
    id: 2,
    title: 'Information We Collect',
    content: 'The platform may collect personal, financial, technical, compliance-related, and authentication information including PAN, GSTIN, CIN, email address, mobile number, bank details, IP logs, and uploaded documents.',
  },
  {
    id: 3,
    title: 'Purpose of Data Usage',
    content: 'Collected data may be used for identity verification, compliance filing, audit support, legal reporting, security monitoring, fraud prevention, communication, analytics, and service improvement.',
  },
  {
    id: 4,
    title: 'Data Protection & Security',
    content: 'Industry-standard safeguards including encryption, access control, server security, backups, authentication systems, and monitoring mechanisms are implemented to protect user information.',
  },
  {
    id: 5,
    title: 'Confidentiality',
    content: 'User information shall remain confidential and shall not be unlawfully sold, shared, or disclosed except where legally required by authorities or courts.',
  },
  {
    id: 6,
    title: 'User Responsibilities',
    content: 'Users are responsible for maintaining accurate records, protecting login credentials, and ensuring lawful usage of the platform and services.',
  },
  {
    id: 7,
    title: 'Fraud Prevention',
    content: 'The organization may conduct verification checks, audit reviews, risk analysis, and suspicious activity monitoring to prevent fraud or misuse.',
  },
  {
    id: 8,
    title: 'Third-Party Integrations',
    content: 'The platform may integrate with government systems, banking networks, APIs, payment gateways, and cloud service providers for operational purposes.',
  },
  {
    id: 9,
    title: 'Digital Signatures & Authentication',
    content: 'Users utilizing DSC, OTP, or e-sign systems remain legally responsible for their authentication credentials.',
  },
  {
    id: 10,
    title: 'Record Retention',
    content: 'Records and documents may be retained as required under applicable laws, audit obligations, regulatory requirements, and dispute resolution processes.',
  },
  {
    id: 11,
    title: 'Intellectual Property',
    content: 'All software systems, designs, branding, databases, workflows, and content remain the intellectual property of the organization unless otherwise specified.',
  },
  {
    id: 12,
    title: 'Limitation of Liability',
    content: 'The organization shall not be liable for government portal downtime, regulatory changes, third-party failures, technical interruptions, or user negligence.',
  },
  {
    id: 13,
    title: 'Compliance with DPDP Act 2023',
    content: 'The organization aims to process data lawfully, maintain transparency, protect sensitive data, and implement appropriate safeguards under applicable Indian laws.',
  },
  {
    id: 14,
    title: 'Cybersecurity',
    content: 'Users are prohibited from unauthorized access attempts, hacking, malware distribution, API abuse, credential theft, or other malicious activities.',
  },
  {
    id: 15,
    title: 'Amendments',
    content: 'This Policy may be updated or modified periodically. Continued use of services implies acceptance of revised terms.',
  },
  {
    id: 16,
    title: 'Governing Law',
    content: 'This Policy shall be governed by the laws of India and subject to jurisdiction of competent Indian courts.',
  },
  {
    id: 17,
    title: 'Contact Information',
    content: 'Compliance Officer\nEmail: compliance@legalvala.com\nPhone: 9286495921',
  },
];

const PrivacyPolicy: React.FC = () => {
  const scrollTo = (id: number) => {
    document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen bg-brand-bg text-slate-300 font-sans selection:bg-brand-gold/30 selection:text-brand-gold">
      {/* Hero */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.07)_0%,transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-widest mb-6">
            <span className="material-icons text-sm">shield</span>
            Regulatory Compliance
          </div>
          <h1 className="text-5xl md:text-7xl font-bricolage font-bold text-white mb-6 tracking-tight">
            Privacy <span className="text-brand-gold italic">Policy</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Unified Regulatory Compliance & Privacy Policy — prepared in accordance with GST Portal, MCA, ICAI, ICSI, RBI, and DGFT governance standards.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Sticky Sidebar TOC */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-32 bg-brand-surface/30 backdrop-blur-xl border border-white/5 p-4 rounded-3xl">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest px-4 mb-4">Table of Contents</p>
              <div className="space-y-1 pr-1">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-white/5 transition-all group flex items-center gap-3 border border-transparent hover:border-white/5"
                  >
                    <span className="text-[10px] font-mono text-slate-600 group-hover:text-brand-gold w-5 shrink-0">
                      {String(s.id).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-medium text-slate-400 group-hover:text-white truncate">{s.title}</span>
                  </button>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-white/5 space-y-3 px-4">
                <div className="flex items-center gap-3">
                  <span className="material-icons text-brand-gold text-lg">verified_user</span>
                  <span className="text-xs text-slate-400">DPDP Act 2023 Compliant</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-icons text-brand-gold text-lg">lock</span>
                  <span className="text-xs text-slate-400">End-to-End Encrypted</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-icons text-brand-gold text-lg">gavel</span>
                  <span className="text-xs text-slate-400">Governed by Indian Law</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {sections.map((s) => (
              <div
                key={s.id}
                id={`section-${s.id}`}
                className="group bg-brand-surface/40 hover:bg-brand-surface/60 border border-white/5 hover:border-brand-gold/20 p-8 rounded-3xl transition-all duration-500 shadow-xl"
              >
                <div className="flex items-start gap-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/5 border border-brand-gold/10 flex items-center justify-center text-brand-gold font-mono font-bold text-sm shrink-0 group-hover:bg-brand-gold group-hover:text-brand-bg transition-colors">
                    {s.id}
                  </div>
                  <div className="space-y-3 flex-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-brand-gold transition-colors">
                      {s.id}. {s.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed text-sm md:text-base whitespace-pre-line">
                      {s.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Footer note */}
            <div className="pt-8 text-center">
              <p className="text-slate-300 font-medium mb-4 italic">
                By using our services, you acknowledge and accept this Privacy Policy.
              </p>
              <p className="text-xs text-slate-600 uppercase tracking-widest font-bold">
                © 2024 LegalVala Advisory • Registered in Agra, UP
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
