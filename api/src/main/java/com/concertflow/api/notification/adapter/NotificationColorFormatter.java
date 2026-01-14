package com.concertflow.api.notification.adapter;

import com.concertflow.api.notification.entity.NotificationType;
import org.springframework.stereotype.Component;

@Component
public class NotificationColorFormatter implements NotificationFormatterInterface {
    public String adapt(NotificationType type) {
        return switch (type) {
            case TEAM_INVITATION, TEAM_MEMBER_JOINED -> "text-blue-600";
            case BUDGET_REVISION_REQUESTED, TECHNICAL_REVISION_REQUESTED -> "text-orange-600";
            case BUDGET_APPROVED, TECHNICAL_APPROVED, CONCERT_STATUS_CHANGED -> "text-green-600";
            case BUDGET_SUBMITTED, TECHNICAL_SUBMITTED -> "text-blue-600";
            case UPCOMING_CONCERT_REMINDER -> "text-indigo-600";
        };
    }
}

