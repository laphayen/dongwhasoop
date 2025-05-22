package com.fairytale.FairyTale.domain.credential.exception;

import com.fairytale.FairyTale.global.error.exception.ErrorCode;
import com.fairytale.FairyTale.global.error.exception.FairyTaleException;

public class UserIdMismatchException extends FairyTaleException {

  public static final FairyTaleException EXCEPTION = new UserIdMismatchException();

  private UserIdMismatchException() {
    super(ErrorCode.MISMATCH_USER_OAUTH_ID);
  }
}
