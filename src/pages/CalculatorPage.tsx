import React from 'react';
import { GoldCalculator } from '../components/GoldCalculator';
import { AdSpace } from '../components/AdSpace';
import { useGoldPrice } from '../hooks/useGoldPrice';

export const CalculatorPage: React.FC = () => {
  const gold = useGoldPrice();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Gold <span className="gold-text-gradient">Calculator</span></h1>
        <p className="text-zinc-400">Calculate the value of your gold based on current market prices in Egypt.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <GoldCalculator />
          
          <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-zinc-100 mb-6">Current Market Rates</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800">
                <p className="text-zinc-500 text-xs mb-1">24K Gold</p>
                <p className="text-xl font-bold text-gold-400">{gold.k24.toFixed(2)} EGP</p>
              </div>
              <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800">
                <p className="text-zinc-500 text-xs mb-1">21K Gold</p>
                <p className="text-xl font-bold text-gold-400">{gold.k21.toFixed(2)} EGP</p>
              </div>
              <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800">
                <p className="text-zinc-500 text-xs mb-1">18K Gold</p>
                <p className="text-xl font-bold text-gold-400">{gold.k18.toFixed(2)} EGP</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          <AdSpace type="rectangle" />
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h4 className="text-zinc-100 font-semibold mb-4">How it works</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li className="flex items-start">
                <span className="w-5 h-5 bg-gold-400/10 text-gold-400 rounded-full flex items-center justify-center text-[10px] font-bold mr-3 mt-0.5">1</span>
                <span>Enter the weight of your gold in grams.</span>
              </li>
              <li className="flex items-start">
                <span className="w-5 h-5 bg-gold-400/10 text-gold-400 rounded-full flex items-center justify-center text-[10px] font-bold mr-3 mt-0.5">2</span>
                <span>Select the karat (24K, 21K, or 18K).</span>
              </li>
              <li className="flex items-start">
                <span className="w-5 h-5 bg-gold-400/10 text-gold-400 rounded-full flex items-center justify-center text-[10px] font-bold mr-3 mt-0.5">3</span>
                <span>The calculator uses live market rates to give you an estimate.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
