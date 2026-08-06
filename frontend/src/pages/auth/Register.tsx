import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Mail, Lock, Phone, UserPlus, AlertCircle, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Register: React.FC = () => {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-3 text-left">
          <div className="flex items-start gap-3">
            <AlertCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-rose-900">Registration Notice</h4>
              <p className="text-xs text-rose-700 font-medium leading-relaxed">{errorMessage}</p>
            </div>
          </div>
          <Link to="/login" className="block">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<LogIn size={14} />}
              className="w-full h-9 rounded-xl border-rose-300 text-rose-700 hover:bg-rose-100 text-xs font-bold"
            >
              Sign In Instead
            </Button>
          </Link>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">First Name</label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => {
                setFormData({ ...formData, firstName: e.target.value });
                if (errorMessage) setErrorMessage(null);
              }}
              className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
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
              className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
              placeholder="Sharma"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
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
              className="w-full h-12 pl-10 pr-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
              placeholder="aarav@example.com"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
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
              className="w-full h-12 pl-10 pr-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
              placeholder="+977 9808422407"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
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
              className="w-full h-12 pl-10 pr-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
              placeholder="••••••••"
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full h-12"
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
