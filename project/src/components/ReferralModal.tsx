import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Search, UserPlus, AlertCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getAllReferrers, addReferrer } from '../lib/db/indexedDB';
import type { Referrer } from '../types';
import { toast } from 'react-hot-toast';

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (referrer: Referrer) => void;
}

export function ReferralModal({ isOpen, onClose, onSelect }: ReferralModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewForm, setShowNewForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newReferrer, setNewReferrer] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const { data: referrers = [], isLoading } = useQuery({
    queryKey: ['referrers'],
    queryFn: getAllReferrers,
  });

  const filteredReferrers = referrers.filter(referrer => 
    referrer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (referrer.email && referrer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (referrer.phone && referrer.phone.includes(searchTerm))
  );

  const handleNewReferrerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (!newReferrer.name) {
        setError('Referrer name is required');
        return;
      }

      const referrerId = await addReferrer({
        ...newReferrer,
        referralCount: 0,
        totalCommissionGenerated: 0,
        createdAt: new Date().toISOString(),
      });

      const createdReferrer = {
        id: referrerId,
        ...newReferrer,
        referralCount: 0,
        totalCommissionGenerated: 0,
        createdAt: new Date().toISOString(),
      };

      onSelect(createdReferrer);
      toast.success('New referrer added successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add referrer';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-white dark:bg-earth-800 rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
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
                    placeholder="Search referrers..."
                    className="pl-10 w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                  />
                </div>
              </div>

              <div className="max-h-60 overflow-y-auto mb-4">
                {isLoading ? (
                  <div className="text-center py-4 text-earth-500 dark:text-earth-400">
                    Loading...
                  </div>
                ) : filteredReferrers.length > 0 ? (
                  <div className="space-y-2">
                    {filteredReferrers.map((referrer) => (
                      <button
                        key={referrer.id}
                        onClick={() => onSelect(referrer)}
                        className="w-full text-left p-3 rounded-lg hover:bg-earth-50 dark:hover:bg-earth-700"
                      >
                        <div className="font-medium text-earth-900 dark:text-earth-100">
                          {referrer.name}
                        </div>
                        <div className="text-sm text-earth-500 dark:text-earth-400">
                          {referrer.email && <span>{referrer.email} • </span>}
                          {referrer.phone}
                        </div>
                        <div className="text-xs text-earth-400 dark:text-earth-500 mt-1">
                          {referrer.referralCount} referrals
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-earth-500 dark:text-earth-400">
                    No referrers found
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
            <form onSubmit={handleNewReferrerSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-earth-700 dark:text-earth-300 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={newReferrer.name}
                  onChange={(e) => setNewReferrer(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 dark:text-earth-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={newReferrer.email}
                  onChange={(e) => setNewReferrer(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 dark:text-earth-300 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={newReferrer.phone}
                  onChange={(e) => setNewReferrer(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowNewForm(false);
                    setError(null);
                  }}
                  className="flex-1 px-4 py-2 border border-earth-300 text-earth-700 dark:text-earth-300 dark:border-earth-600 rounded-md hover:bg-earth-50 dark:hover:bg-earth-700"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 border border-transparent rounded-md text-white bg-primary-600 hover:bg-primary-700"
                >
                  Add Referrer
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
}