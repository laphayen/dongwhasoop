package com.fairytale.FairyTale.domain.letterbox.domain;

import com.fairytale.FairyTale.domain.book.domain.Book;
import com.fairytale.FairyTale.domain.child.domain.Child;
import com.fairytale.FairyTale.domain.letter.domain.Letter;
import com.fairytale.FairyTale.global.database.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Table(name = "LetterBoxes")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LetterBox extends BaseEntity {

    @EmbeddedId
    private LetterBoxId id;

    @MapsId("childId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "child_id")
    private Child child;

    @MapsId("bookId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;

    @OneToMany(mappedBy = "letterBox", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<Letter> letterList = new ArrayList<>();

    @Builder
    public LetterBox(Child child, Book book) {
        this.child = child;
        this.book = book;
        this.id = new LetterBoxId(child.getId(), book.getId());
    }
}
