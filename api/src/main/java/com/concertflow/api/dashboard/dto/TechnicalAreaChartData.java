package com.concertflow.api.dashboard.dto;

import lombok.Builder;

@Builder
public record TechnicalAreaChartData(
    String area,
    long count,
    String color
) {}

