import { getDB } from './index';
import type { Referral } from '../types';
import { nanoid } from 'nanoid';

export async function getAllReferrals(): Promise<Referral[]> {
  const db = await getDB();
  return db.getAllFromIndex('referrals', 'by-date');
}

export async function addReferral(referralData: Omit<Referral, 'id' | 'status'>): Promise<string> {
  const db = await getDB();
  const id = nanoid();
  
  const referral: Referral = {
    id,
    ...referralData,
    status: 'pending'
  };

  try {
    await db.add('referrals', referral);
    return id;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to add referral to database');
  }
}

export async function updateReferralStatus(
  id: string,
  status: Referral['status'],
  saleValue?: number
): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(['referrals', 'customers', 'referrers'], 'readwrite');
  
  try {
    const referral = await tx.objectStore('referrals').get(id);
    if (!referral) {
      throw new Error('Referral not found');
    }

    await tx.objectStore('referrals').put({
      ...referral,
      status,
      saleValue,
      updatedAt: new Date().toISOString()
    });

    await tx.done;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to update referral status');
  }
}