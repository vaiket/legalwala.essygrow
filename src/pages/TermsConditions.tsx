import React from 'react';

const TermsConditions: React.FC = () => {
  const sections = [
    { id: 1, title: 'Introduction', content: 'Legalvala is a legal and business consultancy firm providing services such as company registration, GST registration & filing, income tax filing, trademark registration, ISO certification, and other related compliance services.' },
    { id: 2, title: 'Services', content: 'All services provided by Legalvala are based on the information and documents submitted by the client.\nWe do not guarantee approval from government authorities, as approvals depend on respective departments.\nTimelines provided are estimated and may vary depending on government processing.' },
    { id: 3, title: 'Client Responsibilities', content: 'Clients must provide accurate, complete, and genuine documents.\nLegalvala will not be responsible for delays or rejection caused due to incorrect or incomplete information.\nThe client is responsible for verifying all final documents before submission.' },
    { id: 4, title: 'Payment Terms', content: 'All service fees must be paid in advance unless otherwise agreed.\nGovernment fees, taxes, and third-party charges are separate unless explicitly mentioned.\nOnce payment is made, it is considered acceptance of our terms.' },
    { id: 5, title: 'Refund Policy', content: 'Fees once paid are non-refundable, except in cases where Legalvala fails to initiate the service.\nNo refund will be provided after work has been started or documents have been submitted.\nIn case of duplicate payment, the extra amount will be refunded after verification.' },
    { id: 6, title: 'Limitation of Liability', content: 'Legalvala shall not be liable for any indirect, incidental, or consequential damages.\nWe are not responsible for any penalties imposed due to client non-compliance or delay in submission of documents.' },
    { id: 7, title: 'Confidentiality', content: 'All client information and documents will be kept confidential and used only for service purposes. We do not share client data with third parties without consent, except where required by law.' },
    { id: 8, title: 'Third-Party Services', content: 'Some services may involve third-party professionals or government portals. Legalvala is not responsible for delays or issues caused by third parties.' },
    { id: 9, title: 'Termination of Services', content: 'Legalvala reserves the right to terminate services if the client is involved in illegal or fraudulent activities. No refund will be provided in such cases.' },
    { id: 10, title: 'Intellectual Property', content: 'All website content, branding, and materials are the property of Legalvala. Unauthorized use is strictly prohibited.' },
    { id: 11, title: 'Changes to Terms', content: 'Legalvala reserves the right to modify these terms at any time without prior notice. Continued use of the website means acceptance of updated terms.' },
    { id: 12, title: 'Governing Law', content: 'These terms shall be governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Agra, Uttar Pradesh.' },
    { id: 13, title: 'Contact Information', content: 'For any queries, contact us:\n📧 Email: support@legalvala.com\n📞 Phone: 9286495921' }
  ];

  return (
    <div className="min-h-screen bg-brand-bg text-slate-300 font-sans selection:bg-brand-gold/30 selection:text-brand-gold">
      {/* Hero Header */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in">
            <span className="material-icons text-sm">security</span>
            Legal Framework
          </div>
          <h1 className="text-5xl md:text-7xl font-bricolage font-bold text-white mb-6 tracking-tight">
            Terms of <span className="text-brand-gold italic">Service</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Welcome to Legalvala. By accessing or using our website and services, you agree to comply with and be bound by the following Terms & Conditions. Please read them carefully.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sticky Navigation Sidebar */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-32 space-y-2 bg-brand-surface/30 backdrop-blur-xl border border-white/5 p-4 rounded-3xl">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest px-4 mb-4">Table of Contents</p>
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => document.getElementById(`section-${s.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 transition-all group flex items-center gap-3 border border-transparent hover:border-white/5"
                >
                  <span className="text-[10px] font-mono text-slate-600 group-hover:text-brand-gold">0{s.id > 9 ? s.id : `0${s.id}`}</span>
                  <span className="text-sm font-medium group-hover:text-white truncate">{s.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-6">
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
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-brand-gold transition-colors">{s.id}. {s.title}</h3>
                      <p className="text-slate-400 leading-relaxed text-sm md:text-base whitespace-pre-line">
                        {s.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Note */}
            <div className="pt-12 text-center">
              <p className="text-slate-300 font-medium mb-4 italic">
                By using our services, you agree to these Terms & Conditions.
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

export default TermsConditions;
