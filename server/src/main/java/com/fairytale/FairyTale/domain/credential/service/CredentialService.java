package com.fairytale.FairyTale.domain.credential.service;

import com.fairytale.FairyTale.domain.child.domain.Child;
import com.fairytale.FairyTale.domain.child.domain.Repository.ChildRepository;
import com.fairytale.FairyTale.domain.credential.domain.RefreshTokenRedisEntity;
import com.fairytale.FairyTale.domain.credential.domain.repository.RefreshTokenRedisEntityRepository;
import com.fairytale.FairyTale.domain.credential.exception.NotNullTokenException;
import com.fairytale.FairyTale.domain.credential.exception.RefreshTokenExpiredException;
import com.fairytale.FairyTale.domain.credential.exception.UserIdMismatchException;
import com.fairytale.FairyTale.domain.credential.presentation.dto.request.RegisterRequest;
import com.fairytale.FairyTale.domain.credential.presentation.dto.request.UnlinkRequest;
import com.fairytale.FairyTale.domain.credential.presentation.dto.response.AfterOauthResponse;
import com.fairytale.FairyTale.domain.credential.presentation.dto.response.AuthTokensResponse;
import com.fairytale.FairyTale.domain.credential.presentation.dto.response.CheckRegisteredResponse;
import com.fairytale.FairyTale.domain.credential.presentation.dto.response.OauthTokenInfoDto;
import com.fairytale.FairyTale.domain.user.domain.User;
import com.fairytale.FairyTale.domain.user.domain.repository.UserRepository;
import com.fairytale.FairyTale.domain.uservoice.domain.UserVoice;
import com.fairytale.FairyTale.domain.uservoice.service.UserVoiceService;
import com.fairytale.FairyTale.global.api.dto.response.UserInfoToOauthDto;
import com.fairytale.FairyTale.global.exception.AlreadyRegisterException;
import com.fairytale.FairyTale.global.exception.InvalidTokenException;
import com.fairytale.FairyTale.global.exception.UserNotFoundException;
import com.fairytale.FairyTale.global.security.JwtTokenProvider;
import com.fairytale.FairyTale.global.util.user.UserUtils;
import com.fairytale.FairyTale.global.util.voice.MultipartFileUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class CredentialService {

    private final UserUtils userUtils;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final ChildRepository childRepository;
    private final OauthFactory oauthFactory;
    private final UserVoiceService userVoiceService;
    private final RefreshTokenRedisEntityRepository refreshTokenRedisEntityRepository;

    @Transactional
    public void singUpTest(){
        User user =
                User.builder()
                        .oauthProvider(UUID.randomUUID().toString())
                        .oauthId(UUID.randomUUID().toString())
                        .isNew(true)
                        .build();
        userRepository.save(user);
    }

    public AuthTokensResponse testLogin(Long userId){
        User user = userUtils.getUserById(userId);
        String accessToken = jwtTokenProvider.generateAccessToken(userId, user.getAccountRole());
        String refreshToken = generateRefreshToken(userId);
        return AuthTokensResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken).build();
    }

    public String getOauthLink(OauthProvider oauthProvider) {
        OauthStrategy oauthStrategy = oauthFactory.getOauthstrategy(oauthProvider);
        return oauthStrategy.getOauthLink();
    }

    public AfterOauthResponse getTokenToCode(OauthProvider oauthProvider, String code) {
        OauthStrategy oauthStrategy = oauthFactory.getOauthstrategy(oauthProvider);
        OauthTokenInfoDto oauthToken = oauthStrategy.getOauthToken(code);
        return new AfterOauthResponse(oauthToken.getIdToken(),oauthToken.getAccessToken());
    }

    public CheckRegisteredResponse getUserAvailableRegister(String code, OauthProvider oauthProvider) {
        OauthStrategy oauthstrategy = oauthFactory.getOauthstrategy(oauthProvider);
        OauthTokenInfoDto token = oauthstrategy.getOauthToken(code);
        OIDCDecodePayload oidcDecodePayload = oauthstrategy.getOIDCDecodePayload(token.getIdToken());
        Boolean isRegistered = !checkUserCanRegister(oidcDecodePayload, oauthProvider);
        return new CheckRegisteredResponse(isRegistered,token.getIdToken());
    }

    @Transactional
    public AuthTokensResponse registerUser(
            String token, OauthProvider oauthProvider, RegisterRequest registerRequest) {

        log.info("🍒 === register [service]  ===");
        log.info("🍒 token = {}", token);
        OauthStrategy oauthStrategy = oauthFactory.getOauthstrategy(oauthProvider);
        OIDCDecodePayload oidcDecodePayload = oauthStrategy.getOIDCDecodePayload(token);

        if (!checkUserCanRegister(oidcDecodePayload, oauthProvider)) {
            throw AlreadyRegisterException.EXCEPTION;
        }

        // 사용자 생성 및 저장
        User user = User.builder()
                .email(oidcDecodePayload.getEmail())
                .oauthProvider(oauthProvider.getValue())
                .oauthId(oidcDecodePayload.getSub())
                .isNew(true)
                .build();
        userRepository.save(user);

        // 자녀 정보 저장
        Child child = Child.builder()
                .name(registerRequest.getChildren().getName())
                .mascotId(registerRequest.getChildren().getMascotId())
                .user(user)
                .build();
        childRepository.save(child);

        // 음성 데이터 처리 및 업로드
        try {
            if (registerRequest.getVoice() != null) {
                String base64Data = registerRequest.getVoice().getData();
                String format = registerRequest.getVoice().getFormat();
                Boolean isMale = registerRequest.getVoice().getIsMale();

                // 🍒 디버깅용 로그 추가
                log.info("🍒 [Voice Info] base64 length = {}", base64Data != null ? base64Data.length() : "null");
                log.info("🍒 [Voice Info] format = {}", format);
                log.info("🍒 [Voice Info] isMale = {}", isMale);

                MultipartFile voiceFile = MultipartFileUtils.convertBase64ToMultipart(base64Data, format, "voice");

                // Spring Security Context 수동 설정
                userUtils.setSecurityContextManual(user);
                userVoiceService.createUserVoice(voiceFile, isMale);
            } else {
                log.warn("🎙️ Voice 정보가 전달되지 않았습니다.");
            }
        } catch (Exception e) {
            log.error("❌ 음성 업로드 실패: {}", e.getMessage(), e);
            throw new RuntimeException("🍒 음성 파일 저장 중 오류가 발생했습니다.", e);
        }

        String accessToken = jwtTokenProvider.generateAccessToken(user.getId(), user.getAccountRole());
        String refreshToken = generateRefreshToken(user.getId());

        log.info("🍒 ======== 회원가입 완료: userId={}, childName={} ================",
                user.getId(), registerRequest.getChildren().getName());

        return AuthTokensResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .isNew(user.getIsNew())
                .build();
    }

    @Transactional
    public AuthTokensResponse loginUserByOCIDToken(String token, OauthProvider oauthProvider) {
        OauthStrategy oauthStrategy = oauthFactory.getOauthstrategy(oauthProvider);
        OIDCDecodePayload oidcDecodePayload = oauthStrategy.getOIDCDecodePayload(token);

        User user =
                userRepository
                        .findByOauthIdAndOauthProvider(
                                oidcDecodePayload.getSub(), oauthProvider.getValue())
                        .orElseThrow(() -> UserNotFoundException.EXCEPTION);

        String accessToken = jwtTokenProvider.generateAccessToken(user.getId(), user.getAccountRole());
        String refreshToken = generateRefreshToken(user.getId());

        return AuthTokensResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .isNew(user.getIsNew())
                .build();
    }

    @Transactional
    public void logout() {
        User user = userUtils.getUserFromSecurityContext();
        refreshTokenRedisEntityRepository.deleteById(user.getId().toString());
    }

    @Transactional
    public AuthTokensResponse tokenRefresh(String requestRefreshToken) {

        log.info(requestRefreshToken);

        Optional<RefreshTokenRedisEntity> entityOptional =
                refreshTokenRedisEntityRepository.findByRefreshToken(requestRefreshToken);

        RefreshTokenRedisEntity refreshTokenRedisEntity =
                entityOptional.orElseThrow(() -> RefreshTokenExpiredException.EXCEPTION);

        Long userId = jwtTokenProvider.parseRefreshToken(requestRefreshToken);

        if (!userId.toString().equals(refreshTokenRedisEntity.getId())) {
            throw InvalidTokenException.EXCEPTION;
        }

        User user = userUtils.getUserById(userId);
        User loginUser = userUtils.getUserFromSecurityContext();

        if (user != loginUser) {
            throw UserNotFoundException.EXCEPTION;
        }

        String accessToken = jwtTokenProvider.generateAccessToken(userId, user.getAccountRole());
        String refreshToken = generateRefreshToken(user.getId());

        return AuthTokensResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Transactional
    public void deleteUser(String code) {

        log.info("========== [회원 탈퇴 서비스 시작] ==========");
        log.info("🌊 전달받은 인가 코드(code): {}", code);

        User user = userUtils.getUserFromSecurityContext();
        log.info("🌊 JWT accessToken에서 추출된 유저 정보: id={}, oauthId={}, provider={}",
                user.getId(), user.getOauthId(), user.getOauthProvider());

        OauthProvider provider = OauthProvider.valueOf(user.getOauthProvider().toUpperCase());
        log.info("🌊 사용 중인 소셜 로그인 플랫폼: {}", provider.getOauthProvider());

        OauthStrategy oauthStrategy = oauthFactory.getOauthstrategy(provider);
        log.info("🌊 해당 플랫폼에 맞는 OAuth 전략 클래스 로드 완료");

        OauthTokenInfoDto token = oauthStrategy.getOauthToken(code);
        log.info("🌊 code로 accessToken 받아오기 성공: {}", token.getAccessToken());

        String oauthAccessToken = token.getAccessToken();
        String userOauthId = user.getOauthId();
        UserInfoToOauthDto userInfo = oauthStrategy.getUserInfo(oauthAccessToken);
        log.info("🌊 accessToken으로 사용자 정보 조회 성공: 카카오 id = {}", userInfo.getId());

        verifyUserOauthIdWithAccessToken(oauthAccessToken,userOauthId,userInfo);

        deleteUserData(user);
        log.info("🌊 카카오 사용자 연결 해제 완료");

        UnlinkRequest unlinkRequest = createUnlinkRequest(oauthAccessToken);
        oauthStrategy.unLink(unlinkRequest);
    }

    private void verifyUserOauthIdWithAccessToken(String oauthAccessToken, String oauthId, UserInfoToOauthDto userInfo) {

        if(oauthAccessToken == null) {
            throw NotNullTokenException.EXCEPTION;
        }

        if (!userInfo.getId().equals(oauthId)) {
            throw UserIdMismatchException.EXCEPTION;
        }
    }

    private UnlinkRequest createUnlinkRequest(String oauthAccessToken) {
        return UnlinkRequest.builder().accessToken(oauthAccessToken).build();
    }

    private void deleteUserData(User user) {
        refreshTokenRedisEntityRepository.deleteById(user.getId().toString());
        userRepository.delete(user);
    }

    private String generateDefaultNickname() {
        return "user-" + UUID.randomUUID().toString().substring(0, 8);
    }

    private Boolean checkUserCanRegister(
            OIDCDecodePayload oidcDecodePayload, OauthProvider oauthProvider) {
        Optional<User> user =
                userRepository.findByOauthIdAndOauthProvider(
                        oidcDecodePayload.getSub(), oauthProvider.getValue());
        return user.isEmpty();
    }

    private String generateRefreshToken(Long userId) {
        String refreshToken = jwtTokenProvider.generateRefreshToken(userId);
        Long tokenExpiredAt = jwtTokenProvider.getRefreshTokenTTlSecond();
        RefreshTokenRedisEntity build =
                RefreshTokenRedisEntity.builder()
                        .id(userId.toString())
                        .refreshTokenTtl(tokenExpiredAt)
                        .refreshToken(refreshToken)
                        .build();
        refreshTokenRedisEntityRepository.save(build);
        return refreshToken;
    }
}
