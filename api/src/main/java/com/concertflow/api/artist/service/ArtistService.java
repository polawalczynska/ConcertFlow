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
import com.concertflow.api.team.service.TeamMemberService;
import com.concertflow.api.user.entity.Role;
import com.concertflow.api.user.entity.User;
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
    private final TeamMemberService teamMemberService;

    public List<ArtistResponse> getAllArtists(String search, int page, int pageSize, User user) {
        Long coordinatorId = getCoordinatorIdForUser(user);
        List<Artist> artists = search != null && !search.trim().isEmpty()
            ? findArtistsByName(search.trim(), coordinatorId)
            : findAllArtists(page, pageSize, coordinatorId);

        return artists.stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
    }

    public ArtistResponse getArtistById(Long id, User user) {
        Long coordinatorId = getCoordinatorIdForUser(user);
        Artist artist = findArtistByIdAndCoordinator(id, coordinatorId);
        return convertToResponse(artist);
    }

    public void createArtist(@Valid ArtistRequest request, User coordinator) {
        artistValidator.validateNameUniqueForCoordinator(request.name(), coordinator.getId());
        Artist artist = buildArtist(request, coordinator);
        artistRepository.save(artist);
    }

    public void updateArtist(Long id, @Valid ArtistRequest request, User coordinator) {
        Artist artist = findArtistByIdAndCoordinator(id, coordinator.getId());
        artistValidator.validateNameUniqueForUpdateForCoordinator(artist, request.name(), coordinator.getId());
        updateArtistFields(artist, request);
        artistRepository.save(artist);
    }

    public void deleteArtist(Long id, User coordinator) {
        Artist artist = findArtistByIdAndCoordinator(id, coordinator.getId());
        artistRepository.delete(artist);
    }

    public List<ConcertResponse> getArtistConcerts(Long id) {
        // Artist access is already validated in the controller via getArtistById
        Artist artist = artistRepository.findById(id)
            .orElseThrow(() -> new ArtistNotFoundException(ARTIST_NOT_FOUND.message()));
        List<Concert> concerts = concertRepository.findByArtistId(artist.getId());
        return concerts.stream()
            .map(concertMapper::toResponse)
            .collect(Collectors.toList());
    }

    public List<ArtistResponse> searchArtists(String query, User user) {
        Long coordinatorId = getCoordinatorIdForUser(user);
        List<Artist> artists = findArtistsByName(query, coordinatorId);
        return artists.stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
    }

    /**
     * Gets the coordinator ID for the user.
     * For coordinators, returns their own ID.
     * For managers, returns their coordinator's ID (from team invitation).
     */
    private Long getCoordinatorIdForUser(User user) {
        if (user.getRole() == Role.COORDINATOR) {
            return user.getId();
        }
        // For managers, find their coordinator
        Long coordinatorId = teamMemberService.findCoordinatorIdForTeamMember(user.getId());
        if (coordinatorId == null) {
            // If manager is not on a team, they can't see any artists
            // Return a non-existent ID to return empty results
            return -1L;
        }
        return coordinatorId;
    }

    private List<Artist> findArtistsByName(String name, Long coordinatorId) {
        return artistRepository.findByCoordinatorIdAndNameContainingIgnoreCase(coordinatorId, name);
    }

    private List<Artist> findAllArtists(int page, int pageSize, Long coordinatorId) {
        Pageable pageable = PageRequest.of(page, pageSize, Sort.by("name").ascending());
        return artistRepository.findByCoordinatorId(coordinatorId, pageable);
    }

    private Artist findArtistByIdAndCoordinator(Long id, Long coordinatorId) {
        return artistRepository.findById(id)
            .filter(artist -> artist.getCoordinator().getId().equals(coordinatorId))
            .orElseThrow(() -> new ArtistNotFoundException(ARTIST_NOT_FOUND.message()));
    }

    private Artist buildArtist(ArtistRequest request, User coordinator) {
        return Artist.builder()
            .name(request.name())
            .email(request.email())
            .phone(request.phone())
            .genre(request.genre())
            .website(request.website())
            .contactPerson(request.contactPerson())
            .coordinator(coordinator)
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
        return concertRepository.countByArtistIdAndDateAfter(artistId, LocalDateTime.now());
    }
}

