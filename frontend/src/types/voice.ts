export interface GetUserVoiceApiResponse {
  status: number;
  data: {
    voices: {
      voiceId: number;
      voiceUrl: string;
      gender: boolean | null;
      displayName: string;
      voiceType: string;
    }[];
  };
  success: boolean;
  timeStamp: string;
}
export interface UploadVoiceRequest {
  voiceFile: File; // 반드시 .wav 확장자
  gender: boolean; // true: 남자, false: 여자
}

export interface GenderCheckSuccessResponse {
  success: true;
  status: number; // e.g., 200
  data: null; // 명시적으로 null 반환
  timeStamp: string; // ISO 8601 형식
}

export interface UploadVoiceSuccessResponse {
  success: true;
  status: number;
  data: {
    voiceId: number;
  };
  timeStamp: string;
}

export interface DeleteVoiceRequest {
  gender: boolean;
}
