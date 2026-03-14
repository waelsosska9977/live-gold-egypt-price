import React from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  slug: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ title, excerpt, date, image, slug }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg group"
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center text-zinc-500 text-xs mb-3">
          <Calendar className="w-3 h-3 mr-1" />
          <span>{date}</span>
        </div>
        <h3 className="text-xl font-bold text-zinc-100 mb-2 group-hover:text-gold-400 transition-colors">
          {title}
        </h3>
        <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
          {excerpt}
        </p>
        <Link 
          to={`/articles/${slug}`}
          className="inline-flex items-center text-gold-400 text-sm font-semibold hover:underline"
        >
          Read More <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </motion.div>
  );
};
