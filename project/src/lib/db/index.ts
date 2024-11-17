import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { Sale, Customer, Referral, Referrer } from '../types';

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
      'by-tag': string[];
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
      'by-tag': string[];
      'by-last-updated': string;
    };
  };
}

let db: IDBPDatabase<AutoSalesDB>;

export async function getDB(): Promise<IDBPDatabase<AutoSalesDB>> {
  if (!db) {
    try {
      db = await openDB<AutoSalesDB>('autosales-db', 1, {
        upgrade(db) {
          // Sales store
          if (!db.objectStoreNames.contains('sales')) {
            const salesStore = db.createObjectStore('sales', { keyPath: 'id' });
            salesStore.createIndex('by-date', 'date');
            salesStore.createIndex('by-customer', 'customerFirstName');
          }

          // Customers store
          if (!db.objectStoreNames.contains('customers')) {
            const customersStore = db.createObjectStore('customers', { keyPath: 'id' });
            customersStore.createIndex('by-email', 'email', { unique: false });
            customersStore.createIndex('by-name', 'name');
            customersStore.createIndex('by-tag', 'tags', { multiEntry: true });
          }

          // Referrers store
          if (!db.objectStoreNames.contains('referrers')) {
            const referrersStore = db.createObjectStore('referrers', { keyPath: 'id' });
            referrersStore.createIndex('by-email', 'email', { unique: false });
            referrersStore.createIndex('by-name', 'name');
            referrersStore.createIndex('by-referral-count', 'referralCount');
          }

          // Referrals store
          if (!db.objectStoreNames.contains('referrals')) {
            const referralsStore = db.createObjectStore('referrals', { keyPath: 'id' });
            referralsStore.createIndex('by-date', 'date');
            referralsStore.createIndex('by-status', 'status');
            referralsStore.createIndex('by-referrer', 'referrerId');
            referralsStore.createIndex('by-tag', 'tags', { multiEntry: true });
            referralsStore.createIndex('by-last-updated', 'lastUpdated');
          }
        }
      });
    } catch (error) {
      console.error('Failed to open database:', error);
      throw new Error('Database initialization failed');
    }
  }
  return db;
}

export async function clearDB(): Promise<void> {
  try {
    const db = await getDB();
    const stores = ['sales', 'customers', 'referrers', 'referrals'] as const;
    const tx = db.transaction(stores, 'readwrite');
    await Promise.all(stores.map(store => tx.objectStore(store).clear()));
    await tx.done;
  } catch (error) {
    console.error('Failed to clear database:', error);
    throw new Error('Database cleanup failed');
  }
}

export async function closeDB(): Promise<void> {
  if (db) {
    try {
      db.close();
      db = undefined;
    } catch (error) {
      console.error('Failed to close database:', error);
      throw new Error('Database close failed');
    }
  }
}

// Initialize demo data
export async function initializeDemoData(): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(['sales', 'customers', 'referrers', 'referrals'], 'readwrite');

  try {
    // Add demo data here if needed
    await tx.done;
    console.log('Demo data initialized successfully');
  } catch (error) {
    console.error('Error initializing demo data:', error);
    throw error;
  }
}