package com.fairytale.FairyTale.domain.uservoice.presentation.dto.response;

import com.fairytale.FairyTale.domain.uservoice.domain.UserVoice;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class VoiceListResponse {

    private List<VoiceDto> voices;

    public static VoiceListResponse from(List<UserVoice> userVoices) {
        List<VoiceDto> voiceDtoList = userVoices.stream()
                .map(VoiceDto::from)
                .toList();

        return VoiceListResponse.builder()
                .voices(voiceDtoList)
                .build();
    }

    @Getter
    @Builder
    public static class VoiceDto {
        private Long voiceId;
        private Boolean gender;
        private String displayName; // UI에 표시할 이름
        private String voiceType;   // 목소리 유형 (MOM, DAD, BEAR)

        public static VoiceDto from(UserVoice userVoice) {
            String displayName;
            String voiceType;

            // Gender에 따라 표시 이름과 목소리 유형 설정
            if (userVoice.getGender() == null) {
                displayName = "곰돌이";
                voiceType = "BEAR";
            } else if (userVoice.getGender()) {
                displayName = "아빠";
                voiceType = "DAD";
            } else {
                displayName = "엄마";
                voiceType = "MOM";
            }

            return VoiceDto.builder()
                    .voiceId(userVoice.getId())
                    .gender(userVoice.getGender())
                    .displayName(displayName)
                    .voiceType(voiceType)
                    .build();
        }
    }
}
