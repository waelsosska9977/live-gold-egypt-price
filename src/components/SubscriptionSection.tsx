import React, { useState, useEffect } from 'react';
import { Bell, BellOff, Plus, Trash2, AlertCircle } from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';

export const SubscriptionSection: React.FC = () => {
  const { user, login } = useFirebase();
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [karat, setKarat] = useState<'24' | '21' | '18'>('21');
  const [targetPrice, setTargetPrice] = useState('');
  const [condition, setCondition] = useState<'above' | 'below'>('below');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setSubscriptions([]);
      return;
    }

    const q = query(collection(db, 'subscriptions'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const subs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSubscriptions(subs);
    });

    return () => unsubscribe();
  }, [user]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!targetPrice || isNaN(Number(targetPrice))) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'subscriptions'), {
        userId: user.uid,
        karat,
        targetPrice: Number(targetPrice),
        condition,
        active: true,
        createdAt: serverTimestamp(),
      });
      setTargetPrice('');
    } catch (error) {
      console.error('Subscription failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'subscriptions', id));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  if (!user) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
        <Bell className="w-12 h-12 text-gold-400 mx-auto mb-4 opacity-20" />
        <h3 className="text-xl font-bold mb-2">اشترك في تنبيهات الأسعار</h3>
        <p className="text-zinc-400 mb-6">سجل دخولك لتلقي إشعارات عندما يصل الذهب إلى السعر الذي تحدده.</p>
        <button
          onClick={login}
          className="px-6 py-3 bg-gold-400 text-zinc-950 rounded-xl font-bold hover:bg-gold-500 transition-colors"
        >
          تسجيل الدخول للبدء
        </button>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <div className="flex items-center space-x-2 rtl:space-x-reverse mb-6">
        <Bell className="text-gold-400 w-6 h-6" />
        <h3 className="text-xl font-bold">تنبيهات الأسعار الخاصة بك</h3>
      </div>

      <form onSubmit={handleSubscribe} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="space-y-2">
          <label className="text-xs text-zinc-500 block">العيار</label>
          <select
            value={karat}
            onChange={(e) => setKarat(e.target.value as any)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold-400"
          >
            <option value="24">عيار 24</option>
            <option value="21">عيار 21</option>
            <option value="18">عيار 18</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-zinc-500 block">عندما يكون السعر</label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value as any)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold-400"
          >
            <option value="below">أقل من</option>
            <option value="above">أعلى من</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-zinc-500 block">السعر المستهدف (ج.م)</label>
          <input
            type="number"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            placeholder="مثلاً: 3500"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold-400"
            required
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold-400 text-zinc-950 rounded-lg py-2 text-sm font-bold hover:bg-gold-500 transition-colors flex items-center justify-center space-x-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>إضافة تنبيه</span>
              </>
            )}
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {subscriptions.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-zinc-800 rounded-xl">
            <p className="text-zinc-500 text-sm">ليس لديك أي تنبيهات نشطة حالياً.</p>
          </div>
        ) : (
          subscriptions.map((sub) => (
            <div
              key={sub.id}
              className="flex items-center justify-between p-4 bg-zinc-800/50 border border-zinc-800 rounded-xl"
            >
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="w-10 h-10 bg-gold-400/10 rounded-full flex items-center justify-center">
                  <Bell className="text-gold-400 w-5 h-5" />
                </div>
                <div>
                  <p className="text-zinc-100 font-medium">
                    تنبيه عيار {sub.karat}
                  </p>
                  <p className="text-xs text-zinc-400">
                    عندما يكون السعر {sub.condition === 'below' ? 'أقل من' : 'أعلى من'} {sub.targetPrice.toLocaleString()} ج.م
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(sub.id)}
                className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 flex items-start space-x-2 rtl:space-x-reverse p-4 bg-gold-400/5 rounded-xl border border-gold-400/10">
        <AlertCircle className="text-gold-400 w-5 h-5 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-zinc-400 leading-relaxed">
          سيتم إرسال إشعار إلى بريدك الإلكتروني المسجل بمجرد وصول السعر إلى القيمة المحددة. تأكد من تفعيل الإشعارات في متصفحك أيضاً.
        </p>
      </div>
    </div>
  );
};
