import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { articles as staticArticles } from '../data/articles';
import { Calendar, User, Tag, ArrowRight, Share2 } from 'lucide-react';
import { SocialShareButtons } from '../components/SocialShareButtons';
import { AdSpace } from '../components/AdSpace';
import { motion } from 'motion/react';
import { useArticles } from '../hooks/useArticles';

export const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { articles: firestoreArticles, loading } = useArticles();
  
  const allArticles = [...firestoreArticles, ...staticArticles.filter(sa => !firestoreArticles.find(fa => fa.slug === sa.slug))];
  const article = allArticles.find(a => a.slug === slug);

  if (loading && !article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-12 h-12 border-4 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-zinc-400">جاري تحميل المقال...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center" dir="rtl">
        <h2 className="text-3xl font-bold mb-4">المقال غير موجود</h2>
        <Link to="/articles" className="text-gold-400 hover:underline">العودة إلى المقالات</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12" dir="rtl">
      <Link 
        to="/articles" 
        className="inline-flex items-center text-zinc-500 hover:text-gold-400 mb-8 transition-colors"
      >
        <ArrowRight className="w-4 h-4 ml-2" /> العودة إلى المقالات
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="h-[400px] overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="p-8 md:p-12">
              <div className="flex flex-wrap gap-4 mb-6 text-sm text-zinc-500">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 ml-2 text-gold-400" />
                  {article.date}
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 ml-2 text-gold-400" />
                  {article.author}
                </div>
                <div className="flex items-center">
                  <Tag className="w-4 h-4 ml-2 text-gold-400" />
                  {article.category}
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-zinc-100 mb-8 leading-tight">
                {article.title}
              </h1>

              <div 
                className="prose prose-invert prose-gold max-w-none text-zinc-400 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              <div className="mt-12 pt-8 border-t border-zinc-800">
                <h3 className="text-zinc-100 font-semibold mb-4 flex items-center">
                  <Share2 className="w-5 h-5 ml-2 text-gold-400" /> شارك هذا المقال
                </h3>
                <SocialShareButtons />
              </div>
            </div>
          </motion.article>
        </div>

        <aside className="space-y-8">
          <AdSpace type="rectangle" />
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-zinc-100 font-semibold mb-6">مقالات ذات صلة</h3>
            <div className="space-y-6">
              {allArticles.filter(a => a.id !== article.id).slice(0, 3).map(related => (
                <Link key={related.id} to={`/articles/${related.slug}`} className="group block">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={related.image} alt={related.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-zinc-200 group-hover:text-gold-400 transition-colors line-clamp-2">
                        {related.title}
                      </h4>
                      <p className="text-xs text-zinc-500 mt-1">{related.date}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <AdSpace type="rectangle" className="sticky top-24" />
        </aside>
      </div>
    </div>
  );
};
