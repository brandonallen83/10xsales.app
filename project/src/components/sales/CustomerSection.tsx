import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useFeatureAccess } from '../../hooks/useFeatureAccess';
import { Crown, Mail, Phone } from 'lucide-react';
import type { SaleFormData } from '../../lib/schemas/sale';

export function CustomerSection() {
  const { register, formState: { errors } } = useFormContext<SaleFormData>();
  const { canAccess } = useFeatureAccess();
  const isPro = canAccess('pro');

  const handleUpgrade = () => {
    window.location.href = 'https://buy.stripe.com/6oEdQR6OfaWUdlC5km';
  };

  return (
    <div className="bg-earth-50 dark:bg-earth-900/50 p-4 rounded-lg relative">
      <h3 className="text-lg font-medium text-earth-900 dark:text-earth-100 mb-4">
        Customer Information
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
            First Name *
          </label>
          <input
            {...register('customerFirstName')}
            className="mt-1 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
          />
          {errors.customerFirstName && (
            <p className="mt-1 text-sm text-red-600">{errors.customerFirstName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
            Last Name *
          </label>
          <input
            {...register('customerLastName')}
            className="mt-1 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
          />
          {errors.customerLastName && (
            <p className="mt-1 text-sm text-red-600">{errors.customerLastName.message}</p>
          )}
        </div>

        {isPro ? (
          <>
            <div>
              <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                Email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Mail className="h-5 w-5 text-earth-400" />
                </div>
                <input
                  type="email"
                  {...register('customerEmail')}
                  className="pl-10 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                Phone
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Phone className="h-5 w-5 text-earth-400" />
                </div>
                <input
                  type="tel"
                  {...register('customerPhone')}
                  className="pl-10 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="col-span-2 bg-earth-900/90 rounded-lg p-6 text-center">
            <Crown className="h-12 w-12 text-primary-500 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-white mb-2">Pro Features</h4>
            <p className="text-earth-200 mb-4">
              Unlock advanced customer management, referral tracking, and more with Pro.
            </p>
            <button
              type="button"
              onClick={handleUpgrade}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Upgrade Now - $29.99/month
            </button>
            <p className="mt-2 text-sm text-earth-400">
              14-day money-back guarantee
            </p>
          </div>
        )}
      </div>
    </div>
  );
}