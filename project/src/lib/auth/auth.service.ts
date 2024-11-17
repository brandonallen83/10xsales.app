import { generateId } from "lucia";
import { hashPassword } from "./password";
import type { User } from "../../types";
import { db } from "../db/client";

export class AuthService {
  static async registerUser(data: {
    email: string;
    password: string;
    name: string;
    dealership: string;
  }): Promise<{ user: User; sessionId: string }> {
    const userId = generateId(15);
    const hashedPassword = await hashPassword(data.password);

    try {
      await db.execute({
        sql: `INSERT INTO users (id, email, name, dealership, hashed_password)
              VALUES (?, ?, ?, ?, ?)`,
        args: [userId, data.email, data.name, data.dealership, hashedPassword]
      });

      const session = await this.createSession(userId);

      return {
        user: {
          id: userId,
          email: data.email,
          name: data.name,
          dealership: data.dealership,
          subscription: {
            tier: 'free',
            status: 'active',
            currentPeriodStart: new Date().toISOString(),
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          }
        },
        sessionId: session
      };
    } catch (error) {
      if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
        throw new Error('Email already registered');
      }
      throw error;
    }
  }

  private static async createSession(userId: string): Promise<string> {
    const sessionId = generateId(15);
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await db.execute({
      sql: `INSERT INTO sessions (id, user_id, expires_at)
            VALUES (?, ?, ?)`,
      args: [sessionId, userId, expiresAt.toISOString()]
    });

    return sessionId;
  }
}