package com.fairytale.FairyTale.domain.letter.presentation.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CreateLetterRequest {
    private String content;
    private Long childId; // 어떤 아이를 위한 편지인지
}