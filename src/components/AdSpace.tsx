import React from 'react';

interface AdSpaceProps {
  type: 'banner' | 'rectangle' | 'footer';
  className?: string;
}

export const AdSpace: React.FC<AdSpaceProps> = ({ type, className = '' }) => {
  const styles = {
    banner: 'w-full h-[90px] max-w-[728px]',
    rectangle: 'w-full md:w-[300px] h-[250px]',
    footer: 'w-full h-[100px]',
  };

  return (
    <div className={`mx-auto flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-950 border border-gold-400/20 rounded-xl overflow-hidden relative group ${styles[type]} ${className}`}>
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-gold-400/10 transition-colors" />
      
      <div className="text-center px-4 relative z-10">
        <div className="flex items-center justify-center mb-1">
          <div className="w-6 h-6 bg-gold-400 rounded-full flex items-center justify-center mr-2">
            <span className="text-zinc-950 font-bold text-[10px]">EG</span>
          </div>
          <h4 className="text-gold-400 font-bold tracking-tight">Egypt Price Gold</h4>
        </div>
        <p className="text-zinc-400 text-xs md:text-sm font-medium">موقعك الأول لمتابعة أسعار الذهب والعملات في مصر</p>
        <div className="mt-2 inline-block px-3 py-1 bg-gold-400/10 border border-gold-400/30 rounded-full">
          <span className="text-gold-400 text-[10px] font-bold uppercase tracking-wider">إعلان الموقع</span>
        </div>
      </div>
    </div>
  );
};
