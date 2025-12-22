package com.concertflow.api.budget.dto;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record CategoryBreakdown(
    String category,
    Integer itemCount,
    BigDecimal estimatedAmount,
    BigDecimal approvedAmount,
    BigDecimal percentageOfTotal
) {}

