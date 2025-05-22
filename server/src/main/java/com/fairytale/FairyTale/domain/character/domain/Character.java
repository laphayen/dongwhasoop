package com.fairytale.FairyTale.domain.character.domain;

import com.fairytale.FairyTale.domain.book.domain.Book;
import com.fairytale.FairyTale.domain.letter.domain.Letter;
import com.fairytale.FairyTale.global.database.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "Characters")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Character extends BaseEntity {

    @OneToMany(mappedBy = "character", cascade = CascadeType.ALL)
    private final List<Letter> letterList = new ArrayList<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "character_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;

    @Column(name = "name")
    private String name;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "ai_prompt")
    private String aiPrompt;

    @Column(name = "voice_type_id")
    private Integer voiceTypeId;

    @Builder
    public Character(Book book, String name, String imageUrl, String aiPrompt) {
        this.book = book;
        this.name = name;
        this.imageUrl = imageUrl;
        this.aiPrompt = aiPrompt;
    }
}
