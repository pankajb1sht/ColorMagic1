import React from 'react';
import { Heart } from 'lucide-react';
import { ColorCard } from './ColorCard';
import { useAuthStore } from '../stores/authStore';
import { usePaletteStore } from '../stores/paletteStore';

interface PaletteGridProps {
  palettes: Array<{
    id: string;
    colors: string[];
    name: string;
    likes: number;
    likedBy: string[];
    createdBy: string;
  }>;
}

export function PaletteGrid({ palettes }: PaletteGridProps) {
  const { user } = useAuthStore();
  const { likePalette } = usePaletteStore();

  const handleLike = async (paletteId: string) => {
    if (!user) return;
    await likePalette(paletteId, user.uid);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {palettes.map((palette) => (
        <div key={palette.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-5 h-32">
            {palette.colors.map((color, index) => (
              <ColorCard key={`${palette.id}-${color}-${index}`} color={color} index={index} />
            ))}
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">{palette.name}</h3>
              <button
                onClick={() => handleLike(palette.id)}
                className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${
                    user && palette.likedBy.includes(user.uid)
                      ? 'fill-red-500 text-red-500'
                      : ''
                  }`}
                />
                <span>{palette.likes}</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}