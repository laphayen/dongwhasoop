package com.fairytale.FairyTale.global.exception;

import com.fairytale.FairyTale.global.error.exception.ErrorCode;
import com.fairytale.FairyTale.global.error.exception.FairyTaleException;

public class ExpiredTokenException extends FairyTaleException {

    public static final FairyTaleException EXCEPTION = new ExpiredTokenException();

    public ExpiredTokenException() {
        super(ErrorCode.EXPIRED_TOKEN);
    }
}
