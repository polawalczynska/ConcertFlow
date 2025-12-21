package com.concertflow.api.dashboard.dto;

import lombok.Builder;

@Builder
public record StatusDistribution(
    String status,
    long count,
    String color
) {}

