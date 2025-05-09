package com.fairytale.FairyTale.domain.letterbox.presentation;

import com.fairytale.FairyTale.domain.letterbox.presentation.dto.response.LetterBoxResponse;
import com.fairytale.FairyTale.domain.letterbox.service.LetterBoxService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/letterboxes")
public class LetterBoxController {

    private final LetterBoxService letterBoxService;

    @GetMapping("/{childId}")
    public LetterBoxResponse getLetterBoxesByChildId(@PathVariable Long childId) {
        return letterBoxService.getLetterBoxesByChildId(childId);
    }
}
