import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  isPositive?: boolean;
  subtitle?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  isPositive = true,
  subtitle,
}) => {
  return (
    <div className="glass-panel p-6 flex items-center justify-between gap-4 bg-white border border-slate-200/80 shadow-md">
      <div className="space-y-1">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</span>
        <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</h3>
        {trend && (
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <span className={isPositive ? 'text-emerald-600' : 'text-rose-600'}>{trend}</span>
            <span className="text-slate-400 font-medium">vs last month</span>
          </div>
        )}
        {subtitle && <p className="text-xs text-slate-500 font-medium">{subtitle}</p>}
      </div>

      <div className="p-3.5 rounded-2xl bg-pink-50 text-pink-600 border border-pink-100 shrink-0">
        {icon}
      </div>
    </div>
  );
};
