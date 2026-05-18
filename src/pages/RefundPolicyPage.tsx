import React from 'react';

const RefundPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-bg text-slate-300 font-sans selection:bg-brand-gold/30 selection:text-brand-gold">
      {/* Hero Header */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,55,0.08)_0%,transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-widest mb-6">
              <span className="material-icons text-sm">payments</span>
              Financial Policy
            </div>
            <h1 className="text-5xl md:text-7xl font-bricolage font-bold text-white mb-6 tracking-tight">
              Refund <span className="text-brand-gold italic">Policy</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              At Legalvala, we strive to provide high-quality legal and business consultancy services. This Refund Policy outlines the terms under which refunds may be granted.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Quick Stats Bento */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-brand-surface border border-brand-gold/20 p-8 rounded-[2rem] shadow-xl relative group overflow-hidden">
              <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:scale-110 transition-transform text-brand-gold">
                <span className="material-icons text-9xl">schedule</span>
              </div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Processing Window</h3>
              <p className="text-4xl font-bold text-white mb-2">20 <span className="text-brand-gold text-lg uppercase font-mono">Days</span></p>
              <p className="text-sm text-slate-400">Refunds are processed within 20 working days from approval.</p>
            </div>

            <div className="bg-brand-surface border border-brand-gold/20 p-8 rounded-[2rem] shadow-xl relative group overflow-hidden">
              <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:scale-110 transition-transform text-brand-gold">
                <span className="material-icons text-9xl">receipt</span>
              </div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Admin Charges</h3>
              <p className="text-4xl font-bold text-white mb-2">30<span className="text-brand-gold text-lg font-mono">%</span></p>
              <p className="text-sm text-slate-400">Deducted as administrative and processing charges if eligible.</p>
            </div>

            <div className="bg-brand-gold p-8 rounded-[2rem] shadow-2xl shadow-brand-gold/20 text-brand-bg group transition-all hover:scale-[1.02]">
              <h3 className="text-xs font-bold text-brand-bg/60 uppercase tracking-widest mb-6">Contact Billing</h3>
              <p className="text-2xl font-bold mb-4 leading-tight font-bricolage">Need assistance with your refund?</p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm font-bold">
                  <span className="material-icons text-sm">email</span>
                  support@legalvala.com
                </div>
                <div className="flex items-center gap-2 text-sm font-bold">
                  <span className="material-icons text-sm">phone</span>
                  9286495921
                </div>
              </div>
              <a href="mailto:support@legalvala.com" className="inline-flex items-center gap-2 font-bold text-sm bg-brand-bg text-brand-gold px-4 py-2 rounded-lg hover:gap-3 transition-all">
                Send Request
                <span className="material-icons text-sm">arrow_forward</span>
              </a>
            </div>
          </div>

          {/* Main Policy Content (Timeline Style) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-brand-surface/40 backdrop-blur-xl border border-white/5 p-10 rounded-[2.5rem] shadow-2xl">
              
              {/* Point 1 */}
              <div className="flex gap-8">
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold font-bold mb-4 font-mono">1</div>
                  <div className="w-px h-full bg-gradient-to-b from-brand-gold/20 to-transparent" />
                </div>
                <div className="flex-1 pb-12">
                  <h2 className="text-2xl font-bold text-white mb-4">1. General Policy</h2>
                  <ul className="list-disc pl-5 text-slate-400 space-y-2">
                    <li>All payments made to Legalvala are considered final and non-refundable unless stated otherwise.</li>
                    <li>By making a payment, the client agrees to this Refund Policy.</li>
                  </ul>
                </div>
              </div>

              {/* Point 2 */}
              <div className="flex gap-8">
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold font-bold mb-4 font-mono">2</div>
                  <div className="w-px h-full bg-gradient-to-b from-brand-gold/20 to-transparent" />
                </div>
                <div className="flex-1 pb-12">
                  <h2 className="text-2xl font-bold text-white mb-4">2. Refund & Adjustment Policy</h2>
                  <div className="bg-brand-bg/40 p-6 rounded-2xl border border-white/5 mb-4 text-slate-400">
                    <p className="mb-4">In case the client requests a refund after making the payment, and no substantial work has been initiated from our side, the client will have the option to:</p>
                    <ul className="list-disc pl-8 space-y-2 mb-4">
                      <li>Adjust the paid amount against any future service with Legalvala, or</li>
                      <li>Request a refund.</li>
                    </ul>
                    <ul className="list-disc pl-5 space-y-3">
                      <li>If the client opts for a refund, <span className="text-brand-gold font-bold">30% of the total amount</span> will be deducted as administrative and processing charges.</li>
                      <li>The remaining refund amount will be processed within 20 working days from the date of approval of the refund request.</li>
                      <li>For the purpose of this policy, work initiated includes consultation, documentation, drafting, or filing of any application.</li>
                      <li>The final decision regarding refund or adjustment shall be at the sole discretion of Legalvala.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Point 3 */}
              <div className="flex gap-8">
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 font-bold mb-4 font-mono">3</div>
                  <div className="w-px h-full bg-gradient-to-b from-red-500/20 to-transparent" />
                </div>
                <div className="flex-1 pb-12">
                  <h2 className="text-2xl font-bold text-white mb-4">3. Non-Refundable Cases</h2>
                  <p className="text-slate-400 mb-4 font-medium italic">No refund will be provided in the following situations:</p>
                  <ul className="list-disc pl-5 text-slate-400 space-y-2">
                    <li>Once the work has been initiated or documents have been submitted to government authorities.</li>
                    <li>Rejection of application by government authorities (MCA, GST, Trademark, etc.).</li>
                    <li>Delay caused due to incomplete or incorrect documents provided by the client.</li>
                    <li>Change of mind after payment.</li>
                    <li>Delay caused by government processes or third-party professionals.</li>
                  </ul>
                </div>
              </div>

              {/* Point 4 */}
              <div className="flex gap-8">
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold font-bold mb-4 font-mono">4</div>
                  <div className="w-px h-full bg-gradient-to-b from-brand-gold/20 to-transparent" />
                </div>
                <div className="flex-1 pb-12">
                  <h2 className="text-2xl font-bold text-white mb-4">4. Government Fees & Third-Party Charges</h2>
                  <ul className="list-disc pl-5 text-slate-400 space-y-2">
                    <li>Government fees, taxes, and third-party charges are strictly non-refundable.</li>
                    <li>These charges are paid to respective authorities and are beyond our control.</li>
                  </ul>
                </div>
              </div>

              {/* Point 5 */}
              <div className="flex gap-8">
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold font-bold mb-4 font-mono">5</div>
                  <div className="w-px h-full bg-gradient-to-b from-brand-gold/20 to-transparent" />
                </div>
                <div className="flex-1 pb-12">
                  <h2 className="text-2xl font-bold text-white mb-4">5. Processing of Refund</h2>
                  <ul className="list-disc pl-5 text-slate-400 space-y-2">
                    <li>Eligible refunds will be processed within 20 working days.</li>
                    <li>Refunds will be credited to the original payment method only.</li>
                    <li>Legalvala reserves the right to verify the request before processing.</li>
                  </ul>
                </div>
              </div>

              {/* Point 6 */}
              <div className="flex gap-8">
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold font-bold mb-4 font-mono">6</div>
                  <div className="w-px h-full bg-gradient-to-b from-brand-gold/20 to-transparent" />
                </div>
                <div className="flex-1 pb-12">
                  <h2 className="text-2xl font-bold text-white mb-4">6. Cancellation Policy</h2>
                  <ul className="list-disc pl-5 text-slate-400 space-y-2">
                    <li>Cancellation requests must be made via email before the work is initiated.</li>
                    <li>Once the service process has started, cancellation will not be accepted.</li>
                  </ul>
                </div>
              </div>

              {/* Point 7 */}
              <div className="flex gap-8">
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold font-bold mb-4 font-mono">7</div>
                  <div className="w-px h-full bg-gradient-to-b from-brand-gold/20 to-transparent" />
                </div>
                <div className="flex-1 pb-12">
                  <h2 className="text-2xl font-bold text-white mb-4">7. Modification of Policy</h2>
                  <p className="text-slate-400">Legalvala reserves the right to modify this Refund Policy at any time without prior notice.</p>
                </div>
              </div>

              {/* Point 8 */}
              <div className="flex gap-8">
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold font-bold mb-4 font-mono">8</div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-4">8. Contact Us</h2>
                  <div className="bg-brand-gold/10 p-6 rounded-2xl border border-brand-gold/20 text-slate-400 space-y-2">
                    <p>📧 Email: support@legalvala.com</p>
                    <p>📞 Phone: 9286495921</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
