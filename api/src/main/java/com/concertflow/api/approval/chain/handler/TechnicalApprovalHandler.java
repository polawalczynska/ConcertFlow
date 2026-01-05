package com.concertflow.api.approval.chain.handler;

import com.concertflow.api.approval.chain.AbstractApprovalHandler;
import com.concertflow.api.approval.chain.ApprovalRequest;
import com.concertflow.api.concert.entity.ApprovalDecision;
import com.concertflow.api.concert.entity.BudgetStatus;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertRepository;
import com.concertflow.api.concert.entity.ConcertStatus;
import com.concertflow.api.concert.entity.TechnicalApproval;
import com.concertflow.api.concert.entity.TechnicalRequirements;
import com.concertflow.api.concert.entity.TechnicalRequirementsRepository;
import com.concertflow.api.concert.entity.TechnicalStatus;
import com.concertflow.api.exceptions.types.TechnicalVersionConflictException;
import com.concertflow.api.notification.event.ConcertStatusChangedEvent;
import com.concertflow.api.notification.event.TechnicalApprovedEvent;
import com.concertflow.api.notification.event.TechnicalRevisionRequestedEvent;
import com.concertflow.api.technical.service.TechnicalApprovalRecordService;
import com.concertflow.api.technical.service.TechnicalRevisionCommentBuilder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Slf4j
@RequiredArgsConstructor
public class TechnicalApprovalHandler extends AbstractApprovalHandler {
    private final ConcertRepository concertRepository;
    private final TechnicalRequirementsRepository technicalRequirementsRepository;
    private final TechnicalApprovalRecordService approvalRecordService;
    private final TechnicalRevisionCommentBuilder revisionCommentBuilder;
    private final ApplicationEventPublisher eventPublisher;

    @Override
    protected boolean canHandle(ApprovalRequest request) {
        return request.getAction() == ApprovalRequest.ApprovalAction.APPROVE_TECHNICAL ||
               request.getAction() == ApprovalRequest.ApprovalAction.REQUEST_TECHNICAL_REVISION;
    }

    @Override
    protected boolean process(ApprovalRequest request) {
        if (request.getAction() == ApprovalRequest.ApprovalAction.APPROVE_TECHNICAL) {
            return handleApproval(request);
        } else {
            return handleRevisionRequest(request);
        }
    }

    private boolean handleApproval(ApprovalRequest request) {
        log.info("Processing technical approval for concert: {}", request.getConcert().getId());
        
        Concert concert = request.getConcert();
        com.concertflow.api.technical.dto.ApproveTechnicalRequest approveRequest = 
            (com.concertflow.api.technical.dto.ApproveTechnicalRequest) request.getRequestData();
        
        TechnicalRequirements requirements = getOrCreateTechnicalRequirements(concert);
        
        if (!requirements.getVersion().equals(approveRequest.technicalVersion())) {
            throw new TechnicalVersionConflictException(
                "Technical requirements have been modified. Please refresh.");
        }

        concert.setTechnicalStatus(TechnicalStatus.APPROVED);
        requirements.setStatus(TechnicalStatus.APPROVED);
        requirements.setApprovedAt(LocalDateTime.now());
        requirements.setApprovedById(request.getUser().getId());

        TechnicalApproval approval = approvalRecordService.createApprovalRecord(
            concert,
            request.getUser(),
            ApprovalDecision.APPROVED,
            null
        );
        concert.getTechnicalApprovals().add(approval);

        technicalRequirementsRepository.save(requirements);
        concertRepository.save(concert);
        eventPublisher.publishEvent(new TechnicalApprovedEvent(concert, request.getUser()));
        
        checkAndSetFinalApproval(concert);
        
        log.info("Technical requirements approved for concert: {}", concert.getId());
        return true;
    }

    private boolean handleRevisionRequest(ApprovalRequest request) {
        log.info("Processing technical revision request for concert: {}", request.getConcert().getId());
        
        Concert concert = request.getConcert();
        com.concertflow.api.technical.dto.RequestTechnicalRevisionRequest revisionRequest = 
            (com.concertflow.api.technical.dto.RequestTechnicalRevisionRequest) request.getRequestData();
        
        concert.setTechnicalStatus(TechnicalStatus.REVISION_REQUESTED);
        TechnicalRequirements requirements = getOrCreateTechnicalRequirements(concert);
        requirements.setStatus(TechnicalStatus.REVISION_REQUESTED);

        String comments = revisionCommentBuilder.buildRevisionComments(revisionRequest);
        TechnicalApproval revisionApproval = approvalRecordService.createApprovalRecord(
            concert,
            request.getUser(),
            ApprovalDecision.RETURNED_FOR_REVISION,
            comments
        );
        revisionApproval.setRequiresRevision(true);
        concert.getTechnicalApprovals().add(revisionApproval);

        technicalRequirementsRepository.save(requirements);
        concertRepository.save(concert);
        eventPublisher.publishEvent(new TechnicalRevisionRequestedEvent(concert, request.getUser()));
        
        log.info("Technical revision requested for concert: {}", concert.getId());
        return true;
    }

    private void checkAndSetFinalApproval(Concert concert) {   
        Concert refreshedConcert = concertRepository.findById(concert.getId())
            .orElse(concert);
        
        if (refreshedConcert.getBudgetStatus() == BudgetStatus.APPROVED && 
            refreshedConcert.getTechnicalStatus() == TechnicalStatus.APPROVED) {
            
            if (refreshedConcert.getStatus() != ConcertStatus.APPROVED) {
                ConcertStatus oldStatus = refreshedConcert.getStatus();
                refreshedConcert.setStatus(ConcertStatus.APPROVED);
                concertRepository.save(refreshedConcert);
                
                eventPublisher.publishEvent(
                    new ConcertStatusChangedEvent(refreshedConcert, oldStatus, ConcertStatus.APPROVED)
                );
                
                log.info("Concert status set to APPROVED (both budget and technical requirements approved), concert: {}", 
                    refreshedConcert.getId());
            }
        }
    }

    private TechnicalRequirements getOrCreateTechnicalRequirements(Concert concert) {
        return technicalRequirementsRepository.findByConcertId(concert.getId())
            .orElseGet(() -> {
                TechnicalRequirements requirements = TechnicalRequirements.builder()
                    .concert(concert)
                    .status(TechnicalStatus.PENDING)
                    .version(1)
                    .build();
                return technicalRequirementsRepository.save(requirements);
            });
    }
}

