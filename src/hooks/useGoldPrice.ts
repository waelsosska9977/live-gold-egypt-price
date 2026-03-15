import { useState, useEffect, useRef } from 'react';
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

  const wsRef = useRef<WebSocket | null>(null);

  const calculatePrices = (ouncePrice: number, rate: number) => {
    const gramPriceUSD = ouncePrice / 31.1035;
    const gramPriceEGP = gramPriceUSD * rate;

    return {
      k24: gramPriceEGP,
      k21: gramPriceEGP * 0.875,
      k18: gramPriceEGP * 0.75,
      goldPound: (gramPriceEGP * 0.875) * 8,
      ounceUSD: ouncePrice,
      gramUSD: gramPriceUSD,
      lastUpdate: new Date(),
      loading: false,
      error: null,
    };
  };

  const fetchGold = async () => {
    if (currency.loading) return;
    if (currency.error || currency.rate === 0) return;

    try {
      let ouncePrice = 0;
      
      try {
        const response = await fetch('https://api.metals.live/v1/spot/gold');
        if (!response.ok) throw new Error(`Primary Gold API error: ${response.status}`);
        const json = await response.json();
        if (Array.isArray(json) && json.length > 0 && json[0].price) {
          ouncePrice = json[0].price;
        } else if (json.price) {
          ouncePrice = json.price;
        } else {
          throw new Error('Invalid primary gold data format');
        }
      } catch (primaryErr) {
        const response = await fetch('https://api.gold-api.com/price/XAU');
        if (!response.ok) throw new Error(`Fallback Gold API error: ${response.status}`);
        const json = await response.json();
        if (json.price) {
          ouncePrice = json.price;
        } else {
          throw new Error('Invalid fallback gold data format');
        }
      }
      
      setData(calculatePrices(ouncePrice, currency.rate));
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
    const interval = setInterval(fetchGold, 300000); // Poll every 5 mins as fallback
    return () => clearInterval(interval);
  }, [currency.rate, currency.loading]);

  // WebSocket for Real-time updates
  useEffect(() => {
    if (currency.loading || currency.rate === 0) return;

    const connectWS = () => {
      // PAXG is a gold-backed token that tracks spot gold price very closely
      const ws = new WebSocket('wss://stream.binance.com:9443/ws/paxgusdt@ticker');
      wsRef.current = ws;

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        // 'c' is the current price in Binance ticker stream
        const currentOuncePrice = parseFloat(message.c);
        if (!isNaN(currentOuncePrice)) {
          setData(prev => ({
            ...prev,
            ...calculatePrices(currentOuncePrice, currency.rate),
            loading: false
          }));
        }
      };

      ws.onerror = (error) => {
        console.warn('Gold WebSocket error:', error);
      };

      ws.onclose = () => {
        console.log('Gold WebSocket closed, reconnecting in 5s...');
        setTimeout(connectWS, 5000);
      };
    };

    connectWS();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [currency.rate, currency.loading]);

  return { ...data, loading: data.loading || currency.loading };
}
