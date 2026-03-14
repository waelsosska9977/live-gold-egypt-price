import React from 'react';
import { Facebook, Twitter, MessageCircle, Linkedin } from 'lucide-react';

export const SocialShareButtons: React.FC = () => {
  const url = window.location.href;
  const title = "Check out live gold prices in Egypt!";

  const shares = [
    { 
      name: 'Facebook', 
      icon: <Facebook size={18} />, 
      color: 'bg-[#1877F2]',
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    },
    { 
      name: 'Twitter', 
      icon: <Twitter size={18} />, 
      color: 'bg-[#1DA1F2]',
      link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    },
    { 
      name: 'WhatsApp', 
      icon: <MessageCircle size={18} />, 
      color: 'bg-[#25D366]',
      link: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`
    },
    { 
      name: 'LinkedIn', 
      icon: <Linkedin size={18} />, 
      color: 'bg-[#0A66C2]',
      link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {shares.map((share) => (
        <a
          key={share.name}
          href={share.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`${share.color} text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:opacity-90 transition-opacity`}
        >
          {share.icon}
          <span className="text-sm font-medium">{share.name}</span>
        </a>
      ))}
    </div>
  );
};
