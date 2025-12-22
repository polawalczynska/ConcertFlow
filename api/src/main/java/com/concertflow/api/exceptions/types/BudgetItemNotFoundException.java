package com.concertflow.api.exceptions.types;

public class BudgetItemNotFoundException extends RuntimeException {
    public BudgetItemNotFoundException(String message) {
        super(message);
    }
}

