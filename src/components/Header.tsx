import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coins, Calculator, LineChart, Newspaper, Info, Mail, Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useFirebase } from '../context/FirebaseContext';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const { user, login, logout } = useFirebase();

  const navItems = [
    { name: 'Home', path: '/', icon: <Coins className="w-4 h-4" /> },
    { name: 'Calculator', path: '/calculator', icon: <Calculator className="w-4 h-4" /> },
    { name: 'Charts', path: '/charts', icon: <LineChart className="w-4 h-4" /> },
    { name: 'Articles', path: '/articles', icon: <Newspaper className="w-4 h-4" /> },
    { name: 'About', path: '/about', icon: <Info className="w-4 h-4" /> },
    { name: 'Contact', path: '/contact', icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 gold-gradient rounded-lg flex items-center justify-center">
              <Coins className="text-zinc-950 w-5 h-5" />
            </div>
            <span className="text-xl font-bold gold-text-gradient">Egypt Price Gold</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                    location.pathname === item.path
                      ? 'text-gold-400 bg-gold-400/10'
                      : 'text-zinc-400 hover:text-gold-400 hover:bg-zinc-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            <div className="h-6 w-px bg-zinc-800 mx-2" />

            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-1 bg-zinc-900 rounded-full border border-zinc-800">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || ''} className="w-6 h-6 rounded-full" />
                  ) : (
                    <User className="w-4 h-4 text-zinc-400" />
                  )}
                  <span className="text-xs text-zinc-300 max-w-[100px] truncate">{user.displayName}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-zinc-400 hover:text-red-400 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={login}
                className="flex items-center space-x-2 px-4 py-2 bg-gold-400 text-zinc-950 rounded-lg text-sm font-bold hover:bg-gold-500 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {user && (
              <img src={user.photoURL || ''} alt="" className="w-8 h-8 rounded-full border border-zinc-800" />
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-400 hover:text-gold-400 p-2"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-900 border-b border-zinc-800 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-3 ${
                    location.pathname === item.path
                      ? 'text-gold-400 bg-gold-400/10'
                      : 'text-zinc-400 hover:text-gold-400 hover:bg-zinc-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
              
              <div className="pt-4 pb-2 border-t border-zinc-800">
                {user ? (
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:text-red-400"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      login();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-gold-400"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Login</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
