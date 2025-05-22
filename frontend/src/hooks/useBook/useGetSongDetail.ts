import { useQuery } from '@tanstack/react-query';
import { getSong } from '../../api/book';

export const useGetSong = (bookId: number) => {
  return useQuery<string>({
    queryKey: ['song', bookId], // bookId별로 캐싱
    queryFn: () => getSong(bookId),
    enabled: !!bookId, // bookId가 있을 때만 쿼리 실행
  });
};
