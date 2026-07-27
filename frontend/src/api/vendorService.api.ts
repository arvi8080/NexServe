import apiClient from './client';
import { VendorService } from '@/types';
import { MOCK_VENDORS, MOCK_SERVICES } from '@/services/mockDataService';

export const vendorServiceApi = {
  // Get all vendor service offerings for a specific global treatment
  getVendorServicesByGlobalServiceId: async (serviceId: string): Promise<VendorService[]> => {
    try {
      const response = await apiClient.get<VendorService[]>(`/vendor-services/service/${serviceId}`);
      return response.data;
    } catch {
      // Dynamic mock vendor offerings for marketplace comparison
      return [
        {
          id: 'vs_1',
          vendorId: MOCK_VENDORS[0].id,
          serviceId: serviceId || MOCK_SERVICES[0].id,
          price: 1499,
          discountPrice: 1199,
          discountPercentage: 20,
          duration: 60,
          experienceYears: 8,
          available: true,
          instantBooking: true,
          homeService: true,
          serviceRadius: 10,
          maxBookingsPerDay: 6,
          status: 'ACTIVE',
          vendor: MOCK_VENDORS[0],
          service: MOCK_SERVICES[0],
        },
        {
          id: 'vs_2',
          vendorId: MOCK_VENDORS[1].id,
          serviceId: serviceId || MOCK_SERVICES[0].id,
          price: 1699,
          discountPrice: 1359,
          discountPercentage: 20,
          duration: 75,
          experienceYears: 10,
          available: true,
          instantBooking: true,
          homeService: true,
          serviceRadius: 12,
          maxBookingsPerDay: 5,
          status: 'ACTIVE',
          vendor: MOCK_VENDORS[1],
          service: MOCK_SERVICES[0],
        },
      ];
    }
  },

  // Get all offerings listed by a specific vendor
  getVendorServicesByVendorId: async (vendorId: string): Promise<VendorService[]> => {
    try {
      const response = await apiClient.get<VendorService[]>(`/vendor-services/vendor/${vendorId}`);
      return response.data;
    } catch {
      return [
        {
          id: 'vs_1',
          vendorId,
          serviceId: MOCK_SERVICES[0].id,
          price: 1499,
          discountPrice: 1199,
          discountPercentage: 20,
          duration: 60,
          experienceYears: 8,
          available: true,
          instantBooking: true,
          homeService: true,
          serviceRadius: 10,
          maxBookingsPerDay: 6,
          status: 'ACTIVE',
          vendor: MOCK_VENDORS[0],
          service: MOCK_SERVICES[0],
        },
      ];
    }
  },

  createVendorService: async (data: Partial<VendorService>): Promise<VendorService> => {
    const response = await apiClient.post<VendorService>('/vendor-services', data);
    return response.data;
  },

  updateVendorService: async (id: string, data: Partial<VendorService>): Promise<VendorService> => {
    const response = await apiClient.put<VendorService>(`/vendor-services/${id}`, data);
    return response.data;
  },

  deleteVendorService: async (id: string): Promise<boolean> => {
    await apiClient.delete(`/vendor-services/${id}`);
    return true;
  },
};
