import { createClient } from '@libsql/client';
import * as dotenv from 'dotenv';
dotenv.config();

const client = createClient({
  url: process.env.VITE_DATABASE_URL ?? '',
  authToken: process.env.VITE_DATABASE_AUTH_TOKEN ?? '',
});

const schema = `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  dealership TEXT NOT NULL,
  hashed_password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  expires_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS sales (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  date TEXT NOT NULL,
  front_end_profit INTEGER NOT NULL,
  back_end_profit INTEGER NOT NULL,
  is_flat INTEGER DEFAULT 0,
  flat_amount INTEGER,
  bonus_amount INTEGER,
  total_commission INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS aftermarket_products (
  id TEXT PRIMARY KEY,
  sale_id TEXT NOT NULL REFERENCES sales(id),
  name TEXT NOT NULL,
  profit INTEGER NOT NULL,
  commission INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS goals (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  year INTEGER NOT NULL,
  month INTEGER NOT NULL,
  target_units INTEGER NOT NULL,
  target_income INTEGER NOT NULL,
  target_aftermarket REAL NOT NULL,
  target_commission INTEGER NOT NULL,
  skill_level TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sales_user_date ON sales(user_id, date);
CREATE INDEX IF NOT EXISTS idx_goals_user_year_month ON goals(user_id, year, month);
CREATE INDEX IF NOT EXISTS idx_aftermarket_sale ON aftermarket_products(sale_id);
`;

async function pushSchema() {
  try {
    console.log('Connecting to database...');
    console.log('URL:', process.env.VITE_DATABASE_URL);
    
    console.log('Pushing schema...');
    await client.execute(schema);
    console.log('Schema pushed successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error pushing schema:', error);
    process.exit(1);
  }
}

pushSchema();