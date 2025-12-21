package com.concertflow.api.dashboard.service.calculator;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertStatus;
import com.concertflow.api.dashboard.config.DashboardConstants;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class UpcomingConcertsCalculator implements StatCalculator<Long> {
    @Override
    public Long calculate(List<Concert> concerts) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime endDate = now.plusDays(DashboardConstants.UPCOMING_DAYS.getValue());

        return concerts.stream()
            .filter(concert -> isUpcomingConcert(concert, now, endDate))
            .count();
    }

    private boolean isUpcomingConcert(Concert concert, LocalDateTime now, LocalDateTime endDate) {
        return concert.getDate() != null
            && concert.getDate().isAfter(now)
            && concert.getDate().isBefore(endDate)
            && concert.getStatus() != ConcertStatus.CANCELLED;
    }
}

