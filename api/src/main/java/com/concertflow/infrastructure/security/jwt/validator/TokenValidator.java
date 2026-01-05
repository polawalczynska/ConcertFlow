package com.concertflow.infrastructure.security.jwt.validator;

public interface TokenValidator {
    boolean validateToken(String token);
}

