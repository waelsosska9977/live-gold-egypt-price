import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12" dir="rtl">
      <h1 className="text-4xl font-bold mb-8 text-right">سياسة <span className="gold-text-gradient">الخصوصية</span></h1>
      
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6 text-zinc-400 leading-relaxed text-right">
        <p>آخر تحديث: 15 مارس 2026</p>
        
        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">1. مقدمة</h2>
          <p>
            نحن في "سعر الذهب في مصر" (Egypt Price Gold) نلتزم بحماية خصوصيتك. توضح سياسة الخصوصية هذه كيفية جمع معلوماتك واستخدامها وحمايتها عند زيارة موقعنا.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">2. جمع المعلومات</h2>
          <p>
            نحن نجمع المعلومات التي تقدمها لنا طواعية عند تسجيل الدخول عبر حساب جوجل، مثل الاسم والبريد الإلكتروني وصورة الملف الشخصي. تُستخدم هذه البيانات فقط لتخصيص تجربتك وتقديم خدمة تنبيهات الأسعار.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">3. ملفات تعريف الارتباط والإعلانات</h2>
          <p>
            نحن نستخدم ملفات تعريف الارتباط (Cookies) لتخصيص المحتوى والإعلانات، ولتحليل حركة المرور لدينا. كما نشارك معلومات حول استخدامك لموقعنا مع شركائنا في الإعلانات (Google AdSense) والتحليلات.
          </p>
          <p className="mt-2">
            تستخدم Google ملفات تعريف الارتباط لعرض الإعلانات بناءً على زيارات المستخدم السابقة لموقعنا أو لمواقع أخرى على الإنترنت. يمكنك اختيار تعطيل الإعلانات المخصصة من خلال زيارة إعدادات إعلانات Google.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">4. حماية البيانات</h2>
          <p>
            نحن نطبق إجراءات أمنية صارمة لحماية معلوماتك الشخصية. يتم تخزين بياناتك بشكل آمن عبر خدمات Firebase المقدمة من جوجل، ولا نقوم ببيع أو مشاركة بياناتك مع أطراف ثالثة لأغراض تسويقية.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">5. اتصل بنا</h2>
          <p>
            إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا عبر البريد الإلكتروني: support@egyptpricegold.com
          </p>
        </section>
      </div>
    </div>
  );
};
