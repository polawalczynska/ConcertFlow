package com.concertflow.api.exceptions.types;

public class InvalidBudgetStatusException extends RuntimeException {
    public InvalidBudgetStatusException(String message) {
        super(message);
    }
}

