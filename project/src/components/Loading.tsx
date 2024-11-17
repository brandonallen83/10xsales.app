import { Loader2 } from 'lucide-react';

export function Loading() {
  return (
    <div className="fixed inset-0 bg-earth-50/90 dark:bg-earth-900/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-earth-800 rounded-lg shadow-xl p-6 flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 text-primary-600 animate-spin" />
        <p className="text-earth-600 dark:text-earth-300">Loading your dashboard...</p>
      </div>
    </div>
  );
}