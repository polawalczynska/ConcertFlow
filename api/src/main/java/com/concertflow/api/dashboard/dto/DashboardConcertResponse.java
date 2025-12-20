package com.concertflow.api.dashboard.dto;

import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
public record DashboardConcertResponse(
    Long id,
    String name,
    String artistName,
    LocalDateTime dateTime,
    String status,
    String statusDisplayName,
    String venue,
    String city,
    String imageUrl,
    boolean requiresAttention,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}

