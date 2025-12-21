package com.concertflow.api.dashboard.dto;

import lombok.Builder;

@Builder
public record ConcertsByMonthChartData(
    String month,
    long concertCount
) {}

