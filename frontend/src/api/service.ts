import { axiosInstance } from './axiosInstance';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { Service } from '@/types';
import { MOCK_SERVICES } from '@/services/mockDataService';

const getStoredServices = (): Service[] => {
  try {
    const raw = localStorage.getItem('GLOWHOME_REGISTERED_SERVICES');
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fallback
  }
  return [];
};

export const serviceApi = {
  getAllServices: async (category?: string): Promise<Service[]> => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.SERVICE.BASE, { params: { category } });
      const apiServices = response.data || [];
      const stored = getStoredServices();
      const combined = [...stored, ...apiServices];
      if (category && category !== 'All') {
        return combined.filter(
          (s) =>
            s.category.toUpperCase() === category.toUpperCase() ||
            s.category.toUpperCase().includes(category.toUpperCase())
        );
      }
      return combined;
    } catch {
      const stored = getStoredServices();
      const combined = [...stored, ...MOCK_SERVICES];
      if (category && category !== 'All') {
        return combined.filter(
          (s) =>
            s.category.toUpperCase() === category.toUpperCase() ||
            s.category.toUpperCase().includes(category.toUpperCase())
        );
      }
      return combined;
    }
  },

  searchServices: async (query: string): Promise<Service[]> => {
    const stored = getStoredServices();
    const combined = [...stored, ...MOCK_SERVICES];
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.SERVICE.SEARCH, { params: { q: query } });
      return response.data;
    } catch {
      const q = query.toLowerCase();
      return combined.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.vendor?.businessName?.toLowerCase().includes(q)
      );
    }
  },

  getServiceById: async (id: string): Promise<Service> => {
    const stored = getStoredServices();
    const combined = [...stored, ...MOCK_SERVICES];
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.SERVICE.BY_ID(id));
      return response.data;
    } catch {
      return combined.find((s) => s.id === id) || combined[0];
    }
  },

  getMyServices: async (): Promise<Service[]> => {
    const stored = getStoredServices();
    const combined = [...stored, ...MOCK_SERVICES];
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.SERVICE.MY);
      return response.data;
    } catch {
      return combined.filter((s) => s.vendorId === 'vendor_1' || s.id.startsWith('service_reg_'));
    }
  },

  createService: async (serviceData: Partial<Service>): Promise<Service> => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.SERVICE.BASE, serviceData);
      return response.data;
    } catch {
      const newService: Service = {
        id: `service_${Date.now()}`,
        vendorId: 'vendor_1',
        title: serviceData.title || 'New Service',
        description: serviceData.description || '',
        category: serviceData.category || 'FACIAL',
        price: Number(serviceData.price) || 999,
        duration: Number(serviceData.duration) || 60,
        image: serviceData.image || 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
        isActive: true,
      };
      MOCK_SERVICES.unshift(newService);
      return newService;
    }
  },

  updateService: async (id: string, updates: Partial<Service>): Promise<Service> => {
    try {
      const response = await axiosInstance.put(API_ENDPOINTS.SERVICE.BY_ID(id), updates);
      return response.data;
    } catch {
      const idx = MOCK_SERVICES.findIndex((s) => s.id === id);
      if (idx !== -1) {
        MOCK_SERVICES[idx] = { ...MOCK_SERVICES[idx], ...updates };
        return MOCK_SERVICES[idx];
      }
      return MOCK_SERVICES[0];
    }
  },

  deleteService: async (id: string): Promise<void> => {
    try {
      await axiosInstance.delete(API_ENDPOINTS.SERVICE.BY_ID(id));
    } catch {
      const idx = MOCK_SERVICES.findIndex((s) => s.id === id);
      if (idx !== -1) {
        MOCK_SERVICES.splice(idx, 1);
      }
    }
  },
};
