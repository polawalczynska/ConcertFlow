package com.concertflow.api.exceptions.types;

import static com.concertflow.api.exceptions.ErrorMessage.USER_DISABLED;

public class UserDisabledException extends RuntimeException {
    public UserDisabledException() {
        super(USER_DISABLED.message());
    }

    public UserDisabledException(String message) {
        super(message);
    }
}

