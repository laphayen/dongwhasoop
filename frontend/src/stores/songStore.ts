import { create } from 'zustand';

interface SongState {
  currentSongId: number | null;
  setCurrentSongId: (id: number) => void;
}

export const useSongStore = create<SongState>((set) => ({
  currentSongId: null,
  setCurrentSongId: (id) => set({ currentSongId: id }),
}));