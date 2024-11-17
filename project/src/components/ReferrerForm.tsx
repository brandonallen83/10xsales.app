import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, Search, UserPlus, AlertCircle } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllCustomers, addReferrer } from '../lib/db/indexedDB';
import { toast } from 'react-hot-toast';
import type { Customer, Referrer } from '../types';

interface ReferrerFormProps {
  onSubmit: (referrer: Referrer) => void;
  onClose: () => void;
}

export function ReferrerForm({ onSubmit, onClose }: ReferrerFormProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewForm, setShowNewForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Omit<Referrer, 'id' | 'referralCount' | 'totalCommissionGenerated' | 'createdAt' | 'lastReferralDate'>>({
    defaultValues: {
      name: '',
      email: '',
      phone: ''
    }
  });

  const { data: customers = [], isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: getAllCustomers
  });

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (customer.phone && customer.phone.includes(searchTerm))
  );

  const handleNewReferrerSubmit = async (data: any) => {
    setError(null);
    try {
      if (!data.name) {
        setError('Referrer name is required');
        return;
      }

      const newReferrer: Omit<Referrer, 'id'> = {
        ...data,
        referralCount: 0,
        totalCommissionGenerated: 0,
        createdAt: new Date().toISOString(),
        lastReferralDate: null
      };

      const referrerId = await addReferrer(newReferrer);

      // Invalidate and refetch referrers query to update rankings
      await queryClient.invalidateQueries(['referrers']);
      
      onSubmit({
        ...newReferrer,
        id: referrerId
      });
      
      toast.success('New referrer added successfully');
      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add referrer';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-earth-800 rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-earth-900 dark:text-earth-100">
            {showNewForm ? 'Add New Referrer' : 'Select Referrer'}
          </h2>
          <button
            onClick={onClose}
            className="text-earth-500 hover:text-earth-700 dark:text-earth-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <p className="ml-3 text-sm text-red-700 dark:text-red-300">
                {error}
              </p>
            </div>
          </div>
        )}

        {!showNewForm ? (
          <>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-earth-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search existing customers..."
                  className="pl-10 w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                />
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto mb-4">
              {isLoading ? (
                <div className="text-center py-4 text-earth-500 dark:text-earth-400">
                  Loading...
                </div>
              ) : filteredCustomers.length > 0 ? (
                <div className="space-y-2">
                  {filteredCustomers.map((customer) => (
                    <button
                      key={customer.id}
                      onClick={() => onSubmit({
                        id: customer.id,
                        name: customer.name,
                        email: customer.email,
                        phone: customer.phone,
                        referralCount: 0,
                        totalCommissionGenerated: 0,
                        createdAt: new Date().toISOString(),
                        lastReferralDate: null
                      })}
                      className="w-full text-left p-3 rounded-lg hover:bg-earth-50 dark:hover:bg-earth-700"
                    >
                      <div className="font-medium text-earth-900 dark:text-earth-100">
                        {customer.name}
                      </div>
                      <div className="text-sm text-earth-500 dark:text-earth-400">
                        {customer.email && <span>{customer.email} • </span>}
                        {customer.phone}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-earth-500 dark:text-earth-400">
                  No customers found
                </div>
              )}
            </div>

            <button
              onClick={() => setShowNewForm(true)}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Add New Referrer
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit(handleNewReferrerSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                Referrer Name *
              </label>
              <input
                {...register('name', { required: 'Name is required' })}
                className="mt-1 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                Email
              </label>
              <input
                type="email"
                {...register('email')}
                className="mt-1 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                Phone
              </label>
              <input
                type="tel"
                {...register('phone')}
                className="mt-1 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
              />
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setShowNewForm(false);
                  setError(null);
                }}
                className="px-4 py-2 text-sm font-medium text-earth-700 dark:text-earth-300 hover:text-earth-900 dark:hover:text-earth-100"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Add Referrer
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}