import { axiosInstance } from './axiosInstance';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { Review } from '@/types';
import { MOCK_REVIEWS } from '@/services/mockDataService';

export const reviewApi = {
  getVendorReviews: async (vendorId: string): Promise<Review[]> => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.REVIEW.VENDOR(vendorId));
      return response.data;
    } catch {
      return MOCK_REVIEWS.filter((r) => r.vendorId === vendorId || true);
    }
  },

  createReview: async (reviewData: { bookingId: string; vendorId: string; rating: number; comment?: string }): Promise<Review> => {
    try {
      const response = await axiosInstance.post('/review', reviewData);
      return response.data;
    } catch {
      const newReview: Review = {
        id: `rev_${Date.now()}`,
        bookingId: reviewData.bookingId,
        customerId: 'user_cust_1',
        vendorId: reviewData.vendorId,
        rating: reviewData.rating,
        comment: reviewData.comment,
        createdAt: new Date().toISOString(),
      };
      MOCK_REVIEWS.unshift(newReview);
      return newReview;
    }
  },
};
