package com.concertflow.api.exceptions.types;

import com.concertflow.api.exceptions.ErrorMessage;

public class ArtistAlreadyExistsException extends RuntimeException {
    public ArtistAlreadyExistsException() {
        super(ErrorMessage.ARTIST_ALREADY_EXISTS.message());
    }

    public ArtistAlreadyExistsException(String message) {
        super(message);
    }
}

