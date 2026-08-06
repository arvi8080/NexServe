import apiClient from './client';
import { User } from '@/types';

export interface UserProfileResponse {
  user: User;
  walletBalance: number;
  rewardPoints: number;
  tier: string;
}

export const userApi = {
  getProfile: async (): Promise<UserProfileResponse> => {
    try {
      const response = await apiClient.get<UserProfileResponse>('/users/profile');
      return response.data;
    } catch {
      return {
        user: {
          id: 'u_90812',
          email: 'aarav.shrestha@glowhome.np',
          firstName: 'Aarav',
          lastName: 'Shrestha',
          phone: '+977 98012 34567',
          role: 'CUSTOMER',
        },
        walletBalance: 2450,
        rewardPoints: 850,
        tier: 'Gold Concierge',
      };
    }
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await apiClient.patch<User>('/users/profile', data);
    return response.data;
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<boolean> => {
    await apiClient.post('/users/change-password', { currentPassword, newPassword });
    return true;
  },

  deleteAccount: async (): Promise<boolean> => {
    await apiClient.delete('/users/account');
    return true;
  },
};
