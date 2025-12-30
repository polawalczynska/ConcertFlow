package com.concertflow.api.exceptions.types;

public class TechnicalVersionConflictException extends RuntimeException {
    public TechnicalVersionConflictException(String message) {
        super(message);
    }
}

