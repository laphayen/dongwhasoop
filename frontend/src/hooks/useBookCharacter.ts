import { useQuery } from "@tanstack/react-query";
import { getBookCharacter } from "../api/bookcharacter";
import { BookCharacterRead } from "../types/bookcharacter";

export const useBookCharacter = (characterId: number) => {
  return useQuery<BookCharacterRead>({
    queryKey: ["book-character", characterId],
    queryFn: () => getBookCharacter(characterId),
    enabled: !!characterId,
  });
};
