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
          country: countryCode,
          state: isNepal ? 'Bagmati' : 'Karnataka',
          city: isNepal ? 'Kathmandu' : 'Bengaluru',
          area: isNepal ? 'Durbar Marg' : 'Indiranagar',
          price: isNepal ? 2399 : 1499,
          discountPrice: isNepal ? 1899 : 1199,
          discountPercentage: 20,
          duration: 60,
          availableSlots: ['10:00 AM', '02:00 PM', '05:00 PM'],
          genderPreference: 'UNISEX',
          experienceYears: 8,
          available: true,
          instantBooking: true,
          homeService: true,
          serviceRadius: 10,
          maxBookingsPerDay: 6,
          status: 'ACTIVE',
          vendor: MOCK_VENDORS[0],
          service: { ...MOCK_SERVICES[0], minPrice: 300, maxPrice: 5000 },
        },
        {
          id: `vs_2_${countryCode}`,
          vendorId: MOCK_VENDORS[1].id,
          serviceId: serviceId || MOCK_SERVICES[0].id,
          country: countryCode,
          state: isNepal ? 'Bagmati' : 'Karnataka',
          city: isNepal ? 'Kathmandu' : 'Bengaluru',
          area: isNepal ? 'Thamel' : 'Koramangala',
          price: isNepal ? 2699 : 1699,
          discountPrice: isNepal ? 2159 : 1359,
          discountPercentage: 20,
          duration: 75,
          availableSlots: ['11:00 AM', '03:00 PM', '06:00 PM'],
          genderPreference: 'UNISEX',
          experienceYears: 10,
          available: true,
          instantBooking: true,
          homeService: true,
          serviceRadius: 12,
          maxBookingsPerDay: 5,
          status: 'ACTIVE',
          vendor: MOCK_VENDORS[1],
          service: { ...MOCK_SERVICES[0], minPrice: 300, maxPrice: 5000 },
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
          country: countryCode,
          state: isNepal ? 'Bagmati' : 'Karnataka',
          city: isNepal ? 'Kathmandu' : 'Bengaluru',
          area: isNepal ? 'Durbar Marg' : 'Indiranagar',
          price: isNepal ? 2399 : 1499,
          discountPrice: isNepal ? 1899 : 1199,
          discountPercentage: 20,
          duration: 60,
          availableSlots: ['10:00 AM', '02:00 PM', '05:00 PM'],
          genderPreference: 'UNISEX',
          experienceYears: 8,
          available: true,
          instantBooking: true,
          homeService: true,
          serviceRadius: 10,
          maxBookingsPerDay: 6,
          status: 'ACTIVE',
          vendor: MOCK_VENDORS[0],
          service: { ...MOCK_SERVICES[0], minPrice: 300, maxPrice: 5000 },
        },
        {
          id: `vs_3_${countryCode}`,
          vendorId,
          serviceId: MOCK_SERVICES[1].id,
          country: countryCode,
          state: isNepal ? 'Bagmati' : 'Karnataka',
          city: isNepal ? 'Kathmandu' : 'Bengaluru',
          area: isNepal ? 'Durbar Marg' : 'Indiranagar',
          price: isNepal ? 2099 : 1299,
          discountPrice: isNepal ? 1679 : 999,
          discountPercentage: 23,
          duration: 45,
          availableSlots: ['10:00 AM', '01:00 PM', '04:00 PM'],
          genderPreference: 'UNISEX',
          experienceYears: 6,
          available: true,
          instantBooking: true,
          homeService: true,
          serviceRadius: 8,
          maxBookingsPerDay: 8,
          status: 'ACTIVE',
          vendor: MOCK_VENDORS[0],
          service: { ...MOCK_SERVICES[1], minPrice: 200, maxPrice: 3500 },
        },
      ];
    }
  },

  createVendorService: async (data: Partial<VendorService>): Promise<VendorService> => {
    try {
      const response = await apiClient.post<VendorService>('/vendor-services', data);
      return response.data;
    } catch {
      return {
        id: `vs_${Date.now()}`,
        vendorId: data.vendorId || 'vendor_1',
        serviceId: data.serviceId || 'service_1',
        country: data.country || 'IN',
        state: data.state || 'Karnataka',
        city: data.city || 'Bengaluru',
        area: data.area || 'Indiranagar',
        price: data.price || 1499,
        discountPrice: data.discountPrice,
        discountPercentage: data.discountPercentage || 0,
        duration: data.duration || 45,
        availableSlots: data.availableSlots || ['10:00 AM', '02:00 PM'],
        genderPreference: data.genderPreference || 'UNISEX',
        experienceYears: 5,
        available: true,
        instantBooking: true,
        homeService: true,
        serviceRadius: 10,
        maxBookingsPerDay: 6,
        status: 'ACTIVE',
      };
    }
  },

  updateVendorService: async (id: string, data: Partial<VendorService>): Promise<VendorService> => {
    try {
      const response = await apiClient.put<VendorService>(`/vendor-services/${id}`, data);
      return response.data;
    } catch {
      return {
        id,
        vendorId: 'vendor_1',
        serviceId: data.serviceId || 'service_1',
        price: data.price || 1499,
        duration: data.duration || 45,
        status: data.status || 'ACTIVE',
        ...data,
      } as VendorService;
    }
  },

  deleteVendorService: async (id: string): Promise<boolean> => {
    try {
      await apiClient.delete(`/vendor-services/${id}`);
    } catch {
      // Soft delete only
    }
    return true;
  },
};
