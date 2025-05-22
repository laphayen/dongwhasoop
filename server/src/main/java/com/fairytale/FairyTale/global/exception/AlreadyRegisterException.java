package com.fairytale.FairyTale.global.exception;

import com.fairytale.FairyTale.global.error.exception.ErrorCode;
import com.fairytale.FairyTale.global.error.exception.FairyTaleException;

public class AlreadyRegisterException extends FairyTaleException {

  public static final FairyTaleException EXCEPTION = new AlreadyRegisterException();

  private AlreadyRegisterException() {
    super(ErrorCode.AlREADY_REGISTER);
  }
}
