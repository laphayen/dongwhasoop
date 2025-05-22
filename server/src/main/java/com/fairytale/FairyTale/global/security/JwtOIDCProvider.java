package com.fairytale.FairyTale.global.security;

import com.fairytale.FairyTale.domain.credential.service.OIDCDecodePayload;
import com.fairytale.FairyTale.global.exception.ExpiredTokenException;
import com.fairytale.FairyTale.global.exception.InvalidTokenException;
import com.fairytale.FairyTale.global.exception.RSAAlgorithmException;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.math.BigInteger;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.RSAPublicKeySpec;
import java.util.Base64;

@RequiredArgsConstructor
@Component
@Slf4j
public class JwtOIDCProvider {

    private final String KID = "kid";

    public String getKidFromParsedJwtHeader(String token, String iss, String aud) {

        String kid = (String) getRemovedSignatureParsedJwt(token, iss, aud).getHeader().get(KID);
        return kid;
    }

    private String removeSignatureFromToken(String token) {
        String[] splitToken = token.split("\\.");
        if (splitToken.length != 3) throw InvalidTokenException.EXCEPTION;
        return splitToken[0] + "." + splitToken[1] + ".";
    }

    private Jwt<Header, Claims> getRemovedSignatureParsedJwt(String token, String iss, String aud) {
        try {
            Jwt<Header, Claims> parsedJwt = Jwts.parserBuilder()
                    .requireAudience(aud)
                    .requireIssuer(iss)
                    .build()
                    .parseClaimsJwt(removeSignatureFromToken(token));
            return parsedJwt;

        } catch (ExpiredJwtException e) {
            throw ExpiredTokenException.EXCEPTION;
        } catch (Exception e) {
            throw InvalidTokenException.EXCEPTION;
        }
    }

    public OIDCDecodePayload getOIDCTokenBody(String token, String modulus, String exponent) {
        Claims body = getOIDCTokenJws(token, modulus, exponent).getBody();
        return new OIDCDecodePayload(
                body.getIssuer(),
                body.getAudience(),
                body.getSubject(),
                body.get("email", String.class),
                body.get("profile",String.class));
    }

    public Jws<Claims> getOIDCTokenJws(String token, String modulus, String exponent) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getRSAPublicKey(modulus, exponent))
                    .build()
                    .parseClaimsJws(token);
        } catch (ExpiredJwtException e) {
            throw ExpiredTokenException.EXCEPTION;
        } catch (NoSuchAlgorithmException e) {
            throw RSAAlgorithmException.EXCEPTION;
        }catch (Exception e) {
            log.error(e.toString());
            throw InvalidTokenException.EXCEPTION;
        }
    }

    private PublicKey getRSAPublicKey(String modulus, String exponent)
            throws NoSuchAlgorithmException, InvalidKeySpecException {

        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        BigInteger n = new BigInteger(1, Base64.getUrlDecoder().decode(modulus));
        BigInteger e = new BigInteger(1, Base64.getUrlDecoder().decode(exponent));
        RSAPublicKeySpec keySpec = new RSAPublicKeySpec(n,e);
        return keyFactory.generatePublic(keySpec);
    }
}
