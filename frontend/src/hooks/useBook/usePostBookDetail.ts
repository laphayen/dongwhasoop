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
      console.log("Mutation success:", data);
      if (data?.completed && data.pages) {
        const uniquePages = Array.from(
          new Map(data.pages.map(page => [page.pageNumber, page])).values()
        );
        setBookPages(uniquePages);
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });
};
