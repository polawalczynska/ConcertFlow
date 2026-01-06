package com.concertflow.api.dashboard.service;

import com.concertflow.api.concert.entity.BudgetStatus;
import com.concertflow.api.concert.entity.Concert;
import com.concertflow.api.concert.entity.ConcertRepository;
import com.concertflow.api.dashboard.config.DashboardConstants;
import com.concertflow.api.dashboard.dto.BudgetManagerStatsResponse;
import com.concertflow.api.dashboard.service.calculator.BudgetCategoryChartDataCalculator;
import com.concertflow.api.dashboard.service.calculator.BudgetStatusDistributionCalculator;
import com.concertflow.api.dashboard.service.calculator.BudgetsByMonthChartDataCalculator;
import com.concertflow.api.dashboard.service.calculator.RecentBudgetActivityCalculator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class BudgetManagerStatsAggregator {
    private final ConcertRepository concertRepository;
    private final BudgetCategoryChartDataCalculator budgetCategoryChartDataCalculator;
    private final BudgetsByMonthChartDataCalculator budgetsByMonthChartDataCalculator;
    private final BudgetStatusDistributionCalculator budgetStatusDistributionCalculator;
    private final RecentBudgetActivityCalculator recentBudgetActivityCalculator;

    public BudgetManagerStatsResponse aggregateStats(Long budgetManagerId) {
        List<Concert> allConcerts = concertRepository.findByBudgetManagerId(budgetManagerId);
        
        Map<BudgetStatus, Long> statusCounts = allConcerts.stream()
            .collect(Collectors.groupingBy(
                Concert::getBudgetStatus,
                Collectors.counting()
            ));

        long pendingReview = statusCounts.getOrDefault(BudgetStatus.SUBMITTED, 0L) + 
                           statusCounts.getOrDefault(BudgetStatus.UNDER_REVIEW, 0L);
        long approved = statusCounts.getOrDefault(BudgetStatus.APPROVED, 0L);
        long revisionRequested = statusCounts.getOrDefault(BudgetStatus.REVISION_REQUESTED, 0L);

        BigDecimal totalAmount = allConcerts.stream()
            .filter(concert -> concert.getApprovedBudget() != null)
            .map(Concert::getApprovedBudget)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        long upcomingDeadlines = allConcerts.stream()
            .filter(concert -> concert.getDate() != null)
            .filter(concert -> {
                LocalDateTime now = LocalDateTime.now();
                LocalDateTime sevenDaysFromNow = now.plusDays(DashboardConstants.UPCOMING_DAYS.getValue());
                return concert.getDate().isAfter(now) && concert.getDate().isBefore(sevenDaysFromNow);
            })
            .count();

        return BudgetManagerStatsResponse.builder()
            .totalBudgets(allConcerts.size())
            .pendingReview(pendingReview)
            .approved(approved)
            .revisionRequested(revisionRequested)
            .totalAmount(totalAmount)
            .upcomingDeadlines(upcomingDeadlines)
            .budgetCategories(budgetCategoryChartDataCalculator.calculate(allConcerts))
            .budgetsByMonth(budgetsByMonthChartDataCalculator.calculate(allConcerts))
            .statusDistribution(budgetStatusDistributionCalculator.calculate(allConcerts))
            .recentActivity(recentBudgetActivityCalculator.calculate(allConcerts))
            .lastUpdated(LocalDateTime.now())
            .build();
    }
}

