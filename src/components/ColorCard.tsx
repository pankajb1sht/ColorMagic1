import React from 'react';
import { Copy } from 'lucide-react';
import toast from 'react-hot-toast';

interface ColorCardProps {
  color: string;
  index: number;
}

export function ColorCard({ color, index }: ColorCardProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    toast.success(`Copied ${color} to clipboard!`);
  };

  return (
    <div 
      className="group relative flex flex-col items-center justify-center h-full w-full transition-transform duration-300 hover:scale-105"
      style={{ backgroundColor: color }}
    >
      <button
        onClick={copyToClipboard}
        className="opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-4 rounded-full transition-opacity duration-300"
      >
        <Copy className="w-6 h-6 text-white drop-shadow-lg" />
      </button>
      <span className="absolute bottom-4 left-4 text-white/90 font-mono text-sm tracking-wider drop-shadow-lg">
        {color.toUpperCase()}
      </span>
      <span className="absolute top-4 right-4 text-white/70 font-medium tracking-wider drop-shadow-lg">
        {index + 1}
      </span>
    </div>
  );
}