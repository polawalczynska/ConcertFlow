package com.concertflow.api.mappers;

import com.concertflow.api.artist.dto.ArtistResponse;
import com.concertflow.api.artist.entity.Artist;
import org.springframework.stereotype.Component;

@Component
public class ArtistMapper {
    public ArtistResponse toResponse(Artist artist, long upcomingConcertsCount) {
        return new ArtistResponse(
            artist.getId(),
            artist.getName(),
            artist.getEmail(),
            artist.getPhone(),
            artist.getGenre(),
            artist.getWebsite(),
            artist.getContactPerson(),
            (int) upcomingConcertsCount
        );
    }

    public ArtistResponse toResponse(Artist artist) {
        return toResponse(artist, 0);
    }
}

