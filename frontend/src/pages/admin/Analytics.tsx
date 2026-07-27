import React, { useState, useEffect } from 'react';
import { adminApi } from '@/api/admin';
import { AdminDashboardStats } from '@/types';
import { formatCurrency } from '@/utils/formatters';
import { TrendingUp, PieChart, Users, DollarSign } from 'lucide-react';
import { StatCard } from '@/components/cards/StatCard';
import { Loader } from '@/components/common/Loader';

export const Analytics: React.FC = () => {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminApi
      .getDashboardStats()
      .then((data) => setStats(data))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loader message="Compiling database metrics & revenue analytics..." />;

  const maxRevenue = Math.max(...(stats?.revenueByMonth.map((r) => r.amount) || [100000]), 100000);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white">Live Platform Analytics</h1>
        <p className="text-xs text-slate-400 mt-1">Real-time revenue telemetry, growth trends, and category distribution</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Total Platform Revenue" value={formatCurrency(stats?.totalRevenue || 0)} icon={<DollarSign className="w-5 h-5 text-emerald-400" />} trend="+32.8%" />
        <StatCard title="Active User Base" value={stats?.totalUsers || 0} icon={<Users className="w-5 h-5 text-purple-400" />} trend="+15.2%" />
        <StatCard title="Partner Studios" value={stats?.totalVendors || 0} icon={<TrendingUp className="w-5 h-5 text-rose-400" />} trend="+8 new" />
      </div>

      {/* Dynamic Revenue Growth Chart */}
      <div className="glass-panel p-6 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-rose-400" /> Monthly Revenue Breakdown
        </h3>

        <div className="h-64 flex items-end justify-between gap-3 pt-8 pb-2 px-4 border-b border-slate-800">
          {stats?.revenueByMonth.map((item, idx) => {
            const heightPercent = Math.min((item.amount / maxRevenue) * 100, 100);

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <span className="text-[10px] font-bold text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {formatCurrency(item.amount)}
                </span>
                <div
                  style={{ height: `${Math.max(heightPercent, 8)}%` }}
                  className="w-full bg-gradient-to-t from-rose-600 to-pink-500 rounded-t-xl group-hover:from-rose-500 group-hover:to-pink-400 transition-all"
                />
                <span className="text-xs font-semibold text-slate-400">{item.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Category Share Bar */}
      <div className="glass-panel p-6 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <PieChart className="w-4 h-4 text-purple-400" /> Beauty Category Performance
        </h3>

        <div className="space-y-4">
          {stats?.categoryDistribution.map((cat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-white">{cat.category}</span>
                <span className="text-rose-400 font-bold">{cat.count} Bookings Completed</span>
              </div>
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  style={{ width: `${Math.min((cat.count / 500) * 100, 100)}%` }}
                  className="h-full bg-gradient-to-r from-purple-500 via-rose-500 to-amber-400 rounded-full transition-all duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
