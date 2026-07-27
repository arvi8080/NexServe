import React, { ReactNode } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const CustomerDashboardLayout: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FB] text-[#111827] relative overflow-hidden">
      {/* Soft Ambient Blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#FF5FA2]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#FF2E7A]/10 rounded-full blur-3xl pointer-events-none" />

      <Navbar />
      <div className="flex flex-1 max-w-7xl w-full mx-auto relative z-10 py-6">
        <Sidebar role={user?.role || 'CUSTOMER'} />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children || <Outlet />}
        </main>
      </div>
      <Footer />
    </div>
  );
};
