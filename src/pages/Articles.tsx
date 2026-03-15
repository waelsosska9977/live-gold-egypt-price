import React from 'react';
import { ArticleCard } from '../components/ArticleCard';
import { AdSpace } from '../components/AdSpace';
import { useArticles } from '../hooks/useArticles';
import { articles as staticArticles } from '../data/articles';

export const Articles: React.FC = () => {
  const { articles: firestoreArticles, loading } = useArticles();

  // Combine static and firestore articles, prioritizing firestore
  const allArticles = [...firestoreArticles, ...staticArticles.filter(sa => !firestoreArticles.find(fa => fa.slug === sa.slug))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12" dir="rtl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">مقالات <span className="gold-text-gradient">الذهب والاستثمار</span></h1>
        <p className="text-zinc-400">رؤى الخبراء، الأخبار، ونصائح لسوق الذهب المصري.</p>
      </div>

      <AdSpace type="banner" className="mb-12" />

      {loading && firestoreArticles.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl h-80 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allArticles.map((article) => (
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
      )}

      <div className="mt-16">
        <AdSpace type="footer" />
      </div>
    </div>
  );
};
