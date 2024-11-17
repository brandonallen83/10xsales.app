import React from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp, Users } from 'lucide-react';
import type { Referrer } from '../../types';

interface ReferrerListProps {
  referrers: Referrer[];
  isLoading: boolean;
}

export function ReferrerList({ referrers, isLoading }: ReferrerListProps) {
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-earth-100 dark:bg-earth-700 rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (referrers.length === 0) {
    return (
      <div className="p-6 text-center text-earth-500 dark:text-earth-400">
        No referrers found
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div className="flow-root">
        <ul className="divide-y divide-earth-200 dark:divide-earth-700">
          {referrers.map((referrer, index) => (
            <motion.li
              key={referrer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 sm:px-6 hover:bg-earth-50 dark:hover:bg-earth-700/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {index < 3 ? (
                        <Award className={`h-5 w-5 ${
                          index === 0 ? 'text-yellow-500' :
                          index === 1 ? 'text-gray-400' :
                          'text-amber-600'
                        }`} />
                      ) : (
                        <Users className="h-5 w-5 text-earth-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-earth-900 dark:text-earth-100">
                        {referrer.name}
                      </p>
                      <div className="mt-1 flex items-center space-x-4 text-sm text-earth-500 dark:text-earth-400">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {referrer.referralCount || 0} referrals
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          ${(referrer.totalCommissionGenerated || 0).toLocaleString()} generated
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    index === 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                    index === 1 ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300' :
                    index === 2 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300' :
                    'bg-earth-100 text-earth-800 dark:bg-earth-900/20 dark:text-earth-300'
                  }`}>
                    #{index + 1}
                  </span>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}