import React, { useState, useRef, useEffect } from 'react';
import { Search, UserPlus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getAllCustomers } from '../lib/db/indexedDB';
import type { Customer } from '../types';

interface CustomerSearchProps {
  onSelect: (customer: Customer) => void;
  onAddNew: () => void;
  selectedCustomer?: Customer | null;
}

export function CustomerSearch({ onSelect, onAddNew, selectedCustomer }: CustomerSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: customers = [] } = useQuery({
    queryKey: ['customers'],
    queryFn: getAllCustomers
  });

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.includes(searchTerm)
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="form-group">
        <div className="input-group">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-earth-400" />
            <input
              type="text"
              value={selectedCustomer ? selectedCustomer.name : searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="Search customers..."
              className="pl-10 w-full rounded-lg shadow-md border-earth-300 dark:border-earth-600 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            />
          </div>
          <button
            type="button"
            onClick={onAddNew}
            className="px-4 bg-primary-600 text-white hover:bg-primary-700 rounded-r-lg flex items-center shadow-md"
          >
            <UserPlus className="h-5 w-5" />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-earth-800 rounded-lg shadow-lg border border-earth-200 dark:border-earth-700 max-h-60 overflow-y-auto">
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className="p-3 hover:bg-earth-50 dark:hover:bg-earth-700 cursor-pointer"
                onClick={() => {
                  onSelect(customer);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
              >
                <div className="font-medium text-earth-900 dark:text-earth-100">
                  {customer.name}
                </div>
                {(customer.email || customer.phone) && (
                  <div className="text-xs text-earth-500 dark:text-earth-400">
                    {customer.email && <span>{customer.email}</span>}
                    {customer.email && customer.phone && <span> • </span>}
                    {customer.phone && <span>{customer.phone}</span>}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-4 text-sm text-earth-500 dark:text-earth-400 text-center">
              No customers found
            </div>
          )}
        </div>
      )}
    </div>
  );
}