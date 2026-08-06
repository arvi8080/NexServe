import { axiosInstance } from './axiosInstance';
import { Country, State, City, PaymentGatewayConfig } from '@/types';

export const MOCK_COUNTRIES: Country[] = [
  {
    id: 'cnt_np',
    name: 'Nepal',
    code: 'NP',
    currency: 'NPR',
    currencySymbol: 'रु',
    phoneCode: '+977',
    timezone: 'Asia/Kathmandu',
    defaultLanguage: 'ne',
    flag: '🇳🇵',
    taxName: 'VAT',
    taxRate: 13.0,
    active: true,
  },
];

export const MOCK_STATES: State[] = [
  { id: 'st_np_ba', countryId: 'cnt_np', name: 'Bagmati Province', code: 'P3' },
  { id: 'st_np_ga', countryId: 'cnt_np', name: 'Gandaki Province', code: 'P4' },
  { id: 'st_np_ko', countryId: 'cnt_np', name: 'Koshi Province', code: 'P1' },
  { id: 'st_np_lu', countryId: 'cnt_np', name: 'Lumbini Province', code: 'P5' },
];

export const MOCK_CITIES: City[] = [
  { id: 'city_ktm', stateId: 'st_np_ba', countryId: 'cnt_np', name: 'Kathmandu', latitude: 27.7172, longitude: 85.324, active: true },
  { id: 'city_pkh', stateId: 'st_np_ga', countryId: 'cnt_np', name: 'Pokhara', latitude: 28.2096, longitude: 83.9856, active: true },
  { id: 'city_ltp', stateId: 'st_np_ba', countryId: 'cnt_np', name: 'Lalitpur (Patan)', latitude: 27.6644, longitude: 85.3188, active: true },
  { id: 'city_bkp', stateId: 'st_np_ba', countryId: 'cnt_np', name: 'Bhaktapur', latitude: 27.671, longitude: 85.4298, active: true },
  { id: 'city_brt', stateId: 'st_np_ko', countryId: 'cnt_np', name: 'Biratnagar', latitude: 26.4525, longitude: 87.2718, active: true },
  { id: 'city_btw', stateId: 'st_np_lu', countryId: 'cnt_np', name: 'Butwal', latitude: 27.7006, longitude: 83.4484, active: true },
];

export const MOCK_GATEWAYS: PaymentGatewayConfig[] = [
  { id: 'gw_esewa', countryId: 'cnt_np', gatewayName: 'ESEWA', isDefault: true, active: true },
  { id: 'gw_khalti', countryId: 'cnt_np', gatewayName: 'KHALTI', isDefault: false, active: true },
  { id: 'gw_fonepay', countryId: 'cnt_np', gatewayName: 'FONEPAY', isDefault: false, active: true },
  { id: 'gw_imepay', countryId: 'cnt_np', gatewayName: 'IME PAY', isDefault: false, active: true },
  { id: 'gw_connectips', countryId: 'cnt_np', gatewayName: 'CONNECTIPS', isDefault: false, active: true },
  { id: 'gw_cash_np', countryId: 'cnt_np', gatewayName: 'CASH', isDefault: false, active: true },
];

export const countryApi = {
  getCountries: async (): Promise<Country[]> => {
    try {
      const response = await axiosInstance.get('/countries');
      return response.data?.data ?? response.data;
    } catch {
      return MOCK_COUNTRIES;
    }
  },

  getStatesByCountry: async (countryId: string): Promise<State[]> => {
    try {
      const response = await axiosInstance.get(`/states?countryId=${countryId}`);
      return response.data?.data ?? response.data;
    } catch {
      return MOCK_STATES.filter((s) => s.countryId === countryId);
    }
  },

  getCitiesByCountry: async (countryId: string): Promise<City[]> => {
    try {
      const response = await axiosInstance.get(`/cities?countryId=${countryId}`);
      return response.data?.data ?? response.data;
    } catch {
      return MOCK_CITIES.filter((c) => c.countryId === countryId);
    }
  },

  getPaymentGatewaysByCountry: async (countryId: string): Promise<PaymentGatewayConfig[]> => {
    try {
      const response = await axiosInstance.get(`/payment-gateways?countryId=${countryId}`);
      return response.data?.data ?? response.data;
    } catch {
      return MOCK_GATEWAYS.filter((g) => g.countryId === countryId);
    }
  },
};
