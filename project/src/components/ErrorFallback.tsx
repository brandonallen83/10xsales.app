import { AlertCircle } from 'lucide-react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen bg-earth-50 dark:bg-earth-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-earth-800 rounded-lg shadow-xl p-6 max-w-md w-full">
        <div className="flex items-center space-x-3 text-red-600 dark:text-red-400 mb-4">
          <AlertCircle className="h-6 w-6" />
          <h2 className="text-lg font-semibold">Something went wrong</h2>
        </div>
        <p className="text-earth-600 dark:text-earth-300 mb-4">
          {error.message}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}