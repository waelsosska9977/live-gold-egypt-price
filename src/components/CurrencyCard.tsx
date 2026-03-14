import React from 'react';
import { motion } from 'motion/react';
import { DollarSign, ArrowRightLeft } from 'lucide-react';

interface CurrencyCardProps {
  buy: number;
  sell: number;
  loading?: boolean;
  error?: string | null;
}

export const CurrencyCard: React.FC<CurrencyCardProps> = ({ buy, sell, loading, error }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
            <DollarSign className="text-emerald-500 w-6 h-6" />
          </div>
          <div>
            <h3 className="text-zinc-100 font-semibold">USD / EGP</h3>
            <p className="text-zinc-500 text-xs">Official Market Rate</p>
          </div>
        </div>
        <ArrowRightLeft className="text-zinc-600 w-5 h-5" />
      </div>

      {error ? (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 text-rose-500 text-sm text-center">
          Failed to load currency rates
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-950/50 rounded-xl p-4 border border-zinc-800/50">
            <p className="text-zinc-500 text-xs mb-1">Buy Price</p>
            {loading ? (
              <div className="h-8 w-20 bg-zinc-800 animate-pulse rounded"></div>
            ) : (
              <p className="text-2xl font-bold text-emerald-500">
                {buy > 0 ? buy.toFixed(2) : '---'} <span className="text-xs font-normal text-zinc-500">EGP</span>
              </p>
            )}
          </div>
          <div className="bg-zinc-950/50 rounded-xl p-4 border border-zinc-800/50">
            <p className="text-zinc-500 text-xs mb-1">Sell Price</p>
            {loading ? (
              <div className="h-8 w-20 bg-zinc-800 animate-pulse rounded"></div>
            ) : (
              <p className="text-2xl font-bold text-rose-500">
                {sell > 0 ? sell.toFixed(2) : '---'} <span className="text-xs font-normal text-zinc-500">EGP</span>
              </p>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};
