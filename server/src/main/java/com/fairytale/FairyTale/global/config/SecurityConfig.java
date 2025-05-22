package com.fairytale.FairyTale.global.config;

import com.fairytale.FairyTale.global.error.exception.ExceptionFilter;
import com.fairytale.FairyTale.global.security.JwtTokenFilter;
import com.fairytale.FairyTale.global.security.JwtTokenProvider;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtTokenProvider jwtTokenProvider;
    private final ObjectMapper objectMapper;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) // ✅ CORS 설정 추가
            .csrf(AbstractHttpConfigurer::disable)
            .addFilterBefore(new JwtTokenFilter(jwtTokenProvider),
                UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(new ExceptionFilter(objectMapper), JwtTokenFilter.class)
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests((registry) ->
                registry
                    .requestMatchers(HttpMethod.DELETE, "/api/v1/credentials").authenticated()
                    .requestMatchers("/api/v1/credentials/test-login/**",
                        "/api/v1/credentials/sign-up-test",
                        "/api/v1/credentials/oauth/link/kakao", "/api/v1/credentials/oauth/kakao",
                        "/api/v1/credentials/oauth/link/google", "/api/v1/credentials/oauth/google",
                        "/api/v1/credentials/oauth/valid/register", "/api/v1/credentials/login",
                            "/api/v1/credentials/callback/kakao",
                        "/api/v1/user-preference/random", "/api/v1/credentials", "/actuator/**"
                        , "/api/v1/ws/**").permitAll()
                    //.anyRequest().permitAll()
                    .anyRequest().authenticated()
            );

        return http.build();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("*")); // ✅ 모든 도메인 허용
        configuration.setAllowedMethods(
            List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*")); // ✅ 모든 헤더 허용
        configuration.setAllowCredentials(true); // ✅ 인증 허용 (JWT 등)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
