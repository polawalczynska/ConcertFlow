package com.concertflow.infrastructure.security.jwt.parser;

import com.concertflow.infrastructure.security.jwt.dto.TokenInfo;
import com.concertflow.infrastructure.security.jwt.model.TokenType;
import com.concertflow.api.user.entity.Role;

public interface TokenParser {
    String getEmailFromToken(String token);
    Role getRoleFromToken(String token);
    TokenType getTokenTypeFromToken(String token);
    TokenInfo getTokenInfo(String token);
}

