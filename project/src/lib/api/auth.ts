import { db } from '../db';
import { users, sessions, payPlans } from '../db/schema';
import { lucia } from '../auth';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { eq } from 'drizzle-orm';
import { sendWelcomeEmail } from '../email';

export async function registerUser(data: {
  email: string;
  password: string;
  name: string;
  dealership: string;
  payPlan: {
    frontEndPercentage: number;
    backEndPercentage: number;
    flatRateAftermarket: boolean;
    aftermarketRate: number;
  };
}) {
  try {
    // Check if email already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, data.email),
    });

    if (existingUser) {
      throw new Error('Email already registered');
    }

    const userId = generateId(15);
    const hashedPassword = await new Argon2id().hash(data.password);

    // Create user and related data in a transaction
    await db.transaction(async (tx) => {
      // Create user
      await tx.insert(users).values({
        id: userId,
        email: data.email,
        name: data.name,
        dealership: data.dealership,
        hashedPassword,
      });

      // Create pay plan
      await tx.insert(payPlans).values({
        id: generateId(15),
        userId,
        frontEndPercentage: data.payPlan.frontEndPercentage,
        backEndPercentage: data.payPlan.backEndPercentage,
        flatRateAftermarket: data.payPlan.flatRateAftermarket ? 1 : 0,
        aftermarketRate: data.payPlan.aftermarketRate,
      });
    });

    // Send welcome email
    await sendWelcomeEmail(data.email, data.name);

    // Create session
    const session = await lucia.createSession(userId, {});

    // Return user data along with session
    return {
      session,
      user: {
        id: userId,
        email: data.email,
        name: data.name,
        dealership: data.dealership,
        payPlan: data.payPlan,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Registration failed');
  }
}