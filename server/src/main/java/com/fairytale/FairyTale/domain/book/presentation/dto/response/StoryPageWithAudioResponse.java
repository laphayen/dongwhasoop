package com.fairytale.FairyTale.domain.book.presentation.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class StoryPageWithAudioResponse {

    private Integer pageNumber;
    private String textContent;
    private String imageUrl;
    private String audioUrl;
}
