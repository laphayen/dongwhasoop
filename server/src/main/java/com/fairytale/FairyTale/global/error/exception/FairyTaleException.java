package com.fairytale.FairyTale.global.error.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FairyTaleException extends RuntimeException {

  private ErrorCode errorCode;
}
