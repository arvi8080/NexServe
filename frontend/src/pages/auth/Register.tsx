import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Mail, Lock, Phone, UserPlus, AlertCircle, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Register: React.FC = () => {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const redirectedEmail = searchParams.get('email') || location.state?.email || '';
  const redirectedNotice = location.state?.message || (redirectedEmail ? 'Account not found. Please complete your registration below.' : null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: redirectedEmail,
    phone: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(redirectedNotice);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await register(formData);
      showToast('Registration Successful!', 'Welcome to GlowHome.', 'success');
      navigate('/customer/dashboard');
    } catch (err: any) {
      const message = err?.message || 'Could not complete account creation.';
      setErrorMessage(message);
      showToast('Registration Failed', message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-slate-900">Create Customer Account</h3>
        <p className="text-xs text-slate-500 mt-1">Join GlowHome for doorstep luxury beauty treatments</p>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-[#FFF5F8] border border-pink-200 space-y-3 text-left shadow-xs">
          <div className="flex items-start gap-3">
            <AlertCircle size={18} className="text-[#FF2E7E] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-900">Registration Direct Access</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">First Name *</label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => {
                setFormData({ ...formData, firstName: e.target.value });
                if (errorMessage) setErrorMessage(null);
              }}
              className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 font-medium"
              placeholder="Aarav"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Last Name</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => {
                setFormData({ ...formData, lastName: e.target.value });
                if (errorMessage) setErrorMessage(null);
              }}
              className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 font-medium"
              placeholder="Sharma"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 text-slate-400 w-4 h-4" />
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errorMessage) setErrorMessage(null);
              }}
              className="w-full h-12 pl-10 pr-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 font-medium"
              placeholder="aarav@example.com"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number (+977) *</label>
          <div className="relative flex items-center">
            <Phone className="absolute left-3.5 text-slate-400 w-4 h-4" />
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                if (errorMessage) setErrorMessage(null);
              }}
              className="w-full h-12 pl-10 pr-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 font-medium"
              placeholder="+977 9808422407"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Password *</label>
          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 text-slate-400 w-4 h-4" />
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                if (errorMessage) setErrorMessage(null);
              }}
              className="w-full h-12 pl-10 pr-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 font-medium"
              placeholder="••••••••"
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full h-12 rounded-2xl text-xs font-bold shadow-lg shadow-[#FF2E7E]/20"
          isLoading={isLoading}
          leftIcon={<UserPlus size={16} />}
        >
          Create Account
        </Button>
      </form>

      <div className="text-center text-xs text-slate-500 pt-3 border-t border-slate-100">
        Already registered?{' '}
        <Link to="/login" className="text-pink-600 font-bold hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};
