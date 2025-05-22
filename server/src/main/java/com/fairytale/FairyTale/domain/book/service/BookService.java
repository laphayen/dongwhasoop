package com.fairytale.FairyTale.domain.book.service;

import com.fairytale.FairyTale.domain.book.presentation.dto.response.BookContentPostResponse;
import com.fairytale.FairyTale.domain.book.presentation.dto.response.BookListResponse;
import com.fairytale.FairyTale.domain.book.presentation.dto.response.SongResponse;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;

public interface BookService {

    Slice<BookListResponse> getBookList(PageRequest pageRequest);

    SongResponse getSong(Long bookId);

    BookContentPostResponse getBookContentIfExists(Long bookId, Long voiceId);
}
