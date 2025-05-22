package com.fairytale.FairyTale.domain.book.domain.repository;

import com.fairytale.FairyTale.domain.book.domain.Book;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BookRepository extends JpaRepository<Book, Long> {

    @Query("SELECT b FROM Book b")
    Slice<Book> findAllBooks(Pageable pageable);
}
