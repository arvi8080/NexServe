import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Role, normalizeRole } from '@/types';
import { Loader } from '@/components/common/Loader';
import { rbacEngine } from '@/middleware/rbacMiddleware';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  allowedRoles?: Role[];
  requireApprovedVendor?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  requireApprovedVendor = false,
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loader message="Verifying 256-bit JWT credentials & RBAC matrix..." />;
  }

  // 1. Authentication Check
  const authResult = rbacEngine.authenticate({ user, isAuthenticated, vendor: null });
  if (!authResult.authorized) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Role Access Matrix Check
  if (allowedRoles && allowedRoles.length > 0) {
    const roleResult = rbacEngine.authorize({ user, isAuthenticated, vendor: null }, allowedRoles);
    if (!roleResult.authorized) {
      return <Navigate to="/403" replace />;
    }
  }

  // 3. Vendor Verification Gate Check
  if (requireApprovedVendor && normalizeRole(user?.role) === 'VENDOR') {
    const vendorGateResult = rbacEngine.checkVendorVerification({ user, isAuthenticated, vendor: null });
    if (!vendorGateResult.authorized && vendorGateResult.redirectUrl) {
      if (location.pathname !== vendorGateResult.redirectUrl) {
        return <Navigate to={vendorGateResult.redirectUrl} replace />;
      }
    }
  }

  return children ? <>{children}</> : <Outlet />;
};

export const RoleProtectedRoute = ProtectedRoute;
