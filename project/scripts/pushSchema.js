import { createClient } from '@libsql/client';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '..', 'src', 'lib', 'db', 'schema.sql');
const schema = readFileSync(schemaPath, 'utf8');

const client = createClient({
  url: process.env.VITE_DATABASE_URL ?? '',
  authToken: process.env.VITE_DATABASE_AUTH_TOKEN ?? '',
});

async function pushSchema() {
  try {
    console.log('Connecting to database...');
    console.log('URL:', process.env.VITE_DATABASE_URL);
    
    console.log('Pushing schema...');
    await client.executeMultiple(schema);
    console.log('Schema pushed successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error pushing schema:', error);
    process.exit(1);
  }
}

pushSchema();