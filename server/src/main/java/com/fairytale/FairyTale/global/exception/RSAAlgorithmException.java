package com.fairytale.FairyTale.global.exception;

import com.fairytale.FairyTale.global.error.exception.ErrorCode;
import com.fairytale.FairyTale.global.error.exception.FairyTaleException;

public class RSAAlgorithmException extends FairyTaleException {

    public static final FairyTaleException EXCEPTION = new RSAAlgorithmException();

    private RSAAlgorithmException() {
        super(ErrorCode.NO_SUCH_RSA_ALGORITHM);
    }
}
