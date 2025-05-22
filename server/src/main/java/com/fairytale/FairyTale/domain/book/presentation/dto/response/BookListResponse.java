package com.fairytale.FairyTale.domain.book.presentation.dto.response;

import com.fairytale.FairyTale.domain.book.domain.Book;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class BookListResponse {

    private Long bookId;
    private String title;
    private String imageUrl;

    public static BookListResponse from(Book book) {
        return BookListResponse.builder()
                .bookId(book.getId())
                .title(book.getTitle())
                .imageUrl(book.getThumbnailUrl())
                .build();
    }
}
