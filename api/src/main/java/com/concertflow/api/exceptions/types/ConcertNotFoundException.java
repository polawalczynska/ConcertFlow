package com.concertflow.api.exceptions.types;

import com.concertflow.api.exceptions.ErrorMessage;

public class ConcertNotFoundException extends RuntimeException {
    public ConcertNotFoundException() {
        super(ErrorMessage.CONCERT_NOT_FOUND.message());
    }

    public ConcertNotFoundException(String message) {
        super(message);
    }
}

