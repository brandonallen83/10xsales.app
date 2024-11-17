import { createContext, useContext, useState, useCallback } from 'react';
import { openDB } from 'idb';
import type { User } from '../types';
import { toast } from 'react-hot-toast';
import { useGoal } from './GoalContext';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: {
    email: string;
    password: string;
    name: string;
    dealership: string;
  }) => Promise<void>;
  updateSubscription: (tier: 'free' | 'pro') => Promise<void>;
  showWelcomeModal: boolean;
  setShowWelcomeModal: (show: boolean) => void;
  isNewUser: boolean;
  setIsNewUser: (isNew: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const { setShowGoalModal } = useGoal();

  const login = useCallback(async (email: string, password: string) => {
    try {
      // Implement actual authentication logic here
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid credentials');
      throw error;
    }
  }, []);

  const register = useCallback(async (data: {
    email: string;
    password: string;
    name: string;
    dealership: string;
  }) => {
    try {
      const newUser: User = {
        id: Math.random().toString(36).substring(2),
        email: data.email,
        name: data.name,
        dealership: data.dealership,
        subscription: {
          tier: 'free',
          status: 'active',
          currentPeriodStart: new Date().toISOString(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        }
      };

      setUser(newUser);
      setIsNewUser(true);
      setShowGoalModal(true); // Show goal modal immediately after registration
      toast.success('Registration successful!');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
      throw new Error('Registration failed. Please try again.');
    }
  }, [setShowGoalModal]);

  const logout = useCallback(() => {
    setUser(null);
    toast.success('Logged out successfully');
  }, []);

  const updateSubscription = useCallback(async (tier: 'free' | 'pro') => {
    if (!user) throw new Error('No user logged in');

    const updatedUser: User = {
      ...user,
      subscription: {
        ...user.subscription,
        tier,
        currentPeriodStart: new Date().toISOString(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      }
    };

    setUser(updatedUser);
    toast.success(`Subscription updated to ${tier} plan`);
  }, [user]);

  const value = {
    user,
    login,
    logout,
    register,
    updateSubscription,
    showWelcomeModal,
    setShowWelcomeModal,
    isNewUser,
    setIsNewUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}