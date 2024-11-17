import { createClient } from '@libsql/client';

export const db = createClient({
  url: import.meta.env.VITE_DATABASE_URL ?? '',
  authToken: import.meta.env.VITE_DATABASE_AUTH_TOKEN ?? ''
});

// Helper function to convert snake_case to camelCase
export function snakeToCamel<T>(obj: Record<string, any>): T {
  const newObj: Record<string, any> = {};
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      newObj[camelKey] = obj[key];
    }
  }
  
  return newObj as T;
}

// Helper function to convert camelCase to snake_case
export function camelToSnake(obj: Record<string, any>): Record<string, any> {
  const newObj: Record<string, any> = {};
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      newObj[snakeKey] = obj[key];
    }
  }
  
  return newObj;
}