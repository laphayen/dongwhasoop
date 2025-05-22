package com.fairytale.FairyTale.domain.character.service;

import com.fairytale.FairyTale.domain.character.presentation.dto.response.CharacterListResponse;

public interface CharacterService {
    CharacterListResponse getCharactersByBookId(Long bookId);
}
