import React, { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type Timeframe = '1D' | '1W' | '1M' | '1Y';

const generateData = (timeframe: Timeframe) => {
  const basePrice = 3600; // Base price for 21K
  const points = [];
  
  switch (timeframe) {
    case '1D':
      const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
      return hours.map(h => ({
        time: h,
        price: basePrice + Math.floor(Math.random() * 100) - 50
      }));
    case '1W':
      const days = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
      return days.map(d => ({
        time: d,
        price: basePrice + Math.floor(Math.random() * 200) - 100
      }));
    case '1M':
      for (let i = 1; i <= 30; i += 3) {
        points.push({
          time: `${i} مارس`,
          price: basePrice + Math.floor(Math.random() * 300) - 150
        });
      }
      return points;
    case '1Y':
      const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
      return months.map(m => ({
        time: m,
        price: basePrice + Math.floor(Math.random() * 1000) - 400
      }));
    default:
      return [];
  }
};

export const PriceChart: React.FC = () => {
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');
  
  const chartData = useMemo(() => generateData(timeframe), [timeframe]);

  const timeframes: Timeframe[] = ['1D', '1W', '1M', '1Y'];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-zinc-100 font-semibold">اتجاه سعر الذهب (عيار 21)</h3>
        <div className="flex space-x-2 rtl:space-x-reverse">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                timeframe === tf
                  ? 'bg-gold-400 text-zinc-950'
                  : 'bg-zinc-800 text-zinc-400 hover:text-gold-400'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 min-h-0">
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
              reversed={true}
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
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#eab308"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrice)"
              animationDuration={500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
