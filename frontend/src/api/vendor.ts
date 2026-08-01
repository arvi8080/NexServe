import { axiosInstance } from './axiosInstance';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { Vendor, Booking, Review, Notification } from '@/types';

interface DashboardStats {
  vendorName: string;
  profileImage?: string;
  isVerified: boolean;
  status: string;
  stats: {
    todayBookings: number;
    upcomingBookings: number;
    completedJobs: number;
    monthlyEarnings: number;
    walletBalance: number;
    pendingRequests: number;
    averageRating: number;
    totalReviews: number;
  };
  bookingTrend: { date: string; count: number }[];
  earningsGraph: { month: string; amount: number }[];
  recentActivity: any[];
  upcomingSchedule: any[];
}

interface EarningsData {
  todayEarnings: number;
  weekEarnings: number;
  monthEarnings: number;
  totalEarnings: number;
  serviceRevenue: { service: string; amount: number }[];
  transactionHistory: any[];
}

interface WalletData {
  currentBalance: number;
  pendingBalance: number;
  lifetimeEarnings: number;
}

interface TransactionResponse {
  transactions: any[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

export const vendorApi = {
  getDashboard: async (): Promise<DashboardStats> => {
    const response = await axiosInstance.get(API_ENDPOINTS.VENDOR.DASHBOARD);
    return response.data.data || response.data;
  },

  getEarnings: async (period?: string): Promise<EarningsData> => {
    const response = await axiosInstance.get(API_ENDPOINTS.VENDOR.EARNINGS, { params: { period } });
    return response.data.data || response.data;
  },

  getWallet: async (): Promise<WalletData> => {
    const response = await axiosInstance.get(API_ENDPOINTS.VENDOR.WALLET);
    return response.data.data || response.data;
  },

  getTransactions: async (page = 1, limit = 20): Promise<TransactionResponse> => {
    const response = await axiosInstance.get(API_ENDPOINTS.VENDOR.TRANSACTIONS, { params: { page, limit } });
    return response.data.data || response.data;
  },

  requestWithdrawal: async (amount: number, method: string) => {
    const response = await axiosInstance.post(API_ENDPOINTS.VENDOR.WITHDRAW, { amount, method });
    return response.data;
  },

  getWithdrawals: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.VENDOR.WITHDRAWALS);
    return response.data.data || response.data;
  },

  getVerificationStatus: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.VENDOR.VERIFICATION);
    return response.data.data || response.data;
  },

  getSecuritySettings: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.VENDOR.SECURITY);
    return response.data.data || response.data;
  },

  updateSecuritySettings: async (data: any) => {
    const response = await axiosInstance.put(API_ENDPOINTS.VENDOR.SECURITY, data);
    return response.data;
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    const response = await axiosInstance.put(API_ENDPOINTS.VENDOR.CHANGE_PASSWORD, { currentPassword, newPassword });
    return response.data;
  },

  getVendorProfile: async (): Promise<Vendor> => {
    const response = await axiosInstance.get(API_ENDPOINTS.VENDOR.PROFILE);
    return response.data.data || response.data;
  },

  updateVendorProfile: async (updates: Partial<Vendor>): Promise<Vendor> => {
    const response = await axiosInstance.put(API_ENDPOINTS.VENDOR.PROFILE, updates);
    return response.data.data || response.data;
  },
};
