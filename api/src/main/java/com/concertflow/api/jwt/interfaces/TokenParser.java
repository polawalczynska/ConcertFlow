package com.concertflow.api.jwt.interfaces;

import com.concertflow.api.jwt.dto.TokenInfo;
import com.concertflow.api.jwt.model.TokenType;
import com.concertflow.api.user.entity.Role;

public interface TokenParser {
    String getEmailFromToken(String token);
    Role getRoleFromToken(String token);
    TokenType getTokenTypeFromToken(String token);
    TokenInfo getTokenInfo(String token);
}

