package com.fairytale.FairyTale.domain.letterbox.domain.repository;

import com.fairytale.FairyTale.domain.letterbox.domain.LetterBox;
import com.fairytale.FairyTale.domain.letterbox.domain.LetterBoxId;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LetterBoxRepository extends JpaRepository<LetterBox, LetterBoxId> {

    @Query("SELECT lb FROM LetterBox lb JOIN FETCH lb.book WHERE lb.child.id = :childId")
    List<LetterBox> findByChildId(@Param("childId") Long childId);
}
