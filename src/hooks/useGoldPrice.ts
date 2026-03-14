import { useState, useEffect } from 'react';
import { useCurrencyRates } from './useCurrencyRates';

export interface GoldPrices {
  k24: number;
  k21: number;
  k18: number;
  goldPound: number;
  ounceUSD: number;
  gramUSD: number;
  lastUpdate: Date;
  loading: boolean;
  error: string | null;
}

export function useGoldPrice() {
  const currency = useCurrencyRates();
  const [data, setData] = useState<GoldPrices>({
    k24: 0,
    k21: 0,
    k18: 0,
    goldPound: 0,
    ounceUSD: 0,
    gramUSD: 0,
    lastUpdate: new Date(),
    loading: true,
    error: null,
  });

  const fetchGold = async () => {
    // We need the currency rate to calculate EGP prices
    if (currency.loading) return;
    
    if (currency.error || currency.rate === 0) {
      console.warn('Currency rate not available, skipping gold fetch');
      return;
    }

    try {
      console.log('Fetching gold price...');
      let ouncePrice = 0;
      
      try {
        // Primary API: metals.live
        const response = await fetch('https://api.metals.live/v1/spot/gold');
        if (!response.ok) throw new Error(`Primary Gold API error: ${response.status}`);
        
        const json = await response.json();
        console.log('Primary Gold API response:', json);

        if (Array.isArray(json) && json.length > 0 && json[0].price) {
          ouncePrice = json[0].price;
        } else if (json.price) {
          ouncePrice = json.price;
        } else {
          throw new Error('Invalid primary gold data format');
        }
      } catch (primaryErr) {
        console.warn('Primary Gold API failed, trying fallback...', primaryErr);
        // Fallback API: gold-api.com (XAU is gold)
        const response = await fetch('https://api.gold-api.com/price/XAU');
        if (!response.ok) throw new Error(`Fallback Gold API error: ${response.status}`);
        
        const json = await response.json();
        console.log('Fallback Gold API response:', json);
        
        if (json.price) {
          ouncePrice = json.price;
        } else {
          throw new Error('Invalid fallback gold data format');
        }
      }
      
      const gramPriceUSD = ouncePrice / 31.1035;
      const gramPriceEGP = gramPriceUSD * currency.rate;

      setData({
        k24: gramPriceEGP,
        k21: gramPriceEGP * 0.875,
        k18: gramPriceEGP * 0.75,
        goldPound: (gramPriceEGP * 0.875) * 8,
        ounceUSD: ouncePrice,
        gramUSD: gramPriceUSD,
        lastUpdate: new Date(),
        loading: false,
        error: null,
      });
    } catch (err) {
      console.error('All gold fetch attempts failed:', err);
      setData(prev => ({ 
        ...prev, 
        loading: false, 
        error: err instanceof Error ? err.message : 'Error fetching gold price' 
      }));
    }
  };

  useEffect(() => {
    fetchGold();
    const interval = setInterval(fetchGold, 60000);
    return () => clearInterval(interval);
  }, [currency.rate, currency.loading]);

  return { ...data, loading: data.loading || currency.loading };
}
