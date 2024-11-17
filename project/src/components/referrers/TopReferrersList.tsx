import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, TrendingUp } from 'lucide-react';
import type { Referrer } from '../../types';

interface TopReferrersListProps {
  referrers: Referrer[];
  isLoading: boolean;
}

export function TopReferrersList({ referrers, isLoading }: TopReferrersListProps) {
  const sortedReferrers = [...referrers]
    .sort((a, b) => b.referralCount - a.referralCount)
    .slice(0, 10);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-earth-100 dark:bg-earth-700 rounded-lg" />
        ))}
      </div>
    );
  }

  if (referrers.length === 0) {
    return (
      <div className="text-center py-8 text-earth-500 dark:text-earth-400">
        No referrers found
      </div>
    );
  }

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 1:
        return <Trophy className="h-5 w-5 text-gray-400" />;
      case 2:
        return <Trophy className="h-5 w-5 text-amber-600" />;
      default:
        return <Star className="h-5 w-5 text-earth-400" />;
    }
  };

  return (
    <div className="space-y-4">
      {sortedReferrers.map((referrer, index) => (
        <motion.div
          key={referrer.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-earth-50 dark:bg-earth-900/50 p-4 rounded-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getRankIcon(index)}
              <div>
                <h3 className="font-medium text-earth-900 dark:text-earth-100">
                  {referrer.name}
                </h3>
                <p className="text-sm text-earth-500 dark:text-earth-400">
                  {referrer.email || referrer.phone}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-earth-900 dark:text-earth-100">
                <TrendingUp className="h-4 w-4 mr-1 text-primary-500" />
                <span className="font-medium">{referrer.referralCount}</span>
              </div>
              <p className="text-sm text-earth-500 dark:text-earth-400">
                ${referrer.totalCommissionGenerated.toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}