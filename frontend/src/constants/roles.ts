import { Role } from '@/types';

export const ROLES: Record<string, Role> = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER',
  VENDOR_OWNER: 'VENDOR_OWNER',
  PROFESSIONAL: 'PROFESSIONAL',
};

export const DEFAULT_REDIRECTS: Record<Role, string> = {
  SUPER_ADMIN: '/admin/dashboard',
  ADMIN: '/admin/dashboard',
  CUSTOMER: '/customer/dashboard',
  VENDOR_OWNER: '/vendor/dashboard',
  PROFESSIONAL: '/vendor/dashboard',
};
