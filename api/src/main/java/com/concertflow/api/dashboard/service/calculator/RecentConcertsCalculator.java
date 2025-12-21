package com.concertflow.api.dashboard.service.calculator;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.dashboard.config.DashboardConstants;
import com.concertflow.api.dashboard.dto.RecentConcert;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class RecentConcertsCalculator implements StatCalculator<List<RecentConcert>> {
    @Override
    public List<RecentConcert> calculate(List<Concert> concerts) {
        return concerts.stream()
            .filter(concert -> concert.getCreatedAt() != null)
            .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
            .limit(DashboardConstants.RECENT_CONCERTS_COUNT.getValue())
            .map(concert -> RecentConcert.builder()
                .name(concert.getName())
                .artist(concert.getArtist() != null ? concert.getArtist().getName() : "Unknown Artist")
                .status(concert.getStatus().name())
                .build())
            .collect(Collectors.toList());
    }
}

