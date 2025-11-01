package com.concertflow.api.auth.service;

import com.concertflow.api.auth.dto.AuthResponse;
import com.concertflow.api.auth.dto.LoginRequest;
import com.concertflow.api.auth.dto.RegisterRequest;
import com.concertflow.api.exceptions.ErrorMessage;
import com.concertflow.api.exceptions.types.EmailAlreadyExistsException;
import com.concertflow.api.exceptions.types.InvalidCredentialsException;
import com.concertflow.api.exceptions.types.TokenRefreshException;
import com.concertflow.api.jwt.JwtService;
import com.concertflow.api.user.entity.User;
import com.concertflow.api.user.entity.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.concertflow.api.exceptions.ErrorMessage.*;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public void register(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.email())) {
            throw new EmailAlreadyExistsException(ErrorMessage.EMAIL_EXISTS.message());
        }

        User user = User.builder()
            .email(registerRequest.email())
            .password(passwordEncoder.encode(registerRequest.password()))
            .firstName(registerRequest.firstName())
            .lastName(registerRequest.lastName())
            .role(registerRequest.role())
            .active(true)
            .build();

        userRepository.save(user);
    }

    public AuthResponse login(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            User user = userRepository.findByEmail(loginRequest.email())
                .orElseThrow(() -> new UsernameNotFoundException(USER_NOT_FOUND.message()));

            validateUserIsActive(user);

            String accessToken = jwtService.generateAccessToken(user);
            String refreshToken = jwtService.generateRefreshToken(user);

            return new AuthResponse(accessToken, refreshToken, user.getEmail(), user.getRole(), user.getId());
        } catch (BadCredentialsException e) {
            throw new InvalidCredentialsException(ErrorMessage.INVALID_CREDENTIALS.message());
        } catch (DisabledException e) {
            throw new DisabledException(USER_DISABLED.message());
        }
    }

    public AuthResponse refreshToken(String refreshToken) {
        if (!jwtService.isRefreshToken(refreshToken)) {
            throw new TokenRefreshException("Not a refresh token");
        }

        if (!jwtService.validateToken(refreshToken)) {
            throw new TokenRefreshException(INVALID_REFRESH_TOKEN.message());
        }

        String email = jwtService.getEmailFromToken(refreshToken);
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException(USER_NOT_FOUND.message()));

        validateUserIsActive(user);

        String newAccessToken = jwtService.generateAccessToken(user);
        String newRefreshToken = jwtService.generateRefreshToken(user);
        return new AuthResponse(newAccessToken, newRefreshToken, user.getEmail(), user.getRole(), user.getId());
    }

    private void validateUserIsActive(User user) {
        if (!user.getActive()) {
            throw new DisabledException(USER_DISABLED.message());
        }
    }
}


