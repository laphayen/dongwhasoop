import { useQuery } from '@tanstack/react-query';
import { getUserVoices } from '../../api/userVoice';
import { GetUserVoiceApiResponse } from '../../types/voice';

export const useGetUserVoice = () => {
  return useQuery<GetUserVoiceApiResponse>({
    queryKey: ['userVoices'],
    queryFn: getUserVoices,
  });
};
//이거 스토어에 저장하는거 컴포넌트에서 진행해야함.