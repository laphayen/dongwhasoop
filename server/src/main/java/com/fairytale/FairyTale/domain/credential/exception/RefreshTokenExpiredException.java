package com.fairytale.FairyTale.domain.credential.exception;

import com.fairytale.FairyTale.global.error.exception.ErrorCode;
import com.fairytale.FairyTale.global.error.exception.FairyTaleException;

public class RefreshTokenExpiredException extends FairyTaleException {

  public static final FairyTaleException EXCEPTION = new RefreshTokenExpiredException();

  private RefreshTokenExpiredException() {
    super(ErrorCode.REFRESH_TOKEN_EXPIRED_TOKEN);
  }
}
