import { axiosInstance } from './axiosInstance';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { Availability } from '@/types';
import { MOCK_AVAILABILITY } from '@/services/mockDataService';

export const availabilityApi = {
  getAvailability: async (): Promise<Availability[]> => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.AVAILABILITY.BASE);
      return response.data;
    } catch {
      return MOCK_AVAILABILITY;
    }
  },

  updateAvailability: async (slots: Availability[]): Promise<Availability[]> => {
    try {
      const response = await axiosInstance.patch(API_ENDPOINTS.AVAILABILITY.BASE, { slots });
      return response.data;
    } catch {
      return slots;
    }
  },
};
