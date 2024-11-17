import { nanoid } from 'nanoid';
import { getDB } from './index';
import type { Customer } from '../types';

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

export async function getCustomer(id: string): Promise<Customer | undefined> {
  const db = await getDB();
  return db.get('customers', id);
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

export async function getCustomersByReferrer(referrerId: string): Promise<Customer[]> {
  const db = await getDB();
  return db.getAllFromIndex('customers', 'by-referrer', referrerId);
}