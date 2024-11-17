import React from 'react';
import { useFormContext } from 'react-hook-form';
import { DollarSign } from 'lucide-react';
import type { SaleFormData } from '../../lib/schemas/sale';

export function CommissionSection() {
  const { register, watch, formState: { errors } } = useFormContext<SaleFormData>();
  const isFlat = watch('isFlat');

  return (
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
            {errors.flatAmount && (
              <p className="mt-1 text-sm text-red-600">{errors.flatAmount.message}</p>
            )}
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
              {errors.frontEndProfit && (
                <p className="mt-1 text-sm text-red-600">{errors.frontEndProfit.message}</p>
              )}
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
              {errors.backEndProfit && (
                <p className="mt-1 text-sm text-red-600">{errors.backEndProfit.message}</p>
              )}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
            Bonus Amount (if any)
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <DollarSign className="h-5 w-5 text-earth-400" />
            </div>
            <input
              type="number"
              step="0.01"
              {...register('bonusAmount', { valueAsNumber: true })}
              className="pl-10 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}