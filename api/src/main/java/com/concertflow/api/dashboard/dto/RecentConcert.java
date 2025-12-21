package com.concertflow.api.dashboard.dto;

import lombok.Builder;

@Builder
public record RecentConcert(
    String name,
    String artist,
    String status
) {}

