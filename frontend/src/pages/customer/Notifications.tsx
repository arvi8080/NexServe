import React from 'react';
import { useNotifications } from '@/context/NotificationContext';
import { Bell, CheckCheck, Trash2, ShieldCheck, AlertCircle, Info, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export const Notifications: React.FC = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } = useNotifications();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'SUCCESS':
        return <CheckCheck className="text-emerald-500" size={20} />;
      case 'WARNING':
        return <AlertCircle className="text-amber-500" size={20} />;
      case 'HIGH':
        return <Sparkles className="text-[#FF2E7E]" size={20} />;
      default:
        return <Info className="text-sky-500" size={20} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 bg-[#FFFDFE] text-[#111827]">
      {/* Header Bar */}
      <div className="p-8 rounded-[36px] bg-white border border-[#ECECEC] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-extrabold text-[#111827]">Notifications</h2>
            {unreadCount > 0 && (
              <span className="px-3 py-1 rounded-full bg-[#FF2E7E] text-white text-xs font-extrabold shadow-sm">
                {unreadCount} UNREAD
              </span>
            )}
          </div>
          <p className="text-xs text-[#64748B] font-medium">Real-time alerts for doorstep sessions, beautician status & account security</p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              leftIcon={<CheckCheck size={16} />}
              className="h-10 px-4 text-xs font-bold rounded-2xl border-emerald-300 text-emerald-700 hover:bg-emerald-50"
            >
              Mark All Read
            </Button>
          )}

          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              leftIcon={<Trash2 size={16} />}
              className="h-10 px-3 text-xs font-bold text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-2xl"
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Notification Items List */}
      {notifications.length === 0 ? (
        <div className="p-16 rounded-[36px] bg-white border border-[#ECECEC] shadow-lg text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-pink-50 text-[#FF2E7E] flex items-center justify-center mx-auto shadow-inner">
            <Bell size={28} />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#111827]">No Notifications Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You're all caught up! Booking updates and doorstep beautician alerts will appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notif, idx) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => markAsRead(notif.id)}
              className={`p-6 rounded-[28px] border transition-all cursor-pointer flex items-start justify-between gap-4 group ${
                notif.isRead
                  ? 'bg-white border-[#ECECEC] hover:border-pink-200 opacity-90'
                  : 'bg-gradient-to-r from-pink-50/60 to-rose-50/40 border-pink-200 shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                    notif.isRead ? 'bg-slate-50 border-slate-200' : 'bg-white border-pink-200 shadow-xs'
                  }`}
                >
                  {getNotificationIcon(notif.type)}
                </div>

                <div className="space-y-1 text-left">
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
                    {notif.createdAt ? new Date(notif.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : ''}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {notif.actionUrl && (
                  <Button variant="secondary" size="sm" className="h-9 px-4 text-xs font-bold rounded-xl opacity-80 group-hover:opacity-100">
                    View <ArrowRight size={14} className="ml-1" />
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
