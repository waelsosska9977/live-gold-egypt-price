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
        <h3 className="text-zinc-400 font-medium">ذهب عيار {karat}</h3>
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
          خطأ في تحميل السعر
        </div>
      ) : (
        <div className="flex items-baseline space-x-2 rtl:space-x-reverse">
          <span className="text-3xl font-bold text-zinc-100">
            {price > 0 ? Math.round(price).toLocaleString('ar-EG') : '---'}
          </span>
          <span className="text-zinc-500 text-sm">{unit === 'EGP / Gram' ? 'جنية / جرام' : 'جنية / قطعة'}</span>
        </div>
      )}
      
      <div className="mt-4 flex items-center text-xs text-zinc-500">
        <Clock className="w-3 h-3 ml-1" />
        <span>{loading ? 'جاري التحديث...' : error ? 'خطأ' : 'تم التحديث الآن'}</span>
      </div>
    </motion.div>
  );
};
