package com.concertflow.api.security.jwt.parser;

import com.concertflow.api.security.jwt.config.JwtSigningKeyProvider;
import com.concertflow.api.security.jwt.dto.TokenInfo;
import com.concertflow.api.security.jwt.model.TokenType;
import com.concertflow.api.user.entity.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Date;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtTokenParser implements TokenParser {
    private final JwtSigningKeyProvider signingKeyProvider;

    public Claims parseClaims(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(signingKeyProvider.getSigningKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }

    @Override
    public String getEmailFromToken(String token) {
        return parseClaims(token).getSubject();
    }

    @Override
    public Role getRoleFromToken(String token) {
        String role = parseClaims(token).get("role", String.class);
        return Role.valueOf(role);
    }

    public Long getUserIdFromToken(String token) {
        return parseClaims(token).get("userId", Long.class);
    }

    @Override
    public TokenType getTokenTypeFromToken(String token) {
        try {
            String typeValue = parseClaims(token).get("type", String.class);
            return TokenType.fromString(typeValue);
        } catch (Exception e) {
            log.error("Error getting token type: {}", e.getMessage());
            return null;
        }
    }

    public Instant getExpirationFromToken(String token) {
        try {
            Date expiration = parseClaims(token).getExpiration();
            return expiration != null ? expiration.toInstant() : Instant.now();
        } catch (Exception e) {
            log.error("Error getting expiration from token: {}", e.getMessage());
            return Instant.now();
        }
    }

    public long getRemainingTimeMs(String token) {
        Instant expiration = getExpirationFromToken(token);
        return Math.max(0, expiration.toEpochMilli() - System.currentTimeMillis());
    }

    @Override
    public TokenInfo getTokenInfo(String token) {
        Claims claims = parseClaims(token);
        Date issuedAt = claims.getIssuedAt();
        Date expiration = claims.getExpiration();
        
        return new TokenInfo(
            claims.getSubject(),
            Role.valueOf(claims.get("role", String.class)),
            claims.get("userId", Long.class),
            TokenType.fromString(claims.get("type", String.class)),
            issuedAt != null ? issuedAt.toInstant() : null,
            expiration != null ? expiration.toInstant() : null,
            getRemainingTimeMs(token)
        );
    }
}

