import React from 'react';

export const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12" dir="rtl">
      <h1 className="text-4xl font-bold mb-8">الشروط <span className="gold-text-gradient">والأحكام</span></h1>
      
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6 text-zinc-400 leading-relaxed">
        <p>آخر تحديث: 14 مارس 2026</p>
        
        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">1. قبول الشروط</h2>
          <p>
            من خلال الوصول إلى موقع "إيجيبت برايس جولد" واستخدامه، فإنك تقبل وتوافق على الالتزام بشروط وأحكام هذه الاتفاقية.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">2. دقة المعلومات</h2>
          <p>
            بينما نسعى جاهدين لتوفير المعلومات الأكثر دقة وتحديثاً، فإن أسعار الذهب وأسعار صرف العملات تخضع لتغيرات سريعة في السوق. "إيجيبت برايس جولد" غير مسؤولة عن أي خسائر مالية يتم تكبدها بناءً على المعلومات المقدمة في هذا الموقع. تأكد دائماً من الأسعار من المصادر الرسمية قبل إجراء أي معاملات.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">3. استخدام الخدمة</h2>
          <p>
            أنت توافق على استخدام الموقع لأغراض قانونية فقط. قد يؤدي الاستخدام غير المصرح به لهذا الموقع إلى المطالبة بالتعويض عن الأضرار و/أو يكون جريمة جنائية.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">4. الملكية الفكرية</h2>
          <p>
            المحتوى والتخطيط والتصميم والبيانات والرسومات الموجودة على هذا الموقع محمية بموجب قوانين الملكية الفكرية وهي مملوكة لشركة "إيجيبت برايس جولد" ما لم ينص على خلاف ذلك.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">5. التعديلات</h2>
          <p>
            نحتفظ بالحق في تعديل هذه الشروط في أي وقت دون إشعار مسبق. استمرارك في استخدام الموقع يعني قبولك لأي تغييرات.
          </p>
        </section>
      </div>
    </div>
  );
};
