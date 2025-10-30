package com.concertflow.api.exceptions;

public enum ErrorMessage {
    EMAIL_EXISTS("Email already registered"),
    INVALID_CREDENTIALS("Invalid email or password"),
    USER_DISABLED("User account is disabled"),
    USER_NOT_FOUND("User not found");

    private final String message;

    ErrorMessage(String message) {
        this.message = message;
    }

    public String message() {
        return message;
    }
}


