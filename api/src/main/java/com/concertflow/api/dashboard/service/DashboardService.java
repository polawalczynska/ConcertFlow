package com.concertflow.api.dashboard.service;

import com.concertflow.api.dashboard.dto.BudgetManagerStatsResponse;
import com.concertflow.api.dashboard.dto.CoordinatorStatsResponse;
import com.concertflow.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DashboardService {
    private final DashboardStatsAggregator statsAggregator;
    private final BudgetManagerStatsAggregator budgetManagerStatsAggregator;

    @Cacheable(value = "dashboardStats", key = "#coordinator.id + '_coordinatorStats'")
    public CoordinatorStatsResponse getCoordinatorStats(User coordinator) {
        return statsAggregator.aggregateStats(coordinator.getId());
    }

    @Cacheable(value = "dashboardStats", key = "#budgetManager.id + '_budgetManagerStats'")
    public BudgetManagerStatsResponse getBudgetManagerStats(User budgetManager) {
        return budgetManagerStatsAggregator.aggregateStats(budgetManager.getId());
    }
}

