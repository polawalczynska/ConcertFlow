package com.concertflow.api.notification.event;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertStatus;

public record ConcertStatusChangedEvent(Concert concert, ConcertStatus oldStatus, ConcertStatus newStatus) {
}

