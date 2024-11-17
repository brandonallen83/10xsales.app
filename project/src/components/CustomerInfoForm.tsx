import React from 'react';
import { useForm } from 'react-hook-form';
import { Customer } from '../types';

interface CustomerInfoFormProps {
  onSubmit: (data: Customer) => void;
  initialData?: Customer;
}

export function CustomerInfoForm({ onSubmit, initialData }: CustomerInfoFormProps) {
  const { register, handleSubmit } = useForm<Customer>({
    defaultValues: initialData
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
            Customer Name
          </label>
          <input
            {...register('name')}
            required
            className="mt-1 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
            Email
          </label>
          <input
            {...register('email')}
            type="email"
            className="mt-1 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
            Phone
          </label>
          <input
            {...register('phone')}
            type="tel"
            className="mt-1 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
            Address
          </label>
          <input
            {...register('address')}
            className="mt-1 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
            Notes
          </label>
          <textarea
            {...register('notes')}
            rows={3}
            className="mt-1 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
          />
        </div>
      </div>
    </div>
  );
}