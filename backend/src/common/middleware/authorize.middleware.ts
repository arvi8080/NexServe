import { Request, Response, NextFunction } from "express";
import prisma from "../../config/prisma";
import { AppError } from "../errors/AppError";
import { normalizeRole } from "../constants/roleHierarchy";

/**
 * Allowed roles for Role-Based Access Control.
 * SUPER_ADMIN has unrestricted access to all resources.
 */
export type AllowedRole = "SUPER_ADMIN" | "ADMIN" | "CUSTOMER" | "VENDOR";


/**
 * Middleware factory that enforces role-based access control.
 * Returns 403 Forbidden if the authenticated user's role is not in the allowed list.
 * SUPER_ADMIN is always authorized regardless of the allowed roles list.
 *
 * @param allowedRoles - The roles permitted to access the route.
 *
 * @example
 * ```ts
 * // Only admins
 * router.get("/admin/dashboard", authenticate, authorize("ADMIN", "SUPER_ADMIN"), handler);
 *
 * // Only vendors
 * router.post("/services", authenticate, authorize("VENDOR"), handler);
 *
 * // Only customers
 * router.post("/review", authenticate, authorize("CUSTOMER"), handler);
 * ```
 */
export const authorize = (...allowedRoles: AllowedRole[]) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const user = req.user;

    if (!user) {
      return next(new AppError("Authentication required. No user context found.", 401));
    }

    const normalizedRole = normalizeRole(user.role);

    // SUPER_ADMIN bypasses all role checks
    if (normalizedRole === "SUPER_ADMIN") {
      return next();
    }

    if (!allowedRoles.includes(normalizedRole)) {
      return next(
        new AppError(
          `Forbidden: Role "${normalizedRole}" is not authorized to access this resource. Required roles: ${allowedRoles.join(", ")}`,
          403
        )
      );
    }

    if (normalizedRole === "VENDOR") {
      const vendor = await prisma.vendor.findUnique({ where: { userId: user.id }, select: { status: true } });
      const status = vendor?.status || "APPROVED";
      if (status !== "APPROVED") {
        return next(
          new AppError("Your account is awaiting admin approval.", 403, "VENDOR_NOT_VERIFIED")
        );
      }
    }

    next();
  };
};

/**
 * Middleware that checks if the authenticated user owns the resource.
 * Prevents Insecure Direct Object Reference (IDOR) vulnerabilities.
 * ADMIN and SUPER_ADMIN can bypass ownership checks for administrative purposes.
 *
 * @param getResourceOwnerId - A function that extracts the resource owner's ID from the request.
 *
 * @example
 * ```ts
 * router.get("/booking/:id", authenticate, checkOwnership(req => req.params.id), handler);
 * ```
 */
export const checkOwnership = (
  getResourceOwnerId: (req: Request) => string | undefined
) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const user = req.user;

    if (!user) {
      return next(new AppError("Authentication required. No user context found.", 401));
    }

    const normalizedRole = normalizeRole(user.role);

    // Admins can access any resource for management purposes
    if (normalizedRole === "ADMIN" || normalizedRole === "SUPER_ADMIN") {
      return next();
    }

    const resourceOwnerId = getResourceOwnerId(req);

    if (!resourceOwnerId) {
      return next(new AppError("Resource owner ID not found in request.", 400));
    }

    if (user.id !== resourceOwnerId) {
      return next(
        new AppError(
          "Forbidden: You do not own this resource. IDOR attempt detected and blocked.",
          403
        )
      );
    }

    next();
  };
};

