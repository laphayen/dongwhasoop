package com.fairytale.FairyTale.domain.credential.presentation.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CheckRegisteredResponse {

    private Boolean isRegistered;
    private String idToken;
}
