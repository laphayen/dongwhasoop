package com.fairytale.FairyTale.domain.child.exception;

import com.fairytale.FairyTale.global.error.exception.ErrorCode;
import com.fairytale.FairyTale.global.error.exception.FairyTaleException;

public class ChildEditPermissionException extends FairyTaleException {

    public static final FairyTaleException EXCEPTION = new ChildNotFoundException();
    public ChildEditPermissionException() {
        super(ErrorCode.NOT_CHILD_EDIT_PERMISSION);
    }
}
