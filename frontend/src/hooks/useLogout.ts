import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/authApi";
import { useAppStore } from "../stores/useAppStore";

// 로그아웃
export const useLogout = () => {
  const resetStore = useAppStore.getState();

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      resetStore.setSelectedChildId(null);
      resetStore.setUserProfile(null);
    },
  });
};
