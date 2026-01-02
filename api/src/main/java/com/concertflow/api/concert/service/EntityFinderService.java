package com.concertflow.api.concert.service;

import com.concertflow.api.artist.entity.Artist;
import com.concertflow.api.artist.entity.ArtistRepository;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertRepository;
import com.concertflow.api.exceptions.types.ArtistNotFoundException;
import com.concertflow.api.exceptions.types.ConcertNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.concertflow.api.exceptions.ErrorMessage.ARTIST_NOT_FOUND;
import static com.concertflow.api.exceptions.ErrorMessage.CONCERT_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class EntityFinderService {
    private final ConcertRepository concertRepository;
    private final ArtistRepository artistRepository;

    public Concert findConcertById(Long id) {
        return concertRepository.findById(id)
            .orElseThrow(() -> new ConcertNotFoundException(CONCERT_NOT_FOUND.message()));
    }

    public Artist findArtistById(Long id) {
        return artistRepository.findById(id)
            .orElseThrow(() -> new ArtistNotFoundException(ARTIST_NOT_FOUND.message()));
    }
}

