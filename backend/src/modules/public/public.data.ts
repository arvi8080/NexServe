/**
 * Static platform data served to unauthenticated visitors.
 * Used by the public module for country selection, city lookup,
 * payment gateway configuration, and the landing page content.
 */

export interface Country {
  id: string;
  name: string;
  code: string;
  currency: string;
  currencySymbol: string;
  phoneCode: string;
  timezone: string;
  defaultLanguage: string;
  flag: string;
  taxName: string;
  taxRate: number;
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

export interface PaymentGatewayConfig {
  id: string;
  countryId: string;
  gatewayName: string;
  isDefault: boolean;
  active: boolean;
}

export const COUNTRIES: Country[] = [
  {
    id: "cnt_in",
    name: "India",
    code: "IN",
    currency: "INR",
    currencySymbol: "₹",
    phoneCode: "+91",
    timezone: "Asia/Kolkata",
    defaultLanguage: "en",
    flag: "🇮🇳",
    taxName: "GST",
    taxRate: 18.0,
    active: true,
  },
  {
    id: "cnt_np",
    name: "Nepal",
    code: "NP",
    currency: "NPR",
    currencySymbol: "रु",
    phoneCode: "+977",
    timezone: "Asia/Kathmandu",
    defaultLanguage: "ne",
    flag: "🇳🇵",
    taxName: "VAT",
    taxRate: 13.0,
    active: true,
  },
];

export const STATES: State[] = [
  { id: "st_in_ka", countryId: "cnt_in", name: "Karnataka", code: "KA" },
  { id: "st_in_mh", countryId: "cnt_in", name: "Maharashtra", code: "MH" },
  { id: "st_in_dl", countryId: "cnt_in", name: "Delhi NCR", code: "DL" },
  { id: "st_np_ba", countryId: "cnt_np", name: "Bagmati Province", code: "P3" },
  { id: "st_np_ga", countryId: "cnt_np", name: "Gandaki Province", code: "P4" },
];

export const CITIES: City[] = [
  // India Cities
  { id: "city_blr", stateId: "st_in_ka", countryId: "cnt_in", name: "Bengaluru", latitude: 12.9716, longitude: 77.5946, active: true },
  { id: "city_mum", stateId: "st_in_mh", countryId: "cnt_in", name: "Mumbai", latitude: 19.076, longitude: 72.8777, active: true },
  { id: "city_del", stateId: "st_in_dl", countryId: "cnt_in", name: "New Delhi", latitude: 28.6139, longitude: 77.209, active: true },
  // Nepal Cities
  { id: "city_ktm", stateId: "st_np_ba", countryId: "cnt_np", name: "Kathmandu", latitude: 27.7172, longitude: 85.324, active: true },
  { id: "city_pkh", stateId: "st_np_ga", countryId: "cnt_np", name: "Pokhara", latitude: 28.2096, longitude: 83.9856, active: true },
  { id: "city_ltp", stateId: "st_np_ba", countryId: "cnt_np", name: "Lalitpur (Patan)", latitude: 27.6644, longitude: 85.3188, active: true },
];

export const PAYMENT_GATEWAYS: PaymentGatewayConfig[] = [
  // India Gateways
  { id: "gw_rzp", countryId: "cnt_in", gatewayName: "RAZORPAY", isDefault: true, active: true },
  { id: "gw_pe", countryId: "cnt_in", gatewayName: "PHONEPE", isDefault: false, active: true },
  { id: "gw_upi", countryId: "cnt_in", gatewayName: "UPI", isDefault: false, active: true },
  { id: "gw_cash_in", countryId: "cnt_in", gatewayName: "CASH", isDefault: false, active: true },
  // Nepal Gateways
  { id: "gw_esewa", countryId: "cnt_np", gatewayName: "ESEWA", isDefault: true, active: true },
  { id: "gw_khalti", countryId: "cnt_np", gatewayName: "KHALTI", isDefault: false, active: true },
  { id: "gw_fonepay", countryId: "cnt_np", gatewayName: "FONEPAY", isDefault: false, active: true },
  { id: "gw_cash_np", countryId: "cnt_np", gatewayName: "CASH", isDefault: false, active: true },
];

export interface HomeData {
  heroBanner: {
    title: string;
    subtitle: string;
    ctaText: string;
    backgroundImage: string;
  };
  categories: Array<{ id: string; title: string; image: string }>;
  featuredServices: Array<{ id: string; title: string; description: string; category: string; price: number; image?: string }>;
  popularServices: Array<{ id: string; title: string; description: string; category: string; price: number; image?: string }>;
  topVendors: Array<{ id: string; businessName: string; city: string; country: string; averageRating: number; totalReviews: number }>;
  customerReviews: Array<{ id: string; name: string; rating: number; comment: string; serviceName: string; image: string; date: string }>;
  statistics: { happyCustomers: string; verifiedBeauticians: string; completedBookings: string; averageRating: string };
  offers: Array<{ id: string; code: string; title: string; description: string; discountPercent: number }>;
  faqs: Array<{ question: string; answer: string }>;
}

export const HOME_DATA: HomeData = {
  heroBanner: {
    title: "Luxury Doorstep Beauty & Spa Sanctuary",
    subtitle:
      "Certified professionals bringing single-use sealed mono-dose salon treatments right to your living room.",
    ctaText: "Explore Treatments",
    backgroundImage:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
  },
  categories: [
    { id: "cat_facial", title: "Facials", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=150&q=80" },
    { id: "cat_haircut", title: "Haircuts", image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=150&q=80" },
    { id: "cat_hairspa", title: "Hair Spa", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=150&q=80" },
    { id: "cat_makeup", title: "Makeup", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=150&q=80" },
    { id: "cat_waxing", title: "Waxing", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=150&q=80" },
    { id: "cat_nails", title: "Nails", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=150&q=80" },
  ],
  featuredServices: [
    { id: "svc_1", title: "Diamond Hydra-Glow Facial", description: "Deep-cleansing diamond exfoliation with hyaluronic glow boost.", category: "FACIAL", price: 1499 },
    { id: "svc_2", title: "Herbal Keratin Hair Spa", description: "Restorative keratin treatment with herbal scalp therapy.", category: "HAIR_SPA", price: 1199 },
    { id: "svc_3", title: "HD Airbrush Party Makeup", description: "Flawless high-definition airbrush finish for any occasion.", category: "PARTY_MAKEUP", price: 2499 },
    { id: "svc_4", title: "Swiss De-Stress Massage", description: "Full-body Swiss massage with aromatherapy oils.", category: "SPA", price: 1899 },
  ],
  popularServices: [
    { id: "svc_5", title: "Signature Bridal Makeup", description: "Complete bridal look with premium international products.", category: "BRIDAL_MAKEUP", price: 9999 },
    { id: "svc_6", title: "Gold Radiance Facial", description: "24K gold-infused facial for instant luminosity.", category: "FACIAL", price: 2999 },
    { id: "svc_7", title: "Brazilian Hair Removal", description: "Gentle yet thorough waxing with pre-post care.", category: "WAXING", price: 899 },
    { id: "svc_8", title: "Gel Manicure & Pedicure", description: "Long-lasting gel polish for hands and feet.", category: "NAILS", price: 999 },
  ],
  topVendors: [
    { id: "vendor_1", businessName: "Priya Kapoor Beauty Studio", city: "Bengaluru", country: "India", averageRating: 4.9, totalReviews: 234 },
    { id: "vendor_2", businessName: "Glow Rituals by Nisha", city: "Mumbai", country: "India", averageRating: 4.8, totalReviews: 189 },
    { id: "vendor_3", businessName: "Himalayan Serenity Spa", city: "Kathmandu", country: "Nepal", averageRating: 4.9, totalReviews: 156 },
  ],
  customerReviews: [
    {
      id: "rev_1",
      name: "Ananya Rao",
      rating: 5,
      comment:
        "The Diamond Hydra-Facial beautician was extremely professional. Single-use sachet opened live in front of me!",
      serviceName: "Diamond Hydra-Glow Facial",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      date: "July 24, 2026",
    },
    {
      id: "rev_2",
      name: "Sneha Verma",
      rating: 5,
      comment: "Hair Spa session at home saved so much travel time. Complete floor cleanup done afterwards!",
      serviceName: "Herbal Keratin Hair Spa",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
      date: "July 22, 2026",
    },
  ],
  statistics: {
    happyCustomers: "50,000+",
    verifiedBeauticians: "1,200+",
    completedBookings: "150,000+",
    averageRating: "4.9★",
  },
  offers: [
    {
      id: "off_1",
      code: "LUXURY25",
      title: "25% OFF Festival Radiance",
      description: "Valid on all certified hydra-facial & hair spa packages.",
      discountPercent: 25,
    },
  ],
  faqs: [
    {
      question: "How do you guarantee 100% hygiene at home?",
      answer:
        "Every beautician carries a sealed mono-dose single-use kit containing sanitized tools, bedsheets, and sachets opened exclusively in front of you.",
    },
    {
      question: "What if I need to cancel or reschedule?",
      answer:
        "Free cancellation or rescheduling is available up to 2 hours before your scheduled appointment time.",
    },
  ],
};

