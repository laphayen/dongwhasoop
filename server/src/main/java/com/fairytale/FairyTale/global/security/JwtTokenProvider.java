package com.fairytale.FairyTale.global.security;

import com.fairytale.FairyTale.domain.credential.exception.RefreshTokenExpiredException;
import com.fairytale.FairyTale.domain.user.domain.AccountRole;
import com.fairytale.FairyTale.global.exception.ExpiredTokenException;
import com.fairytale.FairyTale.global.exception.InvalidTokenException;
import com.fairytale.FairyTale.global.property.JwtProperties;
import com.fairytale.FairyTale.global.security.auth.AuthDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
@Slf4j
public class JwtTokenProvider {

    private final JwtProperties jwtProperties;
    private final String ACCESS_TOKEN = "access_token";
    private final String REFRESH_TOKEN = "refresh_token";
    private final String ROLE = "role";
    private final String TYPE = "type";
    private final String ISSUER = "fairytale";

    public String generateAccessToken(Long id, AccountRole accountRole) {
        final Date issuedAt = new Date();
        final Date accessTokenExpiresIn =
            new Date(issuedAt.getTime() + jwtProperties.getAccessExp() * 1000);
        return createAccessToken(id, issuedAt, accessTokenExpiresIn, accountRole);
    }

    public String generateRefreshToken(Long id) {
        final Date issuedAt = new Date();
        final Date refreshTokenExpiresIn =
            new Date(issuedAt.getTime() + jwtProperties.getRefreshExp() * 1000);
        return createRefreshToken(id, issuedAt, refreshTokenExpiresIn);
    }

    public String resolveToken(HttpServletRequest request) {
        String rawHeader = request.getHeader(jwtProperties.getHeader());

        if (rawHeader != null
            && rawHeader.length() > jwtProperties.getPrefix().length()
            && rawHeader.startsWith(jwtProperties.getPrefix())) {
            return rawHeader.substring(jwtProperties.getPrefix().length() + 1);
        }
        return null;
    }

    public Authentication getAuthentication(String token) {
        String id = getJws(token).getBody().getSubject();
        String role = (String) getJws(token).getBody().get(ROLE);
        UserDetails userDetails = new AuthDetails(id, role);
        return new UsernamePasswordAuthenticationToken(
            userDetails, "", userDetails.getAuthorities());
    }

    public Long parseRefreshToken(String token) {
        try {
            if (isRefreshToken(token)) {
                Claims claims = getJws(token).getBody();
                return Long.parseLong(claims.getSubject());
            }
        } catch (ExpiredTokenException e) {
            throw RefreshTokenExpiredException.EXCEPTION;
        }
        throw InvalidTokenException.EXCEPTION;
    }

    private boolean isRefreshToken(String token) {
        return getJws(token).getBody().get(TYPE).equals(REFRESH_TOKEN);
    }

    public Jws<Claims> getJws(String token) {
        try {
            return Jwts.parserBuilder().setSigningKey(getSecretKey()).build().parseClaimsJws(token);
        } catch (ExpiredJwtException e) {
            throw ExpiredTokenException.EXCEPTION;
        } catch (Exception e) {
            log.info("현재 토큰 : {}", token);
            throw InvalidTokenException.EXCEPTION;
        }
    }

    private Key getSecretKey() {
        return Keys.hmacShaKeyFor(jwtProperties.getSecretKey().getBytes(StandardCharsets.UTF_8));
    }

    private String createAccessToken(
        Long id, Date issuedAt, Date accessTokenExpiresIn, AccountRole accountRole) {
        final Key encodedKey = getSecretKey();
        return Jwts.builder()
            .setIssuer(ISSUER)
            .setIssuedAt(issuedAt)
            .setSubject(id.toString())
            .claim(TYPE, ACCESS_TOKEN)
            .claim(ROLE, accountRole.getValue())
            .setExpiration(accessTokenExpiresIn)
            .signWith(encodedKey)
            .compact();
    }

    private String createRefreshToken(Long id, Date issuedAt, Date accessTokenExpiresIn) {
        final Key encodedKey = getSecretKey();
        return Jwts.builder()
            .setIssuer(ISSUER)
            .setIssuedAt(issuedAt)
            .setSubject(id.toString())
            .claim(TYPE, REFRESH_TOKEN)
            .setExpiration(accessTokenExpiresIn)
            .signWith(encodedKey)
            .compact();
    }

    public Long getRefreshTokenTTlSecond() {
        return jwtProperties.getRefreshExp();
    }
}
