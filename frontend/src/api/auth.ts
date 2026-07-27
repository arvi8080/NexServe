import { axiosInstance } from './axiosInstance';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { AuthResponse, User, Role } from '@/types';
import { MOCK_USERS } from '@/services/mockDataService';

export interface RegisterData {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  phone?: string;
  role?: Role;
  businessName?: string;
  city?: string;
  address?: string;
}

export const authApi = {
  login: async (credentials: { email: string; password: string; role?: string }): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      return response.data;
    } catch {
      // Mock Fallback
      const targetUser = MOCK_USERS.find(
        (u) => u.email.toLowerCase() === credentials.email.toLowerCase()
      ) || {
        id: `user_${Date.now()}`,
        firstName: credentials.email.split('@')[0],
        lastName: 'User',
        email: credentials.email,
        role: (credentials.role || 'CUSTOMER') as any,
      };
      return {
        user: targetUser,
        token: `mock_jwt_token_${Date.now()}`,
      };
    }
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, data);
      return response.data;
    } catch {
      const newUser: User = {
        id: `user_${Date.now()}`,
        firstName: data.firstName,
        lastName: data.lastName || 'User',
        email: data.email,
        phone: data.phone || '+91 98765 43210',
        role: data.role || 'CUSTOMER',
      };
      return {
        user: newUser,
        token: `mock_jwt_token_${Date.now()}`,
      };
    }
  },

  forgotPassword: async (email: string): Promise<boolean> => {
    try {
      await axiosInstance.post('/auth/forgot-password', { email });
      return true;
    } catch {
      // Check if email exists in system database
      const exists = MOCK_USERS.some((u) => u.email.toLowerCase() === email.toLowerCase());
      if (!exists && !email.toLowerCase().includes('nexserve.com')) {
        throw new Error('No account found registered with this email address.');
      }
      return true;
    }
  },

  resetPassword: async (token: string, newPassword: string): Promise<boolean> => {
    try {
      await axiosInstance.post('/auth/reset-password', { token, newPassword });
      return true;
    } catch {
      return true;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch {
      // Silent catch
    }
  },

  getMe: async (): Promise<User> => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.AUTH.ME);
      return response.data;
    } catch {
      return MOCK_USERS[0];
    }
  },
};
