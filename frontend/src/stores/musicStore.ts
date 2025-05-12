import { create } from 'zustand';
import btnSound from '../assets/music/btn_sound.mp3';

interface MusicState {
  isPlaying: boolean;
  togglePlay: () => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  isPlaying: false,
  togglePlay: () => {
    const sound = new Audio(btnSound);
    sound.play();
    set((state) => ({ isPlaying: !state.isPlaying }));
  },
}));