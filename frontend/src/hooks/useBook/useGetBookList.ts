import { useQuery } from '@tanstack/react-query';
import { getBookList } from '../../api/book';  // 경로 수정
import { GetBookListApiResponse } from '../../types/book';  // 경로 수정
import { useBookStore } from '../../stores/bookStore';  // 경로 수정

export const useGetBookList = () => {
  const { currentPage } = useBookStore();
  
  return useQuery<GetBookListApiResponse['data']>({
    queryKey: ['bookList', currentPage],
    queryFn: () => getBookList(currentPage, 6),
  });
};
