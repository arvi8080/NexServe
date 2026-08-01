import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoaderProps {
  fullScreen?: boolean;
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Loader: React.FC<LoaderProps> = ({
  fullScreen = false,
  message = 'Loading GlowHome...',
  size = 'md',
}) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-3 p-6 text-center">
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-rose-500/20 blur-xl animate-pulse" />
        <Loader2 className={`${sizes[size]} text-rose-500 animate-spin relative z-10`} />
      </div>
      {message && <p className="text-sm font-medium text-slate-400 animate-pulse">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md">
        {content}
      </div>
    );
  }

  return content;
};
