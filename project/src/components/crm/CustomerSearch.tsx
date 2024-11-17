import React from 'react';
import { Search } from 'lucide-react';

interface CustomerSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function CustomerSearch({ searchTerm, onSearchChange }: CustomerSearchProps) {
  return (
    <div className="bg-white dark:bg-earth-800 shadow rounded-lg p-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-earth-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-earth-300 rounded-md leading-5 bg-white dark:bg-earth-700 dark:border-earth-600 dark:text-earth-100 placeholder-earth-500 focus:outline-none focus:placeholder-earth-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          placeholder="Search customers by name, email, phone, or VIN..."
        />
      </div>
      <div className="mt-2 text-xs text-earth-500 dark:text-earth-400">
        Press enter to search or use filters to refine results
      </div>
    </div>
  );
}