package com.concertflow.api.dashboard.service.calculator;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.dashboard.config.DashboardConstants;
import com.concertflow.api.dashboard.dto.RecentBudgetActivity;
import org.springframework.stereotype.Component;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class RecentBudgetActivityCalculator implements StatCalculator<List<RecentBudgetActivity>> {
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("MMM d, yyyy");

    @Override
    public List<RecentBudgetActivity> calculate(List<Concert> concerts) {
        return concerts.stream()
            .filter(concert -> concert.getUpdatedAt() != null)
            .sorted((a, b) -> b.getUpdatedAt().compareTo(a.getUpdatedAt()))
            .limit(DashboardConstants.RECENT_CONCERTS_COUNT.getValue())
            .map(concert -> RecentBudgetActivity.builder()
                .concertName(concert.getName())
                .artistName(concert.getArtist() != null ? concert.getArtist().getName() : "Unknown Artist")
                .budgetStatus(concert.getBudgetStatus() != null ? concert.getBudgetStatus().name() : "PENDING")
                .approvedAmount(concert.getApprovedBudget())
                .lastUpdated(concert.getUpdatedAt().format(DATE_FORMATTER))
                .build())
            .collect(Collectors.toList());
    }
}

