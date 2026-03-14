import React from 'react';

interface AdSpaceProps {
  type: 'banner' | 'rectangle' | 'footer';
  className?: string;
}

export const AdSpace: React.FC<AdSpaceProps> = ({ type, className = '' }) => {
  const styles = {
    banner: 'w-full h-[90px] max-w-[728px]',
    rectangle: 'w-[300px] h-[250px]',
    footer: 'w-full h-[100px]',
  };

  return (
    <div className={`mx-auto flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden ${styles[type]} ${className}`}>
      <div className="text-center">
        <p className="text-zinc-600 text-[10px] uppercase tracking-widest mb-1">Advertisement</p>
        <p className="text-zinc-500 text-sm font-medium">AdSense Space</p>
      </div>
    </div>
  );
};
