import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle2, KeyRound } from 'lucide-react';
import { authApi } from '@/api/auth';
import { validatePasswordComplexity } from '@/utils/securitySanitizer';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || 'rst_908123';
  const { showToast } = useToast();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      showToast('Password Error', 'New passwords do not match.', 'error');
      return;
    }

    const valResult = validatePasswordComplexity(newPassword);
    if (!valResult.isValid) {
      showToast('Weak Password', valResult.errorMsg || 'Password complexity requirements not met.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await authApi.resetPassword(token, newPassword);
      showToast('Password Reset Successful!', 'Your password has been updated. Please log in.', 'success');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch {
      showToast('Error', 'Invalid or expired password reset token.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-panel p-8 md:p-10 bg-white/95 backdrop-blur-2xl border border-[#ECECEC] shadow-2xl shadow-[#FF2E7A]/10 rounded-[32px] space-y-7 max-w-md w-full mx-auto">
      <div className="space-y-1 text-left">
        <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-200 text-[#FF2E7E] flex items-center justify-center mb-3">
          <KeyRound size={24} />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Set New Password</h2>
        <p className="text-xs text-[#6B7280] font-medium">Password must be at least 12 characters with uppercase, lowercase, number, and special character.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* New Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">New Password</label>
          <div className="relative flex items-center">
            <Lock className="absolute left-4 text-slate-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full h-12 pl-12 pr-12 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">Confirm New Password</label>
          <div className="relative flex items-center">
            <Lock className="absolute left-4 text-slate-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full h-12 pl-12 pr-12 rounded-2xl bg-slate-50 border border-[#ECECEC] text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF2E7E]"
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          leftIcon={<CheckCircle2 size={16} />}
          className="w-full h-12 rounded-2xl text-xs font-bold shadow-xl pt-2"
        >
          Update Password & Sign In
        </Button>
      </form>
    </div>
  );
};
