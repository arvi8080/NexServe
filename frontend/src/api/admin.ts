import { axiosInstance } from './axiosInstance';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { AdminDashboardStats, Vendor } from '@/types';
import { MOCK_VENDORS, MOCK_BOOKINGS } from '@/services/mockDataService';

export const adminApi = {
  getDashboardStats: async (): Promise<AdminDashboardStats> => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ADMIN.DASHBOARD);
      return response.data;
    } catch {
      return {
        totalUsers: 1420,
        totalVendors: 86,
        totalBookings: 3240,
        totalRevenue: 485000,
        pendingVendorsCount: MOCK_VENDORS.filter((v) => v.status === 'PENDING').length,
        recentBookings: MOCK_BOOKINGS,
        revenueByMonth: [
          { month: 'Jan', amount: 32000 },
          { month: 'Feb', amount: 45000 },
          { month: 'Mar', amount: 58000 },
          { month: 'Apr', amount: 64000 },
          { month: 'May', amount: 72000 },
          { month: 'Jun', amount: 89000 },
          { month: 'Jul', amount: 125000 },
        ],
        categoryDistribution: [
          { category: 'Facial & Glow', count: 420 },
          { category: 'Hair Styling', count: 380 },
          { category: 'Waxing & Smooth', count: 290 },
          { category: 'Pedicure & Nails', count: 180 },
          { category: 'Bridal Makeover', count: 150 },
        ],
      };
    }
  },

  getPendingVendors: async (): Promise<Vendor[]> => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ADMIN.PENDING_VENDORS);
      return response.data;
    } catch {
      return MOCK_VENDORS.filter((v) => v.status === 'PENDING');
    }
  },

  updateVendorStatus: async (vendorId: string, status: 'APPROVED' | 'REJECTED'): Promise<Vendor> => {
    try {
      const response = await axiosInstance.patch(API_ENDPOINTS.ADMIN.VENDOR_STATUS(vendorId), { status });
      return response.data;
    } catch {
      const vendor = MOCK_VENDORS.find((v) => v.id === vendorId);
      if (vendor) vendor.status = status;
      return vendor || MOCK_VENDORS[0];
    }
  },
};
