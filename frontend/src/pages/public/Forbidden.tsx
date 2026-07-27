import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Forbidden: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 space-y-6">
      <div className="p-4 rounded-3xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
        <ShieldAlert className="w-12 h-12" />
      </div>
      <h1 className="text-3xl font-extrabold text-white">403 - Access Restricted</h1>
      <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
        Your current user role does not possess permissions to view this administrative page.
      </p>
      <Link to="/">
        <Button variant="secondary" leftIcon={<Home size={14} />}>
          Return Home
        </Button>
      </Link>
    </div>
  );
};
