package com.concertflow.api.jwt.service;

import com.concertflow.api.jwt.dto.TokenInfo;
import com.concertflow.api.jwt.interfaces.TokenGenerator;
import com.concertflow.api.jwt.interfaces.TokenParser;
import com.concertflow.api.jwt.interfaces.TokenValidator;
import com.concertflow.api.jwt.model.TokenType;
import com.concertflow.api.jwt.factory.TokenGeneratorFactory;
import com.concertflow.api.user.entity.Role;
import com.concertflow.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtTokenService {
    private final TokenGeneratorFactory tokenGeneratorFactory;
    private final TokenValidator tokenValidator;
    private final TokenParser tokenParser;

    public String generateAccessToken(User user) {
        return tokenGeneratorFactory.generateToken(user, TokenType.ACCESS);
    }

    public String generateRefreshToken(User user) {
        return tokenGeneratorFactory.generateToken(user, TokenType.REFRESH);
    }

    public String generateRememberMeToken(User user) {
        return tokenGeneratorFactory.generateToken(user, TokenType.REMEMBER_ME);
    }

    public boolean validateToken(String token) {
        return tokenValidator.validateToken(token);
    }

    public boolean isRefreshToken(String token) {
        return getTokenTypeFromToken(token) == TokenType.REFRESH;
    }

    public boolean isRememberMeToken(String token) {
        return getTokenTypeFromToken(token) == TokenType.REMEMBER_ME;
    }

    public TokenType getTokenTypeFromToken(String token) {
        return tokenParser.getTokenTypeFromToken(token);
    }
    
    public String getEmailFromToken(String token) {
        return tokenParser.getEmailFromToken(token);
    }

    public Role getRoleFromToken(String token) {
        return tokenParser.getRoleFromToken(token);
    }

    public TokenInfo getTokenInfo(String token) {
        if (!validateToken(token)) {
            return null;
        }
        return tokenParser.getTokenInfo(token);
    }
}

