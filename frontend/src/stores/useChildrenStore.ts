import { create } from "zustand";
import { ChildProfile, UpdateChildRequest } from "../types/children";

interface ChildrenState {
  children: ChildProfile[];
  setChildren: (children: ChildProfile[]) => void;
  addChild: (child: ChildProfile) => void;
  updateChild: (childId: number, updateData: UpdateChildRequest) => void;
  removeChild: (childId: number) => void;
}

export const useChildrenStore = create<ChildrenState>((set) => ({
  children: [],
  setChildren: (children) => set({ children }),

  // 자녀 추가
  addChild: (child) =>
    set((state) => ({
      children: [...state.children, child],
    })),

  // 자녀 수정
  updateChild: (childId, updateData) =>
    set((state) => ({
      children: state.children.map((c) => (c.childId === childId ? { ...c, ...updateData } : c)),
    })),

  // 자녀 삭제
  removeChild: (childId) =>
    set((state) => ({
      children: state.children.filter((c) => c.childId !== childId),
    })),
}));
