import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { User, Shield, LogOut, ChevronDown, Sparkles, LayoutDashboard, Calendar, Settings, Home, Wallet } from 'lucide-react';
import { Role, normalizeRole } from '@/types';

export const ProfileMenu: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    navigate('/');
  };

  const getDashboardPath = () => {
    const role = normalizeRole(user.role);
    if (role === 'SUPER_ADMIN') return '/admin/erp';
    if (role === 'ADMIN') return '/admin/dashboard';
    if (role === 'VENDOR') return '/vendor/dashboard';
    return '/customer/dashboard';
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 sm:gap-3 p-1.5 pl-3 pr-2.5 rounded-full bg-slate-50 border border-[#ECECEC] hover:border-pink-300 hover:bg-slate-100/80 transition-all cursor-pointer shadow-xs"
        aria-label="Open User Profile Menu"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden border border-[#FF2E7E] p-0.5 shrink-0 bg-white">
          <img
            src={
              user.profileImage ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
            }
            alt={`${user.firstName} Avatar`}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-extrabold text-[#111827] truncate max-w-[100px]">
            {user.firstName}
          </span>
          <span className="text-[9px] font-mono font-bold text-[#FF2E7E] uppercase">
            {user.role.replace('_', ' ')}
          </span>
        </div>
        <ChevronDown size={14} className="text-slate-400" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-2xl border border-[#ECECEC] rounded-3xl shadow-2xl p-3 space-y-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* User Header */}
          <div className="p-3.5 rounded-2xl bg-pink-50/60 border border-pink-100 space-y-1 text-left">
            <span className="text-xs font-bold text-[#111827] block">
              {user.firstName} {user.lastName || ''}
            </span>
            <span className="text-[11px] font-mono text-slate-500 truncate block">{user.email}</span>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-[#FF2E7E] text-white text-[9px] font-extrabold font-mono uppercase">
              ROLE: {user.role}
            </span>
          </div>

          {/* Quick Dashboard Links */}
          <div className="space-y-1">
            <Link
              to={getDashboardPath()}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-[#111827] hover:bg-slate-50 transition-colors"
            >
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                <LayoutDashboard size={16} />
              </div>
              <span>My Portal Dashboard</span>
            </Link>

            <Link
              to="/customer/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-[#111827] hover:bg-slate-50 transition-colors"
            >
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <Settings size={16} />
              </div>
              <span>Account Settings</span>
            </Link>
          </div>

          {/* Logout Action Button */}
          <div className="pt-2 border-t border-[#ECECEC]">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <div className="p-2 rounded-xl bg-rose-100 text-rose-600">
                <LogOut size={16} />
              </div>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
