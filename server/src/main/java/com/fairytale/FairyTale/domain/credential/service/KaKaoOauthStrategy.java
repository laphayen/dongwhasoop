package com.fairytale.FairyTale.domain.credential.service;

import com.fairytale.FairyTale.domain.credential.exception.NotNullTokenException;
import com.fairytale.FairyTale.domain.credential.presentation.dto.request.UnlinkRequest;
import com.fairytale.FairyTale.domain.credential.presentation.dto.response.OauthTokenInfoDto;
import com.fairytale.FairyTale.global.api.client.KakaoOauthClient;
import com.fairytale.FairyTale.global.api.client.KakaoUnlinkClient;
import com.fairytale.FairyTale.global.api.dto.response.OIDCKeysResponse;
import com.fairytale.FairyTale.global.api.dto.response.OauthTokenResponse;
import com.fairytale.FairyTale.global.api.dto.response.UserInfoToOauthDto;
import com.fairytale.FairyTale.global.property.OauthProperties;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component("KAKAO")
@Slf4j
public class KaKaoOauthStrategy implements OauthStrategy {

    private final OauthProperties oauthProperties;
    private final KakaoOauthClient kakaoOauthClient;
    private final OauthOIDCProvider oauthOIDCProvider;
    private final KakaoUnlinkClient kakaoUnlinkClient;
    private static final String QUERY_STRING = "/oauth/authorize?client_id=%s&redirect_uri=%s&response_type=code";
    private static final String ISSUER = "https://kauth.kakao.com";
    private static final String PREFIX = "Bearer ";

    @Override
    public OIDCDecodePayload getOIDCDecodePayload(String token){
        OIDCKeysResponse oidcKakaoKeysResponse = kakaoOauthClient.getKakaoOIDCOpenKeys();
        return oauthOIDCProvider.getPayloadFromIdToken(token,ISSUER,oauthProperties.getKakaoClientId(),oidcKakaoKeysResponse);
    }

    @Override
    public String getOauthLink() {
        log.info("🟡 Kakao clientId = {}", oauthProperties.getKakaoClientId());
        log.info("🟡 Kakao redirectUrl = {}", oauthProperties.getKakaoRedirectUrl());

        return oauthProperties.getKakaoBaseUrl()
                + String.format(
                QUERY_STRING,
                oauthProperties.getKakaoClientId(),
                oauthProperties.getKakaoRedirectUrl());
    }

    @Override
    public OauthTokenInfoDto getOauthToken(String code) {
        log.info("🔥 Kakao getOauthToken called with code = {}", code);
        log.info("🔥 Kakao clientId = {}", oauthProperties.getKakaoClientId());
        log.info("🔥 Kakao redirectUri = {}", oauthProperties.getKakaoRedirectUrl());

        OauthTokenResponse oauthTokenResponse = kakaoOauthClient.kakaoAuth(
                "authorization_code",
                oauthProperties.getKakaoClientId(),
                oauthProperties.getKakaoRedirectUrl(),
                code
        );

        log.info("🟢 Kakao oauthTokenResponse = {}", oauthTokenResponse);

        return OauthTokenInfoDto.builder()
                .idToken(oauthTokenResponse.getIdToken())
                .accessToken(oauthTokenResponse.getAccessToken())
                .build();
    }

    @Override
    public UserInfoToOauthDto getUserInfo(String oauthAccessToken) {
        return kakaoUnlinkClient.getKakaoInfo(PREFIX + oauthAccessToken);
    }

    @Override
    public void unLink(UnlinkRequest unlinkRequest) {
        if (unlinkRequest.getAccessToken() == null) {
            throw NotNullTokenException.EXCEPTION;
        }

        kakaoUnlinkClient.unlinkUser(PREFIX + unlinkRequest.getAccessToken());

    }
}
