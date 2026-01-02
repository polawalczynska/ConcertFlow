package com.concertflow.api.dashboard.dto;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record BudgetCategoryChartData(
    String category,
    BigDecimal amount,
    String color
) {}

