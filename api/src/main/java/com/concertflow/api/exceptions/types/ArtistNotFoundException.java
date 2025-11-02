package com.concertflow.api.exceptions.types;

import com.concertflow.api.exceptions.ErrorMessage;

public class ArtistNotFoundException extends RuntimeException {
    public ArtistNotFoundException() {
        super(ErrorMessage.ARTIST_NOT_FOUND.message());
    }

    public ArtistNotFoundException(String message) {
        super(message);
    }
}

