import { useMutation } from '@tanstack/react-query';
import { deleteUserVoice } from '../../api/userVoice';
import { DeleteVoiceRequest } from '../../types/voice';

export const useDeleteUserVoice = () => {
  return useMutation({
    mutationFn: (data: DeleteVoiceRequest) => deleteUserVoice(data),
  });
};