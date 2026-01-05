package com.concertflow.api.exceptions.types;

public class InvalidConcertStatusTransitionException extends IllegalStateException {
    public InvalidConcertStatusTransitionException(String message) {
        super(message);
    }
}

