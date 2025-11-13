package com.concertflow.api.artist.service.interfaces;

import com.concertflow.api.artist.dto.ArtistRequest;
import com.concertflow.api.artist.dto.ArtistResponse;
import com.concertflow.api.concert.dto.ConcertResponse;
import jakarta.validation.Valid;

import java.util.List;

public interface ArtistService {
    List<ArtistResponse> getAllArtists(String search, int page, int pageSize);
    ArtistResponse getArtistById(Long id);
    void createArtist(@Valid ArtistRequest request);
    void updateArtist(Long id, @Valid ArtistRequest request);
    void deleteArtist(Long id);
    List<ConcertResponse> getArtistConcerts(Long id);
    List<ArtistResponse> searchArtists(String query);
}

