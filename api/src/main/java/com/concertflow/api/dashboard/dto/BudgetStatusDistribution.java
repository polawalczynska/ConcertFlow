package com.concertflow.api.dashboard.dto;

import lombok.Builder;

@Builder
public record BudgetStatusDistribution(
    String status,
    long count,
    String color
) {}

