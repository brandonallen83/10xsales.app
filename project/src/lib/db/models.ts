export interface User {
  id: string;
  email: string;
  name: string;
  dealership: string;
  hashedPassword: string;
  createdAt: string;
}

export interface Sale {
  id: string;
  userId: string;
  date: string;
  frontEndProfit: number;
  backEndProfit: number;
  aftermarketProducts: string;
  totalCommission: number;
  createdAt: string;
}

export interface Goal {
  id: string;
  userId: string;
  year: number;
  month: number;
  targetUnits: number;
  targetIncome: number;
  skillLevel: string;
  createdAt: string;
}