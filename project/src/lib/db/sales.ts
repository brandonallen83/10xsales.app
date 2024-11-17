import { getDB } from './index';
import type { Sale } from '../types';
import { nanoid } from 'nanoid';

export async function getAllSales(): Promise<Sale[]> {
  const db = await getDB();
  return db.getAllFromIndex('sales', 'by-date');
}

export async function addSale(saleData: Omit<Sale, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const db = await getDB();
  const id = nanoid();
  const now = new Date().toISOString();
  
  const sale: Sale = {
    id,
    ...saleData,
    createdAt: now,
    updatedAt: now
  };

  try {
    const tx = db.transaction(['sales', 'customers', 'referrers'], 'readwrite');
    
    // Add sale
    await tx.objectStore('sales').add(sale);

    // Add or update customer
    const customerStore = tx.objectStore('customers');
    const customerId = nanoid();
    await customerStore.add({
      id: customerId,
      name: `${saleData.customerFirstName} ${saleData.customerLastName}`,
      email: saleData.customerEmail,
      phone: saleData.customerPhone,
      isReferral: saleData.isReferral,
      referrerId: saleData.referrerId,
      vehicle: saleData.vehicleInfo,
      purchaseDate: saleData.date,
      createdAt: now,
      updatedAt: now
    });

    // Update referrer stats if applicable
    if (saleData.isReferral && saleData.referrerId) {
      const referrerStore = tx.objectStore('referrers');
      const referrer = await referrerStore.get(saleData.referrerId);
      if (referrer) {
        await referrerStore.put({
          ...referrer,
          referralCount: (referrer.referralCount || 0) + 1,
          totalCommissionGenerated: (referrer.totalCommissionGenerated || 0) + sale.totalCommission,
          lastReferralDate: now
        });
      }
    }

    await tx.done;
    return id;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to add sale to database');
  }
}