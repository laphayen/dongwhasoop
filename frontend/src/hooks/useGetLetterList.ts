import { useQuery } from '@tanstack/react-query';
import { getLetterList } from '../api/letter';
import { GetLetterListResponse } from '../types/letter';
import { useSelectedChild } from '../stores/useSelectedChild';

export const useGetLetterList = (bookId: number, messageType: boolean) => {
    return useQuery<GetLetterListResponse['data']>({
      queryKey: ['LetterList', bookId, messageType],
      queryFn: () => getLetterList(bookId, messageType),
      enabled: !!useSelectedChild && !!bookId,
    });
};