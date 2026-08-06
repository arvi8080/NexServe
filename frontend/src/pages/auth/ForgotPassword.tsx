import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authApi } from '@/api/auth';
import { Mail, ArrowLeft, Send, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await authApi.forgotPassword(email);
      setIsSuccess(true);
    } catch {
      setErrorMessage('Failed to send reset link. Please check your email and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-panel p-8 md:p-10 bg-white/95 backdrop-blur-2xl border border-[#ECECEC] shadow-2xl shadow-[#FF2E7A]/10 rounded-[32px] space-y-7">
      {/* Top Header */}
      <div className="space-y-1 text-left">
        <Link to="/login" className="inline-flex items-center gap-1 text-xs font-bold text-[#FF2E7E] hover:underline mb-2">
          <ArrowLeft size={14} />
          <span>Back to Sign In</span>
        </Link>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Reset Password</h2>
        <p className="text-xs text-[#6B7280] font-medium">Enter your email address to receive password reset instructions.</p>
      </div>

      {isSuccess ? (
        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 size={24} />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900">Reset Email Sent</h4>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              We sent a password reset link to <strong className="text-slate-900">{email}</strong>. Check your inbox and follow the instructions.
            </p>
          </div>
          <Link to="/login" className="inline-block pt-2">
            <Button variant="outline" className="h-10 px-5 text-xs font-bold rounded-xl border-emerald-300 text-emerald-700">
              Return to Login
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Registered Email Address</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 text-slate-400 w-5 h-5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="your.email@example.com"
                className={`w-full h-12 pl-12 pr-4 rounded-2xl bg-slate-50 border text-xs font-bold text-slate-900 focus:outline-none transition-all ${
                  errorMessage ? 'border-rose-400 focus:border-rose-500 bg-rose-50/20' : 'border-[#ECECEC] focus:border-[#FF2E7E]'
                }`}
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full h-[58px] rounded-full text-base font-bold shadow-lg shadow-[#FF2E7A]/25"
            isLoading={isSubmitting}
            rightIcon={<Send size={18} />}
          >
            Send Reset Instructions
          </Button>
        </form>
      )}

      {/* Footer SSL Security */}
      <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium pt-1">
        <ShieldCheck size={14} className="text-emerald-500" />
        <span>Protected by GlowHome 256-bit SSL Encryption.</span>
      </div>
    </div>
  );
};
