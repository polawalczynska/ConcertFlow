package com.concertflow.api.exceptions.types;

import static com.concertflow.api.exceptions.ErrorMessage.INVALID_CREDENTIALS;

public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException() {
        super(INVALID_CREDENTIALS.message());
    }

    public InvalidCredentialsException(String message) {
        super(message);
    }
}


