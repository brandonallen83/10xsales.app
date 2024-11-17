import React from 'react';
import type { Sale } from '../types';

interface SalesListProps {
  sales: Sale[];
}

export function SalesList({ sales }: SalesListProps) {
  return (
    <div className="bg-white dark:bg-earth-800 shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-earth-200 dark:border-earth-700">
        <h3 className="text-lg leading-6 font-medium text-earth-900 dark:text-earth-100">Recent Sales</h3>
      </div>
      <div className="bg-white dark:bg-earth-800">
        <ul className="divide-y divide-earth-200 dark:divide-earth-700">
          {[...sales]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((sale) => (
              <li key={sale.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-earth-900 dark:text-earth-100">
                      {new Date(sale.date).toLocaleDateString()}
                    </p>
                    {sale.isCommissionFlat ? (
                      <p className="text-sm text-earth-500 dark:text-earth-400">
                        Flat Commission
                      </p>
                    ) : (
                      <p className="text-sm text-earth-500 dark:text-earth-400">
                        Front-End: ${sale.frontEndProfit.toLocaleString()} | 
                        Back-End: ${sale.backEndProfit.toLocaleString()}
                      </p>
                    )}
                    {(sale.manufacturerBonus || sale.dealerBonus) && (
                      <p className="text-sm text-earth-500 dark:text-earth-400">
                        {sale.manufacturerBonus ? `Manufacturer Bonus: $${sale.manufacturerBonus.toLocaleString()}` : ''}
                        {sale.manufacturerBonus && sale.dealerBonus ? ' | ' : ''}
                        {sale.dealerBonus ? `Dealer Bonus: $${sale.dealerBonus.toLocaleString()}` : ''}
                      </p>
                    )}
                  </div>
                  <div className="text-sm font-medium text-primary-600 dark:text-primary-400">
                    ${sale.totalCommission.toLocaleString()}
                  </div>
                </div>
              </li>
          ))}
        </ul>
      </div>
    </div>
  );
}