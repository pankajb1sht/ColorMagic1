import { useState, useCallback } from 'react';
import { generatePaletteFromText } from '../config/ai';
import { generateRandomColor } from '../utils/colorUtils';
import { usePaletteStore } from '../stores/paletteStore';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';

export function usePalette() {
  const [colors, setColors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();
  const { savePalette } = usePaletteStore();

  const generateFromText = useCallback(async (text: string) => {
    if (!text.trim()) {
      setColors([]);
      return;
    }

    setLoading(true);
    try {
      const newColors = await generatePaletteFromText(text);
      setColors(newColors);
    } catch (error) {
      toast.error('Failed to generate palette');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const generateRandom = useCallback(() => {
    const newColors = Array(5).fill(null).map(generateRandomColor);
    setColors(newColors);
  }, []);

  const save = useCallback(async (name: string) => {
    if (!user) {
      toast.error('Please login to save palettes');
      return;
    }
    if (!name) {
      toast.error('Please provide a name for your palette');
      return;
    }
    if (colors.length === 0) {
      toast.error('Generate a palette first');
      return;
    }

    try {
      await savePalette(colors, name, user.uid);
      toast.success('Palette saved successfully!');
    } catch (error) {
      toast.error('Failed to save palette');
      console.error(error);
    }
  }, [colors, user, savePalette]);

  return {
    colors,
    loading,
    generateFromText,
    generateRandom,
    save
  };
}