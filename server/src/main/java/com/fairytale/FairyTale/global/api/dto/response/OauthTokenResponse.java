package com.fairytale.FairyTale.global.api.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class OauthTokenResponse {

    @JsonProperty("id_token")
    private String idToken;

    @JsonProperty("access_token")
    private String accessToken;

}
