import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { login } from "../api/authApi";
import { LoginApiResponse } from "../types/auth";
import { useAppStore } from "../stores/useAppStore";

// 로그인
export const useLogin = () => {
  const setUserProfile = useAppStore((state) => state.setUserProfile);

  return useMutation<LoginApiResponse, Error, string>({
    mutationFn: (idToken: string) => login(idToken),

    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);

      setUserProfile({
        isNew: data.data.isNew,
      });
    },

    onError: (error) => {
      // console.error("로그인 실패: ", error);
    },
  });
};
