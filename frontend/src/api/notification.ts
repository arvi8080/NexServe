import { axiosInstance } from './axiosInstance';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { Notification } from '@/types';

const SEEDED_NOTIFICATIONS: Notification[] = [
  {
    id: 'n_1',
    userId: 'user_cust_1',
    title: 'Booking Confirmed!',
    message: 'Your Diamond Hydra-Glow Facial appointment for tomorrow at 10:00 AM is confirmed.',
    type: 'SUCCESS',
    category: 'BOOKING',
    priority: 'HIGH',
    isRead: false,
    actionUrl: '/customer/bookings/b_90812',
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    id: 'n_2',
    userId: 'user_cust_1',
    title: 'Beautician Assigned',
    message: 'Swati Mohan (4.9★ Certified Pro) has been assigned to your doorstep session.',
    type: 'INFO',
    category: 'BOOKING',
    priority: 'NORMAL',
    isRead: false,
    actionUrl: '/customer/bookings/b_90812',
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
  {
    id: 'n_3',
    userId: 'user_cust_1',
    title: 'Cashback Credit Received',
    message: '₹250 cashback credited to your GlowHome Wallet for your recent review.',
    type: 'SUCCESS',
    category: 'WALLET',
    priority: 'NORMAL',
    isRead: true,
    actionUrl: '/customer/wallet',
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
  },
  {
    id: 'n_4',
    userId: 'user_cust_1',
    title: 'Security Alert',
    message: 'New sign-in detected from Chrome on Windows 11 in Bengaluru.',
    type: 'WARNING',
    category: 'SECURITY',
    priority: 'HIGH',
    isRead: true,
    actionUrl: '/customer/profile',
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
  },
];

const hasAuthToken = (): boolean => {
  try {
    const token = localStorage.getItem('glowhome_access_token') || localStorage.getItem('token');
    return !!token;
  } catch {
    return false;
  }
};

export const notificationApi = {
  getNotifications: async (): Promise<Notification[]> => {
    if (!hasAuthToken()) {
      return SEEDED_NOTIFICATIONS;
    }
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.NOTIFICATION.BASE);
      return response.data?.data ?? response.data;
    } catch {
      return SEEDED_NOTIFICATIONS;
    }
  },

  getUnreadCount: async (): Promise<number> => {
    if (!hasAuthToken()) {
      return 0;
    }
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.NOTIFICATION.BASE + '/unread-count');
      const body = response.data?.data ?? response.data;
      return body?.unread ?? body?.count ?? 0;
    } catch {
      return 0;
    }
  },

  markAllAsRead: async (): Promise<void> => {
    if (!hasAuthToken()) {
      SEEDED_NOTIFICATIONS.forEach((n) => (n.isRead = true));
      return;
    }
    try {
      await axiosInstance.patch(API_ENDPOINTS.NOTIFICATION.READ_ALL);
    } catch {
      SEEDED_NOTIFICATIONS.forEach((n) => (n.isRead = true));
    }
  },

  markAsRead: async (id: string): Promise<Notification> => {
    if (!hasAuthToken()) {
      const notif = SEEDED_NOTIFICATIONS.find((n) => n.id === id);
      if (notif) notif.isRead = true;
      return notif || SEEDED_NOTIFICATIONS[0];
    }
    try {
      const response = await axiosInstance.patch(API_ENDPOINTS.NOTIFICATION.READ_BY_ID(id));
      return response.data?.data ?? response.data;
    } catch {
      const notif = SEEDED_NOTIFICATIONS.find((n) => n.id === id);
      if (notif) notif.isRead = true;
      return notif || SEEDED_NOTIFICATIONS[0];
    }
  },

  deleteNotification: async (id: string): Promise<void> => {
    if (!hasAuthToken()) {
      const idx = SEEDED_NOTIFICATIONS.findIndex((n) => n.id === id);
      if (idx !== -1) SEEDED_NOTIFICATIONS.splice(idx, 1);
      return;
    }
    try {
      await axiosInstance.delete(API_ENDPOINTS.NOTIFICATION.BY_ID(id));
    } catch {
      const idx = SEEDED_NOTIFICATIONS.findIndex((n) => n.id === id);
      if (idx !== -1) SEEDED_NOTIFICATIONS.splice(idx, 1);
    }
  },

  clearAll: async (): Promise<void> => {
    if (!hasAuthToken()) {
      SEEDED_NOTIFICATIONS.length = 0;
      return;
    }
    try {
      await axiosInstance.delete(API_ENDPOINTS.NOTIFICATION.BASE);
    } catch {
      SEEDED_NOTIFICATIONS.length = 0;
    }
  },

  sendAdminAnnouncement: async (data: { title: string; message: string; category?: string }): Promise<boolean> => {
    try {
      await axiosInstance.post(API_ENDPOINTS.NOTIFICATION.BASE + '/send', data);
      return true;
    } catch {
      SEEDED_NOTIFICATIONS.unshift({
        id: `n_${Date.now()}`,
        userId: 'all',
        title: data.title,
        message: data.message,
        type: 'INFO',
        category: (data.category as any) || 'ADMIN',
        priority: 'HIGH',
        isRead: false,
        createdAt: new Date().toISOString(),
      });
      return true;
    }
  },
};
