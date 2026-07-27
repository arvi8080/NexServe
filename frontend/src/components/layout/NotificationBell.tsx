import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, Trash2, Calendar, CreditCard, Wallet, ShieldAlert, Sparkles, ArrowRight, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useNotifications } from '@/context/NotificationContext';
import { NotificationCategory } from '@/types';

export const NotificationBell: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCategoryIcon = (category?: NotificationCategory) => {
    switch (category) {
      case 'BOOKING':
        return <Calendar size={16} className="text-[#FF2E7E]" />;
      case 'PAYMENT':
        return <CreditCard size={16} className="text-emerald-600" />;
      case 'WALLET':
        return <Wallet size={16} className="text-[#FF2E7E]" />;
      case 'SECURITY':
        return <ShieldAlert size={16} className="text-amber-500" />;
      case 'PROMOTION':
        return <Sparkles size={16} className="text-purple-600" />;
      default:
        return <Bell size={16} className="text-blue-600" />;
    }
  };

  const handleNotificationClick = (id: string, actionUrl?: string) => {
    markAsRead(id);
    setIsOpen(false);
    if (actionUrl) {
      navigate(actionUrl);
    }
  };

  return (
    <div className="relative" ref={panelRef}>
      {/* Header Bell Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-full bg-slate-100/80 border border-[#ECECEC] hover:border-[#FF2E7E]/40 hover:bg-pink-50/50 text-[#111827] transition-all cursor-pointer focus:outline-none"
        aria-label="Notifications"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-[#FF2E7E] to-[#FF5CA8] text-white text-[10px] font-extrabold flex items-center justify-center shadow-md animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* 360px Luxury SaaS Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-[360px] bg-white/98 backdrop-blur-2xl border border-[#ECECEC] rounded-3xl p-6 shadow-2xl shadow-[#FF2E7E]/15 z-50 animate-in fade-in slide-in-from-top-2 duration-200 space-y-4">
          <div className="flex items-center justify-between border-b border-[#ECECEC] pb-3">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-extrabold text-[#111827]">Notifications</h4>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-pink-50 text-[#FF2E7E] text-[10px] font-extrabold border border-pink-200">
                  {unreadCount} New
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="text-[11px] font-bold text-[#FF2E7E] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Check size={12} /> Mark all read
              </button>
            )}
          </div>

          {/* Notification List */}
          <div className="max-h-[320px] overflow-y-auto space-y-2.5 scrollbar-none pr-1">
            {notifications.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <Bell className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs font-bold text-slate-500">No New Notifications</p>
                <span className="text-[11px] text-slate-400 font-medium">You're all caught up!</span>
              </div>
            ) : (
              notifications.slice(0, 5).map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif.id, notif.actionUrl)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 relative group ${
                    !notif.isRead
                      ? 'bg-pink-50/40 border-pink-200/80 font-semibold'
                      : 'bg-slate-50/60 border-slate-100 text-slate-600'
                  }`}
                >
                  <div className="p-2 rounded-xl bg-white border border-[#ECECEC] shrink-0">
                    {getCategoryIcon(notif.category)}
                  </div>

                  <div className="space-y-1 flex-1 min-w-0 pr-5">
                    <h5 className="text-xs font-bold text-[#111827] leading-tight truncate">{notif.title}</h5>
                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">{notif.message}</p>
                    <span className="text-[10px] text-slate-400 font-medium block">
                      {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {/* Delete Button on Hover */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notif.id);
                    }}
                    className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer View All Link */}
          <div className="pt-3 border-t border-[#ECECEC] text-center">
            <Link
              to="/customer/notifications"
              onClick={() => setIsOpen(false)}
              className="text-xs font-bold text-[#FF2E7E] hover:underline inline-flex items-center gap-1"
            >
              <span>View All Notifications</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
