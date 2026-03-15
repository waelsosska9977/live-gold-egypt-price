import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useGoldPrice } from '../hooks/useGoldPrice';

type Timeframe = '1D' | '1W' | '1M' | '1Y';

const generateHistoricalData = (timeframe: Timeframe, basePrice: number) => {
  if (!basePrice || basePrice === 0) return [];
  
  const points = [];
  const volatility = basePrice * 0.02; // 2% volatility
  
  switch (timeframe) {
    case '1D':
      const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
      return hours.map((h, i) => ({
        time: h,
        price: Math.round(basePrice - (volatility * (hours.length - 1 - i) / hours.length) + (Math.random() * volatility - volatility/2))
      }));
    case '1W':
      const days = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
      return days.map((d, i) => ({
        time: d,
        price: Math.round(basePrice - (volatility * 2 * (days.length - 1 - i) / days.length) + (Math.random() * volatility * 2 - volatility))
      }));
    case '1M':
      for (let i = 30; i >= 0; i -= 3) {
        points.push({
          time: i === 0 ? 'اليوم' : `${30 - i} مارس`,
          price: Math.round(basePrice - (volatility * 4 * i / 30) + (Math.random() * volatility * 3 - volatility * 1.5))
        });
      }
      return points.reverse();
    case '1Y':
      const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
      return months.map((m, i) => ({
        time: m,
        price: Math.round(basePrice - (volatility * 10 * (months.length - 1 - i) / months.length) + (Math.random() * volatility * 5 - volatility * 2.5))
      }));
    default:
      return [];
  }
};

export const PriceChart: React.FC = () => {
  const gold = useGoldPrice();
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');
  const [karat, setKarat] = useState<'24' | '21' | '18'>('21');
  const [realTimeData, setRealTimeData] = useState<any[]>([]);
  const lastPriceRef = useRef<number>(0);

  const currentKaratPrice = useMemo(() => {
    switch (karat) {
      case '24': return gold.k24;
      case '18': return gold.k18;
      default: return gold.k21;
    }
  }, [gold, karat]);

  // Initialize historical data or reset when karat changes
  useEffect(() => {
    if (currentKaratPrice > 0) {
      setRealTimeData(generateHistoricalData('1D', currentKaratPrice));
    }
  }, [currentKaratPrice, karat]);

  // Handle real-time updates for 1D chart
  useEffect(() => {
    if (timeframe === '1D' && currentKaratPrice > 0 && currentKaratPrice !== lastPriceRef.current) {
      lastPriceRef.current = currentKaratPrice;
      const now = new Date();
      const timeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
      
      setRealTimeData(prev => {
        const newData = [...prev, { time: timeStr, price: Math.round(currentKaratPrice) }];
        // Keep last 20 points for real-time feel
        if (newData.length > 20) return newData.slice(newData.length - 20);
        return newData;
      });
    }
  }, [currentKaratPrice, timeframe]);

  const chartData = useMemo(() => {
    if (timeframe === '1D' && realTimeData.length > 0) {
      return realTimeData;
    }
    const basePrice = currentKaratPrice > 0 ? currentKaratPrice : 3600;
    return generateHistoricalData(timeframe, basePrice);
  }, [timeframe, currentKaratPrice, realTimeData]);

  const timeframes: Timeframe[] = ['1D', '1W', '1M', '1Y'];
  const karats = ['24', '21', '18'] as const;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-[450px] flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex flex-col">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <h3 className="text-zinc-100 font-semibold">اتجاه سعر الذهب (عيار {karat})</h3>
            <div className="flex items-center">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
              </span>
              <span className="text-[10px] text-gold-500 font-bold uppercase tracking-wider">مباشر</span>
            </div>
          </div>
          {!gold.loading && currentKaratPrice > 0 && (
            <span className="text-gold-400 text-xs font-mono">السعر الحالي: {Math.round(currentKaratPrice).toLocaleString()} ج.م</span>
          )}
        </div>
        
        <div className="flex flex-wrap gap-3">
          {/* Karat Selector */}
          <div className="flex bg-zinc-800 p-1 rounded-lg">
            {karats.map((k) => (
              <button
                key={k}
                onClick={() => {
                  setKarat(k);
                  setRealTimeData([]); // Reset real-time data to re-initialize with new karat
                }}
                className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${
                  karat === k
                    ? 'bg-gold-400 text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                عيار {k}
              </button>
            ))}
          </div>

          {/* Timeframe Selector */}
          <div className="flex bg-zinc-800 p-1 rounded-lg">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${
                  timeframe === tf
                    ? 'bg-zinc-600 text-zinc-100 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex-1 min-h-0">
        {gold.loading && currentKaratPrice === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-400"></div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="#71717a" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                reversed={timeframe !== '1D'}
              />
              <YAxis 
                stroke="#71717a" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => `${value}`}
                orientation="right"
                domain={['auto', 'auto']}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', textAlign: 'right' }}
                itemStyle={{ color: '#eab308' }}
                labelStyle={{ color: '#71717a', marginBottom: '4px' }}
                formatter={(value: number) => [`${value.toLocaleString()} ج.م`, 'السعر']}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#eab308"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPrice)"
                animationDuration={300}
                isAnimationActive={timeframe !== '1D'}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
