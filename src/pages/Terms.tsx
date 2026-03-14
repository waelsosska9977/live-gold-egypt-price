import React from 'react';

export const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Terms & <span className="gold-text-gradient">Conditions</span></h1>
      
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6 text-zinc-400 leading-relaxed">
        <p>Last updated: March 14, 2026</p>
        
        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Egypt Price Gold, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">2. Accuracy of Information</h2>
          <p>
            While we strive to provide the most accurate and up-to-date information, gold prices and currency rates are subject to rapid market changes. Egypt Price Gold is not responsible for any financial losses incurred based on the information provided on this website. Always verify prices with official sources before making transactions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">3. Use of Service</h2>
          <p>
            You agree to use the website for lawful purposes only. Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">4. Intellectual Property</h2>
          <p>
            The content, layout, design, data, and graphics on this website are protected by intellectual property laws and are owned by Egypt Price Gold unless otherwise stated.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">5. Modifications</h2>
          <p>
            We reserve the right to modify these terms at any time without prior notice. Your continued use of the site signifies your acceptance of any changes.
          </p>
        </section>
      </div>
    </div>
  );
};
