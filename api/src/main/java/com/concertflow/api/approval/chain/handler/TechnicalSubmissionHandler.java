package com.concertflow.api.approval.chain.handler;

import com.concertflow.api.approval.chain.ApprovalHandler;
import com.concertflow.api.approval.chain.ApprovalRequest;
import com.concertflow.api.concert.entity.BudgetStatus;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertRepository;
import com.concertflow.api.concert.entity.TechnicalRequirements;
import com.concertflow.api.concert.entity.TechnicalRequirementsRepository;
import com.concertflow.api.concert.entity.TechnicalStatus;
import com.concertflow.api.notification.event.TechnicalSubmittedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Slf4j
@RequiredArgsConstructor
public class TechnicalSubmissionHandler extends ApprovalHandler {
    private final ConcertRepository concertRepository;
    private final TechnicalRequirementsRepository technicalRequirementsRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Override
    protected boolean canHandle(ApprovalRequest request) {
        return request.getAction() == ApprovalRequest.ApprovalAction.SUBMIT_TECHNICAL;
    }

    @Override
    protected boolean process(ApprovalRequest request) {
        log.info("Processing technical submission for concert: {}", request.getConcert().getId());
        
        Concert concert = request.getConcert();
        
        if (concert.getBudgetStatus() != BudgetStatus.APPROVED) {
            throw new IllegalStateException("Budget must be approved before submitting technical requirements");
        }
        
        TechnicalRequirements requirements = getOrCreateTechnicalRequirements(concert);
        
        concert.setTechnicalStatus(TechnicalStatus.SUBMITTED);
        requirements.setStatus(TechnicalStatus.SUBMITTED);
        requirements.setSubmittedAt(LocalDateTime.now());
        requirements.setVersion(requirements.getVersion() + 1);
        
        technicalRequirementsRepository.save(requirements);
        concertRepository.save(concert);
        eventPublisher.publishEvent(new TechnicalSubmittedEvent(concert, request.getUser()));
        
        log.info("Technical requirements submitted for approval, concert: {}", concert.getId());
        return true;
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

