package com.concertflow.api.dashboard.dto;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record CoordinatorAlert(
    String id,
    AlertType type,
    String title,
    String message,
    String concertId,
    ActionRequired actionRequired,
    LocalDateTime createdAt,
    boolean dismissed
) {}

