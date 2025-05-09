import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Child {
  childId: number;
  childName: string;
  mascotId: number;
}

interface SelectedChildStore {
  selectedChild: Child | null;
  setSelectedChild: (child: Child) => void;
}

export const useSelectedChild = create<SelectedChildStore>()(
  persist(
    (set) => ({
      selectedChild: null,
      setSelectedChild: (child) => set({ selectedChild: child }),
    }),
    {
      name: "selected-child",
      partialize: (state) => ({ selectedChild: state.selectedChild }),
    }
  )
);
