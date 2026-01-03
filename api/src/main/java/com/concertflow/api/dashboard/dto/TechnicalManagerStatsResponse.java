package com.concertflow.api.dashboard.dto;

import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record TechnicalManagerStatsResponse(
    long totalReviews,
    long pendingReview,
    long approved,
    long revisionRequested,
    long upcomingDeadlines,
    List<ApprovedTechnicalByMonthChartData> approvedByMonth,
    List<TechnicalStatusDistribution> statusDistribution,
    List<TechnicalAreaChartData> technicalAreas,
    List<RecentTechnicalActivity> recentActivity,
    LocalDateTime lastUpdated
) {}

