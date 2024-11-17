export interface Sale {
  id: string;
  date: string;
  customerFirstName: string;
  customerLastName: string;
  customerEmail?: string;
  customerPhone?: string;
  vehicleInfo?: {
    vin: string;
    make: string;
    model: string;
    year: string;
    dealNumber: string;
  };
  isFlat: boolean;
  flatAmount?: number;
  frontEndProfit: number;
  backEndProfit: number;
  aftermarketProducts?: Array<{
    name: string;
    profit: number;
    commission: number;
  }>;
  bonusAmount?: number;
  isReferral: boolean;
  referrerId?: string;
  totalCommission: number;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  isReferral: boolean;
  referrerId?: string;
  vehicle?: {
    vin: string;
    make: string;
    model: string;
    year: string;
    type: string;
    price: number;
  };
  purchaseDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Referrer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  referralCount: number;
  totalCommissionGenerated: number;
  createdAt: string;
  lastReferralDate?: string;
}

export interface Referral {
  id: string;
  date: string;
  referrerId: string;
  customerId: string;
  status: 'pending' | 'contacted' | 'converted' | 'lost';
  saleId?: string;
  notes?: string;
  name: string;
  email?: string;
  phone?: string;
  saleValue?: number;
}

export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

export interface SalesGoal {
  month: string;
  year: number;
  skillLevel: string;
  targetUnits: number;
  targetIncome: number;
  targetAftermarket: number;
  targetCommission: number;
}

export interface SkillLevelMetrics {
  label: string;
  description: string;
  prospectToAppointment: number;
  appointmentToDemo: number;
  demoToOffer: number;
  offerToClose: number;
}

export type SkillLevel = 'rookie' | 'intermediate' | 'experienced' | 'expert';

export interface User {
  id: string;
  email: string;
  name: string;
  dealership: string;
  subscription: {
    tier: SubscriptionTier;
    status: 'active' | 'inactive';
    currentPeriodStart: string;
    currentPeriodEnd: string;
  };
}