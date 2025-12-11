package com.concertflow.api.auth.service;

import com.concertflow.api.auth.dto.AuthResponse;
import com.concertflow.api.auth.validator.UserValidator;
import com.concertflow.api.exceptions.types.TokenRefreshException;
import com.concertflow.api.jwt.factory.TokenGeneratorFactory;
import com.concertflow.api.jwt.interfaces.TokenParser;
import com.concertflow.api.jwt.interfaces.TokenValidator;
import com.concertflow.api.jwt.model.TokenType;
import com.concertflow.api.user.entity.User;
import com.concertflow.api.user.entity.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static com.concertflow.api.exceptions.ErrorMessage.*;

@Service
@Transactional
@RequiredArgsConstructor
public class TokenRefreshService {
    private final UserRepository userRepository;
    private final TokenValidator tokenValidator;
    private final TokenParser tokenParser;
    private final TokenGeneratorFactory tokenGeneratorFactory;

    public AuthResponse refreshToken(String refreshToken) {
        TokenType tokenType = tokenParser.getTokenTypeFromToken(refreshToken);

        if (tokenType != TokenType.REFRESH && tokenType != TokenType.REMEMBER_ME) {
            throw new TokenRefreshException("Not a valid refresh token");
        }

        if (!tokenValidator.validateToken(refreshToken)) {
            throw new TokenRefreshException(INVALID_REFRESH_TOKEN.message());
        }

        String email = tokenParser.getEmailFromToken(refreshToken);
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException(USER_NOT_FOUND.message()));

        UserValidator.validateUserIsActive(user);

        String newAccessToken = tokenGeneratorFactory.generateToken(user, TokenType.ACCESS);
        String newRefreshToken = tokenGeneratorFactory.generateToken(user, TokenType.REFRESH);
        
        String newRememberMeToken = null;
        if (tokenType == TokenType.REMEMBER_ME) {
            newRememberMeToken = tokenGeneratorFactory.generateToken(user, TokenType.REMEMBER_ME);
        }
        
        return new AuthResponse(newAccessToken, newRefreshToken, newRememberMeToken, user.getEmail(), user.getRole(), user.getId());
    }
}

