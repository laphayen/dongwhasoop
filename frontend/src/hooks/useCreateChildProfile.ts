import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChildProfile } from "../api/children";
import { CreateChildRequest } from "../types/children";

// 자녀 프로필 생성
export const useCreateChildProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (childData: CreateChildRequest) => createChildProfile(childData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["children"] });
    },
    onError: (error) => {
      // console.error("자녀 프로필 생성 실패 :", error);
    },
  });
};
