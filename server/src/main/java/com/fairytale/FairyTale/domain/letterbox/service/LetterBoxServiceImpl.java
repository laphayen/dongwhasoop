package com.fairytale.FairyTale.domain.letterbox.service;

import com.fairytale.FairyTale.domain.child.domain.Child;
import com.fairytale.FairyTale.domain.child.domain.Repository.ChildRepository;
import com.fairytale.FairyTale.domain.child.exception.ChildNotFoundException;
import com.fairytale.FairyTale.domain.letterbox.domain.LetterBox;
import com.fairytale.FairyTale.domain.letterbox.domain.repository.LetterBoxRepository;
import com.fairytale.FairyTale.domain.letterbox.presentation.dto.response.LetterBoxResponse;
import com.fairytale.FairyTale.domain.user.domain.User;
import com.fairytale.FairyTale.global.exception.UnauthorizedException;
import com.fairytale.FairyTale.global.util.user.UserUtils;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LetterBoxServiceImpl implements LetterBoxService {

    private final LetterBoxRepository letterBoxRepository;
    private final ChildRepository childRepository;
    private final UserUtils userUtils;

    @Override
    @Transactional(readOnly = true)
    public LetterBoxResponse getLetterBoxesByChildId(Long childId) {
        // 현재 로그인한 사용자 확인
        User currentUser = userUtils.getUserFromSecurityContext();

        // 자녀 정보 조회
        Child child = childRepository.findById(childId)
            .orElseThrow(() -> ChildNotFoundException.EXCEPTION);

        // 현재 사용자의 자녀인지 확인
        if (!child.getUser().getId().equals(currentUser.getId())) {
            throw UnauthorizedException.EXCEPTION;
        }

        // 해당 자녀의 모든 편지함 조회
        List<LetterBox> letterBoxes = letterBoxRepository.findByChildId(childId);

        return LetterBoxResponse.from(letterBoxes);
    }
}
