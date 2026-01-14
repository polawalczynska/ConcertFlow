package com.concertflow.api.auth.service;

import com.concertflow.api.auth.dto.AuthResponse;
import com.concertflow.api.auth.dto.LoginRequest;
import com.concertflow.api.auth.validator.UserValidator;
import com.concertflow.api.exceptions.types.InvalidCredentialsException;
import com.concertflow.api.exceptions.types.UserDisabledException;
import com.concertflow.api.security.jwt.registry.TokenGeneratorRegistry;
import com.concertflow.api.security.jwt.model.TokenType;
import com.concertflow.api.user.entity.User;
import com.concertflow.api.user.service.UserFinder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static com.concertflow.api.exceptions.ErrorMessage.*;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserFinder userFinder;
    private final AuthenticationManager authenticationManager;
    private final TokenGeneratorRegistry tokenGeneratorRegistry;

    public AuthResponse login(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            User user = userFinder.findByEmailOrThrowUsernameNotFound(loginRequest.email(), USER_NOT_FOUND.message());

            UserValidator.validateUserIsActive(user);

            String accessToken = tokenGeneratorRegistry.generateToken(user, TokenType.ACCESS);
            String refreshToken = tokenGeneratorRegistry.generateToken(user, TokenType.REFRESH);
            String rememberMeToken = null;

            if (loginRequest.rememberMe()) {
                rememberMeToken = tokenGeneratorRegistry.generateToken(user, TokenType.REMEMBER_ME);
            }

            return new AuthResponse(accessToken, refreshToken, rememberMeToken, user.getEmail(), user.getRole(), user.getId());
        } catch (BadCredentialsException e) {
            throw new InvalidCredentialsException(INVALID_CREDENTIALS.message());
        } catch (DisabledException e) {
            throw new UserDisabledException(USER_DISABLED.message());
        }
    }

    public void logout(Authentication authentication) {
        if (authentication != null) {
            SecurityContextHolder.clearContext();
        }
    }
}

