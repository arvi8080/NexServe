import React from 'react';
import { AlertOctagon, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something Went Wrong',
  message = 'Failed to load content. Please check your network connection and try again.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center glass-panel border-rose-500/30 my-4 bg-rose-950/10">
      <div className="p-3.5 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-3">
        <AlertOctagon className="w-10 h-10" />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-slate-400 max-w-md mt-1 mb-6 leading-relaxed">{message}</p>
      {onRetry && (
        <Button variant="outline" leftIcon={<RefreshCw className="w-4 h-4" />} onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};
