import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Award, Clock } from 'lucide-react';
import type { Referral } from '../types';

interface ReferralStatsProps {
  referrals: Referral[];
}

export function ReferralStats({ referrals }: ReferralStatsProps) {
  const stats = React.useMemo(() => {
    const totalReferrals = referrals.length;
    const convertedReferrals = referrals.filter(r => r.status === 'converted').length;
    const conversionRate = totalReferrals ? (convertedReferrals / totalReferrals) * 100 : 0;
    
    const referrerCounts = referrals.reduce((acc: Record<string, number>, ref) => {
      acc[ref.name] = (acc[ref.name] || 0) + 1;
      return acc;
    }, {});
    
    const topReferrer = Object.entries(referrerCounts)
      .sort(([, a], [, b]) => b - a)[0];

    const averageValue = referrals.reduce((sum, ref) => sum + (ref.saleValue || 0), 0) / totalReferrals;

    return [
      {
        title: 'Total Referrals',
        value: totalReferrals,
        icon: Users,
        color: 'bg-blue-500'
      },
      {
        title: 'Conversion Rate',
        value: `${conversionRate.toFixed(1)}%`,
        icon: TrendingUp,
        color: 'bg-green-500'
      },
      {
        title: 'Top Referrer',
        value: topReferrer ? `${topReferrer[0]} (${topReferrer[1]})` : 'N/A',
        icon: Award,
        color: 'bg-yellow-500'
      },
      {
        title: 'Average Value',
        value: `$${averageValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
        icon: Clock,
        color: 'bg-purple-500'
      }
    ];
  }, [referrals]);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-earth-800 overflow-hidden shadow rounded-lg"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon
                  className={`h-6 w-6 text-white p-1.5 rounded-full ${stat.color}`}
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-earth-500 dark:text-earth-400 truncate">
                    {stat.title}
                  </dt>
                  <dd className="text-lg font-semibold text-earth-900 dark:text-earth-100">
                    {stat.value}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}