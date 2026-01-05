package com.concertflow.infrastructure.security.jwt.config;

import com.concertflow.api.utils.TimeUtils;
import com.concertflow.infrastructure.security.jwt.model.TokenType;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.EnumMap;
import java.util.Map;

@Component
@Slf4j
@RequiredArgsConstructor
public class TokenExpirationConfig {
    private final Map<TokenType, Long> expirationMap = new EnumMap<>(TokenType.class);
    
    @Value("${app.security.jwt.access-expiration-ms}")
    private long accessExpirationMs;
    
    @Value("${app.security.jwt.refresh-expiration-ms}")
    private long refreshExpirationMs;
    
    @Value("${app.security.jwt.remember-me-expiration-ms}")
    private long rememberMeExpirationMs;

    @PostConstruct
    public void init() {
        expirationMap.put(TokenType.ACCESS, accessExpirationMs);
        expirationMap.put(TokenType.REFRESH, refreshExpirationMs);
        expirationMap.put(TokenType.REMEMBER_ME, rememberMeExpirationMs);

        log.info("Token configurations loaded:");
        log.info(
            "   - ACCESS: {} ({} minutes)",
            TimeUtils.formatDuration(accessExpirationMs),
            TimeUtils.millisecondsToMinutes(accessExpirationMs)
        );
        log.info(
            "   - REFRESH: {} ({} days)",
            TimeUtils.formatDuration(refreshExpirationMs),
            TimeUtils.millisecondsToDays(refreshExpirationMs)
        );
        log.info(
            "   - REMEMBER_ME: {} ({} days)",
            TimeUtils.formatDuration(rememberMeExpirationMs),
            TimeUtils.millisecondsToDays(rememberMeExpirationMs)
        );
    }

    public long getExpirationMs(TokenType tokenType) {
        Long expiration = expirationMap.get(tokenType);
        if (expiration == null) {
            log.warn("No expiration configured for token type: {}, using default", tokenType);
            return tokenType.getDefaultExpirationMs();
        }
        return expiration;
    }
}

