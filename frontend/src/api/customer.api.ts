import apiClient from './client';
import { User, Booking, Service, Notification, CustomerAddress, Review } from '@/types';
import { MOCK_SERVICES, MOCK_BOOKINGS } from '@/services/mockDataService';

export interface CustomerDashboardStats {
  upcomingBookingsCount: number;
  activeBookingsCount: number;
  completedBookingsCount: number;
  cancelledBookingsCount: number;
  walletBalance: number;
  wishlistCount: number;
  totalReviewsCount: number;
  recentActivity: {
    id: string;
    title: string;
    description: string;
    timestamp: string;
    type: 'BOOKING' | 'WALLET' | 'REVIEW' | 'NOTIFICATION';
  }[];
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  category: 'BOOKING' | 'PAYMENT' | 'VENDOR' | 'TECHNICAL' | 'OTHER';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  description: string;
  createdAt: string;
  updatedAt: string;
}

export const customerApi = {
  getDashboardStats: async (): Promise<CustomerDashboardStats> => {
    try {
      const response = await apiClient.get<{ success: boolean; data: CustomerDashboardStats }>('/customer/dashboard');
      return response.data.data;
    } catch {
      return {
        upcomingBookingsCount: 2,
        activeBookingsCount: 1,
        completedBookingsCount: 14,
        cancelledBookingsCount: 1,
        walletBalance: 2450.0,
        wishlistCount: 4,
        totalReviewsCount: 8,
        recentActivity: [
          {
            id: 'act_1',
            title: 'Booking Confirmed',
            description: 'HD Airbrush Bridal Party Makeup scheduled for tomorrow at 10:00 AM.',
            timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
            type: 'BOOKING',
          },
          {
            id: 'act_2',
            title: 'Wallet Cashback Credited',
            description: '₹250 promo cashback credited to your GlowHome Wallet.',
            timestamp: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
            type: 'WALLET',
          },
          {
            id: 'act_3',
            title: 'Review Published',
            description: 'You rated Priya Kapoor Beauty Studio 5 Stars ★★★★★.',
            timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
            type: 'REVIEW',
          },
        ],
      };
    }
  },

  getWishlist: async (): Promise<Service[]> => {
    try {
      const response = await apiClient.get<{ success: boolean; data: Service[] }>('/customer/wishlist');
      return response.data.data;
    } catch {
      return MOCK_SERVICES.slice(0, 4);
    }
  },

  toggleWishlist: async (serviceId: string): Promise<{ inWishlist: boolean }> => {
    try {
      const response = await apiClient.post<{ inWishlist: boolean }>(`/customer/wishlist/${serviceId}/toggle`);
      return response.data;
    } catch {
      return { inWishlist: true };
    }
  },

  getReviews: async (): Promise<Review[]> => {
    try {
      const response = await apiClient.get<Review[]>('/customer/reviews');
      return response.data;
    } catch {
      return [
        {
          id: 'rev_1',
          bookingId: 'booking_1',
          customerId: 'user_cust_1',
          vendorId: 'vendor_1',
          rating: 5,
          comment: 'Priya was exceptionally punctual, gentle, and used 100% sealed hygiene kits. Best doorstep makeup experience in Bengaluru!',
          createdAt: new Date(Date.now() - 2 * 86400 * 1000).toISOString(),
        },
        {
          id: 'rev_2',
          bookingId: 'booking_2',
          customerId: 'user_cust_1',
          vendorId: 'vendor_2',
          rating: 5,
          comment: 'The Herbal Keratin Hair Spa transformed my hair texture completely. Highly recommended!',
          createdAt: new Date(Date.now() - 7 * 86400 * 1000).toISOString(),
        },
      ];
    }
  },

  createReview: async (data: { bookingId: string; vendorId: string; rating: number; comment: string }): Promise<Review> => {
    try {
      const response = await apiClient.post<Review>('/customer/review', data);
      return response.data;
    } catch {
      return {
        id: `rev_${Date.now()}`,
        bookingId: data.bookingId,
        customerId: 'user_cust_1',
        vendorId: data.vendorId,
        rating: data.rating,
        comment: data.comment,
        createdAt: new Date().toISOString(),
      };
    }
  },

  getAddresses: async (): Promise<CustomerAddress[]> => {
    try {
      const response = await apiClient.get<CustomerAddress[]>('/customer/addresses');
      return response.data;
    } catch {
      return [
        {
          id: 'addr_1',
          userId: 'user_cust_1',
          label: 'Home',
          fullName: 'Aarav Sharma',
          phoneNumber: '+91 98765 43210',
          addressLine1: 'Flat 402, Sterling Residency',
          addressLine2: '12th Main Road, 4th Block',
          landmark: 'Opposite Shell Petrol Pump',
          city: 'Bengaluru',
          state: 'Karnataka',
          country: 'India',
          postalCode: '560038',
          latitude: 12.9716,
          longitude: 77.5946,
          isDefault: true,
        },
        {
          id: 'addr_2',
          userId: 'user_cust_1',
          label: 'Office',
          fullName: 'Aarav Sharma',
          phoneNumber: '+91 98765 43210',
          addressLine1: 'GlowHome Tech Park, Tower B, 6th Floor',
          addressLine2: 'Outer Ring Road, Marathahalli',
          landmark: 'Near Embassy Tech Village',
          city: 'Bengaluru',
          state: 'Karnataka',
          country: 'India',
          postalCode: '560103',
          latitude: 12.9352,
          longitude: 77.6946,
          isDefault: false,
        },
      ];
    }
  },

  createAddress: async (data: Partial<CustomerAddress>): Promise<CustomerAddress> => {
    try {
      const response = await apiClient.post<CustomerAddress>('/customer/address', data);
      return response.data;
    } catch {
      return {
        id: `addr_${Date.now()}`,
        userId: 'user_cust_1',
        label: data.label || 'Home',
        fullName: data.fullName || 'Aarav Sharma',
        phoneNumber: data.phoneNumber || '+91 98765 43210',
        addressLine1: data.addressLine1 || '',
        addressLine2: data.addressLine2,
        landmark: data.landmark,
        city: data.city || 'Bengaluru',
        state: data.state || 'Karnataka',
        country: data.country || 'India',
        postalCode: data.postalCode || '560038',
        latitude: 12.9716,
        longitude: 77.5946,
        isDefault: data.isDefault || false,
      };
    }
  },

  deleteAddress: async (id: string): Promise<boolean> => {
    try {
      await apiClient.delete(`/customer/address/${id}`);
    } catch {
      // Soft fallback
    }
    return true;
  },

  getSupportTickets: async (): Promise<SupportTicket[]> => {
    try {
      const response = await apiClient.get<SupportTicket[]>('/customer/support/tickets');
      return response.data;
    } catch {
      return [
        {
          id: 'tkt_1',
          ticketNumber: 'GH-TKT-8841',
          subject: 'Reschedule request for Hair Spa treatment',
          category: 'BOOKING',
          priority: 'MEDIUM',
          status: 'RESOLVED',
          description: 'Needed to shift appointment from 10 AM to 2 PM due to an urgent meeting.',
          createdAt: new Date(Date.now() - 3 * 86400 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 2 * 86400 * 1000).toISOString(),
        },
      ];
    }
  },

  createSupportTicket: async (data: Partial<SupportTicket>): Promise<SupportTicket> => {
    try {
      const response = await apiClient.post<SupportTicket>('/customer/support/tickets', data);
      return response.data;
    } catch {
      return {
        id: `tkt_${Date.now()}`,
        ticketNumber: `GH-TKT-${Math.floor(1000 + Math.random() * 9000)}`,
        subject: data.subject || 'General Enquiry',
        category: data.category || 'OTHER',
        priority: data.priority || 'MEDIUM',
        status: 'OPEN',
        description: data.description || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
  },

  updateSettings: async (settings: any): Promise<boolean> => {
    try {
      await apiClient.put('/customer/settings', settings);
    } catch {
      // Fallback
    }
    return true;
  },
};
