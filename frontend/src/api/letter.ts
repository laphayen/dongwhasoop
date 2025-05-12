import axios from "axios";
import {
  Book,
  GetBookListResponse,
  Letter,
  Sort,
  Pageable,
  LetterSliceData,
  GetLetterListResponse,
  GetLetterDetailResponse,
  LetterResponse,
  LetterRequest,
} from "../types/letter";
import { useSelectedChild } from "../stores/useSelectedChild";
import api from "../lib/axiosInstance";

// 편지 쓰기
export const writeLetter = async (characterId: number, body: LetterRequest): Promise<LetterResponse> => {
  const response = await api.post(`/letters/${characterId}`, body);
  return response.data;
};

// 동화책 목록 조회
export const getLetterBookList = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const selectedChild = useSelectedChild.getState().selectedChild;
  console.log("선택된 자녀 id:", selectedChild?.childId);

  if (!selectedChild) {
    throw new Error("선택된 자녀가 없습니다.");
  }

  const response = await axios.get<GetBookListResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/letterboxes/${selectedChild.childId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log("편지함 조회 결과:", response.data.data);
  return response.data.data;
};

// 편지 목록 조회
export const getLetterList = async (bookId: number, messageType: boolean) => {
  const accessToken = localStorage.getItem("accessToken");
  const selectedChild = useSelectedChild.getState().selectedChild;
  console.log("선택된 자녀 id:", selectedChild?.childId);

  if (!selectedChild) {
    throw new Error("선택된 자녀가 없습니다.");
  }

  const response = await axios.get<GetLetterListResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/letters/${bookId}?childId=${
      selectedChild.childId
    }&messageType=${messageType}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log("편지 목록 조회 결과:", response.data.data);
  return response.data.data;
};

// 편지 상세 조회
export const getLetterDetail = async (letterId: number) => {
  const accessToken = localStorage.getItem("accessToken");
  const selectedChild = useSelectedChild.getState().selectedChild;
  console.log("선택된 자녀 id:", selectedChild?.childId);

  if (!selectedChild) {
    throw new Error("선택된 자녀가 없습니다.");
  }

  const response = await axios.get<GetLetterDetailResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/letters/detail/${letterId}?childId=${selectedChild.childId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log("편지 상세 조회 결과:", response.data.data);
  return response.data.data;
};
