import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('customer@nexserve.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await login({ email, password });
      showToast('Welcome back!', `Logged in as ${user.firstName}`, 'success');

      if (user.role === 'SUPER_ADMIN') navigate('/admin/erp');
      else if (user.role === 'ADMIN') navigate('/admin/dashboard');
      else if (user.role === 'VENDOR_OWNER' || user.role === 'PROFESSIONAL') navigate('/vendor/dashboard');
      else navigate('/customer/dashboard');
    } catch {
      showToast('Login Failed', 'Invalid credentials provided', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel p-8 md:p-10 bg-white/95 backdrop-blur-2xl border border-[#ECECEC] shadow-2xl shadow-[#FF2E7A]/10 rounded-[32px] space-y-7">
      {/* Top Header */}
      <div className="space-y-1 text-left">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Sign In to NexServe</h2>
        <p className="text-xs text-[#6B7280] font-medium">Access your customer dashboard securely.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">Email Address</label>
          <div className="relative flex items-center">
            <Mail className="absolute left-4 text-slate-400 w-5 h-5" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-13 pl-12 pr-4 rounded-2xl bg-white border border-[#ECECEC] text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF2E7A] focus:ring-4 focus:ring-[#FF2E7A]/10 font-medium transition-all"
              placeholder="customer@nexserve.com"
            />
          </div>
        </div>

        {/* Password Field with Trailing Eye Icon */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">Password</label>
          <div className="relative flex items-center">
            <Lock className="absolute left-4 text-slate-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-13 pl-12 pr-12 rounded-2xl bg-white border border-[#ECECEC] text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF2E7A] focus:ring-4 focus:ring-[#FF2E7A]/10 font-medium transition-all"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors p-1"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Options Row (Remember Me & Forgot Password) */}
        <div className="flex items-center justify-between text-xs font-semibold pt-1">
          <label className="flex items-center gap-2 cursor-pointer text-slate-700 select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded text-[#FF2E7A] focus:ring-[#FF2E7A] border-slate-300"
            />
            <span>Remember Me</span>
          </label>
          <Link to="/forgot-password" className="text-[#FF2E7A] hover:underline font-bold">
            Forgot Password?
          </Link>
        </div>

        {/* Primary 58px Full-Width Pink Gradient Pill Button */}
        <Button
          type="submit"
          variant="primary"
          className="w-full h-[58px] rounded-full text-base font-bold shadow-lg shadow-[#FF2E7A]/25 hover:shadow-xl hover:shadow-[#FF2E7A]/35"
          isLoading={isLoading}
          rightIcon={<ArrowRight size={20} />}
        >
          Sign In
        </Button>
      </form>

      {/* Social Login Divider */}
      <div className="relative flex items-center justify-center my-4">
        <div className="w-full border-t border-[#ECECEC]" />
        <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider relative z-10 shrink-0">
          or Continue With
        </span>
      </div>

      {/* Social Login Buttons (Google, Facebook, Apple) */}
      <div className="grid grid-cols-3 gap-3">
        <button className="h-12 rounded-2xl bg-white border border-[#ECECEC] hover:border-slate-300 shadow-xs flex items-center justify-center gap-2 text-xs font-bold text-slate-700 hover:-translate-y-0.5 transition-all">
          <Globe size={18} className="text-rose-500" />
          <span>Google</span>
        </button>
        <button className="h-12 rounded-2xl bg-white border border-[#ECECEC] hover:border-slate-300 shadow-xs flex items-center justify-center gap-2 text-xs font-bold text-slate-700 hover:-translate-y-0.5 transition-all">
          <span className="font-extrabold text-blue-600">f</span>
          <span>Facebook</span>
        </button>
        <button className="h-12 rounded-2xl bg-white border border-[#ECECEC] hover:border-slate-300 shadow-xs flex items-center justify-center gap-2 text-xs font-bold text-slate-700 hover:-translate-y-0.5 transition-all">
          <span className="font-extrabold text-slate-900"></span>
          <span>Apple</span>
        </button>
      </div>

      {/* Bottom Lavender/Pink CTA Card */}
      <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100 flex items-center justify-between gap-3">
        <div className="text-left">
          <h4 className="text-xs font-bold text-slate-900">New to NexServe?</h4>
          <p className="text-[11px] text-slate-500 font-medium">Join thousands of happy customers.</p>
        </div>
        <Link
          to="/register"
          className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-pink-200 text-xs font-bold text-[#FF2E7A] shadow-xs shrink-0 transition-colors"
        >
          Create Account
        </Link>
      </div>

      {/* Footer SSL Security */}
      <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium pt-1">
        <ShieldCheck size={14} className="text-emerald-500" />
        <span>Protected by NexServe 256-bit SSL Encryption.</span>
      </div>
    </div>
  );
};
