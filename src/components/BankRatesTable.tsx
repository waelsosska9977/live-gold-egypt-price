import React from 'react';
import { motion } from 'motion/react';
import { Building2, ArrowRightLeft } from 'lucide-react';
import { BankRate } from '../hooks/useCurrencyRates';

interface BankRatesTableProps {
  banks: BankRate[];
  loading?: boolean;
  error?: string | null;
}

export const BankRatesTable: React.FC<BankRatesTableProps> = ({ banks, loading, error }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gold-400/10 rounded-xl flex items-center justify-center">
            <Building2 className="text-gold-400 w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-100">Bank Exchange Rates</h3>
            <p className="text-zinc-500 text-xs">USD to EGP comparison</p>
          </div>
        </div>
        <ArrowRightLeft className="text-zinc-600 w-5 h-5" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-zinc-950/50 text-zinc-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Bank Name</th>
              <th className="px-6 py-4 font-semibold">Buy Price</th>
              <th className="px-6 py-4 font-semibold">Sell Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4"><div className="h-4 w-32 bg-zinc-800 rounded"></div></td>
                  <td className="px-6 py-4"><div className="h-4 w-16 bg-zinc-800 rounded"></div></td>
                  <td className="px-6 py-4"><div className="h-4 w-16 bg-zinc-800 rounded"></div></td>
                </tr>
              ))
            ) : error ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-rose-500 text-sm">
                  Failed to load bank rates.
                </td>
              </tr>
            ) : (
              banks.map((bank, index) => (
                <motion.tr 
                  key={bank.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-zinc-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-zinc-100 font-medium">{bank.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-emerald-500 font-bold">{bank.buy.toFixed(2)}</span>
                    <span className="text-[10px] text-zinc-500 ml-1">EGP</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-rose-500 font-bold">{bank.sell.toFixed(2)}</span>
                    <span className="text-[10px] text-zinc-500 ml-1">EGP</span>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 bg-zinc-950/50 border-t border-zinc-800 text-center">
        <p className="text-[10px] text-zinc-500">
          * Rates are updated every minute and represent official market estimates.
        </p>
      </div>
    </div>
  );
};
