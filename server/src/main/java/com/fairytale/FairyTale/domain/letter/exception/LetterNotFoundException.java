package com.fairytale.FairyTale.domain.letter.exception;

import com.fairytale.FairyTale.global.error.exception.ErrorCode;
import com.fairytale.FairyTale.global.error.exception.FairyTaleException;

public class LetterNotFoundException extends FairyTaleException {

    public static final FairyTaleException EXCEPTION = new LetterNotFoundException();

    public LetterNotFoundException() {
        super(ErrorCode.LETTER_NOT_FOUND);
    }

    public LetterNotFoundException(String message) {
        super(ErrorCode.LETTER_NOT_FOUND);
    }
}
