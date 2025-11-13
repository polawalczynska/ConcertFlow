package com.concertflow.api.artist;

import com.concertflow.api.artist.dto.ArtistRequest;
import com.concertflow.api.artist.dto.ArtistResponse;
import com.concertflow.api.artist.service.interfaces.ArtistService;
import com.concertflow.api.concert.dto.ConcertResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/artists")
@RequiredArgsConstructor
public class ArtistController {
    private final ArtistService artistService;

    @GetMapping
    public List<ArtistResponse> getAllArtists(
        @RequestParam(required = false) String search,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int pageSize
    ) {
        return artistService.getAllArtists(search, page, pageSize);
    }

    @GetMapping("/{id}")
    public ArtistResponse getArtistById(@PathVariable Long id) {
        return artistService.getArtistById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createArtist(@Valid @RequestBody ArtistRequest request) {
        artistService.createArtist(request);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void updateArtist(@PathVariable Long id, @Valid @RequestBody ArtistRequest request) {
        artistService.updateArtist(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteArtist(@PathVariable Long id) {
        artistService.deleteArtist(id);
    }

    @GetMapping("/{id}/concerts")
    public List<ConcertResponse> getArtistConcerts(@PathVariable Long id) {
        return artistService.getArtistConcerts(id);
    }

    @GetMapping("/search")
    public List<ArtistResponse> searchArtists(@RequestParam String query) {
        return artistService.searchArtists(query);
    }
}
