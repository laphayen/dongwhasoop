package com.fairytale.FairyTale.domain.book.exception;

import com.fairytale.FairyTale.domain.child.exception.ChildNotFoundException;
import com.fairytale.FairyTale.global.error.exception.ErrorCode;
import com.fairytale.FairyTale.global.error.exception.FairyTaleException;

public class NotFoundBookException extends FairyTaleException {

    public static final FairyTaleException EXCEPTION = new NotFoundBookException();
    public NotFoundBookException() {
        super(ErrorCode.BOOK_NOT_FOUND);
    }
}
