import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Palette, Heart, Users } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { usePaletteStore } from '../stores/paletteStore';
import { PaletteGrid } from '../components/PaletteGrid';

export default function Profile() {
  const { userId } = useParams();
  const { user } = useAuthStore();
  const { palettes, fetchUserPalettes } = usePaletteStore();
  const [activeTab, setActiveTab] = useState<'created' | 'liked'>('created');

  useEffect(() => {
    if (userId) {
      fetchUserPalettes(userId);
    }
  }, [userId]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
              <Users className="w-10 h-10 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {user?.email?.split('@')[0]}'s Profile
              </h1>
              <p className="text-gray-500">Member since {user?.metadata.creationTime}</p>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 mb-8">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('created')}
              className={`pb-4 relative ${
                activeTab === 'created'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                <span>Created Palettes</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('liked')}
              className={`pb-4 relative ${
                activeTab === 'liked'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span>Liked Palettes</span>
              </div>
            </button>
          </nav>
        </div>

        <PaletteGrid palettes={palettes} />
      </div>
    </div>
  );
}