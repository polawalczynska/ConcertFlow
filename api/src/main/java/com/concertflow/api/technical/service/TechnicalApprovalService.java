package com.concertflow.api.technical.service;

import com.concertflow.api.concert.entity.*;
import com.concertflow.api.exceptions.types.ConcertNotFoundException;
import com.concertflow.api.mappers.TechnicalMapper;
import com.concertflow.api.technical.dto.*;
import com.concertflow.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class TechnicalApprovalService {
    private final ConcertRepository concertRepository;
    private final TechnicalRequirementsRepository technicalRequirementsRepository;
    private final TechnicalApprovalRepository technicalApprovalRepository;
    private final TechnicalMapper technicalMapper;
    private final TechnicalAccessValidator accessValidator;
    private final TechnicalApprovalRecordService approvalRecordService;
    private final TechnicalRequirementsService technicalRequirementsService;
    private final TechnicalRevisionCommentBuilder revisionCommentBuilder;

    @PreAuthorize("hasRole('TECHNICAL_MANAGER')")
    public Page<TechnicalApprovalDashboardResponse> getPendingTechnicalApprovals(
        Pageable pageable,
        Long technicalManagerId,
        User authenticatedUser
    ) {
        log.debug("Fetching technical approvals for technical manager ID: {}", technicalManagerId);

        accessValidator.validateTechnicalManagerIdMatchesUser(technicalManagerId, authenticatedUser);

        Page<Concert> concerts = concertRepository.findByStatusAndTechnicalManagerId(
            ConcertStatus.PLANNING,
            technicalManagerId,
            pageable
        );

        return concerts.map(concert -> {
            List<String> flags = extractTechnicalFlags(concert);
            return technicalMapper.toDashboardResponse(concert, flags);
        });
    }

    @PreAuthorize("hasRole('TECHNICAL_MANAGER')")
    public TechnicalDetailResponse getTechnicalDetails(
        Long concertId,
        Long technicalManagerId,
        User authenticatedUser
    ) {
        log.debug("Fetching technical details for concert: {}, technical manager ID: {}", concertId, technicalManagerId);

        accessValidator.validateTechnicalManagerIdMatchesUser(technicalManagerId, authenticatedUser);

        Concert concert = findConcertById(concertId);
        accessValidator.validateTechnicalManagerAccessById(concert, technicalManagerId);

        return technicalMapper.toDetailResponse(concert);
    }

    @PreAuthorize("hasRole('TECHNICAL_MANAGER')")
    public void approveTechnical(Long concertId, ApproveTechnicalRequest request, User approver) {
        log.info("Approving technical requirements for concert: {}, approver: {}", concertId, approver.getEmail());

        Concert concert = findConcertById(concertId);
        accessValidator.validateTechnicalManagerAccess(concert, approver);
        accessValidator.validateTechnicalForApproval(concert);

        TechnicalRequirements requirements = technicalRequirementsService.getOrCreateTechnicalRequirements(concert);

        if (!requirements.getVersion().equals(request.technicalVersion())) {
            throw new com.concertflow.api.exceptions.types.TechnicalVersionConflictException(
                "Technical requirements have been modified. Please refresh.");
        }

        concert.setTechnicalStatus(TechnicalStatus.APPROVED);
        requirements.setStatus(TechnicalStatus.APPROVED);
        requirements.setApprovedAt(LocalDateTime.now());
        requirements.setApprovedById(approver.getId());

        if (concert.getBudgetStatus() == BudgetStatus.APPROVED) {
            concert.setStatus(ConcertStatus.APPROVED);
            log.info("Concert status set to APPROVED (both budget and technical requirements approved)");
        }

        TechnicalApproval approval = approvalRecordService.createApprovalRecord(
            concert,
            approver,
            ApprovalDecision.APPROVED,
            null
        );
        concert.getTechnicalApprovals().add(approval);

        technicalRequirementsRepository.save(requirements);
        concertRepository.save(concert);

        log.info("Technical requirements approved for concert: {}", concertId);
    }

    @PreAuthorize("hasRole('TECHNICAL_MANAGER')")
    public void requestRevision(Long concertId, RequestTechnicalRevisionRequest request, User requester) {
        log.info("Requesting technical revision for concert: {}", concertId);

        Concert concert = findConcertById(concertId);
        accessValidator.validateTechnicalManagerAccess(concert, requester);

        concert.setTechnicalStatus(TechnicalStatus.REVISION_REQUESTED);
        TechnicalRequirements requirements = technicalRequirementsService.getOrCreateTechnicalRequirements(concert);
        requirements.setStatus(TechnicalStatus.REVISION_REQUESTED);

        String comments = revisionCommentBuilder.buildRevisionComments(request);
        TechnicalApproval revisionRequest = approvalRecordService.createApprovalRecord(
            concert,
            requester,
            ApprovalDecision.RETURNED_FOR_REVISION,
            comments
        );
        revisionRequest.setRequiresRevision(true);
        concert.getTechnicalApprovals().add(revisionRequest);

        technicalRequirementsRepository.save(requirements);
        concertRepository.save(concert);

        log.info("Technical revision requested for concert: {}", concertId);
    }


    private List<String> extractTechnicalFlags(Concert concert) {
        TechnicalRequirements requirements = concert.getTechnicalRequirements();
        if (requirements == null || requirements.getTechnicalFlags() == null) {
            return List.of();
        }
        return List.of(requirements.getTechnicalFlags().split(","));
    }


    private Concert findConcertById(Long concertId) {
        return concertRepository.findById(concertId)
            .orElseThrow(() -> new ConcertNotFoundException("Concert not found with ID: " + concertId));
    }
}

