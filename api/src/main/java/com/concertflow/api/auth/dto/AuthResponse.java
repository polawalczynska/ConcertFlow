package com.concertflow.api.auth.dto;

import com.concertflow.api.user.entity.Role;

public record AuthResponse(
    String token,
    String type,
    String email,
    Role role,
    Long id
) {
    public AuthResponse(String token, String email, Role role, Long id) {
        this(token, "Bearer", email, role, id);
    }
}


