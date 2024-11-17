import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Car, Search, Crown, DollarSign, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useFeatureAccess } from '../hooks/useFeatureAccess';
import { ReferralModal } from './ReferralModal';
import { saleSchema, type SaleFormData } from '../lib/schemas/sale';
import type { Referrer } from '../types';

interface SaleFormProps {
  onSubmit: (data: SaleFormData) => void;
  onClose: () => void;
  initialData?: Partial<SaleFormData>;
}

const STRIPE_PRO_LINK = 'https://buy.stripe.com/6oEdQR6OfaWUdlC5km';

export function SaleForm({ onSubmit, onClose, initialData }: SaleFormProps) {
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [selectedReferrer, setSelectedReferrer] = useState<Referrer | null>(null);
  const { canAccess } = useFeatureAccess();
  const isPro = canAccess('pro');

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<SaleFormData>({
    resolver: zodResolver(saleSchema),
    defaultValues: {
      customerFirstName: '',
      customerLastName: '',
      isFlat: false,
      frontEndProfit: 0,
      backEndProfit: 0,
      ...initialData
    }
  });

  const isFlat = watch('isFlat');
  const isReferral = watch('isReferral');

  const handleFormSubmit = async (data: SaleFormData) => {
    try {
      const totalCommission = isFlat ? 
        (data.flatAmount || 0) : 
        ((data.frontEndProfit || 0) + (data.backEndProfit || 0) + (data.bonusAmount || 0));

      await onSubmit({
        ...data,
        totalCommission,
        referrerId: selectedReferrer?.id,
        date: new Date().toISOString()
      });
      
      toast.success('Sale added successfully');
      onClose();
    } catch (error) {
      console.error('Error adding sale:', error);
      toast.error('Failed to add sale');
    }
  };

  const handleUpgrade = () => {
    window.location.href = STRIPE_PRO_LINK;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-earth-800 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-earth-900 dark:text-earth-100">
            Add New Sale
          </h2>
          <button
            onClick={onClose}
            className="text-earth-400 hover:text-earth-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Basic Information - Available to all users */}
          <div className="bg-earth-50 dark:bg-earth-900/50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-earth-900 dark:text-earth-100 mb-4">
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                  Customer First Name *
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
                  Customer Last Name *
                </label>
                <input
                  {...register('customerLastName')}
                  className="mt-1 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                />
                {errors.customerLastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.customerLastName.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Commission Information - Available to all users */}
          <div className="bg-earth-50 dark:bg-earth-900/50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-earth-900 dark:text-earth-100 mb-4">
              Commission Information
            </h3>
            
            <div className="space-y-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('isFlat')}
                  className="rounded border-earth-300 dark:border-earth-600"
                />
                <span className="text-sm text-earth-700 dark:text-earth-300">
                  Flat Commission
                </span>
              </label>

              {isFlat ? (
                <div>
                  <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                    Flat Amount
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <DollarSign className="h-5 w-5 text-earth-400" />
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      {...register('flatAmount', { valueAsNumber: true })}
                      className="pl-10 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                      Front End Profit
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <DollarSign className="h-5 w-5 text-earth-400" />
                      </div>
                      <input
                        type="number"
                        step="0.01"
                        {...register('frontEndProfit', { valueAsNumber: true })}
                        className="pl-10 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                      Back End Profit
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <DollarSign className="h-5 w-5 text-earth-400" />
                      </div>
                      <input
                        type="number"
                        step="0.01"
                        {...register('backEndProfit', { valueAsNumber: true })}
                        className="pl-10 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pro Features Section */}
          <div className="relative">
            <div className={`bg-earth-50 dark:bg-earth-900/50 p-4 rounded-lg ${!isPro ? 'opacity-50 pointer-events-none' : ''}`}>
              <h3 className="text-lg font-medium text-earth-900 dark:text-earth-100 mb-4">
                Advanced Information
              </h3>
              
              <div className="space-y-4">
                {/* Pro features here */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                      Vehicle VIN
                    </label>
                    <input
                      type="text"
                      disabled={!isPro}
                      className="mt-1 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                      Customer Email
                    </label>
                    <input
                      type="email"
                      disabled={!isPro}
                      className="mt-1 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {!isPro && (
              <div className="absolute inset-0 bg-earth-900/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <div className="text-center p-6">
                  <Crown className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">Pro Features</h4>
                  <p className="text-earth-200 mb-4">
                    Unlock advanced tracking, customer management, and more with <a href={STRIPE_PRO_LINK} className="text-primary-400 hover:text-primary-300 font-semibold">Pro</a>
                  </p>
                  <a
                    href={STRIPE_PRO_LINK}
                    className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Upgrade to Pro - $29.99/month
                  </a>
                  <p className="mt-2 text-sm text-earth-400">
                    14-day money-back guarantee
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-earth-600 dark:text-earth-400 hover:text-earth-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Add Sale
            </button>
          </div>
        </form>

        {showReferralModal && (
          <ReferralModal
            isOpen={showReferralModal}
            onClose={() => setShowReferralModal(false)}
            onSelect={(referrer) => {
              setSelectedReferrer(referrer);
              setShowReferralModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}