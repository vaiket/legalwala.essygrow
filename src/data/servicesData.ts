export interface ServiceProcess {
  step: string;
  title: string;
  description: string;
}

export interface ServiceData {
  id: string;
  category: string;
  title: string;
  description: string;
  price: string;
  time: string;
  icon: string;
  features: string[];
  popular?: boolean;
  documents: string[];
  process: ServiceProcess[];
}

const defaultProcess: ServiceProcess[] = [
  { step: '1', title: 'Consultation', description: 'Expert consultation to understand your requirements.' },
  { step: '2', title: 'Documentation', description: 'We collect and prepare all necessary documents.' },
  { step: '3', title: 'Processing', description: 'Your application is processed and submitted to the concerned authority.' },
  { step: '4', title: 'Completion', description: 'Receive your final documents/certificates upon successful completion.' }
];

const defaultDocs = [
  'PAN Card of Directors/Partners',
  'Aadhaar Card of Directors/Partners',
  'Passport Size Photographs',
  'Utility Bill for Registered Office',
  'Bank Statement or Cancelled Cheque'
];

export const businessServices: ServiceData[] = [
  {
    id: 'private-limited-company',
    category: 'company',
    title: 'Private Limited Company',
    description: 'Most popular business structure with limited liability and separate legal entity.',
    price: '₹8,999',
    time: '7-10 Days',
    icon: 'corporate_fare',
    features: ['Limited Liability', 'Separate Legal Entity', 'Easy Fundraising', 'Perpetual Succession'],
    popular: true,
    documents: defaultDocs,
    process: defaultProcess
  },
  {
    id: 'opc-company',
    category: 'company',
    title: 'One Person Company (OPC)',
    description: 'Single person company with limited liability protection.',
    price: '₹8,999',
    time: '5-7 Days',
    icon: 'person',
    features: ['Single Owner', 'Limited Liability', 'Separate Legal Entity', 'Easy Compliance'],
    documents: defaultDocs,
    process: defaultProcess
  },
  {
    id: 'public-limited-company',
    category: 'company',
    title: 'Public Limited Company',
    description: 'Company that can raise funds from the public through shares.',
    price: '₹8,999',
    time: '15-20 Days',
    icon: 'public',
    features: ['Public Fundraising', 'Limited Liability', 'Share Trading', 'Corporate Benefits'],
    documents: defaultDocs,
    process: defaultProcess
  },
  {
    id: 'partnership-firm',
    category: 'partnership',
    title: 'Partnership Firm',
    description: 'Business structure where two or more partners manage and operate the business.',
    price: '₹4,999',
    time: '3-5 Days',
    icon: 'handshake',
    features: ['Easy Formation', 'Shared Management', 'Tax Benefits', 'Flexibility'],
    documents: ['Partnership Deed', 'PAN Card of Partners', 'Address Proof of Partners', 'Office Address Proof'],
    process: defaultProcess
  },
  {
    id: 'llp-registration',
    category: 'partnership',
    title: 'Limited Liability Partnership (LLP)',
    description: 'Hybrid structure combining benefits of company and partnership.',
    price: '₹7,999',
    time: '5-7 Days',
    icon: 'groups',
    features: ['Limited Liability', 'Separate Legal Entity', 'Flexible Management', 'Tax Efficiency'],
    documents: defaultDocs,
    process: defaultProcess
  },
  {
    id: 'nidhi-company',
    category: 'other',
    title: 'Nidhi Company',
    description: 'Non-banking financial company dealing with lending and borrowing.',
    price: '₹12,999',
    time: '10-15 Days',
    icon: 'account_balance',
    features: ['NBFC Benefits', 'Member Deposits', 'Government Regulated', 'Financial Services'],
    documents: defaultDocs,
    process: defaultProcess
  },
  {
    id: 'producer-company',
    category: 'other',
    title: 'Producer Company',
    description: 'Company formed by producers for agricultural activities.',
    price: '₹10,999',
    time: '12-15 Days',
    icon: 'agriculture',
    features: ['Agricultural Focus', 'Producer Benefits', 'Government Support', 'Tax Advantages'],
    documents: defaultDocs,
    process: defaultProcess
  },
  {
    id: 'section-8-company',
    category: 'other',
    title: 'Section 8 Company',
    description: 'Non-profit company for charitable or social welfare purposes.',
    price: '₹9,999',
    time: '10-12 Days',
    icon: 'volunteer_activism',
    features: ['Non-Profit', 'Tax Exemptions', 'Social Welfare', 'Government Support'],
    documents: defaultDocs,
    process: defaultProcess
  }
];

