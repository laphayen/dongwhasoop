import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Voice {
  voiceId: number;
  gender: boolean | null;
  displayName: string;
  voiceType: string;
}

interface VoiceStore {
  voices: Voice[];
  setVoices: (voices: Voice[]) => void;
  clearVoices: () => void;
}

const useVoiceStore = create<VoiceStore>()(
  persist(
    (set) => ({
      voices: [],
      setVoices: (voices) => set({ voices }),
      clearVoices: () => set({ voices: [] }),
    }),
    {
      name: 'voice-storage',
    }
  )
);

export default useVoiceStore;