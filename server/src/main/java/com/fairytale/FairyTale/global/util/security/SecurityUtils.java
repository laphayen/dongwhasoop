package com.fairytale.FairyTale.global.util.security;

import com.fairytale.FairyTale.global.exception.UnauthorizedException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class SecurityUtils {

    public static Long getCurrentUserId() {

        log.info("===============SecurityContextHolder 에서 값을 가져옵니다 ============");

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        log.info("Authentication={}",authentication.getName());

        if (authentication == null) {
            log.warn("⚠️ authentication 객체가 null입니다. 인증되지 않은 상태입니다.");
            throw UnauthorizedException.EXCEPTION;
        }

        log.info("🔐 authentication 존재 - name: {}", authentication.getName());
        log.info("🔐 authentication class: {}", authentication.getClass().getName());
        log.info("🔐 isAuthenticated: {}", authentication.isAuthenticated());

        if (!authentication.isAuthenticated()) {
            log.warn("⚠️ authentication 객체는 존재하지만 인증 상태가 아닙니다.");
            throw UnauthorizedException.EXCEPTION;
        }

        String principal = authentication.getName();
        log.info("👤 principal 값: {}", principal);

        if ("anonymousUser".equals(principal)) {
            log.warn("⚠️ principal 값이 'anonymousUser'입니다. 비로그인 상태입니다.");
            throw UnauthorizedException.EXCEPTION;
        }

        try {
            return Long.valueOf(principal);
        } catch (NumberFormatException e) {
            log.error("❌ principal을 Long으로 변환할 수 없습니다. value = {}", principal, e);
            throw UnauthorizedException.EXCEPTION;
        }

    }
}
