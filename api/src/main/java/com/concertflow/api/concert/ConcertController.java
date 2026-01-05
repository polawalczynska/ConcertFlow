package com.concertflow.api.concert;

import com.concertflow.api.config.ApiConstants;
import com.concertflow.api.concert.dto.CancelConcertRequest;
import com.concertflow.api.concert.dto.ConcertRequest;
import com.concertflow.api.concert.dto.ConcertResponse;
import com.concertflow.api.concert.entity.ConcertStatus;
import com.concertflow.api.concert.service.ConcertService;
import com.concertflow.api.user.entity.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/concerts")
@RequiredArgsConstructor
public class ConcertController {
    private final ConcertService concertService;

    @GetMapping
    public List<ConcertResponse> getAllConcerts(
        @RequestParam(required = false) ConcertStatus status,
        @RequestParam(required = false) Long artistId,
        @RequestParam(required = false) Long coordinatorId,
        @RequestParam(required = false) String search,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int pageSize
    ) {
        if (pageSize > ApiConstants.MAX_PAGE_SIZE) {
            pageSize = ApiConstants.MAX_PAGE_SIZE;
        }
        return concertService.getAllConcerts(status, artistId, coordinatorId, search, page, pageSize);
    }

    @GetMapping("/{id}")
    public ConcertResponse getConcertById(@PathVariable Long id) {
        return concertService.getConcertById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createConcert(
        @Valid @RequestBody ConcertRequest request,
        Authentication authentication
    ) {
        User coordinator = (User) authentication.getPrincipal();
        concertService.createConcert(request, coordinator);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void updateConcert(
        @PathVariable Long id,
        @Valid @RequestBody ConcertRequest request,
        Authentication authentication
    ) {
        User coordinator = (User) authentication.getPrincipal();
        concertService.updateConcert(id, request, coordinator);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteConcert(
        @PathVariable Long id,
        Authentication authentication
    ) {
        User coordinator = (User) authentication.getPrincipal();
        concertService.deleteConcert(id, coordinator);
    }

    @PostMapping("/{id}/cancel")
    @ResponseStatus(HttpStatus.OK)
    public void cancelConcert(
        @PathVariable Long id,
        @Valid @RequestBody CancelConcertRequest request,
        Authentication authentication
    ) {
        User coordinator = (User) authentication.getPrincipal();
        concertService.cancelConcert(id, request, coordinator);
    }
}
