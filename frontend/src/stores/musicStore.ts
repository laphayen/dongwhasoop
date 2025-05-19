import { create } from 'zustand';
import btnSound from '../assets/music/btn_sound.mp3';

interface MusicState {
  isPlaying: boolean;
  volume: number;
  setVolume: (volume: number) => void;
  togglePlay: () => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  isPlaying: false,
  volume: 1,
  setVolume: (volume) => set({ volume }),
  togglePlay: () => {
    const sound = new Audio(btnSound);
    sound.play();
    set((state) => ({ isPlaying: !state.isPlaying }));
  },
}));