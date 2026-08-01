import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Unauthorized: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 space-y-6">
      <div className="p-4 rounded-3xl bg-rose-500/10 text-rose-500 border border-rose-500/20">
        <Lock className="w-12 h-12" />
      </div>
      <h1 className="text-3xl font-extrabold text-white">401 - Authentication Required</h1>
      <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
        Please sign in to access your GlowHome customer or partner dashboard.
      </p>
      <Link to="/login">
        <Button variant="primary" leftIcon={<LogIn size={14} />}>
          Sign In Now
        </Button>
      </Link>
    </div>
  );
};
