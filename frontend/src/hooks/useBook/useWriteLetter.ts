import { useMutation, useQueryClient } from "@tanstack/react-query";
import { writeLetter } from "../../api/letter";
import { LetterRequest, LetterResponse } from "../../types/letter";

interface MutationParams {
  characterId: number;
  body: LetterRequest;
}

export const useWriteLetter = () => {
  const queryClient = useQueryClient();

  return useMutation<LetterResponse, Error, MutationParams>({
    mutationFn: ({ characterId, body }) => writeLetter(characterId, body),
    onSuccess: () => {
      // console.log("편지 전송 성공!");
      // 필요한 경우 쿼리 무효화도 가능
      // queryClient.invalidateQueries({ queryKey: ["letters"] });
    },
    onError: (error) => {
      // console.error("편지 전송 실패:", error);
    },
  });
};
