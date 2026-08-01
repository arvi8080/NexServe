import React, { useState } from 'react';
import { Settings, Shield, Lock, Bell, Moon, Sun, Globe, Smartphone, Trash2, LogOut, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import { customerApi } from '@/api/customer.api';

export const CustomerSettings: React.FC = () => {
  const { showToast } = useToast();
  const { logout } = useAuth();

  const [enable2FA, setEnable2FA] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('Validation Error', 'New passwords do not match.', 'error');
      return;
    }
    if (newPassword.length < 6) {
      showToast('Security Alert', 'Password must be at least 6 characters long.', 'error');
      return;
    }

    await customerApi.updateSettings({ newPassword });
    setCurrPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('Security Updated!', 'Your password has been updated securely.', 'success');
  };

  const handleToggle2FA = async () => {
    const nextState = !enable2FA;
    setEnable2FA(nextState);
    await customerApi.updateSettings({ enable2FA: nextState });
    showToast(
      nextState ? '2FA Enabled!' : '2FA Disabled',
      nextState ? 'Two-Factor Authentication is active via SMS / Email OTP.' : 'Two-factor protection turned off.',
      nextState ? 'success' : 'info'
    );
  };

  return (
    <div className="space-y-8 pb-20 bg-[#FFFDFE] text-[#111827]">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-extrabold border border-purple-200 mb-2">
          <Shield size={14} />
          <span>Security & System Preferences</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#111827]">Customer Account Settings</h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Manage your password, Two-Factor authentication, notification alerts, and session privacy.
        </p>
      </div>

      {/* 1. PASSWORD & SECURITY CARD */}
      <div className="p-8 rounded-[36px] bg-white border border-[#ECECEC] shadow-xl space-y-6">
        <h3 className="text-base font-extrabold text-[#111827] flex items-center gap-2 border-b border-[#ECECEC] pb-4">
          <Lock size={18} className="text-[#FF2E7E]" />
          <span>Change Account Password</span>
        </h3>

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-lg">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Current Password</label>
            <input
              type="password"
              required
              value={currPassword}
              onChange={(e) => setCurrPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" className="h-11 px-6 text-xs font-bold rounded-2xl shadow-lg">
            Update Security Credentials
          </Button>
        </form>
      </div>

      {/* 2. TWO FACTOR & PREFERENCES */}
      <div className="p-8 rounded-[36px] bg-white border border-[#ECECEC] shadow-xl space-y-6">
        <h3 className="text-base font-extrabold text-[#111827] flex items-center gap-2 border-b border-[#ECECEC] pb-4">
          <Smartphone size={18} className="text-purple-600" />
          <span>Multi-Factor Authentication & Alerts</span>
        </h3>

        <div className="space-y-4 max-w-xl">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 block">Two-Factor Authentication (2FA)</span>
              <span className="text-[11px] text-slate-500 font-medium">Require SMS/Email OTP verification during login</span>
            </div>
            <button
              type="button"
              onClick={handleToggle2FA}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                enable2FA ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'
              }`}
            >
              {enable2FA ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 block">Email Booking Notifications</span>
              <span className="text-[11px] text-slate-500 font-medium">Receive booking confirmations & invoices via email</span>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-5 h-5 accent-[#FF2E7E] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 3. DANGER ZONE */}
      <div className="p-8 rounded-[36px] bg-rose-50 border border-rose-200 space-y-4">
        <h3 className="text-sm font-extrabold text-rose-900 flex items-center gap-2">
          <Trash2 size={18} className="text-rose-600" />
          <span>Account Session & Danger Zone</span>
        </h3>
        <p className="text-xs text-rose-700 font-medium">
          Logging out of all devices revokes active 256-bit JWT security tokens across mobile and browser sessions.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => logout()}
            leftIcon={<LogOut size={14} />}
            className="h-10 px-4 text-xs font-bold rounded-xl border-rose-300 text-rose-700 hover:bg-rose-100"
          >
            Logout All Devices
          </Button>
        </div>
      </div>
    </div>
  );
};
