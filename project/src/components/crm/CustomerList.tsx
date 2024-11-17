import React from 'react';
import { Badge } from '../ui/Badge';
import { Search, Filter } from 'lucide-react';
import type { Customer } from '../../types';

interface CustomerListProps {
  customers: Customer[];
  onCustomerSelect?: (customer: Customer) => void;
}

export function CustomerList({ customers, onCustomerSelect }: CustomerListProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortBy, setSortBy] = React.useState<'date' | 'name'>('date');

  const filteredCustomers = React.useMemo(() => {
    return customers
      .filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone?.includes(searchTerm)
      )
      .sort((a, b) => {
        if (sortBy === 'date') {
          return new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime();
        }
        return a.name.localeCompare(b.name);
      });
  }, [customers, searchTerm, sortBy]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-earth-400" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full rounded-md border-earth-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-earth-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'name')}
            className="rounded-md border-earth-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </div>

      <div className="divide-y divide-earth-200 dark:divide-earth-700">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            onClick={() => onCustomerSelect?.(customer)}
            className="p-4 hover:bg-earth-50 dark:hover:bg-earth-800 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-earth-900 dark:text-earth-100">
                  {customer.name}
                </h3>
                <div className="mt-1 text-sm text-earth-500 dark:text-earth-400">
                  {customer.email && <div>{customer.email}</div>}
                  {customer.phone && <div>{customer.phone}</div>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {customer.isReferral && (
                  <Badge variant="success">Referred</Badge>
                )}
                {customer.referralCount > 0 && (
                  <Badge variant="primary">
                    {customer.referralCount} Referrals
                  </Badge>
                )}
                <div className="text-sm text-earth-500 dark:text-earth-400">
                  {new Date(customer.purchaseDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}