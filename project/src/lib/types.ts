export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  isReferral?: boolean;
  referrerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Referrer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  referralCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Sale {
  id: string;
  date: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  vehicleInfo: {
    vin: string;
    miles: string;
    make: string;
    model: string;
    year: string;
    dealNumber: string;
  };
  dealType: 'whole' | 'split';
  isReferral: boolean;
  referrerId?: string;
  frontEndProfit: number;
  backEndProfit: number;
  isFlat: boolean;
  flatAmount?: number;
  aftermarketProducts: Array<{
    name: string;
    profit: number;
    commission: number;
  }>;
  bonusAmount?: number;
  totalCommission: number;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  features: string[];
  isActive: boolean;
}
// in types.ts
export interface Referral {
  id?: string;
  date: string;
  referrerId: string;
  customerId: string;
  saleId?: string;
  status: 'pending' | 'converted' | 'lost';
  notes?: string;
}