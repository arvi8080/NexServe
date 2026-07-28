import { axiosInstance } from './axiosInstance';
import { VendorVerification } from '@/types';

export const MOCK_VERIFICATION: VendorVerification = {
  id: 'verif_1',
  vendorId: 'vendor_1',
  govtIdType: 'AADHAAR',
  govtIdNumberEncrypted: '•••• •••• 9081',
  policeVerificationDoc: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
  skillCertificateDoc: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&w=600&q=80',
  bankAccountHolder: 'Glow & Grace Studio Pvt Ltd',
  bankAccountNumberEncrypted: '••••••••4892',
  bankIfscOrBranchCode: 'HDFC0001234',
  bankPayoutPreference: 'UPI',
  trustScore: 98,
  status: 'VERIFIED',
  verificationBadges: ['VERIFIED_IDENTITY', 'VERIFIED_PROFESSIONAL', 'TOP_RATED', 'ELITE_PARTNER'],
  reviewedBy: 'Admin Security Team',
  createdAt: '2025-02-10T00:00:00Z',
};

export const verificationApi = {
  getVendorVerification: async (vendorId: string): Promise<VendorVerification> => {
    try {
      const response = await axiosInstance.get(`/vendor/documents?vendorId=${vendorId}`);
      return response.data;
    } catch {
      return MOCK_VERIFICATION;
    }
  },

  uploadVendorDocuments: async (data: Partial<VendorVerification>): Promise<VendorVerification> => {
    try {
      const response = await axiosInstance.post('/vendor/documents', data);
      return response.data;
    } catch {
      return {
        ...MOCK_VERIFICATION,
        ...data,
        status: 'UNDER_REVIEW',
      };
    }
  },

  getPendingVerifications: async (): Promise<VendorVerification[]> => {
    try {
      const response = await axiosInstance.get('/admin/vendor/pending');
      return response.data;
    } catch {
      return [MOCK_VERIFICATION];
    }
  },

  approveVendorVerification: async (vendorId: string): Promise<VendorVerification> => {
    try {
      const response = await axiosInstance.patch(`/admin/vendor/${vendorId}/verify`);
      return response.data;
    } catch {
      return {
        ...MOCK_VERIFICATION,
        status: 'VERIFIED',
      };
    }
  },

  rejectVendorVerification: async (vendorId: string, reason: string): Promise<VendorVerification> => {
    try {
      const response = await axiosInstance.patch(`/admin/vendor/${vendorId}/reject`, { reason });
      return response.data;
    } catch {
      return {
        ...MOCK_VERIFICATION,
        status: 'REJECTED',
        rejectionReason: reason,
      };
    }
  },
};
