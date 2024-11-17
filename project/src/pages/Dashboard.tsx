import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Trophy, TrendingUp, Users, DollarSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useGoal } from '../context/GoalContext';
import { GoalPrompt } from '../components/GoalPrompt';
import { GoalProgress } from '../components/GoalProgress';
import { SalesCoach } from '../components/SalesCoach';
import { getAllSales } from '../lib/db/sales';
import type { Sale, SalesGoal } from '../types';

export function Dashboard() {
  const { user } = useAuth();
  const location = useLocation();
  const { monthlyGoal, setMonthlyGoal, showGoalModal, setShowGoalModal } = useGoal();

  // Check for subscription success from Stripe
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('subscription') === 'success') {
      setShowGoalModal(true);
      // Clean up the URL
      window.history.replaceState({}, '', '/dashboard');
    }
  }, [location, setShowGoalModal]);

  // Show goal modal if no monthly goal is set
  useEffect(() => {
    if (!monthlyGoal) {
      setShowGoalModal(true);
    }
  }, [monthlyGoal, setShowGoalModal]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const { data: sales = [], isLoading } = useQuery({
    queryKey: ['sales'],
    queryFn: getAllSales,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const currentMonthSales = sales.filter(sale => {
    const saleDate = new Date(sale.date);
    return saleDate.getMonth() === currentMonth && saleDate.getFullYear() === currentYear;
  });

  // Calculate stats
  const totalCommission = currentMonthSales.reduce((sum, sale) => sum + (sale.totalCommission || 0), 0);
  const aftermarketCount = currentMonthSales.reduce((sum, sale) => sum + (sale.aftermarketProducts?.length || 0), 0);
  const avgAftermarket = currentMonthSales.length ? aftermarketCount / currentMonthSales.length : 0;

  const stats = [
    {
      title: 'Monthly Sales',
      value: currentMonthSales.length,
      icon: Trophy,
      color: 'bg-earth-500',
    },
    {
      title: 'Total Commission',
      value: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(totalCommission),
      icon: DollarSign,
      color: 'bg-earth-600',
    },
    {
      title: 'Goal Progress',
      value: monthlyGoal ? 
        `${Math.round((currentMonthSales.length / monthlyGoal.targetUnits) * 100)}%` : 
        'Set Goal',
      icon: TrendingUp,
      color: 'bg-earth-700',
    },
    {
      title: 'Aftermarket Ratio',
      value: `${avgAftermarket.toFixed(1)}/sale`,
      icon: Users,
      color: 'bg-earth-800',
    },
  ];

  const handleGoalSubmit = (goals: SalesGoal) => {
    setMonthlyGoal(goals);
    setShowGoalModal(false);
  };

  return (
    <div className="space-y-6">
      {showGoalModal && !monthlyGoal && (
        <GoalPrompt 
          onSubmit={handleGoalSubmit}
          currentMonth={new Date().toLocaleString('default', { month: 'long' })}
          currentYear={currentYear}
        />
      )}

      {monthlyGoal && (
        <>
          <GoalProgress 
            sales={currentMonthSales}
            goal={monthlyGoal}
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="bg-white dark:bg-earth-800 overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <stat.icon
                        className={`h-6 w-6 text-white p-1.5 rounded-full ${stat.color}`}
                      />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-earth-500 dark:text-earth-400 truncate">
                          {stat.title}
                        </dt>
                        <dd className="text-lg font-semibold text-earth-900 dark:text-earth-100">
                          {stat.value}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-earth-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-earth-900 dark:text-earth-100 mb-4">
              Your Path to Success
            </h3>
            <SalesCoach 
              monthlyGoal={monthlyGoal}
              currentSales={currentMonthSales.length}
            />
          </div>
        </>
      )}
    </div>
  );
}