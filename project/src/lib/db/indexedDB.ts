import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { nanoid } from 'nanoid';
import type { Sale, Customer, Referrer, Referral } from '../types';

interface AutoSalesDB extends DBSchema {
  sales: {
    key: string;
    value: Sale;
    indexes: {
      'by-date': string;
      'by-customer': string;
    };
  };
  customers: {
    key: string;
    value: Customer;
    indexes: {
      'by-email': string;
      'by-name': string;
      'by-referrer': string;
    };
  };
  referrers: {
    key: string;
    value: Referrer;
    indexes: {
      'by-email': string;
      'by-name': string;
      'by-referral-count': number;
    };
  };
  referrals: {
    key: string;
    value: Referral;
    indexes: {
      'by-date': string;
      'by-status': string;
      'by-referrer': string;
    };
  };
}

let db: IDBPDatabase<AutoSalesDB>;

export async function initDB(): Promise<void> {
  if (!db) {
    db = await openDB<AutoSalesDB>('autosales-db', 1, {
      upgrade(db) {
        // Sales store
        if (!db.objectStoreNames.contains('sales')) {
          const salesStore = db.createObjectStore('sales', { keyPath: 'id' });
          salesStore.createIndex('by-date', 'date');
          salesStore.createIndex('by-customer', 'customerInfo.name');
        }

        // Customers store
        if (!db.objectStoreNames.contains('customers')) {
          const customersStore = db.createObjectStore('customers', { keyPath: 'id' });
          customersStore.createIndex('by-email', 'email', { unique: false }); // Changed to false to handle duplicates
          customersStore.createIndex('by-name', 'name');
          customersStore.createIndex('by-referrer', 'referredBy.referrerId');
        }

        // Referrers store
        if (!db.objectStoreNames.contains('referrers')) {
          const referrersStore = db.createObjectStore('referrers', { keyPath: 'id' });
          referrersStore.createIndex('by-email', 'email', { unique: false }); // Changed to false to handle duplicates
          referrersStore.createIndex('by-name', 'name');
          referrersStore.createIndex('by-referral-count', 'referralCount');
        }

        // Referrals store
        if (!db.objectStoreNames.contains('referrals')) {
          const referralsStore = db.createObjectStore('referrals', { keyPath: 'id' });
          referralsStore.createIndex('by-date', 'date');
          referralsStore.createIndex('by-status', 'status');
          referralsStore.createIndex('by-referrer', 'referrerId');
        }
      }
    });
  }
  return db;
}

async function getDB() {
  if (!db) {
    await initDB();
  }
  return db;
}

// Sales Functions
export async function addSale(sale: Omit<Sale, 'id'>): Promise<string> {
  const db = await getDB();
  const id = nanoid();
  const tx = db.transaction(['sales', 'referrers'], 'readwrite');

  // Add the sale
  await tx.objectStore('sales').add({ ...sale, id });

  // Update referrer stats if this is a referral sale
  if (sale.referrerInfo) {
    const referrerStore = tx.objectStore('referrers');
    const referrer = await referrerStore.get(sale.referrerInfo.id);
    if (referrer) {
      await referrerStore.put({
        ...referrer,
        referralCount: (referrer.referralCount || 0) + 1,
        totalCommissionGenerated: (referrer.totalCommissionGenerated || 0) + sale.totalCommission,
        lastReferralDate: new Date().toISOString()
      });
    }
  }

  await tx.done;
  return id;
}

export async function getAllSales(): Promise<Sale[]> {
  const db = await getDB();
  return db.getAllFromIndex('sales', 'by-date');
}

export async function updateSale(id: string, sale: Partial<Sale>): Promise<void> {
  const db = await getDB();
  const existingSale = await db.get('sales', id);
  if (existingSale) {
    await db.put('sales', { ...existingSale, ...sale });
  }
}

export async function deleteSale(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('sales', id);
}

// Customer Functions
export async function addCustomer(customer: Omit<Customer, 'id'>): Promise<string> {
  const db = await getDB();
  const id = nanoid();
  
  // Handle potential duplicate emails by appending a unique identifier
  if (customer.email) {
    const existingCustomers = await db.getAllFromIndex('customers', 'by-email', customer.email);
    if (existingCustomers.length > 0) {
      customer.email = `${customer.email}-${id.slice(0, 6)}`;
    }
  }
  
  await db.add('customers', { ...customer, id });
  return id;
}

export async function getAllCustomers(): Promise<Customer[]> {
  const db = await getDB();
  return db.getAllFromIndex('customers', 'by-name');
}

