package com.concertflow.api.exceptions.types;

public class ConcertValidationException extends RuntimeException {
    public ConcertValidationException(String message) {
        super(message);
    }
}

