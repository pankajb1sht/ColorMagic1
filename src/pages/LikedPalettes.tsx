import React, { useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { usePaletteStore } from '../stores/paletteStore';
import { PaletteGrid } from '../components/PaletteGrid';

export default function LikedPalettes() {
  const { user } = useAuthStore();
  const { palettes, fetchLikedPalettes } = usePaletteStore();

  useEffect(() => {
    if (user) {
      fetchLikedPalettes(user.uid);
    }
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <Heart className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Liked Palettes</h2>
          <p className="mt-2 text-gray-600">
            Your collection of favorite color combinations
          </p>
        </div>

        {palettes.length > 0 ? (
          <PaletteGrid palettes={palettes} />
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Heart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No liked palettes yet</h3>
            <p className="mt-1 text-gray-500">
              Start exploring and liking palettes to build your collection
            </p>
          </div>
        )}
      </div>
    </div>
  );
}