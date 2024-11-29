import React, { useState } from 'react';
import { Shuffle, Save } from 'lucide-react';
import { ColorCard } from '../components/ColorCard';
import { useAuthStore } from '../stores/authStore';
import { usePaletteStore } from '../stores/paletteStore';
import toast from 'react-hot-toast';

function generateRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color.toLowerCase();
}

export default function RandomPalette() {
  const [colors, setColors] = useState<string[]>(Array(5).fill('').map(generateRandomColor));
  const [name, setName] = useState('');
  const { user } = useAuthStore();
  const { savePalette } = usePaletteStore();

  const generateNewPalette = () => {
    setColors(Array(5).fill('').map(generateRandomColor));
  };

  const handleSave = async () => {
    if (!user) {
      toast.error('Please login to save palettes');
      return;
    }
    if (!name) {
      toast.error('Please provide a name for your palette');
      return;
    }
    
    try {
      await savePalette(colors, name, user.uid);
      toast.success('Palette saved successfully!');
      setName('');
    } catch (error) {
      toast.error('Failed to save palette');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Random Color Palette</h2>
          <p className="mt-2 text-gray-600">
            Generate random color combinations with a single click
          </p>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={generateNewPalette}
            className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            <Shuffle className="w-5 h-5" />
            Generate New Palette
          </button>
          
          {user && (
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Palette name"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                <Save className="w-5 h-5" />
                Save
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-[400px]">
          {colors.map((color, index) => (
            <ColorCard key={color + index} color={color} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}