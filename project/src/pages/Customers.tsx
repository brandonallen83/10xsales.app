import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllCustomers } from '../lib/db/customers';
import { getAllReferrers } from '../lib/db/referrers';
import { CustomerList } from '../components/crm/CustomerList';
import { CustomerSearch } from '../components/crm/CustomerSearch';
import { CustomerFilters } from '../components/crm/CustomerFilters';
import { CustomerStats } from '../components/crm/CustomerStats';
import { CustomerDetails } from '../components/crm/CustomerDetails';
import { useFeatureAccess } from '../hooks/useFeatureAccess';
import { Navigate } from 'react-router-dom';
import { Users, DollarSign, Car, Star } from 'lucide-react';

export function Customers() {
  const { canAccess } = useFeatureAccess();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [filters, setFilters] = useState({
    dateRange: 'all',
    priceRange: 'all',
    hasReferrals: false,
    vehicleType: 'all'
  });
  
  // Redirect if not a paid subscriber
  if (!canAccess('pro')) {
    return <Navigate to="/dashboard/subscription" replace />;
  }

  // Fetch customers and referrers
  const { data: customers = [], isLoading: isLoadingCustomers } = useQuery({
    queryKey: ['customers'],
    queryFn: getAllCustomers
  });

  const { data: referrers = [], isLoading: isLoadingReferrers } = useQuery({
    queryKey: ['referrers'],
    queryFn: getAllReferrers
  });

  // Create a map of customer IDs who are referrers
  const referrerCustomerIds = useMemo(() => {
    return new Set(referrers.map(referrer => referrer.id));
  }, [referrers]);

  // Filter customers based on all criteria
  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      // Search filter
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone?.includes(searchTerm);
      if (!matchesSearch) return false;

      // Date range filter
      if (filters.dateRange !== 'all') {
        const purchaseDate = new Date(customer.purchaseDate);
        const now = new Date();
        const days = {
          '30days': 30,
          '90days': 90,
          '180days': 180
        }[filters.dateRange];
        if (days) {
          const cutoff = new Date(now.setDate(now.getDate() - days));
          if (purchaseDate < cutoff) return false;
        }
      }

      // Price range filter
      if (filters.priceRange !== 'all' && customer.vehicle?.price) {
        const price = customer.vehicle.price;
        switch (filters.priceRange) {
          case 'under25k':
            if (price >= 25000) return false;
            break;
          case '25kTo50k':
            if (price < 25000 || price >= 50000) return false;
            break;
          case 'over50k':
            if (price < 50000) return false;
            break;
        }
      }

      // Vehicle type filter
      if (filters.vehicleType !== 'all') {
        if (customer.vehicle?.type !== filters.vehicleType) return false;
      }

      // Referral filter
      if (filters.hasReferrals) {
        if (!referrerCustomerIds.has(customer.id)) return false;
      }

      return true;
    });
  }, [customers, searchTerm, filters, referrerCustomerIds]);

  // Calculate stats
  const stats = [
    {
      title: 'Total Customers',
      value: filteredCustomers.length,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Average Sale Value',
      value: filteredCustomers.length ? 
        `$${Math.round(filteredCustomers.reduce((sum, c) => sum + (c.vehicle?.price || 0), 0) / filteredCustomers.length).toLocaleString()}` :
        '$0',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Most Popular Model',
      value: getMostPopularModel(filteredCustomers),
      icon: Car,
      color: 'bg-purple-500'
    },
    {
      title: 'Active Referrers',
      value: `${referrerCustomerIds.size} (${Math.round((referrerCustomerIds.size / customers.length) * 100)}%)`,
      icon: Star,
      color: 'bg-yellow-500'
    }
  ];

  if (selectedCustomer) {
    return (
      <CustomerDetails 
        customer={selectedCustomer} 
        onBack={() => setSelectedCustomer(null)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-earth-900 dark:text-earth-100">
          Customer Database
        </h1>
      </div>

      <CustomerStats stats={stats} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <CustomerFilters 
            filters={filters} 
            onFilterChange={setFilters} 
          />
        </div>

        <div className="md:col-span-3 space-y-6">
          <CustomerSearch 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
          />

          <CustomerList 
            customers={filteredCustomers}
            isLoading={isLoadingCustomers || isLoadingReferrers}
            onCustomerSelect={setSelectedCustomer}
          />
        </div>
      </div>
    </div>
  );
}

function getMostPopularModel(customers: Customer[]): string {
  const modelCounts = customers.reduce((acc, customer) => {
    if (customer.vehicle?.model) {
      acc[customer.vehicle.model] = (acc[customer.vehicle.model] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const sortedModels = Object.entries(modelCounts).sort((a, b) => b[1] - a[1]);
  return sortedModels[0]?.[0] || 'N/A';
}