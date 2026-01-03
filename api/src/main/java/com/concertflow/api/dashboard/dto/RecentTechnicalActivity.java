package com.concertflow.api.dashboard.dto;

import lombok.Builder;

@Builder
public record RecentTechnicalActivity(
    String concertName,
    String artistName,
    String technicalStatus,
    String lastUpdated
) {}

