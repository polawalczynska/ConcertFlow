package com.concertflow.api.security.jwt.generator;

import com.concertflow.api.user.entity.User;

public interface TokenGenerator {
    String generateToken(User user);
}

