package com.concertflow.api.concert.state;

import com.concertflow.api.concert.entity.ConcertStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class ConcertStateFactory {
    
    private final Map<ConcertStatus, ConcertState> stateMap;
    
    public ConcertStateFactory(
            PlanningState planningState,
            ApprovedState approvedState,
            CompletedState completedState,
            CancelledState cancelledState
    ) {
        this.stateMap = Map.of(
            ConcertStatus.PLANNING, planningState,
            ConcertStatus.APPROVED, approvedState,
            ConcertStatus.COMPLETED, completedState,
            ConcertStatus.CANCELLED, cancelledState
        );
    }
    
    public ConcertState getState(ConcertStatus status) {
        ConcertState state = stateMap.get(status);
        if (state == null) {
            throw new IllegalArgumentException("Unknown concert status: " + status);
        }
        return state;
    }
}

