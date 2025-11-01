package com.concertflow.api.jwt.interfaces;

import com.concertflow.api.user.entity.User;

public interface TokenGenerator {
    String generateToken(User user);
}

