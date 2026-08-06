import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Country, City, PaymentGatewayConfig } from '@/types';
import { countryApi, MOCK_COUNTRIES } from '@/api/country.api';

interface CountryContextType {
  countries: Country[];
  selectedCountry: Country;
  availableCities: City[];
  paymentGateways: PaymentGatewayConfig[];
  selectCountry: (countryCode: string) => void;
  formatPrice: (amount: number) => string;
  isLoading: boolean;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [countries] = useState<Country[]>(MOCK_COUNTRIES);
  const [selectedCountry] = useState<Country>(MOCK_COUNTRIES[0]); // Statically locked to 🇳🇵 Nepal
  const [availableCities, setAvailableCities] = useState<City[]>([]);
  const [paymentGateways, setPaymentGateways] = useState<PaymentGatewayConfig[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      countryApi.getCitiesByCountry(selectedCountry.id),
      countryApi.getPaymentGatewaysByCountry(selectedCountry.id),
    ])
      .then(([cData, gData]) => {
        setAvailableCities(cData);
        setPaymentGateways(gData);
      })
      .finally(() => setIsLoading(false));
  }, [selectedCountry]);

  // No-op for country switcher since website is locked 100% to Nepal
  const selectCountry = (_countryCode: string) => {};

  const formatPrice = (amount: number): string => {
    return `रु ${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount)}`;
  };

  return (
    <CountryContext.Provider
      value={{
        countries,
        selectedCountry,
        availableCities,
        paymentGateways,
        selectCountry,
        formatPrice,
        isLoading,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = (): CountryContextType => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
};
