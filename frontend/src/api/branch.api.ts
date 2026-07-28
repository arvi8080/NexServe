import { axiosInstance } from './axiosInstance';
import { Branch, FranchisePartner } from '@/types';

export const MOCK_FRANCHISES: FranchisePartner[] = [
  {
    id: 'fr_1',
    companyName: 'Royal Glow India Franchises Pvt Ltd',
    ownerName: 'Vikramaditya Singhania',
    email: 'franchise.india@royalglow.com',
    phone: '+91 98112 33445',
    agreementStart: '2025-01-15',
    agreementEnd: '2030-01-15',
    commissionPercentage: 15.0,
    status: 'ACTIVE',
    createdAt: '2025-01-15T00:00:00Z',
  },
  {
    id: 'fr_2',
    companyName: 'Himalayan Luxury Wellness Partners',
    ownerName: 'Pasang Sherpa',
    email: 'nepal.partners@himalayanbeauty.np',
    phone: '+977 98012 34567',
    agreementStart: '2025-03-01',
    agreementEnd: '2030-03-01',
    commissionPercentage: 12.5,
    status: 'ACTIVE',
    createdAt: '2025-03-01T00:00:00Z',
  },
];

export const MOCK_BRANCHES: Branch[] = [
  {
    id: 'br_blr_hq',
    countryId: 'cnt_in',
    stateId: 'st_in_ka',
    cityId: 'city_blr',
    branchName: 'Bengaluru Corporate Flagship Branch',
    branchType: 'COMPANY_OWNED',
    managerName: 'Ananya Sharma',
    email: 'bengaluru.branch@nexserve.com',
    phone: '+91 80 4123 9081',
    active: true,
    createdAt: '2024-06-01T00:00:00Z',
  },
  {
    id: 'br_blr_fra',
    countryId: 'cnt_in',
    stateId: 'st_in_ka',
    cityId: 'city_blr',
    franchiseId: 'fr_1',
    branchName: 'Koramangala Partner Franchise',
    branchType: 'FRANCHISE',
    managerName: 'Rohan Mehta',
    email: 'koramangala.fra@royalglow.com',
    phone: '+91 98765 11223',
    active: true,
    createdAt: '2025-01-20T00:00:00Z',
  },
  {
    id: 'br_ktm_fra',
    countryId: 'cnt_np',
    stateId: 'st_np_ba',
    cityId: 'city_ktm',
    franchiseId: 'fr_2',
    branchName: 'Kathmandu Durbar Marg Franchise',
    branchType: 'FRANCHISE',
    managerName: 'Kritika Thapa',
    email: 'kathmandu.branch@himalayanbeauty.np',
    phone: '+977 1 4239081',
    active: true,
    createdAt: '2025-03-05T00:00:00Z',
  },
];

export interface RegionalRevenueReport {
  countryId: string;
  countryName: string;
  currencySymbol: string;
  companyRevenue: number;
  franchiseRevenue: number;
  totalGMV: number;
  branchesCount: number;
  activeVendorsCount: number;
}

export const branchApi = {
  getBranches: async (countryId?: string): Promise<Branch[]> => {
    try {
      const url = countryId ? `/branches?countryId=${countryId}` : '/branches';
      const response = await axiosInstance.get(url);
      return response.data;
    } catch {
      if (countryId) {
        return MOCK_BRANCHES.filter((b) => b.countryId === countryId);
      }
      return MOCK_BRANCHES;
    }
  },

  getFranchises: async (): Promise<FranchisePartner[]> => {
    try {
      const response = await axiosInstance.get('/franchises');
      return response.data;
    } catch {
      return MOCK_FRANCHISES;
    }
  },

  createBranch: async (data: Partial<Branch>): Promise<Branch> => {
    try {
      const response = await axiosInstance.post('/branches', data);
      return response.data;
    } catch {
      const newBranch: Branch = {
        id: `br_${Date.now()}`,
        countryId: data.countryId || 'cnt_in',
        stateId: data.stateId || 'st_in_ka',
        cityId: data.cityId || 'city_blr',
        branchName: data.branchName || 'New Regional Branch',
        branchType: data.branchType || 'COMPANY_OWNED',
        managerName: data.managerName || 'Regional Manager',
        email: data.email || 'manager@nexserve.com',
        phone: data.phone || '+91 98765 43210',
        active: true,
        createdAt: new Date().toISOString(),
      };
      MOCK_BRANCHES.push(newBranch);
      return newBranch;
    }
  },

  getRegionalRevenueReports: async (): Promise<RegionalRevenueReport[]> => {
    try {
      const response = await axiosInstance.get('/branches/revenue');
      return response.data;
    } catch {
      return [
        {
          countryId: 'cnt_in',
          countryName: 'India',
          currencySymbol: '₹',
          companyRevenue: 4850000,
          franchiseRevenue: 3240000,
          totalGMV: 8090000,
          branchesCount: 2,
          activeVendorsCount: 42,
        },
        {
          countryId: 'cnt_np',
          countryName: 'Nepal',
          currencySymbol: 'रु',
          companyRevenue: 1850000,
          franchiseRevenue: 1420000,
          totalGMV: 3270000,
          branchesCount: 1,
          activeVendorsCount: 18,
        },
      ];
    }
  },
};
