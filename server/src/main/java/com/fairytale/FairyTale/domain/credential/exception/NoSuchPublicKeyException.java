package com.fairytale.FairyTale.domain.credential.exception;

import com.fairytale.FairyTale.global.error.exception.ErrorCode;
import com.fairytale.FairyTale.global.error.exception.FairyTaleException;

public class NoSuchPublicKeyException extends FairyTaleException {

  public static final FairyTaleException EXCEPTION = new NoSuchPublicKeyException();

  private NoSuchPublicKeyException() {
    super(ErrorCode.NO_SUCH_PUBLIC_KEY);
  }
}
