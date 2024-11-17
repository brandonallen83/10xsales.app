import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Target, DollarSign, Users, ChevronRight, ChevronLeft, X, Crown, BarChart, Gift, Gauge, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGoal } from '../context/GoalContext';

interface WelcomeModalProps {
  userName: string;
  onClose: () => void;
}

export function WelcomeModal({ userName, onClose }: WelcomeModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { updateSubscription } = useAuth();
  const { setShowGoalModal } = useGoal();

  const slides = [
    {
      title: `Welcome aboard, ${userName}!`,
      description: "Let's get you set up for success with 10xSales - your personal sales performance companion.",
      icon: Car,
      animation: {
        initial: { scale: 0, rotateY: -180 },
        animate: { scale: 1, rotateY: 0 },
        transition: { type: "spring", stiffness: 260, damping: 20 }
      }
    },
    {
      title: "Smart Goal Setting",
      description: "Set and track your monthly targets with AI-powered insights that adapt to your experience level and market conditions.",
      icon: Target,
      animation: {
        initial: { y: 50, opacity: 0, rotateX: -30 },
        animate: { y: 0, opacity: 1, rotateX: 0 },
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }
    },
    {
      title: "Commission Tracking",
      description: "Track every deal with detailed front-end, back-end, and F&I performance metrics. Pro users see an average 32% increase in F&I income.",
      icon: DollarSign,
      animation: {
        initial: { scale: 0.5, opacity: 0, rotate: -45 },
        animate: { scale: 1, opacity: 1, rotate: 0 },
        transition: { type: "spring", stiffness: 200, damping: 15 }
      }
    },
    {
      title: "Referral Network",
      description: "Pro users generate 3x more referrals with our automated tracking system and AI-optimized follow-up strategies.",
      icon: Gift,
      animation: {
        initial: { x: -100, opacity: 0, rotateZ: -30 },
        animate: { x: 0, opacity: 1, rotateZ: 0 },
        transition: { type: "spring", stiffness: 200, damping: 15 }
      }
    },
    {
      title: "Performance Analytics",
      description: "Get real-time insights into your sales performance. Users report an average 27% increase in monthly income with our analytics.",
      icon: BarChart,
      animation: {
        initial: { scale: 1.5, opacity: 0, rotateY: 90 },
        animate: { scale: 1, opacity: 1, rotateY: 0 },
        transition: { type: "spring", stiffness: 200, damping: 15 }
      }
    },
    {
      title: "Unlock Your Full Potential",
      description: "Start with Pro today. 14-day money-back guarantee if you're not completely satisfied.",
      icon: Crown,
      isLast: true,
      animation: {
        initial: { scale: 0, opacity: 0, rotate: 180 },
        animate: { scale: 1, opacity: 1, rotate: 0 },
        transition: { type: "spring", stiffness: 200, damping: 15 }
      }
    },
  ];

  const handleClose = () => {
    onClose();
    setShowGoalModal(true);
  };

  const handleFreePlan = async () => {
    try {
      await updateSubscription('free');
      handleClose();
    } catch (error) {
      console.error('Error setting free plan:', error);
    }
  };

  const handleProPlan = () => {
    window.location.href = 'https://buy.stripe.com/6oEdQR6OfaWUdlC5km';
    handleClose();
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-earth-800 rounded-lg p-8 max-w-lg w-full relative overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(140, 120, 98, 0.1) 0%, rgba(140, 120, 98, 0) 100%)',
          perspective: '1000px'
        }}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-earth-400 hover:text-earth-500 z-10"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center">
          <motion.div
            {...slides[currentSlide].animation}
            className="mb-6 transform-gpu"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {React.createElement(slides[currentSlide].icon, {
              className: "h-16 w-16 mx-auto text-primary-500"
            })}
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-earth-900 dark:text-earth-100 mb-3"
          >
            {slides[currentSlide].title}
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-earth-600 dark:text-earth-300"
          >
            {slides[currentSlide].description}
          </motion.p>
        </div>

        {slides[currentSlide].isLast ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="space-y-4 mt-8"
          >
            <button
              onClick={handleProPlan}
              className="w-full px-4 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center justify-center transform transition-all hover:scale-105 hover:shadow-lg"
            >
              <Crown className="h-5 w-5 mr-2" />
              Get Pro Now - $29.99/month
            </button>
            <button
              onClick={handleFreePlan}
              className="w-full px-4 py-3 border border-earth-300 dark:border-earth-600 text-earth-700 dark:text-earth-300 rounded-lg hover:bg-earth-50 dark:hover:bg-earth-700 transform transition-all hover:scale-105"
            >
              Start with Free Plan
            </button>
            <p className="text-sm text-earth-500 dark:text-earth-400 text-center">
              100% money-back guarantee for 14 days
            </p>
          </motion.div>
        ) : (
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePrev}
              className={`p-2 rounded-full ${
                currentSlide === 0
                  ? 'text-earth-300 cursor-not-allowed'
                  : 'text-earth-600 hover:bg-earth-100'
              }`}
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`h-2 w-2 rounded-full ${
                    index === currentSlide
                      ? 'bg-primary-500'
                      : 'bg-earth-200 dark:bg-earth-700'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="p-2 rounded-full text-earth-600 hover:bg-earth-100"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}