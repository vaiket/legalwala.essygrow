import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { globalServicesList as allServices } from '../data/servicesData';

const Services: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const serviceCategories = [
    { id: 'all', name: 'All Services', icon: 'apps', count: 43 },
    { id: 'business', name: 'Business Setup', icon: 'business' },
    { id: 'tax', name: 'Tax Services', icon: 'receipt_long' },
    { id: 'compliance', name: 'Compliance', icon: 'verified' },
    { id: 'legal', name: 'Legal', icon: 'gavel' }
  ];



  const filteredServices = activeCategory === 'all'
    ? allServices
    : allServices.filter(service => service.category === activeCategory);

  return (
    <div className="min-h-screen bg-brand-bg text-white pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bricolage font-light text-brand-gold mb-6">Our Services</h1>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Comprehensive business solutions covering company registration, tax compliance,
            legal documentation, and business management services.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { number: '5000+', label: 'Happy Clients' },
            { number: '5000+', label: 'Services Delivered' },
            { number: '40+', label: 'Service Types' },
            { number: '99.2%', label: 'Satisfaction Rate' }
          ].map((stat, index) => (
            <div key={index} className="text-center bg-brand-surface border border-brand-border rounded-xl p-6">
              <div className="text-3xl font-bold text-brand-gold mb-2">{stat.number}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {serviceCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${activeCategory === category.id
                ? 'bg-brand-gold text-brand-bg font-bold'
                : 'bg-brand-surface border border-brand-border text-slate-300 hover:border-brand-gold hover:text-brand-gold'
                }`}
            >
              <span className="material-icons text-lg">{category.icon}</span>
              {category.name}
              {category.count !== undefined && (
                <span className="bg-brand-bg/20 px-2 py-1 rounded text-xs">{category.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredServices.map((service, index) => (
            <div key={index} className="bg-brand-surface border border-brand-border rounded-2xl p-6 hover:border-brand-gold transition-all group relative">
              {service.popular && (
                <div className="absolute -top-3 -right-3 bg-brand-gold text-brand-bg px-3 py-1 rounded-full text-xs font-bold">
                  POPULAR
                </div>
              )}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-brand-bg border border-brand-border rounded-lg flex items-center justify-center text-brand-gold">
                  <span className="material-icons text-xl">{service.icon}</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-brand-gold block">{service.price}</span>
                  <span className="text-xs text-slate-400">{service.time}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold font-bricolage text-white mb-3 group-hover:text-brand-gold transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="flex gap-3">
               <Link
  to={`/service/${service.id}`}
  className="w-full bg-transparent border border-brand-gold text-brand-gold font-semibold p-3 rounded-lg text-center transition-all duration-300 hover:bg-brand-gold hover:text-brand-bg"
>
  Get Started
</Link>
                <Link
                  to={`/service/${service.id}`}
                  className="px-4 py-2 border border-brand-border text-slate-300 rounded-lg hover:bg-brand-surface transition-all"
                >
                  <span className="material-icons text-sm">info</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Services */}
        <div className="bg-gradient-to-r from-brand-surface to-brand-surface-light border border-brand-border rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bricolage font-light text-white mb-8 text-center">Featured Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allServices.filter(s => s.popular).map((service, index) => (
              <div key={index} className="bg-brand-bg border border-brand-border rounded-xl p-6 text-center">
                <span className="material-icons text-brand-gold text-3xl block mb-3">{service.icon}</span>
                <h3 className="text-white font-bold font-bricolage mb-2">{service.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{service.description}</p>
                <div className="text-brand-gold font-bold mb-4">{service.price}</div>
                <Link
                  to={`/service/${service.id}`}
                  className="w-full btn-3d btn-gold px-4 py-2 rounded-lg font-bold text-sm text-center"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-brand-bg border border-brand-border rounded-2xl p-8">
          <h2 className="text-3xl font-bricolage font-light text-white mb-4">
            Need Custom Business Solutions?
          </h2>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
            Don't see the service you need? Our experts can create customized solutions
            tailored to your specific business requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/appointment" className="btn-3d btn-gold px-8 py-3 rounded-lg font-bold text-center">
              Book Consultation
            </Link>
            <Link to="/contact-us" className="px-8 py-3 border border-brand-border text-white font-semibold rounded-lg hover:bg-brand-surface transition-all text-center">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
