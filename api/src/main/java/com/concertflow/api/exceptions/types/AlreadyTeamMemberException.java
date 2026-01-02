package com.concertflow.api.exceptions.types;

public class AlreadyTeamMemberException extends RuntimeException {
    public AlreadyTeamMemberException(String message) {
        super(message);
    }
}

