package com.fairytale.FairyTale.global.error.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    /* 400 */
    NOT_NULL_TOKEN(400, "토큰 값이 NULL일 수 없습니다"),
    MISMATCH_USER_OAUTH_ID(400, "유저의  OAuth ID값이 토큰 ID 값과 일치하지 않습니다"),
    WEBSOCKET_NOT_CONNECTED(400, "WebSocket이 연결되어 있지 않습니다"),
    USER_VOICE_ALREADY_EXISTS(400, "이미 녹음된 파일이 존재합니다"),

    /* 401 UNAUTHORIZED : 인증되지 않은 사용자 */
    INVALID_TOKEN(401, "토큰이 유효하지 않습니다."),
    EXPIRED_TOKEN(401, "토큰이 만료되었습니다."),

    /* 403 UNAUTHORIZED : 인가되지 않은 사용자 */
    REFRESH_TOKEN_EXPIRED_TOKEN(HttpStatus.FORBIDDEN.value(), "refreshToken 만료."),
    NECESSARY_LOGIN(403, "로그인이 반드시 필요한 서비스입니다"),
    NOT_CHILD_EDIT_PERMISSION(404, "자녀 수정 권한이 없습니다."),

    /* 404 NOT_FOUND : Resource를 찾을 수 없음 */
    USER_NOT_FOUND(404, "사용자를 찾을 수 없습니다."),
    CHARACTER_NOT_FOUND(404, "캐릭터를 찾을 수 없습니다."),
    AlREADY_REGISTER(404, "이미 등록된 회원입니다."),
    CHILD_NOT_FOUND(404, "존재하지 않는 자녀입니다."),
    BOOK_NOT_FOUND(404, "존재하지 않는 책입니다"),
    USER_VOICE_NOT_FOUND(404, "해당 목소리에 권한이 없거나 찾을 수 없습니다."),

    /* letter exception */
    LETTER_NOT_FOUND(404, "존재하지 않는 편지입니다."),

    /* 415 */
    UNSUPPORTED_AUDIO_FORMAT(415, "허용되지 않는 오디오 형식입니다."),

    /* 500 */
    INTERNAL_SERVER_ERROR(500, "서버 에러"),
    JSON_PARSE_ERROR(500, "json 파싱 에러 입니다."),
    NO_SUCH_PUBLIC_KEY(500, " kid 값이 일치하는 데이터가 없습니다."),
    NO_SUCH_RSA_ALGORITHM(500, "RSA 암호화 알고리즘을 지원하지 않는 환경입니다.");

    private final int status;
    private final String reason;
}
