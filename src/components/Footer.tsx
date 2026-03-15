import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 pt-12 pb-8" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 space-x-reverse mb-4">
              <span className="text-2xl font-bold gold-text-gradient">إيجيبت برايس جولد</span>
            </Link>
            <p className="text-zinc-400 max-w-md">
              مصدرك الموثوق لأسعار الذهب المباشرة وأسعار صرف الدولار في مصر. 
              يتم التحديث كل دقيقة ببيانات السوق الحقيقية.
            </p>
          </div>
          
          <div>
            <h3 className="text-zinc-100 font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-zinc-400">
              <li><Link to="/" className="hover:text-gold-400 transition-colors">الرئيسية</Link></li>
              <li><Link to="/calculator" className="hover:text-gold-400 transition-colors">حاسبة الذهب</Link></li>
              <li><Link to="/charts" className="hover:text-gold-400 transition-colors">الرسوم البيانية</Link></li>
              <li><Link to="/articles" className="hover:text-gold-400 transition-colors">المقالات والأخبار</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-zinc-100 font-semibold mb-4">قانوني</h3>
            <ul className="space-y-2 text-zinc-400">
              <li><Link to="/privacy" className="hover:text-gold-400 transition-colors">سياسة الخصوصية</Link></li>
              <li><Link to="/terms" className="hover:text-gold-400 transition-colors">الشروط والأحكام</Link></li>
              <li><Link to="/about" className="hover:text-gold-400 transition-colors">من نحن</Link></li>
              <li><Link to="/contact" className="hover:text-gold-400 transition-colors">اتصل بنا</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 mb-8">
          <p className="text-zinc-500 text-xs leading-relaxed text-center max-w-4xl mx-auto">
            إخلاء مسؤولية: المعلومات المقدمة على موقع "إيجيبت برايس جولد" هي لأغراض إعلامية فقط ولا تشكل نصيحة مالية أو استثمارية. أسعار الذهب والعملات متغيرة وتخضع لتقلبات السوق اللحظية. نحن نبذل قصارى جهدنا لضمان دقة البيانات ولكننا لا نتحمل مسؤولية أي قرارات تتخذ بناءً على هذه المعلومات. يرجى مراجعة المصادر الرسمية قبل إجراء أي معاملات مالية.
          </p>
        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} إيجيبت برايس جولد. جميع الحقوق محفوظة.
          </p>
          <div className="flex space-x-6 space-x-reverse">
            <a href="#" className="text-zinc-500 hover:text-gold-400 transition-colors"><Facebook size={20} /></a>
            <a href="#" className="text-zinc-500 hover:text-gold-400 transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-zinc-500 hover:text-gold-400 transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-zinc-500 hover:text-gold-400 transition-colors"><Github size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
