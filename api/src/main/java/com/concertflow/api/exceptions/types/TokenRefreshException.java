package com.concertflow.api.exceptions.types;

import static com.concertflow.api.exceptions.ErrorMessage.INVALID_REFRESH_TOKEN;

public class TokenRefreshException extends RuntimeException {
    public TokenRefreshException() {
        super(INVALID_REFRESH_TOKEN.message());
    }

    public TokenRefreshException(String message) {
        super(message);
    }
}

