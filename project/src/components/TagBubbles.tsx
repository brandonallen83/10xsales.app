import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MessageCircle, Check } from 'lucide-react';
import type { Referral } from '../types';

interface TagBubblesProps {
  status: Referral['status'];
  onStatusChange: (status: Referral['status']) => void;
  className?: string;
}

export function TagBubbles({ status, onStatusChange, className = '' }: TagBubblesProps) {
  const statusTags = [
    {
      value: 'pending',
      label: 'Pending',
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
      hoverColor: 'hover:bg-yellow-200 dark:hover:bg-yellow-900/30'
    },
    {
      value: 'contacted',
      label: 'Contacted',
      icon: MessageCircle,
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
      hoverColor: 'hover:bg-blue-200 dark:hover:bg-blue-900/30'
    },
    {
      value: 'converted',
      label: 'Converted',
      icon: Check,
      color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      hoverColor: 'hover:bg-green-200 dark:hover:bg-green-900/30'
    }
  ];

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {statusTags.map((tag) => {
        const Icon = tag.icon;
        const isActive = status === tag.value;
        
        return (
          <motion.button
            key={tag.value}
            whileTap={{ scale: 0.95 }}
            onClick={() => onStatusChange(tag.value as Referral['status'])}
            className={`
              inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium
              transition-colors duration-200 ease-in-out
              ${tag.color} ${tag.hoverColor}
              ${isActive ? 'ring-2 ring-offset-2 ring-current' : ''}
            `}
          >
            <Icon className="h-4 w-4 mr-1.5" />
            {tag.label}
          </motion.button>
        );
      })}
    </div>
  );
}