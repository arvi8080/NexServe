import apiClient from './client';
import { Vendor } from '@/types';
import { MOCK_VENDORS } from '@/services/mockDataService';

export interface NearbyBeautician extends Vendor {
  distanceKm: number;
}

export const locationApi = {
  getNearbyBeauticians: async (lat: number, lng: number, radiusKm: number = 10): Promise<NearbyBeautician[]> => {
    try {
      const response = await apiClient.get<NearbyBeautician[]>('/location/nearby-beauticians', {
        params: { lat, lng, radiusKm },
      });
      return response.data;
    } catch {
      return MOCK_VENDORS.map((v, i) => ({
        ...v,
        distanceKm: Number((1.2 + i * 0.5).toFixed(2)),
      }));
    }
  },

  updatePartnerGPS: async (bookingId: string, lat: number, lng: number): Promise<boolean> => {
    await apiClient.post('/location/partner-gps-update', { bookingId, lat, lng });
    return true;
  },
};
