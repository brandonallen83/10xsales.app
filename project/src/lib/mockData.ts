import { nanoid } from 'nanoid';
import type { Sale, Customer, Referrer, Referral } from '../types';

// Generate unique IDs
const generateId = () => nanoid();

// Mock sales data
export const MOCK_SALES: Sale[] = [
  {
    id: generateId(),
    date: new Date().toISOString(),
    frontEndProfit: 2500,
    backEndProfit: 1500,
    isFlat: false,
    aftermarketProducts: [
      {
        name: 'Tire & Wheel Protection',
        profit: 1000,
        commission: 200
      },
      {
        name: 'Vehicle Service Contract',
        profit: 2000,
        commission: 400
      }
    ],
    totalCommission: 4600,
    bonusAmount: 0
  },
  {
    id: generateId(),
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    frontEndProfit: 3000,
    backEndProfit: 2000,
    isFlat: false,
    aftermarketProducts: [
      {
        name: 'Paint Protection',
        profit: 1500,
        commission: 300
      }
    ],
    totalCommission: 5300,
    bonusAmount: 0
  }
];

// Mock customers data with unique emails
export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: generateId(),
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    purchaseDate: new Date().toISOString(),
    isReferral: false,
    vehicle: {
      vin: '1HGCM82633A123456',
      year: '2024',
      make: 'Toyota',
      model: 'Camry',
      type: 'sedan'
    }
  },
  {
    id: generateId(),
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '(555) 234-5678',
    purchaseDate: new Date(Date.now() - 86400000).toISOString(),
    isReferral: true,
    referredBy: {
      referrerId: 'ref1',
      referrerName: 'James Wilson',
      referralDate: new Date(Date.now() - 172800000).toISOString()
    },
    vehicle: {
      vin: '2HGES16575H123456',
      year: '2024',
      make: 'Honda',
      model: 'Accord',
      type: 'sedan'
    }
  }
];

// Mock referrers data with unique emails
export const MOCK_REFERRERS: Referrer[] = [
  {
    id: generateId(),
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    phone: '(555) 345-6789',
    referralCount: 3,
    totalCommissionGenerated: 15000,
    createdAt: new Date(Date.now() - 2592000000).toISOString() // 30 days ago
  },
  {
    id: generateId(),
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    phone: '(555) 456-7890',
    referralCount: 5,
    totalCommissionGenerated: 25000,
    createdAt: new Date(Date.now() - 5184000000).toISOString() // 60 days ago
  }
];

// Mock referrals data
export const MOCK_REFERRALS: Referral[] = [
  {
    id: generateId(),
    date: new Date().toISOString(),
    referrerId: MOCK_REFERRERS[0].id,
    customerId: MOCK_CUSTOMERS[1].id,
    status: 'converted',
    notes: 'Family member referral',
    saleValue: 45000
  },
  {
    id: generateId(),
    date: new Date(Date.now() - 86400000).toISOString(),
    referrerId: MOCK_REFERRERS[1].id,
    customerId: generateId(),
    status: 'pending',
    notes: 'Coworker referral'
  }
];

// Industry news articles
export const MOCK_ARTICLES = [
  {
    title: "EV Sales Continue Strong Growth Trend",
    link: "https://www.autonews.com/retail/ev-sales-hit-new-record",
    pubDate: new Date().toISOString(),
    description: "Electric vehicle sales show continued momentum in the market"
  },
  {
    title: "Digital Retail Transforms Car Buying Experience",
    link: "https://www.autonews.com/retail/digital-retail-transformation",
    pubDate: new Date(Date.now() - 86400000).toISOString(),
    description: "Dealerships adapt to changing consumer preferences with digital solutions"
  },
  {
    title: "New F&I Products Drive Profitability",
    link: "https://www.autonews.com/finance-insurance/fi-products-2024",
    pubDate: new Date(Date.now() - 172800000).toISOString(),
    description: "Innovative F&I products help dealers increase per-vehicle revenue"
  }
];

// Getter functions
export function getMockSales(): Sale[] {
  return [...MOCK_SALES];
}

export function getMockCustomers(): Customer[] {
  return [...MOCK_CUSTOMERS];
}

export function getMockReferrers(): Referrer[] {
  return [...MOCK_REFERRERS];
}

export function getMockReferrals(): Referral[] {
  return [...MOCK_REFERRALS];
}

export function getMockArticles() {
  return [...MOCK_ARTICLES];
}

// Helper function to initialize demo data
export async function initializeDemoData(db: any) {
  try {
    // Clear existing data first
    await db.clear('sales');
    await db.clear('customers');
    await db.clear('referrers');
    await db.clear('referrals');

    // Add mock data with transaction to ensure atomicity
    const tx = db.transaction(['sales', 'customers', 'referrers', 'referrals'], 'readwrite');

    // Add sales
    await Promise.all(MOCK_SALES.map(sale => tx.objectStore('sales').add(sale)));

    // Add customers
    await Promise.all(MOCK_CUSTOMERS.map(customer => tx.objectStore('customers').add(customer)));

    // Add referrers
    await Promise.all(MOCK_REFERRERS.map(referrer => tx.objectStore('referrers').add(referrer)));

    // Add referrals
    await Promise.all(MOCK_REFERRALS.map(referral => tx.objectStore('referrals').add(referral)));

    await tx.done;
  } catch (error) {
    console.error('Error initializing demo data:', error);
    throw error;
  }
}