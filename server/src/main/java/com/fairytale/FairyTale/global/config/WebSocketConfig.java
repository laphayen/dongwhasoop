package com.fairytale.FairyTale.global.config;

import com.fairytale.FairyTale.global.config.handler.TtsWebSocketHandler;
import com.fairytale.FairyTale.global.security.JwtTokenProvider;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {

    private final JwtTokenProvider jwtTokenProvider;
    private final ObjectMapper objectMapper;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(ttsWebSocketHandler(), "/api/v1/ws/tts-progress")
            .setAllowedOrigins("*"); // TODO : 배포 환경에서 변경
    }

    @Bean
    public TtsWebSocketHandler ttsWebSocketHandler() {
        return new TtsWebSocketHandler(objectMapper, jwtTokenProvider);
    }
}
