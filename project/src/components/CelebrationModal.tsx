import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { X } from 'lucide-react';

interface CelebrationModalProps {
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

export function CelebrationModal({ onClose, autoClose = true, duration = 5000 }: CelebrationModalProps) {
  useEffect(() => {
    // Launch confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (autoClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

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
        className="bg-white dark:bg-earth-800 rounded-lg shadow-xl p-6 max-w-sm w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-earth-400 hover:text-earth-500"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-earth-900 dark:text-earth-100 mb-2">
            🎉 Congratulations!
          </h3>
          <p className="text-earth-600 dark:text-earth-300 mb-4">
            You've successfully converted a referral into a sale!
          </p>
          <p className="text-sm text-earth-500 dark:text-earth-400">
            Click anywhere or wait 5 seconds to continue...
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}