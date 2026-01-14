package com.concertflow.api.notification.adapter;

import com.concertflow.api.notification.dto.NotificationResponse;
import com.concertflow.api.notification.entity.Notification;
import com.concertflow.api.notification.entity.NotificationType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationMapper {
    private final NotificationCategoryFormatter categoryAdapter;
    private final NotificationIconFormatter iconAdapter;
    private final NotificationColorFormatter colorAdapter;
    private final TimeFormatter timeFormatter;

    public NotificationResponse adapt(Notification notification) {
        NotificationType type = notification.getType();
        
        return NotificationResponse.builder()
                .id(notification.getId())
                .type(type)
                .title(notification.getTitle())
                .description(notification.getDescription())
                .read(notification.getRead())
                .createdAt(notification.getCreatedAt())
                .concertId(notification.getConcertId())
                .invitationId(notification.getInvitationId())
                .category(categoryAdapter.adapt(type))
                .icon(iconAdapter.adapt(type))
                .color(colorAdapter.adapt(type))
                .relativeTime(timeFormatter.formatRelative(notification.getCreatedAt()))
                .build();
    }
}

