import React from 'react';
import { PriceChart } from '../components/PriceChart';
import { AdSpace } from '../components/AdSpace';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';

export const ChartPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Price <span className="gold-text-gradient">Charts</span></h1>
        <p className="text-zinc-400">Analyze historical gold and currency trends in the Egyptian market.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <PriceChart />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="text-emerald-500 w-5 h-5" />
                <h3 className="text-zinc-100 font-semibold">Market Analysis</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Gold prices in Egypt have shown a steady upward trend over the last 30 days, 
                influenced by global spot prices and local currency fluctuations. 
                Investors are increasingly turning to 21K gold as a primary store of value.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Info className="text-gold-400 w-5 h-5" />
                <h3 className="text-zinc-100 font-semibold">Data Source</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Our charts are powered by real-time data from global metal exchanges 
                and official currency markets. Prices are updated every 60 seconds 
                to ensure maximum accuracy for our users.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <AdSpace type="rectangle" />
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h4 className="text-zinc-100 font-semibold mb-4">Quick Stats</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                <span className="text-zinc-500 text-sm">24h High</span>
                <span className="text-zinc-100 font-medium">3,270 EGP</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                <span className="text-zinc-500 text-sm">24h Low</span>
                <span className="text-zinc-100 font-medium">3,190 EGP</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                <span className="text-zinc-500 text-sm">Volatility</span>
                <span className="text-emerald-500 font-medium">+2.5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
