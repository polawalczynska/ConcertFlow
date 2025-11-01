package com.concertflow.api.auth.dto;

import com.concertflow.api.user.entity.Role;

public record AuthResponse(
    String accessToken,
    String refreshToken,
    String type,
    String email,
    Role role,
    Long id
) {
    public AuthResponse(String accessToken, String refreshToken, String email, Role role, Long id) {
        this(accessToken, refreshToken, "Bearer", email, role, id);
    }
}


