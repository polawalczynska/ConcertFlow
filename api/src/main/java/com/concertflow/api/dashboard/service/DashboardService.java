package com.concertflow.api.dashboard.service;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertRepository;
import com.concertflow.api.concert.entity.ConcertStatus;
import com.concertflow.api.dashboard.dto.CoordinatorStatsResponse;
import com.concertflow.api.dashboard.service.calculator.*;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DashboardService {
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

    @Cacheable(value = "dashboardStats", key = "'coordinatorStats'")
    public CoordinatorStatsResponse getCoordinatorStats() {
        List<Concert> allConcerts = concertRepository.findAll();
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

