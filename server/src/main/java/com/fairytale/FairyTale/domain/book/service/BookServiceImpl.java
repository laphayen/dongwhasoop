package com.fairytale.FairyTale.domain.book.service;

import com.fairytale.FairyTale.domain.book.domain.Book;
import com.fairytale.FairyTale.domain.book.domain.repository.BookRepository;
import com.fairytale.FairyTale.domain.book.exception.NotFoundBookException;
import com.fairytale.FairyTale.domain.book.presentation.dto.response.BookContentPostResponse;
import com.fairytale.FairyTale.domain.book.presentation.dto.response.BookListResponse;
import com.fairytale.FairyTale.domain.book.presentation.dto.response.SongResponse;
import com.fairytale.FairyTale.domain.book.presentation.dto.response.StoryPageWithAudioResponse;
import com.fairytale.FairyTale.domain.storypage.domain.repository.StoryPageRepository;
import com.fairytale.FairyTale.domain.user.domain.User;
import com.fairytale.FairyTale.domain.uservoice.domain.respository.UserVoiceRepository;
import com.fairytale.FairyTale.global.config.handler.TtsWebSocketHandler;
import com.fairytale.FairyTale.global.error.exception.ErrorCode;
import com.fairytale.FairyTale.global.error.exception.FairyTaleException;
import com.fairytale.FairyTale.global.kafka.KafkaProducer;
import com.fairytale.FairyTale.global.util.user.UserUtils;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final UserUtils userUtils;
    private final TtsWebSocketHandler ttsWebSocketHandler;
    private final StoryPageRepository storyPageRepository;
    private final UserVoiceRepository userVoiceRepository;
    private final KafkaProducer kafkaProducer;

    @Override
    public Slice<BookListResponse> getBookList(PageRequest pageRequest) {
        return bookRepository.findAllBooks(pageRequest).map(BookListResponse::from);
    }

    @Override
    public SongResponse getSong(Long bookId) {
        return SongResponse.from(bookRepository.findById(bookId)
            .orElseThrow(() -> NotFoundBookException.EXCEPTION));
    }

    @Override
    public BookContentPostResponse getBookContentIfExists(Long bookId, Long voiceId) {
        //유저 정보 가져오기
        User user = userUtils.getUserFromSecurityContext();
        Long userId = user.getId();

        log.info("📘 [getBookContentIfExists] bookId = {}, voiceId = {}, userId = {}", bookId,
            voiceId, userId);

        if (!ttsWebSocketHandler.isUserConnected(userId)) {
            log.warn("❌ WebSocket 미연결 - userId: {}", userId);
            throw new FairyTaleException(ErrorCode.WEBSOCKET_NOT_CONNECTED);
        }

        Optional<Book> book = bookRepository.findById(bookId);
        // 유효한 책인지 확인
        if (book.isEmpty()) {
            log.warn("❌ 존재하지 않는 bookId: {}", bookId);
            throw new FairyTaleException(ErrorCode.BOOK_NOT_FOUND);
        }

        String bookTitle = book.get().getTitle();

        // 곰돌이가 아닌 경우에만 voice 권한 확인
        if (voiceId != 1000L && !userVoiceRepository.existsByIdAndUserId(voiceId, userId)) {
            log.warn("❌ 사용자의 voiceId가 존재하지 않음 - voiceId: {}, userId: {}", voiceId, userId);
            throw new FairyTaleException(ErrorCode.USER_VOICE_NOT_FOUND);
        }

        // 페이지 오디오 조회
        List<StoryPageWithAudioResponse> pages;
        if (voiceId == 1000L) {
            log.info("🐻 곰돌이 목소리 조회");
            pages = storyPageRepository.findPagesWithVoiceAudio(bookId, voiceId);
        } else {
            log.info("👤 사용자 목소리 조회 - voiceId: {}, userId: {}", voiceId, userId);
            pages = storyPageRepository.findPagesWithVoiceAudio(bookId, voiceId);
        }

        log.info("📄 조회된 페이지 수: {}", pages.size());

        // 모든 페이지에 오디오가 있는지 확인
        boolean allPagesHaveAudio = pages.stream().allMatch(p -> p.getAudioUrl() != null);
        log.info("✅ 모든 페이지 오디오 존재 여부: {}", allPagesHaveAudio);

        if (!allPagesHaveAudio) {
            //kafka로 명령 보내기
            kafkaProducer.sendCreateTts(bookId, voiceId, userId);

            return BookContentPostResponse.builder()
                .message("TTS를 통해 음성을 생성 중 입니다.")
                .bookId(bookId)
                .bookTitle(bookTitle)
                .completed(false)
                .pages(null)
                .build();
        } else {
            return BookContentPostResponse.builder()
                .message("기존 TTS가 존재하여 바로 응답합니다.")
                .bookId(bookId)
                .bookTitle(bookTitle)
                .completed(true)
                .pages(pages)
                .build();
        }
    }

}
