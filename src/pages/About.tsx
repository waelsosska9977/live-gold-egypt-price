import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12" dir="rtl">
      <h1 className="text-4xl font-bold mb-8 text-center">من <span className="gold-text-gradient">نحن</span></h1>
      
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6 text-zinc-400 leading-relaxed text-right">
        <p>
          مرحباً بكم في <span className="text-gold-400 font-semibold">سعر الذهب في مصر</span>، وجهتكم الأولى لمتابعة أسعار الذهب وأسعار صرف العملات في السوق المصري لحظة بلحظة.
        </p>
        
        <p>
          في ظل المشهد الاقتصادي المتغير باستمرار، يعد الحصول على بيانات دقيقة ومحدثة أمراً حيوياً لاتخاذ قرارات مالية مدروسة. سواء كنت مستثمراً، أو صائغاً، أو شخصاً يتطلع لشراء الذهب لأغراض شخصية، فإن منصتنا توفر لك الأدوات والمعلومات التي تحتاجها.
        </p>

        <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">مهمتنا</h2>
        <p>
          مهمتنا هي توفير الشفافية وسهولة الوصول إلى بيانات السوق لجميع المصريين. نحن نؤمن بأن الجميع يجب أن يحصلوا على نفس المعلومات عالية الجودة التي يستخدمها المحترفون.
        </p>

        <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">لماذا تختارنا؟</h2>
        <ul className="list-disc pr-6 space-y-2">
          <li><span className="text-zinc-100 font-medium">تحديثات لحظية:</span> يتم تحديث أسعارنا كل 60 ثانية من مصادر عالمية ومحلية موثوقة.</li>
          <li><span className="text-zinc-100 font-medium">بيانات شاملة:</span> نغطي عيار 24، 21، 18، والجنيه الذهب، بالإضافة إلى أسعار الدولار مقابل الجنيه.</li>
          <li><span className="text-zinc-100 font-medium">أدوات سهلة الاستخدام:</span> حاسبة الذهب والرسوم البيانية التفاعلية تجعل التحليل بسيطاً للجميع.</li>
          <li><span className="text-zinc-100 font-medium">مقالات الخبراء:</span> يوفر قسم المقالات لدينا سياقاً ونصائح قيمة للسوق المحلي.</li>
        </ul>

        <p className="mt-8">
          شكراً لاختياركم "سعر الذهب في مصر". نحن ملتزمون بأن نكون شريككم الأكثر ثقة في بيانات السوق المالية في مصر.
        </p>
      </div>
    </div>
  );
};
