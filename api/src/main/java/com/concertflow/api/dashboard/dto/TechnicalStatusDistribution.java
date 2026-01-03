package com.concertflow.api.dashboard.dto;

import lombok.Builder;

@Builder
public record TechnicalStatusDistribution(
    String status,
    long count,
    String color
) {}

