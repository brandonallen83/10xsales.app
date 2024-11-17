import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Referral } from '../types';

interface ConversionCelebrationProps {
  referral: Referral;
  onClose: () => void;
  onComplete: () => void;
}

export function ConversionCelebration({ referral, onClose, onComplete }: ConversionCelebrationProps) {
  useEffect(() => {
    // Launch confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Auto-complete after 5 seconds
    const timer = setTimeout(onComplete, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-earth-800 rounded-lg p-6 max-w-md w-full text-center relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-earth-400 hover:text-earth-500"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-4">
          <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-earth-900 dark:text-earth-100 mb-2">
            Congratulations!
          </h2>
          <p className="text-earth-600 dark:text-earth-300">
            {referral.name} is being converted to a customer!
          </p>
        </div>

        <div className="mb-6">
          <motion.div
            className="h-2 bg-earth-200 dark:bg-earth-700 rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 5, ease: 'linear' }}
              className="h-full bg-green-500"
            />
          </motion.div>
          <p className="mt-2 text-sm text-earth-500 dark:text-earth-400">
            Converting in 5 seconds...
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-earth-100 text-earth-700 rounded-md hover:bg-earth-200 dark:bg-earth-700 dark:text-earth-300 dark:hover:bg-earth-600"
          >
            Cancel
          </button>
          <button
            onClick={onComplete}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Complete Now
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}