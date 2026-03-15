import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12" dir="rtl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">اتصل <span className="gold-text-gradient">بنا</span></h1>
        <p className="text-zinc-400">هل لديك أسئلة أو ملاحظات؟ يسعدنا سماع ذلك منك.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-right">
            <h3 className="text-xl font-bold text-zinc-100 mb-6">تواصل معنا</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="w-10 h-10 bg-gold-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="text-gold-400 w-5 h-5" />
                </div>
                <div>
                  <p className="text-zinc-100 font-medium">البريد الإلكتروني</p>
                  <p className="text-zinc-400">support@egyptpricegold.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="w-10 h-10 bg-gold-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="text-gold-400 w-5 h-5" />
                </div>
                <div>
                  <p className="text-zinc-100 font-medium">الهاتف</p>
                  <p className="text-zinc-400">+20 123 456 7890</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="w-10 h-10 bg-gold-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-gold-400 w-5 h-5" />
                </div>
                <div>
                  <p className="text-zinc-100 font-medium">المقر</p>
                  <p className="text-zinc-400">القاهرة، جمهورية مصر العربية</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-zinc-400 text-sm font-medium mb-2 text-right">الاسم</label>
                <input
                  type="text"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-all text-right"
                  placeholder="اسمك بالكامل"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm font-medium mb-2 text-right">البريد الإلكتروني</label>
                <input
                  type="email"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-all text-right"
                  placeholder="بريدك الإلكتروني"
                />
              </div>
            </div>
            <div>
              <label className="block text-zinc-400 text-sm font-medium mb-2 text-right">الموضوع</label>
              <input
                type="text"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-all text-right"
                placeholder="الموضوع"
              />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm font-medium mb-2 text-right">الرسالة</label>
              <textarea
                rows={4}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-all text-right"
                placeholder="اكتب رسالتك هنا..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full gold-gradient text-zinc-950 font-bold py-3 rounded-xl flex items-center justify-center space-x-2 rtl:space-x-reverse hover:opacity-90 transition-opacity"
            >
              <Send size={18} />
              <span>إرسال الرسالة</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
