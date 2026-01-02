package com.concertflow.api.dashboard.dto;

import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Builder
public record BudgetManagerStatsResponse(
    long totalBudgets,
    long pendingReview,
    long approved,
    long revisionRequested,
    BigDecimal totalAmount,
    long upcomingDeadlines,
    List<BudgetCategoryChartData> budgetCategories,
    List<BudgetsByMonthChartData> budgetsByMonth,
    List<BudgetStatusDistribution> statusDistribution,
    List<RecentBudgetActivity> recentActivity,
    LocalDateTime lastUpdated
) {}