export async function updateCustomer(id: string, customer: Partial<Customer>): Promise<void> {
  const db = await getDB();
  const existingCustomer = await db.get('customers', id);
  if (existingCustomer) {
    await db.put('customers', { ...existingCustomer, ...customer });
  }
}

export async function deleteCustomer(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('customers', id);
}

// Referrer Functions
export async function addReferrer(referrer: Omit<Referrer, 'id'>): Promise<string> {
  const db = await getDB();
  const id = nanoid();
  
  // Initialize referrer stats
  const newReferrer = {
    ...referrer,
    id,
    referralCount: 0,
    totalCommissionGenerated: 0,
    createdAt: new Date().toISOString(),
    lastReferralDate: null
  };
  
  await db.add('referrers', newReferrer);
  return id;
}

export async function getAllReferrers(): Promise<Referrer[]> {
  const db = await getDB();
  return db.getAllFromIndex('referrers', 'by-referral-count');
}

export async function updateReferrer(id: string, referrer: Partial<Referrer>): Promise<void> {
  const db = await getDB();
  const existingReferrer = await db.get('referrers', id);
  if (existingReferrer) {
    await db.put('referrers', { ...existingReferrer, ...referrer });
  }
}

export async function deleteReferrer(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('referrers', id);
}

// Referral Functions
export async function addReferral(referral: Omit<Referral, 'id'>): Promise<string> {
  const db = await getDB();
  const id = nanoid();
  
  const newReferral = {
    ...referral,
    id,
    status: 'pending',
    date: new Date().toISOString(),
    tags: referral.tags || []
  };
  
  await db.add('referrals', newReferral);
  return id;
}

export async function getAllReferrals(): Promise<Referral[]> {
  const db = await getDB();
  return db.getAllFromIndex('referrals', 'by-date');
}

export async function getReferralsByReferrer(referrerId: string): Promise<Referral[]> {
  const db = await getDB();
  return db.getAllFromIndex('referrals', 'by-referrer', referrerId);
}

export async function updateReferral(id: string, referral: Partial<Referral>): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(['referrals', 'customers', 'referrers'], 'readwrite');
  
  const existingReferral = await tx.objectStore('referrals').get(id);
  if (!existingReferral) return;

  // Handle conversion
  if (referral.status === 'converted' && existingReferral.status !== 'converted') {
    // Move to customers if not already there
    const customersStore = tx.objectStore('customers');
    const referrersStore = tx.objectStore('referrers');
    
    // Add as customer
    await customersStore.add({
      id: nanoid(),
      name: existingReferral.name,
      email: existingReferral.email,
      phone: existingReferral.phone,
      isReferral: true,
      referredBy: {
        referrerId: existingReferral.referrerId,
        referralDate: existingReferral.date
      },
      purchaseDate: new Date().toISOString()
    });

    // Update referrer stats
    const referrer = await referrersStore.get(existingReferral.referrerId);
    if (referrer) {
      await referrersStore.put({
        ...referrer,
        referralCount: (referrer.referralCount || 0) + 1,
        lastReferralDate: new Date().toISOString()
      });
    }

    // Delete the referral
    await tx.objectStore('referrals').delete(id);
  } else {
    // Regular update
    await tx.objectStore('referrals').put({
      ...existingReferral,
      ...referral
    });
  }

  await tx.done;
}

export async function deleteReferral(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('referrals', id);
}

// Utility Functions
export async function clearDatabase(): Promise<void> {
  const db = await getDB();
  await Promise.all([
    db.clear('sales'),
    db.clear('customers'),
    db.clear('referrers'),
    db.clear('referrals')
  ]);
}

export async function exportData(): Promise<{
  sales: Sale[];
  customers: Customer[];
  referrers: Referrer[];
  referrals: Referral[];
}> {
  const db = await getDB();
  return {
    sales: await db.getAll('sales'),
    customers: await db.getAll('customers'),
    referrers: await db.getAll('referrers'),
    referrals: await db.getAll('referrals')
  };
}

export async function importData(data: {
  sales?: Sale[];
  customers?: Customer[];
  referrers?: Referrer[];
  referrals?: Referral[];
}): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(['sales', 'customers', 'referrers', 'referrals'], 'readwrite');
  
  if (data.sales) {
    await Promise.all(data.sales.map(sale => tx.objectStore('sales').put(sale)));
  }
  if (data.customers) {
    await Promise.all(data.customers.map(customer => tx.objectStore('customers').put(customer)));
  }
  if (data.referrers) {
    await Promise.all(data.referrers.map(referrer => tx.objectStore('referrers').put(referrer)));
  }
  if (data.referrals) {
    await Promise.all(data.referrals.map(referral => tx.objectStore('referrals').put(referral)));
  }
  
  await tx.done;
}