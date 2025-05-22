package com.fairytale.FairyTale.domain.book.domain;

import com.fairytale.FairyTale.domain.character.domain.Character;
import com.fairytale.FairyTale.domain.letterbox.domain.LetterBox;
import com.fairytale.FairyTale.domain.pageaudio.domain.PageAudio;
import com.fairytale.FairyTale.domain.storypage.domain.StoryPage;
import com.fairytale.FairyTale.global.database.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Table(name = "Books")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Book extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "thumbnail_url")
    private String thumbnailUrl;

    @Column(name = "song_url")
    private String songUrl;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private final List<Character> characterList = new ArrayList<>();

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private final List<StoryPage> storyPageList = new ArrayList<>();

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private final List<LetterBox> letterBoxeList = new ArrayList<>();

    @Builder
    public Book(String title, String thumbnailUrl, String songUrl) {
        this.title = title;
        this.thumbnailUrl = thumbnailUrl;
        this.songUrl = songUrl;
    }
}
