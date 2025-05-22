package com.fairytale.FairyTale.domain.letterbox.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
@Embeddable
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class LetterBoxId implements Serializable {

    @Column(name = "child_id")
    private Long childId;

    @Column(name = "book_id")
    private Long bookId;
}
