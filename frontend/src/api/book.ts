import axios from "axios";
import { GetBookListApiResponse, GetSongApiResponse, GetBookContentResponse } from "../types/book";

//get
export const getBookList = async (page = 0, size = 6) => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await axios.get<GetBookListApiResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/books?page=${page}&size=${size}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data;
};

//get
export const getSong = async (bookId: number) => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await axios.get<GetSongApiResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/books/${bookId}/song`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response.data.data)
  return response.data.data.songUrl;
};

//post
export const getBookContent = async (bookId: number, voiceId: number): Promise<GetBookContentResponse['data']> => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await axios.post<GetBookContentResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/books/${bookId}/${voiceId}/content`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  
  return response.data.data;
};
