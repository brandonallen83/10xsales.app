export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const SKILL_LEVEL_METRICS = {
  rookie: {
    label: 'Rising Star',
    description: 'Building your success story',
    prospectToAppointment: 0.2,
    appointmentToDemo: 0.6,
    demoToOffer: 0.5,
    offerToClose: 0.3
  },
  intermediate: {
    label: 'Deal Maker',
    description: 'Mastering your craft',
    prospectToAppointment: 0.3,
    appointmentToDemo: 0.7,
    demoToOffer: 0.6,
    offerToClose: 0.4
  },
  experienced: {
    label: 'Sales Ace',
    description: 'Leading by example',
    prospectToAppointment: 0.4,
    appointmentToDemo: 0.8,
    demoToOffer: 0.7,
    offerToClose: 0.5
  },
  expert: {
    label: 'Sales Legend',
    description: 'Setting new standards',
    prospectToAppointment: 0.5,
    appointmentToDemo: 0.9,
    demoToOffer: 0.8,
    offerToClose: 0.6
  }
};

export const AFTERMARKET_PRODUCTS = [
  'Extended Warranty',
  'GAP Insurance',
  'Paint Protection',
  'Fabric Protection',
  'Wheel & Tire Protection',
  'Maintenance Package',
  'Security System',
  'Window Tinting',
  'Rustproofing',
  'Accessories Package'
];

export const SUBSCRIPTION_PLANS = [
  {
    id: 'free',
    name: 'Free',
    tier: 'free',
    price: 0,
    billingPeriod: 'monthly',
    features: [
      'Basic sales tracking',
      'Simple goal setting',
      'Limited reporting',
      'Email support'
    ]
  },
  {
    id: 'pro',
    name: 'Professional',
    tier: 'pro',
    price: 29.99,
    billingPeriod: 'monthly',
    features: [
      'Advanced sales tracking',
      'Comprehensive goal management',
      'Full reporting suite',
      'AI-powered insights',
      'Priority support',
      'Team collaboration',
      'Custom commission structures',
      'Customer CRM',
      'Referral tracking',
      'VIN decoder access'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tier: 'enterprise',
    price: 99.99,
    billingPeriod: 'monthly',
    features: [
      'Everything in Professional',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced analytics',
      'Multi-dealership support',
      'API access',
      'Custom training',
      'SLA guarantees',
      'Unlimited users',
      'White-label options'
    ]
  }
];

export const NAVIGATION_FEATURES = {
  dashboard: [
    { name: 'Basic Stats', description: 'View basic sales statistics', requiredTier: 'free' },
    { name: 'AI Insights', description: 'Get AI-powered sales insights', requiredTier: 'pro' },
    { name: 'Custom Analytics', description: 'Advanced custom analytics', requiredTier: 'enterprise' }
  ],
  goals: [
    { name: 'Basic Goals', description: 'Set simple sales goals', requiredTier: 'free' },
    { name: 'Advanced Goals', description: 'Comprehensive goal management', requiredTier: 'pro' },
    { name: 'Team Goals', description: 'Multi-team goal tracking', requiredTier: 'enterprise' }
  ],
  sales: [
    { name: 'Basic Tracking', description: 'Track basic sales data', requiredTier: 'free' },
    { name: 'Advanced Tracking', description: 'Detailed sales analytics', requiredTier: 'pro' },
    { name: 'Enterprise Tools', description: 'Enterprise-level sales tools', requiredTier: 'enterprise' }
  ]
};