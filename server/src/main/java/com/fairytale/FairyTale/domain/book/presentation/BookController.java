package com.fairytale.FairyTale.domain.book.presentation;

import com.fairytale.FairyTale.domain.book.presentation.dto.response.BookContentPostResponse;
import com.fairytale.FairyTale.domain.book.presentation.dto.response.BookListResponse;
import com.fairytale.FairyTale.domain.book.presentation.dto.response.SongResponse;
import com.fairytale.FairyTale.domain.book.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/books")
public class BookController {

    private final BookService bookService;

    @GetMapping
    public Slice<BookListResponse> getBookList(
        @RequestParam(value = "page", defaultValue = "0") Integer page,
        @RequestParam(value = "size", defaultValue = "6") Integer size
    ) {
        return bookService.getBookList(PageRequest.of(page, size));
    }

    @GetMapping("/{bookId}/song")
    public SongResponse getSong(@PathVariable Long bookId) {
        return bookService.getSong(bookId);
    }

    @PostMapping("/{bookId}/{voiceId}/content")
    public BookContentPostResponse requestTts(
        @PathVariable Long bookId,
        @PathVariable Long voiceId
    ) {
        return bookService.getBookContentIfExists(bookId, voiceId);
    }
}
