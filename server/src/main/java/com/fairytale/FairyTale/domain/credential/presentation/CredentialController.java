package com.fairytale.FairyTale.domain.credential.presentation;

import com.fairytale.FairyTale.domain.credential.presentation.dto.request.OauthCodeRequest;
import com.fairytale.FairyTale.domain.credential.presentation.dto.request.RegisterRequest;
import com.fairytale.FairyTale.domain.credential.presentation.dto.request.TokenRefreshRequest;
import com.fairytale.FairyTale.domain.credential.presentation.dto.response.AuthTokensResponse;
import com.fairytale.FairyTale.domain.credential.presentation.dto.response.CheckRegisteredResponse;
import com.fairytale.FairyTale.domain.credential.presentation.dto.response.OauthLoginLinkResponse;
import com.fairytale.FairyTale.domain.credential.service.CredentialService;
import com.fairytale.FairyTale.domain.credential.service.OauthProvider;
import com.fairytale.FairyTale.global.property.OauthProperties;
import org.springframework.web.servlet.view.RedirectView;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Value;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/credentials")
@RestController
public class CredentialController {

    private final CredentialService credentialService;

    @Value("${frontend.redirect-url}")
    private String frontendRedirectUrl;

    private final OauthProperties oauthProperties;

    @PostMapping("/sign-up-test")
    public void signUptTest(){
        credentialService.singUpTest();
    }

    @PostMapping("/test-login/{userId}")
    public AuthTokensResponse loginTest(@PathVariable("userId") Long userId){
        return credentialService.testLogin(userId);
    }

    @GetMapping("/oauth/link/kakao")
    public OauthLoginLinkResponse getKakaoOauthLink() {
        return new OauthLoginLinkResponse(credentialService.getOauthLink(OauthProvider.KAKAO));
    }

    @GetMapping("/callback/kakao")
    public CheckRegisteredResponse kakaoAuth(@RequestParam("code") String code) {
        log.info("카카오 OAuth 인증 코드 수신: {}", code);
        return credentialService.getUserAvailableRegister(code, OauthProvider.KAKAO);
    }


    @GetMapping("/oauth/valid/register")
    public CheckRegisteredResponse valid(
            @RequestParam("code") String code,
            @RequestParam("provider") OauthProvider oauthProvider) {
        log.info("controller token = {}",code);
        return credentialService.getUserAvailableRegister(code, oauthProvider);
    }

    @PostMapping
    public AuthTokensResponse registerUser(
            @RequestParam("idToken") String token,
            @RequestParam("provider") OauthProvider oauthProvider,
            @RequestBody RegisterRequest registerRequest) {

        log.info("=========== register api start ============");
        log.info("[controller] register token = {}",token);
        return credentialService.registerUser(token, oauthProvider, registerRequest);
    }

    @PostMapping("/login")
    public AuthTokensResponse loginUser(
            @RequestParam("idToken") String token,
            @RequestParam("provider") OauthProvider oauthProvider) {
        return credentialService.loginUserByOCIDToken(token, oauthProvider);
    }

    @PostMapping("/logout")
    public void logout() {
        credentialService.logout();
    }

    @PostMapping("/refresh")
    public AuthTokensResponse refreshingToken(
            @RequestBody TokenRefreshRequest tokenRefreshRequest) {
        return credentialService.tokenRefresh(tokenRefreshRequest.getRefreshToken());
    }

    @DeleteMapping
    public void deleteUser(@RequestParam("code") String code) {

        log.info("======== delete api start ==========");
        log.info("[controller] delete token = {}",code);

        credentialService.deleteUser(code);
    }


}
