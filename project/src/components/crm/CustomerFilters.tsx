import React from 'react';
import { Filter, Check } from 'lucide-react';

interface CustomerFiltersProps {
  filters: {
    dateRange: string;
    priceRange: string;
    hasReferrals: boolean;
    vehicleType: string;
  };
  onFilterChange: (filters: any) => void;
}

export function CustomerFilters({ filters, onFilterChange }: CustomerFiltersProps) {
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
            Purchase Date
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
          >
            <option value="all">All Time</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="180days">Last 180 Days</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-earth-700 dark:text-earth-300 mb-1">
            Purchase Amount
          </label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
          >
            <option value="all">All Prices</option>
            <option value="under25k">Under $25,000</option>
            <option value="25kTo50k">$25,000 - $50,000</option>
            <option value="over50k">Over $50,000</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-earth-700 dark:text-earth-300 mb-1">
            Vehicle Type
          </label>
          <select
            value={filters.vehicleType}
            onChange={(e) => handleFilterChange('vehicleType', e.target.value)}
            className="block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
          >
            <option value="all">All Types</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="truck">Truck</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>

        <div className="pt-2">
          <label className="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.hasReferrals}
              onChange={(e) => handleFilterChange('hasReferrals', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-5 h-5 border-2 border-earth-300 dark:border-earth-600 rounded bg-white dark:bg-earth-700 peer-checked:bg-primary-600 peer-checked:border-primary-600 transition-colors">
              {filters.hasReferrals && (
                <Check className="h-4 w-4 text-white absolute top-0.5 left-0.5" />
              )}
            </div>
            <span className="ml-2 text-sm font-medium text-earth-700 dark:text-earth-300">
              Has Generated Referrals
            </span>
          </label>
          <p className="mt-1 text-xs text-earth-500 dark:text-earth-400 ml-7">
            Show customers who have successfully referred others
          </p>
        </div>
      </div>
    </div>
  );
}