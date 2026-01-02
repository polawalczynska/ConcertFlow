package com.concertflow.api.dashboard.dto;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record BudgetsByMonthChartData(
    String month,
    BigDecimal approvedAmount
) {}

