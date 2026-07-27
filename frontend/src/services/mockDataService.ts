import { User, Vendor, Service, Booking, Review, Notification, Invoice, Availability, ProfessionalLocation, AdminDashboardStats, ChatMessage } from '@/types';

// Initial Mock Seed Data
export const MOCK_USERS: User[] = [
  {
    id: 'user_cust_1',
    firstName: 'Aarav',
    lastName: 'Sharma',
    email: 'customer@nexserve.com',
    phone: '+91 98765 43210',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    role: 'CUSTOMER',
    isEmailVerified: true,
  },
  {
    id: 'user_vend_1',
    firstName: 'Priya',
    lastName: 'Kapoor',
    email: 'vendor@nexserve.com',
    phone: '+91 91234 56789',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    role: 'VENDOR_OWNER',
    isEmailVerified: true,
  },
  {
    id: 'user_admin_1',
    firstName: 'Vikram',
    lastName: 'Aditya',
    email: 'admin@nexserve.com',
    phone: '+91 99999 88888',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    role: 'SUPER_ADMIN',
    isEmailVerified: true,
  },
];

export const MOCK_VENDORS: Vendor[] = [
  {
    id: 'vendor_1',
    userId: 'user_vend_1',
    businessName: 'Glow & Grace Luxury Doorstep Salon',
    description: 'Certified premium doorstep beauty services using single-use sealed mono-dose sachets.',
    phone: '+91 91234 56789',
    address: 'Indiranagar 10th Main',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    status: 'APPROVED',
    averageRating: 4.9,
    totalReviews: 128,
    profileImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80',
    createdAt: '2026-01-15T00:00:00Z',
  },
  {
    id: 'vendor_2',
    userId: 'user_vend_2',
    businessName: 'Velvet Touch Home Spa Studio',
    description: 'Specialist in organic scalp spas, HD party makeup, and Ayurvedic facial cleanups.',
    phone: '+91 98888 77777',
    address: 'Koramangala 4th Block',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    status: 'APPROVED',
    averageRating: 4.8,
    totalReviews: 94,
    profileImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80',
    createdAt: '2026-02-10T00:00:00Z',
  },
];

export const MOCK_SERVICES: Service[] = [
  {
    id: 'service_1',
    vendorId: 'vendor_1',
    title: 'Diamond Hydra-Glow Facial Cleanup',
    description: 'Deep pore cleansing, exfoliation, diamond microdermabrasion and soothing collagen mask.',
    category: 'FACIAL',
    price: 1499,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
    isActive: true,
    vendor: MOCK_VENDORS[0],
  },
  {
    id: 'service_2',
    vendorId: 'vendor_1',
    title: 'Keratin Hair Spa & Moisture Lock',
    description: 'Intensive hair repair spa treatment with steam and deep conditioning mask.',
    category: 'HAIR_SPA',
    price: 2499,
    duration: 75,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    isActive: true,
    vendor: MOCK_VENDORS[0],
  },
  {
    id: 'service_3',
    vendorId: 'vendor_2',
    title: 'Trending Layered Haircut & Blowdry',
    description: 'Personalized haircut consultation, wash, layer precision cut and professional blowdry.',
    category: 'HAIR_CUT',
    price: 999,
    duration: 45,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80',
    isActive: true,
    vendor: MOCK_VENDORS[1],
  },
  {
    id: 'service_4',
    vendorId: 'vendor_1',
    title: 'Royal HD Party Makeup Package',
    description: 'Waterproof long-stay HD glam makeup, eyelash extensions and hair styling.',
    category: 'PARTY_MAKEUP',
    price: 3499,
    duration: 90,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
    isActive: true,
    vendor: MOCK_VENDORS[0],
  },
];

export const MOCK_CATEGORIES = [
  { id: 'c1', title: 'Facial Cleanup', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=300&q=80' },
  { id: 'c2', title: 'Hair Spa', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=300&q=80' },
  { id: 'c3', title: 'Hair Cut & Styling', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=300&q=80' },
  { id: 'c4', title: 'Party Makeup', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80' },
  { id: 'c5', title: 'Waxing & Threading', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=300&q=80' },
  { id: 'c6', title: 'Pedicure & Manicure', image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=300&q=80' },
];

export const MOCK_BOOKINGS: Booking[] = [];
export const MOCK_REVIEWS: Review[] = [];
export const MOCK_NOTIFICATIONS: Notification[] = [];

export const MOCK_ADMIN_STATS: AdminDashboardStats = {
  totalUsers: 4850,
  totalVendors: 128,
  pendingVendorsCount: 4,
  totalBookings: 86,
  totalRevenue: 12400000,
  recentBookings: [],
  revenueByMonth: [],
  categoryDistribution: [],
};

export const MOCK_AVAILABILITY: Availability[] = [
  { id: 'av_1', vendorId: 'vendor_1', dayOfWeek: 1, startTime: '09:00', endTime: '19:00', isAvailable: true },
  { id: 'av_2', vendorId: 'vendor_1', dayOfWeek: 2, startTime: '09:00', endTime: '19:00', isAvailable: true },
];

export const MOCK_CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  b_90812: [
    {
      id: 'm1',
      bookingId: 'b_90812',
      senderId: 'user_vend_1',
      content: 'Hello Arvind! I am on my way to your doorstep. ETA 12 mins.',
      createdAt: '10:02 AM',
    },
  ],
};

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'inv_1',
    bookingId: 'b_90812',
    invoiceNumber: 'INV-2026-0891',
    issueDate: '2026-07-27',
    dueDate: '2026-07-27',
    subtotal: 1270.34,
    tax: 228.66,
    total: 1499.00,
    status: 'PAID',
  },
];

export const MOCK_LOCATION: ProfessionalLocation = {
  id: 'loc_1',
  vendorId: 'vendor_1',
  latitude: 12.93524,
  longitude: 77.62451,
  status: 'ONLINE',
  lastUpdated: new Date().toISOString(),
};
