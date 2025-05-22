package com.fairytale.FairyTale.global.exception;

import com.fairytale.FairyTale.global.error.exception.ErrorCode;
import com.fairytale.FairyTale.global.error.exception.FairyTaleException;

public class UnauthorizedException extends FairyTaleException {

    public static final FairyTaleException EXCEPTION = new UnauthorizedException();

    private UnauthorizedException() {
        super(ErrorCode.NECESSARY_LOGIN);
    }
}
