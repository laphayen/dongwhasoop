package com.fairytale.FairyTale.domain.pageaudio.domain;

import com.fairytale.FairyTale.domain.book.domain.Book;
import com.fairytale.FairyTale.domain.storypage.domain.StoryPage;
import com.fairytale.FairyTale.domain.uservoice.domain.UserVoice;
import com.fairytale.FairyTale.global.database.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "PageAudios")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PageAudio extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "audio_id")
    private Long id;

    @Column(name = "audio_url")
    private String audioUrl;

    @Column(name = "voice_url")
    private String voiceUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "voice_id")
    private UserVoice userVoice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "page_number", referencedColumnName = "page_number"),
            @JoinColumn(name = "book_id", referencedColumnName = "book_id")
    })
    private StoryPage storyPage;

    @Builder
    public PageAudio(String audioUrl, String voiceUrl, UserVoice uservoice, StoryPage storyPage) {
        this.audioUrl = audioUrl;
        this.voiceUrl = voiceUrl;
        this.userVoice = uservoice;
        this.storyPage = storyPage;
    }
}
