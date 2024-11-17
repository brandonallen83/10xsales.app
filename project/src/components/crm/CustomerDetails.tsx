import React from 'react';
import { ArrowLeft, Mail, Phone, Calendar, Car, DollarSign } from 'lucide-react';
import { Badge } from '../ui/Badge';
import type { Customer } from '../../types';

interface CustomerDetailsProps {
  customer: Customer;
  onBack: () => void;
}

export function CustomerDetails({ customer, onBack }: CustomerDetailsProps) {
  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center text-earth-600 hover:text-earth-900 dark:text-earth-400 dark:hover:text-earth-100"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to List
      </button>

      <div className="bg-white dark:bg-earth-800 shadow rounded-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-earth-900 dark:text-earth-100">
              {customer.name}
            </h2>
            <div className="mt-2 space-y-2">
              {customer.email && (
                <div className="flex items-center text-earth-600 dark:text-earth-300">
                  <Mail className="h-4 w-4 mr-2" />
                  {customer.email}
                </div>
              )}
              {customer.phone && (
                <div className="flex items-center text-earth-600 dark:text-earth-300">
                  <Phone className="h-4 w-4 mr-2" />
                  {customer.phone}
                </div>
              )}
              <div className="flex items-center text-earth-600 dark:text-earth-300">
                <Calendar className="h-4 w-4 mr-2" />
                Customer since {new Date(customer.purchaseDate).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {customer.isReferral && (
              <Badge variant="success">Referred</Badge>
            )}
            {customer.referralCount > 0 && (
              <Badge variant="primary">
                {customer.referralCount} Referrals
              </Badge>
            )}
          </div>
        </div>

        {customer.vehicle && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-earth-900 dark:text-earth-100 mb-4">
              Vehicle Information
            </h3>
            <div className="bg-earth-50 dark:bg-earth-900/50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Car className="h-4 w-4 mr-2 text-earth-500" />
                  <span className="text-earth-600 dark:text-earth-300">
                    {customer.vehicle.year} {customer.vehicle.make} {customer.vehicle.model}
                  </span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-earth-500" />
                  <span className="text-earth-600 dark:text-earth-300">
                    VIN: {customer.vehicle.vin}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {customer.referredBy && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-earth-900 dark:text-earth-100 mb-4">
              Referral Information
            </h3>
            <div className="bg-earth-50 dark:bg-earth-900/50 rounded-lg p-4">
              <p className="text-earth-600 dark:text-earth-300">
                Referred by: {customer.referredBy.referrerName}
              </p>
              <p className="text-earth-500 dark:text-earth-400 text-sm mt-1">
                Referral Date: {new Date(customer.referredBy.referralDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}