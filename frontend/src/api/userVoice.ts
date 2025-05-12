import axios from "axios";
import { GetUserVoiceApiResponse, UploadVoiceRequest, UploadVoiceSuccessResponse, DeleteVoiceRequest, GenderCheckSuccessResponse } from "../types/voice";

// get
export const getUserVoices = async (): Promise<GetUserVoiceApiResponse> => {
    const accessToken = localStorage.getItem("accessToken");
    
    const response = await axios.get<GetUserVoiceApiResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/user-voice`,
    {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        }
    }
  );
  return response.data;
};

// post
export const postUserVoice = async (data: UploadVoiceRequest): Promise<UploadVoiceSuccessResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  
  const formData = new FormData();
  formData.append("voiceFile", data.voiceFile);
  formData.append("gender", String(data.gender));

  const response = await axios.post<UploadVoiceSuccessResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/user-voice`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      }
    }
  );
  return response.data;
};

// delete
export const deleteUserVoice = async (data: DeleteVoiceRequest): Promise<GenderCheckSuccessResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  
  const response = await axios.delete<GenderCheckSuccessResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/user-voice`,
    {
      data: { gender: data.gender },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
    }
  );
  return response.data;
};

