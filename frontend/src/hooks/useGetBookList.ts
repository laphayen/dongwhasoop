import { useQuery } from '@tanstack/react-query';
import { getBookList } from '../api/book';
import { GetBookListApiResponse } from '../types/book';

export const useGetBookList = (page = 0, size = 6) => {
  return useQuery<GetBookListApiResponse['data']>({
    queryKey: ['bookList', page, size],
    queryFn: () => getBookList(page, size),
  });
};
