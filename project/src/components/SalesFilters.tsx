import React from 'react';
import { MONTHS } from '../lib/constants';

interface SalesFiltersProps {
  selectedMonth: string;
  selectedYear: number;
  onMonthChange: (month: string) => void;
  onYearChange: (year: number) => void;
}

export function SalesFilters({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
}: SalesFiltersProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 5 },
    (_, i) => currentYear - 2 + i
  );

  return (
    <div className="flex gap-4 bg-white dark:bg-earth-800 shadow rounded-lg p-4">
      <div className="w-48">
        <label htmlFor="month" className="block text-sm font-medium text-earth-700 dark:text-earth-300">
          Month
        </label>
        <select
          id="month"
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-earth-300 shadow-sm focus:border-earth-500 focus:ring-earth-500 dark:bg-earth-700 dark:border-earth-600 dark:text-earth-100"
        >
          {MONTHS.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <div className="w-48">
        <label htmlFor="year" className="block text-sm font-medium text-earth-700 dark:text-earth-300">
          Year
        </label>
        <select
          id="year"
          value={selectedYear}
          onChange={(e) => onYearChange(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-earth-300 shadow-sm focus:border-earth-500 focus:ring-earth-500 dark:bg-earth-700 dark:border-earth-600 dark:text-earth-100"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}