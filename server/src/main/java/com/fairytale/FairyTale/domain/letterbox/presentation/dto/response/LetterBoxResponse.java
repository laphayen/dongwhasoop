package com.fairytale.FairyTale.domain.letterbox.presentation.dto.response;

import com.fairytale.FairyTale.domain.book.domain.Book;
import com.fairytale.FairyTale.domain.letterbox.domain.LetterBox;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LetterBoxResponse {

    private String message;
    private LetterBoxData data;

    @Getter
    @Builder
    public static class LetterBoxData {
        private List<BookDto> book;
    }

    @Getter
    @Builder
    public static class BookDto {
        private Long book_id;
        private String title;

        public static BookDto from(Book book) {
            return BookDto.builder()
                .book_id(book.getId())
                .title(book.getTitle())
                .build();
        }
    }

    public static LetterBoxResponse from(List<LetterBox> letterBoxes) {
        List<BookDto> bookDtoList = letterBoxes.stream()
            .map(letterBox -> BookDto.from(letterBox.getBook()))
            .toList();

        LetterBoxData data = LetterBoxData.builder()
            .book(bookDtoList)
            .build();

        return LetterBoxResponse.builder()
            .message("편지함이 조회 되었습니다.")
            .data(data)
            .build();
    }
}
