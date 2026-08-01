import { Role, User, Vendor, normalizeRole } from '@/types';

export interface RBACContext {
  user: User | null;
  vendor?: Vendor | null;
  isAuthenticated: boolean;
}

export interface SecurityAuditLog {
  id: string;
  userId: string;
  userEmail: string;
  userRole: Role;
  action: string;
  ipAddress: string;
  userAgent: string;
  status: 'SUCCESS' | 'BLOCKED_401' | 'BLOCKED_403' | 'IDOR_PREVENTED';
  timestamp: string;
}

/**
 * Enterprise RBAC Authorization Engine
 * Enforces JWT Authentication, Role Matrix, IDOR Ownership Validation, and Vendor Verification Gates.
 */
export const isVendorBusinessLocked = (user: User | null): boolean => {
  if (!user) return false;

  const normalizedRole = normalizeRole(user.role);
  const status = (user as any)?.verificationStatus || 'APPROVED';

  return normalizedRole === 'VENDOR' && status !== 'APPROVED';
};

export const rbacEngine = {
  /**
   * 1. JWT Authentication Validator (Returns 401 if missing/invalid)
   */
  authenticate: (ctx: RBACContext): { authorized: boolean; statusCode?: number; error?: string } => {
    if (!ctx.isAuthenticated || !ctx.user) {
      return {
        authorized: false,
        statusCode: 401,
        error: '401 Unauthorized: Missing, expired, or invalid JWT security token.',
      };
    }
    return { authorized: true };
  },

  /**
   * 2. Role Access Matrix Validator (Returns 403 if role is forbidden)
   */
  authorize: (ctx: RBACContext, allowedRoles: Role[]): { authorized: boolean; statusCode?: number; error?: string } => {
    const authCheck = rbacEngine.authenticate(ctx);
    if (!authCheck.authorized) return authCheck;

    const userRole = ctx.user!.role;

    const normalizedRole = normalizeRole(userRole);

    // Super Admin has unrestricted platform access
    if (normalizedRole === 'SUPER_ADMIN') {
      return { authorized: true };
    }

    if (!allowedRoles.includes(normalizedRole as Role)) {
      return {
        authorized: false,
        statusCode: 403,
        error: `403 Forbidden: Role ${userRole} is not authorized to access this resource matrix.`,
      };
    }

    return { authorized: true };
  },

  /**
   * 3. IDOR Ownership Validator (Returns 403 if accessing another user's private data)
   */
  checkOwnership: (
    ctx: RBACContext,
    resourceOwnerId: string
  ): { authorized: boolean; statusCode?: number; error?: string } => {
    const authCheck = rbacEngine.authenticate(ctx);
    if (!authCheck.authorized) return authCheck;

    const loggedInUser = ctx.user!;
    const normalizedRole = normalizeRole(loggedInUser.role);

    // Admins can inspect all user records for compliance
    if (normalizedRole === 'ADMIN' || normalizedRole === 'SUPER_ADMIN') {
      return { authorized: true };
    }

    if (loggedInUser.id !== resourceOwnerId) {
      return {
        authorized: false,
        statusCode: 403,
        error: '403 Forbidden IDOR: You do not own this private data resource.',
      };
    }

    return { authorized: true };
  },

  /**
   * 4. Vendor Status Gate Validator (Restricts Pending/Rejected vendors)
   */
  checkVendorVerification: (
    ctx: RBACContext
  ): { authorized: boolean; redirectUrl?: string; statusCode?: number; error?: string } => {
    const authCheck = rbacEngine.authenticate(ctx);
    if (!authCheck.authorized) return authCheck;

    const user = ctx.user!;
    if (user.role === 'VENDOR_OWNER' || user.role === 'PROFESSIONAL' || user.role === 'VENDOR') {
      const status = (user as any).verificationStatus || 'APPROVED';

      if (status === 'PENDING') {
        return {
          authorized: false,
          redirectUrl: '/vendor/pending-verification',
          statusCode: 403,
          error: 'Vendor account is under verification.',
        };
      }

      if (status === 'REJECTED') {
        return {
          authorized: false,
          redirectUrl: '/vendor/account-rejected',
          statusCode: 403,
          error: 'Vendor account verification was rejected.',
        };
      }
    }

    return { authorized: true };
  },
};
