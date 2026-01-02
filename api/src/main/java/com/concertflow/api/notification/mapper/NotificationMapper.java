package com.concertflow.api.notification.mapper;

import com.concertflow.api.notification.dto.NotificationResponse;
import com.concertflow.api.notification.entity.Notification;
import org.springframework.stereotype.Component;

@Component
public class NotificationMapper {
    public NotificationResponse toResponse(Notification notification) {
        return NotificationResponse.builder()
                .id(notification.getId())
                .type(notification.getType())
                .title(notification.getTitle())
                .description(notification.getDescription())
                .read(notification.getRead())
                .createdAt(notification.getCreatedAt())
                .concertId(notification.getConcertId())
                .invitationId(notification.getInvitationId())
                .build();
    }
}

