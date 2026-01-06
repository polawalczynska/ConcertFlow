package com.concertflow.api.security.jwt.parser;

import com.concertflow.api.security.jwt.dto.TokenInfo;
import com.concertflow.api.security.jwt.model.TokenType;
import com.concertflow.api.user.entity.Role;

public interface TokenParser {
    String getEmailFromToken(String token);
    Role getRoleFromToken(String token);
    TokenType getTokenTypeFromToken(String token);
    TokenInfo getTokenInfo(String token);
}

