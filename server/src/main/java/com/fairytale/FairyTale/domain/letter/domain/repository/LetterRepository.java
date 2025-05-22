package com.fairytale.FairyTale.domain.letter.domain.repository;

import com.fairytale.FairyTale.domain.letter.domain.Letter;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LetterRepository extends JpaRepository<Letter, Long> {

    @Query("SELECT l FROM Letter l JOIN FETCH l.character WHERE l.letterBox.book.id = :bookId AND l.letterBox.child.user.id = :userId ORDER BY l.createdAt DESC")
    List<Letter> findLettersByBookIdAndUserId(@Param("bookId") Long bookId,
        @Param("userId") Long userId);

    Slice<Letter> findByLetterBox_Book_IdAndLetterBox_Child_IdAndMessageType(
        Long bookId, Long childId, Boolean messageType, Pageable pageable
    );
}