export const registrationServices: ServiceData[] = [
  {
    id: 'gst-registration',
    category: 'tax',
    title: 'GST Registration',
    description: 'Mandatory registration for businesses with turnover above ₹40 lakhs (₹20 lakhs for special category states).',
    price: '₹1,999',
    time: '3-7 Days',
    icon: 'receipt_long',
    features: ['GSTIN Number', 'Tax Compliance', 'Input Tax Credit', 'Interstate Trade'],
    popular: true,
    documents: ['PAN Card of Business/Applicant', 'Aadhaar Card', 'Proof of Business Registration', 'Identity and Address Proof', 'Bank Account Statement/Cancelled Cheque'],
    process: defaultProcess
  },
  {
    id: 'pan-card',
    category: 'tax',
    title: 'PAN Card',
    description: 'Permanent Account Number for individuals and businesses - essential for financial transactions.',
    price: '₹299',
    time: '7-15 Days',
    icon: 'credit_card',
    features: ['Identity Proof', 'Tax Filing', 'Bank Account', 'Investments'],
    documents: ['Aadhaar Card', 'Passport Size Photograph', 'Date of Birth Proof'],
    process: defaultProcess
  },
  {
    id: 'tax-registration',
    category: 'tax',
    title: 'TAX Registration',
    description: 'Complete tax registration services for businesses including GST, PAN, and TAN registration.',
    price: '₹2,999',
    time: '7-10 Days',
    icon: 'account_balance',
    features: ['GST Registration', 'PAN Application', 'TAN Registration', 'Tax Compliance'],
    documents: defaultDocs,
    process: defaultProcess
  },
  {
    id: 'fssai-license',
    category: 'business',
    title: 'FSSAI License',
    description: 'Food Safety and Standards Authority of India license for food businesses.',
    price: '₹2,999',
    time: '15-20 Days',
    icon: 'restaurant',
    features: ['Food Business', 'Legal Compliance', 'Quality Assurance', 'Consumer Trust'],
    documents: ['Photo Identity of Promoters', 'Proof of Possession of Premises', 'List of Food Products', 'Partnership Deed/Certificate of Incorporation'],
    process: defaultProcess
  },
  {
    id: 'iec-code',
    category: 'business',
    title: 'Import Export Code (IEC)',
    description: 'Required for businesses engaged in import/export activities.',
    price: '₹2,499',
    time: '5-7 Days',
    icon: 'import_export',
    features: ['International Trade', 'Customs Clearance', 'Bank Transactions', 'Global Business'],
    documents: ['PAN Card', 'Bank Certificate/Cancelled Cheque', 'Address Proof of Business'],
    process: defaultProcess
  },
  {
    id: 'trademark-registration',
    category: 'intellectual',
    title: 'Trademark Registration',
    description: 'Protect your brand name, logo, and tagline from unauthorized use.',
    price: '₹3,999',
    time: '18-24 Months',
    icon: 'copyright',
    features: ['Brand Protection', 'Legal Rights', 'Exclusive Use', 'Asset Creation'],
    documents: ['Logo/Brand Name', 'Applicant Details', 'Form-48 (Signed Authorization)', 'Udyog Aadhar/MSME Certificate (Optional for Discount)'],
    process: defaultProcess
  },
  {
    id: 'copyright-registration',
    category: 'intellectual',
    title: 'Copyright Registration',
    description: 'Protect your creative works like books, music, software, and artistic works.',
    price: '₹2,499',
    time: '2-3 Months',
    icon: 'menu_book',
    features: ['Creative Protection', 'Legal Rights', 'Infringement Protection', 'Intellectual Asset'],
    documents: ['Copies of the Work', 'NOC from Publisher/Author', 'Applicant Identity Proof'],
    process: defaultProcess
  },
  {
    id: 'patent-registration',
    category: 'intellectual',
    title: 'Patent Registration',
    description: 'Protect your inventions and technological innovations.',
    price: '₹12,999',
    time: '3-5 Years',
    icon: 'lightbulb',
    features: ['Invention Protection', 'Exclusive Rights', 'Commercial Advantage', 'Legal Monopoly'],
    documents: ['Invention Disclosure', 'Technical Drawings', 'Applicant Details'],
    process: defaultProcess
  },
  {
    id: 'iso-9001',
    category: 'certification',
    title: 'ISO 9001 Certification',
    description: 'Quality management system certification for improved business processes.',
    price: '₹8,999',
    time: '2-3 Days',
    icon: 'verified',
    features: ['Quality Standard', 'Customer Trust', 'Process Improvement', 'Global Recognition'],
    documents: ['Business Registration Proof', 'Purchase/Sales Bills', 'Company Profile'],
    process: defaultProcess
  },
  {
    id: 'msme-registration',
    category: 'certification',
    title: 'MSME Registration',
    description: 'Micro, Small and Medium Enterprises registration for government benefits.',
    price: '₹999',
    time: '2-3 Days',
    icon: 'business',
    features: ['Government Benefits', 'Subsidies', 'Priority Lending', 'Tax Benefits'],
    documents: ['Aadhaar Card', 'PAN Card', 'Business Address Proof', 'Bank Account Details'],
    process: defaultProcess
  },
  {
    id: 'dsc-certificate',
    category: 'certification',
    title: 'Digital Signature Certificate (DSC)',
    description: 'Digital signature for online filing and secure transactions.',
    price: '₹1,999',
    time: '1-2 Days',
    icon: 'fingerprint',
    features: ['Digital Authentication', 'Online Filing', 'Secure Transactions', 'Legal Validity'],
    documents: ['PAN Card', 'Aadhaar Card', 'Passport Size Photo', 'Email & Mobile Number'],
    process: defaultProcess
  }
];

