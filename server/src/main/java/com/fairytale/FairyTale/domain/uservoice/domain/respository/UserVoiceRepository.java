package com.fairytale.FairyTale.domain.uservoice.domain.respository;

import com.fairytale.FairyTale.domain.user.domain.User;
import com.fairytale.FairyTale.domain.uservoice.domain.UserVoice;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserVoiceRepository extends JpaRepository<UserVoice, Long> {

    @Query("SELECT v FROM UserVoice v WHERE v.user.id = :userId OR v.user IS NULL")
    List<UserVoice> findByUserWithDefaultVoices(@Param("userId") Long userId);

    boolean existsByIdAndUserId(Long id, Long userId);

    Optional<UserVoice> findByUserIdAndGender(Long userId, boolean gender);

    boolean existsByUserIdAndGender(Long id, Boolean gender);
}
