package com.fairytale.FairyTale.global.api.client;

import com.fairytale.FairyTale.global.api.dto.response.UserInfoToOauthDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "KakaoUnlinkClient", url = "https://kapi.kakao.com")
public interface KakaoUnlinkClient {

    @GetMapping(value ="/v1/user/access_token_info")
    UserInfoToOauthDto getKakaoInfo(@RequestHeader("Authorization") String authorization);

    @PostMapping(value = "/v1/user/unlink", consumes = "application/x-www-form-urlencoded")
    void unlinkUser(@RequestHeader("Authorization") String accessToken);
}
