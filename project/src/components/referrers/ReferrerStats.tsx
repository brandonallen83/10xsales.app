import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Award, Star } from 'lucide-react';
import type { Referrer } from '../../types';

interface ReferrerStatsProps {
  referrers: Referrer[];
}

export function ReferrerStats({ referrers }: ReferrerStatsProps) {
  const stats = React.useMemo(() => {
    const totalReferrers = referrers.length;
    const totalReferrals = referrers.reduce((sum, r) => sum + (r.referralCount || 0), 0);
    const avgReferralsPerReferrer = totalReferrers ? (totalReferrals / totalReferrers).toFixed(1) : '0';
    
    const totalCommission = referrers.reduce((sum, r) => sum + (r.totalCommissionGenerated || 0), 0);
    const avgCommissionPerReferral = totalReferrals ? (totalCommission / totalReferrals).toFixed(2) : '0';

    const topReferrer = [...referrers].sort((a, b) => 
      (b.referralCount || 0) - (a.referralCount || 0)
    )[0];

    return [
      {
        title: 'Total Referrers',
        value: totalReferrers.toString(),
        icon: Users,
        color: 'bg-blue-500'
      },
      {
        title: 'Total Referrals',
        value: totalReferrals.toString(),
        icon: TrendingUp,
        color: 'bg-green-500'
      },
      {
        title: 'Avg Referrals/Referrer',
        value: avgReferralsPerReferrer,
        icon: Star,
        color: 'bg-yellow-500'
      },
      {
        title: 'Top Referrer',
        value: topReferrer ? `${topReferrer.name} (${topReferrer.referralCount || 0})` : 'None',
        icon: Award,
        color: 'bg-purple-500'
      }
    ];
  }, [referrers]);

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