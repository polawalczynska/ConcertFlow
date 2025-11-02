package com.concertflow.api.jwt.interfaces;

public interface TokenValidator {
    boolean validateToken(String token);
}

