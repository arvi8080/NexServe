import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader } from '@/components/common/Loader';
import { isVendorBusinessLocked } from '@/middleware/rbacMiddleware';

interface VerificationGuardProps {
  children: React.ReactNode;
  allowedPaths?: string[];
}

export const VerificationGuard: React.FC<VerificationGuardProps> = ({
  children,
  allowedPaths = [],
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loader message="Verifying partner approval status and access controls..." />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const isPendingVendor = isVendorBusinessLocked(user);
  const isAllowedPath = allowedPaths.includes(location.pathname);

  if (isPendingVendor && !isAllowedPath) {
    return <Navigate to="/vendor/pending-verification" replace />;
  }

  return <>{children}</>;
};
