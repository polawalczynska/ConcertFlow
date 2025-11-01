package com.concertflow.api.auth.dto;

import com.concertflow.api.user.entity.Role;

public record AuthResponse(
    String accessToken,
    String refreshToken,
    String rememberMeToken,
    String type,
    String email,
    Role role,
    Long id
) {
    public AuthResponse(String accessToken, String refreshToken, String email, Role role, Long id) {
        this(accessToken, refreshToken, null, "Bearer", email, role, id);
    }
    
    public AuthResponse(String accessToken, String refreshToken, String rememberMeToken, String email, Role role, Long id) {
        this(accessToken, refreshToken, rememberMeToken, "Bearer", email, role, id);
    }
}


