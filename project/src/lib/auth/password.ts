import { pbkdf2 } from './pbkdf2';

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await pbkdf2(password, salt, 100000, 32);
  const hash = new Uint8Array(salt.length + key.length);
  hash.set(salt);
  hash.set(key, salt.length);
  return btoa(String.fromCharCode(...hash));
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const hash = Uint8Array.from(atob(hashedPassword), c => c.charCodeAt(0));
  const salt = hash.slice(0, 16);
  const key = hash.slice(16);
  const newKey = await pbkdf2(password, salt, 100000, 32);
  return key.every((b, i) => b === newKey[i]);
}