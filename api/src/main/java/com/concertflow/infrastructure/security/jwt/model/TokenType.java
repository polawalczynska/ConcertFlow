package com.concertflow.infrastructure.security.jwt.model;

import com.concertflow.api.utils.TimeConstants;
import com.concertflow.api.utils.TimeUtils;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TokenType {
    ACCESS("access", "Access Token", TimeConstants.FIFTEEN_MINUTES),
    REFRESH("refresh", "Refresh Token", TimeConstants.ONE_WEEK),
    REMEMBER_ME("remember_me", "Remember Me Token", TimeConstants.THIRTY_DAYS);

    private final String value;
    private final String description;
    private final long defaultExpirationMs;

    public static TokenType fromString(String value) {
        for (TokenType type : values()) {
            if (type.value.equals(value)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Unknown token type: " + value);
    }

    public String getDefaultExpirationDescription() {
        return TimeUtils.formatDuration(defaultExpirationMs);
    }

    public String getDefaultExpirationDetailed() {
        return TimeUtils.formatDurationDetailed(defaultExpirationMs);
    }
}

