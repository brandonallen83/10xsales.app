import React from 'react';
import { useForm } from 'react-hook-form';
import { Target, ArrowRight, ChevronRight, RefreshCw, TrendingUp } from 'lucide-react';
import { SKILL_LEVEL_METRICS } from '../lib/constants';
import { useGoal } from '../context/GoalContext';
import { GoalProgress } from '../components/GoalProgress';
import { useQuery } from '@tanstack/react-query';
import { getMockSales } from '../lib/mockData';
import type { SalesGoal } from '../types';

export function Goals() {
  const { monthlyGoal, setMonthlyGoal, resetGoal } = useGoal();
  const { register, handleSubmit, watch } = useForm<SalesGoal>({
    defaultValues: monthlyGoal || {
      month: new Date().toLocaleString('default', { month: 'long' }),
      year: new Date().getFullYear(),
      skillLevel: 'rising_star',
      targetUnits: 10,
      targetIncome: 10000,
      targetAftermarket: 2,
      targetCommission: 2000
    }
  });

  const { data: sales = [] } = useQuery({
    queryKey: ['sales'],
    queryFn: getMockSales
  });

  const skillLevel = watch('skillLevel');
  const targetUnits = watch('targetUnits');

  const handleGoalSubmit = (data: SalesGoal) => {
    setMonthlyGoal(data);
  };

  return (
    <div className="space-y-6">
      {monthlyGoal && (
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-earth-900 dark:text-earth-100">
            Sales Goals & Progress
          </h1>
          <button
            onClick={resetGoal}
            className="inline-flex items-center px-3 py-2 border border-earth-300 dark:border-earth-600 rounded-md text-sm font-medium text-earth-700 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-700"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset Goals
          </button>
        </div>
      )}

      {monthlyGoal ? (
        <>
          <div className="bg-white dark:bg-earth-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-earth-900 dark:text-earth-100 mb-6">
              Current Goals
            </h2>

            <form onSubmit={handleSubmit(handleGoalSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                  Your Experience Level
                </label>
                <select
                  {...register('skillLevel')}
                  className="mt-1 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                >
                  <option value="rising_star">Rising Star (0-1 years)</option>
                  <option value="road_warrior">Road Warrior (1-3 years)</option>
                  <option value="deal_maker">Deal Maker (3-5 years)</option>
                  <option value="sales_guru">Sales Guru (5+ years)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                    Target Units
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <Target className="h-5 w-5 text-earth-400" />
                    </div>
                    <input
                      type="number"
                      {...register('targetUnits', { min: 1 })}
                      className="pl-10 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                    Target Income
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <TrendingUp className="h-5 w-5 text-earth-400" />
                    </div>
                    <input
                      type="number"
                      {...register('targetIncome', { min: 1000 })}
                      className="pl-10 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                    Aftermarket Products per Sale
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register('targetAftermarket', { min: 0 })}
                    className="mt-1 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                    Average Commission per Unit
                  </label>
                  <input
                    type="number"
                    {...register('targetCommission', { min: 100 })}
                    className="mt-1 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                  />
                </div>
              </div>

              <div className="text-sm text-earth-500 dark:text-earth-400 space-y-2">
                <p className="text-center">
                  Based on your level ({SKILL_LEVEL_METRICS[skillLevel]?.label}), 
                  {targetUnits > 0 && ` selling ${targetUnits} units this month is `}
                  {targetUnits > 0 && (
                    targetUnits <= 8 ? 'a great foundation to build on!' :
                    targetUnits <= 15 ? 'an exciting challenge within reach!' :
                    'an ambitious goal - you\'ve got this!'
                  )}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Update Goals
                </button>
              </div>
            </form>
          </div>
          
          <GoalProgress sales={sales} goal={monthlyGoal} />
        </>
      ) : (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-earth-800 rounded-lg p-6 max-w-lg w-full shadow-xl">
            <h2 className="text-2xl font-bold text-earth-900 dark:text-earth-100 mb-6">
              Set Your {new Date().toLocaleString('default', { month: 'long' })} Goals
            </h2>

            <form onSubmit={handleSubmit(handleGoalSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                  Your Experience Level
                </label>
                <select
                  {...register('skillLevel')}
                  className="mt-1 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                >
                  <option value="rising_star">Rising Star (0-1 years)</option>
                  <option value="road_warrior">Road Warrior (1-3 years)</option>
                  <option value="deal_maker">Deal Maker (3-5 years)</option>
                  <option value="sales_guru">Sales Guru (5+ years)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                    Target Units
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <Target className="h-5 w-5 text-earth-400" />
                    </div>
                    <input
                      type="number"
                      {...register('targetUnits', { min: 1 })}
                      className="pl-10 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                    Target Income
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <TrendingUp className="h-5 w-5 text-earth-400" />
                    </div>
                    <input
                      type="number"
                      {...register('targetIncome', { min: 1000 })}
                      className="pl-10 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                    Aftermarket Products per Sale
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register('targetAftermarket', { min: 0 })}
                    className="mt-1 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 dark:text-earth-300">
                    Average Commission per Unit
                  </label>
                  <input
                    type="number"
                    {...register('targetCommission', { min: 100 })}
                    className="mt-1 block w-full rounded-md border-earth-300 dark:border-earth-600 dark:bg-earth-700 dark:text-earth-100"
                  />
                </div>
              </div>

              <div className="text-sm text-earth-500 dark:text-earth-400 space-y-2">
                <p className="text-center">
                  Based on your level ({SKILL_LEVEL_METRICS[skillLevel]?.label}), 
                  {targetUnits > 0 && ` selling ${targetUnits} units this month is `}
                  {targetUnits > 0 && (
                    targetUnits <= 8 ? 'a great foundation to build on!' :
                    targetUnits <= 15 ? 'an exciting challenge within reach!' :
                    'an ambitious goal - you\'ve got this!'
                  )}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Set Goals
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}