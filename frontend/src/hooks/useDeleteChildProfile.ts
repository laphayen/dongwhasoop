import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteChildProfile } from "../api/children";
import { useChildrenStore } from "../stores/useChildrenStore";

// 자녀 프로필 삭제
export const useDeleteChildProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, number>({
    mutationFn: (childId: number) => deleteChildProfile(childId),

    onSuccess: (_, childId) => {
      useChildrenStore.getState().removeChild(childId);
      queryClient.invalidateQueries({ queryKey: ["children"] });
    },

    onError: (error) => {
      // console.error("자녀 프로필 삭제 실패: ", error);
    },
  });
};
