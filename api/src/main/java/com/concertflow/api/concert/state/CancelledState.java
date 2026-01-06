package com.concertflow.api.concert.state;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertStatus;
import com.concertflow.api.exceptions.types.InvalidConcertStatusTransitionException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class CancelledState implements ConcertState {
    
    @Override
    public ConcertStatus getStatus() {
        return ConcertStatus.CANCELLED;
    }
    
    @Override
    public ConcertState approve(Concert concert) {
        throw new InvalidConcertStatusTransitionException(
            "Cannot approve a cancelled concert."
        );
    }
    
    @Override
    public ConcertState cancel(Concert concert, String cancellationReason) {
        if (cancellationReason != null && !cancellationReason.isEmpty()) {
            concert.setCancellationReason(cancellationReason);
        }
        return this;
    }
    
    @Override
    public ConcertState complete(Concert concert) {
        throw new InvalidConcertStatusTransitionException(
            "Cannot complete a cancelled concert."
        );
    }
    
    @Override
    public boolean canEdit(Concert concert) {
        return false; 
    }
    
    @Override
    public boolean canDelete(Concert concert) {
        return true; 
    }
    
    @Override
    public boolean canTransitionTo(ConcertStatus targetStatus) {
        return false;
    }
}

