package com.concertflow.api.dashboard.service;

import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertRepository;
import com.concertflow.api.concert.entity.TechnicalStatus;
import com.concertflow.api.dashboard.config.DashboardConstants;
import com.concertflow.api.dashboard.dto.TechnicalManagerStatsResponse;
import com.concertflow.api.dashboard.service.calculator.ApprovedTechnicalByMonthChartDataCalculator;
import com.concertflow.api.dashboard.service.calculator.RecentTechnicalActivityCalculator;
import com.concertflow.api.dashboard.service.calculator.TechnicalAreaChartDataCalculator;
import com.concertflow.api.dashboard.service.calculator.TechnicalStatusDistributionCalculator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class TechnicalManagerStatsAggregator {
    private final ConcertRepository concertRepository;
    private final ApprovedTechnicalByMonthChartDataCalculator approvedTechnicalByMonthChartDataCalculator;
    private final TechnicalStatusDistributionCalculator technicalStatusDistributionCalculator;
    private final TechnicalAreaChartDataCalculator technicalAreaChartDataCalculator;
    private final RecentTechnicalActivityCalculator recentTechnicalActivityCalculator;

    public TechnicalManagerStatsResponse aggregateStats(Long technicalManagerId) {
        List<Concert> allConcerts = concertRepository.findByTechnicalManagerId(technicalManagerId);
        
        Map<TechnicalStatus, Long> statusCounts = allConcerts.stream()
            .collect(Collectors.groupingBy(
                Concert::getTechnicalStatus,
                Collectors.counting()
            ));

        long pendingReview = statusCounts.getOrDefault(TechnicalStatus.PENDING, 0L) + 
                           statusCounts.getOrDefault(TechnicalStatus.SUBMITTED, 0L);
        long approved = statusCounts.getOrDefault(TechnicalStatus.APPROVED, 0L);
        long revisionRequested = statusCounts.getOrDefault(TechnicalStatus.REVISION_REQUESTED, 0L);

        long upcomingDeadlines = allConcerts.stream()
            .filter(concert -> concert.getDate() != null)
            .filter(concert -> {
                LocalDateTime now = LocalDateTime.now();
                LocalDateTime sevenDaysFromNow = now.plusDays(DashboardConstants.UPCOMING_DAYS.getValue());
                return concert.getDate().isAfter(now) && concert.getDate().isBefore(sevenDaysFromNow);
            })
            .count();

        return TechnicalManagerStatsResponse.builder()
            .totalReviews(allConcerts.size())
            .pendingReview(pendingReview)
            .approved(approved)
            .revisionRequested(revisionRequested)
            .upcomingDeadlines(upcomingDeadlines)
            .approvedByMonth(approvedTechnicalByMonthChartDataCalculator.calculate(allConcerts))
            .statusDistribution(technicalStatusDistributionCalculator.calculate(allConcerts))
            .technicalAreas(technicalAreaChartDataCalculator.calculate(allConcerts))
            .recentActivity(recentTechnicalActivityCalculator.calculate(allConcerts))
            .lastUpdated(LocalDateTime.now())
            .build();
    }
}

