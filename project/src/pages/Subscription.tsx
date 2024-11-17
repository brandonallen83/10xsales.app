import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { SUBSCRIPTION_PLANS } from '../lib/constants';
import { Check, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import type { SubscriptionTier } from '../types';

export function Subscription() {
  const { user, updateSubscription } = useAuth();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSubscribe = async (tier: SubscriptionTier) => {
    if (isLoading) return;
    
    if (tier === 'enterprise') {
      window.location.href = 'mailto:sales@10xsales.app?subject=Enterprise%20Plan%20Inquiry';
      return;
    }
    
    setIsLoading(tier);
    try {
      await updateSubscription(tier);
      toast.success('Subscription updated successfully!');
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Failed to update subscription. Please try again.');
    } finally {
      setIsLoading(null);
    }
  };

  const isCurrentPlan = (tier: SubscriptionTier) => {
    return user?.subscription?.tier === tier;
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-earth-900 dark:text-earth-100 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-xl text-earth-600 dark:text-earth-300">
            Select the perfect plan for your sales career
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-lg shadow-lg divide-y divide-earth-200 dark:divide-earth-700 ${
                plan.tier === 'pro' ? 'border-2 border-primary-500' : 'border border-earth-200 dark:border-earth-700'
              }`}
            >
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-earth-900 dark:text-earth-100">
                  {plan.name}
                </h3>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-earth-900 dark:text-earth-100">
                    ${plan.price}
                  </span>
                  <span className="text-base font-medium text-earth-500 dark:text-earth-400">
                    /month
                  </span>
                </p>
                <p className="mt-6 text-earth-500 dark:text-earth-400">
                  {plan.tier === 'pro' ? 'Perfect for growing professionals' : 
                   plan.tier === 'enterprise' ? 'For large teams and dealerships' : 
                   'Get started with the basics'}
                </p>

                <button
                  onClick={() => handleSubscribe(plan.tier)}
                  disabled={isLoading === plan.tier || isCurrentPlan(plan.tier)}
                  className={`mt-8 w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                    ${isCurrentPlan(plan.tier)
                      ? 'bg-earth-400 cursor-not-allowed'
                      : isLoading === plan.tier
                      ? 'bg-primary-400 cursor-wait'
                      : plan.tier === 'enterprise'
                      ? 'bg-earth-600 hover:bg-earth-700'
                      : 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                    }`}
                >
                  {isCurrentPlan(plan.tier) 
                    ? 'Current Plan' 
                    : isLoading === plan.tier
                    ? 'Updating...'
                    : plan.tier === 'enterprise'
                    ? 'Contact Us'
                    : 'Subscribe'}
                </button>
              </div>

              <div className="pt-6 pb-8 px-6">
                <h4 className="text-sm font-medium text-earth-900 dark:text-earth-100 tracking-wide uppercase">
                  What's included
                </h4>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex space-x-3">
                      <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                      <span className="text-sm text-earth-500 dark:text-earth-400">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-earth-500 dark:text-earth-400">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </div>
  );
}