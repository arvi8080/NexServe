import React, { ReactNode } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Outlet } from 'react-router-dom';

export const MainLayout: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDFE] text-[#111827] relative overflow-hidden">
      {/* Soft Ambient Radial Globs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#FF5CA8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#FF2E7E]/10 rounded-full blur-3xl pointer-events-none" />

      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
};
