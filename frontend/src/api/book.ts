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
  return response.data.data.songUrl;
};

//post
export const getBookContent = async (bookId: number, voiceId: number): Promise<GetBookContentResponse['data']> => {
  const accessToken = localStorage.getItem("accessToken");

  // 웹소켓 연결
  const ws = new WebSocket(
    `${
      import.meta.env.VITE_WS_BASE_URL
    }/api/v1/ws/tts-progress?token=${accessToken}`
  );

  // 웹소켓 연결 Promise
  const socketPromise = new Promise<GetBookContentResponse['data']>((resolve, reject) => {
    ws.onopen = () => {
      console.log("WebSocket Connected");
    };

    ws.onmessage = (event) => {
      console.log("Progress:", event.data);
    };

    ws.onerror = (error) => {
      reject(error);
    };

    // 웹소켓이 연결되면 POST 요청 실행
    ws.onopen = async () => {
      try {
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

        ws.close();
        resolve(response.data.data);
      } catch (error) {
        ws.close();
        reject(error);
      }
    };
  });

  return socketPromise;
};
