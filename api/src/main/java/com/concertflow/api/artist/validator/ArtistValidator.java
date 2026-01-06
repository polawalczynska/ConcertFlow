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

    public void validateNameUniqueForCoordinator(String name, Long coordinatorId) {
        if (artistRepository.existsByCoordinatorIdAndName(coordinatorId, name)) {
            throw new ArtistAlreadyExistsException(ARTIST_ALREADY_EXISTS.message());
        }
    }

    public void validateNameUniqueForUpdateForCoordinator(Artist existingArtist, String newName, Long coordinatorId) {
        if (!existingArtist.getName().equals(newName) && artistRepository.existsByCoordinatorIdAndName(coordinatorId, newName)) {
            throw new ArtistAlreadyExistsException(ARTIST_ALREADY_EXISTS.message());
        }
    }
}

