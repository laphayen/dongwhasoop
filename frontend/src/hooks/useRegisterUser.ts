import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/authApi";
import { RegisterUserRequest } from "../types/auth";
import { useAppStore } from "../stores/useAppStore";

// 자녀 프로필, 목소리 등록
export const useRegisterUser = (idToken: string) => {

  return useMutation({
    mutationFn: (formData: RegisterUserRequest) =>
      registerUser(idToken, formData),
    
    onSuccess: (data) => {
      // Store tokens in localStorage
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);
    },

    onError: (error) => {
      console.error("회원가입 실패: ", error);
    },
  });
};
