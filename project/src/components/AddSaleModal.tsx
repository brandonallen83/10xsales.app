import React from 'react';
import { SaleForm } from './SaleForm';
import { toast } from 'react-hot-toast';
import { addSale } from '../lib/db/indexedDB';
import { useQueryClient } from '@tanstack/react-query';
import type { Sale } from '../types';

interface AddSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaleAdded: () => void;
}

export function AddSaleModal({ isOpen, onClose, onSaleAdded }: AddSaleModalProps) {
  const queryClient = useQueryClient();

  if (!isOpen) return null;

  const handleSubmit = async (data: Omit<Sale, 'id'>) => {
    try {
      await addSale(data);
      
      // Invalidate and refetch queries
      await queryClient.invalidateQueries(['sales']);
      await queryClient.invalidateQueries(['referrers']);
      await queryClient.invalidateQueries(['referrals']);
      
      toast.success('Sale added successfully!');
      onSaleAdded();
      onClose();
    } catch (error) {
      console.error('Error adding sale:', error);
      toast.error('Failed to add sale. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center">
        <div className="fixed inset-0 bg-earth-900 bg-opacity-75 transition-opacity" />
        <SaleForm 
          onSubmit={handleSubmit} 
          onClose={onClose}
        />
      </div>
    </div>
  );
}