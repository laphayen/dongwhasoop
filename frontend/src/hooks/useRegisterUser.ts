import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/authApi";
import { RegisterUserRequest } from "../types/auth";
import { useAppStore } from "../stores/useAppStore";

// 자녀 프로필, 목소리 등록
export const useRegisterUser = (idToken: string) => {
  const setUserProfile = useAppStore((state) => state.setUserProfile);

  return useMutation({
    mutationFn: (formData: RegisterUserRequest) =>
      registerUser(idToken, formData),
    
    onSuccess: (data) => {
      // Store tokens in localStorage
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);

      // Update user profile
      setUserProfile({
        isNew: false,  // Since they just registered, they're no longer new
      });
    },

    onError: (error) => {
      console.error("회원가입 실패: ", error);
    },
  });
};
