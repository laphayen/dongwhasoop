import { useMutation } from "@tanstack/react-query";
import { getBookContent } from "../../api/book";  // 경로 수정
import { GetBookContentResponse } from "../../types/book";  // 경로 수정
import { useBookStore } from "../../stores/bookStore";  // 경로 수정

interface BookContentParams {
  bookId: number;
  voiceId: number;
}

export const usePostBookDetail = () => {
  const { setBookPages } = useBookStore();

  return useMutation<GetBookContentResponse["data"], Error, BookContentParams>({
    mutationFn: ({ bookId, voiceId }) => getBookContent(bookId, voiceId),
    onSuccess: (data) => {
      if (data?.completed && data.pages) {
        setBookPages(data.pages);
      }
      console.log("Book content loaded:", data);
    },
    onError: (error) => {
      console.error("Failed to load book content:", error);
    },
  });
};
