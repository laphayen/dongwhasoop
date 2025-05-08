import axios from "axios";
import { GetBookListApiResponse, GetSongApiResponse } from "../types/book";

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
}
export const getSong = async (bookId: number) => {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.get<GetSongApiResponse>(`${import.meta.env.VITE_API_BASE_URL}/books/${bookId}/song`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });
    return response.data.data.songUrl;  
}
