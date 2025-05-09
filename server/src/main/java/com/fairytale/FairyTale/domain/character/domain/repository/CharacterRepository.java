package com.fairytale.FairyTale.domain.character.domain.repository;

import com.fairytale.FairyTale.domain.character.domain.Character;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CharacterRepository extends JpaRepository<Character, Long> {
    List<Character> findByBookId(Long bookId);
}
