import React, { ReactNode } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Outlet } from 'react-router-dom';

export const VendorDashboardLayout: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FB] text-[#111827] relative overflow-hidden">
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#FF5FA2]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#FF2E7A]/10 rounded-full blur-3xl pointer-events-none" />

      <Navbar />
      <div className="flex flex-1 max-w-7xl w-full mx-auto relative z-10 py-6">
        <Sidebar role="VENDOR_OWNER" />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children || <Outlet />}
        </main>
      </div>
      <Footer />
    </div>
  );
};
