import apiClient from './client';
import { Service, Vendor } from '@/types';
import { MOCK_SERVICES, MOCK_VENDORS, MOCK_CATEGORIES } from '@/services/mockDataService';

export interface HomeDataResponse {
  heroBanner: {
    title: string;
    subtitle: string;
    ctaText: string;
    backgroundImage: string;
  };
  categories: typeof MOCK_CATEGORIES;
  featuredServices: Service[];
  popularServices: Service[];
  topVendors: Vendor[];
  customerReviews: Array<{
    id: string;
    name: string;
    rating: number;
    comment: string;
    serviceName: string;
    image: string;
    date: string;
  }>;
  statistics: {
    happyCustomers: string;
    verifiedBeauticians: string;
    completedBookings: string;
    averageRating: string;
  };
  offers: Array<{
    id: string;
    code: string;
    title: string;
    description: string;
    discountPercent: number;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const homeApi = {
  getHomeData: async (): Promise<HomeDataResponse> => {
    try {
      const response = await apiClient.get<{ success: boolean; data: HomeDataResponse }>('/home');
      return response.data.data;
    } catch {
      // Fallback mock data returned dynamically if endpoint is not connected
      return {
        heroBanner: {
          title: 'Luxury Doorstep Beauty & Spa Sanctuary',
          subtitle: 'Certified professionals bringing single-use sealed mono-dose salon treatments right to your living room.',
          ctaText: 'Explore Treatments',
          backgroundImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
        },
        categories: MOCK_CATEGORIES,
        featuredServices: MOCK_SERVICES.slice(0, 4),
        popularServices: MOCK_SERVICES.slice(2, 6),
        topVendors: MOCK_VENDORS,
        customerReviews: [
          {
            id: 'rev_1',
            name: 'Ananya Rao',
            rating: 5,
            comment: 'The Diamond Hydra-Facial beautician was extremely professional. Single-use sachet opened live in front of me!',
            serviceName: 'Diamond Hydra-Glow Facial',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
            date: 'July 24, 2026',
          },
          {
            id: 'rev_2',
            name: 'Sneha Verma',
            rating: 5,
            comment: 'Hair Spa session at home saved so much travel time. Complete floor cleanup done afterwards!',
            serviceName: 'Herbal Keratin Hair Spa',
            image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
            date: 'July 22, 2026',
          },
        ],
        statistics: {
          happyCustomers: '50,000+',
          verifiedBeauticians: '1,200+',
          completedBookings: '150,000+',
          averageRating: '4.9★',
        },
        offers: [
          {
            id: 'off_1',
            code: 'LUXURY25',
            title: '25% OFF Festival Radiance',
            description: 'Valid on all certified hydra-facial & hair spa packages.',
            discountPercent: 25,
          },
        ],
        faqs: [
          {
            question: 'How do you guarantee 100% hygiene at home?',
            answer: 'Every beautician carries a sealed mono-dose single-use kit containing sanitized tools, bedsheets, and sachets opened exclusively in front of you.',
          },
          {
            question: 'What if I need to cancel or reschedule?',
            answer: 'Free cancellation or rescheduling is available up to 2 hours before your scheduled appointment time.',
          },
        ],
      };
    }
  },
};
