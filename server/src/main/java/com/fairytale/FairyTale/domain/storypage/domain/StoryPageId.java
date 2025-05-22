package com.fairytale.FairyTale.domain.storypage.domain;

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
public class StoryPageId implements Serializable {

    @Column(name = "page_number")
    private Integer pageNumber;

    @Column(name = "book_id")
    private Long bookId;
}
