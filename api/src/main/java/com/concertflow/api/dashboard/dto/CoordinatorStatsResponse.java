package com.concertflow.api.dashboard.dto;

import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record CoordinatorStatsResponse(
    long totalConcerts,
    long plannedConcerts,
    long approvedConcerts,
    long completedConcerts,
    long cancelledConcerts,
    long upcomingConcertsCount,
    long concertsNeedingAttention,
    List<GenreStats> genreStats,
    List<ConcertsByMonth> concertsByMonth,
    List<StatusDistribution> statusDistribution,
    List<RecentConcert> recentConcerts,
    List<CoordinatorAlert> alerts,
    List<UpcomingEvent> upcomingEvents,
    List<GenreChartData> genreChartData,
    List<ConcertsByMonthChartData> concertsByMonthChartData,
    LocalDateTime lastUpdated
) {
}

