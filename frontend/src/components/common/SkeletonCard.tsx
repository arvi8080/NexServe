import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="p-6 rounded-[32px] bg-white border border-[#ECECEC] shadow-md space-y-4 animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-video w-full rounded-2xl bg-slate-200/70" />

      {/* Category Skeleton */}
      <div className="w-24 h-4 rounded-full bg-slate-200/70" />

      {/* Title Skeleton */}
      <div className="w-3/4 h-6 rounded-xl bg-slate-200/70" />

      {/* Duration Skeleton */}
      <div className="w-1/2 h-4 rounded-xl bg-slate-200/70" />

      {/* Price & Rating Row */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="w-20 h-6 rounded-xl bg-slate-200/70" />
        <div className="w-28 h-10 rounded-full bg-slate-200/70" />
      </div>
    </div>
  );
};

export const SkeletonStat: React.FC = () => {
  return (
    <div className="p-6 rounded-3xl bg-white border border-[#ECECEC] shadow-md space-y-3 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="w-24 h-4 rounded-xl bg-slate-200/70" />
        <div className="w-10 h-10 rounded-2xl bg-slate-200/70" />
      </div>
      <div className="w-16 h-8 rounded-xl bg-slate-200/70" />
      <div className="w-28 h-3 rounded-xl bg-slate-200/70" />
    </div>
  );
};

export const SkeletonBooking: React.FC = () => {
  return (
    <div className="p-6 rounded-3xl bg-white border border-[#ECECEC] shadow-md space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="w-32 h-5 rounded-xl bg-slate-200/70" />
        <div className="w-20 h-6 rounded-full bg-slate-200/70" />
      </div>
      <div className="w-2/3 h-4 rounded-xl bg-slate-200/70" />
      <div className="w-1/2 h-4 rounded-xl bg-slate-200/70" />
    </div>
  );
};
