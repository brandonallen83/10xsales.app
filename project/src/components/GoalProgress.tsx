import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Award } from 'lucide-react';
import type { Sale, SalesGoal } from '../types';
import { getMotivationalMessage } from '../lib/motivational';

interface GoalProgressProps {
  sales: Sale[];
  goal: SalesGoal;
}

export function GoalProgress({ sales, goal }: GoalProgressProps) {
  const currentUnits = sales.length;
  const avgCommissionPerUnit = currentUnits > 0 ? 
    sales.reduce((sum, sale) => {
      const commission = sale.isFlat ? 
        (sale.flatAmount || 0) : 
        ((sale.frontEndProfit || 0) + (sale.backEndProfit || 0) + (sale.bonusAmount || 0));
      return sum + commission;
    }, 0) / currentUnits : 
    0;

  const commissionProgressPercentage = Math.min((avgCommissionPerUnit / goal.targetCommission) * 100, 200);
  const unitsProgressPercentage = Math.min((currentUnits / goal.targetUnits) * 100, 200);
  const aftermarketCount = sales.reduce((sum, sale) => sum + (sale.aftermarketProducts?.length || 0), 0);
  const avgAftermarket = currentUnits > 0 ? aftermarketCount / currentUnits : 0;
  const aftermarketProgressPercentage = Math.min((avgAftermarket / goal.targetAftermarket) * 100, 200);

  const metrics = [
    {
      label: 'Units Progress',
      value: `${currentUnits}/${goal.targetUnits}`,
      percentage: unitsProgressPercentage,
      icon: Target,
      color: 'bg-blue-500'
    },
    {
      label: 'Avg Commission',
      value: `$${avgCommissionPerUnit.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      percentage: commissionProgressPercentage,
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      label: 'Aftermarket Products',
      value: `${avgAftermarket.toFixed(1)}/sale`,
      percentage: aftermarketProgressPercentage,
      icon: Award,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-earth-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-earth-900 dark:text-earth-100 mb-6">
          Goal Progress
        </h2>

        <div className="space-y-6">
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <metric.icon className={`h-5 w-5 ${metric.color} text-white rounded-full p-1`} />
                  <span className="text-sm font-medium text-earth-900 dark:text-earth-100">
                    {metric.label}
                  </span>
                </div>
                <span className="text-sm font-medium text-earth-900 dark:text-earth-100">
                  {metric.value}
                </span>
              </div>

              <div className="relative">
                <div className="h-2 bg-earth-100 dark:bg-earth-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.percentage}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full ${metric.color}`}
                  />
                </div>
                <span className="absolute right-0 top-full mt-1 text-xs text-earth-500 dark:text-earth-400">
                  {metric.percentage.toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-earth-50 dark:bg-earth-900/50 rounded-lg">
          <p className="text-sm text-earth-600 dark:text-earth-300 text-center">
            {getMotivationalMessage(unitsProgressPercentage)}
          </p>
        </div>
      </div>
    </div>
  );
}