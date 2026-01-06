package com.concertflow.api.security.jwt.generator.impl;

import com.concertflow.api.security.jwt.builder.JwtTokenBuilder;
import com.concertflow.api.security.jwt.config.TokenExpirationConfig;
import com.concertflow.api.security.jwt.generator.TokenGenerator;
import com.concertflow.api.security.jwt.model.TokenType;
import com.concertflow.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component("refreshTokenGenerator")
@RequiredArgsConstructor
public class RefreshTokenGenerator implements TokenGenerator {
    private final JwtTokenBuilder tokenBuilder;
    private final TokenExpirationConfig expirationConfig;

    @Override
    public String generateToken(User user) {
        long expirationMs = expirationConfig.getExpirationMs(TokenType.REFRESH);
        return tokenBuilder.buildToken(user, TokenType.REFRESH, expirationMs);
    }
}

