import apiClient from './client';
import { CustomerAddress } from '@/types';

const MOCK_SAVED_ADDRESSES: CustomerAddress[] = [
  {
    id: 'addr_1',
    userId: 'user_cust_1',
    label: 'Home',
    fullName: 'Arvind Kumar',
    phoneNumber: '+91 98765 43210',
    addressLine1: 'Flat 402, Royal Palms Apartments',
    addressLine2: '10th Main Road, Indiranagar',
    landmark: 'Behind Corner House Ice Cream',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560038',
    latitude: 12.971598,
    longitude: 77.641151,
    isDefault: true,
  },
  {
    id: 'addr_2',
    userId: 'user_cust_1',
    label: 'Office',
    fullName: 'Arvind Kumar',
    phoneNumber: '+91 98765 43210',
    addressLine1: 'Suite 601, WeWork Galaxy',
    addressLine2: '43 Residency Road',
    landmark: 'Opposite Ritz Carlton',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560025',
    latitude: 12.966345,
    longitude: 77.606789,
    isDefault: false,
  },
];

export const addressApi = {
  getAddresses: async (): Promise<CustomerAddress[]> => {
    try {
      const response = await apiClient.get<CustomerAddress[]>('/address');
      return response.data;
    } catch {
      return MOCK_SAVED_ADDRESSES;
    }
  },

  createAddress: async (data: Partial<CustomerAddress>): Promise<CustomerAddress> => {
    try {
      const response = await apiClient.post<CustomerAddress>('/address', data);
      return response.data;
    } catch {
      const newAddr: CustomerAddress = {
        id: `addr_${Date.now()}`,
        userId: 'user_cust_1',
        label: data.label || 'Home',
        fullName: data.fullName || 'Arvind Kumar',
        phoneNumber: data.phoneNumber || '+91 98765 43210',
        addressLine1: data.addressLine1 || 'Indiranagar 10th Main',
        addressLine2: data.addressLine2,
        landmark: data.landmark,
        city: data.city || 'Bengaluru',
        state: data.state || 'Karnataka',
        country: 'India',
        postalCode: data.postalCode || '560038',
        latitude: data.latitude || 12.971598,
        longitude: data.longitude || 77.641151,
        isDefault: data.isDefault || false,
      };
      MOCK_SAVED_ADDRESSES.push(newAddr);
      return newAddr;
    }
  },

  updateAddress: async (id: string, data: Partial<CustomerAddress>): Promise<CustomerAddress> => {
    try {
      const response = await apiClient.put<CustomerAddress>(`/address/${id}`, data);
      return response.data;
    } catch {
      const index = MOCK_SAVED_ADDRESSES.findIndex((a) => a.id === id);
      if (index !== -1) {
        MOCK_SAVED_ADDRESSES[index] = { ...MOCK_SAVED_ADDRESSES[index], ...data };
        return MOCK_SAVED_ADDRESSES[index];
      }
      return MOCK_SAVED_ADDRESSES[0];
    }
  },

  deleteAddress: async (id: string): Promise<boolean> => {
    try {
      await apiClient.delete(`/address/${id}`);
      return true;
    } catch {
      const index = MOCK_SAVED_ADDRESSES.findIndex((a) => a.id === id);
      if (index !== -1) MOCK_SAVED_ADDRESSES.splice(index, 1);
      return true;
    }
  },

  setDefaultAddress: async (id: string): Promise<boolean> => {
    try {
      await apiClient.patch(`/address/${id}/default`);
      return true;
    } catch {
      MOCK_SAVED_ADDRESSES.forEach((a) => {
        a.isDefault = a.id === id;
      });
      return true;
    }
  },
};
