import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { manageServices } from '../data/servicesData';

const ManageBusiness: React.FC = () => {
  const [selectedService, setSelectedService] = useState('all');

  const serviceCategories = [
    { id: 'all', name: 'All Services', icon: 'business' },
    { id: 'accounting', name: 'Accounting', icon: 'account_balance' },
    { id: 'compliance', name: 'Compliance', icon: 'verified' },
    { id: 'consulting', name: 'Consulting', icon: 'lightbulb' },
    { id: 'reports', name: 'Reports', icon: 'assessment' }
  ];


  const filteredServices = selectedService === 'all'
    ? manageServices
    : manageServices.filter(service => service.category === selectedService);

  return (
    <div className="min-h-screen bg-brand-bg text-white pt-36 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bricolage font-light text-brand-gold mb-6">Manage Business</h1>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Comprehensive business management solutions including accounting, compliance,
            and consulting services to help your business thrive.
          </p>
        </div>

        {/* Service Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {serviceCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedService(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${selectedService === category.id
                ? 'bg-brand-gold text-brand-bg font-bold'
                : 'bg-brand-surface border border-brand-border text-slate-300 hover:border-brand-gold hover:text-brand-gold'
                }`}
            >
              <span className="material-icons text-lg">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredServices.map((service, index) => (
            <div key={index} className="bg-brand-surface border border-brand-border rounded-2xl p-6 hover:border-brand-gold transition-all group">
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

              <div className="mb-6">
                <h4 className="text-sm font-bold font-bricolage text-brand-gold mb-3 uppercase tracking-wider">Key Features</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300 text-sm">
                      <span className="material-icons text-brand-gold text-xs">check_circle</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
<Link
  to={`/service/${service.id}`}
  className="w-full bg-transparent border border-brand-gold text-brand-gold font-semibold p-3 rounded-lg text-center transition-all duration-300 hover:bg-brand-gold hover:text-brand-bg"
>
  Get Started
</Link>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="bg-gradient-to-r from-brand-surface to-brand-surface-light border border-brand-border rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bricolage font-light text-white mb-8 text-center">Our Management Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Assessment', desc: 'Understand your business needs and requirements', icon: 'assessment' },
              { step: '2', title: 'Planning', desc: 'Create customized strategy and implementation plan', icon: 'event_note' },
              { step: '3', title: 'Implementation', desc: 'Execute the plan with regular monitoring and updates', icon: 'play_circle' },
              { step: '4', title: 'Review', desc: 'Regular performance reviews and optimization', icon: 'analytics' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-brand-gold text-brand-bg rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <span className="material-icons text-brand-gold text-2xl block mb-3">{item.icon}</span>
                <h3 className="text-white font-bold font-bricolage mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            { title: 'Expert Team', desc: 'Experienced professionals handling your business needs', icon: 'groups', color: 'text-blue-400' },
            { title: 'Cost Effective', desc: 'Affordable pricing with no hidden charges', icon: 'savings', color: 'text-green-400' },
            { title: 'Timely Delivery', desc: 'On-time delivery of all services and reports', icon: 'schedule', color: 'text-yellow-400' },
            { title: 'Data Security', desc: 'Complete confidentiality and data protection', icon: 'security', color: 'text-red-400' },
            { title: '24/7 Support', desc: 'Round the clock support for all your queries', icon: 'support agent', color: 'text-purple-400' },
            { title: 'Customized Solutions', desc: 'Tailored services to meet your specific needs', icon: 'settings', color: 'text-orange-400' }
          ].map((benefit, index) => (
            <div key={index} className="bg-brand-bg border border-brand-border rounded-xl p-6 text-center">
              <span className={`material-icons text-3xl ${benefit.color} block mb-3`}>{benefit.icon}</span>
              <h3 className="text-white font-bold font-bricolage mb-2">{benefit.title}</h3>
              <p className="text-slate-400 text-sm">{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-brand-bg border border-brand-border rounded-2xl p-8">
          <h2 className="text-3xl font-bricolage font-light text-white mb-4">
            Ready to Streamline Your Business?
          </h2>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
            Let our experts handle your business management while you focus on growth.
            Get started with a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            

            <Link to="/appointment" className="btn-3d btn-gold px-8 py-3 rounded-lg font-bold">
                              Start Now→
                            </Link>
            <button className="px-8 py-3 border border-brand-border text-white font-semibold rounded-lg hover:bg-brand-surface transition-all">
              Free Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBusiness;
