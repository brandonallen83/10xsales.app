import { createClient } from '@libsql/client';
import * as dotenv from 'dotenv';
dotenv.config();

const client = createClient({
  url: process.env.VITE_DATABASE_URL ?? '',
  authToken: process.env.VITE_DATABASE_AUTH_TOKEN ?? '',
});

async function testConnection() {
  try {
    console.log('Testing database connection...');
    console.log('URL:', process.env.VITE_DATABASE_URL);
    
    const result = await client.execute('SELECT 1');
    console.log('Database connection successful!');
    console.log('Test query result:', result);
    
    process.exit(0);
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

testConnection();