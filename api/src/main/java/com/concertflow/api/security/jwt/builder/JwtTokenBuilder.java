package com.concertflow.api.security.jwt.builder;

import com.concertflow.api.security.jwt.config.JwtSigningKeyProvider;
import com.concertflow.api.security.jwt.model.TokenType;
import com.concertflow.api.user.entity.User;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtTokenBuilder {
    private final JwtSigningKeyProvider signingKeyProvider;

    public String buildToken(User user, TokenType tokenType, long expirationMs) {
        return Jwts.builder()
            .setSubject(user.getEmail())
            .claim("type", tokenType.getValue())
            .claim("role", user.getRole().name())
            .claim("userId", user.getId())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
            .signWith(signingKeyProvider.getSigningKey())
            .compact();
    }
}

