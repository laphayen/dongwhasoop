package com.fairytale.FairyTale.domain.letter.presentation.dto.response;

import com.fairytale.FairyTale.domain.letter.domain.Letter;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LetterItemResponse {

    private Long letter_id;
    private Long character_id;
    private String character_name;
    private String character_image_url;
    private Boolean is_read;
    private LocalDateTime created_at;
    private Boolean messageType;

    public static LetterItemResponse from(Letter letter) {
        return LetterItemResponse.builder()
            .letter_id(letter.getId())
            .character_id(letter.getCharacter().getId())
            .character_name(letter.getCharacter().getName())
            .character_image_url(letter.getCharacter().getImageUrl())
            .is_read(letter.getIsRead())
            .created_at(letter.getCreatedAt())
            .messageType(letter.getMessageType())
            .build();
    }

}
