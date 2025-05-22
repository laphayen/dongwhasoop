package com.fairytale.FairyTale.global.api.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class OIDCKeyDto {

    @JsonProperty("kid")
    private String kid;

    @JsonProperty("alg")
    private String alg;

    @JsonProperty("use")
    private String use;

    @JsonProperty("n")
    private String n;

    @JsonProperty("e")
    private String e;
}
