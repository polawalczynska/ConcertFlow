package com.concertflow.api.concert.state;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertStatus;
import com.concertflow.api.exceptions.types.InvalidConcertStatusTransitionException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class CompletedState implements ConcertState {
    
    @Override
    public ConcertStatus getStatus() {
        return ConcertStatus.COMPLETED;
    }
    
    @Override
    public ConcertState approve(Concert concert) {
        throw new InvalidConcertStatusTransitionException(
            "Cannot approve a completed concert."
        );
    }
    
    @Override
    public ConcertState cancel(Concert concert, String cancellationReason) {
        throw new InvalidConcertStatusTransitionException(
            "Cannot cancel a completed concert."
        );
    }
    
    @Override
    public ConcertState complete(Concert concert) {
        return this;
    }
    
    @Override
    public boolean canEdit(Concert concert) {
        return false; 
    }
    
    @Override
    public boolean canDelete(Concert concert) {
        return false;
    }
    
    @Override
    public boolean canTransitionTo(ConcertStatus targetStatus) {
        return false;
    }
}

