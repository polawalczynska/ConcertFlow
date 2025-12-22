package com.concertflow.api.budget.dto;

import lombok.Builder;

import java.math.BigDecimal;
import java.util.List;

@Builder
public record BudgetStatistics(
    Integer totalItems,
    Integer approvedItems,
    Integer pendingItems,
    Integer rejectedItems,
    BigDecimal totalEstimated,
    BigDecimal totalRequested,
    BigDecimal totalApproved,
    BigDecimal approvalRate,
    BigDecimal variance,
    List<CategoryBreakdown> categoryBreakdown
) {}

