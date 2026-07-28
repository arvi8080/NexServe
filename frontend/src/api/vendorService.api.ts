import apiClient from './client';
import { VendorService } from '@/types';
import { MOCK_VENDORS, MOCK_SERVICES } from '@/services/mockDataService';

export const vendorServiceApi = {
  // Get all vendor service offerings for a specific global treatment and country
  getVendorServicesByGlobalServiceId: async (serviceId: string, countryCode: string = 'IN'): Promise<VendorService[]> => {
    try {
      const response = await apiClient.get<VendorService[]>(`/vendor-services/service/${serviceId}?country=${countryCode}`);
      return response.data;
    } catch {
      // Independent Country Business Pricing (Zero Currency Conversion)
      const isNepal = countryCode === 'NP';

      return [
        {
          id: `vs_1_${countryCode}`,
          vendorId: MOCK_VENDORS[0].id,
          serviceId: serviceId || MOCK_SERVICES[0].id,
          price: isNepal ? 2399 : 1499,
          discountPrice: isNepal ? 1899 : 1199,
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
          id: `vs_2_${countryCode}`,
          vendorId: MOCK_VENDORS[1].id,
          serviceId: serviceId || MOCK_SERVICES[0].id,
          price: isNepal ? 2699 : 1699,
          discountPrice: isNepal ? 2159 : 1359,
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

  // Get all offerings listed by a specific vendor for a country
  getVendorServicesByVendorId: async (vendorId: string, countryCode: string = 'IN'): Promise<VendorService[]> => {
    try {
      const response = await apiClient.get<VendorService[]>(`/vendor-services/vendor/${vendorId}?country=${countryCode}`);
      return response.data;
    } catch {
      const isNepal = countryCode === 'NP';
      return [
        {
          id: `vs_1_${countryCode}`,
          vendorId,
          serviceId: MOCK_SERVICES[0].id,
          price: isNepal ? 2399 : 1499,
          discountPrice: isNepal ? 1899 : 1199,
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
          id: `vs_3_${countryCode}`,
          vendorId,
          serviceId: MOCK_SERVICES[1].id,
          price: isNepal ? 2099 : 1299,
          discountPrice: isNepal ? 1679 : 999,
          discountPercentage: 23,
          duration: 45,
          experienceYears: 6,
          available: true,
          instantBooking: true,
          homeService: true,
          serviceRadius: 8,
          maxBookingsPerDay: 8,
          status: 'ACTIVE',
          vendor: MOCK_VENDORS[0],
          service: MOCK_SERVICES[1],
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
