package com.concertflow.api.approval.chain.service;

import com.concertflow.api.concert.entity.BudgetStatus;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertRepository;
import com.concertflow.api.concert.entity.ConcertStatus;
import com.concertflow.api.concert.entity.TechnicalStatus;
import com.concertflow.api.concert.state.ConcertStateManager;
import com.concertflow.api.notification.event.ConcertStatusChangedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class FinalApprovalService {
    private final ConcertRepository concertRepository;
    private final ConcertStateManager concertStateManager;
    private final ApplicationEventPublisher eventPublisher;

    public void checkAndSetFinalApproval(Concert concert) {
        Concert refreshedConcert = concertRepository.findById(concert.getId())
            .orElse(concert);
        
        if (isBothApproved(refreshedConcert) && !isAlreadyApproved(refreshedConcert)) {
            approveConcert(refreshedConcert);
        }
    }

    private boolean isBothApproved(Concert concert) {
        return concert.getBudgetStatus() == BudgetStatus.APPROVED && 
               concert.getTechnicalStatus() == TechnicalStatus.APPROVED;
    }

    private boolean isAlreadyApproved(Concert concert) {
        return concert.getStatus() == ConcertStatus.APPROVED;
    }

    private void approveConcert(Concert concert) {
        ConcertStatus oldStatus = concert.getStatus();
        boolean approved = concertStateManager.approve(concert);
        
        if (approved) {
            Concert savedConcert = concertRepository.findById(concert.getId())
                .orElse(concert);
            
            eventPublisher.publishEvent(
                new ConcertStatusChangedEvent(savedConcert, oldStatus, ConcertStatus.APPROVED)
            );
        }
    }
}

