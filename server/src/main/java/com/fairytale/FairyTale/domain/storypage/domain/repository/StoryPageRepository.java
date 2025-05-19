package com.fairytale.FairyTale.domain.storypage.domain.repository;

import com.fairytale.FairyTale.domain.book.presentation.dto.response.StoryPageWithAudioResponse;
import com.fairytale.FairyTale.domain.storypage.domain.StoryPage;
import com.fairytale.FairyTale.domain.storypage.domain.StoryPageId;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StoryPageRepository extends JpaRepository<StoryPage, StoryPageId> {

    @Query("""
            SELECT new com.fairytale.FairyTale.domain.book.presentation.dto.response.StoryPageWithAudioResponse(
                sp.id.pageNumber,
                sp.textContent,
                sp.imageUrl,
                pa.audioUrl
            )
            FROM StoryPage sp
            LEFT JOIN sp.pageAudioList pa ON pa.userVoice.id = :voiceId
            WHERE sp.book.id = :bookId
            ORDER BY sp.id.pageNumber
        """)
    List<StoryPageWithAudioResponse> findPagesWithVoiceAudio(Long bookId, Long voiceId);

    @Query("""
    SELECT new com.fairytale.FairyTale.domain.book.presentation.dto.response.StoryPageWithAudioResponse(
        sp.id.pageNumber,
        sp.textContent,
        sp.imageUrl,
        pa.audioUrl
    )
        FROM StoryPage sp
        LEFT JOIN PageAudio pa
            ON pa.storyPage = sp
        WHERE sp.id.bookId = :bookId
          AND pa.userVoice.id = :voiceId
          AND pa.userVoice.user.id = :userId
    """)
    List<StoryPageWithAudioResponse> findPagesWithVoiceAudioAndUser(Long bookId, Long voiceId, Long userId);

}
