import { createClient } from "@libsql/client";

const client = createClient({
  url: import.meta.env.VITE_DATABASE_URL ?? "",
  authToken: import.meta.env.VITE_DATABASE_AUTH_TOKEN
});

export async function createUser(data: {
  email: string;
  name: string;
  dealership: string;
  hashedPassword: string;
}) {
  const userId = crypto.randomUUID();
  
  await client.execute({
    sql: `INSERT INTO user (id, email, name, dealership) VALUES (?, ?, ?, ?)`,
    args: [userId, data.email, data.name, data.dealership]
  });

  await client.execute({
    sql: `INSERT INTO user_key (id, user_id, hashed_password) VALUES (?, ?, ?)`,
    args: [crypto.randomUUID(), userId, data.hashedPassword]
  });

  return userId;
}

export async function getUser(userId: string) {
  const result = await client.execute({
    sql: `SELECT * FROM user WHERE id = ?`,
    args: [userId]
  });
  
  return result.rows[0];
}

export async function getUserByEmail(email: string) {
  const result = await client.execute({
    sql: `SELECT * FROM user WHERE email = ?`,
    args: [email]
  });
  
  return result.rows[0];
}

export async function createSession(userId: string) {
  const sessionId = crypto.randomUUID();
  const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
  
  await client.execute({
    sql: `INSERT INTO user_session (id, user_id, active_expires, idle_expires) VALUES (?, ?, ?, ?)`,
    args: [sessionId, userId, expiresAt, expiresAt]
  });
  
  return sessionId;
}

export async function getSession(sessionId: string) {
  const result = await client.execute({
    sql: `SELECT * FROM user_session WHERE id = ? AND active_expires > ?`,
    args: [sessionId, Date.now()]
  });
  
  return result.rows[0];
}

export async function deleteSession(sessionId: string) {
  await client.execute({
    sql: `DELETE FROM user_session WHERE id = ?`,
    args: [sessionId]
  });
}