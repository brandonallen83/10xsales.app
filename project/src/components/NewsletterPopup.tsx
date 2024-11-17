import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Mail, Star, TrendingUp } from 'lucide-react';
import { toast } from 'react-hot-toast';

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Only show newsletter if user hasn't seen it before
    const hasSeenNewsletter = localStorage.getItem('newsletter_seen');
    
    if (hasSeenNewsletter !== 'true') {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('newsletter_seen', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    // Store subscription
    localStorage.setItem('newsletter_subscribed', 'true');
    localStorage.setItem('newsletter_seen', 'true');
    setIsOpen(false);
    toast.success('Successfully subscribed to the newsletter!');
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-earth-800 rounded-lg shadow-xl max-w-md w-full relative"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-earth-400 hover:text-earth-500 dark:text-earth-500 dark:hover:text-earth-400"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary-100 dark:bg-primary-900/20 p-3 rounded-full">
              <Mail className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-earth-900 dark:text-earth-100 mb-2">
            Join Our Community
          </h2>
          
          <p className="text-earth-600 dark:text-earth-300 text-center mb-6">
            Get exclusive insights and expert tips delivered to your inbox.
          </p>

          <div className="space-y-4 mb-6">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0" />
              <span className="text-sm text-earth-600 dark:text-earth-300">
                Weekly success stories from top performers
              </span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-sm text-earth-600 dark:text-earth-300">
                Actionable tips to boost your performance
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="block w-full rounded-md border-earth-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-earth-700 dark:border-earth-600 dark:text-earth-100"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Subscribe Now
            </button>
          </form>

          <button
            onClick={handleClose}
            className="mt-4 w-full text-sm text-earth-500 dark:text-earth-400 hover:text-earth-600 dark:hover:text-earth-300"
          >
            Maybe later
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}