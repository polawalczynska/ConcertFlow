package com.concertflow.api.exceptions;

public enum ErrorMessage {
    EMAIL_EXISTS("Email already registered"),
    INVALID_CREDENTIALS("Invalid email or password"),
    USER_DISABLED("User account is disabled"),
    USER_NOT_FOUND("User not found"),
    INVALID_REFRESH_TOKEN("Invalid refresh token"),
    ARTIST_NOT_FOUND("Artist not found"),
    CONCERT_NOT_FOUND("Concert not found"),
    INVALID_BUDGET("Budget must be greater than zero"),
    INVALID_CONCERT_DATE("Concert date must be planned at least 2 weeks ahead");

    private final String message;

    ErrorMessage(String message) {
        this.message = message;
    }

    public String message() {
        return message;
    }
}


