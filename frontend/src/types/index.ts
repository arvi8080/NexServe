export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'CUSTOMER' | 'VENDOR_OWNER' | 'PROFESSIONAL';

export type VendorStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type BranchType = 'COMPANY_OWNED' | 'FRANCHISE' | 'CORPORATE';

export type VerificationStatus = 'PENDING' | 'UNDER_REVIEW' | 'VERIFIED' | 'REJECTED' | 'SUSPENDED' | 'EXPIRED';

export type VerificationBadge =
  | 'VERIFIED_IDENTITY'
  | 'VERIFIED_PROFESSIONAL'
  | 'TOP_RATED'
  | 'FAST_RESPONSE'
  | 'RECOMMENDED'
  | 'ELITE_PARTNER'
  | 'PREMIUM_VENDOR';

export type BeautyCategory =
  | 'FACIAL'
  | 'HAIR_CUT'
  | 'HAIR_SPA'
  | 'HAIR_COLOR'
  | 'WAXING'
  | 'THREADING'
  | 'MANICURE'
  | 'PEDICURE'
  | 'PARTY_MAKEUP'
  | 'BRIDAL_MAKEUP';

export type BookingStatus = 'PENDING' | 'ACCEPTED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';

export type AvailabilityStatus = 'OFFLINE' | 'ONLINE' | 'BUSY';

export type NotificationType = 'INFO' | 'WARNING' | 'SUCCESS' | 'ERROR' | 'BOOKING' | 'REVIEW';

export type NotificationCategory =
  | 'BOOKING'
  | 'PAYMENT'
  | 'WALLET'
  | 'PROMOTION'
  | 'SECURITY'
  | 'SYSTEM'
  | 'REVIEW'
  | 'CHAT'
  | 'ADMIN';

export type NotificationPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';

export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';

export interface Country {
  id: string;
  name: string;
  code: string; // IN, NP, BD, LK, AE, SG, MY
  currency: string; // INR, NPR
  currencySymbol: string; // ₹, रु
  phoneCode: string; // +91, +977
  timezone: string; // Asia/Kolkata, Asia/Kathmandu
  defaultLanguage: string;
  flag: string; // 🇮🇳, 🇳🇵
  taxName: string; // GST, VAT
  taxRate: number; // 18.0, 13.0
  active: boolean;
}

export interface State {
  id: string;
  countryId: string;
  name: string;
  code: string;
}

export interface City {
  id: string;
  stateId: string;
  countryId: string;
  name: string;
  latitude: number;
  longitude: number;
  active: boolean;
}

export interface Branch {
  id: string;
  countryId: string;
  stateId: string;
  cityId: string;
  franchiseId?: string;
  branchName: string;
  branchType: BranchType;
  managerName: string;
  email: string;
  phone: string;
  active: boolean;
  country?: Country;
  state?: State;
  city?: City;
  franchise?: FranchisePartner;
  createdAt?: string;
}

export interface FranchisePartner {
  id: string;
  companyName: string;
  ownerName: string;
  email: string;
  phone: string;
  agreementStart: string;
  agreementEnd: string;
  commissionPercentage: number;
  status: 'ACTIVE' | 'SUSPENDED' | 'EXPIRED';
  branches?: Branch[];
  createdAt?: string;
}

