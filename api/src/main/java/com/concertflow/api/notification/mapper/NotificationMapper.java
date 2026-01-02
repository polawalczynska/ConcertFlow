package com.concertflow.api.notification.mapper;

import com.concertflow.api.notification.adapter.NotificationAdapter;
import com.concertflow.api.notification.dto.NotificationResponse;
import com.concertflow.api.notification.entity.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationMapper {
    private final NotificationAdapter notificationAdapter;

    public NotificationResponse toResponse(Notification notification) {
        return notificationAdapter.adapt(notification);
    }
}

