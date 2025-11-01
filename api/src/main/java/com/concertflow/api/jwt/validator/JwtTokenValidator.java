package com.concertflow.api.jwt.validator;

import com.concertflow.api.jwt.config.JwtSigningKeyProvider;
import com.concertflow.api.jwt.interfaces.TokenValidator;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtTokenValidator implements TokenValidator {
    private final JwtSigningKeyProvider signingKeyProvider;

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(signingKeyProvider.getSigningKey())
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            log.error("Invalid JWT token: {}", e.getMessage());
            return false;
        }
    }
}

