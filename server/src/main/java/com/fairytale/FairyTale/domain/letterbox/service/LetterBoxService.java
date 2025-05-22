package com.fairytale.FairyTale.domain.letterbox.service;

import com.fairytale.FairyTale.domain.letterbox.presentation.dto.response.LetterBoxResponse;

public interface LetterBoxService {
    LetterBoxResponse getLetterBoxesByChildId(Long childId);
}
