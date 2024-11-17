import React from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';
import type { Sale } from '../types';

interface SalesStatsProps {
  sales: Sale[];
}

export function SalesStats({ sales }: SalesStatsProps) {
  const avgCommission = sales.length
    ? sales.reduce((sum, sale) => sum + sale.totalCommission, 0) / sales.length
    : 0;

  const totalCommission = sales.reduce((sum, sale) => sum + sale.totalCommission, 0);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div className="bg-white dark:bg-earth-800 overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-earth-500 dark:text-earth-400 truncate">
                  Average Commission
                </dt>
                <dd className="text-lg font-semibold text-earth-900 dark:text-earth-100">
                  ${avgCommission.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-earth-800 overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-earth-500 dark:text-earth-400 truncate">
                  Total Commission
                </dt>
                <dd className="text-lg font-semibold text-earth-900 dark:text-earth-100">
                  ${totalCommission.toLocaleString()}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-earth-800 overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-earth-500 dark:text-earth-400 truncate">
                  Total Sales
                </dt>
                <dd className="text-lg font-semibold text-earth-900 dark:text-earth-100">
                  {sales.length}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}