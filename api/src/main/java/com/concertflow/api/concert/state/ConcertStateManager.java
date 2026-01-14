package com.concertflow.api.concert.state;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertRepository;
import com.concertflow.api.concert.entity.ConcertStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Slf4j
@RequiredArgsConstructor
public class ConcertStateManager {
    
    private final ConcertStateRegistry stateRegistry;
    private final ConcertRepository concertRepository;
    
    @Transactional
    public boolean approve(Concert concert) {
        ConcertState currentState = stateRegistry.getState(concert.getStatus());
        try {
            ConcertState newState = currentState.approve(concert);
            concertRepository.save(concert);
            log.info("Concert {} transitioned from {} to {}", 
                concert.getId(), currentState.getStatus(), newState.getStatus());
            return true;
        } catch (Exception e) {
            log.warn("Failed to approve concert {}: {}", concert.getId(), e.getMessage());
            return false;
        }
    }
    
    @Transactional
    public void cancel(Concert concert, String cancellationReason) {
        ConcertState currentState = stateRegistry.getState(concert.getStatus());
        ConcertState newState = currentState.cancel(concert, cancellationReason);
        concertRepository.save(concert);
        log.info("Concert {} transitioned from {} to {}", 
            concert.getId(), currentState.getStatus(), newState.getStatus());
    }
    
    @Transactional
    public void complete(Concert concert) {
        ConcertState currentState = stateRegistry.getState(concert.getStatus());
        ConcertState newState = currentState.complete(concert);
        concertRepository.save(concert);
        log.info("Concert {} transitioned from {} to {}", 
            concert.getId(), currentState.getStatus(), newState.getStatus());
    }
    
    public boolean canEdit(Concert concert) {
        ConcertState currentState = stateRegistry.getState(concert.getStatus());
        return currentState.canEdit(concert);
    }
    
    public boolean canDelete(Concert concert) {
        ConcertState currentState = stateRegistry.getState(concert.getStatus());
        return currentState.canDelete(concert);
    }
    
    public boolean canTransitionTo(ConcertStatus currentStatus, ConcertStatus targetStatus) {
        ConcertState currentState = stateRegistry.getState(currentStatus);
        return currentState.canTransitionTo(targetStatus);
    }
}

