package com.concertflow.api.exceptions.types;

import com.concertflow.api.exceptions.ErrorMessage;

public class UnauthorizedAccessException extends RuntimeException {
    public UnauthorizedAccessException() {
        super(ErrorMessage.UNAUTHORIZED_ACCESS.message());
    }

    public UnauthorizedAccessException(String message) {
        super(message);
    }
}

