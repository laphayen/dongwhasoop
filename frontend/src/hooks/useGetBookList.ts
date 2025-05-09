import { useQuery } from '@tanstack/react-query';
import { getBookList } from '../api/book';
import { GetBookListApiResponse } from '../types/book';
import { useBookStore } from '../stores/bookStore';

export const useGetBookList = () => {
  const { currentPage } = useBookStore();
  
  return useQuery<GetBookListApiResponse['data']>({
    queryKey: ['bookList', currentPage],
    queryFn: () => getBookList(currentPage, 6),
  });
};
