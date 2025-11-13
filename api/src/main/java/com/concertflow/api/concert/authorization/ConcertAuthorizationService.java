package com.concertflow.api.concert.authorization;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.exceptions.types.UnauthorizedAccessException;
import com.concertflow.api.user.entity.User;
import org.springframework.stereotype.Component;

import static com.concertflow.api.exceptions.ErrorMessage.UNAUTHORIZED_ACCESS;

@Component
public class ConcertAuthorizationService {
    public void validateCoordinatorAccess(Concert concert, User coordinator) {
        if (!concert.getCoordinator().getId().equals(coordinator.getId())) {
            throw new UnauthorizedAccessException(UNAUTHORIZED_ACCESS.message());
        }
    }
}

