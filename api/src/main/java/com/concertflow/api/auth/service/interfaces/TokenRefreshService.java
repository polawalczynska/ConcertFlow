package com.concertflow.api.auth.service.interfaces;

import com.concertflow.api.auth.dto.AuthResponse;

public interface TokenRefreshService {
    AuthResponse refreshToken(String refreshToken);
}

