package com.concertflow.api.exceptions.types;

public class BudgetValidationException extends RuntimeException {
    public BudgetValidationException(String message) {
        super(message);
    }
}

