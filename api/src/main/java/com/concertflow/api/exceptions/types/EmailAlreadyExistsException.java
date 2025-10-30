package com.concertflow.api.exceptions.types;

import com.concertflow.api.exceptions.ErrorMessage;

public class EmailAlreadyExistsException extends RuntimeException {
    public EmailAlreadyExistsException() {
        super(ErrorMessage.EMAIL_EXISTS.message());
    }
    public EmailAlreadyExistsException(String message) {
        super(message);
    }
}


