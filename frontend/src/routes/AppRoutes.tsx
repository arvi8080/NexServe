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
import { BecomePro } from '@/pages/public/BecomePro';
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
import { Wishlist } from '@/pages/customer/Wishlist';
import { CustomerReviews } from '@/pages/customer/CustomerReviews';
import { AddressesPage } from '@/pages/customer/AddressesPage';
import { Support } from '@/pages/customer/Support';
import { CustomerSettings } from '@/pages/customer/CustomerSettings';

// Vendor Pages
import { VendorDashboard } from '@/pages/vendor/Dashboard';
import { VendorPendingVerification } from '@/pages/vendor/VendorPendingVerification';
import { VendorAccountRejected } from '@/pages/vendor/VendorAccountRejected';
import { VerificationCenter } from '@/pages/vendor/VerificationCenter';
import { MyServices } from '@/pages/vendor/MyServices';

// Admin Pages
import { AdminDashboard } from '@/pages/admin/Dashboard';
import { VendorApproval } from '@/pages/admin/VendorApproval';
import { CompanyERP } from '@/pages/admin/CompanyERP';

// Guard
import { ProtectedRoute } from './ProtectedRoute';
import { VerificationGuard } from './VerificationGuard';

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
        <Route path="/become-pro" element={<BecomePro />} />
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
        <Route path="/customer/book/:id" element={<BookService />} />
        <Route path="/customer/checkout" element={<Checkout />} />
        <Route path="/customer/bookings" element={<BookingHistory />} />
        <Route path="/customer/bookings/:id" element={<BookingTracking />} />
        <Route path="/customer/chat/:id" element={<Chat />} />
        <Route path="/customer/notifications" element={<Notifications />} />
        <Route path="/customer/wallet" element={<Wallet />} />
        <Route path="/customer/invoice/:id" element={<Invoice />} />
        <Route path="/customer/profile" element={<Profile />} />
        <Route path="/customer/membership" element={<Membership />} />
        <Route path="/customer/referral" element={<Referral />} />
        <Route path="/customer/wishlist" element={<Wishlist />} />
        <Route path="/customer/reviews" element={<CustomerReviews />} />
        <Route path="/customer/addresses" element={<AddressesPage />} />
        <Route path="/customer/support" element={<Support />} />
        <Route path="/customer/settings" element={<CustomerSettings />} />
      </Route>

      {/* Vendor Gateways & Verification Views */}
      <Route path="/vendor/pending-verification" element={<VendorPendingVerification />} />
      <Route path="/vendor/account-rejected" element={<VendorAccountRejected />} />

      {/* Vendor Protected Layout (With Verification Gate) */}
      <Route
        element={
          <ProtectedRoute allowedRoles={['VENDOR_OWNER', 'SUPER_ADMIN']}>
            <VerificationGuard>
              <VendorDashboardLayout />
            </VerificationGuard>
          </ProtectedRoute>
        }
      >
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="/vendor/verification" element={<VerificationCenter />} />
        <Route path="/vendor/services" element={<MyServices />} />
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
        <Route path="/admin/vendors" element={<VendorApproval />} />
        <Route path="/admin/services" element={<CompanyERP />} />
      </Route>

      {/* Fallback Catch-all Route */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};
