package com.concertflow.api.exceptions.types;

import static com.concertflow.api.exceptions.ErrorMessage.EMAIL_EXISTS;

public class EmailAlreadyExistsException extends RuntimeException {
    public EmailAlreadyExistsException() {
        super(EMAIL_EXISTS.message());
    }

    public EmailAlreadyExistsException(String message) {
        super(message);
    }
}


