export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  SERVICE: {
    BASE: '/service',
    SEARCH: '/service/search',
    MY: '/service/my',
    BY_ID: (id: string) => `/service/${id}`,
  },
  BOOKING: {
    BASE: '/booking',
    MY: '/booking/my',
    VENDOR: '/booking/vendor',
    BY_ID: (id: string) => `/booking/${id}`,
    STATUS: (id: string) => `/booking/${id}/status`,
  },
  PAYMENT: {
    CREATE_ORDER: '/payment/create-order',
    VERIFY: '/payment/verify',
    REFUND: '/payment/refund',
  },
  CHAT: {
    MESSAGES: (bookingId: string) => `/chat/${bookingId}/messages`,
  },
  NOTIFICATION: {
    BASE: '/notification',
    READ_ALL: '/notification/read-all',
    READ_BY_ID: (id: string) => `/notification/${id}/read`,
    BY_ID: (id: string) => `/notification/${id}`,
  },
  REVIEW: {
    VENDOR: (vendorId: string) => `/review/vendor/${vendorId}`,
    BASE: '/review',
  },
  VENDOR: {
    PROFILE: '/vendor/profile',
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    PENDING_VENDORS: '/admin/vendors/pending',
    VENDOR_STATUS: (vendorId: string) => `/admin/vendors/${vendorId}/status`,
  },
  INVOICE: {
    BY_BOOKING: (bookingId: string) => `/invoice/${bookingId}`,
  },
  LOCATION: {
    PATCH: '/location',
    NEARBY: '/location/nearby',
  },
  AVAILABILITY: {
    BASE: '/availability',
  },
};
