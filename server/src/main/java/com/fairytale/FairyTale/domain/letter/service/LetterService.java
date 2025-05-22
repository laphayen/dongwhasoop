package com.fairytale.FairyTale.domain.letter.service;

import com.fairytale.FairyTale.domain.letter.presentation.dto.request.CreateLetterRequest;
import com.fairytale.FairyTale.domain.letter.presentation.dto.response.LetterDetailResponse;
import com.fairytale.FairyTale.domain.letter.presentation.dto.response.LetterItemResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface LetterService {

    void sendLetterToCharacter(Long characterId, CreateLetterRequest request);

    Slice<LetterItemResponse> getLettersByBookId(Long bookId, Long childId, Boolean messageType,
        Pageable pageable);

    LetterDetailResponse getLetterDetail(Long letterId, Long childId);
}
