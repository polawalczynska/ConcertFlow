package com.concertflow.api.security.jwt.generator.impl;

import com.concertflow.api.security.jwt.builder.JwtTokenBuilder;
import com.concertflow.api.security.jwt.config.TokenExpirationConfig;
import com.concertflow.api.security.jwt.generator.TokenGenerator;
import com.concertflow.api.security.jwt.model.TokenType;
import com.concertflow.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component("rememberMeTokenGenerator")
@RequiredArgsConstructor
public class RememberMeTokenGenerator implements TokenGenerator {
    private final JwtTokenBuilder tokenBuilder;
    private final TokenExpirationConfig expirationConfig;

    @Override
    public String generateToken(User user) {
        long expirationMs = expirationConfig.getExpirationMs(TokenType.REMEMBER_ME);
        return tokenBuilder.buildToken(user, TokenType.REMEMBER_ME, expirationMs);
    }
}

