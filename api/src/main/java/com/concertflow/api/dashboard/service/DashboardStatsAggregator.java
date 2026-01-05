package com.concertflow.api.dashboard.service;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertRepository;
import com.concertflow.api.concert.entity.ConcertStatus;
import com.concertflow.api.dashboard.dto.CoordinatorStatsResponse;
import com.concertflow.api.dashboard.service.calculator.AlertsCalculator;
import com.concertflow.api.dashboard.service.calculator.ConcertsByMonthCalculator;
import com.concertflow.api.dashboard.service.calculator.ConcertsByMonthChartDataCalculator;
import com.concertflow.api.dashboard.service.calculator.ConcertsNeedingAttentionCalculator;
import com.concertflow.api.dashboard.service.calculator.GenreChartDataCalculator;
import com.concertflow.api.dashboard.service.calculator.GenreStatsCalculator;
import com.concertflow.api.dashboard.service.calculator.RecentConcertsCalculator;
import com.concertflow.api.dashboard.service.calculator.StatusCountCalculator;
import com.concertflow.api.dashboard.service.calculator.StatusDistributionCalculator;
import com.concertflow.api.dashboard.service.calculator.UpcomingConcertsCalculator;
import com.concertflow.api.dashboard.service.calculator.UpcomingEventsCalculator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class DashboardStatsAggregator {
    private final ConcertRepository concertRepository;
    private final StatusCountCalculator statusCountCalculator;
    private final UpcomingConcertsCalculator upcomingConcertsCalculator;
    private final ConcertsNeedingAttentionCalculator concertsNeedingAttentionCalculator;
    private final GenreStatsCalculator genreStatsCalculator;
    private final ConcertsByMonthCalculator concertsByMonthCalculator;
    private final StatusDistributionCalculator statusDistributionCalculator;
    private final RecentConcertsCalculator recentConcertsCalculator;
    private final AlertsCalculator alertsCalculator;
    private final UpcomingEventsCalculator upcomingEventsCalculator;
    private final GenreChartDataCalculator genreChartDataCalculator;
    private final ConcertsByMonthChartDataCalculator concertsByMonthChartDataCalculator;

    public CoordinatorStatsResponse aggregateStats(Long coordinatorId) {
        List<Concert> allConcerts = concertRepository.findByCoordinatorId(coordinatorId);
        Map<ConcertStatus, Long> statusCounts = statusCountCalculator.calculate(allConcerts);

        return CoordinatorStatsResponse.builder()
            .totalConcerts(allConcerts.size())
            .plannedConcerts(statusCounts.getOrDefault(ConcertStatus.PLANNING, 0L))
            .approvedConcerts(statusCounts.getOrDefault(ConcertStatus.APPROVED, 0L))
            .completedConcerts(statusCounts.getOrDefault(ConcertStatus.COMPLETED, 0L))
            .cancelledConcerts(statusCounts.getOrDefault(ConcertStatus.CANCELLED, 0L))
            .upcomingConcertsCount(upcomingConcertsCalculator.calculate(allConcerts))
            .concertsNeedingAttention(concertsNeedingAttentionCalculator.calculate(allConcerts))
            .genreStats(genreStatsCalculator.calculate(allConcerts))
            .concertsByMonth(concertsByMonthCalculator.calculate(allConcerts))
            .statusDistribution(statusDistributionCalculator.calculate(allConcerts))
            .recentConcerts(recentConcertsCalculator.calculate(allConcerts))
            .alerts(alertsCalculator.calculate(allConcerts))
            .upcomingEvents(upcomingEventsCalculator.calculate(allConcerts))
            .genreChartData(genreChartDataCalculator.calculate(allConcerts))
            .concertsByMonthChartData(concertsByMonthChartDataCalculator.calculate(allConcerts))
            .lastUpdated(LocalDateTime.now())
            .build();
    }
}

