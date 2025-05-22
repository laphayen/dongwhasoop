package com.fairytale.FairyTale.domain.uservoice.presentation;

import com.fairytale.FairyTale.domain.uservoice.presentation.dto.request.DeleteUserVoiceRequest;
import com.fairytale.FairyTale.domain.uservoice.presentation.dto.response.VoiceCreateResponse;
import com.fairytale.FairyTale.domain.uservoice.presentation.dto.response.VoiceListResponse;
import com.fairytale.FairyTale.domain.uservoice.service.UserVoiceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/user-voice")
public class UserVoiceController {

    private final UserVoiceService userVoiceService;

    @GetMapping
    public VoiceListResponse getAvailableVoices() {
        return userVoiceService.getAvailableVoices();
    }

    @PostMapping(consumes = "multipart/form-data")
    public VoiceCreateResponse createVoices(
        @RequestParam("voiceFile") MultipartFile voiceFile,
        @RequestParam("gender") Boolean gender) {
        log.info("파일: {}", voiceFile.getOriginalFilename());
        log.info("성별: {}", gender);
        return userVoiceService.createUserVoice(voiceFile, gender);
    }

    @DeleteMapping
    public void deleteUserVoice(@RequestBody DeleteUserVoiceRequest request) {
        userVoiceService.deleteVoiceByGender(request.isGender());
    }
}
