import { useMutation } from '@tanstack/react-query';
import { postUserVoice } from '../../api/userVoice';
import { UploadVoiceRequest } from '../../types/voice';

export const usePostUserVoice = () => {
  return useMutation({
    mutationFn: (data: UploadVoiceRequest) => postUserVoice(data),
  });
};