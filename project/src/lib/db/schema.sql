CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  dealership TEXT NOT NULL,
  subscription_tier TEXT DEFAULT 'free',
  subscription_status TEXT DEFAULT 'active',
  subscription_start TIMESTAMP,
  subscription_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sales (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  date TEXT NOT NULL,
  customer_first_name TEXT NOT NULL,
  customer_last_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT,
  vehicle_vin TEXT,
  vehicle_make TEXT,
  vehicle_model TEXT,
  vehicle_year TEXT,
  is_flat INTEGER DEFAULT 0,
  flat_amount DECIMAL(10,2),
  front_end_profit DECIMAL(10,2) NOT NULL,
  back_end_profit DECIMAL(10,2) NOT NULL,
  bonus_amount DECIMAL(10,2),
  is_referral INTEGER DEFAULT 0,
  referrer_id TEXT,
  total_commission DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS aftermarket_products (
  id TEXT PRIMARY KEY,
  sale_id TEXT NOT NULL REFERENCES sales(id),
  name TEXT NOT NULL,
  profit DECIMAL(10,2) NOT NULL,
  commission DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  is_referral INTEGER DEFAULT 0,
  referrer_id TEXT,
  vehicle_info TEXT,
  purchase_date TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS referrers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  referral_count INTEGER DEFAULT 0,
  total_commission_generated DECIMAL(10,2) DEFAULT 0,
  last_referral_date TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS referrals (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  referrer_id TEXT NOT NULL,
  customer_id TEXT NOT NULL,
  status TEXT CHECK(status IN ('pending', 'contacted', 'converted', 'lost')) NOT NULL DEFAULT 'pending',
  sale_id TEXT,
  notes TEXT,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  sale_value DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sales_user_date ON sales(user_id, date);
CREATE INDEX IF NOT EXISTS idx_customers_referrer ON customers(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals(status);