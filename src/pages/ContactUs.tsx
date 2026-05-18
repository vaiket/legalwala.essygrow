import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

// ─── Replace these with your actual EmailJS credentials ───
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // e.g. 'abc123XYZ'

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [finalSuccess, setFinalSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'name') {
      const onlyLetters = value.replace(/\d/g, '');
      setFormData(prev => ({ ...prev, [name]: onlyLetters }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = { name: '', email: '', phone: '', subject: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSending(true);

    const templateParams = {
      to_name:    'LegalVala Team',
      from_name:  formData.name,
      from_email: formData.email,
      phone:      formData.phone || 'Not provided',
      subject:    formData.subject,
      message:    formData.message,
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
      const message = `LegalVala Contact Inquiry
---------------------------
Name    : ${formData.name}
Email   : ${formData.email}
Phone   : ${formData.phone}
Subject : ${formData.subject}
Message : ${formData.message}`;

      const waUrl = `https://wa.me/919286495921?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
      
      // Show success message even if WhatsApp opens
      setFinalSuccess(true);
    } finally {
      setIsSending(false);
    }
  };

  const contactInfo = [
    {
      icon: 'location_on',
      title: 'Office Address',
      details: ['131, Jawahar Puram Albatiya Road Shahganj Agra Uttar Pradesh 282010'],
      color: 'text-red-400'
    },
    {
      icon: 'phone',
      title: 'Phone Numbers',
      details: ['+91 9286495921'],
      color: 'text-green-400'
    },
    {
      icon: 'email',
      title: 'Email Addresses',
      details: ['info@legalvala.com', 'support@legalvala.com'],
      color: 'text-blue-400'
    },
    {
      icon: 'schedule',
      title: 'Business Hours',
      details: ['Monday - Saturday : 10:00 AM - 7:00 PM', 'Sunday: Closed'],
      color: 'text-yellow-400'
    }
  ];

  const socialLinks = [
    { name: 'Facebook',       type: 'svg', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>', url: 'https://www.facebook.com/share/1XuQ8Wv51W/' },
    { name: 'YouTube',        icon: 'smart_display', url: 'https://youtube.com/@legalvala-lv?si=odX22h1beUAOayK4' },
    { name: 'LinkedIn',       type: 'svg', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>', url: 'https://www.linkedin.com/in/lvclegalvala-consultancy-llp-07ba9835a' },
    { name: 'Instagram',      type: 'svg', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>', url: 'https://www.instagram.com/legalvala?igsh=MXZ4ZW5oMWJsaGJvbw==' },
    { name: 'Google Reviews', icon: 'star', url: 'https://www.google.com/search?q=Legalvala+Reviews' }
  ];

  const faqs = [
    { question: 'How quickly will I receive a response?',    answer: 'We typically respond to all inquiries within 24 hours during business days.' },
    { question: 'Do you provide free initial consultation?', answer: 'Yes, we offer a free 15-minute initial consultation to understand your requirements.' },
    { question: 'What services do you offer?',              answer: 'We offer comprehensive business solutions including company registration, tax compliance, legal documentation, and business management services.' },
    { question: 'Can I schedule an appointment online?',    answer: 'Yes, you can schedule appointments through our appointment booking page or by calling us directly.' }
  ];

  return (
    <div className="min-h-screen bg-brand-bg text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bricolage font-light text-brand-gold mb-6">Contact Us</h1>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Get in touch with our expert team for any business, legal, or compliance queries.
            We're here to help you navigate your business journey with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-8">
              <h2 className="text-2xl font-bricolage font-bold text-white mb-6">Send Us a Message</h2>

              {finalSuccess ? (
                <div className="mb-6 p-10 bg-brand-surface border border-brand-gold rounded-2xl text-center">
                  <div className="w-20 h-20 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-icons text-brand-gold text-4xl">check_circle</span>
                  </div>
                  <h3 className="text-white font-bold text-2xl mb-4">Message Received!</h3>
                  <p className="text-slate-400 mb-8">
                    Thank you for reaching out. Our team has received your message and will get back to you within 2 business hours.
                  </p>
                  <button
                    onClick={() => setFinalSuccess(false)}
                    className="px-8 py-3 bg-brand-gold text-brand-bg rounded-xl font-bold hover:scale-105 transition-all"
                  >
                    Back to Contact
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text" name="name" value={formData.name} onChange={handleInputChange} required
                        className={`w-full px-4 py-3 bg-brand-bg border ${errors.name ? 'border-red-500' : 'border-brand-border'} rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold transition-colors`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address *</label>
                      <input
                        type="email" name="email" value={formData.email} onChange={handleInputChange} required
                        className={`w-full px-4 py-3 bg-brand-bg border ${errors.email ? 'border-red-500' : 'border-brand-border'} rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold transition-colors`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Phone Number</label>
                      <input
                        type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold transition-colors"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Subject *</label>
                      <select
                        name="subject" value={formData.subject} onChange={handleInputChange} required
                        className={`w-full px-4 py-3 bg-brand-bg border ${errors.subject ? 'border-red-500' : 'border-brand-border'} rounded-lg text-white focus:outline-none focus:border-brand-gold transition-colors`}
                      >
                        <option value="">Select a subject</option>
                        <option value="business-inquiry">Business Inquiry</option>
                        <option value="service-request">Service Request</option>
                        <option value="support">Support</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Message *</label>
                    <textarea
                      name="message" value={formData.message} onChange={handleInputChange} required rows={6}
                      className={`w-full px-4 py-3 bg-brand-bg border ${errors.message ? 'border-red-500' : 'border-brand-border'} rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold transition-colors resize-none`}
                      placeholder="Tell us how we can help you..."
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full btn-3d btn-gold px-6 py-3 rounded-lg font-bold disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSending ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-brand-surface border border-brand-border rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <span className={`material-icons text-2xl ${info.color}`}>{info.icon}</span>
                  <div>
                    <h3 className="text-white font-bold mb-3">{info.title}</h3>
                    <div className="space-y-2">
                      {info.details.map((detail, idx) => {
                        if (info.title === 'Email Addresses') {
                          return (
                            <a key={idx} href={`mailto:${detail}`} className="text-slate-400 text-sm hover:text-brand-gold transition-colors flex items-center gap-2">
                              <span className="material-icons" style={{ fontSize: '16px' }}>mail</span>
                              {detail}
                            </a>
                          );
                        } else if (info.title === 'Phone Numbers') {
                          return (
                            <a key={idx} href={`tel:${detail.replace(/[\n\s]/g, '')}`} className="text-slate-400 text-sm hover:text-brand-gold transition-colors flex items-start gap-2">
                              <span className="material-icons mt-1" style={{ fontSize: '16px' }}>call</span>
                              <span className="whitespace-pre-wrap">{detail}</span>
                            </a>
                          );
                        }
                        return <p key={idx} className="text-slate-400 text-sm whitespace-pre-wrap">{detail}</p>;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="bg-gradient-to-r from-brand-surface to-brand-surface-light border border-brand-border rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index} href={social.url} title={social.name}
                    className="w-10 h-10 border border-brand-border rounded-lg flex items-center justify-center transition-all"
                    style={{ backgroundColor: 'var(--brand-bg, #08080a)', color: '#d4af37' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d4af37'; e.currentTarget.style.color = '#08080a'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--brand-bg, #08080a)'; e.currentTarget.style.color = '#d4af37'; }}
                  >
                    {(social as any).type === 'svg'
                      ? <span className="w-5 h-5" dangerouslySetInnerHTML={{ __html: (social as any).svg }} />
                      : <span className="material-icons text-lg">{(social as any).icon}</span>
                    }
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bricolage font-bold text-white mb-6">Find Us on Map</h2>
          <div className="bg-brand-bg border border-brand-border rounded-xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.1234567890123!2d78.12345678901234!3d27.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDA3JzI0LjQiTiA3OMKwMDcnMjQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="Legalvala Consultancy Location"
            />
          </div>
          <p className="text-slate-500 text-sm mt-4 text-center">131, Jawahar Puram Albatiya Road Shahganj Agra Uttar Pradesh 282010</p>
        </div>

        {/* FAQ */}
        <div className="bg-gradient-to-r from-brand-surface to-brand-surface-light border border-brand-border rounded-2xl p-8">
          <h2 className="text-2xl font-bricolage font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-brand-bg border border-brand-border rounded-xl p-6">
                <h3 className="text-white font-bold mb-3">{faq.question}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bricolage font-bold text-white mb-6">Quick Links</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'Book Appointment', url: '/appointment' },
              { name: 'Our Services',     url: '/services' },
              { name: 'About Us',         url: '/about-us' },

            ].map((link, index) => (
              <a key={index} href={link.url} className="px-6 py-3 bg-brand-surface border border-brand-border rounded-lg text-slate-300 hover:border-brand-gold hover:text-brand-gold transition-all">
                {link.name}
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;