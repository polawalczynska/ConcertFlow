package com.concertflow.api.security.jwt.validator;

public interface TokenValidator {
    boolean validateToken(String token);
}

