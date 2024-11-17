import React from 'react';
import { Filter } from 'lucide-react';

interface ReferralFiltersProps {
  filters: {
    status: 'all' | 'pending' | 'contacted' | 'converted';
    dateRange: string;
    minValue: string;
  };
  onFilterChange: (filters: any) => void;
}

export function ReferralFilters({ filters, onFilterChange }: ReferralFiltersProps) {
  const handleFilterChange = (key: string, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="bg-white dark:bg-earth-800 shadow rounded-lg p-4">
      <div className="flex items-center mb-4">
        <Filter className="h-5 w-5 text-earth-400 mr-2" />
        <h3 className="text-sm font-medium text-earth-900 dark:text-earth-100">
          Filters
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-earth-700 dark:text-earth-300 mb-1">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-earth-700 dark:text-earth-300 mb-1">
            Date Range
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
          >
            <option value="all">All Time</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-earth-700 dark:text-earth-300 mb-1">
            Minimum Value
          </label>
          <select
            value={filters.minValue}
            onChange={(e) => handleFilterChange('minValue', e.target.value)}
            className="block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
          >
            <option value="all">Any Value</option>
            <option value="10000">$10,000+</option>
            <option value="25000">$25,000+</option>
            <option value="50000">$50,000+</option>
          </select>
        </div>
      </div>
    </div>
  );
}