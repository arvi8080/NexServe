import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { authApi } from '@/api/auth';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';

export const ForgotPassword: React.FC = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmailFormat = (emailStr: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailStr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!validateEmailFormat(email)) {
      setErrorMessage('Invalid email format. Please enter a valid address (e.g. name@example.com).');
      showToast('Invalid Email', 'Please enter a valid email format.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await authApi.forgotPassword(email);
      setIsSubmitted(true);
      showToast('Instructions Sent!', `Password reset link dispatched to ${email}`, 'success');
    } catch (err: any) {
      const msg = err.message || 'No account found registered with this email address.';
      setErrorMessage(msg);
      showToast('Account Not Found', msg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-panel p-8 md:p-10 bg-white/95 backdrop-blur-2xl border border-[#ECECEC] shadow-2xl shadow-[#FF2E7A]/10 rounded-[32px] space-y-7 max-w-md w-full mx-auto">
      <div className="space-y-1 text-left">
        <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-200 text-[#FF2E7E] flex items-center justify-center mb-3">
          <ShieldCheck size={24} />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Forgot Password?</h2>
        <p className="text-xs text-[#6B7280] font-medium">Enter your registered email address and we'll send password reset instructions.</p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Error Feedback Alert */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-start gap-2.5">
              <AlertCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

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
                placeholder="customer@nexserve.com"
                className={`w-full h-12 pl-12 pr-4 rounded-2xl bg-slate-50 border text-xs font-bold text-slate-900 focus:outline-none transition-all ${
                  errorMessage ? 'border-rose-400 focus:border-rose-500 bg-rose-50/20' : 'border-[#ECECEC] focus:border-[#FF2E7E]'
                }`}
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            leftIcon={<Send size={16} />}
            className="w-full h-12 rounded-2xl text-xs font-bold shadow-xl"
          >
            Send Password Reset Link
          </Button>
        </form>
      ) : (
        <div className="p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
          <h4 className="text-sm font-bold text-emerald-900">Check Your Email Inbox</h4>
          <p className="text-xs text-emerald-700 font-medium leading-relaxed">
            We have dispatched a time-limited password reset link to <span className="font-bold">{email}</span>. Click the link in the email to set a new password.
          </p>
        </div>
      )}

      <div className="pt-4 border-t border-[#ECECEC] text-center">
        <Link to="/login" className="text-xs font-bold text-[#FF2E7E] hover:underline inline-flex items-center gap-1.5">
          <ArrowLeft size={14} />
          <span>Back to Sign In</span>
        </Link>
      </div>
    </div>
  );
};
