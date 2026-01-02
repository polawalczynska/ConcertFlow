package com.concertflow.api.notification.dto;

import com.concertflow.api.notification.entity.NotificationType;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record NotificationResponse(
    Long id,
    NotificationType type,
    String title,
    String description,
    Boolean read,
    LocalDateTime createdAt,
    Long concertId,
    Long invitationId,
    String category,
    String icon,
    String color,
    String relativeTime
) {
}

