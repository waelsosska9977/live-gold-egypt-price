import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact <span className="gold-text-gradient">Us</span></h1>
        <p className="text-zinc-400">Have questions or feedback? We'd love to hear from you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-zinc-100 mb-6">Get in Touch</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gold-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="text-gold-400 w-5 h-5" />
                </div>
                <div>
                  <p className="text-zinc-100 font-medium">Email</p>
                  <p className="text-zinc-400">support@egyptpricegold.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gold-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="text-gold-400 w-5 h-5" />
                </div>
                <div>
                  <p className="text-zinc-100 font-medium">Phone</p>
                  <p className="text-zinc-400">+20 123 456 7890</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gold-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-gold-400 w-5 h-5" />
                </div>
                <div>
                  <p className="text-zinc-100 font-medium">Office</p>
                  <p className="text-zinc-400">Cairo, Egypt</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-zinc-400 text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-all"
                  placeholder="Your email"
                />
              </div>
            </div>
            <div>
              <label className="block text-zinc-400 text-sm font-medium mb-2">Subject</label>
              <input
                type="text"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-all"
                placeholder="Subject"
              />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm font-medium mb-2">Message</label>
              <textarea
                rows={4}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-all"
                placeholder="Your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full gold-gradient text-zinc-950 font-bold py-3 rounded-xl flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
            >
              <Send size={18} />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
