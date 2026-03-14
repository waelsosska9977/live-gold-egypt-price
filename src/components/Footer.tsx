import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold gold-text-gradient">Egypt Price Gold</span>
            </Link>
            <p className="text-zinc-400 max-w-md">
              Your trusted source for live gold prices and USD exchange rates in Egypt. 
              Updated every minute with real-time market data.
            </p>
          </div>
          
          <div>
            <h3 className="text-zinc-100 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-zinc-400">
              <li><Link to="/" className="hover:text-gold-400 transition-colors">Home</Link></li>
              <li><Link to="/calculator" className="hover:text-gold-400 transition-colors">Gold Calculator</Link></li>
              <li><Link to="/charts" className="hover:text-gold-400 transition-colors">Price Charts</Link></li>
              <li><Link to="/articles" className="hover:text-gold-400 transition-colors">Articles & News</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-zinc-100 font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-zinc-400">
              <li><Link to="/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-gold-400 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/about" className="hover:text-gold-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-gold-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Egypt Price Gold. All rights reserved.
          </p>
          <div className="flex space-x-6">
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
