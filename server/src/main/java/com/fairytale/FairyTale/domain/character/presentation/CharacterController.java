package com.fairytale.FairyTale.domain.character.presentation;

import com.fairytale.FairyTale.domain.character.presentation.dto.response.CharacterListResponse;
import com.fairytale.FairyTale.domain.character.service.CharacterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/character")
public class CharacterController {
    private final CharacterService characterService;

    @GetMapping("/{bookId}")
    public CharacterListResponse getCharactersByBookId(@PathVariable Long bookId) {
        return characterService.getCharactersByBookId(bookId);
    }

}
