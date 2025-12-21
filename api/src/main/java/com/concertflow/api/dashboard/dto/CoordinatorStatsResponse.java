package com.concertflow.api.dashboard.dto;

import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Builder
public record CoordinatorStatsResponse(
    long totalConcerts,
    long plannedConcerts,
    long approvedConcerts,
    long completedConcerts,
    long cancelledConcerts,
    long totalRevenue,
    long upcomingConcertsCount,
    List<GenreStats> genreStats,
    LocalDateTime lastUpdated
) {}

