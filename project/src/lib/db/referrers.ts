import { getDB } from './index';
import type { Referrer } from '../types';
import { nanoid } from 'nanoid';

export async function getAllReferrers(): Promise<Referrer[]> {
  const db = await getDB();
  return db.getAllFromIndex('referrers', 'by-referral-count');
}

export async function addReferrer(referrerData: Omit<Referrer, 'id' | 'referralCount' | 'totalCommissionGenerated' | 'createdAt'>): Promise<string> {
  const db = await getDB();
  const id = nanoid();
  
  const referrer: Referrer = {
    id,
    ...referrerData,
    referralCount: 0,
    totalCommissionGenerated: 0,
    createdAt: new Date().toISOString()
  };

  try {
    await db.add('referrers', referrer);
    return id;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to add referrer to database');
  }
}

export async function updateReferrerStats(id: string): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(['referrers', 'referrals', 'sales'], 'readwrite');
  
  try {
    const referrer = await tx.objectStore('referrers').get(id);
    if (!referrer) {
      throw new Error('Referrer not found');
    }

    const referrals = await tx.objectStore('referrals')
      .index('by-referrer')
      .getAll(id);

    const convertedCount = referrals.filter(r => r.status === 'converted').length;
    const totalCommission = referrals.reduce((sum, r) => sum + (r.saleValue || 0), 0);

    await tx.objectStore('referrers').put({
      ...referrer,
      referralCount: convertedCount,
      totalCommissionGenerated: totalCommission,
      lastReferralDate: referrals.length > 0 
        ? new Date(Math.max(...referrals.map(r => new Date(r.date).getTime()))).toISOString()
        : referrer.lastReferralDate
    });

    await tx.done;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to update referrer stats');
  }
}