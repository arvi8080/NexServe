import React from 'react';

interface SkeletonProps {
  type?: 'card' | 'banner' | 'text' | 'avatar' | 'list';
  count?: number;
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonProps> = ({
  type = 'card',
  count = 1,
  className = '',
}) => {
  const items = Array.from({ length: count });

  if (type === 'banner') {
    return (
      <div className={`w-full h-64 sm:h-96 rounded-[32px] bg-slate-100 animate-pulse border border-[#ECECEC] ${className}`} />
    );
  }

  if (type === 'avatar') {
    return (
      <div className={`w-12 h-12 rounded-full bg-slate-100 animate-pulse border border-[#ECECEC] ${className}`} />
    );
  }

  if (type === 'text') {
    return (
      <div className={`space-y-2.5 ${className}`}>
        <div className="h-4 bg-slate-100 rounded-full animate-pulse w-3/4" />
        <div className="h-3.5 bg-slate-100 rounded-full animate-pulse w-1/2" />
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className={`space-y-3 ${className}`}>
        {items.map((_, i) => (
          <div key={i} className="p-4 rounded-2xl bg-white border border-[#ECECEC] animate-pulse flex items-center justify-between">
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-slate-100 rounded-full w-1/3" />
              <div className="h-3 bg-slate-100 rounded-full w-1/2" />
            </div>
            <div className="w-16 h-8 bg-slate-100 rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  // Default: Service / Item Card Skeleton
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {items.map((_, i) => (
        <div key={i} className="p-5 rounded-[32px] bg-white border border-[#ECECEC] shadow-md animate-pulse space-y-4">
          <div className="w-full h-44 rounded-2xl bg-slate-100" />
          <div className="space-y-2">
            <div className="h-4 bg-slate-100 rounded-full w-3/4" />
            <div className="h-3 bg-slate-100 rounded-full w-1/2" />
          </div>
          <div className="pt-3 border-t border-[#ECECEC] flex items-center justify-between">
            <div className="h-5 bg-slate-100 rounded-full w-20" />
            <div className="h-9 bg-slate-100 rounded-full w-24" />
          </div>
        </div>
      ))}
    </div>
  );
};