export const manageServices: ServiceData[] = [
  {
    id: 'bookkeeping-services',
    category: 'accounting',
    title: 'Bookkeeping Services',
    description: 'Professional bookkeeping to maintain accurate financial records and ensure compliance.',
    price: '₹4,999/month',
    time: 'Ongoing',
    icon: 'menu_book',
    features: ['Daily Transactions', 'Bank Reconciliation', 'Financial Reports', 'GST Compliance'],
    documents: ['Bank Statements', 'Sales Invoices', 'Purchase Bills', 'Expense Receipts'],
    process: defaultProcess
  },
  {
    id: 'accounting-services',
    category: 'accounting',
    title: 'Accounting Services',
    description: 'Complete accounting solutions for businesses of all sizes with expert guidance.',
    price: '₹7,999/month',
    time: 'Ongoing',
    icon: 'calculate',
    features: ['Financial Statements', 'Tax Planning', 'Budget Management', 'Cash Flow Analysis'],
    documents: ['Ledger Data', 'Bank Statements', 'Previous Year Audit Reports'],
    process: defaultProcess
  },
  {
    id: 'payroll-management',
    category: 'accounting',
    title: 'Payroll Management',
    description: 'Efficient payroll processing and compliance management for your employees.',
    price: '₹2,999/month',
    time: 'Ongoing',
    icon: 'payments',
    features: ['Salary Processing', 'Tax Deductions', 'PF/ESI Compliance', 'Payslip Generation'],
    documents: ['Employee Details', 'Attendance Records', 'Salary Structure Details'],
    process: defaultProcess
  },
  {
    id: 'gst-filing',
    category: 'compliance',
    title: 'GST Filing',
    description: 'Monthly/Quarterly GST return filing and compliance management.',
    price: '₹1,499/month',
    time: 'Monthly',
    icon: 'receipt_long',
    features: ['GSTR-1 Filing', 'GSTR-3B Filing', 'GST Reconciliation', 'Compliance Reports'],
    documents: ['Sales Register', 'Purchase Register', 'GST Login Credentials'],
    process: defaultProcess
  },
  {
    id: 'income-tax-filing',
    category: 'compliance',
    title: 'Income Tax Filing',
    description: 'Professional income tax return filing for individuals and businesses.',
    price: '₹2,999',
    time: 'Annual',
    icon: 'description',
    features: ['ITR Filing', 'Tax Planning', 'Deduction Optimization', 'Expert Consultation'],
    documents: ['Form 16/16A', 'Bank Statements', 'Investment Proofs', 'PAN & Aadhaar'],
    process: defaultProcess
  },
  {
    id: 'tds-tcs-compliance',
    category: 'compliance',
    title: 'TDS/TCS Compliance',
    description: 'Complete TDS/TCS compliance including filing and certificate management.',
    price: '₹1,999/month',
    time: 'Quarterly',
    icon: 'account_balance',
    features: ['TDS Deduction', 'Quarterly Filing', 'Form 16/16A', 'Compliance Reports'],
    documents: ['TAN Details', 'Deductor/Deductee Details', 'Challan Copies'],
    process: defaultProcess
  },
  {
    id: 'business-advisory',
    category: 'consulting',
    title: 'Business Advisory',
    description: 'Strategic business consulting for growth and operational efficiency.',
    price: '₹9,999',
    time: 'One-time',
    icon: 'trending_up',
    features: ['Growth Strategy', 'Process Optimization', 'Risk Assessment', 'Performance Analysis'],
    documents: ['Business Profile', 'Current Financials', 'Organizational Goals'],
    process: defaultProcess
  },
  {
    id: 'financial-planning',
    category: 'consulting',
    title: 'Financial Planning',
    description: 'Comprehensive financial planning and wealth management services.',
    price: '₹5,999',
    time: 'One-time',
    icon: 'savings',
    features: ['Investment Planning', 'Risk Management', 'Retirement Planning', 'Tax Optimization'],
    documents: ['Current Investments', 'Income Details', 'Future Goals/Obligations'],
    process: defaultProcess
  },
  {
    id: 'project-reports',
    category: 'reports',
    title: 'Project Reports',
    description: 'Detailed project reports for loans, investments, and business planning.',
    price: '₹12,999',
    time: '7-10 Days',
    icon: 'assignment',
    features: ['Feasibility Study', 'Financial Projections', 'Market Analysis', 'Risk Assessment'],
    documents: ['Business Plan Details', 'Market Research Data', 'Promoter Background'],
    process: defaultProcess
  },
  {
    id: 'audit-services',
    category: 'reports',
    title: 'Audit Services',
    description: 'Professional audit services for internal and statutory requirements.',
    price: '₹15,999',
    time: '15-20 Days',
    icon: 'find_in_page',
    features: ['Statutory Audit', 'Internal Audit', 'Tax Audit', 'Compliance Review'],
    documents: ['Financial Statements', 'Ledgers', 'Vouchers', 'Statutory Registers'],
    process: defaultProcess
  },
  {
    id: 'financial-modeling',
    category: 'reports',
    title: 'Financial Modeling',
    description: 'Custom financial models for business planning and decision making.',
    price: '₹8,999',
    time: '5-7 Days',
    icon: 'bar_chart',
    features: ['Revenue Models', 'Cost Analysis', 'Scenario Planning', 'Valuation Reports'],
    documents: ['Historical Financials', 'Assumptions/Projections', 'Market Benchmarks'],
    process: defaultProcess
  }
];

