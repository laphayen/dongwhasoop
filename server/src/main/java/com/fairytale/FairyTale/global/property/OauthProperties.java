package com.fairytale.FairyTale.global.property;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@AllArgsConstructor
@ConfigurationProperties("oauth")
public class OauthProperties {

    private OAuthSecret kakao;
    private String kakaoClientId;
    private String kakaoRedirectUrl;
    private String kakaoBaseUrl;

    @Getter
    @Setter
    public static class OAuthSecret {
        private String baseUrl;
        private String clientId;
        private String clientSecret;
        private String redirectUrl;
        private String appId;
        private String adminKey;
    }
    public String getKakaoBaseUrl() {
        return kakao.getBaseUrl();
    }

    public String getKakaoClientId() {
        return kakao.getClientId();
    }

    public String getKakaoRedirectUrl() {
        return kakao.getRedirectUrl();
    }

    public String getKakaoClientSecret() {
        return kakao.getClientSecret();
    }

    public String getKakaoAppId() {
        return kakao.getAppId();
    }

    public String getKakaoAdminKey(){
        return kakao.getAdminKey();
    }
}
