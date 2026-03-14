import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Clock } from 'lucide-react';

interface GoldPriceCardProps {
  karat: string;
  price: number;
  unit?: string;
  loading?: boolean;
  error?: string | null;
}

export const GoldPriceCard: React.FC<GoldPriceCardProps> = ({ karat, price, unit = 'EGP / Gram', loading, error }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-zinc-400 font-medium">{karat} Gold</h3>
        <div className="p-2 bg-gold-400/10 rounded-lg">
          <TrendingUp className="text-gold-400 w-4 h-4" />
        </div>
      </div>
      
      {loading ? (
        <div className="space-y-2">
          <div className="h-10 w-32 bg-zinc-800 animate-pulse rounded"></div>
          <div className="h-4 w-20 bg-zinc-800 animate-pulse rounded"></div>
        </div>
      ) : error ? (
        <div className="text-rose-500 text-sm font-medium">
          Failed to load price
        </div>
      ) : (
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-zinc-100">
            {price > 0 ? price.toLocaleString('en-EG', { maximumFractionDigits: 2 }) : '---'}
          </span>
          <span className="text-zinc-500 text-sm">{unit}</span>
        </div>
      )}
      
      <div className="mt-4 flex items-center text-xs text-zinc-500">
        <Clock className="w-3 h-3 mr-1" />
        <span>{loading ? 'Updating...' : error ? 'Error' : 'Updated just now'}</span>
      </div>
    </motion.div>
  );
};
