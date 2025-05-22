package com.fairytale.FairyTale.domain.storyinteraction.domain;

import com.fairytale.FairyTale.domain.storypage.domain.StoryPage;
import com.fairytale.FairyTale.global.database.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "StoryInteractions")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StoryInteraction extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "interaction_id")
    private Long id;

    @Column(name = "question")
    private String question;

    @Column(name = "question_number")
    private Integer questionNumber;

    @OneToOne
    @JoinColumns({
            @JoinColumn(name = "page_number", referencedColumnName = "page_number"),
            @JoinColumn(name = "book_id", referencedColumnName = "book_id")
    })
    private StoryPage storyPage;

    @Builder
    public StoryInteraction(String question, Integer questionNumber, StoryPage storyPage) {
        this.question = question;
        this.questionNumber = questionNumber;
        this.storyPage = storyPage;
    }
}
