package com.fairytale.FairyTale.global.kafka.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor(staticName = "of")
public class KafkaTtsCommand {

    private String type;
    private TtsPayload payload;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor(staticName = "of")
    public static class TtsPayload {

        @JsonProperty("book_id")
        private Long bookId;

        @JsonProperty("voice_id")
        private Long voiceId;

        @JsonProperty("user_id")
        private Long userId;
    }
}