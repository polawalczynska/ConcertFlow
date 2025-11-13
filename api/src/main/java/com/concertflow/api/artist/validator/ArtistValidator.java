package com.concertflow.api.artist.validator;

import com.concertflow.api.artist.entity.Artist;
import com.concertflow.api.artist.entity.ArtistRepository;
import com.concertflow.api.exceptions.types.ArtistAlreadyExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import static com.concertflow.api.exceptions.ErrorMessage.ARTIST_ALREADY_EXISTS;

@Component
@RequiredArgsConstructor
public class ArtistValidator {
    private final ArtistRepository artistRepository;

    public void validateNameUnique(String name) {
        if (artistRepository.existsByName(name)) {
            throw new ArtistAlreadyExistsException(ARTIST_ALREADY_EXISTS.message());
        }
    }

    public void validateNameUniqueForUpdate(Artist existingArtist, String newName) {
        if (!existingArtist.getName().equals(newName) && artistRepository.existsByName(newName)) {
            throw new ArtistAlreadyExistsException(ARTIST_ALREADY_EXISTS.message());
        }
    }
}

