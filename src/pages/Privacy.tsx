import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy <span className="gold-text-gradient">Policy</span></h1>
      
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6 text-zinc-400 leading-relaxed">
        <p>Last updated: March 14, 2026</p>
        
        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">1. Introduction</h2>
          <p>
            Egypt Price Gold ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">2. Information Collection</h2>
          <p>
            We do not require users to create an account to access our live gold prices and currency rates. We may collect non-personal information such as browser type, device info, and pages visited to improve our service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">3. Cookies and Advertising</h2>
          <p>
            We use cookies to personalize content and ads, and to analyze our traffic. We also share information about your use of our site with our advertising (Google AdSense) and analytics partners.
          </p>
          <p className="mt-2">
            Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">4. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your information. However, no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at support@egyptpricegold.com.
          </p>
        </section>
      </div>
    </div>
  );
};
