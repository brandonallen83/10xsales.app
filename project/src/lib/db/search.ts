import { openDB } from 'idb';
import type { Customer, Referrer } from '../../types';
import { DB_NAME, DB_VERSION } from './constants';

async function getDB() {
  return openDB(DB_NAME, DB_VERSION);
}

export async function searchCustomers(query: string): Promise<Customer[]> {
  const db = await getDB();
  const allCustomers = await db.getAllFromIndex('customers', 'by-name');
  return allCustomers.filter(customer => 
    customer.name.toLowerCase().includes(query.toLowerCase()) ||
    customer.email?.toLowerCase().includes(query.toLowerCase())
  );
}

export async function searchReferrers(query: string): Promise<Referrer[]> {
  const db = await getDB();
  const allReferrers = await db.getAllFromIndex('referrers', 'by-name');
  return allReferrers.filter(referrer => 
    referrer.name.toLowerCase().includes(query.toLowerCase()) ||
    referrer.email?.toLowerCase().includes(query.toLowerCase())
  );
}