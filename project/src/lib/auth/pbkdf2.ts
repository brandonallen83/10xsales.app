export async function pbkdf2(
  password: string, 
  salt: Uint8Array, 
  iterations: number, 
  keylen: number
): Promise<Uint8Array> {
  const enc = new TextEncoder();
  const passwordKey = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  
  const params = {
    name: 'PBKDF2',
    hash: 'SHA-256',
    salt: salt,
    iterations: iterations
  };
  
  const derivedBits = await crypto.subtle.deriveBits(
    params,
    passwordKey,
    keylen * 8
  );
  
  return new Uint8Array(derivedBits);
}