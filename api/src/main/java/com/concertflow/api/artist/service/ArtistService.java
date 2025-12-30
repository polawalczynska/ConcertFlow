package com.concertflow.api.artist.service;

import com.concertflow.api.artist.dto.ArtistRequest;
import com.concertflow.api.artist.dto.ArtistResponse;
import com.concertflow.api.artist.entity.Artist;
import com.concertflow.api.artist.entity.ArtistRepository;
import com.concertflow.api.artist.validator.ArtistValidator;
import com.concertflow.api.concert.dto.ConcertResponse;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertRepository;
import com.concertflow.api.exceptions.types.ArtistNotFoundException;
import com.concertflow.api.mappers.ArtistMapper;
import com.concertflow.api.mappers.ConcertMapper;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static com.concertflow.api.exceptions.ErrorMessage.ARTIST_NOT_FOUND;

@Service
@Transactional
@RequiredArgsConstructor
public class ArtistService {
    private final ArtistRepository artistRepository;
    private final ConcertRepository concertRepository;
    private final ArtistMapper artistMapper;
    private final ConcertMapper concertMapper;
    private final ArtistValidator artistValidator;

    public List<ArtistResponse> getAllArtists(String search, int page, int pageSize) {
        List<Artist> artists = search != null && !search.trim().isEmpty()
            ? findArtistsByName(search.trim())
            : findAllArtists(page, pageSize);

        return artists.stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
    }

    public ArtistResponse getArtistById(Long id) {
        Artist artist = findArtistById(id);
        return convertToResponse(artist);
    }

    public void createArtist(@Valid ArtistRequest request) {
        artistValidator.validateNameUnique(request.name());
        Artist artist = buildArtist(request);
        artistRepository.save(artist);
    }

    public void updateArtist(Long id, @Valid ArtistRequest request) {
        Artist artist = findArtistById(id);
        artistValidator.validateNameUniqueForUpdate(artist, request.name());
        updateArtistFields(artist, request);
        artistRepository.save(artist);
    }

    public void deleteArtist(Long id) {
        Artist artist = findArtistById(id);
        artistRepository.delete(artist);
    }

    public List<ConcertResponse> getArtistConcerts(Long id) {
        Artist artist = findArtistById(id);
        List<Concert> concerts = concertRepository.findByArtistId(artist.getId());
        return concerts.stream()
            .map(concertMapper::toResponse)
            .collect(Collectors.toList());
    }

    public List<ArtistResponse> searchArtists(String query) {
        List<Artist> artists = findArtistsByName(query);
        return artists.stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
    }

    private List<Artist> findArtistsByName(String name) {
        return artistRepository.findByNameContainingIgnoreCase(name);
    }

    private List<Artist> findAllArtists(int page, int pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize, Sort.by("name").ascending());
        return artistRepository.findAll(pageable).getContent();
    }

    private Artist findArtistById(Long id) {
        return artistRepository.findById(id)
            .orElseThrow(() -> new ArtistNotFoundException(ARTIST_NOT_FOUND.message()));
    }

    private Artist buildArtist(ArtistRequest request) {
        return Artist.builder()
            .name(request.name())
            .email(request.email())
            .phone(request.phone())
            .genre(request.genre())
            .website(request.website())
            .contactPerson(request.contactPerson())
            .build();
    }

    private void updateArtistFields(Artist artist, ArtistRequest request) {
        artist.setName(request.name());
        artist.setEmail(request.email());
        artist.setPhone(request.phone());
        artist.setGenre(request.genre());
        artist.setWebsite(request.website());
        artist.setContactPerson(request.contactPerson());
    }

    private ArtistResponse convertToResponse(Artist artist) {
        long upcomingConcertsCount = countUpcomingConcerts(artist.getId());
        return artistMapper.toResponse(artist, upcomingConcertsCount);
    }

    private long countUpcomingConcerts(Long artistId) {
        return concertRepository.findByArtistId(artistId).stream()
            .filter(concert -> concert.getDate().isAfter(LocalDateTime.now()))
            .count();
    }
}

