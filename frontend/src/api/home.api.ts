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
      // 100% Nepal Fallback mock data with vibrant luxury beauty parlour image
      return {
        heroBanner: {
          title: "Nepal's #1 Doorstep Beauty & Home Services Sanctuary",
          subtitle: 'Certified professionals bringing single-use sealed mono-dose salon treatments right to your doorstep in Kathmandu, Pokhara & Lalitpur.',
          ctaText: 'Explore Treatments',
          backgroundImage: '/images/beauty_parlour_hero.jpg',
        },
        categories: MOCK_CATEGORIES,
        featuredServices: MOCK_SERVICES.slice(0, 4),
        popularServices: MOCK_SERVICES.slice(2, 6),
        topVendors: MOCK_VENDORS,
        customerReviews: [
          {
            id: 'rev_1',
            name: 'Ananda Shrestha (Kathmandu)',
            rating: 5,
            comment: 'The Diamond Hydra-Facial beautician in Durbar Marg was extremely professional. Single-use sachet opened live in front of me!',
            serviceName: 'Diamond Hydra-Glow Facial',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
            date: 'August 4, 2026',
          },
          {
            id: 'rev_2',
            name: 'Sneha Gurung (Lalitpur)',
            rating: 5,
            comment: 'Hair Spa session at home in Jhamsikhel saved so much travel time. Complete floor cleanup done afterwards!',
            serviceName: 'Herbal Keratin Hair Spa',
            image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
            date: 'August 2, 2026',
          },
        ],
        statistics: {
          happyCustomers: '25,000+',
          verifiedBeauticians: '650+',
          completedBookings: '85,000+',
          averageRating: '4.9★',
        },
        offers: [
          {
            id: 'off_1',
            code: 'NEPAL25',
            title: '25% OFF Festival Radiance in Nepal',
            description: 'Valid on all certified hydra-facial & hair spa packages in Kathmandu & Pokhara.',
            discountPercent: 25,
          },
        ],
        faqs: [
          {
            question: 'How do you guarantee 100% hygiene at home in Nepal?',
            answer: 'Every beautician carries a sealed mono-dose single-use kit containing sanitized tools, bedsheets, and sachets opened exclusively in front of you.',
          },
          {
            question: 'What digital payment methods do you accept in Nepal?',
            answer: 'You can pay directly via eSewa, Khalti, Fonepay, IME Pay, ConnectIPS, or Cash on service completion.',
          },
        ],
      };
    }
  },
};
