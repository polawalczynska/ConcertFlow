package com.concertflow.api.dashboard.dto;

import lombok.Builder;

@Builder
public record ApprovedTechnicalByMonthChartData(
    String month,
    long approvedCount
) {}

