package com.concertflow.api.exceptions.types;

public class BudgetVersionConflictException extends RuntimeException {
    public BudgetVersionConflictException(String message) {
        super(message);
    }
}

