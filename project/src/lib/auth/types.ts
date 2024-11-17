import type { User as LuciaUser } from "lucia";

export interface DatabaseUserAttributes {
  email: string;
  name: string;
  dealership: string;
  subscription_tier: string;
  subscription_status: string;
  subscription_start: string;
  subscription_end: string;
}

export type AuthUser = LuciaUser & DatabaseUserAttributes;