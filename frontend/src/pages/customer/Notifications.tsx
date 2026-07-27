import React, { useState } from 'react';
import { useNotifications } from '@/context/NotificationContext';
import { NotificationCategory } from '@/types';
import { Bell, Check, Trash2, Calendar, CreditCard, Wallet, ShieldAlert, Sparkles, RefreshCw, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SkeletonLoader } from '@/components/common/SkeletonLoader';
import { EmptyState } from '@/components/common/EmptyState';
import { useNavigate } from 'react-router-dom';

export const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, unreadCount, isLoading, markAsRead, markAllAsRead, deleteNotification, clearAll } = useNotifications();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    { id: 'ALL', label: 'All Notifications' },
    { id: 'BOOKING', label: 'Bookings' },
    { id: 'PAYMENT', label: 'Payments' },
    { id: 'WALLET', label: 'Wallet & Cashback' },
    { id: 'SECURITY', label: 'Security Alerts' },
  ];

  const filteredNotifications = notifications.filter((n) => {
    if (selectedCategory === 'ALL') return true;
    return n.category === selectedCategory;
  });

  const getCategoryIcon = (category?: NotificationCategory) => {
    switch (category) {
      case 'BOOKING':
        return <Calendar size={20} className="text-[#FF2E7E]" />;
      case 'PAYMENT':
        return <CreditCard size={20} className="text-emerald-600" />;
      case 'WALLET':
        return <Wallet size={20} className="text-[#FF2E7E]" />;
      case 'SECURITY':
        return <ShieldAlert size={20} className="text-amber-500" />;
      case 'PROMOTION':
        return <Sparkles size={20} className="text-purple-600" />;
      default:
        return <Bell size={20} className="text-blue-600" />;
    }
  };

  const handleCardClick = (id: string, actionUrl?: string) => {
    markAsRead(id);
    if (actionUrl) {
      navigate(actionUrl);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-24 px-4 bg-[#FFFDFE] text-[#111827]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#111827]">Notification Center</h1>
          <p className="text-xs text-[#64748B] font-semibold mt-1">
            Real-time updates on doorstep sessions, payment receipts, cashbacks, and security alerts
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead} leftIcon={<Check size={14} />} className="h-10 px-4 text-xs font-bold rounded-2xl">
              Mark All Read
            </Button>
          )}
          {notifications.length > 0 && (
            <Button variant="secondary" size="sm" onClick={clearAll} leftIcon={<Trash2 size={14} />} className="h-10 px-4 text-xs font-bold rounded-2xl">
              Clear History
            </Button>
          )}
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 border-b border-[#ECECEC]">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-[#FF2E7E] to-[#FF5CA8] text-white shadow-md'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      {isLoading ? (
        <SkeletonLoader type="list" count={5} />
      ) : filteredNotifications.length === 0 ? (
        <EmptyState
          iconType="calendar"
          title="No Notifications Found"
          description={`No notification alerts in "${categories.find((c) => c.id === selectedCategory)?.label}".`}
        />
      ) : (
        <div className="space-y-4">
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleCardClick(notif.id, notif.actionUrl)}
              className={`p-6 rounded-[32px] border transition-all cursor-pointer flex items-start justify-between gap-5 group ${
                !notif.isRead
                  ? 'bg-white border-[#FF2E7E]/40 shadow-xl ring-1 ring-[#FF2E7E]/10'
                  : 'bg-slate-50/70 border-[#ECECEC] opacity-85 hover:bg-white'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-slate-100 border border-[#ECECEC] shrink-0">
                  {getCategoryIcon(notif.category)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-bold text-[#111827]">{notif.title}</h3>
                    {!notif.isRead && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FF2E7E] text-white text-[10px] font-extrabold">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#64748B] font-medium leading-relaxed max-w-xl">{notif.message}</p>
                  <span className="text-[11px] text-slate-400 font-semibold block pt-1">
                    {new Date(notif.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {notif.actionUrl && (
                  <Button variant="secondary" size="sm" className="h-9 px-4 text-xs font-bold rounded-xl opacity-80 group-hover:opacity-100">
                    View <ArrowRight size={14} className="ml-1" />
                  </Button>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notif.id);
                  }}
                  className="p-2 text-slate-400 hover:text-rose-500 rounded-xl hover:bg-rose-50 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
