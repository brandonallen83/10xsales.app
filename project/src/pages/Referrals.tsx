import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllReferrals } from '../lib/db/indexedDB';
import { ReferralList } from '../components/ReferralList';
import { ReferralSearch } from '../components/ReferralSearch';
import { ReferralFilters } from '../components/ReferralFilters';
import { ReferralStats } from '../components/ReferralStats';
import { ReferralChart } from '../components/ReferralChart';
import { useFeatureAccess } from '../hooks/useFeatureAccess';
import { Navigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { ReferralForm } from '../components/ReferralForm';

export function Referrals() {
  const { canAccess } = useFeatureAccess();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    minValue: 'all'
  });
  
  // Redirect if not a paid subscriber
  if (!canAccess('pro')) {
    return <Navigate to="/dashboard/subscription" replace />;
  }

  const { data: referrals = [], isLoading } = useQuery({
    queryKey: ['referrals'],
    queryFn: getAllReferrals
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-earth-900 dark:text-earth-100">
          Referral Network
        </h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          Add Referral
        </button>
      </div>

      <ReferralStats referrals={referrals} />

      <div className="bg-white dark:bg-earth-800 shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-earth-900 dark:text-earth-100 mb-4">
          Referral Trends
        </h2>
        <ReferralChart referrals={referrals} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <ReferralFilters 
            filters={filters} 
            onFilterChange={setFilters} 
          />
        </div>

        <div className="md:col-span-3 space-y-6">
          <ReferralSearch 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
          />

          <ReferralList 
            referrals={referrals} 
            isLoading={isLoading} 
          />
        </div>
      </div>

      {showAddForm && (
        <ReferralForm
          onClose={() => setShowAddForm(false)}
          onSubmit={async (data) => {
            // Handle form submission
            setShowAddForm(false);
          }}
        />
      )}
    </div>
  );
}