// For the "Services.tsx" generic page that mixes items, we can derive the allServices list 
// or define some that weren't included (like legal services). Let's define the missing ones here 
// and create a unified list.

export const legalServices: ServiceData[] = [
  {
    id: 'legal-documents',
    category: 'legal',
    title: 'Legal Documents',
    description: 'Drafting of various legal documents and agreements',
    price: '₹1,999',
    time: '2-3 Days',
    icon: 'description',
    features: ['Custom Drafting', 'Legal Vetting', 'Expert Review', 'Quick Delivery'],
    documents: ['Basic Requirements', 'Parties Details'],
    process: defaultProcess
  },
  {
    id: 'partnership-deed',
    category: 'legal',
    title: 'Partnership Deed',
    description: 'Comprehensive partnership agreement drafting',
    price: '₹2,999',
    time: '2-3 Days',
    icon: 'handshake',
    features: ['Custom Drafting', 'Terms & Conditions', 'Legal Review'],
    documents: ['Partner Details', 'Business Terms'],
    process: defaultProcess
  },
  {
    id: 'employment-contract',
    category: 'legal',
    title: 'Employment Contract',
    description: 'Professional employment contract drafting',
    price: '₹1,499',
    time: '1-2 Days',
    icon: 'badge',
    features: ['Roles & Responsibilities', 'Compensation terms', 'Confidentiality Clauses'],
    documents: ['Employee Details', 'Offer Terms'],
    process: defaultProcess
  },
  {
    id: 'nda-agreement',
    category: 'legal',
    title: 'NDA Agreement',
    description: 'Non-disclosure agreement for confidentiality',
    price: '₹999',
    time: '1-2 Days',
    icon: 'security',
    features: ['Confidentiality', 'Non-Compete', 'Legal Review'],
    documents: ['Parties Details', 'Scope of Confidentiality'],
    process: defaultProcess
  },
  {
    id: 'rent-agreement',
    category: 'legal',
    title: 'Rent Agreement',
    description: 'Residential and commercial rent agreement drafting',
    price: '₹1,999',
    time: '2-3 Days',
    icon: 'apartment',
    features: ['Terms & Conditions', 'Notarization Assistance', 'Quick Delivery'],
    documents: ['Owner ID', 'Tenant ID', 'Property Details'],
    process: defaultProcess
  },
  {
    id: 'legal-notice',
    category: 'legal',
    title: 'Legal Notice',
    description: 'Legal notice drafting and sending services',
    price: '₹1,999',
    time: '3-5 Days',
    icon: 'mail',
    features: ['Expert Drafting', 'Legal Review', 'Dispatch'],
    documents: ['Case Details', 'Supporting Evidence'],
    process: defaultProcess
  },
  {
    id: 'power-of-attorney',
    category: 'legal',
    title: 'Power of Attorney',
    description: 'Power of attorney document drafting',
    price: '₹2,499',
    time: '3-5 Days',
    icon: 'gavel',
    features: ['General/Special POA', 'Legal Review', 'Registration Assistance'],
    documents: ['Principal ID', 'Agent ID', 'Property/Asset Details'],
    process: defaultProcess
  },
  {
    id: 'will-and-testament',
    category: 'legal',
    title: 'Will & Testament',
    description: 'Legal will drafting for asset distribution',
    price: '₹3,999',
    time: '5-7 Days',
    icon: 'article',
    features: ['Asset Distribution', 'Executor Appointment', 'Legal Review'],
    documents: ['Testator ID', 'Asset Details', 'Beneficiary Details'],
    process: defaultProcess
  },
  {
    id: 'shareholder-agreement',
    category: 'legal',
    title: 'Shareholder Agreement',
    description: 'Shareholder agreement drafting and consultation',
    price: '₹4,999',
    time: '3-5 Days',
    icon: 'groups',
    features: ['Rights & Duties', 'Equity Splitting', 'Legal Review'],
    documents: ['Company Details', 'Shareholder Details'],
    process: defaultProcess
  }
];

export const taxServices: ServiceData[] = [
  ...registrationServices.filter(s => s.category === 'tax'),
  {
    id: 'tax-planning',
    category: 'tax',
    title: 'Tax Planning',
    description: 'Professional tax planning and optimization services',
    price: '₹5,999',
    time: 'Consultation',
    icon: 'savings',
    features: ['Optimization', 'Deduction Strategies', 'Investment Planning'],
    documents: ['Current Financials', 'Income Streams', 'Investment Portfolio'],
    process: defaultProcess
  }
];

// Unified list to lookup any service by ID
export const globalServicesList: ServiceData[] = [
  ...businessServices,
  ...registrationServices,
  ...manageServices,
  ...legalServices,
  ...taxServices
];

export const getServiceById = (id: string | undefined): ServiceData | undefined => {
  if (!id) return undefined;
  return globalServicesList.find(service => service.id === id);
};
