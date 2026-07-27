import { axiosInstance } from './axiosInstance';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { ProfessionalLocation } from '@/types';
import { MOCK_LOCATION } from '@/services/mockDataService';

export const locationApi = {
  updateLocation: async (location: { latitude: number; longitude: number; status?: string }): Promise<ProfessionalLocation> => {
    try {
      const response = await axiosInstance.patch(API_ENDPOINTS.LOCATION.PATCH, location);
      return response.data;
    } catch {
      MOCK_LOCATION.latitude = location.latitude;
      MOCK_LOCATION.longitude = location.longitude;
      if (location.status) MOCK_LOCATION.status = location.status as any;
      MOCK_LOCATION.lastUpdated = new Date().toISOString();
      return MOCK_LOCATION;
    }
  },

  getNearbyProfessionals: async (lat: number, lng: number): Promise<ProfessionalLocation[]> => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.LOCATION.NEARBY, { params: { lat, lng } });
      return response.data;
    } catch {
      return [MOCK_LOCATION];
    }
  },
};
