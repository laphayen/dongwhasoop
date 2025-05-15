import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/authApi";
import { RegisterUserRequest } from "../types/auth";

// 자녀 프로필, 목소리 등록
export const useRegisterUser = (idToken: string) => {
  if (!idToken) {
    console.error("No idToken provided to useRegisterUser");
  }
  
  return useMutation({
    mutationFn: (formData: RegisterUserRequest) => registerUser(idToken, formData),
  });
};
