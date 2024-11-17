import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { SalesFilters } from '../components/SalesFilters';
import { SalesTable } from '../components/SalesTable';
import { SalesChart } from '../components/SalesChart';
import { AddSaleModal } from '../components/AddSaleModal';
import { getAllSales } from '../lib/db/sales';
import { MOCK_SALES } from '../lib/mockData'; // Import mock data
import type { Sale } from '../types';

export function Sales() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toLocaleString('default', { month: 'long' })
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  const queryClient = useQueryClient();

  // Use mock data for development
  const { data: sales = MOCK_SALES, isLoading } = useQuery({
    queryKey: ['sales', selectedMonth, selectedYear],
    queryFn: getAllSales,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    initialData: MOCK_SALES // Provide mock data as initial data
  });

  // Filter sales based on selected month and year
  const filteredSales = sales.filter(sale => {
    const saleDate = new Date(sale.date);
    return (
      saleDate.getFullYear() === selectedYear &&
      saleDate.toLocaleString('default', { month: 'long' }) === selectedMonth
    );
  });

  // Calculate totals
  const totals = filteredSales.reduce((acc, sale) => {
    acc.commission += sale.totalCommission || 0;
    acc.frontEnd += sale.frontEndProfit || 0;
    acc.backEnd += sale.backEndProfit || 0;
    acc.aftermarket += sale.aftermarketProducts?.reduce((sum, product) => sum + (product.profit || 0), 0) || 0;
    return acc;
  }, {
    commission: 0,
    frontEnd: 0,
    backEnd: 0,
    aftermarket: 0
  });

  const handleSaleAdded = async () => {
    setIsModalOpen(false);
    // Force refetch all relevant queries
    await Promise.all([
      queryClient.invalidateQueries(['sales']),
      queryClient.invalidateQueries(['referrers']),
      queryClient.invalidateQueries(['customers'])
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-earth-900 dark:text-earth-100">Sales Tracker</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-earth-600 hover:bg-earth-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-earth-500 dark:bg-earth-500 dark:hover:bg-earth-600"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Sale
        </button>
      </div>

      <SalesFilters
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onMonthChange={setSelectedMonth}
        onYearChange={setSelectedYear}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white dark:bg-earth-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                  <span className="text-primary-600 dark:text-primary-400 text-lg font-semibold">$</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-earth-500 dark:text-earth-400 truncate">
                    Total Commission
                  </dt>
                  <dd className="text-lg font-semibold text-earth-900 dark:text-earth-100">
                    ${totals.commission.toLocaleString()}
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
                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 text-lg font-semibold">F</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-earth-500 dark:text-earth-400 truncate">
                    Front End
                  </dt>
                  <dd className="text-lg font-semibold text-earth-900 dark:text-earth-100">
                    ${totals.frontEnd.toLocaleString()}
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
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 text-lg font-semibold">B</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-earth-500 dark:text-earth-400 truncate">
                    Back End
                  </dt>
                  <dd className="text-lg font-semibold text-earth-900 dark:text-earth-100">
                    ${totals.backEnd.toLocaleString()}
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
                <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
                  <span className="text-yellow-600 dark:text-yellow-400 text-lg font-semibold">A</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-earth-500 dark:text-earth-400 truncate">
                    Aftermarket
                  </dt>
                  <dd className="text-lg font-semibold text-earth-900 dark:text-earth-100">
                    ${totals.aftermarket.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-earth-800 shadow rounded-lg p-6">
        <SalesChart sales={filteredSales} />
      </div>

      <div className="bg-white dark:bg-earth-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-earth-200 dark:border-earth-700">
          <h3 className="text-lg leading-6 font-medium text-earth-900 dark:text-earth-100">
            Sales History
          </h3>
        </div>
        <SalesTable sales={filteredSales} isLoading={isLoading} />
      </div>

      {isModalOpen && (
        <AddSaleModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSaleAdded={handleSaleAdded}
        />
      )}
    </div>
  );
}