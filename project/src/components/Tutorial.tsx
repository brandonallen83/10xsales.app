import React from 'react';
import { X, ExternalLink, BookOpen } from 'lucide-react';

interface TutorialProps {
  title: string;
  content: {
    overview: string;
    steps: string[];
    examples: string[];
    keyPoints: string[];
    resources?: { title: string; url: string }[];
  };
  onClose: () => void;
}

export function Tutorial({ title, content, onClose }: TutorialProps) {
  return (
    <div className="fixed inset-0 bg-earth-900/75 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-earth-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-earth-800 border-b border-earth-200 dark:border-earth-700 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-earth-900 dark:text-earth-100">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-earth-500 hover:text-earth-700 dark:text-earth-400 dark:hover:text-earth-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium text-earth-900 dark:text-earth-100 mb-2">
              Overview
            </h3>
            <p className="text-earth-600 dark:text-earth-300">
              {content.overview}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-earth-900 dark:text-earth-100 mb-2">
              Step-by-Step Guide
            </h3>
            <div className="space-y-3">
              {content.steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start p-3 bg-earth-50 dark:bg-earth-900/50 rounded-lg"
                >
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 mr-3">
                    {index + 1}
                  </span>
                  <p className="text-earth-700 dark:text-earth-200">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-earth-900 dark:text-earth-100 mb-2">
              Real-World Examples
            </h3>
            <div className="space-y-3">
              {content.examples.map((example, index) => (
                <div
                  key={index}
                  className="p-3 border border-earth-200 dark:border-earth-700 rounded-lg"
                >
                  <p className="text-earth-600 dark:text-earth-300">{example}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-earth-900 dark:text-earth-100 mb-2">
              Key Points to Remember
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              {content.keyPoints.map((point, index) => (
                <li key={index} className="text-earth-600 dark:text-earth-300">
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {content.resources && (
            <div>
              <h3 className="text-lg font-medium text-earth-900 dark:text-earth-100 mb-2">
                Additional Resources
              </h3>
              <div className="space-y-2">
                {content.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {resource.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}