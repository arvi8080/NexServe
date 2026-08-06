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

const getStoredUsers = (): User[] => {
  try {
    const raw = localStorage.getItem('GLOWHOME_REGISTERED_USERS');
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return [];
};

const saveUserToStore = (user: User) => {
  try {
    const users = getStoredUsers();
    const existingIdx = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
    if (existingIdx !== -1) {
      users[existingIdx] = user;
    } else {
      users.unshift(user);
    }
    localStorage.setItem('GLOWHOME_REGISTERED_USERS', JSON.stringify(users));
  } catch {
    // ignore
  }
};

// Backend returns `{ success, data: { user, accessToken, refreshToken } }`.
// Normalize to the frontend AuthResponse shape (`{ user, token, accessToken, refreshToken }`).
const normalizeAuthResponse = (payload: any): AuthResponse => {
  if (!payload) return payload;
  const inner = payload.data && typeof payload.data === 'object' ? payload.data : payload;
  return {
    user: inner.user,
    token: inner.token || inner.accessToken || (typeof payload.token === 'string' ? payload.token : undefined),
    accessToken: inner.accessToken || inner.token,
    refreshToken: inner.refreshToken || payload.refreshToken,
    expiresIn: inner.expiresIn || payload.expiresIn,
  };
};

export const authApi = {
  login: async (credentials: { email: string; password: string; role?: string }): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      const normalized = normalizeAuthResponse(response.data);
      if (normalized?.user) {
        saveUserToStore(normalized.user);
      }
      return normalized;
    } catch (err: any) {
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }

      // Check registered users & seed users
      const allUsers = [...getStoredUsers(), ...MOCK_USERS];
      const targetUser = allUsers.find(
        (u) => u.email.trim().toLowerCase() === credentials.email.trim().toLowerCase()
      );

      if (!targetUser) {
        throw new Error('No account found with this email. Please create an account first.');
      }

      return {
        user: targetUser,
        token: `mock_jwt_token_${Date.now()}`,
        refreshToken: `mock_refresh_token_${Date.now()}`,
      };
    }
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, data);
      const normalized = normalizeAuthResponse(response.data);
      if (normalized?.user) {
        saveUserToStore(normalized.user);
      }
      return normalized;
    } catch (err: any) {
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }

      const allUsers = [...getStoredUsers(), ...MOCK_USERS];
      const existing = allUsers.find(
        (u) => u.email.trim().toLowerCase() === data.email.trim().toLowerCase()
      );

      if (existing) {
        throw new Error('An account with this email already exists. Please sign in instead.');
      }

      const newUser: User = {
        id: `user_${Date.now()}`,
        firstName: data.firstName,
        lastName: data.lastName || '',
        email: data.email.trim(),
        phone: data.phone || '+977 9808422407',
        role: data.role || 'CUSTOMER',
        isEmailVerified: true,
      };

      saveUserToStore(newUser);

      return {
        user: newUser,
        token: `mock_jwt_token_${Date.now()}`,
        refreshToken: `mock_refresh_token_${Date.now()}`,
      };
    }
  },

  forgotPassword: async (email: string): Promise<boolean> => {
    try {
      await axiosInstance.post('/auth/forgot-password', { email });
      return true;
    } catch {
      const allUsers = [...getStoredUsers(), ...MOCK_USERS];
      const exists = allUsers.some((u) => u.email.toLowerCase() === email.trim().toLowerCase());
      if (!exists) {
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
      const refreshToken = localStorage.getItem('glowhome_refresh_token');
      await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT, refreshToken ? { refreshToken } : {});
    } catch {
      // Silent catch
    }
  },

  getMe: async (): Promise<User> => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.AUTH.ME);
      return response.data?.user ?? response.data?.data ?? response.data;
    } catch {
      const stored = getStoredUsers();
      return stored[0] || MOCK_USERS[0];
    }
  },
};
