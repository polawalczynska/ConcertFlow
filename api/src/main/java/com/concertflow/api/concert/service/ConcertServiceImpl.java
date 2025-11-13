package com.concertflow.api.concert.service;

import com.concertflow.api.artist.entity.Artist;
import com.concertflow.api.artist.entity.ArtistRepository;
import com.concertflow.api.concert.authorization.ConcertAuthorizationService;
import com.concertflow.api.concert.builder.ConcertBuilder;
import com.concertflow.api.concert.dto.CancelConcertRequest;
import com.concertflow.api.concert.dto.ConcertRequest;
import com.concertflow.api.concert.dto.ConcertResponse;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertRepository;
import com.concertflow.api.concert.entity.ConcertStatus;
import com.concertflow.api.concert.service.interfaces.ConcertService;
import com.concertflow.api.concert.validator.ConcertValidator;
import com.concertflow.api.concert.workflow.ApprovalWorkflowService;
import com.concertflow.api.exceptions.types.ArtistNotFoundException;
import com.concertflow.api.exceptions.types.ConcertNotFoundException;
import com.concertflow.api.mappers.ConcertMapper;
import com.concertflow.api.user.entity.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.concertflow.api.exceptions.ErrorMessage.ARTIST_NOT_FOUND;
import static com.concertflow.api.exceptions.ErrorMessage.CONCERT_NOT_FOUND;

@Service
@Transactional
@RequiredArgsConstructor
public class ConcertServiceImpl implements ConcertService {
    private final ConcertRepository concertRepository;
    private final ArtistRepository artistRepository;
    private final ConcertMapper concertMapper;
    private final ConcertValidator concertValidator;
    private final ConcertAuthorizationService authorizationService;
    private final ApprovalWorkflowService approvalWorkflowService;
    private final ConcertBuilder concertBuilder;

    @Override
    public List<ConcertResponse> getAllConcerts(
        ConcertStatus status,
        Long artistId,
        Long coordinatorId,
        String search,
        int page,
        int pageSize
    ) {
        Pageable pageable = PageRequest.of(page, pageSize, Sort.by("date").ascending());
        
        String searchTerm = (search != null && !search.trim().isEmpty()) ? search.trim() : null;
        String statusString = (status != null) ? status.name() : null;
        
        Page<Concert> concerts = concertRepository.findWithFilters(
            statusString,
            artistId,
            coordinatorId,
            searchTerm,
            pageable
        );

        return concerts.getContent().stream()
            .map(concertMapper::toResponse)
            .collect(Collectors.toList());
    }

    @Override
    public ConcertResponse getConcertById(Long id) {
        Concert concert = findConcertById(id);
        return concertMapper.toResponse(concert);
    }

    @Override
    public void createConcert(ConcertRequest request, User coordinator) {
        concertValidator.validate(request);

        Artist artist = findArtistById(request.artistId());
        Concert concert = concertBuilder.build(request, artist, coordinator);

        concert = concertRepository.save(concert);
        approvalWorkflowService.createApprovalWorkflow(concert);
        concertRepository.save(concert);
    }

    @Override
    public void updateConcert(Long id, ConcertRequest request, User coordinator) {
        concertValidator.validate(request);

        Concert concert = findConcertById(id);
        authorizationService.validateCoordinatorAccess(concert, coordinator);

        Artist artist = findArtistById(request.artistId());
        concertBuilder.updateFields(concert, request, artist);
        concertRepository.save(concert);
    }

    @Override
    public void deleteConcert(Long id, User coordinator) {
        Concert concert = findConcertById(id);
        authorizationService.validateCoordinatorAccess(concert, coordinator);
        concertRepository.delete(concert);
    }

    @Override
    public void cancelConcert(Long id, CancelConcertRequest request, User coordinator) {
        Concert concert = findConcertById(id);
        authorizationService.validateCoordinatorAccess(concert, coordinator);
        
        if (concert.getStatus() == ConcertStatus.COMPLETED) {
            throw new IllegalStateException("Cannot cancel a completed concert");
        }
        
        concert.setStatus(ConcertStatus.CANCELLED);
        concert.setCancellationReason(request.cancellationReason());
        concertRepository.save(concert);
    }

    private Concert findConcertById(Long id) {
        return concertRepository.findById(id)
            .orElseThrow(() -> new ConcertNotFoundException(CONCERT_NOT_FOUND.message()));
    }

    private Artist findArtistById(Long id) {
        return artistRepository.findById(id)
            .orElseThrow(() -> new ArtistNotFoundException(ARTIST_NOT_FOUND.message()));
    }
}
