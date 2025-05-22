import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../api/authApi";
import { useAppStore } from "../stores/useAppStore";

// 회원 탈퇴
export const useDeleteUser = () => {
  const resetStore = useAppStore.getState();

  return useMutation({
    mutationFn: (code: string) => deleteUser(code),

    onSuccess: () => {
      localStorage.clear();
      resetStore.setSelectedChildId(null);
      resetStore.setUserProfile(null);
    },
  });
};
