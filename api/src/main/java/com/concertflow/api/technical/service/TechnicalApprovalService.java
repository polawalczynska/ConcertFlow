package com.concertflow.api.technical.service;

import com.concertflow.api.approval.chain.ApprovalChainService;
import com.concertflow.api.approval.chain.ApprovalRequest;
import com.concertflow.api.concert.entity.*;
import com.concertflow.api.exceptions.types.ConcertNotFoundException;
import com.concertflow.api.mappers.TechnicalMapper;
import com.concertflow.api.security.annotation.RequireTechnicalManager;
import com.concertflow.api.technical.dto.*;
import com.concertflow.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final TechnicalRequirementsService technicalRequirementsService;
    private final ApprovalChainService approvalChainService;

    @RequireTechnicalManager
    public Page<TechnicalApprovalDashboardResponse> getPendingTechnicalApprovals(
        Pageable pageable,
        Long technicalManagerId,
        User authenticatedUser
    ) {
        log.debug("Fetching technical approvals for technical manager ID: {}", technicalManagerId);

        accessValidator.validateTechnicalManagerIdMatchesUser(technicalManagerId, authenticatedUser);

        List<TechnicalStatus> allowedStatuses = List.of(
            TechnicalStatus.SUBMITTED,
            TechnicalStatus.REVISION_REQUESTED,
            TechnicalStatus.APPROVED
        );
        Page<Concert> concerts = concertRepository.findByTechnicalManagerIdWithSubmittedStatus(
            technicalManagerId,
            allowedStatuses,
            pageable
        );

        return concerts.map(concert -> {
            List<String> flags = extractTechnicalFlags(concert);
            return technicalMapper.toDashboardResponse(concert, flags);
        });
    }

    @RequireTechnicalManager
    public TechnicalDetailResponse getTechnicalDetails(
        Long concertId,
        Long technicalManagerId,
        User authenticatedUser
    ) {
        log.debug("Fetching technical details for concert: {}, technical manager ID: {}", concertId, technicalManagerId);

        accessValidator.validateTechnicalManagerIdMatchesUser(technicalManagerId, authenticatedUser);

        Concert concert = findConcertById(concertId);
        
        TechnicalStatus status = concert.getTechnicalStatus();
        if (status == TechnicalStatus.PENDING) {
            throw new IllegalStateException("Technical requirements have not been submitted yet. They are only visible after submission.");
        }

        return technicalMapper.toDetailResponse(concert);
    }

    @RequireTechnicalManager
    public void approveTechnical(Long concertId, ApproveTechnicalRequest request, User approver) {
        log.info("Approving technical requirements for concert: {}, approver: {}", concertId, approver.getEmail());

        Concert concert = findConcertById(concertId);
        accessValidator.validateTechnicalManagerAccess(concert, approver);
        accessValidator.validateTechnicalForApproval(concert);

        ApprovalRequest approvalRequest = ApprovalRequest.builder()
            .concert(concert)
            .user(approver)
            .action(ApprovalRequest.ApprovalAction.APPROVE_TECHNICAL)
            .requestData(request)
            .build();

        approvalChainService.process(approvalRequest);

        log.info("Technical requirements approved for concert: {}", concertId);
    }

    @RequireTechnicalManager
    public void requestRevision(Long concertId, RequestTechnicalRevisionRequest request, User requester) {
        log.info("Requesting technical revision for concert: {}", concertId);

        Concert concert = findConcertById(concertId);
        accessValidator.validateTechnicalManagerAccess(concert, requester);

        ApprovalRequest approvalRequest = ApprovalRequest.builder()
            .concert(concert)
            .user(requester)
            .action(ApprovalRequest.ApprovalAction.REQUEST_TECHNICAL_REVISION)
            .requestData(request)
            .build();

        approvalChainService.process(approvalRequest);

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

