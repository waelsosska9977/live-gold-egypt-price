import React, { useState, useEffect } from 'react';
import { useGoldPrice } from '../hooks/useGoldPrice';
import { Calculator as CalcIcon, ChevronDown } from 'lucide-react';

export const GoldCalculator: React.FC = () => {
  const gold = useGoldPrice();
  const [weight, setWeight] = useState<number>(1);
  const [karat, setKarat] = useState<'24' | '21' | '18'>('21');
  const [makingCharge, setMakingCharge] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const pricePerGram = karat === '24' ? gold.k24 : karat === '21' ? gold.k21 : gold.k18;
    const basePrice = weight * pricePerGram;
    const totalMaking = weight * makingCharge;
    setTotal(basePrice + totalMaking);
  }, [weight, karat, gold, makingCharge]);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 gold-gradient rounded-xl flex items-center justify-center">
          <CalcIcon className="text-zinc-950 w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">آلة حاسبة الذهب</h2>
          <p className="text-zinc-500 text-sm">Gold Calculator - Live Rates</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-zinc-400 text-sm font-medium mb-2">
            الوزن بالجرام <span className="text-zinc-600 text-xs">(Weight in Grams)</span>
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-all"
            placeholder="أدخل الوزن..."
          />
        </div>

        <div>
          <label className="block text-zinc-400 text-sm font-medium mb-2">
            عيار الذهب <span className="text-zinc-600 text-xs">(Gold Karat)</span>
          </label>
          <div className="relative">
            <select
              value={karat}
              onChange={(e) => setKarat(e.target.value as any)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 appearance-none focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-all"
            >
              <option value="24">عيار 24 (24K)</option>
              <option value="21">عيار 21 (21K)</option>
              <option value="18">عيار 18 (18K)</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-zinc-400 text-sm font-medium mb-2">
            المصنعية للجرام <span className="text-zinc-600 text-xs">(Making Charge / Gram)</span>
          </label>
          <input
            type="number"
            value={makingCharge}
            onChange={(e) => setMakingCharge(Number(e.target.value))}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-all"
            placeholder="أدخل المصنعية..."
          />
        </div>

        <div className="pt-6 border-t border-zinc-800">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-zinc-500 text-sm mb-1">إجمالي السعر التقديري (Total Price)</p>
              <p className="text-4xl font-bold gold-text-gradient">
                {total.toLocaleString('en-EG', { maximumFractionDigits: 2 })}
                <span className="text-lg font-normal text-zinc-500 ml-2">جنيه</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
