import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400">
        <Loader2 className="w-12 h-12 animate-spin mb-4 text-teal-600" />
        <p className="text-sm font-medium animate-pulse">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12 text-slate-500 dark:text-slate-400">
      <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
    </div>
  );
};

export default LoadingSpinner;
