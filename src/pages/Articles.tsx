import React from 'react';
import { ArticleCard } from '../components/ArticleCard';
import { AdSpace } from '../components/AdSpace';
import { articles } from '../data/articles';

export const Articles: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Gold & Investment <span className="gold-text-gradient">Articles</span></h1>
        <p className="text-zinc-400">Expert insights, news, and tips for the Egyptian gold market.</p>
      </div>

      <AdSpace type="banner" className="mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
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

      <div className="mt-16">
        <AdSpace type="footer" />
      </div>
    </div>
  );
};
