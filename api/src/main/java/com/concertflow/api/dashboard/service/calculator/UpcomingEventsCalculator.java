package com.concertflow.api.dashboard.service.calculator;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertStatus;
import com.concertflow.api.dashboard.config.DashboardConstants;
import com.concertflow.api.dashboard.dto.UpcomingEvent;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class UpcomingEventsCalculator implements StatCalculator<List<UpcomingEvent>> {
    @Override
    public List<UpcomingEvent> calculate(List<Concert> concerts) {
        LocalDateTime now = LocalDateTime.now();

        return concerts.stream()
            .filter(concert -> concert.getDate() != null
                && concert.getDate().isAfter(now)
                && concert.getStatus() != ConcertStatus.CANCELLED)
            .sorted((a, b) -> a.getDate().compareTo(b.getDate()))
            .limit(DashboardConstants.UPCOMING_EVENTS_COUNT.getValue())
            .map(concert -> {
                long daysUntil = java.time.Duration.between(now, concert.getDate()).toDays();
                LocalDateTime oneMonthFromNow = now.plusDays(DashboardConstants.ATTENTION_NEEDED_DAYS.getValue());
                
                boolean needsAttention = concert.getStatus() == ConcertStatus.PLANNING
                    && concert.getDate().isAfter(now)
                    && concert.getDate().isBefore(oneMonthFromNow);
                
                boolean isUpcoming = daysUntil <= DashboardConstants.UPCOMING_DAYS.getValue();
                
                String status = (needsAttention || isUpcoming) 
                    ? "Needs Attention" 
                    : "On Track";
                return UpcomingEvent.builder()
                    .id(concert.getId())
                    .name(concert.getName())
                    .date(concert.getDate())
                    .daysUntil(daysUntil)
                    .status(status)
                    .build();
            })
            .collect(Collectors.toList());
    }
}

