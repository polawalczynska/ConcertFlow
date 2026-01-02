package com.concertflow.api.notification.adapter;

import com.concertflow.api.notification.entity.NotificationType;
import org.springframework.stereotype.Component;

@Component
public class NotificationCategoryAdapter implements NotificationAdapterInterface {
    public String adapt(NotificationType type) {
        return switch (type) {
            case TEAM_INVITATION -> "team";
            case BUDGET_REVISION_REQUESTED, BUDGET_APPROVED, BUDGET_SUBMITTED -> "budget";
            case TECHNICAL_REVISION_REQUESTED, TECHNICAL_APPROVED, TECHNICAL_SUBMITTED -> "technical";
            case UPCOMING_CONCERT_REMINDER -> "calendar";
            case CONCERT_STATUS_CHANGED -> "concert";
        };
    }
}

