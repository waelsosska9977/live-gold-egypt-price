import React from 'react';
import { useGoldPrice } from '../hooks/useGoldPrice';
import { useCurrencyRates } from '../hooks/useCurrencyRates';
import { GoldPriceCard } from '../components/GoldPriceCard';
import { CurrencyCard } from '../components/CurrencyCard';
import { GoldCalculator } from '../components/GoldCalculator';
import { PriceChart } from '../components/PriceChart';
import { ArticleCard } from '../components/ArticleCard';
import { AdSpace } from '../components/AdSpace';
import { motion } from 'motion/react';
import { articles as allArticles } from '../data/articles';

import { BankRatesTable } from '../components/BankRatesTable';

export const Home: React.FC = () => {
  const gold = useGoldPrice();
  const currency = useCurrencyRates();

  const latestArticles = allArticles.slice(0, 3);

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gold-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold mb-4"
            >
              Live Gold Prices in <span className="gold-text-gradient">Egypt</span>
            </motion.h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Real-time updates for 24k, 21k, 18k gold and USD/EGP exchange rates. 
              Stay informed with accurate market data.
            </p>
          </div>

          <AdSpace type="banner" className="mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GoldPriceCard karat="24K" price={gold.k24} loading={gold.loading} error={gold.error} />
            <GoldPriceCard karat="21K" price={gold.k21} loading={gold.loading} error={gold.error} />
            <GoldPriceCard karat="18K" price={gold.k18} loading={gold.loading} error={gold.error} />
            <GoldPriceCard karat="Gold Pound" price={gold.goldPound} loading={gold.loading} error={gold.error} unit="EGP / Piece" />
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PriceChart />
            <BankRatesTable banks={currency.banks} loading={currency.loading} error={currency.error} />
          </div>
          <div className="space-y-8">
            <GoldCalculator />
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-center">
              <h3 className="text-zinc-100 font-semibold mb-2">Global Spot Price</h3>
              {gold.loading ? (
                <div className="h-10 w-40 bg-zinc-800 animate-pulse rounded"></div>
              ) : gold.error ? (
                <p className="text-rose-500 text-sm">Error loading spot price</p>
              ) : (
                <p className="text-3xl font-bold text-gold-400">
                  ${gold.ounceUSD.toLocaleString()}
                  <span className="text-sm font-normal text-zinc-500 ml-2">/ Ounce</span>
                </p>
              )}
              <p className="text-zinc-500 text-sm mt-2">Global market reference price</p>
            </div>
            <AdSpace type="rectangle" />
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-zinc-100">Latest Articles</h2>
            <p className="text-zinc-500">Insights and tips for gold investment in Egypt</p>
          </div>
          <button className="text-gold-400 font-semibold hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestArticles.map((article) => (
            <ArticleCard 
              key={article.id} 
              title={article.title}
              excerpt={article.excerpt}
              date={article.date}
              image={article.image}
              slug={article.slug}
            />
          ))}
        </div>
      </section>

      <AdSpace type="footer" className="max-w-7xl" />
    </div>
  );
};
