import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
  interface WindowEventMap {
    'beforeinstallprompt': BeforeInstallPromptEvent;
  }
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOSPWA, setIsIOSPWA] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    // Handle Android/Chrome install prompt
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if it's iOS and not already installed
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window.navigator as any).standalone;
    if (isIOS) {
      const hasShownIOSPrompt = localStorage.getItem('hasShownIOSPrompt');
      if (!hasShownIOSPrompt) {
        setIsIOSPWA(true);
        setShowPrompt(true);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      // Android/Chrome install
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    } else if (isIOSPWA) {
      // Mark iOS prompt as shown
      localStorage.setItem('hasShownIOSPrompt', 'true');
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    if (isIOSPWA) {
      localStorage.setItem('hasShownIOSPrompt', 'true');
    }
  };

  if (!showPrompt) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-0 left-0 right-0 bg-white dark:bg-earth-800 shadow-lg z-50 safe-top"
    >
      <div className="max-w-xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Download className="h-6 w-6 text-primary-500" />
            <div>
              <h3 className="text-sm font-medium text-earth-900 dark:text-earth-100">
                {isIOSPWA ? 'Install 10xSales on your iPhone' : 'Add 10xSales to Home Screen'}
              </h3>
              <p className="text-xs text-earth-500 dark:text-earth-400">
                {isIOSPWA 
                  ? 'Tap the share button and select "Add to Home Screen"'
                  : 'Install for the best mobile experience'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDismiss}
              className="p-2 text-earth-400 hover:text-earth-500"
              aria-label="Dismiss"
            >
              <X className="h-5 w-5" />
            </button>
            {!isIOSPWA && (
              <button
                onClick={handleInstall}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700"
              >
                Install
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}