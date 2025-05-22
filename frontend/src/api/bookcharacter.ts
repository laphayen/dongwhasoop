import api from "../lib/axiosInstance";
import { BookCharacterRead } from "../types/bookcharacter";

export const getBookCharacter = async (characterId: number): Promise<BookCharacterRead> => {
  const response = await api.get(`/character/${characterId}`);
  return response.data;
};
