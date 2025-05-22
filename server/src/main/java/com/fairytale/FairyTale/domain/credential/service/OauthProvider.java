package com.fairytale.FairyTale.domain.credential.service;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum OauthProvider {

    KAKAO("KAKAO");

    private String oauthProvider;

    @JsonValue
    public String getValue() {
        return oauthProvider;
    }
}
