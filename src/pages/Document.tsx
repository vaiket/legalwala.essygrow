import React, { useState } from 'react';

const Document: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const documentCategories = [
    { id: 'all', name: 'All Documents', icon: 'description' },
    { id: 'business', name: 'Business Agreements', icon: 'business' },
    { id: 'employment', name: 'Employment', icon: 'work' },
    { id: 'legal', name: 'Legal', icon: 'gavel' },
    { id: 'property', name: 'Property', icon: 'home' }
  ];

  const documentServices = [
    {
      category: 'business',
      title: 'Partnership Deed',
      description: 'Comprehensive partnership agreement outlining rights, responsibilities, and profit sharing.',
      price: '₹2,999',
      icon: 'handshake'
    },
    {
      category: 'business',
      title: 'Shareholder Agreement',
      description: 'Legal document governing shareholder rights and company management.',
      price: '₹4,999',
      icon: 'groups'
    },
    {
      category: 'business',
      title: 'MOU (Memorandum of Understanding)',
      description: 'Formal agreement between parties before entering into a contract.',
      price: '₹1,999',
      icon: 'assignment'
    },
    {
      category: 'employment',
      title: 'Employment Contract',
      description: 'Comprehensive employment agreement with terms and conditions.',
      price: '₹1,499',
      icon: 'badge'
    },
    {
      category: 'employment',
      title: 'NDA (Non-Disclosure Agreement)',
      description: 'Protect your confidential information with legally binding NDA.',
      price: '₹999',
      icon: 'security'
    },
    {
      category: 'employment',
      title: 'Independent Contractor Agreement',
      description: 'Agreement for freelance or contract work arrangements.',
      price: '₹1,299',
      icon: 'engineering'
    },
    {
      category: 'legal',
      title: 'Legal Notice',
      description: 'Draft and send legal notices for various legal matters.',
      price: '₹1,999',
      icon: 'mail'
    },
    {
      category: 'legal',
      title: 'Power of Attorney',
      description: 'Legal document authorizing someone to act on your behalf.',
      price: '₹2,499',
      icon: 'gavel'
    },
    {
      category: 'legal',
      title: 'Will & Testament',
      description: 'Draft legally valid will for asset distribution.',
      price: '₹3,999',
      icon: 'article'
    },
    {
      category: 'property',
      title: 'Rent Agreement',
      description: 'Comprehensive rental agreement for residential and commercial properties.',
      price: '₹1,999',
      icon: 'apartment'
    },
    {
      category: 'property',
      title: 'Sale Deed',
      description: 'Legal document for property transfer and sale.',
      price: '₹4,999',
      icon: 'real_estate_agent'
    },
    {
      category: 'property',
      title: 'Gift Deed',
      description: 'Legal document for gifting property or assets.',
      price: '₹2,999',
      icon: 'card_giftcard'
    }
  ];

  const filteredDocuments = selectedCategory === 'all' 
    ? documentServices 
    : documentServices.filter(doc => doc.category === selectedCategory);

  return (
    <div className="min-h-screen bg-brand-bg text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bricolage font-light text-brand-gold mb-6">Legal Documents</h1>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Professional legal document drafting services for all your business and personal needs. 
            Get legally binding documents drafted by experts at affordable prices.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {documentCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                selectedCategory === category.id
                  ? 'bg-brand-gold text-brand-bg font-bold'
                  : 'bg-brand-surface border border-brand-border text-slate-300 hover:border-brand-gold hover:text-brand-gold'
              }`}
            >
              <span className="material-icons text-lg">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredDocuments.map((service, index) => (
            <div key={index} className="bg-brand-surface border border-brand-border rounded-2xl p-6 hover:border-brand-gold transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-brand-bg border border-brand-border rounded-lg flex items-center justify-center text-brand-gold">
                  <span className="material-icons text-xl">{service.icon}</span>
                </div>
                <span className="text-2xl font-bold text-brand-gold">{service.price}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-gold transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                {service.description}
              </p>
              <button className="w-full bg-brand-bg border border-brand-gold text-brand-gold font-semibold py-3 rounded-lg hover:bg-brand-gold hover:text-brand-bg transition-all">
                Get Document
              </button>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-brand-surface to-brand-surface-light border border-brand-border rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bricolage font-light text-white mb-4">
            Need a Custom Document?
          </h2>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
            Don't see the document you need? Our legal experts can draft custom documents 
            tailored to your specific requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-3d btn-gold px-8 py-3 rounded-lg font-bold">
              Request Custom Document
            </button>
            <button className="px-8 py-3 border border-brand-border text-white font-semibold rounded-lg hover:bg-brand-surface transition-all">
              Consult Expert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Document;
