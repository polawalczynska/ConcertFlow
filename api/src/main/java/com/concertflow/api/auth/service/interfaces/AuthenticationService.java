package com.concertflow.api.auth.service.interfaces;

import com.concertflow.api.auth.dto.AuthResponse;
import com.concertflow.api.auth.dto.LoginRequest;

public interface AuthenticationService {
    AuthResponse login(LoginRequest loginRequest);
    void logout(org.springframework.security.core.Authentication authentication);
}

