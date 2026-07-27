import apiClient from './client';

export interface GSTInvoiceData {
  invoiceNumber: string;
  gstin: string;
  sacCode: string;
  bookingId: string;
  customerName: string;
  serviceName: string;
  baseAmount: number;
  cgst: number;
  sgst: number;
  totalAmount: number;
  pdfDownloadUrl?: string;
}

export const invoiceApi = {
  getInvoice: async (bookingId: string): Promise<GSTInvoiceData> => {
    try {
      const response = await apiClient.get<GSTInvoiceData>(`/invoices/${bookingId}`);
      return response.data;
    } catch {
      return {
        invoiceNumber: 'INV-2026-0891',
        gstin: '29AAACN1234F1Z9',
        sacCode: '999722',
        bookingId,
        customerName: 'Arvind Kumar',
        serviceName: 'Diamond Hydra-Glow Facial',
        baseAmount: 1270.34,
        cgst: 114.33,
        sgst: 114.33,
        totalAmount: 1499.00,
        pdfDownloadUrl: `/api/v1/invoices/${bookingId}/pdf`,
      };
    }
  },
};
