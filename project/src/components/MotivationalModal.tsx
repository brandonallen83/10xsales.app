import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb, Target, TrendingUp, BookOpen } from 'lucide-react';

interface MotivationalModalProps {
  isOpen: boolean;
  onClose: () => void;
  skillLevel: string;
  progress: number;
}

export function MotivationalModal({ isOpen, onClose, skillLevel, progress }: MotivationalModalProps) {
  const getMotivationalContent = () => {
    if (progress < 25) {
      return {
        title: "Starting Strong!",
        message: "Every journey begins with a single step. Focus on building momentum through consistent daily activities.",
        tips: [
          "Set small, achievable daily goals",
          "Track every customer interaction",
          "Practice your product presentation daily",
          "Stay positive and maintain high energy"
        ]
      };
    } else if (progress < 50) {
      return {
        title: "Building Momentum!",
        message: "You're making progress! Now's the time to refine your process and increase your efficiency.",
        tips: [
          "Review successful sales and identify patterns",
          "Increase your follow-up frequency",
          "Focus on quality presentations over quantity",
          "Build your referral network"
        ]
      };
    } else if (progress < 75) {
      return {
        title: "In The Zone!",
        message: "You're hitting your stride! Keep pushing and maintain your successful habits.",
        tips: [
          "Share your success strategies with colleagues",
          "Look for opportunities to upsell",
          "Perfect your closing techniques",
          "Start mentoring newer team members"
        ]
      };
    } else {
      return {
        title: "Excellence in Motion!",
        message: "You're performing at a high level! Focus on consistency and helping others.",
        tips: [
          "Document your best practices",
          "Seek leadership opportunities",
          "Innovate your sales process",
          "Build long-term customer relationships"
        ]
      };
    }
  };

  const content = getMotivationalContent();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-earth-800 rounded-lg shadow-xl max-w-lg w-full"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-earth-900 dark:text-earth-100 flex items-center">
                  <Lightbulb className="h-6 w-6 mr-2 text-primary-500" />
                  {content.title}
                </h2>
                <button
                  onClick={onClose}
                  className="text-earth-500 hover:text-earth-700 dark:text-earth-400 dark:hover:text-earth-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                  <p className="text-primary-800 dark:text-primary-200">
                    {content.message}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-earth-900 dark:text-earth-100 mb-3">
                    Action Steps for Success
                  </h3>
                  <div className="space-y-3">
                    {content.tips.map((tip, index) => (
                      <div
                        key={index}
                        className="flex items-start p-3 bg-earth-50 dark:bg-earth-900/50 rounded-lg"
                      >
                        <Target className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                        <p className="text-earth-700 dark:text-earth-300">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-earth-600 dark:text-earth-400 hover:text-earth-800 dark:hover:text-earth-200"
                  >
                    Close
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg flex items-center"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Let's Achieve More
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}