package com.concertflow.api.auth;

import com.concertflow.api.auth.dto.AuthResponse;
import com.concertflow.api.auth.dto.LoginRequest;
import com.concertflow.api.auth.dto.RefreshTokenRequest;
import com.concertflow.api.auth.dto.RegisterRequest;
import com.concertflow.api.auth.service.interfaces.AuthenticationService;
import com.concertflow.api.auth.service.interfaces.RegistrationService;
import com.concertflow.api.auth.service.interfaces.TokenRefreshService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final RegistrationService registrationService;
    private final AuthenticationService authenticationService;
    private final TokenRefreshService tokenRefreshService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@Valid @RequestBody RegisterRequest registerRequest) {
        registrationService.register(registerRequest);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest loginRequest) {
        return authenticationService.login(loginRequest);
    }

    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.OK)
    public void logout(Authentication authentication) {
        authenticationService.logout(authentication);
    }

    @PostMapping("/refresh")
    public AuthResponse refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        return tokenRefreshService.refreshToken(request.refreshToken());
    }
}


