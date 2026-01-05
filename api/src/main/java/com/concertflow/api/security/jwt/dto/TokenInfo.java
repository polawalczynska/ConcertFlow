package com.concertflow.api.security.jwt.dto;

import com.concertflow.api.security.jwt.model.TokenType;
import com.concertflow.api.user.entity.Role;

import java.time.Instant;

public record TokenInfo(
    String email,
    Role role,
    Long userId,
    TokenType tokenType,
    Instant issuedAt,
    Instant expiresAt,
    long remainingTimeMs
) {
}

