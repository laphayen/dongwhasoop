export interface Character {
  character_id: number;
  name: string;
}

export interface BookCharacterRead {
  status: number;
  success: boolean;
  timeStamp: string;
  data: {
    message: string;
    character: Character[];
  };
}
