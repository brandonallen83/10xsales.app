// Add mock referrers data
export const mockReferrers: Referrer[] = [
  {
    id: 'ref1',
    name: 'James Wilson',
    email: 'james.w@email.com',
    phone: '(555) 123-7890',
    totalReferrals: 5,
    successfulReferrals: 3,
    totalCommissionGenerated: 1500,
    createdAt: '2024-01-01',
    lastReferralDate: '2024-02-15'
  },
  {
    id: 'ref2',
    name: 'Maria Garcia',
    email: 'maria.g@email.com',
    phone: '(555) 234-5678',
    totalReferrals: 8,
    successfulReferrals: 6,
    totalCommissionGenerated: 2400,
    createdAt: '2023-12-15',
    lastReferralDate: '2024-02-20'
  }
];

export const mockReferralRecords: ReferralRecord[] = [
  {
    id: 'rec1',
    referrerId: 'ref1',
    customerId: '1',
    date: '2024-02-15',
    status: 'converted',
    saleValue: 45000,
    notes: 'Family member referral'
  },
  {
    id: 'rec2',
    referrerId: 'ref2',
    customerId: '2',
    date: '2024-02-20',
    status: 'converted',
    saleValue: 65000,
    notes: 'Coworker referral'
  }
];

// Update mockCustomers to include referral information
export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    lastPurchaseDate: '2024-02-15',
    lastPurchaseAmount: 45000,
    isReferral: true,
    referredBy: {
      referrerId: 'ref1',
      referrerName: 'James Wilson',
      referralDate: '2024-02-10'
    },
    vehicle: {
      year: '2024',
      make: 'Toyota',
      model: 'Camry',
      type: 'sedan',
      dealNumber: 'D12345'
    },
    createdAt: '2024-01-01'
  },
  // ... rest of mock customers
];