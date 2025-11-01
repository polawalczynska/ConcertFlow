package com.concertflow.api.jwt.generator.impl;

import com.concertflow.api.jwt.builder.JwtTokenBuilder;
import com.concertflow.api.jwt.config.TokenExpirationConfig;
import com.concertflow.api.jwt.interfaces.TokenGenerator;
import com.concertflow.api.jwt.model.TokenType;
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

