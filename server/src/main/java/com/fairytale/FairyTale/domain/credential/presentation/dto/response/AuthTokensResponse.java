package com.fairytale.FairyTale.domain.credential.presentation.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthTokensResponse {

    private String accessToken;
    private String refreshToken;
    private boolean isNew;
}
