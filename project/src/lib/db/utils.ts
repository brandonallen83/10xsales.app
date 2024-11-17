import { openDB } from 'idb';
import type { Sale, Customer, Referrer, Referral } from '../../types';
import { DB_NAME, DB_VERSION } from './constants';

async function getDB() {
  return openDB(DB_NAME, DB_VERSION);
}

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