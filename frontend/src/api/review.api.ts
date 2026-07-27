import apiClient from './client';

export interface ReviewItem {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  serviceName: string;
  createdAt: string;
}

export const reviewApi = {
  getServiceReviews: async (serviceId: string): Promise<ReviewItem[]> => {
    try {
      const response = await apiClient.get<ReviewItem[]>(`/reviews/service/${serviceId}`);
      return response.data;
    } catch {
      return [
        {
          id: 'r1',
          userId: 'u1',
          userName: 'Ananya Rao',
          userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
          rating: 5,
          comment: 'The Diamond Hydra-Facial beautician was extremely professional. Single-use sachet opened live!',
          serviceName: 'Diamond Hydra-Glow Facial',
          createdAt: 'July 24, 2026',
        },
        {
          id: 'r2',
          userId: 'u2',
          userName: 'Sneha Verma',
          userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
          rating: 5,
          comment: 'Hair Spa session at home saved so much travel time. Complete floor cleanup done afterwards!',
          serviceName: 'Herbal Keratin Hair Spa',
          createdAt: 'July 22, 2026',
        },
      ];
    }
  },

  createReview: async (data: { bookingId: string; rating: number; comment: string }): Promise<ReviewItem> => {
    const response = await apiClient.post<ReviewItem>('/reviews', data);
    return response.data;
  },
};
