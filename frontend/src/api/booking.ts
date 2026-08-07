import { axiosInstance } from './axiosInstance';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { Booking } from '@/types';
import { MOCK_BOOKINGS, MOCK_SERVICES, MOCK_VENDORS } from '@/services/mockDataService';

const hasAuthToken = (): boolean => {
  try {
    const token = localStorage.getItem('glowhome_access_token') || localStorage.getItem('token');
    return !!token;
  } catch {
    return false;
  }
};

export const bookingApi = {
  createBooking: async (bookingData: { serviceId: string; bookingDate: string; address: string; notes?: string }): Promise<Booking> => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.BOOKING.BASE, bookingData);
      return response.data;
    } catch {
      const service = MOCK_SERVICES.find((s) => s.id === bookingData.serviceId) || MOCK_SERVICES[0];
      const newBooking: Booking = {
        id: `book_${Date.now()}`,
        customerId: 'user_cust_1',
        vendorId: service.vendorId || 'vendor_1',
        serviceId: service.id,
        bookingDate: bookingData.bookingDate,
        address: bookingData.address,
        notes: bookingData.notes,
        totalAmount: service.price,
        status: 'PENDING',
        service: service,
        vendor: service.vendor || MOCK_VENDORS[0],
        createdAt: new Date().toISOString(),
      };
      MOCK_BOOKINGS.unshift(newBooking);
      return newBooking;
    }
  },

  getMyBookings: async (): Promise<Booking[]> => {
    if (!hasAuthToken()) {
      return MOCK_BOOKINGS;
    }
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.BOOKING.MY);
      return response.data?.data ?? response.data;
    } catch {
      return MOCK_BOOKINGS;
    }
  },

  getVendorBookings: async (): Promise<Booking[]> => {
    if (!hasAuthToken()) {
      return MOCK_BOOKINGS;
    }
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.BOOKING.VENDOR);
      return response.data?.data ?? response.data;
    } catch {
      return MOCK_BOOKINGS;
    }
  },

  getBookingById: async (id: string): Promise<Booking> => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.BOOKING.BY_ID(id));
      return response.data?.data ?? response.data;
    } catch {
      const booking = MOCK_BOOKINGS.find((b) => b.id === id);
      if (!booking) throw new Error('Booking not found');
      return booking;
    }
  },

  updateBookingStatus: async (id: string, status: string): Promise<Booking> => {
    try {
      const response = await axiosInstance.patch(API_ENDPOINTS.BOOKING.STATUS(id), { status });
      return response.data?.data ?? response.data;
    } catch {
      const booking = MOCK_BOOKINGS.find((b) => b.id === id);
      if (booking) booking.status = status as any;
      return booking || MOCK_BOOKINGS[0];
    }
  },
};
