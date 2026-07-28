import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Country, City, PaymentGatewayConfig } from '@/types';
import { countryApi, MOCK_COUNTRIES } from '@/api/country.api';
import { useToast } from '@/context/ToastContext';

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
  const { showToast } = useToast();
  const [countries, setCountries] = useState<Country[]>(MOCK_COUNTRIES);
  const [selectedCountry, setSelectedCountry] = useState<Country>(() => {
    const savedCode = localStorage.getItem('nexserve_country_code');
    const matched = MOCK_COUNTRIES.find((c) => c.code === savedCode);
    return matched || MOCK_COUNTRIES[0]; // Default India (IN)
  });
  const [availableCities, setAvailableCities] = useState<City[]>([]);
  const [paymentGateways, setPaymentGateways] = useState<PaymentGatewayConfig[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    countryApi.getCountries().then((data) => {
      setCountries(data);
    });
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;
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

  const selectCountry = (countryCode: string) => {
    const matched = countries.find((c) => c.code === countryCode);
    if (matched) {
      setSelectedCountry(matched);
      localStorage.setItem('nexserve_country_code', countryCode);
      showToast(
        `Region Switch: ${matched.name} ${matched.flag}`,
        `Currency updated to ${matched.currency} (${matched.currencySymbol}) with ${matched.taxName} (${matched.taxRate}%).`,
        'success'
      );
    }
  };

  const formatPrice = (amount: number): string => {
    const symbol = selectedCountry?.currencySymbol || '₹';
    if (selectedCountry?.code === 'NP') {
      return `रु ${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount)}`;
    }
    return `${symbol}${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount)}`;
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
