import { axiosInstance } from './axiosInstance';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { Invoice } from '@/types';
import { MOCK_INVOICES } from '@/services/mockDataService';

export const invoiceApi = {
  getInvoiceByBookingId: async (bookingId: string): Promise<Invoice> => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.INVOICE.BY_BOOKING(bookingId));
      return response.data;
    } catch {
      return MOCK_INVOICES.find((inv: Invoice) => inv.bookingId === bookingId) || ({} as Invoice);
    }
  },
};
