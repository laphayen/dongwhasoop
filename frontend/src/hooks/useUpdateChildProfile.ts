import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateChildProfile } from "../api/children";
import { UpdateChildRequest } from "../types/children";
import { useChildrenStore } from "../stores/useChildrenStore";

// 자녀 프로필 업데이트
export const useUpdateChildProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ childId, updateData }: { childId: number; updateData: UpdateChildRequest }) =>
      updateChildProfile(childId, updateData),

    onSuccess: (_, { childId, updateData }) => {
      useChildrenStore.getState().updateChild(childId, updateData);
      queryClient.invalidateQueries({ queryKey: ["children"] });
    },

    onError: (error) => {
      console.error("자녀 수정 실패 :", error);
    },
  });
};
