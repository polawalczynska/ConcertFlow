package com.concertflow.api.approval.chain.handler;

import com.concertflow.api.approval.chain.ApprovalHandler;
import com.concertflow.api.approval.chain.ApprovalRequest;
import com.concertflow.api.concert.entity.BudgetStatus;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertRepository;
import com.concertflow.api.notification.event.BudgetSubmittedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@Slf4j
@RequiredArgsConstructor
public class BudgetSubmissionHandler extends ApprovalHandler {
    private final ConcertRepository concertRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Override
    protected boolean canHandle(ApprovalRequest request) {
        return request.getAction() == ApprovalRequest.ApprovalAction.SUBMIT_BUDGET;
    }

    @Override
    protected boolean process(ApprovalRequest request) {
        log.info("Processing budget submission for concert: {}", request.getConcert().getId());
        
        Concert concert = request.getConcert();
        
        concert.setSubmittedBudget(concert.getBudget() != null ? concert.getBudget() : BigDecimal.ZERO);
        concert.setBudgetStatus(BudgetStatus.SUBMITTED);
        concert.setBudgetVersion(concert.getBudgetVersion() + 1);
        
        concertRepository.save(concert);
        eventPublisher.publishEvent(new BudgetSubmittedEvent(concert, request.getUser()));
        
        log.info("Budget submitted for approval, concert: {}", concert.getId());
        return true;
    }
}

