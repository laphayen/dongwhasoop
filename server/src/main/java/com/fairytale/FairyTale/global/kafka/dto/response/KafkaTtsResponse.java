package com.fairytale.FairyTale.global.kafka.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class KafkaTtsResponse {

    private String type;
    private TtsPayload payload;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TtsPayload {

        @JsonProperty("book_id")
        private Long bookId;

        @JsonProperty("voice_id")
        private Long voiceId;

        @JsonProperty("user_id")
        private Long userId;

        private String error; // 실패 시 사용
    }
}
