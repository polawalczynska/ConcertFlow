package com.concertflow.api.dashboard.dto;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record UpcomingEvent(
    Long id,
    String name,
    LocalDateTime date,
    long daysUntil,
    String status
) {}

