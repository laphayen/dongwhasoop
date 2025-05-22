package com.fairytale.FairyTale.domain.letter.domain;

import com.fairytale.FairyTale.domain.character.domain.Character;
import com.fairytale.FairyTale.domain.letterbox.domain.LetterBox;
import com.fairytale.FairyTale.global.database.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "Letters")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Letter extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "letter_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
        @JoinColumn(name = "child_id", referencedColumnName = "child_id"),
        @JoinColumn(name = "book_id", referencedColumnName = "book_id")
    })
    private LetterBox letterBox;

    @Column(name = "letter_content", length = 10000)
    private String letterContent;

    @Column(name = "is_read")
    private Boolean isRead;

    @Column(name = "message_type", nullable = false, columnDefinition = "TINYINT(1) COMMENT '0 = receive(답장), 1 = send(보낸편지)'")
    private Boolean messageType;

    @Column(name = "audio_url")
    private String audioUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "character_id")
    private Character character;


    @Builder
    public Letter(LetterBox letterBox, String letterContent, Boolean isRead, Character character) {
        this.letterBox = letterBox;
        this.letterContent = letterContent;
        this.isRead = isRead;
        this.character = character;
        messageType = true;
    }

    public void setIsRead(Boolean isRead) {
        this.isRead = isRead;
    }
}
