package com.concertflow.api.exceptions.types;

public class InvalidConcertStatusException extends RuntimeException {
    public InvalidConcertStatusException(String message) {
        super(message);
    }
}

