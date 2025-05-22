package com.fairytale.FairyTale.domain.book.presentation.dto.response;

import com.fairytale.FairyTale.domain.book.domain.Book;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SongResponse {

    private String songUrl;

    public static SongResponse from(Book book) {
        return SongResponse.builder()
                .songUrl(book.getSongUrl())
                .build();
    }
}
