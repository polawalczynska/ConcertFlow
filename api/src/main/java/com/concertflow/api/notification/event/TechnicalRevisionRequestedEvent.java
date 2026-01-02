package com.concertflow.api.notification.event;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.user.entity.User;

public record TechnicalRevisionRequestedEvent(Concert concert, User requester) {
}

