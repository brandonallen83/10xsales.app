import React from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllReferrers } from '../lib/db/referrers';
import { useFeatureAccess } from '../hooks/useFeatureAccess';
import { ReferrerStats } from '../components/referrers/ReferrerStats';
import { ReferrerRankingChart } from '../components/referrers/ReferrerRankingChart';
import { ReferrerList } from '../components/referrers/ReferrerList';

export function ReferrerRankings() {
  const { canAccess } = useFeatureAccess();
  
  // Redirect if not a paid subscriber
  if (!canAccess('pro')) {
    return <Navigate to="/dashboard/subscription" replace />;
  }

  const { data: referrers = [], isLoading } = useQuery({
    queryKey: ['referrers'],
    queryFn: getAllReferrers,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });

  // Sort referrers by referral count and commission
  const sortedReferrers = [...referrers].sort((a, b) => {
    if (b.referralCount === a.referralCount) {
      return (b.totalCommissionGenerated || 0) - (a.totalCommissionGenerated || 0);
    }
    return (b.referralCount || 0) - (a.referralCount || 0);
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-earth-900 dark:text-earth-100">
          Referrer Rankings
        </h1>
      </div>

      <ReferrerStats referrers={referrers} />

      <div className="bg-white dark:bg-earth-800 shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-earth-900 dark:text-earth-100 mb-4">
          Top Referrers Performance
        </h2>
        <ReferrerRankingChart referrers={sortedReferrers.slice(0, 10)} />
      </div>

      <div className="bg-white dark:bg-earth-800 shadow rounded-lg">
        <ReferrerList 
          referrers={sortedReferrers} 
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}