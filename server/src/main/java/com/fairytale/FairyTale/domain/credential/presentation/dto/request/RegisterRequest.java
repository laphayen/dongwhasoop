package com.fairytale.FairyTale.domain.credential.presentation.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    private Children children;
    private Voice voice;

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Children {
        private String name;
        private Integer mascotId;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Voice {
        private String data;        // BASE64로 인코딩된 음성 데이터
        private String format;      // 음성 파일 포맷 (mp3 등)
        private Boolean isMale;      // 'MALE' 또는 'FEMALE'
    }

}
