import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Car, Search, Loader2, Crown } from 'lucide-react';
import { decodeVIN } from '../lib/api/vin';
import { useFeatureAccess } from '../hooks/useFeatureAccess';
import { toast } from 'react-hot-toast';

interface VehicleInfoFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export function VehicleInfoForm({ onSubmit, initialData }: VehicleInfoFormProps) {
  const [isDecoding, setIsDecoding] = useState(false);
  const { canAccess } = useFeatureAccess();
  const isPro = canAccess('pro');
  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: initialData || {}
  });

  const handleDecodeVIN = async () => {
    const vin = getValues('vin');
    if (!vin || vin.length !== 17) {
      toast.error('Please enter a valid 17-character VIN');
      return;
    }

    setIsDecoding(true);
    try {
      const decodedInfo = await decodeVIN(vin);
      Object.entries(decodedInfo).forEach(([key, value]) => {
        setValue(key, value);
      });
      toast.success('VIN decoded successfully');
    } catch (error) {
      toast.error('Failed to decode VIN. Please enter vehicle information manually.');
    } finally {
      setIsDecoding(false);
    }
  };

  const handleUpgrade = () => {
    window.location.href = 'https://buy.stripe.com/6oEdQR6OfaWUdlC5km';
  };

  return (
    <div className="bg-earth-50 dark:bg-earth-900/50 p-4 rounded-lg relative">
      <h3 className="text-lg font-medium text-earth-900 dark:text-earth-100 mb-4">
        Vehicle Information
      </h3>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
            VIN
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              {...register('vin')}
              maxLength={17}
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100 shadow-sm focus:ring-2 focus:ring-primary-500"
              placeholder="Enter 17-character VIN"
              disabled={!isPro}
            />
            {isPro && (
              <button
                type="button"
                onClick={handleDecodeVIN}
                disabled={isDecoding}
                className="inline-flex items-center px-4 py-2 border border-l-0 border-earth-300 dark:border-earth-600 rounded-r-md bg-earth-50 dark:bg-earth-700 text-earth-700 dark:text-earth-300 hover:bg-earth-100 dark:hover:bg-earth-600 disabled:opacity-50 shadow-sm"
              >
                {isDecoding ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </button>
            )}
          </div>
        </div>

        {!isPro && (
          <div className="absolute inset-0 bg-earth-900/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
            <div className="text-center p-6">
              <Crown className="h-12 w-12 text-primary-500 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Pro Feature</h4>
              <p className="text-earth-200 mb-4">
                Unlock VIN decoding, vehicle tracking, and inventory management with Pro.
              </p>
              <button
                type="button"
                onClick={handleUpgrade}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Upgrade to Pro - $29.99/month
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}