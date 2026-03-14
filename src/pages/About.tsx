import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">About <span className="gold-text-gradient">Egypt Price Gold</span></h1>
      
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6 text-zinc-400 leading-relaxed">
        <p>
          Welcome to <span className="text-gold-400 font-semibold">Egypt Price Gold</span>, your premier destination for real-time gold prices and currency exchange rates in the Egyptian market.
        </p>
        
        <p>
          In an ever-changing economic landscape, having access to accurate, up-to-the-minute data is crucial for making informed financial decisions. Whether you're an investor, a jeweler, or someone looking to buy gold for personal reasons, our platform provides the tools and information you need.
        </p>

        <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Our Mission</h2>
        <p>
          Our mission is to provide transparency and accessibility to market data for all Egyptians. We believe that everyone should have access to the same high-quality information used by professionals.
        </p>

        <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Why Choose Us?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><span className="text-zinc-100 font-medium">Real-Time Updates:</span> Our prices are updated every 60 seconds from global and local sources.</li>
          <li><span className="text-zinc-100 font-medium">Comprehensive Data:</span> We cover 24K, 21K, 18K gold, and the Gold Pound, along with USD/EGP rates.</li>
          <li><span className="text-zinc-100 font-medium">User-Friendly Tools:</span> Our gold calculator and interactive charts make analysis simple.</li>
          <li><span className="text-zinc-100 font-medium">Expert Insights:</span> Our articles section provides context and tips for the local market.</li>
        </ul>

        <p className="mt-8">
          Thank you for choosing Egypt Price Gold. We are committed to being your most trusted financial data partner in Egypt.
        </p>
      </div>
    </div>
  );
};
