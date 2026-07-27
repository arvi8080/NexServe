import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { MainLayout } from '@/layouts/MainLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { CustomerDashboardLayout } from '@/layouts/CustomerDashboardLayout';
import { VendorDashboardLayout } from '@/layouts/VendorDashboardLayout';
import { AdminDashboardLayout } from '@/layouts/AdminDashboardLayout';

// Public Pages
import { Home } from '@/pages/public/Home';
import { Services } from '@/pages/public/Services';
import { ServiceDetails } from '@/pages/public/ServiceDetails';
import { SearchResults } from '@/pages/public/SearchResults';
import { About } from '@/pages/public/About';
import { Contact } from '@/pages/public/Contact';
import { BecomeProfessional } from '@/pages/public/BecomeProfessional';
import { AIConciergePage } from '@/pages/public/AIConciergePage';
import { NotFound } from '@/pages/public/NotFound';
import { Unauthorized403 } from '@/pages/public/Unauthorized403';
import { ServerError } from '@/pages/public/ServerError';

// Auth Pages
import { Login } from '@/pages/auth/Login';
import { Register } from '@/pages/auth/Register';
import { VendorRegister } from '@/pages/auth/VendorRegister';
import { ForgotPassword } from '@/pages/auth/ForgotPassword';
import { ResetPassword } from '@/pages/auth/ResetPassword';

// Customer Pages
import { CustomerWelcome } from '@/pages/customer/Welcome';
import { BookService } from '@/pages/customer/BookService';
import { Checkout } from '@/pages/customer/Checkout';
import { BookingHistory } from '@/pages/customer/BookingHistory';
import { BookingTracking } from '@/pages/customer/BookingTracking';
import { Chat } from '@/pages/customer/Chat';
import { Notifications } from '@/pages/customer/Notifications';
import { Wallet } from '@/pages/customer/Wallet';
import { Invoice } from '@/pages/customer/Invoice';
import { Profile } from '@/pages/customer/Profile';
import { Membership } from '@/pages/customer/Membership';
import { Referral } from '@/pages/customer/Referral';

// Vendor Pages
import { VendorDashboard } from '@/pages/vendor/Dashboard';
import { MyServices } from '@/pages/vendor/MyServices';
import { Availability } from '@/pages/vendor/Availability';
import { VendorReviews } from '@/pages/vendor/Reviews';
import { Earnings } from '@/pages/vendor/Earnings';
import { VendorProfile } from '@/pages/vendor/VendorProfile';
import { EnterpriseSalonChain } from '@/pages/vendor/EnterpriseSalonChain';
import { VerificationCenter } from '@/pages/vendor/VerificationCenter';

// Admin Pages
import { AdminDashboard } from '@/pages/admin/Dashboard';
import { VendorApproval } from '@/pages/admin/VendorApproval';
import { Analytics } from '@/pages/admin/Analytics';
import { CompanyERP } from '@/pages/admin/CompanyERP';
import { SecurityMatrix } from '@/pages/admin/SecurityMatrix';

// Guard
import { ProtectedRoute } from './ProtectedRoute';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/become-pro" element={<BecomeProfessional />} />
        <Route path="/ai-concierge" element={<AIConciergePage />} />

        {/* RBAC 403 & Error Pages */}
        <Route path="/403" element={<Unauthorized403 />} />
        <Route path="/500" element={<ServerError />} />
        <Route path="/404" element={<NotFound />} />
      </Route>

      {/* Auth Pages Layout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vendor/register" element={<VendorRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* Customer Protected Layout */}
      <Route
        element={
          <ProtectedRoute allowedRoles={['CUSTOMER', 'SUPER_ADMIN']}>
            <CustomerDashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/customer/dashboard" element={<CustomerWelcome />} />
        <Route path="/customer/book/:serviceId" element={<BookService />} />
        <Route path="/customer/checkout/:bookingId" element={<Checkout />} />
        <Route path="/customer/bookings" element={<BookingHistory />} />
        <Route path="/customer/bookings/:id" element={<BookingTracking />} />
        <Route path="/customer/chat/:bookingId" element={<Chat />} />
        <Route path="/customer/notifications" element={<Notifications />} />
        <Route path="/customer/wallet" element={<Wallet />} />
        <Route path="/customer/invoice/:bookingId" element={<Invoice />} />
        <Route path="/customer/profile" element={<Profile />} />
        <Route path="/customer/membership" element={<Membership />} />
        <Route path="/customer/referral" element={<Referral />} />
      </Route>

      {/* Vendor Protected Layout */}
      <Route
        element={
          <ProtectedRoute allowedRoles={['VENDOR_OWNER', 'PROFESSIONAL', 'SUPER_ADMIN']}>
            <VendorDashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="/vendor/services" element={<MyServices />} />
        <Route path="/vendor/availability" element={<Availability />} />
        <Route path="/vendor/reviews" element={<VendorReviews />} />
        <Route path="/vendor/earnings" element={<Earnings />} />
        <Route path="/vendor/profile" element={<VendorProfile />} />
        <Route path="/vendor/enterprise" element={<EnterpriseSalonChain />} />
        <Route path="/vendor/verification" element={<VerificationCenter />} />
      </Route>

      {/* Admin Protected Layout */}
      <Route
        element={
          <ProtectedRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']}>
            <AdminDashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/vendors/pending" element={<VendorApproval />} />
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/admin/erp" element={<CompanyERP />} />
        <Route path="/admin/security" element={<SecurityMatrix />} />
      </Route>

      {/* Wildcard Fallback */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};
