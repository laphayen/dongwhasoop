package com.fairytale.FairyTale.domain.character.presentation.dto.response;

import com.fairytale.FairyTale.domain.character.domain.Character;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CharacterListResponse {

    private String message;
    private List<CharacterDto> character;

    public static CharacterListResponse from(List<Character> characters) {
        List<CharacterDto> characterDtoList = characters.stream()
            .map(CharacterDto::from)
            .toList();

        return CharacterListResponse.builder()
            .message("캐릭터를 불러왔습니다.")
            .character(characterDtoList)
            .build();
    }

    @Getter
    @Builder
    public static class CharacterDto {
        private Long character_id;
        private String name;

        public static CharacterDto from(Character character) {
            return CharacterDto.builder()
                .character_id(character.getId())
                .name(character.getName())
                .build();
        }
    }
}