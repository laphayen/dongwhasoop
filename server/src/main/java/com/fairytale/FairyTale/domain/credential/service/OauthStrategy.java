package com.fairytale.FairyTale.domain.credential.service;

import com.fairytale.FairyTale.domain.credential.presentation.dto.request.UnlinkRequest;
import com.fairytale.FairyTale.domain.credential.presentation.dto.response.OauthTokenInfoDto;
import com.fairytale.FairyTale.global.api.dto.response.UserInfoToOauthDto;

public interface OauthStrategy {

    OIDCDecodePayload getOIDCDecodePayload(String token);
    String getOauthLink();
    OauthTokenInfoDto getOauthToken(String code);
    UserInfoToOauthDto getUserInfo(String oauthAccessToken);
    void unLink(UnlinkRequest unlinkRequest);
}
