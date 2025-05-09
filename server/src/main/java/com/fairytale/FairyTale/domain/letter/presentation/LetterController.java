package com.fairytale.FairyTale.domain.letter.presentation;

import com.fairytale.FairyTale.domain.letter.presentation.dto.request.CreateLetterRequest;
import com.fairytale.FairyTale.domain.letter.presentation.dto.response.LetterDetailResponse;
import com.fairytale.FairyTale.domain.letter.presentation.dto.response.LetterItemResponse;
import com.fairytale.FairyTale.domain.letter.service.LetterService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/letters")
public class LetterController {

    private final LetterService letterService;

    @PostMapping("/{characterId}")
    public void sendLetterToCharacter(
        @PathVariable Long characterId,
        @RequestBody CreateLetterRequest request) {

        letterService.sendLetterToCharacter(characterId, request);
    }

    @GetMapping("/{bookId}")
    public Slice<LetterItemResponse> getLettersByBookId(@PathVariable Long bookId,
        @RequestParam Long childId,
        @RequestParam(defaultValue = "false") Boolean messageType,
        @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        return letterService.getLettersByBookId(bookId, childId, messageType, pageable);
    }

    @GetMapping("/detail/{letterId}")
    public LetterDetailResponse getLetterDetail(@PathVariable Long letterId,
        @RequestParam Long childId) {

        return letterService.getLetterDetail(letterId, childId);
    }


}
