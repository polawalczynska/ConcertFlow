package com.concertflow.api.dashboard.service.calculator;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertStatus;
import com.concertflow.api.dashboard.config.DashboardConstants;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class ConcertsNeedingAttentionCalculator implements StatCalculator<Long> {
    @Override
    public Long calculate(List<Concert> concerts) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime oneMonthFromNow = now.plusDays(DashboardConstants.ATTENTION_NEEDED_DAYS.getValue());

        return concerts.stream()
            .filter(concert -> needsAttention(concert, now, oneMonthFromNow))
            .count();
    }

    private boolean needsAttention(Concert concert, LocalDateTime now, LocalDateTime oneMonthFromNow) {
        return concert.getStatus() == ConcertStatus.PLANNING
            && concert.getDate() != null
            && concert.getDate().isAfter(now)
            && concert.getDate().isBefore(oneMonthFromNow);
    }
}

