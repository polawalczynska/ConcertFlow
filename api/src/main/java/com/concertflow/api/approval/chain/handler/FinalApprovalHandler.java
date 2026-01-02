package com.concertflow.api.approval.chain.handler;

import com.concertflow.api.approval.chain.AbstractApprovalHandler;
import com.concertflow.api.approval.chain.ApprovalRequest;
import com.concertflow.api.concert.entity.BudgetStatus;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertRepository;
import com.concertflow.api.concert.entity.ConcertStatus;
import com.concertflow.api.concert.entity.TechnicalStatus;
import com.concertflow.api.notification.event.ConcertStatusChangedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class FinalApprovalHandler extends AbstractApprovalHandler {
    private final ConcertRepository concertRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Override
    protected boolean canHandle(ApprovalRequest request) {
        return true;
    }

    @Override
    protected boolean process(ApprovalRequest request) {
        Concert concert = request.getConcert();
        ConcertStatus oldStatus = concert.getStatus();
        
        if (concert.getBudgetStatus() == BudgetStatus.APPROVED && 
            concert.getTechnicalStatus() == TechnicalStatus.APPROVED) {
            
            if (concert.getStatus() != ConcertStatus.APPROVED) {
                concert.setStatus(ConcertStatus.APPROVED);
                concertRepository.save(concert);
                
                eventPublisher.publishEvent(
                    new ConcertStatusChangedEvent(concert, oldStatus, ConcertStatus.APPROVED)
                );
                
                log.info("Concert status set to APPROVED (both budget and technical requirements approved), concert: {}", 
                    concert.getId());
            }
        }
        
        return true;
    }
}

