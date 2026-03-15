import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

interface ArticleForm {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image: string;
  slug: string;
}

const initialForm: ArticleForm = {
  title: '',
  excerpt: '',
  content: '',
  category: 'تحليل السوق',
  author: 'أدمن',
  image: '',
  slug: '',
};

export const AdminArticles: React.FC = () => {
  const { user } = useFirebase();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<ArticleForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is admin (email check)
  const isAdmin = user?.email === 'waelsosska9977@gmail.com';

  useEffect(() => {
    if (!isAdmin && user) {
      navigate('/');
    }
  }, [user, isAdmin, navigate]);

  useEffect(() => {
    if (!isAdmin) return;

    const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setArticles(fetched);
    });

    return () => unsubscribe();
  }, [isAdmin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    setLoading(true);
    setError(null);

    try {
      const articleData = {
        ...form,
        date: new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }),
        updatedAt: serverTimestamp(),
      };

      if (form.id) {
        const { id, ...updateData } = articleData;
        await updateDoc(doc(db, 'articles', id), updateData);
      } else {
        await addDoc(collection(db, 'articles'), {
          ...articleData,
          createdAt: serverTimestamp(),
        });
      }

      setForm(initialForm);
      setIsEditing(false);
    } catch (err: any) {
      console.error('Error saving article:', err);
      setError('فشل حفظ المقال. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (article: any) => {
    setForm({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      author: article.author,
      image: article.image,
      slug: article.slug,
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المقال؟')) return;

    try {
      await deleteDoc(doc(db, 'articles', id));
    } catch (err) {
      console.error('Error deleting article:', err);
      alert('فشل حذف المقال');
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12" dir="rtl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">إدارة <span className="gold-text-gradient">المقالات</span></h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-gold-400 text-zinc-950 rounded-lg font-bold hover:bg-gold-500 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>إضافة مقال جديد</span>
          </button>
        )}
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-12"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{form.id ? 'تعديل المقال' : 'إضافة مقال جديد'}</h2>
              <button onClick={() => { setIsEditing(false); setForm(initialForm); }} className="text-zinc-500 hover:text-zinc-300">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">عنوان المقال</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 focus:outline-none focus:border-gold-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">الرابط المختصر (Slug) - بالإنجليزية</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    placeholder="e.g. gold-prices-today"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 focus:outline-none focus:border-gold-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-400">وصف مختصر (Excerpt)</label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 h-20 focus:outline-none focus:border-gold-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-400">محتوى المقال (يدعم HTML)</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 h-64 font-mono text-sm focus:outline-none focus:border-gold-400"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">رابط الصورة</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={form.image}
                      onChange={(e) => setForm({ ...form, image: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 pr-10 focus:outline-none focus:border-gold-400"
                      placeholder="https://..."
                    />
                    <ImageIcon className="absolute left-3 top-2.5 w-5 h-5 text-zinc-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">التصنيف</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">الكاتب</label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center space-x-2 space-x-reverse text-rose-500 bg-rose-500/10 p-4 rounded-xl">
                  <AlertCircle className="w-5 h-5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div className="flex justify-end space-x-4 space-x-reverse">
                <button
                  type="button"
                  onClick={() => { setIsEditing(false); setForm(initialForm); }}
                  className="px-6 py-2 bg-zinc-800 text-zinc-300 rounded-xl hover:bg-zinc-700 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center space-x-2 space-x-reverse px-8 py-2 bg-gold-400 text-zinc-950 rounded-xl font-bold hover:bg-gold-500 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>{form.id ? 'تحديث المقال' : 'نشر المقال'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div className="flex items-center space-x-4 space-x-reverse">
              <img
                src={article.image || 'https://picsum.photos/seed/gold/200/200'}
                alt=""
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div>
                <h3 className="font-bold text-zinc-100">{article.title}</h3>
                <p className="text-xs text-zinc-500">{article.date} | {article.category}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={() => handleEdit(article)}
                className="p-2 text-zinc-400 hover:text-gold-400 transition-colors"
                title="تعديل"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(article.id)}
                className="p-2 text-zinc-400 hover:text-red-400 transition-colors"
                title="حذف"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        {articles.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-zinc-800 rounded-2xl">
            <p className="text-zinc-500">لا توجد مقالات منشورة حالياً.</p>
          </div>
        )}
      </div>
    </div>
  );
};
