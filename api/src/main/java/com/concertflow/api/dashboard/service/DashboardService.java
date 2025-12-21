package com.concertflow.api.dashboard.service;

import com.concertflow.api.dashboard.dto.CoordinatorStatsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DashboardService {
    private final DashboardStatsAggregator statsAggregator;

    @Cacheable(value = "dashboardStats", key = "'coordinatorStats'")
    public CoordinatorStatsResponse getCoordinatorStats() {
        return statsAggregator.aggregateStats();
    }
}

