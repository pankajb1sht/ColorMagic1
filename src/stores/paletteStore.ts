import { create } from 'zustand';
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';

interface Palette {
  id: string;
  colors: string[];
  createdBy: string;
  likes: number;
  likedBy: string[];
  name: string;
  createdAt: Date;
}

interface PaletteState {
  palettes: Palette[];
  loading: boolean;
  error: string | null;
  savePalette: (colors: string[], name: string, userId: string) => Promise<void>;
  likePalette: (paletteId: string, userId: string) => Promise<void>;
  fetchUserPalettes: (userId: string) => Promise<void>;
  fetchLikedPalettes: (userId: string) => Promise<void>;
}

export const usePaletteStore = create<PaletteState>((set, get) => ({
  palettes: [],
  loading: false,
  error: null,
  savePalette: async (colors, name, userId) => {
    set({ loading: true, error: null });
    try {
      await addDoc(collection(db, 'palettes'), {
        colors,
        name,
        createdBy: userId,
        likes: 0,
        likedBy: [],
        createdAt: new Date()
      });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
  likePalette: async (paletteId, userId) => {
    set({ loading: true, error: null });
    try {
      const paletteRef = doc(db, 'palettes', paletteId);
      const palette = get().palettes.find(p => p.id === paletteId);
      if (palette) {
        const newLikedBy = palette.likedBy.includes(userId)
          ? palette.likedBy.filter(id => id !== userId)
          : [...palette.likedBy, userId];
        
        await updateDoc(paletteRef, {
          likes: newLikedBy.length,
          likedBy: newLikedBy
        });
      }
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
  fetchUserPalettes: async (userId) => {
    set({ loading: true, error: null });
    try {
      const q = query(collection(db, 'palettes'), where('createdBy', '==', userId));
      const querySnapshot = await getDocs(q);
      const palettes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Palette[];
      set({ palettes });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
  fetchLikedPalettes: async (userId) => {
    set({ loading: true, error: null });
    try {
      const q = query(collection(db, 'palettes'), where('likedBy', 'array-contains', userId));
      const querySnapshot = await getDocs(q);
      const palettes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Palette[];
      set({ palettes });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  }
}));