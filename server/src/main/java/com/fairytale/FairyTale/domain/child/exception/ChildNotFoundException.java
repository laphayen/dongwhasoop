package com.fairytale.FairyTale.domain.child.exception;

import com.fairytale.FairyTale.global.error.exception.ErrorCode;
import com.fairytale.FairyTale.global.error.exception.FairyTaleException;

public class ChildNotFoundException extends FairyTaleException {

    public static final FairyTaleException EXCEPTION = new ChildNotFoundException();
    public ChildNotFoundException() {
        super(ErrorCode.CHILD_NOT_FOUND);
    }
}
