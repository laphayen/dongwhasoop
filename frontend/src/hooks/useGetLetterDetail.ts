import { useQuery } from '@tanstack/react-query';
import { getLetterDetail } from '../api/letter';
import { LetterDetail, GetLetterDetailResponse } from '../types/letter';
import { useSelectedChild } from '../stores/useSelectedChild';

export const useGetLetterDetail = (letterId: string) => {
  return useQuery<GetLetterDetailResponse['data']>({
    queryKey: ['LetterDetail', letterId],
    queryFn: () => getLetterDetail(Number(letterId)),
    enabled: !!letterId,
  });
};
