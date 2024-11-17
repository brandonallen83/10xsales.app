import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MessageCircle, Check, Clock, RefreshCw, Star } from 'lucide-react';
import type { Referral } from '../types';
import { toast } from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { updateReferral } from '../lib/db/indexedDB';
import { ConversionCelebration } from './ConversionCelebration';
import { SaleForm } from './SaleForm';

interface ReferralListProps {
  referrals: Referral[];
  isLoading: boolean;
}

export function ReferralList({ referrals, isLoading }: ReferralListProps) {
  const queryClient = useQueryClient();
  const [selectedReferral, setSelectedReferral] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showSaleForm, setShowSaleForm] = useState(false);
  const [convertedReferral, setConvertedReferral] = useState<Referral | null>(null);
  const [undoTimer, setUndoTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (undoTimer) {
        clearTimeout(undoTimer);
      }
    };
  }, [undoTimer]);

  const handleStatusUpdate = async (referral: Referral, newStatus: 'pending' | 'contacted' | 'converted') => {
    try {
      if (newStatus === 'converted') {
        setConvertedReferral(referral);
        setShowCelebration(true);
        
        // Set 5 second timer for undo
        const timer = setTimeout(() => {
          handleConversionComplete(referral);
        }, 5000);
        
        setUndoTimer(timer);
      } else {
        const updatedReferral = {
          ...referral,
          status: newStatus
        };
        await updateReferral(updatedReferral.id, updatedReferral);
        await queryClient.invalidateQueries(['referrals']);
        toast.success(`Referral status updated to ${newStatus}`);
      }
    } catch (error) {
      toast.error('Failed to update referral status');
    }
  };

  const handleConversionComplete = async (referral: Referral) => {
    setShowCelebration(false);
    setShowSaleForm(true);
  };

  const handleSaleComplete = async (saleData: any) => {
    try {
      if (convertedReferral) {
        await updateReferral(convertedReferral.id, {
          ...convertedReferral,
          status: 'converted',
          saleValue: saleData.totalAmount
        });
        await queryClient.invalidateQueries(['referrals']);
        setShowSaleForm(false);
        setConvertedReferral(null);
        toast.success('Sale recorded successfully');
      }
    } catch (error) {
      toast.error('Failed to record sale');
    }
  };

  const undoConversion = () => {
    if (undoTimer) {
      clearTimeout(undoTimer);
      setUndoTimer(null);
    }
    setShowCelebration(false);
    setConvertedReferral(null);
    toast.success('Conversion cancelled');
  };

  const getStatusIcon = (status: Referral['status']) => {
    switch (status) {
      case 'converted':
        return <Check className="text-green-500" />;
      case 'contacted':
        return <MessageCircle className="text-blue-500" />;
      default:
        return <Clock className="text-yellow-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-earth-100 dark:bg-earth-700 rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div className="flow-root">
        <ul className="divide-y divide-earth-200 dark:divide-earth-700">
          {referrals.map((referral) => (
            <motion.li
              key={referral.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 sm:px-6 hover:bg-earth-50 dark:hover:bg-earth-700/50 transition-colors"
              onClick={() => setSelectedReferral(selectedReferral === referral.id ? null : referral.id)}
            >
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {getStatusIcon(referral.status)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-earth-900 dark:text-earth-100">
                        {referral.name}
                      </p>
                      <div className="mt-1 flex items-center space-x-4 text-sm text-earth-500 dark:text-earth-400">
                        {referral.phone && (
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            {referral.phone}
                          </div>
                        )}
                        {referral.email && (
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-1" />
                            {referral.email}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {selectedReferral === referral.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 space-y-4"
                    >
                      <div className="flex flex-wrap gap-2">
                        {['pending', 'contacted', 'converted'].map((status) => (
                          <button
                            key={status}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusUpdate(referral, status as Referral['status']);
                            }}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              referral.status === status 
                                ? status === 'converted' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                                : status === 'contacted'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200'
                                : 'bg-earth-100 text-earth-700 dark:bg-earth-700 dark:text-earth-300'
                            }`}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </button>
                        ))}
                      </div>
                      
                      {referral.notes && (
                        <p className="text-sm text-earth-600 dark:text-earth-300">
                          {referral.notes}
                        </p>
                      )}
                    </motion.div>
                  )}
                </div>
                <div className="ml-4 flex flex-shrink-0 items-center space-x-4">
                  <div className="text-sm text-earth-500 dark:text-earth-400">
                    {new Date(referral.date).toLocaleDateString()}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusUpdate(referral, 
                        referral.status === 'pending' ? 'contacted' :
                        referral.status === 'contacted' ? 'converted' : 'pending'
                      );
                    }}
                    className="rounded-full p-1 text-earth-400 hover:text-earth-500 dark:text-earth-500 dark:hover:text-earth-400"
                    title="Update status"
                  >
                    <RefreshCw className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {showCelebration && convertedReferral && (
          <ConversionCelebration
            referral={convertedReferral}
            onClose={undoConversion}
            onComplete={() => handleConversionComplete(convertedReferral)}
          />
        )}
      </AnimatePresence>

      {showSaleForm && convertedReferral && (
        <SaleForm
          initialData={{
            customerInfo: {
              name: convertedReferral.name,
              email: convertedReferral.email,
              phone: convertedReferral.phone
            }
          }}
          onSubmit={handleSaleComplete}
          onClose={() => setShowSaleForm(false)}
        />
      )}
    </div>
  );
}