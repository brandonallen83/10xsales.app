import React from 'react';
import { useForm } from 'react-hook-form';
import { Target, TrendingUp } from 'lucide-react';
import type { SalesGoal } from '../types';
import { SKILL_LEVEL_METRICS } from '../lib/constants';
import { useAuth } from '../context/AuthContext';

interface GoalPromptProps {
  onSubmit: (data: SalesGoal) => void;
  currentMonth: string;
  currentYear: number;
}

export function GoalPrompt({ onSubmit, currentMonth, currentYear }: GoalPromptProps) {
  const { isNewUser, setShowWelcomeModal } = useAuth();
  const { register, handleSubmit, watch } = useForm<SalesGoal>({
    defaultValues: {
      month: currentMonth,
      year: currentYear,
      skillLevel: 'rising_star',
      targetUnits: 10,
      targetIncome: 10000,
      targetAftermarket: 2,
      targetCommission: 2000
    }
  });

  const handleGoalSubmit = (data: SalesGoal) => {
    onSubmit(data);
    // Show welcome modal after goal setup for new users
    if (isNewUser) {
      setShowWelcomeModal(true);
    }
  };

  const skillLevel = watch('skillLevel');
  const targetUnits = watch('targetUnits');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-earth-800 rounded-lg p-6 max-w-lg w-full shadow-xl">
        <h2 className="text-2xl font-bold text-earth-900 dark:text-earth-100 mb-6">
          Set Your {currentMonth} Goals
        </h2>

        <form onSubmit={handleSubmit(handleGoalSubmit)} className="space-y-6">
          {/* Rest of the form remains the same */}
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
  );
}