package com.fairytale.FairyTale.domain.uservoice.service;

import com.fairytale.FairyTale.domain.user.domain.User;
import com.fairytale.FairyTale.domain.user.domain.repository.UserRepository;
import com.fairytale.FairyTale.domain.uservoice.domain.UserVoice;
import com.fairytale.FairyTale.domain.uservoice.domain.respository.UserVoiceRepository;
import com.fairytale.FairyTale.domain.uservoice.presentation.dto.response.VoiceCreateResponse;
import com.fairytale.FairyTale.domain.uservoice.presentation.dto.response.VoiceListResponse;
import com.fairytale.FairyTale.global.error.exception.ErrorCode;
import com.fairytale.FairyTale.global.error.exception.FairyTaleException;
import com.fairytale.FairyTale.global.exception.UserNotFoundException;
import com.fairytale.FairyTale.global.util.s3.S3Uploader;
import com.fairytale.FairyTale.global.util.user.UserUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class UserVoiceServiceImpl implements UserVoiceService {

    private final UserUtils userUtils;
    private final UserRepository userRepository;
    private final UserVoiceRepository userVoiceRepository;
    private final S3Uploader s3Uploader;

    @Override
    public VoiceListResponse getAvailableVoices() {
        User currentUser = userUtils.getUserFromSecurityContext();
        Long userId = currentUser.getId();
        log.info("🧩 현재 요청한 사용자 ID: {}", userId);

        List<UserVoice> result = userVoiceRepository.findByUserWithDefaultVoices(userId);
        log.info("🧩 조회된 목소리 개수: {}", result.size());

        result.forEach(voice -> log.info("📦 Voice => ID: {}, Gender: {}, URL: {}, user_id: {}",
                voice.getId(),
                voice.getGender(),
                voice.getVoiceUrl(),
                voice.getUser() == null ? "기본(곰돌이)" : voice.getUser().getId()));

        return VoiceListResponse.from(result);
    }

    @Override
    @Transactional
    public VoiceCreateResponse createUserVoice(MultipartFile voiceFile, Boolean gender) {
        User user = userUtils.getUserFromSecurityContext();

        boolean exists = userVoiceRepository.existsByUserIdAndGender(user.getId(), gender);
        if (exists) {
            throw new FairyTaleException(ErrorCode.USER_VOICE_ALREADY_EXISTS);
        }

        // 확장자 검사 (.wav가 아니면 예외)
        String originalFilename = voiceFile.getOriginalFilename();
        if (originalFilename == null || !originalFilename.toLowerCase().endsWith(".wav")) {
            throw new FairyTaleException(ErrorCode.UNSUPPORTED_AUDIO_FORMAT);
        }

        //s3 업로드
        String uploadedUrl = s3Uploader.upload(voiceFile, "user-voices");

        UserVoice saved = userVoiceRepository.save(UserVoice.builder()
            .user(user)
            .voiceUrl(uploadedUrl)
            .gender(gender)
            .build());

        log.info("정상적으로 S3에 업로드 되었습니다. 유저ID:{} 성별:{} 경로 {}", user.getId(), gender, uploadedUrl);

        return VoiceCreateResponse.builder().voiceId(saved.getId()).build();
    }

    @Override
    @Transactional
    public void deleteVoiceByGender(boolean gender) {
        User currentUser = userUtils.getUserFromSecurityContext();
        Long userId = currentUser.getId();

        UserVoice voice = userVoiceRepository.findByUserIdAndGender(userId, gender)
            .orElseThrow(() -> new FairyTaleException(ErrorCode.USER_VOICE_NOT_FOUND));

        userVoiceRepository.delete(voice);
    }
}
