import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { CalculatorPage } from './pages/CalculatorPage';
import { ChartPage } from './pages/ChartPage';
import { Articles } from './pages/Articles';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { ArticleDetail } from './pages/ArticleDetail';
import { AdminArticles } from './pages/AdminArticles';
import { motion } from 'motion/react';
import { FirebaseProvider } from './context/FirebaseContext';

export default function App() {
  return (
    <FirebaseProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
          <Header />
          
          <main className="flex-grow">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/calculator" element={<CalculatorPage />} />
                <Route path="/charts" element={<ChartPage />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/articles/:slug" element={<ArticleDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/admin/articles" element={<AdminArticles />} />
              </Routes>
            </motion.div>
          </main>

          <Footer />
        </div>
      </Router>
    </FirebaseProvider>
  );
}
