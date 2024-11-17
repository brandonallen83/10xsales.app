import { useAuth } from '../context/AuthContext';
import type { SubscriptionTier } from '../types';

export function useFeatureAccess() {
  const { user } = useAuth();
  const userTier: SubscriptionTier = user?.subscription?.tier || 'free';

  const canAccess = (requiredTier: SubscriptionTier) => {
    const tiers: Record<SubscriptionTier, number> = {
      'free': 0,
      'pro': 1,
      'enterprise': 2
    };
    return tiers[userTier] >= tiers[requiredTier];
  };

  return {
    canAccess,
    userTier
  };
}