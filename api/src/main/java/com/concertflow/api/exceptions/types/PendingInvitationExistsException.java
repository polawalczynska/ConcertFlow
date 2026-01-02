package com.concertflow.api.exceptions.types;

public class PendingInvitationExistsException extends RuntimeException {
    public PendingInvitationExistsException(String message) {
        super(message);
    }
}

