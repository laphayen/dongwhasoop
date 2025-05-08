package com.fairytale.FairyTale.domain.uservoice.service;

import com.fairytale.FairyTale.domain.uservoice.presentation.dto.response.VoiceCreateResponse;
import com.fairytale.FairyTale.domain.uservoice.presentation.dto.response.VoiceListResponse;
import org.springframework.web.multipart.MultipartFile;

public interface UserVoiceService {

    VoiceListResponse getAvailableVoices();

    void deleteVoiceByGender(boolean gender);

    VoiceCreateResponse createUserVoice(MultipartFile voiceFile, Boolean gender);
}
