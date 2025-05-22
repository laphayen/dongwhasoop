package com.fairytale.FairyTale.domain.credential.exception;

import com.fairytale.FairyTale.global.error.exception.ErrorCode;
import com.fairytale.FairyTale.global.error.exception.FairyTaleException;

public class NotNullTokenException extends FairyTaleException {

  public static final FairyTaleException EXCEPTION = new NotNullTokenException();

  private NotNullTokenException() {
    super(ErrorCode.NOT_NULL_TOKEN);
  }

}
