import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Sunset } from 'lucide-react';

interface TimeBasedGreetingProps {
  userName: string;
}

export function TimeBasedGreeting({ userName }: TimeBasedGreetingProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return {
        text: 'Good morning',
        icon: Sun,
        color: 'text-yellow-500'
      };
    } else if (hour < 17) {
      return {
        text: 'Good afternoon',
        icon: Sunset,
        color: 'text-orange-500'
      };
    } else {
      return {
        text: 'Good evening',
        icon: Moon,
        color: 'text-blue-500'
      };
    }
  };

  const { text, icon: Icon, color } = getGreeting();
  const firstName = userName?.split(' ')[0] || 'Guest';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-earth-800 rounded-lg shadow-sm"
    >
      <Icon className={`h-5 w-5 ${color}`} />
      <span className="text-earth-900 dark:text-earth-100">
        {text}, {firstName}
      </span>
    </motion.div>
  );
}