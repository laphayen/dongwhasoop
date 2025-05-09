package com.fairytale.FairyTale.domain.character.service;

import com.fairytale.FairyTale.domain.book.domain.Book;
import com.fairytale.FairyTale.domain.book.domain.repository.BookRepository;
import com.fairytale.FairyTale.domain.book.exception.NotFoundBookException;
import com.fairytale.FairyTale.domain.character.domain.Character;
import com.fairytale.FairyTale.domain.character.presentation.dto.response.CharacterListResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CharacterServiceImpl implements CharacterService {

    private final BookRepository bookRepository;

    @Override
    public CharacterListResponse getCharactersByBookId(Long bookId) {

        // 책이 존재하는지 확인
        Book book = bookRepository.findById(bookId)
            .orElseThrow(() -> NotFoundBookException.EXCEPTION);

        // 책에 속한 캐릭터 목록 조회
        List<Character> characters = book.getCharacterList();

        return CharacterListResponse.from(characters);
    }
}
