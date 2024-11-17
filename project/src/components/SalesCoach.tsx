import React, { useState } from 'react';
import { BookOpen, Target, TrendingUp, AlertCircle } from 'lucide-react';
import type { SalesGoal, SkillLevel, SkillLevelMetrics } from '../types';
import { SKILL_LEVEL_METRICS } from '../lib/constants';
import { Tutorial } from './Tutorial';
import { MotivationalModal } from './MotivationalModal';
import { MOCK_ARTICLES } from '../lib/mockData';

interface SalesCoachProps {
  monthlyGoal: SalesGoal;
  currentSales: number;
}

export function SalesCoach({ monthlyGoal, currentSales }: SalesCoachProps) {
  const [showTutorial, setShowTutorial] = useState(false);
  const [showMotivational, setShowMotivational] = useState(false);
  const [selectedTutorial, setSelectedTutorial] = useState<string>('');

  const metrics = SKILL_LEVEL_METRICS[monthlyGoal.skillLevel as SkillLevel] as SkillLevelMetrics;
  const remainingDays = new Date(monthlyGoal.year, new Date().getMonth() + 1, 0).getDate() - new Date().getDate() + 1;
  const remainingUnits = monthlyGoal.targetUnits - currentSales;
  const unitsPerDay = remainingUnits / remainingDays;
  const progress = (currentSales / monthlyGoal.targetUnits) * 100;

  const dailyActivities = {
    prospects: Math.ceil(unitsPerDay / (metrics?.prospectToAppointment || 0.2)),
    appointments: Math.ceil(unitsPerDay / ((metrics?.prospectToAppointment || 0.2) * (metrics?.appointmentToDemo || 0.6))),
    demos: Math.ceil(unitsPerDay / ((metrics?.prospectToAppointment || 0.2) * (metrics?.appointmentToDemo || 0.6) * (metrics?.demoToOffer || 0.5))),
  };

  const getProgressColor = () => {
    if (progress >= 100) return 'bg-success-500';
    if (progress >= 75) return 'bg-primary-500';
    if (progress >= 50) return 'bg-warning-500';
    return 'bg-earth-500';
  };

  return (
    <div className="space-y-6">
      <div className="bg-earth-100 dark:bg-earth-900 rounded-full h-4 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${getProgressColor()}`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-earth-50 dark:bg-earth-900 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-earth-600 dark:text-earth-400" />
              <h4 className="font-medium text-earth-900 dark:text-earth-100">Daily Goals</h4>
            </div>
            {progress < 100 && (
              <button
                onClick={() => setShowMotivational(true)}
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
              >
                <AlertCircle className="h-5 w-5" />
              </button>
            )}
          </div>
          <ul className="space-y-2 text-sm text-earth-600 dark:text-earth-300">
            <li className="flex justify-between">
              <span>New Prospects:</span>
              <span className="font-semibold">{dailyActivities.prospects}</span>
            </li>
            <li className="flex justify-between">
              <span>Appointments:</span>
              <span className="font-semibold">{dailyActivities.appointments}</span>
            </li>
            <li className="flex justify-between">
              <span>Test Drives:</span>
              <span className="font-semibold">{dailyActivities.demos}</span>
            </li>
          </ul>
        </div>

        <div className="bg-earth-50 dark:bg-earth-900 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-earth-600 dark:text-earth-400" />
            <h4 className="font-medium text-earth-900 dark:text-earth-100">Progress</h4>
          </div>
          <ul className="space-y-2 text-sm text-earth-600 dark:text-earth-300">
            <li className="flex justify-between">
              <span>Current Sales:</span>
              <span className="font-semibold">{currentSales}</span>
            </li>
            <li className="flex justify-between">
              <span>Remaining:</span>
              <span className="font-semibold">{remainingUnits}</span>
            </li>
            <li className="flex justify-between">
              <span>Days Left:</span>
              <span className="font-semibold">{remainingDays}</span>
            </li>
          </ul>
        </div>

        <div className="bg-earth-50 dark:bg-earth-900 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-earth-600 dark:text-earth-400" />
              <h4 className="font-medium text-earth-900 dark:text-earth-100">Resources</h4>
            </div>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => {
                setSelectedTutorial('sales-process');
                setShowTutorial(true);
              }}
              className="w-full text-left px-3 py-2 text-sm text-earth-600 dark:text-earth-300 hover:bg-earth-100 dark:hover:bg-earth-800 rounded-md"
            >
              View Sales Process Guide
            </button>
            <button
              onClick={() => {
                setSelectedTutorial('aftermarket');
                setShowTutorial(true);
              }}
              className="w-full text-left px-3 py-2 text-sm text-earth-600 dark:text-earth-300 hover:bg-earth-100 dark:hover:bg-earth-800 rounded-md"
            >
              Aftermarket Sales Tips
            </button>
          </div>
        </div>
      </div>

      <div className="bg-earth-50 dark:bg-earth-900 p-4 rounded-lg">
        <h4 className="font-medium text-earth-900 dark:text-earth-100 mb-4">Latest Industry News</h4>
        <div className="space-y-3">
          {MOCK_ARTICLES.map((article, index) => (
            <a
              key={index}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 hover:bg-earth-100 dark:hover:bg-earth-800 rounded-md"
            >
              <h5 className="text-sm font-medium text-earth-900 dark:text-earth-100">
                {article.title}
              </h5>
              <p className="text-xs text-earth-500 dark:text-earth-400 mt-1">
                {new Date(article.pubDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-earth-600 dark:text-earth-300 mt-1">
                {article.description}
              </p>
            </a>
          ))}
        </div>
      </div>

      {showTutorial && (
        <Tutorial
          title={selectedTutorial === 'aftermarket' ? 'Aftermarket Sales Mastery' : 'Sales Process Guide'}
          content={selectedTutorial === 'aftermarket' ? {
            overview: 'Master the art of presenting and selling aftermarket products to increase your commission and provide value to your customers.',
            steps: [
              'Start with the front exterior highlighting safety features',
              'Move to the driver\'s side emphasizing comfort and technology',
              'Present the rear focusing on utility and practicality',
              'Finish with passenger side and interior luxury features',
            ],
            examples: [
              'Point out potential paint damage areas and introduce paint protection',
              'Demonstrate how wheel and tire protection saves money',
              'Show how interior protection maintains value',
            ],
            keyPoints: [
              'Always walk around with the customer',
              'Use visual aids and real examples',
              'Focus on value over cost',
              'Bundle products for maximum benefit',
            ],
          } : {
            overview: 'A comprehensive guide to the vehicle sales process from greeting to delivery.',
            steps: [
              'Professional greeting and needs assessment',
              'Vehicle selection and presentation',
              'Test drive and feature demonstration',
              'Price presentation and negotiation',
              'F&I process and delivery',
            ],
            examples: [
              'Use open-ended questions during needs assessment',
              'Present vehicle features based on customer priorities',
              'Handle objections with confidence',
            ],
            keyPoints: [
              'Build rapport early',
              'Listen more than you talk',
              'Follow up consistently',
              'Always ask for referrals',
            ],
          }}
          onClose={() => setShowTutorial(false)}
        />
      )}

      {showMotivational && (
        <MotivationalModal
          isOpen={showMotivational}
          onClose={() => setShowMotivational(false)}
          skillLevel={monthlyGoal.skillLevel}
          progress={progress}
        />
      )}
    </div>
  );
}