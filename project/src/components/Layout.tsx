import React, { useState, useEffect } from 'react';
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Target, DollarSign, CreditCard, Settings, Users, UserPlus, Database, Car, LogOut, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useFeatureAccess } from '../hooks/useFeatureAccess';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';
import { SaleForm } from './SaleForm';
import { Sitemap } from './Sitemap';
import { TimeBasedGreeting } from './TimeBasedGreeting';
import type { SubscriptionTier } from '../types';

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCRMOpen, setIsCRMOpen] = useState(false);
  const [showSaleForm, setShowSaleForm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { canAccess } = useFeatureAccess();
  const { theme, toggleTheme } = useTheme();

  // Close menus when location changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsCRMOpen(false);
  }, [location.pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.navigation-menu') && !target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userTier: SubscriptionTier = user?.subscription?.tier || 'free';
  const isPaidUser = canAccess('pro');

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  const handleNavigation = (path: string) => {
    handleClose();
    navigate(path);
  };

  const navigationItems = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: Home,
      description: 'View your sales dashboard'
    },
    {
      title: 'Goals',
      path: '/goals',
      icon: Target,
      description: 'Set and track your goals'
    },
    {
      title: 'Sales',
      path: '/sales',
      icon: DollarSign,
      description: 'Manage your sales'
    },
    {
      title: 'Subscription',
      path: '/subscription',
      icon: CreditCard,
      description: 'Manage your subscription'
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: Settings,
      description: 'Account settings'
    }
  ];

  const getTierColor = (tier: SubscriptionTier) => {
    switch (tier) {
      case 'enterprise':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      case 'pro':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getTierLabel = (tier: SubscriptionTier) => {
    switch (tier) {
      case 'enterprise':
        return 'Enterprise';
      case 'pro':
        return 'Professional';
      default:
        return 'Free';
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-earth-900 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-earth-800 border-b border-earth-200 dark:border-earth-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="menu-button text-earth-600 dark:text-earth-300 hover:text-earth-900 dark:hover:text-earth-100"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              {user && <TimeBasedGreeting userName={user.name} />}

              {isPaidUser && (
                <div className="ml-6 flex items-center space-x-4">
                  <div className="relative">
                    <button
                      onClick={() => setIsCRMOpen(!isCRMOpen)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-earth-600 dark:text-earth-300 hover:bg-earth-100 dark:hover:bg-earth-700"
                    >
                      <Database className="h-5 w-5" />
                      <span>CRM</span>
                    </button>
                    
                    <AnimatePresence>
                      {isCRMOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-earth-800 ring-1 ring-black ring-opacity-5 z-50"
                        >
                          <div className="py-1">
                            <button
                              onClick={() => {
                                setIsCRMOpen(false);
                                navigate('/customers');
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-earth-700 dark:text-earth-300 hover:bg-earth-100 dark:hover:bg-earth-700"
                            >
                              <Users className="h-4 w-4 mr-3" />
                              Customer Database
                            </button>
                            <button
                              onClick={() => {
                                setIsCRMOpen(false);
                                navigate('/referrals');
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-earth-700 dark:text-earth-300 hover:bg-earth-100 dark:hover:bg-earth-700"
                            >
                              <UserPlus className="h-4 w-4 mr-3" />
                              Referral Network
                            </button>
                            <button
                              onClick={() => {
                                setIsCRMOpen(false);
                                navigate('/referrer-rankings');
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-earth-700 dark:text-earth-300 hover:bg-earth-100 dark:hover:bg-earth-700"
                            >
                              <Trophy className="h-4 w-4 mr-3" />
                              Referrer Rankings
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={() => setShowSaleForm(true)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-earth-600 dark:text-earth-300 hover:bg-earth-100 dark:hover:bg-earth-700"
                  >
                    <Car className="h-5 w-5" />
                    <span>Add Sale</span>
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <span className={cn(
                'px-2 py-1 text-xs font-medium rounded-full',
                getTierColor(userTier)
              )}>
                {getTierLabel(userTier)}
              </span>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-earth-600 dark:text-earth-300 hover:bg-earth-100 dark:hover:bg-earth-700"
              >
                {theme === 'dark' ? '🌞' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Side Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={handleClose}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween' }}
              className="navigation-menu fixed inset-y-0 left-0 w-64 bg-white dark:bg-earth-800 shadow-xl z-50"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-semibold text-earth-900 dark:text-earth-100">Navigation</h2>
                  <button
                    onClick={handleClose}
                    className="text-earth-500 hover:text-earth-700 dark:text-earth-400 dark:hover:text-earth-200"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navigationItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <button
                        key={item.path}
                        onClick={() => handleNavigation(item.path)}
                        className={cn(
                          'w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors',
                          isActive
                            ? 'bg-earth-100 text-earth-900 dark:bg-earth-700 dark:text-earth-100'
                            : 'text-earth-600 hover:bg-earth-50 dark:text-earth-300 dark:hover:bg-earth-700/50'
                        )}
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        <span>{item.title}</span>
                      </button>
                    );
                  })}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-earth-800 border-t border-earth-200 dark:border-earth-700">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="text-sm text-earth-500 dark:text-earth-400">
              © {new Date().getFullYear()} 10xsales.app
            </div>
            <div className="flex space-x-6">
              <button
                onClick={() => handleNavigation('/privacy')}
                className="text-sm text-earth-500 hover:text-earth-700 dark:text-earth-400 dark:hover:text-earth-200"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => handleNavigation('/terms')}
                className="text-sm text-earth-500 hover:text-earth-700 dark:text-earth-400 dark:hover:text-earth-200"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Sitemap */}
      <Sitemap />

      {/* Sale Form Modal */}
      {showSaleForm && (
        <SaleForm
          onSubmit={async () => {
            setShowSaleForm(false);
          }}
          onClose={() => setShowSaleForm(false)}
        />
      )}
    </div>
  );
}