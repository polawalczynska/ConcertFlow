package com.concertflow.api.concert.state;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertStatus;
import com.concertflow.api.exceptions.types.InvalidConcertStatusTransitionException;

public interface ConcertState {
    ConcertStatus getStatus();
    
    ConcertState approve(Concert concert);

    ConcertState cancel(Concert concert, String cancellationReason);
    
    ConcertState complete(Concert concert);
    
    boolean canEdit(Concert concert);
    
    boolean canDelete(Concert concert);

    boolean canTransitionTo(ConcertStatus targetStatus);
}

