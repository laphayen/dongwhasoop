package com.fairytale.FairyTale.global.kafka.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor(staticName = "of")
public class KafkaWriteLetterCommand {

    private String type; // "WRITE_LETTER"
    private WriteLetterPayload payload;

    @Data
    @AllArgsConstructor(staticName = "of")
    @NoArgsConstructor
    public static class WriteLetterPayload {

        @JsonProperty("letter_id")
        private Long letterId;
    }
}