package com.concertflow.api.concert.state;

import com.concertflow.api.concert.entity.BudgetStatus;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertStatus;
import com.concertflow.api.concert.entity.TechnicalStatus;
import com.concertflow.api.exceptions.types.InvalidConcertStatusTransitionException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class PlanningState implements ConcertState {
    
    @Override
    public ConcertStatus getStatus() {
        return ConcertStatus.PLANNING;
    }
    
    @Override
    public ConcertState approve(Concert concert) {
        if (concert.getBudgetStatus() == BudgetStatus.APPROVED && 
            concert.getTechnicalStatus() == TechnicalStatus.APPROVED) {
            log.info("Transitioning concert {} from PLANNING to APPROVED", concert.getId());
            concert.setStatus(ConcertStatus.APPROVED);
            return new ApprovedState();
        }
        throw new InvalidConcertStatusTransitionException(
            "Cannot approve concert. Both budget and technical requirements must be approved first."
        );
    }
    
    @Override
    public ConcertState cancel(Concert concert, String cancellationReason) {
        log.info("Transitioning concert {} from PLANNING to CANCELLED", concert.getId());
        concert.setStatus(ConcertStatus.CANCELLED);
        concert.setCancellationReason(cancellationReason);
        return new CancelledState();
    }
    
    @Override
    public ConcertState complete(Concert concert) {
        throw new InvalidConcertStatusTransitionException(
            "Cannot complete a concert that is still in planning phase."
        );
    }
    
    @Override
    public boolean canEdit(Concert concert) {
        return true; 
    }
    
    @Override
    public boolean canDelete(Concert concert) {
        return true; 
    }
    
    @Override
    public boolean canTransitionTo(ConcertStatus targetStatus) {
        return targetStatus == ConcertStatus.APPROVED || 
               targetStatus == ConcertStatus.CANCELLED;
    }
}

