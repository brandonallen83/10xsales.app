import React from 'react';
import type { Sale } from '../types';

interface SalesTableProps {
  sales: Sale[];
  isLoading: boolean;
}

export function SalesTable({ sales, isLoading }: SalesTableProps) {
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-earth-100 dark:bg-earth-700 rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (!sales || sales.length === 0) {
    return (
      <div className="p-6 text-center text-earth-500 dark:text-earth-400">
        No sales recorded for this period
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-earth-200 dark:divide-earth-700">
        <thead className="bg-earth-50 dark:bg-earth-900">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-earth-500 dark:text-earth-400 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-earth-500 dark:text-earth-400 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-earth-500 dark:text-earth-400 uppercase tracking-wider">
              Front End
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-earth-500 dark:text-earth-400 uppercase tracking-wider">
              Back End
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-earth-500 dark:text-earth-400 uppercase tracking-wider">
              Total Commission
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-earth-800 divide-y divide-earth-200 dark:divide-earth-700">
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-earth-900 dark:text-earth-100">
                {new Date(sale.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-earth-900 dark:text-earth-100">
                {`${sale.customerFirstName} ${sale.customerLastName}`}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-earth-900 dark:text-earth-100">
                ${(sale.frontEndProfit || 0).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-earth-900 dark:text-earth-100">
                ${(sale.backEndProfit || 0).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-earth-900 dark:text-earth-100">
                ${(sale.totalCommission || 0).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}