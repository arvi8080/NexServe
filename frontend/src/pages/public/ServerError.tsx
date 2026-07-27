import React from 'react';
import { Link } from 'react-router-dom';
import { ServerCrash, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const ServerError: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 space-y-6">
      <div className="p-4 rounded-3xl bg-rose-500/10 text-rose-500 border border-rose-500/20">
        <ServerCrash className="w-12 h-12" />
      </div>
      <h1 className="text-3xl font-extrabold text-white">500 - Server Encountered Error</h1>
      <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
        Our system systems are recalibrating. Please refresh or try again in a few moments.
      </p>
      <button onClick={() => window.location.reload()}>
        <Button variant="primary" leftIcon={<RefreshCw size={14} />}>
          Reload Page
        </Button>
      </button>
    </div>
  );
};
