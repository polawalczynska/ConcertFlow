package com.concertflow.api.artist;

import com.concertflow.api.artist.dto.ArtistRequest;
import com.concertflow.api.artist.dto.ArtistResponse;
import com.concertflow.api.artist.service.ArtistService;
import com.concertflow.api.concert.dto.ConcertResponse;
import com.concertflow.api.config.ApiConstants;
import com.concertflow.api.security.annotation.RequireAuthenticated;
import com.concertflow.api.security.annotation.RequireCoordinator;
import com.concertflow.api.user.entity.Role;
import com.concertflow.api.user.entity.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiConstants.API_V1_BASE_PATH + "/artists")
@RequiredArgsConstructor
public class ArtistController {
    private final ArtistService artistService;

    @GetMapping
    @RequireAuthenticated
    public List<ArtistResponse> getAllArtists(
        @RequestParam(required = false) String search,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int pageSize,
        Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();
        return artistService.getAllArtists(search, page, pageSize, user);
    }

    @GetMapping("/{id}")
    @RequireAuthenticated
    public ArtistResponse getArtistById(@PathVariable Long id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return artistService.getArtistById(id, user);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @RequireCoordinator
    public void createArtist(@Valid @RequestBody ArtistRequest request, Authentication authentication) {
        User coordinator = (User) authentication.getPrincipal();
        artistService.createArtist(request, coordinator);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @RequireCoordinator
    public void updateArtist(@PathVariable Long id, @Valid @RequestBody ArtistRequest request, Authentication authentication) {
        User coordinator = (User) authentication.getPrincipal();
        artistService.updateArtist(id, request, coordinator);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequireCoordinator
    public void deleteArtist(@PathVariable Long id, Authentication authentication) {
        User coordinator = (User) authentication.getPrincipal();
        artistService.deleteArtist(id, coordinator);
    }

    @GetMapping("/{id}/concerts")
    @RequireAuthenticated
    public List<ConcertResponse> getArtistConcerts(@PathVariable Long id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        artistService.getArtistById(id, user);
        return artistService.getArtistConcerts(id);
    }

    @GetMapping("/search")
    @RequireAuthenticated
    public List<ArtistResponse> searchArtists(@RequestParam String query, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return artistService.searchArtists(query, user);
    }
}
