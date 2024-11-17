import React, { createContext, useContext, useState, useEffect } from 'react';
import type { SalesGoal } from '../types';

interface GoalContextType {
  monthlyGoal: SalesGoal | null;
  setMonthlyGoal: (goal: SalesGoal) => void;
  resetGoal: () => void;
  showGoalModal: boolean;
  setShowGoalModal: (show: boolean) => void;
}

const GoalContext = createContext<GoalContextType | null>(null);

export function GoalProvider({ children }: { children: React.ReactNode }) {
  const [monthlyGoal, setMonthlyGoal] = useState<SalesGoal | null>(() => {
    const saved = localStorage.getItem('monthlyGoal');
    if (saved) {
      const goal = JSON.parse(saved);
      const currentMonth = new Date().toLocaleString('default', { month: 'long' });
      const currentYear = new Date().getFullYear();
      if (goal.month === currentMonth && goal.year === currentYear) {
        return goal;
      }
    }
    return null;
  });

  const [showGoalModal, setShowGoalModal] = useState(false);

  // Check for first day of month goal reset
  useEffect(() => {
    const today = new Date();
    if (today.getDate() === 1 && monthlyGoal) {
      const lastLoginStr = localStorage.getItem('lastLogin');
      if (lastLoginStr) {
        const lastLogin = new Date(lastLoginStr);
        if (lastLogin.getMonth() !== today.getMonth()) {
          // Ask user if they want to reset goals
          const shouldReset = window.confirm('Would you like to set new goals for this month?');
          if (shouldReset) {
            resetGoal();
            setShowGoalModal(true);
          }
        }
      }
    }
    // Update last login
    localStorage.setItem('lastLogin', today.toISOString());
  }, []);

  // Save goals to localStorage
  useEffect(() => {
    if (monthlyGoal) {
      localStorage.setItem('monthlyGoal', JSON.stringify(monthlyGoal));
    } else {
      localStorage.removeItem('monthlyGoal');
    }
  }, [monthlyGoal]);

  const resetGoal = () => {
    setMonthlyGoal(null);
    localStorage.removeItem('monthlyGoal');
  };

  return (
    <GoalContext.Provider value={{ 
      monthlyGoal, 
      setMonthlyGoal, 
      resetGoal,
      showGoalModal,
      setShowGoalModal
    }}>
      {children}
    </GoalContext.Provider>
  );
}

export function useGoal() {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error('useGoal must be used within a GoalProvider');
  }
  return context;
}