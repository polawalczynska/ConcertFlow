package com.concertflow.api.concert.state;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class ApprovedState implements ConcertState {

    @Override
    public ConcertStatus getStatus() {
        return ConcertStatus.APPROVED;
    }

    @Override
    public ConcertState approve(Concert concert) {
        return this;
    }

    @Override
    public ConcertState cancel(Concert concert, String cancellationReason) {
        log.info("Transitioning concert {} from APPROVED to CANCELLED", concert.getId());
        concert.setStatus(ConcertStatus.CANCELLED);
        concert.setCancellationReason(cancellationReason);
        return new CancelledState();
    }

    @Override
    public ConcertState complete(Concert concert) {
        log.info("Transitioning concert {} from APPROVED to COMPLETED", concert.getId());
        concert.setStatus(ConcertStatus.COMPLETED);
        return new CompletedState();
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
        return targetStatus == ConcertStatus.COMPLETED ||
            targetStatus == ConcertStatus.CANCELLED;
    }
}