export interface VendorVerification {
  id: string;
  vendorId: string;
  govtIdType: string;
  govtIdNumberEncrypted: string;
  policeVerificationDoc?: string;
  skillCertificateDoc?: string;
  bankAccountHolder: string;
  bankAccountNumberEncrypted: string;
  bankIfscOrBranchCode: string;
  bankPayoutPreference: string;
  trustScore: number; // 0 - 100
  status: VerificationStatus;
  verificationBadges: VerificationBadge[];
  reviewedBy?: string;
  rejectionReason?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaymentGatewayConfig {
  id: string;
  countryId: string;
  gatewayName: string; // RAZORPAY, PHONEPE, ESEWA, KHALTI, FONEPAY, CASH
  isDefault: boolean;
  active: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  profileImage?: string;
  role: Role;
  countryId?: string;
  stateId?: string;
  cityId?: string;
  preferredCurrency?: string;
  preferredLanguage?: string;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  createdAt?: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
  accessToken?: string;
  expiresIn?: number;
}

export interface CustomerAddress {
  id: string;
  userId: string;
  label: 'Home' | 'Office' | 'Other';
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  isDefault: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface VendorCoverage {
  id: string;
  vendorId: string;
  city: string;
  serviceRadius: number; // in KM
  latitude: number;
  longitude: number;
  availableCities: string[];
  travelCharges: number;
  maxDistance: number;
}

export interface Vendor {
  id: string;
  userId: string;
  countryId?: string;
  stateId?: string;
  cityId?: string;
  branchId?: string;
  businessName: string;
  description?: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  profileImage?: string;
  status: VendorStatus;
  averageRating: number;
  totalReviews: number;
  isVerified?: boolean;
  user?: User;
  services?: Service[];
  coverage?: VendorCoverage;
  branch?: Branch;
  verification?: VendorVerification;
  createdAt?: string;
}

// Master Global Service (WHAT is offered - Global Catalog Definition)
export interface Service {
  id: string;
  vendorId?: string;
  categoryId?: string;
  title: string;
  description: string;
  category: BeautyCategory;
  price: number; // Suggested base price
  duration: number; // in minutes
  image?: string;
  isActive: boolean;
  vendor?: Vendor;
  createdAt?: string;
}

// VendorService Offering (WHO offers it and under WHAT conditions)
export interface VendorService {
  id: string;
  vendorId: string;
  serviceId: string;
  price: number;
  discountPrice?: number;
  discountPercentage?: number;
  duration: number; // in minutes
  experienceYears: number;
  available: boolean;
  instantBooking: boolean;
  homeService: boolean;
  serviceRadius: number; // in km
  maxBookingsPerDay: number;
  status: 'ACTIVE' | 'INACTIVE';
  vendor?: Vendor;
  service?: Service;
  images?: VendorServiceImage[];
  createdAt?: string;
  updatedAt?: string;
}

export interface VendorServiceImage {
  id: string;
  vendorServiceId: string;
  imageUrl: string;
  isPrimary: boolean;
}

export interface Invoice {
  id: string;
  bookingId: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  subtotal: number;
  tax: number;
  total: number;
  status: 'PAID' | 'UNPAID' | 'OVERDUE';
  details?: string;
  booking?: Booking;
}

export interface Booking {
  id: string;
  customerId: string;
  vendorId: string;
  serviceId: string;
  branchId?: string;
  franchiseId?: string;
  bookingDate: string;
  address: string;
  latitude?: number;
  longitude?: number;
  distanceKm?: number;
  travelCost?: number;
  notes?: string;
  totalAmount: number;
  currency?: string;
  status: BookingStatus;
  customer?: User;
  vendor?: Vendor;
  service?: Service;
  branch?: Branch;
  franchise?: FranchisePartner;
  review?: Review;
  payment?: Payment;
  invoice?: Invoice;
  createdAt?: string;
}

export interface Review {
  id: string;
  bookingId: string;
  customerId: string;
  vendorId: string;
  rating: number;
  comment?: string;
  customer?: User;
  vendor?: Vendor;
  createdAt?: string;
}

export interface ProfessionalLocation {
  id: string;
  vendorId: string;
  latitude: number;
  longitude: number;
  status: AvailabilityStatus;
  lastUpdated: string;
}

export interface Availability {
  id: string;
  vendorId: string;
  dayOfWeek: number; // 0-6 (Sun-Sat)
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  isAvailable: boolean;
}

export interface Payment {
  id: string;
  bookingId: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  amount: number;
  currency?: string;
  status: PaymentStatus;
  createdAt?: string;
}

export interface ChatMessage {
  id: string;
  bookingId: string;
  senderId: string;
  content: string;
  sender?: User;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  category?: NotificationCategory;
  priority?: NotificationPriority;
  isRead: boolean;
  actionUrl?: string;
  icon?: string;
  createdAt: string;
  expiresAt?: string;
}

export interface AdminDashboardStats {
  totalUsers: number;
  totalVendors: number;
  totalBookings: number;
  totalRevenue: number;
  pendingVendorsCount: number;
  recentBookings: Booking[];
  revenueByMonth: { month: string; amount: number }[];
  categoryDistribution: { category: string; count: number }[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}
