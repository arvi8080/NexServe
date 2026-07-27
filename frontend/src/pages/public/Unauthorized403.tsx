import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export const Unauthorized403: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'SUPER_ADMIN') return '/admin/erp';
    if (user.role === 'ADMIN') return '/admin/dashboard';
    if (user.role === 'VENDOR_OWNER' || user.role === 'PROFESSIONAL') return '/vendor/dashboard';
    return '/customer/dashboard';
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 bg-[#FFFDFE] text-[#111827]">
      <div className="max-w-lg w-full p-8 md:p-12 rounded-[40px] bg-white border border-[#ECECEC] shadow-2xl text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-rose-50 border border-rose-200 text-rose-500 mx-auto flex items-center justify-center">
          <ShieldAlert size={40} />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-extrabold border border-rose-200">
            HTTP 403 FORBIDDEN
          </span>
          <h1 className="text-3xl font-extrabold text-[#111827]">Access Restricted</h1>
          <p className="text-xs text-[#64748B] font-medium leading-relaxed">
            You do not have permission to view this page under your current user role (
            <span className="font-bold text-[#FF2E7E]">{user?.role || 'GUEST'}</span>). Manual URL navigation across role boundaries is blocked by Role-Based Access Control (RBAC).
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button variant="outline" onClick={() => navigate(-1)} leftIcon={<ArrowLeft size={16} />} className="w-full sm:w-auto h-12 px-6 rounded-2xl text-xs font-bold">
            Go Back
          </Button>
          <Link to={getDashboardLink()} className="w-full sm:w-auto">
            <Button variant="primary" leftIcon={<Home size={16} />} className="w-full h-12 px-6 rounded-2xl text-xs font-bold">
              Return to Authorized Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
