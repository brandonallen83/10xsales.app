import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HelpCircle, X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Sitemap() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Close sitemap when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close sitemap when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.sitemap-content') && !target.closest('.sitemap-button')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleClose();
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  const links = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      description: 'View your sales performance overview'
    },
    {
      title: 'Goals',
      path: '/goals',
      description: 'Set and track your sales goals'
    },
    {
      title: 'Sales',
      path: '/sales',
      description: 'Track and manage your sales'
    },
    {
      title: 'Settings',
      path: '/settings',
      description: 'Manage your account and preferences',
      features: [
        'Commission rates',
        'Aftermarket settings',
        'Account deletion'
      ]
    },
    {
      title: 'Logout',
      path: '#',
      description: 'Sign out of your account',
      onClick: handleLogout
    }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sitemap-button bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg transition-colors"
          aria-label="Toggle navigation menu"
        >
          <HelpCircle className="h-6 w-6" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={handleClose}
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="sitemap-content absolute right-0 bottom-full mb-2 bg-white dark:bg-earth-800 rounded-lg shadow-xl z-50 w-72"
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-earth-900 dark:text-earth-100">
                      Quick Navigation
                    </h3>
                    <button
                      onClick={handleClose}
                      className="text-earth-500 hover:text-earth-700 dark:text-earth-400"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <nav className="space-y-2">
                    {links.map((link) => (
                      <div key={link.title} className="space-y-1">
                        <button
                          onClick={() => link.onClick ? link.onClick() : handleNavigation(link.path)}
                          className="w-full flex items-center p-2 text-earth-600 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-700 rounded-md group transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium">{link.title}</div>
                            <div className="text-xs text-earth-500 dark:text-earth-400 truncate">
                              {link.description}
                            </div>
                          </div>
                        </button>
                        {link.features && (
                          <div className="ml-6 pl-2 border-l-2 border-earth-200 dark:border-earth-700">
                            {link.features.map((feature, index) => (
                              <div
                                key={index}
                                className="text-xs text-earth-500 dark:text-earth-400 py-1"
                              >
                                • {feature}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}