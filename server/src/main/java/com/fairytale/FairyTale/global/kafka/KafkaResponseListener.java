package com.fairytale.FairyTale.global.kafka;

import com.fairytale.FairyTale.domain.book.domain.Book;
import com.fairytale.FairyTale.domain.book.domain.repository.BookRepository;
import com.fairytale.FairyTale.domain.book.presentation.dto.response.BookContentPostResponse;
import com.fairytale.FairyTale.domain.book.presentation.dto.response.StoryPageWithAudioResponse;
import com.fairytale.FairyTale.domain.storypage.domain.repository.StoryPageRepository;
import com.fairytale.FairyTale.global.config.handler.TtsWebSocketHandler;
import com.fairytale.FairyTale.global.error.ErrorResponse;
import com.fairytale.FairyTale.global.kafka.dto.response.KafkaTtsResponse;
import com.fairytale.FairyTale.global.success.SuccessResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class KafkaResponseListener {

    private final TtsWebSocketHandler webSocketHandler;
    private final StoryPageRepository storyPageRepository;
    private final BookRepository bookRepository;

    @KafkaListener(
        topics = "${spring.kafka.listener.tts-topic}",
        groupId = "${spring.kafka.consumer.group-id}",
        containerFactory = "kafkaListenerContainerFactory"
    )
    public void listen(KafkaTtsResponse message) {
        log.info("✅ Kafka 메시지 수신: {}", message);

        String type = message.getType();
        Long userId = message.getPayload().getUserId();

        try {
            switch (type) {
                case "TTS_COMPLETE" -> {
                    Long bookId = message.getPayload().getBookId();
                    Long voiceId = message.getPayload().getVoiceId();

                    List<StoryPageWithAudioResponse> pages = storyPageRepository.findPagesWithVoiceAudio(
                        bookId,
                        voiceId);

                    String bookTitle = bookRepository.findById(bookId)
                        .map(Book::getTitle)
                        .orElse("제목 없음");

                    BookContentPostResponse contentResponse = BookContentPostResponse.builder()
                        .message("✅ 음성 생성이 완료되었습니다.")
                        .bookId(bookId)
                        .bookTitle(bookTitle)
                        .completed(true)
                        .pages(pages)
                        .build();
                    SuccessResponse response = new SuccessResponse(200, contentResponse);

                    // websocket으로 데이터 보내기
                    webSocketHandler.sendJson(userId, response);
                }
                case "TTS_FAILED" -> {
                    String errorMsg = message.getPayload().getError();
                    log.error(errorMsg);

                    ErrorResponse response = new ErrorResponse(
                        500,
                        "서버에 오류가 발생했습니다. 조금있다가 다시 시도해주세요",
                        "/api/v1/books/{bookId}/{voiceId}/content"
                    );

                    // websocket으로 데이터 보내기
                    webSocketHandler.sendJson(userId, response);
                }
                default -> log.warn("⚠️ 알 수 없는 Kafka 메시지 type: {}", type);
            }
        } catch (Exception e) {
            log.error("❌ WebSocket 전송 실패: ", e);
        }
    }
}
