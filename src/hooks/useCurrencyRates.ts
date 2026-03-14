import { useState, useEffect } from 'react';

export interface BankRate {
  name: string;
  buy: number;
  sell: number;
}

export interface CurrencyData {
  rate: number;
  banks: BankRate[];
  lastUpdate: Date;
  loading: boolean;
  error: string | null;
}

export function useCurrencyRates() {
  const [data, setData] = useState<CurrencyData>({
    rate: 0,
    banks: [],
    lastUpdate: new Date(),
    loading: true,
    error: null,
  });

  const fetchRates = async () => {
    try {
      console.log('Fetching currency rates...');
      const response = await fetch('https://open.er-api.com/v6/latest/USD');
      if (!response.ok) throw new Error(`Currency API error: ${response.status}`);
      const json = await response.json();
      
      if (!json.rates || !json.rates.EGP) {
        throw new Error('Invalid currency data format');
      }

      const rate = json.rates.EGP;
      console.log('Currency rate fetched:', rate);
      
      // Simulating bank-specific rates based on the official rate
      // In a real production app, you'd fetch these from a dedicated bank rates API
      const banks: BankRate[] = [
        {
          name: 'Central Bank of Egypt',
          buy: rate - 0.05,
          sell: rate + 0.05
        },
        {
          name: 'National Bank of Egypt (NBE)',
          buy: rate - 0.12,
          sell: rate + 0.08
        },
        {
          name: 'Banque Misr',
          buy: rate - 0.12,
          sell: rate + 0.08
        },
        {
          name: 'CIB',
          buy: rate - 0.10,
          sell: rate + 0.10
        }
      ];

      setData({
        rate,
        banks,
        lastUpdate: new Date(),
        loading: false,
        error: null,
      });
    } catch (err) {
      console.error('Currency fetch error:', err);
      setData(prev => ({ 
        ...prev, 
        loading: false, 
        error: err instanceof Error ? err.message : 'Error fetching currency rates' 
      }));
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 60000);
    return () => clearInterval(interval);
  }, []);

  return data;
}
