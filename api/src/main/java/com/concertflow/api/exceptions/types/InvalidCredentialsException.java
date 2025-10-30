package com.concertflow.api.exceptions.types;

import com.concertflow.api.exceptions.ErrorMessage;

public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException() {
        super(ErrorMessage.INVALID_CREDENTIALS.message());
    }
    public InvalidCredentialsException(String message) {
        super(message);
    }
}


