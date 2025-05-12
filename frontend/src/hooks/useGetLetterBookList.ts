import { useQuery } from '@tanstack/react-query';
import { getLetterBookList } from '../api/letter';
import { Book, GetBookListResponse } from '../types/letter';
import { useSelectedChild } from '../stores/useSelectedChild';

export const useGetLetterBookList = () => {
  return useQuery<GetBookListResponse['data']>({
    queryKey: ['LetterbookList'],
    queryFn: () => getLetterBookList(),
    enabled: !!useSelectedChild, // 자녀가 설정되었을 때만 실행
  });
};
