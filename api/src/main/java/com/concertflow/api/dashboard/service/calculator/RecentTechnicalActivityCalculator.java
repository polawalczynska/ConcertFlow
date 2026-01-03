package com.concertflow.api.dashboard.service.calculator;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.dashboard.config.DashboardConstants;
import com.concertflow.api.dashboard.dto.RecentTechnicalActivity;
import org.springframework.stereotype.Component;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class RecentTechnicalActivityCalculator implements StatCalculator<List<RecentTechnicalActivity>> {
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("MMM d, yyyy");

    @Override
    public List<RecentTechnicalActivity> calculate(List<Concert> concerts) {
        return concerts.stream()
            .filter(concert -> concert.getUpdatedAt() != null)
            .sorted((a, b) -> b.getUpdatedAt().compareTo(a.getUpdatedAt()))
            .limit(DashboardConstants.RECENT_CONCERTS_COUNT.getValue())
            .map(concert -> RecentTechnicalActivity.builder()
                .concertName(concert.getName())
                .artistName(concert.getArtist() != null ? concert.getArtist().getName() : "Unknown Artist")
                .technicalStatus(concert.getTechnicalStatus() != null ? concert.getTechnicalStatus().name() : "PENDING")
                .lastUpdated(concert.getUpdatedAt().format(DATE_FORMATTER))
                .build())
            .collect(Collectors.toList());
    }
}

