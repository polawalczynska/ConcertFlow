package com.concertflow.api.dashboard.dto;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record RecentBudgetActivity(
    String concertName,
    String artistName,
    String budgetStatus,
    BigDecimal approvedAmount,
    String lastUpdated
) {}

