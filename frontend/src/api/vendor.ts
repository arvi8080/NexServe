import { axiosInstance } from './axiosInstance';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { Vendor } from '@/types';
import { MOCK_VENDORS } from '@/services/mockDataService';

export const vendorApi = {
  getVendorProfile: async (): Promise<Vendor> => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.VENDOR.PROFILE);
      return response.data;
    } catch {
      return MOCK_VENDORS[0];
    }
  },

  updateVendorProfile: async (updates: Partial<Vendor>): Promise<Vendor> => {
    try {
      const response = await axiosInstance.put(API_ENDPOINTS.VENDOR.PROFILE, updates);
      return response.data;
    } catch {
      MOCK_VENDORS[0] = { ...MOCK_VENDORS[0], ...updates };
      return MOCK_VENDORS[0];
    }
  },
};
