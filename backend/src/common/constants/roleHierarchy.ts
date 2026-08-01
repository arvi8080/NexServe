export type RoleName = "SUPER_ADMIN" | "ADMIN" | "CUSTOMER" | "VENDOR";

export const ROLE_HIERARCHY: Record<RoleName, RoleName[]> = {
  SUPER_ADMIN: ["SUPER_ADMIN", "ADMIN", "VENDOR", "CUSTOMER"],
  ADMIN: ["ADMIN", "VENDOR", "CUSTOMER"],
  VENDOR: ["VENDOR"],
  CUSTOMER: ["CUSTOMER"],
};

export const normalizeRole = (role?: string): RoleName => {
  if (role === "VENDOR_OWNER" || role === "PROFESSIONAL") {
    return "VENDOR";
  }

  if (role === "SUPER_ADMIN" || role === "ADMIN" || role === "CUSTOMER" || role === "VENDOR") {
    return role;
  }

  return "CUSTOMER";
};

export const isSuperAdminRole = (role?: string): boolean => normalizeRole(role) === "SUPER_ADMIN";
export const isAdminRole = (role?: string): boolean => normalizeRole(role) === "ADMIN" || normalizeRole(role) === "SUPER_ADMIN";
export const canManagePlatform = (role?: string): boolean => isSuperAdminRole(role);
export const canVerifyVendors = (role?: string): boolean => isAdminRole(role);
export const canManageCustomers = (role?: string): boolean => isAdminRole(role);
export const canManageServices = (role?: string): boolean => isAdminRole(role);
export const canManageBookings = (role?: string): boolean => isAdminRole(role);
export const canAccessSupport = (role?: string): boolean => isAdminRole(role);
