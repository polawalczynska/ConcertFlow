package com.concertflow.api.concert.service;

import com.concertflow.api.artist.entity.Artist;
import com.concertflow.api.concert.authorization.ConcertAuthorizationService;
import com.concertflow.api.concert.builder.ConcertBuilder;
import com.concertflow.api.concert.dto.CancelConcertRequest;
import com.concertflow.api.concert.dto.ConcertRequest;
import com.concertflow.api.concert.dto.ConcertResponse;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertRepository;
import com.concertflow.api.concert.entity.ConcertStatus;
import com.concertflow.api.concert.service.BudgetManagerChangeHandler;
import com.concertflow.api.concert.service.EntityFinderService;
import com.concertflow.api.concert.service.UserFinderService;
import com.concertflow.api.concert.state.ConcertStateManager;
import com.concertflow.api.concert.validator.ConcertValidator;
import com.concertflow.api.concert.workflow.ApprovalWorkflowService;
import com.concertflow.api.exceptions.types.UnauthorizedAccessException;
import com.concertflow.api.mappers.ConcertMapper;
import com.concertflow.api.team.service.TeamMemberService;
import com.concertflow.api.user.entity.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ConcertService {
    private final ConcertRepository concertRepository;
    private final ConcertMapper concertMapper;
    private final ConcertValidator concertValidator;
    private final ConcertAuthorizationService authorizationService;
    private final ApprovalWorkflowService approvalWorkflowService;
    private final ConcertBuilder concertBuilder;
    private final BudgetManagerChangeHandler budgetManagerChangeHandler;
    private final EntityFinderService entityFinder;
    private final UserFinderService userFinder;
    private final TeamMemberService teamMemberService;
    private final ConcertStateManager concertStateManager;

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


    @CacheEvict(value = "dashboardStats", allEntries = true)
    public void createConcert(ConcertRequest request, User coordinator) {
        concertValidator.validate(request);

        Artist artist = entityFinder.findArtistById(request.artistId());
        User budgetManager = request.budgetManagerId() != null 
            ? userFinder.findBudgetManagerById(request.budgetManagerId())
            : null;
        User technicalManager = request.technicalManagerId() != null
            ? userFinder.findTechnicalManagerById(request.technicalManagerId())
            : null;
        
        if (budgetManager != null && !teamMemberService.isTeamMember(budgetManager.getId(), coordinator.getId())) {
            throw new UnauthorizedAccessException("Budget manager must be a member of your team");
        }
        if (technicalManager != null && !teamMemberService.isTeamMember(technicalManager.getId(), coordinator.getId())) {
            throw new UnauthorizedAccessException("Technical manager must be a member of your team");
        }
        
        Concert concert = concertBuilder.build(request, artist, coordinator, budgetManager, technicalManager);

        concert = concertRepository.save(concert);
        approvalWorkflowService.createApprovalWorkflow(concert);
        concertRepository.save(concert);
    }

    @CacheEvict(value = "dashboardStats", allEntries = true)
    public void updateConcert(Long id, ConcertRequest request, User coordinator) {
        concertValidator.validate(request);

        Concert concert = entityFinder.findConcertById(id);
        authorizationService.validateCoordinatorAccess(concert, coordinator);
        
        if (!concertStateManager.canEdit(concert)) {
            throw new IllegalStateException("Concert cannot be edited in its current state: " + concert.getStatus());
        }

        Artist artist = entityFinder.findArtistById(request.artistId());
        User budgetManager = request.budgetManagerId() != null 
            ? userFinder.findBudgetManagerById(request.budgetManagerId())
            : null;
        User technicalManager = request.technicalManagerId() != null
            ? userFinder.findTechnicalManagerById(request.technicalManagerId())
            : null;
        if (budgetManager != null && !teamMemberService.isTeamMember(budgetManager.getId(), coordinator.getId())) {
            throw new UnauthorizedAccessException("Budget manager must be a member of your team");
        }
        if (technicalManager != null && !teamMemberService.isTeamMember(technicalManager.getId(), coordinator.getId())) {
            throw new UnauthorizedAccessException("Technical manager must be a member of your team");
        }
        
        budgetManagerChangeHandler.handleBudgetManagerChange(concert, budgetManager);
        
        concertBuilder.updateFields(concert, request, artist, budgetManager, technicalManager);
        concertRepository.save(concert);
    }

    @CacheEvict(value = "dashboardStats", allEntries = true)
    public void deleteConcert(Long id, User coordinator) {
        Concert concert = entityFinder.findConcertById(id);
        authorizationService.validateCoordinatorAccess(concert, coordinator);
        
        if (!concertStateManager.canDelete(concert)) {
            throw new IllegalStateException("Concert cannot be deleted in its current state: " + concert.getStatus());
        }
        
        concertRepository.delete(concert);
        concertRepository.flush();
    }

    @CacheEvict(value = "dashboardStats", allEntries = true)
    public void cancelConcert(Long id, CancelConcertRequest request, User coordinator) {
        Concert concert = entityFinder.findConcertById(id);
        authorizationService.validateCoordinatorAccess(concert, coordinator);
        
        concertStateManager.cancel(concert, request.cancellationReason());
    }

    public ConcertResponse getConcertById(Long id) {
        Concert concert = entityFinder.findConcertById(id);
        return concertMapper.toResponse(concert);
    }
}
